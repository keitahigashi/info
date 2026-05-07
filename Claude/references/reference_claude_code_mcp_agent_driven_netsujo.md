---
name: Claude Code × MCPで始めるAgent駆動開発
description: Netsujo株式会社がClaude CodeとMCPを組み合わせたエージェント駆動開発の実践パターンを解説。6つのMCPサーバー構成と具体的な業務自動化事例を紹介。
type: reference
---

## 出典

Netsujo Tech Blog: https://netsujo.jp/blog/claude-code-mcp-agent-driven-dev-2026

## Claude Code × MCP によるAgent駆動開発

### Claude Code の位置づけ

- ファイル編集・シェル実行・Web検索・外部ツール連携を組み合わせて作業を進める開発エージェント
- エンジニアの役割が「実装」から「エージェントに何をやらせるかの設計」へシフト

### MCP（Model Context Protocol）の役割

- LLM に外部ツールや外部データを接続する標準プロトコル
- 複数のエージェント実装で再利用可能
- Netsujo では6つの MCP サーバーを日常業務で運用

### 実運用の MCP サーバー構成（Netsujo）

| MCPサーバー | 用途 |
|------------|------|
| Google Workspace | メール・カレンダー・ドライブ操作 |
| Google Search Console | SEO分析・キーワード確認 |
| Analytics 4 | アクセス解析 |
| Chrome DevTools | フロントエンドデバッグ |
| Strapi | CMS 操作 |
| Playwright | E2Eテスト・ブラウザ自動化 |

### MCP 設定例

```json
{
  "mcpServers": {
    "google-workspace": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-google-workspace"]
    }
  }
}
```

認証情報は環境変数経由で渡し、設定ファイルには秘匿情報を記載しない。

### 3つの実用パターン

1. **コードレビューと実装の分離** — 品質を安定化
2. **セキュリティ監査の並行実行** — パッケージ更新時に自動監査
3. **調査と実装の並行** — 調査時間を1/3に短縮

### 業務自動化の成果事例

| 業務 | Before | After |
|------|--------|-------|
| SEO記事生成 | 90分 | 15分 |
| 定期メールチェック | 手動 | cron自動化で大幅削減 |
| Webhook デバッグ | 数時間 | 10分で原因特定 |

### 課題と導入ステップ

**課題：** APIコスト増加・コンテキスト分断・学習コスト

**週5回以上の定型作業** が自動化の適性ライン

**導入ステップ：**
1. Claude Codeをインストール
2. 既存MCPサーバー1つを接続
3. 定型作業をプロンプト化
4. コスト監視体制を整備
