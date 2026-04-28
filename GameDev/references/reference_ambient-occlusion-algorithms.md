---
name: "Ambient Occlusion: An Extensive Guide on Algorithms"
description: AO技法総覧・SSAO/HBAO/HBAO+/HDAO/VXAO/GTAO比較・パフォーマンス実測・VR考慮・実装推奨
type: reference
---

## 出典

ARVI VR: https://vr.arvilab.com/blog/ambient-occlusion

## アンビエントオクルージョンとは

「柔らかいグローバルシャドウを作成し、オブジェクトの視覚的分離に寄与することでリアリズムを追加するシェーディング技法」。周囲ジオメトリに囲まれた面がより少ない光を受ける様子をシミュレート。

## 主要アルゴリズム

### SSAO (Screen Space Ambient Occlusion)

- 各ピクセルに半球を構築し光の収集量を判定
- 深度バッファ＋法線マップで方向指定
- **利点**: シーン複雑度非依存、動的シーン対応
- **欠点**: 解像度依存、エッジアーティファクト、画面境界での問題
- **最適化**: インターレースサンプリング/ダウンサンプリング/テンポラル累積

### HBAO (Horizon-Based AO)

- NVIDIA（2008）。法線方向を深度情報と組合せた**物理ベースアプローチ**
- SSAOより優れた画質だがGPUリソース要求が大きい

### HBAO+

- チェッカーボードレンダリング＋テンポラル累積
- AO効果のディテールを**2倍**に、ダウンサンプリングなしで元解像度維持
- フリッカリング排除
- **欠点**: 急激なカメラ移動でテンポラルラグ

### HDAO (High Definition AO)

- AMDのGather4技術で4テクスチャサンプルを同時収集
- フル解像度レンダリング、HBAOと類似原理
- **制限**: AMD GPU最適化（市場シェアが低い）

### VXAO (Voxel Accelerated AO)

- 2Dピクセルではなく**3Dボクセル**で動作
- 3パス: ボクセル化→後処理→コーントレーシング
- **強み**: 最も正確なシャドウイング＋動的シーン対応
- **欠点**: HBAO+の3-4倍低速、ハイエンドGPU＋DirectX 12必須

### GTAO (Ground Truth AO)

- VR向けに推奨
- Amplify Occlusion 2.0等で実装

## パフォーマンス実測（GTX 970、ドラゴンシーン）

| 手法 | FPS |
|------|-----|
| エフェクトなし | 146 |
| SSAO Pro | 144 |
| Amplify Occlusion | 144 |
| Cinematic Image Effect | 126 |
| SESSAO | 126 |
| TSSAO | 99 |

## VR固有の考慮事項

- ステレオビジョンで脳が深度バッファを再構築 → AOの知覚的重要性が低下
- SSAOが左右の目で不一致結果を生成 → 「幻影的」外観
- 高解像度VRレンダリングがパフォーマンスコストを増幅（FPS半減の可能性）

## 実装推奨

| 環境 | 推奨 |
|------|------|
| パフォーマンス重視 | SSAO/HBAO最低設定（~10% FPS影響）/ テクスチャベイクAO |
| バランス型 | HBAO+ / HDAO＋テンポラル累積 |
| ハイエンド | VXAO / DX12レイトレーシングAO |
| VR | GTAO（シングルパス/マルチパス対応） |
