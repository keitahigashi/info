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

### Autoモード（自動収集 2026-03-26）

リスク評価に基づく選別自動実行モード。安全な操作は自動実行し、リスクのある操作はブロック/代替/確認を行う。`--enable-auto-mode` で起動、`Shift+Tab` でモード切替。Team/Enterprise/APIプラン対応（リサーチプレビュー）。本番環境での使用は非推奨、サンドボックス環境推奨。

> 詳細: メモリ内 `reference_claude_code_auto_mode.md` を参照

### /loop・Voice mode（自動収集 2026-03-26）

- **/loop**: `/loop 5m <prompt>` で指定間隔の定期実行。デプロイ監視やPRチェックに活用
- **Voice mode**: スペースキー長押しで音声入力（Push-to-Talk方式）。STT 20言語対応
- **Cronスケジューリング**: CronCreateツールで柔軟なスケジュール設定

> 詳細: メモリ内 `reference_claude_code_9_features.md` を参照

### 2026年3月 主要変更点（自動収集 2026-03-26）

- Opus 4.6 デフォルトeffort設定が medium に変更
- プロンプトキャッシュ効率化（セッション再開時 約600トークン削減）
- VS Code内ネイティブMCP管理ダイアログ追加
- スキル自己参照変数 `${CLAUDE_SKILL_DIR}` 対応
- サブエージェントレポートの簡潔化
- REPLメモリリーク修正（約35MB蓄積問題解消）

> 詳細: メモリ内 `reference_claude_code_updates_2026.md` を参照

### v2.1.74〜v2.1.84 ワークフロー改善（自動収集 2026-03-27）

- **MCP Elicitation (v2.1.76)**: MCPサーバーがタスク中にユーザーへ構造化入力を要求。JSON Schemaで入力フォーム定義。用途: コミットメッセージ入力・実装戦略選択・認証情報入力・破壊的操作確認
- **Computer Use**: Pro/Maxプラン向けmacOSデスクトップ操作の自律実行（ファイル操作・クリック・スクリーンショット）
- **ワークツリーsparse-checkout (v2.1.76)**: `sparsePaths`で必要ディレクトリのみチェックアウト。大規模モノレポのディスク使用量削減
- **パフォーマンス**: 起動約90ms高速化、メモリ起動時約80MB削減、`--resume`で最大45%高速化

> 詳細: メモリ内 `reference_claude_code_v2174_v2184.md` を参照

### 公式推奨ワークフロー: 探索→計画→実装→コミット（自動収集 2026-03-29）
公式ベストプラクティスの4フェーズワークフロー。(1) Plan Modeで探索（変更なし）、(2) 計画作成→Ctrl+Gでエディタ直接編集、(3) Normal Modeで実装・テスト実行、(4) コミット＆PR。小さなタスク（1文で差分を説明できる場合）は計画スキップ可。2回修正失敗したら`/clear`して学んだことを組み込んだ新プロンプトで再開。スケール手法: Writer/Reviewerパターン（セッション分離）、ファンアウト（`claude -p`×ファイルリスト）。
> 詳細: メモリ内 `reference_claude_code_best_practices_official.md` を参照

### 2026年3月アップデート総括（自動収集 2026-03-29）
2026年3月はClaude Codeの転換期的アップデート月。音声モード（/voice）、Channels（Telegram/Discord連携で外出先から指示）、/loop（自律ループ）、Opus 4.6対応が同時に実現。「声で指示」「スマホから操作」「放置で自律実行」の3軸が揃った。
> 詳細: メモリ内 `reference_claude_code_march_2026_updates_arashiyama.md` を参照

### Claude Code全CHANGELOG追跡 — 2025年176リリースの総括（自動収集 2026-04-01）
2025年の全176リリース（v0.2.x:37、v1.0.x:82、v2.0.x:57）を追跡。「AIモデル=馬、Claude Code=馬具」の比喩でハーネス完成度が差別化要因と結論。仕様駆動開発（SDD）がPlanモード+Interactive Question Toolで実現。課題: コンテキストウィンドウサイズ（Opus 4.5は200k、GPT-5.2は400k、Gemini 3 Proは1M）、コンパクション品質。サードパーティツールの慎重利用を推奨（「ハーネスの外側に追加ハーネス」リスク）。
> 詳細: メモリ内 `reference_claude_code_all_changelog_2025.md` を参照

### Agent Teams — 複数エージェント協働（自動収集 2026-04-04）
双方向コラボレーションで複数エージェントが協働する実験的機能。
有効化: 環境変数 `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`。
teammateMode: auto（自動判断）/ in-process（同一プロセス）/ tmux（ターミナル分離）の3種。
トークン消費は通常の約7倍。TeammatesにSonnet/Haiku使用でコスト管理が必須。
/rewind・/resume非対応（プレビュー段階の制限事項）。
> 詳細: references/reference_agent_teams_gihyo.md を参照

<!-- 日常で得た知見をここに追記 -->
