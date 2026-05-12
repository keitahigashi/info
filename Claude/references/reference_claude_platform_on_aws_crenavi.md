---
name: Claude Platform on AWS が正式リリース。AnthropicがデータをAWS外で処理する新選択肢
description: crenavi記事：2026年5月11日に正式リリースされたClaude Platform on AWSの特徴・Amazon Bedrockとの違い・東京リージョン対応を解説
type: reference
---

## 出典

クリナビ: https://crenavi.com/column/claude-platform-on-aws-2026-launch

## Claude Platform on AWS 正式リリース

### 概要

2026年5月11日、AWS経由でAnthropicネイティブのClaude Platformを利用できる新サービスが正式リリース。
**データ処理の分離**が最大の特徴：Anthropicがサービス運営し、顧客データはAWS境界外で処理される。

### 主な特徴

| 項目 | 内容 |
|------|------|
| データ処理 | Anthropicが担当（AWS境界外） |
| AWSの役割 | 認証・課金・監査ログのインフラのみ |
| 認証方式 | AWS IAM + APIキーの2方式に対応 |
| 課金 | AWS Marketplace経由で単一請求 |
| トークン価格 | Claude APIと同一 |
| 機能 | Claude APIの全機能を初日から提供 |

### 対応モデル

- Claude Opus 4.7
- Claude Sonnet 4.6
- Claude Haiku 4.5

### 対応地域

東京リージョンを含むグローバル主要リージョン

### Amazon Bedrockとの違い

| 比較点 | Claude Platform on AWS | Amazon Bedrock |
|--------|----------------------|----------------|
| データ処理主体 | Anthropic（AWS外） | AWS（Bedrock内） |
| データレジデンシー要件 | 厳格な要件に対応 | AWSリージョン内 |
| 管理機能 | Claude Platform UIを使用 | AWS Consoleを使用 |
| 利用可能機能 | Claude API全機能 | Bedrock API機能セット |

### ユースケース

- 金融・医療など厳格なデータレジデンシー要件がある企業
- AWSの請求・認証インフラを活かしながらAnthropicのデータ処理を使いたい組織
- 既存のAWSインフラとの統合が必要なエンタープライズ
