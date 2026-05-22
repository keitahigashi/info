---
name: New in Claude Managed Agents: self-hosted sandboxes and MCP tunnels
description: Anthropic公式発表。Claude Managed AgentsにセルフホストサンドボックスとMCPトンネル機能を追加し、エンタープライズのセキュリティ要件に対応
type: reference
---

## 出典

Claude公式ブログ: https://claude.com/blog/claude-managed-agents-updates

## 公開日

2026年05月19日

## New in Claude Managed Agents: self-hosted sandboxes and MCP tunnels

### 概要

Anthropicがエンタープライズ向けにClaude Managed Agentsへ2つの主要機能を追加。組織インフラ内でのエージェント実行とプライベートサービスへのセキュアなアクセスを実現。

### セルフホストサンドボックス（Self-Hosted Sandboxes）

**アーキテクチャの分離**

> 「エージェントループ（オーケストレーション・コンテキスト管理・エラーリカバリー）はAnthropicのインフラに残り、ツール実行は設定された環境に移動する」

| レイヤー | 実行場所 |
|---------|--------|
| オーケストレーション | Anthropicクラウド |
| ツール実行 | 企業インフラ / マネージドプロバイダー |

**対応プロバイダー**
- **Cloudflare**: MicroVM隔離、ゼロトラストシークレット、エグレス制御
- **Daytona**: バースト実行・長時間セッション対応のフルステートフルコンピュータ
- **Modal**: AIワークロード最適化、サブ秒起動
- **Vercel**: VPCピアリング・VMセキュリティ、ミリ秒起動

### MCPトンネル（MCP Tunnels）

**仕組み**

> 「デプロイする軽量ゲートウェイがアウトバウンド接続のみを行う。インバウンドファイアウォールルール不要、パブリックエンドポイント不要、エンドツーエンド暗号化」

- 企業ネットワーク内のプライベートMCPサーバーへのセキュアアクセス
- ゼロトラスト設計（インバウンドルール変更不要）
- 内部データベース、プライベートAPI、社内ナレッジベースへの接続が可能

### 提供ステータス

| 機能 | ステータス |
|-----|----------|
| セルフホストサンドボックス | **パブリックベータ** |
| MCPトンネル | **リサーチプレビュー**（アクセスリクエスト要） |

### 開始方法

- ドキュメント、GitHubクックブック、Claude Consoleからデプロイ可能

<!-- 日常で得た知見をここに追記 -->
