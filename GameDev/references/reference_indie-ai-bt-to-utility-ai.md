---
name: "Indie AI Programming: From Behaviour Trees to Utility AI"
description: ビヘイビアツリーとユーティリティAIを比較実装し、スコアリング関数でアーキタイプ別AIを設計する手法
type: reference
---

## 出典

Game Developer (David Huebner, 2017): https://www.gamedeveloper.com/programming/indie-ai-programming-from-behaviour-trees-to-utility-ai

## ビヘイビアツリー (behaviour tree) からユーティリティAIへ

### 対象ゲーム

ターン制戦術RPG「Rise of the Elders: Cthulhu」の開発で、2つのAIシステムを比較実装した事例。

---

## ビヘイビアツリー (behaviour tree) の課題

- **複合ノード**（シーケンス・セレクター）と**リーフノード**（アクション）の階層で構成
- 敵の数・能力が増えると急速にツリーが複雑化する
- 行動が決定論的で予測されやすい（プレイヤーに読まれる）
- 新しい行動追加時に既存ツリー全体の見直しが必要

---

## ユーティリティAI (utility AI) の設計

### 基本概念

「複数の行動をそれぞれスコア化し、最高スコアの行動を選択する」

```
score(Action) = f(contextual_factors)
selected = max(score(Action_1), score(Action_2), ..., score(Action_n))
```

### 実装例：Deep Oneの咆哮 (Roar) 能力

```
Evaluate(Roar) = 影響を受ける探偵の数 × 25 - APコスト × 10
```

- 探偵が密集していれば咆哮のスコアが上がり、孤立していれば使わない
- AI自身が最適な位置取りを評価してから能力を使う判断ができる

---

## 4種のモンスターアーキタイプ (archetype)

| アーキタイプ | 設計意図 | 評価ロジック |
|------------|---------|------------|
| **Creeper** | HP の低い探偵を狙う | ターゲットHP の低さに高スコア |
| **Deep One** | タンク役・範囲制正気度ダメージ | 密集範囲に咆哮スコアを集中 |
| **Maniac** | チームを分断・孤立した探偵を拘束 | 孤立度・拘束可否でスコア算出 |
| **Priestess** | 遠距離呪文・射線のある掩蔽へ | 射線確保と安全距離で評価 |

---

## ユーティリティAIのメリット

| 比較軸 | ビヘイビアツリー | ユーティリティAI |
|-------|--------------|--------------|
| 拡張性 | ツリー再構築が必要 | スコアラー追加のみ |
| 予測可能性 | 決定論的 | 確率的・状況依存 |
| 複雑敵設計 | 困難 | 自然にスケール |
| デバッグ | ノード追跡 | スコア値の可視化 |

### スケーリングの優位性

> "Utility AI enables developers to scale complexity by adding scorers and functions without restructuring existing systems."

新しいアーキタイプや能力を追加する際、既存のスコア関数を変更せず新しいスコアラーを追加するだけで対応可能。

---

## 設計上の注意点

- スコアの**重み付け (weighting)**が正しくないと不自然な行動が発生する
- デバッグ用に各スコア値をリアルタイム可視化する仕組みを用意すること
- ビヘイビアツリーとユーティリティを**ハイブリッド**で使う設計も有効（BT で高レベル構造、ユーティリティで行動選択）
