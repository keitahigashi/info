---
name: エアークローゼット自社MCPサーバー群17個一挙公開
description: 社内業務をAIに開放。17個のMCPサーバー構成（DB横断検索・GCP/AWS・GWS・Grafana・CI/CD・Workspace・Sandbox）と5層セキュリティ設計
type: reference
---

## 出典
- URL: https://zenn.dev/aircloset/articles/d9fc317c1336c2
- 著者: 辻 亮佑（エアークローゼット）
- 公開日: 2026-04-08

## 概要
エアークローゼット社が構築した17個の自社MCPサーバー群の全容公開。データ層・インフラ層・ドキュメント層・運用監視層・開発基盤層の5カテゴリ構成と、OAuth+5層多層防御のセキュリティアーキテクチャ。

## 詳細

### MCPサーバー構成（17個）

**データ層**
- DB Graph: 全社17DB・994テーブルの横断検索・クエリ実行

**インフラ層**
- GCloud: GCPリソース読み取り専用参照（`cloud-platform.read-only`スコープ）
- AWS: AWSリソース読み取り専用（STS AssumeRoleWithWebIdentity活用）

**ドキュメント・ナレッジ層**
- GWS: Google Workspace全サービス操作
- Git Server: 全社Gitリポジトリ読み取り参照（レートリミット回避）

**運用・監視層**
- Grafana MCP: PromQL/LogQLクエリ、ダッシュボード参照
- CircleCI MCP: パイプライン実行・ビルドログ・テスト結果確認

**開発基盤層**
- Workspace MCP: GitHub不要のコード編集・デプロイ（Firestore ACL管理）
- Sandbox MCP: 非エンジニア向けアプリデプロイ（Cloud Run + Cloudflare Access）

### 共通認証方式
- Google OAuth 2.0 + PKCE
- RFC 8414自動検出対応
- `.mcp.json`設定のみで認可フロー開始
- Upstash Redisセッションストア
- SSO Cookie（7日TTL、スライディングウィンドウ）

### セキュリティアーキテクチャ（5層多層防御）
1. OAuth + SSO
2. スコープ制限
3. データレベル保護
4. PII自動匿名化
5. 監査ログ（BigQueryツール利用ログ・GCP Audit Log・CloudTrail統合）

### 技術スタック
- 実装言語: TypeScript
- IaC: Pulumi
- 認証: Google Workspace OAuth
- ホスティング: GCP（Cloud Run, GCE）
- セッション: Upstash Redis

### 設計原則
1. スコープ最小化（各MCPに必要な権限のみ）
2. 読み取り優先（read-onlyから段階的に書き込み追加）
3. 既存ツール活用（gcloud/aws/gws CLIをOAuthプロキシ背後に配置）
4. Firestoreベースのロール・パス管理
5. コード→デプロイ→監視→修正の完全ループ統合

### Workspace MCPワークフロー例
workspace_init → workspace_write_file → workspace_diff → workspace_commit → workspace_push → workspace_deploy → workspace_create_pr
