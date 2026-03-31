# 自律パフォーマンスチューニング実践ガイド

Claude Codeの `/loop` を使い、AIエージェントが「コード変更→計測→判定→記録」のPDCAサイクルを自律的に繰り返すパフォーマンスチューニング手法。

出典: [Claude Codeの/loopで自律的にパフォーマンスチューニングのPDCAを回させる仕組みを作った【autoresearch】](https://zenn.dev/dely_jp/articles/3117e590465e38)（たろう眼鏡 / Kurashiru dely, 2026-03-30）

---

## 概要

Karpathy氏のautoresearchプロジェクトの設計思想を応用。
10分ごとに自動でPDCAサイクルを回し、寝ている間に数十回の改善サイクルを実行する。

```
人間がやること: 対象エンドポイントを指定して起動するだけ
AIがやること:  コード分析 → 改善実装 → テスト → 計測 → 判定 → 記録（× 数十回）
```

---

## 3つの設計原則

| 原則 | 内容 | 理由 |
|------|------|------|
| **固定された評価基準** | ベンチマークスクリプトはAI変更不可 | AIが評価基準を甘くする「チート」を防止 |
| **固定された時間予算** | 1サイクル9分以内 | 小さな変更が自然に選ばれ安全性が向上 |
| **進化的選択圧** | 改善→keep、悪化→discard | 確実に性能が単調改善する |

---

## ファイル構成

```
project-root/
├── .claude/
│   ├── skills/
│   │   └── autoresearch-controller/
│   │       ├── SKILL.md                    # メインスキル定義
│   │       └── scripts/
│   │           ├── autoresearch-tuning-agent-block-read.sh   # Read hook
│   │           └── autoresearch-tuning-agent-guard-bash.sh   # Bash hook
│   └── agents/
│       ├── autoresearch-tuning-agent.md      # チューニング担当
│       └── autoresearch-data-setup-agent.md  # データ準備担当
├── benchmark/
│   ├── config.yml      # 計測設定（対象エンドポイント等）
│   ├── run.rb          # ベンチマーク実行（AI変更禁止）
│   ├── setup.rb        # DB初期化（AI変更禁止）
│   └── seed_data.rb    # テストデータ（data-setup-agentのみ編集可）
└── tuning_results.tsv  # 試行履歴ログ
```

---

## Step 1: スキル定義（SKILL.md）

`.claude/skills/autoresearch-controller/SKILL.md`:

```markdown
---
name: autoresearch-controller
description: エンドポイントのパフォーマンスチューニングを自律的にPDCA実行する
argument-hint: "[setup <Controller#action>] or [run]"
disable-model-invocation: true
---

# autoresearch-controller

## モード

### setup <Controller#action>
1. `perf-tune/<controller>-<action>` ブランチを作成
2. benchmark/ ディレクトリにテンプレートからファイル生成
3. data-setup-agent をサブエージェント呼び出し → seed_data.rb を実装
4. `RAILS_ENV=test ruby benchmark/setup.rb` でテストデータ投入
5. `RAILS_ENV=test ruby benchmark/run.rb` でベースライン計測
6. tuning_results.tsv に baseline 行を記録

### run
※ 前提: perf-tune/ ブランチ上であること、benchmark/config.yml が存在すること

1. tuning-agent をサブエージェント呼び出し（試行履歴をコンテキストに含める）
2. tuning-agent が自律実行:
   - コード分析 → 改善案の立案 → 実装 → git commit
   - migration 実行 + DB再seed
   - spec 実行（失敗時は `git reset --hard HEAD~1` でrevert）
   - ベンチマーク実行
   - avg_ms を前回と比較 → keep / discard を判定
   - tuning_results.tsv に結果を追記
```

---

## Step 2: エージェント定義

### チューニングエージェント

`.claude/agents/autoresearch-tuning-agent.md`:

```markdown
---
model: opus
tools: Read, Edit, Bash, Glob, Grep, Write
hooks:
  PreToolUse:
    - matcher: "Read"
      hooks:
        - type: command
          command: "$HOME/.claude/skills/autoresearch-controller/scripts/autoresearch-tuning-agent-block-read.sh"
    - matcher: "Bash"
      hooks:
        - type: command
          command: "$HOME/.claude/skills/autoresearch-controller/scripts/autoresearch-tuning-agent-guard-bash.sh"
---

# autoresearch-tuning-agent

あなたはパフォーマンスチューニングの専門家です。

## 制約
- 時間予算: 9分以内に完了すること
- 変更可能範囲: controller / model / service / migration のみ
- benchmark/ 配下のファイルは読み書き禁止
- 1サイクルで1つの改善に集中する

## 実行手順
1. tuning_results.tsv の履歴を確認し、過去の試行から学ぶ
2. 対象コードを分析し、改善ポイントを特定
3. 実装 → git commit
4. spec 実行（失敗なら revert して終了）
5. ベンチマーク実行: `RAILS_ENV=test ruby benchmark/run.rb`
6. 前回の avg_ms と比較:
   - 改善: status=keep として記録
   - 悪化: `git reset --hard HEAD~1` で revert、status=discard として記録
7. tuning_results.tsv に結果行を追記
```

### データセットアップエージェント

`.claude/agents/autoresearch-data-setup-agent.md`:

```markdown
---
model: sonnet
tools: Read, Write, Edit, Bash, Glob, Grep
---

# autoresearch-data-setup-agent

テストデータの設計・DB投入を担当する。
benchmark/ 配下へのフルアクセス権を持つ。

## 役割
- 対象エンドポイントに適したテストデータを設計
- benchmark/seed_data.rb を実装
- 本番に近いデータ分布・データ量を再現する
```

---

## Step 3: 防御機構（Hooks）

### Read Hook（データファイル読み取りブロック）

`scripts/autoresearch-tuning-agent-block-read.sh`:

```bash
#!/bin/bash
# tuning-agent がベンチマーク関連ファイルを読めないようにする

# tool_input から file_path を取得
FILE_PATH=$(echo "$TOOL_INPUT" | jq -r '.file_path // empty')

# ブロック対象パターン
BLOCKED_PATTERNS=(
  "benchmark/seed_data.rb"
  "benchmark/setup.rb"
  "benchmark/run.rb"
)

for pattern in "${BLOCKED_PATTERNS[@]}"; do
  if [[ "$FILE_PATH" == *"$pattern"* ]]; then
    echo "BLOCKED: $pattern はチューニングエージェントからの読み取りが禁止されています"
    exit 1
  fi
done

exit 0
```

### Bash Hook（コマンドホワイトリスト）

`scripts/autoresearch-tuning-agent-guard-bash.sh`:

```bash
#!/bin/bash
# ホワイトリスト方式でコマンドを制限する

COMMAND=$(echo "$TOOL_INPUT" | jq -r '.command // empty')

# 許可パターン
ALLOWED_PATTERNS=(
  '^\s*git\s+add\s'
  '^\s*git\s+commit\s'
  '^\s*git\s+reset\s+--hard\s+HEAD~1\s*$'
  '^\s*git\s+diff'
  '^\s*git\s+log'
  '^\s*git\s+status'
  '^\s*(RAILS_ENV=test\s+)?bundle\s+exec\s+rspec\s'
  '^\s*RAILS_ENV=test\s+ruby\s+benchmark/run\.rb'
  '^\s*RAILS_ENV=test\s+ruby\s+benchmark/setup\.rb'
  '^\s*(RAILS_ENV=test\s+)?bundle\s+exec\s+rails\s+db:migrate'
)

for pattern in "${ALLOWED_PATTERNS[@]}"; do
  if echo "$COMMAND" | grep -qE "$pattern"; then
    exit 0
  fi
done

echo "BLOCKED: 許可されていないコマンドです: $COMMAND"
exit 1
```

---

## Step 4: ベンチマーク設定

### config.yml

```yaml
# benchmark/config.yml
endpoint: /api/users
method: GET
iterations: 50
warmup: 5
params:
  page: 1
  per_page: 20
headers:
  Authorization: "Bearer test-token"
```

### 試行履歴ログ（tuning_results.tsv）

```
commit	avg_ms	p95_ms	specs_passed	status	description
a1b2c3d	245.3	312.1	true	baseline	初回ベースライン
e4f5g6h	198.7	267.4	true	keep	N+1クエリ解消（includes追加）
i7j8k9l	312.0	445.2	true	discard	キャッシュ層追加（オーバーヘッド増）
```

---

## Step 5: 実行

### 初回セットアップ

```
/autoresearch-controller setup UsersController#index
```

実行される処理:
1. `perf-tune/users-index` ブランチ作成
2. ベンチマークファイルをテンプレートから生成
3. data-setup-agent がテストデータを設計・投入
4. ベースライン計測・記録

### 自律チューニング開始

```
/loop 10m /autoresearch-controller run
```

以降、10分ごとに自動で以下が繰り返される:

```
┌─────────────────────────────────────────────┐
│  1. 試行履歴を読み込み、過去の成功/失敗から学習  │
│  2. コードを分析し、改善ポイントを特定          │
│  3. 改善を実装 → git commit                   │
│  4. spec 実行（失敗 → revert して終了）        │
│  5. ベンチマーク実行                           │
│  6. 前回比較:                                  │
│     改善 → keep（コミット維持）                │
│     悪化 → discard（git reset --hard HEAD~1） │
│  7. tuning_results.tsv に結果記録              │
└─────────────────────────────────────────────┘
         ↓ 10分後に再実行 ↓
```

---

## 安全装置まとめ

| 防御レイヤー | 手法 | 防ぐリスク |
|-------------|------|----------|
| **ブランチ保護** | `perf-tune/` プレフィックス必須 | mainブランチへの意図しない変更 |
| **評価基準の固定** | benchmark/ をAI変更不可 | 評価基準の甘くする「チート」 |
| **データ隔離** | Read hookでseed_data.rb隠蔽 | 特定データへの過最適化 |
| **コマンド制限** | Bash hookホワイトリスト | 想定外のコマンド実行 |
| **変更範囲制限** | controller/model/service/migrationのみ | インフラ・設定ファイルの破壊 |
| **自動ロールバック** | spec失敗 or 性能悪化 → `git reset --hard HEAD~1` | 品質劣化の蓄積 |
| **時間予算** | 1サイクル9分以内 | 大規模な変更による制御不能 |

---

## 応用・カスタマイズ

### 他言語への転用

Rails以外でも同じ構造を適用可能。変更が必要な部分:

| 要素 | Rails版 | 他言語での置き換え |
|------|---------|-----------------|
| ベンチマーク | `ruby benchmark/run.rb` | `go test -bench`, `k6 run`, `ab` 等 |
| テスト実行 | `bundle exec rspec` | `go test`, `pytest`, `dotnet test` 等 |
| データ投入 | `seed_data.rb` | SQL, Fixture, Factory 等 |
| 変更対象 | controller/model/service | handler/repository/service 等 |

### チューニング対象の拡張例

- **APIレスポンスタイム**: 上記の基本パターン
- **バッチ処理時間**: 処理件数/秒を評価基準に
- **メモリ使用量**: RSS/ヒープサイズを計測
- **ビルド時間**: コンパイル・バンドル時間の短縮
- **テスト実行時間**: テストスイート全体の高速化

### 試行履歴の活用

`tuning_results.tsv` が蓄積されることで:
- 過去の失敗パターンを避けた改善提案が可能に
- 「何が効いて何が効かなかったか」のナレッジが自動蓄積
- CLAUDE.md に永続化すれば、別セッションでも知見を引き継げる

---

## 設計の核心

> **「AIの能力を引き出しつつ、行動の境界を明確に定める」**

- 評価基準をAIから隔離することで「ゴールポストを動かす」チートを構造的に防止
- 進化的選択圧（改善のみkeep）により、人間の介入なしで単調改善を保証
- 再帰的な学習構造（試行履歴→次サイクルの入力）で改善精度が向上
