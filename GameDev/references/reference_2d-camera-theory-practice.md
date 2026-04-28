---
name: "Scroll Back: The Theory and Practice of Cameras in Side-Scrollers"
description: 2Dカメラ設計の決定的リファレンス・注意/操作/快適の3原則・歴史的進化・主要テクニック体系
type: reference
---

## 出典

Game Developer (Itay Keren): https://www.gamedeveloper.com/design/scroll-back-the-theory-and-practice-of-cameras-in-side-scrollers

## 3つの基盤的課題

| 課題 | 説明 |
|------|------|
| **Attention（注意）** | プレイヤーにフォーカスを維持 |
| **Interaction（操作）** | プレイヤーコントロールの維持 |
| **Comfort（快適）** | 視覚/前庭感覚の矛盾による不快感の防止 |

## カメラテクニック体系

### Position-Locking（位置固定）

- 最初期のアプローチ（Rally-X, 1980）
- キャラクターを画面中央に固定
- シンプルだが微細な動きにも反応しすぎる

### Edge-Snapping（エッジスナップ）

- Kung-Fu Master 等で採用
- キャラクターが中央から離れてウィンドウ境界に到達するまでスクロール開始しない

### Dead Zone / Window（デッドゾーン/ウィンドウ）

- 不可視のウィンドウ内でキャラクターが自由に動き、カメラは静止
- ウィンドウ外に出るとカメラがシフト
- **不要なカメラ移動を最小化**しつつプレイヤーを可視範囲内に維持

### Smoothing & Acceleration（スムージング/加速）

- カメラが即座にスナップせず、目標位置に徐々に移動
- 距離を分割係数（例: 32）で割り、最大カメラ速度を超えない
- 視覚的快適性の向上

### Look-Ahead（前方注視）

- キャラクターの移動方向先にカメラを配置
- 接近する障害物・地形の視認性向上
- Sonic Generations: 速度に応じてルックアヘッド距離が増加
- x速度ベースのフォーカスゾーン移動

### Parallax Scrolling（パララックススクロール）

- 背景レイヤーを前景と異なる速度で移動
- 遠いレイヤーほどゆっくり移動 → **深度のイリュージョン**
- 矛盾する視覚信号からのモーションシックネス軽減にも貢献

### Multi-Focal Systems（マルチフォーカル）

- 複数の対象が注目を要求する場合
- 複数エンティティのフレーミングをバランス

### Vertical Camera Control（垂直カメラ制御）

- プレイヤーがオブジェクト上に立っているときのみ垂直移動を開始
- 全ジャンプにカメラが追従するのを防止

### Camera Shake（カメラシェイク）

- 重要イベント時のインパクトフィードバック
- 意図的な振動で打撃感を強化

## 歴史的進化

30年以上の進化を追跡:
- Rally-X (1980) / Kung-Fu Master / Moon Patrol / Street Fighter → クラシック作品
- Terraria / Mushroom 11 → 現代インディー作品での洗練されたカメラ
