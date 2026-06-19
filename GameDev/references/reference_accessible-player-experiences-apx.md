---
name: "Accessible Player Experiences: A New Approach to Data Informed Design for Accessible Games"
description: AbleGamersが開発した22のAPXデザインパターンによる、データに基づくゲームアクセシビリティ設計の新アプローチ
type: reference
---

## 出典

GDC Vault / GDC 2019 (Christopher Power, Mark Barlet): https://www.gdcvault.com/play/1025719/Accessible-Player-Experiences-A-New

## Accessible Player Experiences (APX) — データインフォームドなアクセシビリティ設計

著者: Christopher Power (University of York) / Mark Barlet (AbleGamers Charity) / 発表: GDC 2019

### 背景と問題意識

AbleGamers Charity が数百人の障害を持つプレイヤーのデータを分析したところ、従来のアクセシビリティ対応は「後付け」「個別対応」になりがちで、開発後半での修正コストが高くなることが判明。

**主な発見:**
- 異なる障害グループ間でテクノロジー利用に重複パターンが存在する
- 一人の解決策が多くのプレイヤーに恩恵をもたらすケースが多い
- 開発初期段階でのアクセシビリティ検討が最もコスト効率が高い

### APXデザインパターンとは

**APX (Accessible Player Experiences)** は22個のデザインパターンで構成される実践的ツールセット。

特徴:
- 設計プロセスに統合できる形式で提供される
- 開発者がアクセシビリティを「後から追加する機能」ではなく「設計の一部」として考えるための枠組み
- データに基づいており、実際の障害プレイヤーのニーズから導出されている

### データインフォームド設計のフレームワーク

```
障害プレイヤーのデータ収集
    ↓
テクノロジー利用パターンの分析
    ↓
重複・共通ニーズの識別
    ↓
APXパターンとしての抽象化
    ↓
設計プロセスへの統合（初期段階から）
```

### 汎用化ポイント

- **ユニバーサルデザイン (universal design)** の原則と整合: 「一人のための設計が全員にとって良い設計」
- アクセシビリティ機能はニッチな追加でなく、広いプレイヤー層のUX向上につながる
- *The Last of Us Part II* の60以上のアクセシビリティ設定が典型例: 障害を持つプレイヤーだけでなく多くのプレイヤーに利用される
