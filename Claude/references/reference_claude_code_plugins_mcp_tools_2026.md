---
name: Claude Codeプラグイン・MCP・ツール総まとめ2026
description: Claude Codeを最強にするプラグイン・MCP・周辺ツールの網羅的カタログ（Tier別MCP・プラグイン・推奨構成）
type: reference
---

## 出典
https://qiita.com/shatolin/items/ca1810e419fee5fd963b
著者: shatolin（Kenpal株式会社）、公開日: 2026-02-06、いいね: 425

## 概要
Claude Code向けのMCPサーバー、プラグイン、周辺ツールを網羅的にカタログ化した記事。Tier別の推奨構成と初期セットアップガイドを提供。

## 詳細

### MCPサーバー Tier 1（必須級）
| サーバー | 機能 | 設定コマンド |
|---------|------|----------|
| GitHub MCP | PR・Issue・CI/CD | `claude mcp add --transport sse github https://api.github.com/mcp` |
| Context7 MCP | 最新ドキュメント自動参照 | `claude mcp add context7 -s user -- npx -y @upstash/context7-mcp` |
| Playwright MCP | E2Eテスト・スクリーンショット | `claude mcp add playwright -s project -- npx -y @playwright/mcp@latest` |
| Sentry MCP | エラー監視・スタックトレース | `claude mcp add --transport sse sentry https://mcp.sentry.dev/sse` |

### MCPサーバー Tier 2
Firecrawl、PostgreSQL MCP、Linear MCP、Brave Search MCP、Memory MCP、Markitdown、YouTube、Figma、Slack、Backlog、AWS、Firebase、Zapier、Puppeteer等

### 注目プラグイン
- **Claude-Mem** (★20,000超): セッション自動記録・AI圧縮・関連コンテキスト自動差し込み。SQLite+Chroma、Web UIビューア
- **Superpowers** (★43,000超、Anthropic公式採択): 7フェーズ開発ワークフロー（ブレスト→設計→計画→TDD→サブエージェント→レビュー→統合）
- **Ralph Wiggum Loop**: 完了まで自動反復

### 周辺ツール
Repomix（リポジトリ→LLM用変換）、claude-code.nvim（Neovim対応）、Claudia（エージェント管理GUI）、ccflare（使用量ダッシュボード）

### 推奨初期セットアップ
- 個人開発: Context7 + Playwright + Brave Search
- チーム開発: + GitHub + Sentry + Linear
