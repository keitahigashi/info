---
name: The Craft of Game Systems: General Guidelines
description: ゲームシステムを「パラメータ・ルール・コンテンツ」の3要素で分解し、5特性（理解可能・一貫性・予測可能・拡張性・エレガンス）を備えた設計指針を示す。
type: reference
---

## 出典

Game Developer: https://www.gamedeveloper.com/design/the-craft-of-game-systems-general-guidelines

## ゲームシステムの3要素

Daniel Achterman（Microsoft）によるRPG・ストラテジー向けゲームシステム設計の体系的入門。

ゲームシステムは以下の3要素で構成される:

- **パラメータ (Parameters)**: 体力・速度・ダメージなど数値で表される変数
- **ルール (Rules)**: ダメージ計算・レベルアップ処理など、パラメータを操作する公式
- **コンテンツ (Content)**: キャラクター・アイテム・敵など、ゲームに登場する具体的要素

## 良いゲームシステムの5特性

### 1. 理解可能性 (Understandability)
設計者がシステムの全パーツを把握できること。複雑さが増すと意図しない相互作用が発生し、バグや不公平なプレイが生まれる。

### 2. 一貫性 (Consistency)
ルールが全ての場面で均一に機能すること。例外を設けると理解コストが上がる。
- NG例: 飛行ユニットだけ防具ルールを変える
- OK: 全ユニット共通の防具計算式を適用

### 3. 予測可能性 (Predictability)
設計者が新状況での動作を事前に推測できること。予測不能なシステムはバランス調整が困難。

### 4. 拡張性 (Extensibility)
新コンテンツの追加が既存設計を崩さないこと。拡張を見越した設計が長期開発で重要。

### 5. エレガンス (Elegance)
少数の要素から豊かな状況を生成できること。
- 好例: Magic: the Gathering（限定的カードタイプから無限の組み合わせ）
- 好例: カタン（シンプルな資源ルールから複雑な交渉・戦略が生まれる）

## 設計原則

> 「最小限の複雑さで最大の面白さを実現する」

- プレイヤーが有意義に操作できるパラメータだけを残す
- 全領域で統一したルールを維持する
- 意図しない複雑さを「悪い複雑さ」として積極的に排除する

## 関連資料

- reference_formal-systems-games.md（ゲームの形式的要素の理論的枠組み）
- reference_systems-thinking-feedback-loops.md（システム思考とフィードバックループ）
- reference_machinations-game-mechanics.md（ゲームメカニクスの図解ツール）
