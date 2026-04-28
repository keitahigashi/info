---
name: "Easing Functions for Game Animations: Visual Guide"
description: イージング関数完全ガイド・EaseIn/Out/InOut・Spike・累乗レベル比較・Lerp統合・選定指針
type: reference
---

## 出典

Febucci Blog: https://blog.febucci.com/2018/08/easing-functions/

## コア概念

**Lerp（線形補間）** が基盤:
```
Lerp(start, end, t) = start + (end - start) * t
```

`t` は 0〜1 のアニメーション進行率。イージング関数はこの `t` を修正してカーブを作成。

## 主要イージングタイプ

### Ease-In（SmoothStart）

ゆっくり開始 → 加速。静止状態からの発射に最適。

```
EaseInQuad(t) = t²
EaseInCubic(t) = t³
```

### Ease-Out

速く開始 → 減速。着地やUIスライドインに最適。

```
EaseOutQuad(t) = 1 - (1-t)²
EaseOutCubic(t) = 1 - (1-t)³
```

### Ease-In-Out

加速→減速を組合せ。両カーブの補間。

```
EaseInOutQuad(t) = t < 0.5 ? 2t² : 1 - (-2t+2)²/2
```

### Spike（ミラー型）

50%でピーク → 開始値に戻る。UIポップアップ/ボタンクリックに最適。

## 累乗レベル比較

| レベル | 関数 | 感触 | 用途 |
|--------|------|------|------|
| **Quadratic** (t²) | 微妙で穏やか | UIトランジション・メニュー |
| **Cubic** (t³) | 中程度の顕著な加速 | カメラ移動 |
| **Exponential** | 劇的な「瞬間スナップ」 | 印象的なトランジション |

## 実装パターン

```
毎フレーム:
1. t = elapsedTime / duration を計算
2. イージング関数を適用: easedT = EaseIn(t)
3. Lerp で補間: result = Lerp(start, end, easedT)
```

## 主要な利点

- float上の単純な数学演算 → **パフォーマンスペナルティなし**
- 位置/色/スケール/回転の**あらゆるコンポーネント**に適用可能
- 複雑なループや再帰的 `pow` 呼び出し不要
- カスタム構造体（Vector3等）にも拡張可能

## 選定ガイドライン

| 用途 | 推奨 |
|------|------|
| UIトランジション・メニュー | Quadratic Ease-Out |
| 物理的動き（弾道/ジャンプ） | Cubic/Exponential Ease-In |
| カメラ移動 | Cubic Ease-In-Out |
| ポップアップ/通知 | Spike |
