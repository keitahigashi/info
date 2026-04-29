---
name: Inverse Kinematics Algorithms for Game Programming
description: IK 3アルゴリズム比較（CCD/ヤコビアン転置/FABRIK）・計算量・パフォーマンス・Shadow of the Colossus応用
type: reference
---

## 出典

Ruihao (Ray) Ye (Medium): https://medium.com/@turtle50vp/inverse-kinematics-for-game-programming-5f9a408e24b2

## 逆運動学 (IK) の概要

複数の骨（ボーン）からなるチェーンの運動をシミュレートする技術。末端（手先・足先）の目標位置から、各関節の回転角度を逆算する。アニメーターが足先を動かすだけで脚全体が自動的に曲がる仕組み。

## 3つのアルゴリズム比較

### 1. CCD (Cyclic Coordinate Descent)

| 項目 | 内容 |
|------|------|
| 方式 | シリアル型・末端から順に各骨を処理 |
| 計算量 | **O(n²)**（回転の伝播が必要） |
| 利点 | 少ない骨の場合は効果的 |
| 課題 | 過度な修正で「チェーンの絡み (tangling)」が発生 |

### 2. ヤコビアン転置法 (Jacobian Transpose)

| 項目 | 内容 |
|------|------|
| 方式 | 勾配降下法で段階的に目標に接近 |
| 計算量 | **O(n²)** |
| 利点 | チェーンの絡み付きを軽減 |
| 欠点 | 収束速度が遅い |
| 実装工夫 | ベクトル積による簡素化で行列演算を回避 |

### 3. FABRIK (Forward and Backward Reaching IK)

| 項目 | 内容 |
|------|------|
| 方式 | 前進と後進の2段階で骨を再配置 |
| 計算量 | **O(n)**（2n回のチェーン走査のみ） |
| 利点 | 圧倒的に高速。物理的に自然な挙動 |
| 特徴 | 回転角度ではなく位置ベースで解決 |

## パフォーマンス比較

1000本のボーンを使用した実験:
- **FABRIK**: スムーズに動作
- **CCD/ヤコビアン**: O(n²)の影響で大幅に低速

> FABRIKは「O(n²)の穴から脱出した」と評価される

## 応用例

- **Shadow of the Colossus**: キャラクターの全肢体制御でIK技術を採用
- **足の接地処理**: 地形適応
- **武器のエイム**: 上半身のリアルタイム調整
- **触手・チェーン**: 多関節オブジェクトの自然な動き
