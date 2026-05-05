---
name: "Shader Programming Complete Graphics Guide 2025"
description: シェーダープログラミング完全ガイド — グラフィックスパイプライン・頂点/フラグメントシェーダー・PBR・最適化技法
type: reference
---

## 出典

Generalist Programmer: https://generalistprogrammer.com/tutorials/shader-programming-complete-graphics-guide-2025

## シェーダーの3主要タイプ (Shader Types)

| タイプ | 役割 |
|--------|------|
| **頂点シェーダー (Vertex Shader)** | 3D頂点データをモデル空間→ワールド空間→クリップ空間へ変換 |
| **フラグメントシェーダー (Fragment Shader)** | ピクセルごとのライティング・テクスチャ・マテリアルから最終色を計算 |
| **コンピュートシェーダー (Compute Shader)** | GPU上で汎用計算を実行（物理シミュレーション・パーティクル等）|

## グラフィックスパイプライン概要

```
頂点入力 → 頂点シェーダー → ラスタライズ → フラグメントシェーダー → 出力合成
```

- **ラスタライズ (Rasterization)**: 幾何学的プリミティブをフラグメント（潜在的ピクセル）に変換
- 各フラグメントに対して1回フラグメントシェーダーが実行される

## 主要シェーダー言語

| 言語 | 用途 |
|------|------|
| **HLSL** | DirectX・Unity向け |
| **GLSL** | OpenGL・WebGL向け |
| **Unity Shader Graph** | ノードベースのビジュアル実装 |
| **Unreal Material Editor** | AAA品質向けシステム |

## 主要技術概念

- **物理ベースレンダリング (PBR)**: Cook-Torrance BRDFモデルで現実物理に基づく光反射計算
- **ポストプロセッシング**: ブルーム (bloom)・ガウシアンフィルタ等の画面空間エフェクト
- **手続き型シェーダー (Procedural Shader)**: テクスチャ不使用の数学的パターン生成

## モバイル最適化原則

- 精度制御 (halfprecision)でGPU演算負荷を削減
- テクスチャアトラス活用でドローコール削減
- VRは両目分のレンダリングが必要で特別な最適化戦略が求められる

## 汎用化ポイント

シェーダーの概念（頂点変換・ラスタライズ・フラグメント処理）はUnity/Unreal/Godotに限らず、WebGL・Metal・Vulkanすべてに共通する。言語構文は異なるがパイプラインの流れは同一。
