---
name: "How to Lerp Like a Pro"
description: Lerp実践テクニック・よくある間違い・フレームレート独立・Smoothstep/Smootherstep・波形アニメーション
type: reference
---

## 出典

Chico Unity3D: https://chicounity3d.wordpress.com/2014/05/23/how-to-lerp-like-a-pro/

## 核心的洞察

「出力が変化すると期待するなら、渡す引数がそれを反映している必要がある」

## よくある間違い

```
// 間違い: Time.deltaTime は毎フレームほぼ一定（例: 50fpsで0.02）
transform.position = Lerp(startPos, endPos, Time.deltaTime);
```

→ 進行しない。`t` は 0→1 に**蓄積**する必要がある。

## フレームレート独立パターン

```
currentLerpTime += Time.deltaTime;
if (currentLerpTime > lerpTime) currentLerpTime = lerpTime;
float t = currentLerpTime / lerpTime;  // 0 → 1 に正規化
result = Lerp(start, end, t);
```

`t` = 補間進行率。適切なLerp動作の**本質**。

## 利用可能なLerp関数

| 関数 | 用途 |
|------|------|
| `Mathf.Lerp` | 基礎（float） |
| `Vector3.Lerp` | 3D位置/方向 |
| `Color.Lerp` | 色遷移 |
| `Quaternion.Slerp` | 球面回転補間 |

## イージングカーブ

`t` パラメータ（0〜1範囲を維持）を修正して非線形遷移:

| カーブ | 数式 | 特性 |
|--------|------|------|
| Sine Ease-Out | `sin(t × π/2)` | 柔らかい減速 |
| Cosine Ease-In | `1 - cos(t × π/2)` | 柔らかい加速 |
| Quadratic | `t²` | 明確な加速 |
| **Smoothstep** | `t² × (3 - 2t)` | S字カーブ（1次導関数=0） |
| **Smootherstep** | `t³ × (t(6t-15)+10)` | より滑らかなS字（1次＋2次導関数=0） |

### Smoothstep vs Smootherstep

- **Smoothstep**: 両端で1次導関数が0 → スムーズな開始/終了
- **Smootherstep**: 両端で1次＋2次導関数が0 → 最も自然に見える動き

## 波形ベース連続アニメーション

永続的な動き（呼吸/揺動）:

```
float distance = Sin(timeSinceLevelLoad);
position = startPos + up * distance;
```

振幅と周期パラメータで柔軟に制御。

## 実践的適用領域

- カメラ管理
- マテリアルパラメータ
- UIアニメーション
- 物理力
- オーディオボリューム
- カットシーン

## 歴史的背景

2001年、Robert Pennerが ActionScript でオリジナルの「正規」イージング関数を提供 → 業界標準として広く普及。
