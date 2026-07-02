---
name: Claude Code × MCP 実践活用ガイド【2026年最新】｜導入・設定・自作・セキュリティまで完全網羅
description: MCPの3プリミティブ・3スコープ管理・推奨10サーバー・カスタムサーバー自作・5層セキュリティ防御・Tool Search（コンテキスト最大95%削減）まで、エンタープライズMCP運用の全知識を網羅したガイド
type: reference
---

## 出典

AQUA テックブログ（AQUA合同会社）: https://www.aquallc.jp/claude-code-mcp-guide/

## MCPの3つのプリミティブ

| プリミティブ | 役割 |
|------------|------|
| Tools | 実行可能アクション（DB操作・API呼び出し等） |
| Resources | 読み取り専用データ（ファイル・スキーマ等） |
| Prompts | 再利用可能テンプレート |

## 3スコープ管理

- `local`: `~/.claude.json`（個人設定）
- `project`: `.mcp.json`（チーム共有）
- `user`: 全プロジェクトで利用

## 推奨MCPサーバー10選

GitHub MCP / DBHub（PostgreSQL）/ Docker MCP Toolkit / Playwright / Sentry / Vitest / Context7 / Notion / Slack / Rube

## MCPサーバー追加コマンド

```bash
claude mcp add --transport http github https://api.githubcopilot.com/mcp/
claude mcp add --scope project db -- npx -y @bytebase/dbhub --dsn "${DATABASE_URL}"
```

## .mcp.json 設定例

```json
{
  "mcpServers": {
    "github": { "type": "http", "url": "https://api.githubcopilot.com/mcp/" },
    "database": { "command": "npx", "args": ["-y", "@bytebase/dbhub", "--dsn", "${DATABASE_URL}"] }
  }
}
```

## 5層セキュリティ防御

ネットワーク分離 → `managed-mcp.json`（管理者制御）→ 許可/拒否リスト → ユーザー承認 → ツール権限制限

```json
{
  "exclusive": true,
  "policy": {
    "allowedMcpServers": [{ "serverUrl": "https://*.internal.corp/*" }],
    "deniedMcpServers": [{ "serverUrl": "http://*" }]
  }
}
```

## 高度機能

### Tool Search（遅延ロード）
MCPツール定義をオンデマンドロードすることで：
- コンテキスト最大**95%削減**
- ツール選択精度最大**25ポイント向上**

### エージェント・イン・エージェント
`claude mcp serve` でClaude Code自体をMCPサーバーとして公開し、メインエージェントから呼び出すアーキテクチャが可能。

## 5つの実践ワークフロー

1. GitHub MCP × PRレビュー自動化
2. DB MCP × マイグレーション生成
3. Playwright MCP × E2Eテスト自動生成
4. Sentry MCP × バグ自動修復
5. Context7 MCP × 最新ドキュメント参照

## 段階的導入ロードマップ

- Week 1-2: 基礎導入（GitHub MCP + Context7）
- Week 3-4: チーム展開（.mcp.json共有・スコープ設計）
- Month 2+: 高度活用（Tool Search・自作サーバー・セキュリティ強化）
