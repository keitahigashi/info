# ワークフロー・モード活用

## Planモード

**目的**: 実装前に方針を固め、手戻りを防ぐ。ファイル読み取り・探索のみ可能で、コード編集は不可。

**起動方法**:
- 1回限り: `/plan` + プロンプト
- セッション全体: `Shift+Tab` → planモード、または `--permission-mode plan`

**活用場面**:
- 大規模リファクタの事前計画
- 未知のコードベースの理解
- 3ステップ以上のタスク開始時

**フロー**: Plan → 承認 → acceptEditsに切替 → 実装

---

## Fastモード

**目的**: 速度・コスト優先で処理。同じOpus 4.6モデルを高速出力で使用。

**切替**: `/fast` コマンド

**向いているタスク**: 定型的な変更、簡単なバグ検索、テスト生成、ドキュメント修正

**向いていないタスク**: 複雑な設計、セキュリティレビュー、新規アーキテクチャ

---

## サブエージェント

**目的**: 独立したコンテキストを持つClaudeインスタンスで、メインの文脈を温存しながら並列作業する。

### 使うべき場面

| 場面 | 理由 |
|------|------|
| 調査・リサーチ | メインのコンテキストを温存 |
| 独立した並列タスク | 時間短縮 |
| 試験的な修正（POC） | 失敗してもメインが汚れない |
| テスト・レビュー | 実装と検証を分離 |

### 1サブエージェント = 1タスクが鉄則

複数タスクを1つに詰め込まない。分業を明確にすると失敗リスクが下がる。

### 並列実行パターン

```
メイン：計画を立てる
  ↓（並列起動）
サブA：ファイルA実装
サブB：ファイルB実装
サブC：テスト追加
  ↓
メイン：結果を統合・確認
```

### カスタムエージェント定義

`.claude/agents/<name>.md` に配置:

```yaml
---
model: claude-sonnet-4-6
description: "コードレビュー専用"
tools: [Read, Grep, Glob]
permissions:
  mode: plan
---

コードレビューの指示をここに記述...
```

---

## Gitワークツリー

**目的**: ブランチを分離して並列にコード変更を行う。

```bash
claude -w feature-auth    # ワークツリー作成して開始
```

サブエージェントに `isolation: "worktree"` を指定しても利用可能。変更がなければ自動クリーンアップ。

---

## タスク管理

セッション内で進捗を追跡する仕組み。

| ツール | 機能 |
|--------|------|
| TaskCreate | タスク作成 |
| TaskList | 一覧表示 |
| TaskUpdate | ステータス更新（pending → in_progress → completed） |
| TaskStop | 背景タスク停止 |
| TaskOutput | 背景タスク出力取得 |

`Ctrl+T` でタスクリスト表示/非表示。

---

## チェックポイント（巻き戻し）

`Esc+Esc` で任意の地点に巻き戻し、またはそこまでを要約してコンテキストを節約できる。

**用途**: 誤った方向への修正をロールバック、コンテキスト節約

---

## コンテキスト圧縮

`/compact` で会話履歴を要約し、コンテキスト領域を確保する。

**使うべき時**: デバッグの往復が多い時、大きなファイルを読んだ後
**避けるべき時**: 設計・計画フェーズ（文脈を落とすと方向性がズレる）

`/compact` 後は「前提は変わらない」と明示して次の指示を出すと効率的。

---

---

## 実践例: Issue起票→並列開発→PR作成の全自動化

出典: [Claude Codeで「Issue起票→並列開発→PR作成」を全自動化したら、開発速度が異次元になった](https://qiita.com/kazuki_ogawa/items/c05c3aed3bf8e46a7ddb) (@kazuki_ogawa, 2026-03-15)

### 3つのSkillによるパイプライン

| Skill | 役割 |
|-------|------|
| `/issue-create` | 雑なメモを構造化GitHub Issueに変換 |
| `/dev-plan` | 複数Issueの依存関係を分析し、Wave（実行順序）構造を決定 |
| `/gtr-workflow` | git worktreeで隔離環境を作成し並列開発 |

**核となる思想**: 実行を自動化して、人間は要件定義（思考）に集中する。

### Wave構造による並列開発

依存関係に基づきIssueをWaveに分類:

| パターン | 判断 |
|---------|------|
| DBスキーマ変更 | 最初のWaveに配置 |
| UI基盤変更 | 早いWaveに配置 |
| 独立した機能 | 同じWaveに並列配置 |
| 明示的な依存 | 後のWaveに配置 |

```
Wave 1:       #30（共通基盤セットアップ）
Wave 2（2並列）: #31（メール通知）, #32（Slack通知）
Wave 3（5並列）: #33, #34, #35, #36, #38（各トリガー実装）
Wave 4（2並列）: #37（リアルタイムUI）, #39（統合テスト）
```

### git worktreeによる並列開発

ブランチごとに独立したディレクトリを作成し、ファイル競合を完全回避:

```
~/dev/myapp/                          ← 本体 (develop)
~/dev/myapp-worktrees/feature-auth/    ← worktree 1
~/dev/myapp-worktrees/feature-ui/      ← worktree 2
~/dev/myapp-worktrees/feature-api/     ← worktree 3
```

### .gtrconfig — worktreeの自動セットアップ

```ini
[copy]
include = .env*
include = CLAUDE.md

[hooks]
postCreate = npm install
```

### wt-dev — worktree開発サーバー起動ユーティリティ

```bash
wt-dev() {
  local name="${1//\//-}"
  local port="${2:-3001}"
  local dir="$HOME/dev/myapp-worktrees/$name"
  if [ ! -d "$dir" ]; then
    echo "worktree not found: $dir"
    return 1
  fi
  local url="https://localhost:$port"
  (cd "$dir" && npm install --silent && \
   PORT=$port BETTER_AUTH_URL=$url NEXT_PUBLIC_APP_URL=$url npm run dev)
}
```

複数ターミナルで並列にサーバー起動:
```
ターミナル 1: make dev             → :3000 (メイン)
ターミナル 2: wt-dev feature-auth  → :3001
ターミナル 3: wt-dev feature-ui    → :3002
```

---

## 実践メモ

<!-- 日常で得た知見をここに追記 -->
