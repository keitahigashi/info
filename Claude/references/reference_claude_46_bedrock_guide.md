---
name: Claude 4.6使い方ガイド（Bedrock活用）
description: Claude 4.6モデル比較・API料金・Amazon Bedrock導入・ハルシネーション対策（cloudpack記事）
type: reference
---

## 出典
- URL: https://cloudpack.jp/column/generative-ai/claude-46-complete-guide.html
- 著者: 後藤 和貴（cloudpack）
- 公開日: 2026-03-25

## 概要
Claude 4.6の最新モデル比較、API料金体系、Amazon Bedrock経由のエンタープライズ導入方法を解説。

## 詳細

### モデル比較
| モデル | 特性 | コンテキスト |
|--------|------|-------------|
| Opus 4.6 | 最高性能・複雑推論 | 100万トークン |
| Sonnet 4.6 | バランス型 | 100万トークン |
| Haiku 4.5 | 高速・低コスト | 20万トークン |

### API料金（Bedrock経由、100万トークンあたり）
| モデル | 入力 | 出力 |
|--------|------|------|
| Opus 4.6 | $5 | $25 |
| Sonnet 4.6 | $3 | $15 |
| Haiku 4.5 | $1 | $5 |

### Bedrock導入メリット
- VPCエンドポイントでインターネット非経由通信
- IAMポリシーによるアクセス制御
- マネージドサービスとしての高可用性

### ハルシネーション対策
- RAG（検索拡張生成）で社内データ参照
- 忠実性(Faithfulness)・応答関連性(Response Relevancy)で継続評価
