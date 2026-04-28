---
name: "Procedural Generation Using Wave Function Collapse"
description: WFCアルゴリズム詳解・Simple Tiled/Overlappingモデル・Observe/Propagate手順・制約・限界
type: reference
---

## 出典

Ptidej Blog: https://blog.ptidej.net/procedural-generation-using-wave-function-collapse/

## WFCとは

Wave Function Collapse (WFC) は制約ベースの手続き的生成アルゴリズム。「数独パズルを解くのと同様に動作する」— まず制約のセットが必要で、それを使って問題を解く。

## 2つのモデル

### Simple Tiled Model（シンプルタイルモデル）

事前定義された隣接ルールでタイル配置を決定:

| タイル | 隣接可能 |
|--------|---------|
| 緑 | 黄色、緑のみ |
| 黄色 | 緑、青、黄色 |
| 青 | 黄色、青のみ |

### Overlapping Model（オーバーラッピングモデル）

- サンプル画像をスキャンしてNxNパターンのセットを決定
- パターンの境界を基数・間基数方向で検査してオーバーラップを判定
- 出力にはサンプル画像に存在するNxNパターン**のみ**が含まれることを保証

## コアアルゴリズム: Observe & Propagate

### 1. Observe（観察）フェーズ

- **最低エントロピー**のセル（パターン選択肢が最も少ない）を特定
- 初期ステップではランダムセルを選択
- サンプル画像での出現頻度に基づく**重み付きランダム**でパターンを割り当て（collapse）

### 2. Propagate（伝播）フェーズ

- セルが collapse すると、隣接セルに「新しい可能性の領域」を伝播
- 非互換パターンを除去
- 変更がなくなるまでカスケード

### 3. 反復

全エリアが解決するまで Observe → Propagate を繰り返し

## ゲーム開発での応用

- Minecraft、Diablo II 等の手続き的ワールド生成
- タイルマップ・レベル生成に最適
- ピクセルアート生成
- 実装言語: C++, Python, Rust, Go, JavaScript 等
- 対応エンジン: Unity, Unreal Engine 5, Godot 4, Houdini

## 限界

### バックトラッキング未対応

- 非互換パターンの衝突時に以前の決定を取り消す機能が不足
- 矛盾が発生すると生成失敗

### 並列化の困難

- Perlin Noise と異なり、独立チャンクの同時処理が**不可能**
- 伝播依存の性質がマルチスレッド実装を制限

### パフォーマンス

- 高速アルゴリズムではない
- ワーカースレッドへの処理委譲、メッシュインスタンス化のフレーム分散が必要
