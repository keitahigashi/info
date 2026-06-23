---
name: Gamification: Thoughts on Definition and Design
description: ゲーミフィケーションの定義・批判的考察と自己決定理論に基づく内発的動機設計
type: reference
---

## 出典

Game Developer: https://www.gamedeveloper.com/design/gamification-thoughts-on-definition-and-design

## ゲーミフィケーション — 定義とデザインについての考察

著者: Zachary Fitz-Walter | 公開: 2012年

### 概要

ゲーミフィケーションの急速な普及に伴う課題を探究し、バッジ・ポイント・リーダーボードだけに依存した設計の限界を示す。自己決定理論 (Self-Determination Theory, SDT) に基づいた内発的動機設計を推奨する。

---

### ゲーミフィケーションの定義

Deterding, Dixon, Khaled, Nacke の定義を採用:

> **「非ゲームコンテキストへのゲームデザイン要素の活用」**

| 概念 | 説明 |
|------|------|
| 遊戯性 (Play) | 自由なインタラクション、ルールなし |
| ゲーム性 (Gaming) | 構造的なルールを持つインタラクション |
| ゲーミフィケーション | 完全なゲームではなく、部分的なゲーム要素の統合 |

---

### 現状の問題：外発的動機への過依存

「バッジ、ポイント、リーダーボード (Badges, Points, Leaderboards, BPL)」を即座に実装できるプラットフォーム（Bunchball、Badgeville等）が普及しているが、これらは外発的動機付け (extrinsic motivation) に過度に依存しており、ゲームの本質的な楽しさを欠いている。

**問題**: 外発的報酬はいったん除去されると行動が消失する（アンダーマイニング効果）

---

### 自己決定理論 (SDT) による内発的動機設計

Ryan et al. の研究に基づく3つの基本的心理欲求:

| 欲求 | 説明 | 設計的対応 |
|------|------|-----------|
| 自律性 (Autonomy) | プレイヤーが自発的に選択できる | 意味ある選択肢の提供 |
| 有能性 (Competence) | 最適な難易度でフロー状態を実現 | スキル曲線の丁寧な設計 |
| 関連性 (Relatedness) | 他者との接続・共感 | ソーシャル機能・コミュニティ |

---

### 実践的知見

**「Remember the Milk」vs「Epic Win」の対比事例**:
- 同じToDo管理機能を持つアプリでも、ゲーム要素の統合で心理的エンゲージメントが大きく異なる
- Epic Win: クエスト・経験値・レベルアップで「意味ある行動感」を演出

**設計原則**:
1. BPLだけのゲーミフィケーションは避ける
2. ゲームコンテキストに適切な「meaningful actions and goals」をマッピングする
3. 内発的動機を促進する包括的な設計が必要
4. SDTの3欲求すべてを満たす設計を目指す
