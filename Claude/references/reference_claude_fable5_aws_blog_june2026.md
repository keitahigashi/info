---
name: Anthropic Claude Fable 5 on AWS: 保護手段が組み込まれたMythosクラスの機能が利用可能に
description: Amazon BedrockおよびClaude Platform on AWSでのFable 5提供開始。セーフガード設計・データ保持設定・利用方法のAWS公式ブログ記事
type: reference
---

## 出典

Amazon Web Services ブログ: https://aws.amazon.com/jp/blogs/news/anthropic-claude-fable-5-on-aws-mythos-class-capabilities-with-built-in-safeguards-now-available/

## Claude Fable 5 on AWS

### 基本情報
- 公開日: 2026年6月10日
- 著者: Channy Yun (윤석찬)
- 媒体: Amazon Web Services ブログ（日本語）

---

## 概要

Claude Fable 5がAmazon BedrockおよびClaude Platform on AWSで利用可能に。「Mythosレベルの機能をすべてのお客様が利用できるようにするとともに、より広く安全に使用できるように設計された強力な保護手段」を備えたリリース。

---

## 主な機能

| 機能 | 説明 |
|------|------|
| 長時間の非同期実行 | 複雑なコーディング・ナレッジワークタスクを長期間実行可能 |
| 高度なビジョン機能 | PDFや図表・テーブルを認識 |
| 積極的な自己検証 | 学習内容に基づきスキルを自己更新 |

---

## セーフガード機構

- サイバーセキュリティ・生物学・化学・健康に関連する有害なプロンプトは自動的にOpus 4.8へフォールバック
- フォールバック時はOpus 4.8の料金のみが適用

---

## 利用方法

### 前提：データ保持設定（必須）

Anthropicが30日間のデータ保持を要件としている。以下で有効化：

```bash
curl -X PUT https://bedrock-mantle.us-east-1.api.aws/v1/data_retention \
  -H "x-api-key: <your-bedrock-api-key>" \
  -H "Content-Type: application/json" \
  -d '{ "mode": "provider_data_share" }'
```

### アクセス方法

- Anthropic Messages API
- AWS CLI
- AWS SDK

---

## 技術仕様

| 項目 | 詳細 |
|------|------|
| 対応リージョン | 米国東部（バージニア北部）・欧州（ストックホルム） |
| 最大トークン数 | 4,096 |
| データ保持期間 | 30日間（必須） |
| 想定スループット | 100,000 requests/秒 |

段階的に他のリージョンへ拡大予定。

---

## 制限事項

- Claude Mythos 5は脆弱性発見やバイオディフェンススクリーニングに対応しているが、現在アクセスは制限中

<!-- 日常で得た知見をここに追記 -->
