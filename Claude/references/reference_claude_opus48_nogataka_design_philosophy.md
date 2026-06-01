---
name: Claude Opus 4.8 を読み解く――「賢さ」から「任せられるか」へ移った設計思想とDynamic Workflows
description: nogataka氏がOpus 4.8の設計思想を「信頼性」軸で分析。effortパラメータ・Dynamic Workflows・誠実性向上の意味を解説
type: reference
---

## 出典

Qiita (@nogataka): https://qiita.com/nogataka/items/266dcb5c7a08e25d09d8

## 設計思想の転換

Opus 4.8 の変更点を4領域で整理:

| 領域 | 変化 |
|------|------|
| モデルの性格 | コード欠陥見逃し率が約1/4に改善 |
| 制御の粒度 | effortパラメータ（high/xhigh/max）導入 |
| API設計 | messages配列内にsystemエントリ配置可能に |
| 実行の構造 | Dynamic Workflowsで複数エージェントをオーケストレーション |

## ベンチマークの読み方

「エージェント・ツール利用系で+5前後の伸び、純学術知識系（GPQA Diamond）は微減」 → Anthropicの優先順位が「実環境での長期動作能力」に移行していることを示す

## effortパラメータの意義

思考量をコストとして利用者が制御できる仕組み。デフォルトを軽くしながら性能向上を実現。

## Dynamic Workflowsの特徴

- 複数の並列サブエージェントが**敵対的検証**（adversarial）を行い、反証を試みることで誤りを防止
- BunによるZig→Rustコード移植750,000行を11日で完了した実例
- 個別機能は「任せられるエージェント」という一本の目的に向かう部品として機能

## 結論

評価の重心が「知識量」から「信頼性」へ移行。自身のミスに気づいて立ち止まられることが長時間タスク実行の信頼性向上につながる。
