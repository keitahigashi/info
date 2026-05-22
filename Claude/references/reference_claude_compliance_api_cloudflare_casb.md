---
name: Announcing Claude Compliance API support with Cloudflare CASB
description: CloudflareがCloud Access Security Broker（CASB）でClaude Compliance APIをサポート。エンドポイントエージェント不要でClaude Enterprise利用状況のセキュリティ監視・DLP違反検出が可能
type: reference
---

## 出典

Cloudflare Blog: https://blog.cloudflare.com/casb-anthropic-integration/

## 公開日

2026年05月21日

## Announcing Claude Compliance API support with Cloudflare CASB

### 概要

CloudflareのCloud Access Security Broker（CASB）がClaude Compliance APIとの統合を発表。セキュリティチームはCloudflareダッシュボードから直接Claude Enterprise利用状況を監視でき、エンドポイントエージェントは不要。

### AIセキュリティの特殊性

従来のSaaSと異なり、AIツールは「会話的・永続的・深く統合されている」特性がある。
- 従業員による機密ファイルのアップロードリスク
- APIキーの誤共有リスク
- プロンプト・レスポンスの情報漏洩リスク

### Cloudflare包括的ソリューション構成

| コンポーネント | 機能 |
|------------|-----|
| AI Gateway | リクエスト・トークン支出・モデルパフォーマンスの可視化 |
| Gateway + DLP | AIトラフィック検査と機密データブロック |
| Access + MCPポータル | エージェント接続の一元管理 |
| **CASB** | 保存データのスキャン（エージェント不要） |

### サポート対象のセキュリティ所見

監視対象アセット：
- **プロジェクト共有**の検出
- **プロジェクト添付ファイル**（DLP違反）
- **チャットファイル**（アップロード・生成ファイル）
- **チャットメッセージ**（プロンプト・応答）
- **アーティファクト**（生成ドキュメント）

### Claude Enterprise vs Platform の監視範囲

| 対象 | 監視内容 |
|-----|---------|
| **Enterprise** | 組織・プロジェクト・チャット・ロール・会話内容 |
| **Platform** | メンバー変更・APIキー作成・ファイルイベント追跡 |

### 設定手順

1. Claude Enterpriseアカウントを確保
2. Compliance APIアクセスをリクエスト
3. Cloudflareダッシュボード > Zero Trust > Integrations > Cloud & SaaS
4. Anthropic統合を追加 + APIキーを入力
5. DLPプロファイルを設定（ファイルスキャン用）

統合後、数分で検出結果がダッシュボードに表示される。

### 今後の展開

- 追加AIツール対応
- カスタム検出ルール
- 自動修復ワークフロー機能の拡充予定

<!-- 日常で得た知見をここに追記 -->
