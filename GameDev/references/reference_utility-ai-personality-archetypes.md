---
name: "Artificial Intelligence: Utility Builds Character"
description: ユーティリティAIで「臆病者」「狂人」「守護者」など個性的AIアーキタイプを設計する3層アーキテクチャの実装論
type: reference
---

## 出典

Game Developer (Miguel Nieves, 2012): https://www.gamedeveloper.com/programming/artificial-intelligence-utility-builds-character

## 概要

ターン制戦略ゲーム「Battle of the Bulge」(iPad) のAI設計事例。ユーティリティベースの意思決定でキャラクター性の異なる複数のAIアーキタイプ (archetype) を実装した手法を解説する。

> 「単一の"最善手"を定義するのではなく、個性ある戦略を持つプレイヤーを複数作ることで、ゲームの奥行きが生まれた」

---

## 3層アーキテクチャ

```
Control Yoke（AIコントローラー）
    ↓ ゲームシステムとのインターフェース
Strategic Brain（戦略ブレイン）
    ↓ 戦術オプションの評価・選択
Tactical Nodes（タクティカルノード）
    ↓ 生のユーティリティ値を算出
```

### 各層の役割

| 層 | 役割 | 詳細 |
|----|------|------|
| **Control Yoke** | ゲームシステムとのブリッジ | 初期化・アイドル・行動決定・コミット・待機の階層FSM |
| **Strategic Brain** | 行動オプションの比較・選択 | 複数のアクションをスコア化して最高値を選択 |
| **Tactical Nodes** | コンテキストに応じたスコア算出 | 状況変数を受け取り数値を返す関数群 |

### Control Yoke の状態マシン (FSM)

```
Rising Edge Init → Idle（情報収集）→ Action Decision
    → Commit（行動実行）→ Waiting（終了待ち）→ Idle
```

デバッグのために各状態にリアルタイム遅延を挿入でき、意思決定プロセスを可視化できる。

---

## 6つのAIアーキタイプ

| アーキタイプ | 特性 | ユーティリティの重点 |
|------------|------|------------------|
| **Genius（天才）** | 最適プレイを志向 | 勝利確率最大化 |
| **Coward（臆病者）** | 対立を回避 | リスク最小化・後退戦略 |
| **Psycho（狂人）** | 危険な選択を好む | リスクの高い行動に高スコア |
| **Defender（守護者）** | 領土に留まり集団化 | 自陣維持・クラスタリング |
| **Exploiter（搾取者）** | 弱点を狙う | 敵の脆弱性に高スコア |
| **Comedian/Troll** | プレイヤーの快適さを妨げる | 予測外行動・嫌がらせに高スコア |

---

## ユーティリティの正規化

```python
# 概念的な実装イメージ
def evaluate_action(action, context):
    raw_score = tactical_node.calculate(action, context)
    return normalize(raw_score, min_val=0, max_val=100)

# アーキタイプ別重み付け例（Coward）
def coward_weights():
    return {
        "advance": -2.0,   # 前進ペナルティ
        "retreat": +2.0,   # 後退ボーナス
        "attack": 0.5,     # 攻撃は控えめ
        "defend": 1.5      # 防衛を優先
    }
```

スコアを 0〜100 に正規化することで異なる種類の行動を公平に比較できる。

---

## 設計上の発見

単一の「最善手」を追求するAIではなく、個性あるアーキタイプを複数実装することで：

1. **プレイヤーが敵の行動傾向を「読む」楽しさ**が生まれる
2. **どの行動がプレイヤー体験にどう影響するか**を体系的に把握できた
3. スクリプトファイルで重みを変更するだけで新しいアーキタイプを追加可能

---

## 汎用化ポイント

ユーティリティAIによるアーキタイプ設計はジャンルを問わず応用できる：
- **RPGの敵**: 戦士型（接近）・魔法使い型（距離維持）・支援型（回復優先）
- **RTSのNPC**: 侵攻派・防衛派・経済優先派
- **ホラーゲームのモンスター**: 追跡型・待ち伏せ型・撹乱型
