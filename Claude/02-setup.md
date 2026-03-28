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

<!-- 日常で得た知見をここに追記 -->
