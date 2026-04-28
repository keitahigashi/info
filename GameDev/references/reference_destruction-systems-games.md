---
name: "How Games Do Destruction: Six Techniques"
description: ゲーム破壊6手法・事前破砕/メッシュスライス/ソフトボディ/グリッド火災/ボクセル/構造応力・設計トレードオフ
type: reference
---

## 出典

GMTK (Mark Brown): https://gmtk.substack.com/p/how-games-do-destruction

## 6つの破壊手法

### 1. Pre-Fractured Object Swapping（事前破砕スワップ）
無傷/破壊2バージョンをメモリに格納し切替。Controlでは多数個別ピースで精密衝撃点破壊＋物理接続ジョイント＋マテリアル別デカル。

### 2. Real-Time Mesh Slicing（リアルタイムメッシュスライス）
2D平面投影でモデルを動的分割。Astro Bot/Rainbow Six: Siege。ハードウェア負荷高、単純形状に制限。破片は後でメモリ解放。

### 3. Soft Body Physics（ソフトボディ物理）
浮動小数点ノード＋ビームスプリング接続。BeamNG.drive。変形がゲームプレイに影響（視覚だけでなく挙動が変化）。

### 4. Grid-Based Fire Propagation（グリッドベース火災伝播）
不可視グリッドで各セルにHP。Far Cry 2。セル消耗→発火→隣接ダメージ。有限燃焼寿命/素材別HP/風向き修正。

### 5. Voxel-Based Destruction（ボクセル破壊）
3Dグリッドでブロック単位破壊。Teardown: 分離ボクセルクラスタが独立物理エンティティに自動変換→カスケード構造破壊。進化: 2D(Spelunky)→ピクセル(Noita)→3D(Minecraft)→高解像度(Teardown)。

### 6. Structural Stress Analysis（構造応力分析）
数百の破壊可能パーツ。Red Faction: Guerrilla/The Finals。各コンポーネントに力（重量）と強度（耐荷重）。層ベース階層で応力計算→強度超過→物理オブジェクト化→連鎖崩壊。

## パフォーマンス＆設計トレードオフ

| 課題 | 影響 |
|------|------|
| メモリオーバーヘッド | 物理オブジェクト/デブリ管理/バリアント格納 |
| ライティング/パスファインディング | AI環境更新の常時必要性 |
| ゲームデザイン衝突 | 意図しない解法の可能性→慎重な進行設計の複雑化 |

## 核心的メッセージ

「破壊は独創性。処理能力を投げるだけでは解決できない問題」→ アルゴリズム選択/最適化/ゲームプレイ目標との整合が必須。
