---
name: Procedural Terrain Generation with Erosion
description: 地形生成3手法（ダイアモンドスクエア/ボロノイ/重み付け結合）・熱侵食・水力侵食4段階・擾乱フィルタ
type: reference
---

## 出典

David Jorna: https://davidjorna.com/posts/terrain-generation/

## 主要な生成手法

### 1. ダイアモンド・スクエア・アルゴリズム (Diamond-Square)
- 2Dグリッド上で「スクエア」と「ダイアモンド」操作を交互実行
- パラメータ **persistence** で出力のノイズ度を制御
- 高値 = ノイズ多、低値 = 滑らか

### 2. ボロノイ図 (Voronoi Diagram)
- ランダム点への近接性に基づく多角形領域の生成
- k-dツリーで最近傍探索を高速化
- 高さ計算: 複数の近傍点の線形結合

### 3. 重み付け結合 (Weighted Combination)
- 2つのハイトマップを組み合わせ
- α（0〜1）パラメータで比率調整

## 後処理フィルタ

### 擾乱フィルタ (Perturbation Filter)
パーリンノイズで変位場を生成し、ハイトマップを歪曲。自然な不規則性を追加。

### 熱侵食 (Thermal Erosion)
- 急勾配部分の土砂を流下させる
- **タラス角 (Talus Angle)** パラメータで閾値設定
- 水力侵食より計算コストが低い

### 水力侵食 (Hydraulic Erosion)
4段階プロセス:
1. **降雨**: 水層に定数追加
2. **侵食**: ハイトマップから土砂除去
3. **運搬**: 水流に沿い堆積物を移動
4. **蒸発**: 水量減少と堆積

## 実装
Unity3Dプラグインで3D可視化を実現。
