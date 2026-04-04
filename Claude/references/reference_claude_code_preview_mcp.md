---
name: Claude Code Preview MCP フロントエンドファースト開発
description: Preview MCP・Chrome DevTools MCP・Raindrop MCP・Builder.io Fusion 1.0による並列エージェント開発設計（タオリス記事）
type: reference
---

## 出典
- URL: https://www.taolis.net/articles/claude-code-preview-mcp-frontend-first-20-parallel-agents-browser-preview
- 著者: 伊東雄歩（株式会社ウォーカー CEO）
- 公開日: 2026-03-15

## 概要
Claude CodeのMCPサーバー機能を活用したフロントエンドファースト開発設計。Preview MCP、Chrome DevTools MCP、Raindrop MCP、Builder.io Fusion 1.0を組み合わせた並列エージェント開発パターンを解説。

## 詳細

### Claude Code MCPサーバー機能
- MCPクライアントとサーバーの**デュアルモードアーキテクチャ**
- `claude mcp serve` でBash・Read・Write・Editなどのネイティブツールを外部に公開
- stdioトランスポート経由のJSON-RPC 2.0プロトコル
- ローカル開発環境に限定

### Chrome DevTools MCP（v0.19.0）
- リアルタイムスクリーンショット
- HTTPリクエスト/レスポンス監視
- ソースマップ対応スタックトレース含むコンソール統合
- Lighthouse自動監査・WCAG準拠チェック
- DOM操作自動化
- `--slim`モードでトークン消費削減

### Raindrop MCPフロントエンドファースト開発（4段階フロー）
1. **UI構築**: モックデータで機能するUIを先に完成
2. **PRD自動生成**: コード解析による自動仕様化
3. **バックエンド実装**: スキーマ・API自動生成
4. **統合テスト**: モックから実APIへ置換
- UIを先に確定させることで仕様の曖昧さが激減

### Builder.io Fusion 1.0
- 200万以上データで訓練された専用AIがFigmaをReactに変換
- Slack・Jira・GitHub・Figmaの4チャネル並列処理
- 理論上20並列エージェント稼働

### MCP Tool Search最適化
- ツール記述がコンテキストウィンドウの10%超で自動発動
- トークン消費89%削減、モデル精度最大25ポイント向上

### 推奨スタック構成
Claude Code（オーケストレーション層）→ MCP Server層（Chrome DevTools・Raindrop・GitHub・Postgres）→ Builder.io Fusion 1.0

### MCPエコシステム規模（2026年3月時点）
- 公式サーバー200以上、コミュニティ全体で3,000以上
- 必須サーバー: GitHub・Brave Search・Playwright MCP
