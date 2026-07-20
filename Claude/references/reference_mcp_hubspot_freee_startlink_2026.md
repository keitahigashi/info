---
name: Claude Code MCP連携の始め方｜HubSpot・freee・Slackを接続する設定手順【2026年版】
description: HubSpot・freee・Slack等の主要SaaSをMCPで接続し複数データソースを横断する業務自動化の実践ガイド
type: reference
---

## 出典

StartLink: https://start-link.jp/hubspot-ai/ai/claude-code-practice/claude-code-mcp-integration

## 概要

Claude CodeとMCPを用いてHubSpot・freee・Slack・GitHub・Jira等の主要SaaSを接続し、1セッションで複数データソースを横断した分析・自動化を実現する実践ガイド（2026年版）。

## MCPアーキテクチャ（3層構造）

- MCPホスト: Claude Code等のユーザー操作アプリ
- MCPクライアント: ホスト↔サーバー間の通信管理
- MCPサーバー: 各外部サービスへのアクセス仲介

## 主要サービス連携パターン

- **HubSpot**: コンタクト・取引のパイプライン集計、担当者別クロス分析を自然言語で操作
- **freee**: 試算表・取引検索・請求書作成をClaude Codeから直接操作
- **Slack**: チャンネル要約・キーワード横断検索・通知自動化
- **GitHub**: Issue・PR作成、Actionsワークフロー確認
- **Supabase/PostgreSQL**: テーブル操作・SQL実行・マイグレーション適用

## 実践シナリオ3例

1. HubSpot+Google Sheets: 「今週のパイプライン変動をスプレッドシートに出力」→自動実行
2. freee+HubSpot+Supabase: 確定売上と見込み案件から売上着地予測を算出
3. Jira+Slack+GitHub: マージPRの未更新Jiraチケットを一覧化し#dev-updatesに投稿

## コスト最適化の重要ポイント

- 未使用MCPサーバーは`/mcp disable`で無効化→コンテキスト消費・レスポンス品質を改善
- Tool Search機能でMCPツール定義を遅延読み込み→コンテキスト使用量最大95%削減

## セキュリティのベストプラクティス

- APIキーは環境変数管理（ハードコード・Gitコミット厳禁）
- 最小権限の原則（読み取りのみ許可等）
- チーム共有は`.claude.json`で統一管理
