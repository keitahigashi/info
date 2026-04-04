---
name: Claude Code公式MCPドキュメント
description: MCP公式ガイド — サーバー追加(HTTP/SSE/stdio)・スコープ管理・OAuth認証・ツール検索・管理対象MCP・リソース参照（code.claude.com）
type: reference
---

## 出典
- URL: https://code.claude.com/docs/ja/mcp
- 著者: Anthropic（公式ドキュメント）

## 概要
Claude CodeでのMCP（Model Context Protocol）利用に関する公式完全ガイド。サーバー追加・管理・認証・スケーリングを網羅。

## 詳細

### サーバー追加方法（3種）
1. HTTP (推奨): `claude mcp add --transport http <name> <url>`
2. SSE (非推奨): `claude mcp add --transport sse <name> <url>`
3. stdio (ローカル): `claude mcp add <name> -- <command> [args...]`
- Windowsではstdioに`cmd /c`ラッパー必要

### スコープ（3レベル）
- **local** (デフォルト): 現在のプロジェクトのみ、~/.claude.jsonに保存
- **project**: .mcp.jsonに保存、git管理でチーム共有
- **user**: 全プロジェクトで利用可能
- 優先順位: local > project > user

### OAuth認証
- `/mcp`でブラウザ認証フロー
- --callback-portで固定ポート指定
- --client-id / --client-secretで事前設定認証情報
- headersHelperでカスタム認証（Kerberos, SSO等）

### ツール検索（Tool Search）
- MCPツール定義がコンテキスト10%超で自動有効化
- オンデマンドでツールを動的ロード（遅延）
- ENABLE_TOOL_SEARCH=auto:<N>でしきい値カスタマイズ
- Sonnet 4以降 / Opus 4以降が必要（Haiku非対応）

### 管理対象MCP
- managed-mcp.json: 排他的制御（ユーザー変更不可）
- allowedMcpServers / deniedMcpServers: ポリシーベース制御
- serverName / serverCommand / serverUrl でマッチング

### その他
- MCP出力制限: デフォルト25,000トークン、MAX_MCP_OUTPUT_TOKENS環境変数
- .mcp.jsonで環境変数展開: ${VAR}、${VAR:-default}
- MCP Elicitation: サーバーからの構造化入力要求
- Channels: MCPサーバーからのプッシュ型メッセージ
- `claude mcp serve`: Claude Code自体をMCPサーバーとして公開
