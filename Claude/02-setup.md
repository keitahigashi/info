# 基本設定・構成ファイル

## CLAUDE.md（指示ファイル）

Claudeへの永続的な指示を記述するMarkdownファイル。3段階のスコープがある。

| 配置場所 | スコープ | Git管理 | 用途 |
|---------|--------|---------|------|
| `~/.claude/CLAUDE.md` | ユーザー全体 | 不可 | 個人の好み・技術スタック・行動原則 |
| `.claude/CLAUDE.md` または `CLAUDE.md` | プロジェクト | 可 | プロジェクト固有のルール・命名規則 |
| `.claude/settings.local.json` 経由 | ローカル | 不可（.gitignore） | 個人×プロジェクト固有の設定 |

**優先順位**: ローカル > プロジェクト > ユーザー（下位が上位を上書き）

**分割管理**: `.claude/rules/` ディレクトリにルールを分割配置可能。

### 書き方のコツ

- テーブル形式で判断基準を明確化（「この場合は→こう判断」）
- 「やってはいけないこと」を明示的に列挙する
- コーディングポリシーは「理由（なぜ）」まで書く
- スキル発火条件を設定する（トリガーワード→動作）
- 技術スタック・フレームワークを明記する

### CLAUDE.md設計の7つの原則

1. **階層分離**: グローバル（個人の好み）/ プロジェクト（固有ルール）/ rules/（条件付き適用）
2. **意思決定情報のみ記載**: コードから読み取れる情報は書かない。ポインタとルーティング指示
3. **50行以下が理想、上限200行**: 150-200指示でprimacy biasが顕著になり性能低下開始
4. **スキル発火条件を表で明示**: トリガーワード→動作の対応表
5. **1エージェント=1タスク**: サブエージェントに複数役割を兼務させない
6. **レビュー工程の必須化**: 直列パイプラインにゲートを設置
7. **コンテキスト管理の明文化**: 「焦ったら止まれ」ルール

### rules/ のpaths指定

```yaml
---
paths: "**/*.ts"
---
```

paths指定なし→セッション開始時に常時読み込み（コンテキスト消費）
paths指定あり→該当パスのファイル操作時のみ動的読み込み（コンテキスト節約）

### アンチパターン

- 曖昧な指示（「パフォーマンスをよくする」→ 何を計測？どの水準？）
- 古い指示の放置（判断基準が変わったら更新する）
- 矛盾する制約の混在
- プロジェクト固有の背景がない（グローバルだけで完結させない）
- CLAUDE.md過肥大化（200行超）— 意思決定情報に絞り、リンターに委譲できるものは委譲
- 説明文書の蓄積 — コードが真実のソース。型定義・スキーマで表現しテストで検証

---

## settings.json（設定ファイル）

| ファイル | スコープ |
|---------|--------|
| `~/.claude/settings.json` | ユーザー全体 |
| `.claude/settings.json` | プロジェクト（Git管理可） |
| `.claude/settings.local.json` | ローカル（Git管理不可） |

### 主要な設定項目

```json
{
  "model": "claude-sonnet-4-6",
  "defaultMode": "acceptEdits",
  "permissions": {
    "allow": ["Bash(git *)", "Read", "Edit"],
    "ask": ["Bash(rm *)", "WebSearch"],
    "deny": ["Bash(sudo *)"]
  },
  "hooks": { ... },
  "mcpServers": { ... },
  "sandbox": { "enabled": true },
  "fileSuggestions": { "enabled": true },
  "enabledPlugins": { ... }
}
```

---

## keybindings.json（キーバインド）

ファイルパス: `~/.claude/keybindings.json`

```json
{
  "bindings": [
    {
      "context": "Chat",
      "bindings": {
        "ctrl+e": "chat:externalEditor",
        "shift+enter": "chat:submit"
      }
    }
  ]
}
```

コンテキスト例: `Global`, `Chat`, `Autocomplete`, `Confirmation`, `Tabs`, `Help` 等13種類以上。

---

## 権限モード

| モード | キー | できること | 用途 |
|-------|------|----------|------|
| Ask permissions | `default` | 読取のみ。全操作前に確認 | 初期状態・機密作業 |
| Auto accept edits | `acceptEdits` | 読取＋編集。Bashのみ確認 | 日常の開発作業 |
| Plan mode | `plan` | 読取＋計画。編集不可 | 設計・探索フェーズ |
| Auto mode | `auto` | 全操作。背景分類器が判定 | 長時間タスク |
| Don't ask | `dontAsk` | ホワイトリスト内のみ | CI/CD・自動化 |
| Bypass | `bypassPermissions` | 全チェック無視 | 隔離コンテナ内のみ |

**切り替え方法**: `Shift+Tab`（セッション内）、`--permission-mode`（起動時）、`settings.json`（永続）

---

## 環境変数

| 変数 | 用途 |
|------|------|
| `CLAUDE_ENV_FILE` | セッション開始時にsourceするスクリプト |
| `CLAUDE_BASH_MAINTAIN_PROJECT_WORKING_DIR` | `1`で各Bash実行後に初期ディレクトリへリセット |
| `CLAUDE_CODE_SIMPLE` | `--bare`相当（高速起動） |
| `CLAUDE_CODE_DEBUG` | デバッグログ有効化 |

---

## 実践メモ

### AGENTS.md — ツール横断の共通設定（自動収集 2026-03-26）

AIコーディングエージェント向け共通設定ファイル（60,000+リポジトリが採用）。Codex CLI・Cursor・GitHub Copilot等が同一の指示を読み取れる。**使い分け**: AGENTS.mdにはツール非依存のプロジェクト情報（技術スタック・コマンド・規約・境界）を記述し、CLAUDE.mdにはClaude Code固有機能（@import、Planモード、サブエージェント指示等）を記述する。ただしClaude Codeの公式対応は未確認（CLAUDE.md推奨）。

> 詳細: メモリ内 `reference_agents_md_guide.md` を参照

### Claude Code 7層アーキテクチャ完全設定ガイド（自動収集 2026-03-28）

- 7層構成: CLAUDE.md → Auto Memory → .claude/rules/ → settings.json → Hooks（17イベント） → Skills → MCP
- settings.json優先度: 管理ポリシー → CLI → project-local → project-shared → user-local → user-shared
- 権限設定の最小権限原則: deny `git push --force`, `rm -rf`, `.env*`, `*.pem`
- Hooks注意点: タイムアウト設定必須（ハング防止）、副作用Skillsは`disable-model-invocation: true`

> 詳細: メモリ内 reference_claude_code_full_config_guide_2026.md を参照

### CLAUDE.md設計の公式ベストプラクティス（自動収集 2026-03-29）
公式ドキュメントによるCLAUDE.md運用指針。`/init`で生成し時間をかけて改善。各行を「削除するとClaudeが間違いを犯すか？」で判定し、不要なら削除。膨らんだCLAUDE.mdは重要ルールが埋没し無視される原因。ドメイン知識はSkillsに分離（オンデマンド読み込み）。Hooksは「例外なしで毎回発生すべきアクション」に使用（CLAUDE.mdの指示と異なり決定論的に保証）。`@path/to/import`でファイルインポート可能。
> 詳細: メモリ内 `reference_claude_code_best_practices_official.md` を参照

### CLAUDE.md運用7つの原則（自動収集 2026-04-01）
(1) 小さく絞る(300行以下) (2) コードスタイルはLint/Formatterに委譲 (3) 3要素: 一行説明+頻用コマンド+プロジェクト固有の罠 (4) 段階的情報開示（詳細は別ファイル分離） (5) 重要事項は冒頭配置（LLMは先頭・末尾を重視） (6) `/clear`後も保持される長期記憶として運用 (7) 開発と共に継続メンテナンス。良い例:「トリガー+アクション形式」、悪い例:「〜は禁止」（曖昧で行動指示なし）。`claude.local.md`で個人設定分離。
> 詳細: メモリ内 `reference_claude_md_7_principles.md` を参照

### カスタムサブエージェントの作り方（自動収集 2026-04-01）
`.claude/agents/`にMarkdown配置。フロントマター: name, description, tools, model(sonnet/opus/haiku/inherit), memory(user/project/local), isolation(worktree)。設計原則: 1責務の原則、ツール最小化、Git管理推奨。Claudeはdescriptionフィールドからタスク適合性を判断し自動委譲。メモリスコープ: user=全プロジェクト横断、project=特定プロジェクト、local=機密情報(gitignore対象)。
> 詳細: メモリ内 `reference_claude_code_custom_agents_guide.md` を参照

### CLAUDE.md設計で生産性向上（自動収集 2026-04-04）
3層階層設計: グローバル(`~/.claude/CLAUDE.md`)→プロジェクト(`<project>/CLAUDE.md`)→ルール(`.claude/rules/*.md`)。スキル発火条件（キーワードトリガーで自動起動）。サブエージェント3原則: 並列処理・レビュアー差し戻し・1エージェント=1タスク。失敗教訓: 200行超の詰め込み→意思決定情報に絞る、複数役割統合→単機能分離。
> 詳細: references/reference_claude_md_design_workflow.md を参照

### 公式ベストプラクティス初心者向け解説（自動収集 2026-04-06）
CLAUDE.md設定例（ビルドコマンド・コーディング規約の記載パターン）。MCPサーバーHTTP型設定（`type: "http"`でURL直接指定）。カスタムコマンド定義（`.claude/commands/*.md`に`$ARGUMENTS`で引数受け取り）。think機能の段階的思考予算: 「think」→「think hard」→「think harder」→「ultrathink」。並行作業: `git worktree add`で別ディレクトリにブランチ展開し個別セッション。ヘッドレスモード: `claude -p "指示" --output-format stream-json`でCI/CD統合。
> 詳細: references/reference_claude_code_best_practice_beginner.md を参照

### 「新卒部下」ワークフローによる環境設計（自動収集 2026-04-07）
Claude Codeを「優秀な新卒エンジニア」として扱う環境設計。3本柱: (1) CLAUDE.mdに思想と実行原則（計画フェーズ・サブエージェント戦略・自己改善ループ・完了前検証）、(2) `ai/rules/`でルール分割（GIT_WORKFLOW.md・PROJECT_ARCHITECTURE.md等）→タスク別に関連ルールだけ参照、(3) GitHub MCPでIssue→PR全自動化。実測値: 新機能2-3時間→30-60分、バグ修正30分-1時間→5-15分。成功の鍵は「プロンプト工夫」でなく「環境設計」。
> 詳細: references/reference_claude_code_new_grad_workflow.md を参照

### jp-ui-contracts: DESIGN.mdで日本語UI設計契約（自動収集 2026-04-13）
AI生成UIで日本語表記に違和感が生じる問題（見出し折り返し・行間の浅さ・英語混在・フォーム窮屈さ・表の密度）。原因は「AIの精度不足」ではなく「日本語UIの設計契約が未整備」。解決策として「jp-ui-contracts」を公開。CLAUDE.mdがコーディング全般の振る舞い契約であるのに対し、DESIGN.mdはUI/デザインに特化した設計契約で、AI指示ファイルの分離・専門化の一例。
> 詳細: references/reference_jp_ui_contracts_design_md.md を参照

<!-- 日常で得た知見をここに追記 -->
