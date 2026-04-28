---
name: "A Sampling of Shadow Techniques"
description: シャドウマッピング技法総覧・VSM/EVSM/MSM・カスケード最適化・PCF3変種・バイアス3手法・GPU駆動
type: reference
---

## 出典

Matt Pettineo (The Real MJP): https://therealmjp.github.io/posts/shadow-maps/

## シャドウマップタイプ

### Variance Shadow Maps (VSM)

各テクセルの深度値の**平均と分散**を格納し、影の確率を統計的に推定。
- **利点**: ハードウェアフィルタリング対応、PCFよりバイアス問題が少ない
- **欠点**: 遮蔽物/受光面間の深度差が大きい場合に**ライトブリーディング**

### Exponential VSM (EVSM)

VSMに指数ワーピングを適用、対数空間でフィルタリング:
- **EVSM2**: 正項のみ
- **EVSM4**: 正負両項（高品質、帯域幅増加）
- 高精度浮動小数点ストレージ必須だがプリフィルタリング/異方性フィルタで優れた結果

### Moment Shadow Mapping (MSM)

「Hamburger 4MSM」「Hausdorff 4MSM」の2技法。ライトブリーディング低減に優れる。

## カスケード最適化

### Stable Cascades（ShaderX6方式）

投影をカメラ回転で変化させず、テクセルサイズの増分にスナップ → サブテクセル移動クロール排除。有効解像度とのトレードオフ。

### Sample Distribution Shadow Maps (SDSM)

深度バッファを分析しmin/max深度を計算 → カスケードを実際の可視ピクセルに自動最適化。対数パーティショニングで**大幅改善**。GPU深度バッファリードバックが必要（CPU-GPU同期ストール）。

## PCFフィルタリング（3変種）

| 変種 | 手法 |
|------|------|
| **FixedSizePCF** | GatherCmpでディスク形カーネル（2x2〜9x9） |
| **GridPCF** | 手動NxNグリッドサンプリング |
| **RandomDiscPCF** | ポアソンディスクパターン＋ピクセル単位回転 |

性能: 2x2→7x7 PCFで追加**~0.4ms**（1920x1080、GatherCmp使用）

### OptimizedPCF（The Witness方式）

バイリニアPCFサンプルで均一フィルタカーネルを実装。固定カーネルに近い効率。

## バイアス技法（3種）

| 手法 | 特徴 |
|------|------|
| **Manual Depth Offset** | カスケード深度範囲で正規化した深度減算。手動調整必要 |
| **Normal-Based Offset** | 法線方向にオフセット。安価だが影が目に見えてシフト |
| **Receiver Plane Depth Bias** | スクリーンスペース微分で最適バイアスを自動計算。退化ケースで不安定 |

## パフォーマンス比較

| 技法 | コスト |
|------|--------|
| 7x7 PCF | 2x2から~0.4ms追加 |
| Grid PCF最大 | ~2-3ms |
| EVSM4フル機能 | ~11.5ms（2048²、4xMSAA、8xAF） |
| EVSM4実用設定 | ~3ms追加（1024²、4xMSAA） |

## 実践的推奨

1. **PCF 7x7から開始**: GatherCmp効率でコスト/品質比が最良
2. **高品質カットシーン**: EVSM4＋ミップマップ
3. **大環境**: SDSM＋1フレームレイテンシで安定性より精度を優先
4. **法線バイアス**: 深度0.0015、オフセットスケール1.0-2.0から開始
5. **カスケード間シーム**: ワールドスペースでフィルタカーネルを一致
