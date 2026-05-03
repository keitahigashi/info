---
name: Claude Code の MCP サーバー設定完全ガイド｜推奨サーバー一覧と実装例
description: MCPサーバーの設定手順・推奨5選・カスタム開発・セキュリティ対策を網羅したガイド
type: reference
---

## 出典

AI Beat: https://ainow.jp/claude-code-mcp-server-guide/

## MCP概要

Model Context Protocol（MCP）は、AIモデルが外部ツールやデータソースと通信するための標準規格。Anthropicが2024年11月にオープンソース化。

## 推奨MCPサーバー5選

| サーバー | 機能 | 推奨理由 |
|---------|------|---------|
| filesystem | ローカルファイル操作 | 入門最適・安全 |
| git | Gitリポジトリ操作 | 開発基本操作 |
| github | GitHub API 連携 | PR/Issue管理 |
| playwright | ブラウザ自動操作 | E2Eテスト・スクレイピング |
| postgres | データベース操作 | DB管理・分析 |

**推奨**: 「まず filesystem と git の 2 本から始める」

## セットアップ手順

環境別（macOS/Linux/Windows WSL）に手順を詳述。`~/.claude.json`に `mcpServers` セクションを追加。

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/dir"]
    }
  }
}
```

## カスタムサーバー開発

TypeScriptおよびPythonのSDKを用いた実装例を掲載。独自APIやデータソース連携に対応。

## セキュリティ対策

- APIキーはクレデンシャル直書きを避け、環境変数または `.env.local` で管理
- `.gitignore` への登録で公開リポジトリへの漏洩を防止

## メタ情報

- 著者: AI Beat編集部
- 公開日: 2026年4月27日
