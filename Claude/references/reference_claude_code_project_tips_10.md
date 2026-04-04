---
name: Claude Codeプロジェクト適用Tips10選
description: 実プロジェクト適用の実践Tips — think拡張・Serena LSP・ccmanager・カスタムコマンド・Hooks通知（Qiita記事）
type: reference
---

## 出典
- URL: https://qiita.com/nokonoko_1203/items/67f8692a0a3ca7e621f3
- 著者: @nokonoko_1203（のこのこ / MIERUNE）
- 公開日: 2025-06-25（最終更新: 2025-08-31）

## 概要
Claude Codeを実プロジェクトに適用するための実践的な10個のTips。

## 詳細（主要Tips）

### 思考拡張キーワード
- `think`: 4,000トークン（簡単なリファクタリング）
- `think hard/deeply`: 10,000トークン（複雑なバグ解析）
- `think harder/ultrathink`: 31,999トークン（大規模最適化）

### Serena（LSPベースコード解析MCP）
```bash
claude mcp add serena -- uvx --from git+https://github.com/oraios/serena serena-mcp-server --context ide-assistant --project $(pwd)
```
シンボルベース解析でトークン消費削減・精度向上。

### ccmanager（Git Worktree管理）
`npm install -g ccmanager` でインストール。複数ブランチの並列作業を効率化。

### カスタムスラッシュコマンド
`~/.claude/commands/` にMarkdownファイル配置。`$ARGUMENTS`で引数処理、`@`で他ファイル参照、`!`で事前Bash実行。

### Hooks通知
PostToolUseのmatcher `Write|Edit` でtextlint自動実行。Stopイベントで完了通知。

### その他
- CLAUDE.mdは「英語思考、日本語応答」設定が有効
- Context7 MCP でライブラリドキュメントリアルタイム取得
- 設計・タスク整理・実装の明確なフェーズ分離が重要
