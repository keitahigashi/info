---
name: Claude Skills vs MCP 2026年ガイド
description: SkillsとMCPの抽象化レイヤー・アーキテクチャ比較・補完的統合パターン解説（CometAPI記事）
type: reference
---

## 出典
- URL: https://www.cometapi.com/ja/claude-skills-vs-mcp-the-2026-guide-to-agentic-architecture/
- 著者: CometAPI
- 公開日: 2026年頃

## 概要
Claude SkillsとMCPの違いを抽象化レイヤーの観点から比較し、エンタープライズでの補完的統合パターンを解説。

## 詳細

### コア定義
- **Skills**: タスク特化のバンドル知識+スクリプト。専門的な作業の遂行方法を教える
- **MCP**: AIエージェントが外部サービスを標準的に発見・呼び出すためのオープンプロトコル

### 抽象化レイヤーの違い
- MCP: インフラストラクチャ層（認証、APIスキーマ定義）
- Skills: アプリケーション層（ワークフロー、タスク固有の指示）

### アーキテクチャ比較

| 特性 | MCP | Skills |
|------|-----|--------|
| 主要機能 | 接続性とデータアクセス | オーケストレーションと手順 |
| スコープ | システムレベル | ユーザーレベル |
| 実行環境 | 外部プロセス | コンテキスト内 |
| 相互運用性 | ユニバーサル | 高度に文脈依存 |

### 補完的統合パターン
- MCPレイヤーが正準リソースを公開 → Skillレイヤーがそれを参照してワークフロー実装
- 比喩: MCPが「キッチンと材料」、Skillsが「レシピ」

### MCP設定例
```json
{
  "mcpServers": {
    "sqlite-database": {
      "command": "uvx",
      "args": ["mcp-server-sqlite", "--db-path", "./data.db"],
      "env": {"READ_ONLY": "true"}
    }
  }
}
```

### 2026年1月の重要更新
- MCP UI Framework: MCPサーバーがチャットウィンドウ内でインタラクティブなGUIを提供可能に
