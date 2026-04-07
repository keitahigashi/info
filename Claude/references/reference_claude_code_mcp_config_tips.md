---
name: --mcp-config設定術
description: Claude Codeで--mcp-configオプションを使いMCPサーバー構成を作業別に切り替える実践テクニック
type: reference
---

## 出典
- URL: https://zenn.dev/kuxu/articles/c832ccf26b7cce
- 著者: きしもと
- 公開日: 2025-10-12（2026-01-06更新）

## 概要
MCPサーバーを追加しすぎるとコンテキストを圧迫する問題に対し、`--mcp-config`オプションで作業内容に応じて軽量/詳細な構成を使い分ける手法を解説。

## 詳細

### 基本的な使用方法
```bash
claude --mcp-config=/Users/yourname/.claude/.mcp.json
```

### 設定ファイルの使い分け
- 基本構成（`.mcp.json`）: filesystemサーバーのみ
- 開発用（`dev.mcp.json`）: filesystem + context7 + linear

### aliasで簡潔化
```bash
# ~/.zshrc
alias c='claude --mcp-config=/Users/yourname/.claude/.mcp.json'
alias c-dev='claude --mcp-config=/Users/yourname/.claude/dev.mcp.json'
```

### プロジェクト固有設定との併用
プロジェクトルートの`.mcp.json`は`--mcp-config`指定と併用される。playwrightサーバーを特定プロジェクトにのみ追加可能。

### 注意事項
- 既存の`claude mcp add`設定が残存する場合は`claude mcp list`で確認→`claude mcp remove`で削除推奨
- `--strict-mcp-config`でプロジェクト固有設定を無視可能
