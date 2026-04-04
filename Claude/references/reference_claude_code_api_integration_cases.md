---
name: Claude Code外部サービス連携事例まとめ
description: Claude CodeのSlack・LINE・Notion等外部サービス連携パターン3種（MCP・Hook・CI/CD）の実装事例
type: reference
---

## 出典
https://generative-ai.co.jp/claude-code-curation/claude-code-curation-api-integration-cases-2026-03/
著者: shakujii.masa（generative-ai.co.jp編集部）、公開日: 2026-03-23

## 概要
Claude Codeの外部サービス連携を3パターン（MCPサーバー・Hook機能・OSS+CI/CD）に分類し、実務事例を紹介するキュレーション記事。

## 詳細

### パターン1: MCPサーバーによる外部連携
- FastMCPツールでローカルMCPサーバー構築
- Notion API連携、Slack Webhook統合
- 「データを取得して」で自動的に外部APIを呼び出し

### パターン2: Hook機能による開発環境の自動統一
- npm installをbunコマンドに自動差し替え
- プロジェクトごとのツール統一を強制
- 応用: Slack/Notion APIへの自動通知制御、ログ自動送信

### パターン3: OSS+CI/CD連携によるコード品質保証
- 7リポジトリのOSS公開事例
- Claude Code・Cursor・Kiro 3ツール対応
- Lintツール統合、CI/CDパイプライン連携
- Slack/Discordへの品質レビュー結果共有

### 学習ポイント
1. 外部連携基礎: MCPサーバーの仕組みと実装
2. 環境統一: Hookによる開発ツール強制統一
3. 品質管理: AI生成コードの自動チェックと通知運用
