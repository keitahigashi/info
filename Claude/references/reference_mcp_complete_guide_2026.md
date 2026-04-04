---
name: MCP完全ガイド 2026 — Claude Code外部ツール連携
description: MCPのアーキテクチャ・設定方法・利用可能サーバー一覧・セキュリティモデル・Cowork連携（仁頼記事）
type: reference
---

## 出典
- URL: https://jinrai.co.jp/blog/2026/03/26/claude-mcp-guide/
- 著者: 齊藤一樹（株式会社仁頼）
- 公開日: 2026-03-26

## 概要
MCPの基本概念からClaude Code/Coworkでの設定方法、利用可能サーバー一覧、セキュリティモデルまでを網羅した完全ガイド。「AIのためのUSB-Cポート」という比喩でMCPの役割を説明。

## 詳細

### MCPの基本概念
- Anthropicが2024年に公開したオープンソースの通信規格
- AIモデルと外部データソース・ツールを接続する標準プロトコル
- 「AIのためのUSB-Cポート」— 共通規格で統一的に接続
- クライアント・サーバー2層構造

### 利用可能なMCPサーバー（2026年3月時点）
**Google Workspace**: Gmail（メール送受信・検索）、Google Drive（ファイル操作）、Google Calendar（予定管理）
**コミュニケーション**: Slack（メッセージ・チャンネル管理）
**開発**: GitHub、GitLab（リポジトリ・Issue・PR操作）
**その他**: Figma、PostgreSQL、MySQL、Notion、Dropbox、Box

### 接続方法
- **Claude Cowork**: Settings→Connectorsメニューから選択、OAuth認証対応サービスはワンクリック接続
- **Claude Code**: `.claude/mcp_config.json` にサーバーURL・認証情報・スコープを記述。Claude Codeに指示すれば雛形を自動生成可能
- **自作サーバー**: MCP SDKでPython/TypeScript/Javaで実装可能。社内・レガシーシステムも接続可能

### 最新機能との関連
- Code Channels: MCPベースのメッセージング連携
- Computer Use: API接続優先、非接続時のみ画面操作にフォールバック
- Dispatch: MCPの上に構築

### セキュリティモデル
- 明示的に許可されたサービスのみアクセス可能
- 各サーバーにスコープ（許可アクション範囲）設定可能
- OAuthトークンはローカル保存（Enterprise版は組織管理可）
- 本番DB接続時は読み取り専用推奨

### 費用
- MCPプロトコル自体は無料
- 使用にはClaude CodeまたはCowork（Pro以上）が必要
