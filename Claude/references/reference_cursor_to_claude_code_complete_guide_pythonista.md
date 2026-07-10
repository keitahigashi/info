---
name: CursorからClaude Codeへ移行した人向け完全ガイド【2026年版】
description: Cursor経験者がClaude Codeへ移行する際に必要なコマンド・MCP・CLAUDE.md・スラッシュコマンドを網羅した実践ガイド
type: reference
---

## 出典

Qiita: https://qiita.com/pythonista0328/items/8c714b3c2c5a0b466137

## 概要

Cursor を使っていたエンジニアが Claude Code に移行する際の全知識をまとめた 2026年版完全ガイド。「ターミナルネイティブ」である Claude Code の基本から拡張機能まで順を追って解説。

## 記事の主要構成

| セクション | 内容 |
|----------|------|
| Claude Code とは | ターミナルベースのAIコーディングエージェントの位置づけ |
| インストール | `npm install -g @anthropic-ai/claude-code` 手順 |
| 基本操作 | ファイル編集・コマンド実行・Git操作の自動化 |
| スラッシュコマンド | `/help`・`/clear`・`/compact` 等の一覧 |
| キーボードショートカット | Cursor との対応表 |
| IDE連携 | VS Code・JetBrains 拡張との組み合わせ方法 |
| CLAUDE.md | Cursor の `.cursorrules` に相当するプロジェクトメモリの設定法 |
| MCP | 外部ツール連携（GitHub・Slack・DB等）の設定手順 |
| スキル・フック | カスタムコマンドと自動実行イベントの活用 |

## Cursor との主要な違い

- **操作場所**: Cursor はエディタ内 → Claude Code はターミナル
- **IDE依存**: Cursor は VS Code フォーク → Claude Code はエディタ非依存
- **エージェント能力**: Claude Code は大規模マルチファイル編集・複雑タスクに優位
- **移行コスト**: CLAUDE.md は `.cursorrules` をそのまま転用可能

## 活用拡張機能

MCP・Hooks・Skills・Plugins の4層を組み合わせることで、Cursor の Composer に相当する高度な自動化が実現可能。
