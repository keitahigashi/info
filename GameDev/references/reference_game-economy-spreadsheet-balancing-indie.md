---
name: Game Economy Balancing With Spreadsheets: A Practical Guide for Indie Developers
description: スプレッドシートによるゲーム経済バランス設計の実践手法で、蛇口シンクモデル (faucet-sink model) と4つの連携シートを使った数学的アプローチを解説。
type: reference
---

## 出典

StraySpark Studio: https://www.strayspark.studio/blog/game-economy-balancing-spreadsheets

## 概要

感覚的な調整ではなく数学的モデリングによるゲーム経済設計を解説。スプレッドシートを「バランスのシミュレーター」として活用し、プレイヤーが問題に直面する前に崩壊を検知する手法を提案する。「シンプルなモデルから始め、早期テストと頻繁な反復を行い、スプレッドシートでプレイヤーより先に問題を発見する」が設計哲学。

## 蛇口シンクモデル（Faucet-Sink Model）

ゲーム経済を「流入と流出」の観点で構造化するフレームワーク。

- **蛇口（収入源）**: 戦闘報酬・採取・取引・パッシブ収入・探索
- **シンク（支出先）**: 装備購入・消耗品・クラフト・修理・移動費・コスメ
- **推奨設計比率**: 蛇口 = シンクの1.1〜1.3倍（プログレッション層ごとに設定）

## 4つのスプレッドシート構成

### 1. プレイヤープログレッションタイムライン
時間・レベル・活動・収入率をマッピングする。

### 2. アイテム価格モデル
基準式: **`価格 = 1時間の収益 × 価値の時間数`**

### 3. ルートテーブル
ドロップ率と遭遇ごとの期待値 (expected value) を定義する。

### 4. シンク分析シート
収入に対する支出率を計算・可視化する。

## プログレッション曲線の種類と使い分け

- 線形・指数・S字カーブの特性比較
- 可変比率強化スケジュール (variable ratio reinforcement schedule) と固定間隔報酬の組み合わせ方

## よくある問題と対策

| 問題 | 対策 |
|------|------|
| 不要品（vendor trash）の蓄積 | シンクの多様化・用途拡張 |
| 指数的なゴールドインフレ (inflation) | 収入上限・税収システム導入 |
| プレイヤーの溜め込み行動 (hoarding) | 消費インセンティブ強化 |
| 新規プレイヤーの購入不能 | 序盤経済基準の緩和 |

## 関連資料

- reference_game-economy-balance-5steps.md（経済バランスの5ステップ）
- reference_value-chains-game-economy.md（バリューチェーンと経済設計）
- reference_fundamentals-game-economy-design.md（ゲーム経済設計の基礎）
