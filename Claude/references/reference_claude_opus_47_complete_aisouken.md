---
name: Claude Opus 4.7とは？新機能・性能・料金を徹底解説
description: SWE-bench 87.6%・xhigh・Task Budgets・3.75MPビジョン・API各プラットフォーム利用経路を一気通貫で解説
type: reference
---

## 出典

AI総合研究所（坂本将磨 Microsoft MVP）: https://www.ai-souken.com/article/what-is-claude-opus-4-7

## 記事の概要

2026年4月17日公開。Anthropicが2026年4月16日にリリースしたClaude Opus 4.7について、性能向上・新機能・料金・各プラットフォームでの利用方法・乗り換え判定基準を包括的に解説。

## 性能向上

| 指標 | Opus 4.6 | Opus 4.7 |
|---|---|---|
| SWE-bench Verified | 80.8% | **87.6%** |
| SWE-bench Pro | 53.4% | **64.3%** |
| ビジョン解像度 | 1,120px | **2,576px（3.75MP）** |

## 主な新機能

### xhigh Effort Level
- Adaptive Thinkingの最高強度
- coding/agenticタスクの推奨デフォルト設定
- 長時間・複雑タスクに特化

### Task Budgets
- エージェントループ全体のトークン予算を制御
- 無制限ループの防止・コスト管理に有効

### Cyber Verification Program
- セキュリティ特化の検証プログラム
- AIによるゼロデイ発見能力の拡充

## トークナイザー変更と実効コスト

- 新トークナイザー導入により同一入力で **1.0〜1.35倍** のトークン増加
- 料金は据え置き（$5/$25 per M tokens）だが実質コストが最大35%増
- 補償措置としてPro/Maxユーザーの使用配額を永久増加

## 各プラットフォームでの利用

| プラットフォーム | 状況 |
|---|---|
| Claude.ai | Pro/Max/Team/Enterprise |
| Anthropic API | 即時利用可能 |
| Amazon Bedrock | 東京を含む4リージョン対応 |
| Google Vertex AI | 利用可能 |
| Microsoft Azure AI Foundry | 利用可能 |
| GitHub Copilot | 統合対応 |

## 乗り換え判定基準

**Opus 4.7推奨**: コーディング比率が高い・長時間エージェントタスク・高品質ビジョン解析が必要
**据え置き推奨**: 単純Q&A中心・コスト最優先・API互換性変更対応工数が取れない

## API破壊的変更（移行注意）

1. `temperature`/`top_p`/`top_k` をデフォルト以外に設定すると400エラー
2. `assistant prefill` が使用不可（400エラー）
3. 固定 `thinking budget` が廃止されAdaptive Thinkingに移行
