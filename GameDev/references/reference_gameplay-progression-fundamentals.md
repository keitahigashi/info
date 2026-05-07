---
name: Gameplay Design Fundamentals – Gameplay Progression
description: ゲームプレイ進行を構成する5要素（メカニクス・体験時間・付随報酬・実用報酬・難易度）の体系的設計フレームワーク
type: reference
---

## 出典

Game Developer (Mike Lopez, EA/Radical/THQ): https://www.gamedeveloper.com/design/gameplay-design-fundamentals-gameplay-progression

## 概要

EA・Radical・THQ でデザインリードを務めた Mike Lopez による進行設計の基礎論文。ゲームプレイ進行 (gameplay progression) を「明確な前進パターンを持つ一連の工程」と定義し、プレイヤー体験を最大化する5要素フレームワークを提示する。

## 進行設計の5要素

### 1. ゲームメカニクス (game mechanics)

**定義**: コントロールとインタラクションの総体（武器・能力・乗り物・環境イベント等）

**2つの実装戦略**:

| 戦略 | 説明 | 事例 |
|------|------|------|
| ゲーテッドアクセス (gated access) | 最初はロック、段階的に解放 | ゼルダシリーズ（ダンジョンごとに新アビリティ） |
| 誘導型ゲームプレイ (directed gameplay) | 全メカニクスを最初から提供、レベルデザインで誘導 | Halo（武器選択を状況で制御） |

- Ratchet & Clank: メカニクス習得専用レベルを設置
- Command & Conquer: 段階的に開放されるテックツリー

### 2. 体験時間 (experience duration)

- レベル/ミッションの長さを**進行に応じて段階的に増加**させる
- プレイヤーに無意識的な進行感を与える
- レーシングゲーム: 速い車と合わせて長いコースを後半で解放
- Road Rash シリーズで実証された手法

### 3. 付随報酬 (ancillary rewards)

- ゲームプレイに直接影響しない視覚・演出的報酬
- **環境的進行 (environmental progression)**: マップや舞台の変化で達成感を演出
- Medal of Honor のメダル解放システムが典型例
- プレイヤーの「もっと先を見たい」という好奇心を刺激

### 4. 実用的報酬 (practical gameplay rewards)

- ゲームプレイに**直接影響する**報酬（新武器・乗り物・モード・アップグレード）
- 付随報酬より継続プレイ動機として強力
- 将来報酬を**予告 (preview)** することで長期的なプレイを誘引
- Burnout: Revenge: 解放スケジュールの構造化で継続率を向上

### 5. 難易度進行 (difficulty progression)

- 曲線的な難易度上昇が推奨（序盤は低く、後半で加速）
- 早期フラストレーションを防ぎ離脱を抑制
- **プロダクション早期**に計画し、フォーカステスト (focus testing) で検証する
- 難易度カーブの数学的設計が他の4要素すべてを下支えする

## 進行設計のプロセス上の課題

> "The challenge lies not in theoretical knowledge but in steering a large portion of the development team toward cohesive execution."  
> ——Mike Lopez

- 理論的な設計だけでなく、チーム全体をその設計に向けることが最大の障壁
- 複数チェックポイントとフィードバックループで進行構造を維持する

## 参考事例の整理

| ゲーム | 特徴的な進行設計 |
|--------|----------------|
| The Legend of Zelda: Wind Waker | 葉っぱアビリティ専用レベルで段階的メカニクス教示 |
| Ratchet & Clank | 新メカニクス習得専用レベルの配置 |
| Halo | ゲーテッドアクセス + 誘導型の組み合わせ |
| Road Rash | 体験時間と難易度を同期して増加 |
| Burnout: Revenge | 解放タイミングの緻密なスケジューリング |

## 結論

プレイヤーがゲームに感じる「快感」の多くは、進行設計によって生み出される無意識的な達成感に起因する。Nintendo の品質ベンチマークはこの5要素を細心に計画・実行した結果であり、開発者は早期から進行設計を固め、反復テストで検証することが求められる。
