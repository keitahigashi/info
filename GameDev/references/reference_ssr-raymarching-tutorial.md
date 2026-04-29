---
name: Screen Space Reflection - 3D Game Shaders for Beginners
description: SSRレイマーチング2段階（粗探索/バイナリサーチ）・座標変換・透視補正・可視性フェード・ラフネス制御・GLSLパラメータ
type: reference
---

## 出典

3D Game Shaders for Beginners (Lettier): https://lettier.github.io/3d-game-shaders-for-beginners/screen-space-reflection.html

## SSRの基本原理

「画面を自身に反射させる」技術。キューブマッピング（6テクスチャ）に対し、SSRは画面内のみで動作する。光線が物体に反射してカメラに到達する過程を逆方向に追跡し、現在のフラグメントに映るものを決定する。

## レイマーチングの2段階プロセス

### 第1段階: 粗探索 (Linear Search)
- 反射光線の開始点から終了点まで一定間隔でサンプリング
- `resolution` パラメータで飛ばすフラグメント数を制御
- 最初の交差を検出したら次段階へ

### 第2段階: 精密探索 (Binary Search)
- バイナリサーチで正確な交点を特定
- `steps` パラメータで反復回数を制御（10程度で実用的）
- `thickness` 許容値内の交差をヒットと判定

## 座標変換フロー

```
ビュー空間 → クリップ空間 → パースペクティブ除算 → UV座標 → スクリーン座標
```

画面上でレイを追跡するため、ビュー空間からスクリーン座標への変換が必須。

## 反射ベクトル計算

```glsl
vec3 pivot = normalize(reflect(unitPositionFrom, normal))
```

### 透視補正の重要性
単純な線形補間では誤った距離が生じるため、透視補正補間を使用:
```
viewDistance = (startView.y * endView.y) / mix(endView.y, startView.y, search1)
```

## 交差判定

深度差 `depth = viewDistance - positionTo.y` が `[0, thickness]` 範囲に収まれば交差と判定。

## 可視性フェード（4段階）

| 条件 | 処理 |
|------|------|
| カメラ方向判定 | 反射ベクトルが位置ベクトルと逆方向 → 減衰（背面ヒット防止） |
| 距離減衰 | 交差点からのズレが大きいほど減衰 |
| 距離フェード | maxDistanceに近づくほど減衰 |
| フラスタムチェック | UV座標が[0,1]範囲外 → 可視性0 |

## ラフネス（粗度）制御

```glsl
float roughness = 1 - min(specular.a, 1)
```

- roughness = 0: 鏡面（クリアな反射）
- roughness = 1: 粗い表面（ぼかされた反射）
- マイクロファセットの凹凸が反射を拡散/ぼかす

## 主要パラメータ

| パラメータ | 役割 | 推奨値 |
|-----------|------|--------|
| `maxDistance` | 最大反射距離 | 大きすぎるとコスト増 |
| `resolution` | 第1段階の粗さ | 0.3〜0.5 |
| `steps` | 第2段階の反復数 | 10 |
| `thickness` | 深度許容値 | 大→ぼやけ、小→ノイズ |

## 制限事項と対策

| 制限 | 原因 | 対策 |
|------|------|------|
| 画面外反射の欠如 | カメラ視野外は情報なし | フォールバック環境マップ |
| 背面ヒット | カメラに背を向けた面を誤検出 | ドット積で段階減衰 |
| セルフインターセクション | 同一表面内の交差 | thickness調整 |

## 実装の鍵

SSRは高品質ながら計算量が多く、パラメータの最適化が実装成功の鍵。resolution/steps/thicknessの3パラメータのバランスが品質とパフォーマンスを決定する。
