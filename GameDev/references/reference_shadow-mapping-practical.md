---
name: "Shadow Mapping Techniques for Graphics Programming"
description: シャドウマッピング実践ガイド・CSM/VSM/ESM概要・フィルタリング手法・最適化戦略・品質/性能バランス
type: reference
---

## 出典

DataCalculus: https://datacalculus.com/en/blog/computer-games/graphics-programmer/shadow-mapping-techniques-for-graphics-programming

## 基本プロセス

1. 光源視点からシーンをレンダリング → 深度マップ生成
2. フラグメント深度をマップと比較 → 影領域を判定

## 主要技法

### Cascaded Shadow Maps (CSM)

ビューフラスタムを複数セグメントに分割、各セグメントに専用シャドウマップ。近距離オブジェクトの精度と遠距離のパフォーマンスのバランス。**オープンワールド環境**で特に有効。

### Variance Shadow Maps (VSM) / Exponential Shadow Maps (ESM)

分散情報を格納してソフトエッジとエイリアシング低減を実現。**ライトリーキング**の可能性があり、パラメータチューニングが必要。

### フィルタリング

- **PCF (Percentage-Closer Filtering)**: 複数サンプルの影判定を平均化
- **分散技法**: より滑らかなエッジだが追加ストレージ必要
- 「高解像度シャドウマップは良いディテールだが、より多くのメモリと処理能力を要求」

## 最適化戦略

| 戦略 | 説明 |
|------|------|
| **事前計算** | 静的解析で影効果をベイク |
| **動的調整** | パフォーマンスベンチマークに基づくリアルタイム解像度/フィルタ変更 |
| **データ駆動最適化** | パフォーマンスメトリクスの継続分析 |
| **精度vs速度バランス** | ディテールの戦略的削減で大幅な性能向上 |

## 主要課題と対策

| 課題 | 対策 |
|------|------|
| シャドウエイリアシング | マルチサンプルアンチエイリアシング統合 |
| ライトブリーディング | パラメータチューニング・MSM採用 |
| 計算オーバーヘッド | 深度バイアスキャリブレーション・LOD連携 |
