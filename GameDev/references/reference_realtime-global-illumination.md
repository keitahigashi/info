---
name: Next-Gen Lighting - Real-Time Global Illumination in Games
description: リアルタイムGI 4手法（RTGI/VXGI/SSGI/LPV）・UE5 Lumen/Minecraft RTX実装例・AIによる照明予測
type: reference
---

## 出典

Maxima Gaming Studio: https://maximagamingstudio.com/next-gen-lighting-techniques-real-time-global-illumination-in-games/

## グローバルイルミネーション (GI) とは

光がどのように跳ね返り、3D環境内の表面と相互作用するかをシミュレートするプロセス。直接光だけでなく、壁や物体からの**反射光（間接光）**も考慮。

## リアルタイムGIの4手法

### 1. レイトレーシングGI (RTGI)
- 個別光線の反射をシミュレート
- **最高の精度**だが高GPU負荷
- 採用: Cyberpunk 2077、Fortnite、Alan Wake 2

### 2. ボクセルベースGI (VXGI)
- 世界を小さなボクセル（3D画素）に分割
- 光の反射をボクセル内で近似
- **パフォーマンス効率が良好**、中程度のデバイス対応可能

### 3. スクリーンスペースGI (SSGI)
- 画面上のデータのみから間接照明をシミュレート
- リアルタイム向け
- **精度は低い**がスピード重視

### 4. 光伝播ボリューム (LPV)
- グリッドベースシステムで光拡散を計算
- **オープンワールドゲーム向け**

## 実装例

| エンジン/ゲーム | GI手法 | 特徴 |
|---------------|--------|------|
| **UE5 Lumen** | RTGI + SSGI融合 | ハイブリッドアプローチ |
| **Minecraft RTX** | ボクセル照明再実装 | パストレーシング |
| **Unity HDRP** | リアルタイム反射+バウンス | プローブベース |

## AIの役割

ニューラルネットワークが照明動作を予測し、**最小処理でレイトレース品質**を実現。デノイジングやアップスケーリングにも活用。
