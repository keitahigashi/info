---
name: Claude Code完全設定ガイド2026（Hooks/Skills/MCP/権限）
description: Claude Codeの7層アーキテクチャ（CLAUDE.md/Memory/Rules/Settings/Hooks/Skills/MCP）の本番運用設定ガイド（Qiita記事）
type: reference
---

## 出典
- URL: https://qiita.com/emi_ndk/items/56b2fc8bf4e7ed5ba7f3
- 著者: @emi_ndk
- 公開日: 2026年3月頃

## 概要
Claude Codeの7層構成（CLAUDE.md/Auto Memory/.claude/rules/settings.json/Hooks/Skills/MCP）を網羅的に解説し、本番運用のベストプラクティスを提示。

## 詳細

### 7層アーキテクチャ
1. **CLAUDE.md**: プロジェクトインテリジェンス（「コードから読み取れない人間の知識だけを書く」）
2. **Auto Memory**: 自動学習システム（~/.claude/projects/memory/、MEMORY.md 200行制限）
3. **.claude/rules/**: モジュール式ルール適用
4. **settings.json**: 権限・環境設定（優先度: 管理ポリシー → CLI → project-local → project-shared → user-local → user-shared）
5. **Hooks**: 17種のライフサイクルイベント自動化
6. **Skills**: カスタムスラッシュコマンド
7. **MCP**: 外部ツール統合

### 権限モデル（最小権限の原則）
- 推奨allowパターン: `Bash(pnpm run *)`, `Bash(git status)`, `Edit(/packages/**)`
- 重要denyパターン: `Bash(git push --force *)`, `Bash(rm -rf *)`, `Read(.env*)`, `Read(**/*.pem)`

### Hooks実装（17イベント）
- 主要イベント: SessionStart, PreToolUse, PostToolUse, PermissionRequest, Stop, ConfigChange
- 3種のハンドラ: コマンド実行 / HTTPリクエスト / LLMベース判定
- PreToolUseフック例: コマンド入力からパスワード・トークンパターンを検出して実行拒否
- PostToolUse例: TypeScriptファイル保存時に`npx eslint --fix`自動実行

### Skills設定
- YAMLフロントマター: name, description, argument-hint, disable-model-invocation, context, allowed-tools
- 副作用のあるSkillには`disable-model-invocation: true`を設定（意図しない自動実行防止）

### MCP設定
- 3つのトランスポート: HTTP（推奨）/ SSE / stdio
- チーム設定: `.mcp.json`で共有統合（GitHub/Sentry/DB）
- 認証情報は環境変数経由

### 注意点
- ワイルドカードマッチ: `Bash(ls *)`はワード境界必要、`Bash(ls*)`は不要
- Hooksにはタイムアウト設定が必須（ハング防止）
