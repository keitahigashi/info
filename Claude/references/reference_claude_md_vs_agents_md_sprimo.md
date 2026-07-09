---
name: CLAUDE.mdとAGENTS.mdの違いとClaude Codeの仕様解説
description: CLAUDE.mdとAGENTS.mdの仕様差・4階層・運用パターンを網羅解説
type: reference
---

## 出典

Sprimo: https://sprimo.jp/column/agents-md-vs-claude-md/

## 概要

CLAUDE.md / AGENTS.md の違いを仕様ベースで整理し、Claude Code特有の4階層・重複回避・肥大化対策まで実務的に網羅した解説記事。

## 最重要事実

**「Claude Code は AGENTS.md を直接読み込まない」**（Anthropic公式 2026年5月ドキュメントで確認）

## CLAUDE.md vs AGENTS.md 比較

| 項目 | AGENTS.md | CLAUDE.md |
|------|-----------|-----------|
| 策定 | コミュニティ仕様（OpenAI・Google・Sourcegraph等） | Anthropic公式 |
| 対応ツール | 複数AIツール対応（ツール非依存） | Claude Code専用 |
| 主な内容 | 全エージェント共通の前提・ロール・禁止事項 | Claude固有の運用ルール |

## CLAUDE.mdの4階層

1. **Managed policy**（組織管理）
2. **Project**（チーム共有・git管理）
3. **User**（個人・全プロジェクト適用）
4. **Local**（個人・特定リポジトリ・非git管理推奨）

## どちらに書くか：3ステップ判断フロー

1. 全AIエージェント共通の前提か → YES → AGENTS.md
2. Claude Code固有のルールか → YES → CLAUDE.md
3. ローカル個人専用か → YES → CLAUDE.local.md

## AGENTS.mdの推奨記述内容

- 技術スタック指定
- ディレクトリ構造・ファイルマップ
- 命名規則・コーディング規約
- ビルド・テスト・リンターコマンド
- 外部ドキュメント参照指示

## CLAUDE.mdの推奨記述内容

- 起動フロー（STATUS.md読み込みなど）
- plan mode実行条件
- git push許可/禁止ルール
- subagent・hook使い分け

## 重複回避：インポート構文

```markdown
@AGENTS.md

## Claude Code 運用ルール
（以下、Claude固有ルールを追記）
```

| 方法 | 適した場面 |
|------|-----------|
| インポート（`@path`構文） | Claude専用ルール追加時 |
| シンボリックリンク | 完全同一指示の共有時 |

## 肥大化対策

- 推奨行数：200行以下
- Path-scoped rules例（`.claude/rules/`配下）：

```yaml
---
paths:
  - "src/api/**/*.ts"
---

# API開発ルール
（APIファイル参照時のみ適用されるルール）
```

## サブディレクトリの読み込み挙動

- ルート直下のCLAUDE.md：セッション起動時に読み込み
- サブディレクトリのCLAUDE.md：対象ファイルを実際に開いた時に動的読み込み

## 優先度・反映・確認

- 優先度順：Managed policy > Project > User > Local
- 変更の反映：`/clear` コマンドまたはセッション再起動が必要
- 読み込み確認：`/memory` コマンド（読込済ファイル一覧）・`/status` コマンド
