---
name: PBR Theory - Cook-Torrance BRDF
description: PBR3要件・マイクロファセット理論・反射方程式・Cook-Torrance BRDF（NDF/G/F）の数式とGLSL実装・メタリックワークフロー
type: reference
---

## 出典

LearnOpenGL (Joey de Vries): https://learnopengl.com/PBR/Theory

## PBRの3要件

1. **マイクロファセット表面モデル**: 表面を微視的な完全反射性小鏡の集合としてモデル化
2. **エネルギー保存**: 出射光エネルギーが入射光を超えない
3. **物理ベースBRDF**: 光の反射特性を物理法則で記述

## マイクロファセット理論

表面は微視的スケールで無数のマイクロファセット（小さな鏡）で構成される。

- **滑らかな表面**: マイクロファセットが揃い、鋭い鏡面反射
- **粗い表面**: ランダム配向で、拡散的な反射
- **半ベクトル h**: 光源方向 l と視線方向 v の中間。h に揃うマイクロファセットの比率が反射特性を決定

## エネルギー保存

光は反射（specular）と屈折（diffuse）に分割される:
- `kS` = 反射率（鏡面反射の割合、フレネル方程式で算出）
- `kD` = 1.0 - kS = 屈折率（拡散反射の割合）
- **金属表面**: 屈折光を吸収し、拡散成分がゼロ

## 反射方程式 (Reflectance Equation)

```
Lo(p, wo) = ∫_Ω fr(p, wi, wo) * Li(p, wi) * (n · wi) dωi
```

| 記号 | 意味 |
|------|------|
| Lo | 出射放射輝度（観察者方向） |
| fr | BRDF（双方向反射分布関数） |
| Li | 入射放射輝度 |
| Ω | 法線周辺の半球 |
| n · wi | コサイン項（入射角による減衰） |

### 放射測度学の基礎
- **放射束 Φ**: 光源の総エネルギー（ワット）
- **立体角 ω**: 単位球上への投影面積
- **放射強度 I**: 立体角あたりの束
- **放射輝度 L**: 面積と立体角あたりの束

## Cook-Torrance BRDF

```
fr = kd * (c/π) + ks * DFG / (4 * (wo·n) * (wi·n))
```

### 拡散成分: Lambertian
- `f_lambert = c / π` （cはアルベド、πで正規化）

### 鏡面成分: Cook-Torrance
3つの関数の積:

| 関数 | 役割 | 使用近似 |
|------|------|---------|
| **D** (法線分布関数) | マイクロファセット配向の統計分布 | Trowbridge-Reitz GGX |
| **F** (フレネル方程式) | 反射率の視線角度依存性 | Fresnel-Schlick |
| **G** (幾何関数) | マイクロファセットの自己遮蔽 | Smith's Schlick-GGX |

## 各BRDF要素の詳細

### D: 法線分布関数 (NDF) - Trowbridge-Reitz GGX

```
NDF_GGX(n, h, α) = α² / (π * ((n·h)² * (α² - 1) + 1)²)
```

```glsl
float DistributionGGX(vec3 N, vec3 H, float a) {
    float a2 = a * a;
    float NdotH = max(dot(N, H), 0.0);
    float NdotH2 = NdotH * NdotH;
    float nom = a2;
    float denom = (NdotH2 * (a2 - 1.0) + 1.0);
    denom = PI * denom * denom;
    return nom / denom;
}
```

α（粗さの2乗）が大きいほど広い分布、小さいほど鋭い反射ピーク。

### G: 幾何関数 - Smith's Schlick-GGX

```
G_SchlickGGX(n, v, k) = (n·v) / ((n·v)(1-k) + k)
```

**k値の分岐**:
- 直接照明: `k_direct = (α + 1)² / 8`
- IBL照明: `k_IBL = α² / 2`

**Smith法**: 視線と光線の両方を考慮:
```
G(n, v, l, k) = G_sub(n, v, k) × G_sub(n, l, k)
```

```glsl
float GeometrySmith(vec3 N, vec3 V, vec3 L, float k) {
    float NdotV = max(dot(N, V), 0.0);
    float NdotL = max(dot(N, L), 0.0);
    return GeometrySchlickGGX(NdotV, k) * GeometrySchlickGGX(NdotL, k);
}
```

### F: フレネル方程式 - Fresnel-Schlick近似

```
F_Schlick(h, v, F0) = F0 + (1 - F0) * (1 - h·v)^5
```

```glsl
vec3 fresnelSchlick(float cosTheta, vec3 F0) {
    return F0 + (1.0 - F0) * pow(1.0 - cosTheta, 5.0);
}
```

- 垂直視点: F0の値（材質固有）
- 浅い角度: ほぼ完全反射（1.0に近づく）
- 全表面が理論上90度でフル反射

## メタリックワークフロー

| 材質 | F0範囲 | 特徴 |
|------|--------|------|
| 誘電体（非金属） | 0.02〜0.08 | グレースケール |
| 金属 | 0.5〜1.0 | RGB色付き（表面色で反射） |

```glsl
vec3 F0 = vec3(0.04);               // 誘電体基準値
F0 = mix(F0, surfaceColor.rgb, metalness);  // metalness=1で色を反射率に
```

- metalness=0: 拡散成分あり、F0=0.04
- metalness=1: 拡散成分なし、表面色がそのまま反射率

## PBRマテリアルのテクスチャ

| テクスチャ | 役割 | 形式 |
|-----------|------|------|
| Albedo | 基本色（影情報なし） | RGB |
| Normal | 表面凹凸 | RGB法線ベクトル |
| Metallic | 金属性 | グレースケール [0,1] |
| Roughness | 表面粗さ | グレースケール [0,1] |
| AO | 環境遮蔽 | グレースケール |

## 実装上の注意点

1. **立体角積分の離散化**: リーマン和で近似、ステップ数増加で精度向上
2. **k値の分岐**: 直接照明とIBLで異なるk値を使用
3. **π正規化**: エネルギー保存を保証
4. **F項はkSを内包**: Fresnel自体が反射率を表すため、別途kSを乗算しない
5. **メタルネスの線形性**: バイナリではなく[0,1]範囲で誘電体と金属をmix
