---
name: Claude Code × MCP実践活用ガイド
description: MCPの導入・設定・必須サーバー10選・カスタム開発・セキュリティ・実践ワークフロー5選の包括ガイド（AQUA記事）
type: reference
---

## 出典

AQUA記事: https://www.aquallc.jp/claude-code-mcp-guide/
著者: AQUA合同会社
公開日: 2026-02-26

## 概要

MCPはLLMアプリと外部ツール・データソースを接続するオープンスタンダードプロトコル。2024年11月Anthropic公開、2025年12月Linux Foundation AAIF寄贈。登録サーバー10,000以上、SDK月間DL 9,700万以上。

## アーキテクチャ

3層: Host（Claude Code等）→ Client（JSON-RPC通信）→ Server（ツール・データ公開）
3プリミティブ: Tools（実行）、Resources（読み取り）、Prompts（テンプレート）

## トランスポート

- **stdio**: ローカル、極低レイテンシ、OS権限依存
- **HTTP Streamable**: ローカル/リモート、OAuth 2.0対応、チーム共有容易
- SSEは非推奨（2025年3月改訂でHTTP Streamableに置換）

## 設定方法

### CLIコマンド
```bash
claude mcp add --transport http github https://api.githubcopilot.com/mcp/
claude mcp add --transport stdio playwright -- npx -y @playwright/mcp@latest
```

### .mcp.json（プロジェクトレベル）
HTTP: `"type": "http"` + `"url"`、stdio: `"command"` + `"args"`

### スコープ（優先度順）
1. local（~/.claude.json内、最高優先）
2. project（.mcp.json、チーム共有）
3. user（~/.claude.json、全プロジェクト）

## 必須MCPサーバー10選

1. **GitHub MCP** - PR・Issue管理、OAuth認証
2. **DBHub** - PostgreSQL/MySQL/SQLite等、スキーマ認識
3. **Docker MCP Toolkit** - 100+コンテナ化サーバー
4. **Playwright MCP** - ブラウザ自動操作・E2E
5. **Sentry MCP** - エラー監視・Seer AI分析
6. **Vitest MCP** - テスト実行・カバレッジ
7. **Context7** - 最新公式ドキュメント直接注入（user scope推奨）
8. **Notion MCP** - ページ・DB操作
9. **Slack MCP** - メッセージ・チャンネル操作
10. **Rube** - 複数サービス統合ハブ

## Tool Search（遅延ロード）

MCPサーバー増加によるトークン消費問題の解決策。`ENABLE_MCP_TOOL_SEARCH=auto`で自動有効化。効果: トークンオーバーヘッド最大95%削減、ツール選択精度+25ポイント（Opus 4）

## セキュリティ

### 既知CVE
- CVE-2025-6514: mcp-remote OSコマンド実行（Critical 9.6）
- CVE-2025-49596: MCP Inspector DNSリバインディング+RCE（Critical 9.4）
- CVE-2025-68143〜68145: mcp-server-git パストラバーサル/引数インジェクション

### 管理者制御
- `managed-mcp.json`で組織レベルのサーバー許可/拒否リスト
- `exclusive: true`で定義サーバーのみ許可
- ネットワーク分離（URL制限）

## 実践ワークフロー5選

1. GitHub MCP × PRレビュー自動化
2. DB MCP × マイグレーション生成
3. Playwright MCP × E2Eテスト自動生成
4. Sentry MCP × バグ自動修復
5. Context7 MCP × 最新ドキュメント参照

## 導入ロードマップ

- Week 1-2: GitHub MCP + Context7導入
- Week 3-4: .mcp.jsonチーム展開、Tool Search有効化
- Month 2+: カスタムMCP開発、managed-mcp.jsonガバナンス
