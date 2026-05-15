---
name: "Creating All Humans: A Data-Driven AI Framework for Open Game Worlds"
description: オープンワールドNPC向けデータ駆動型階層FSMアーキテクチャ。ビヘイビアファイルで行動をスクリプト化し再利用性を高める
type: reference
---

## 出典

Game Developer (John Krajewski / Pandemic Studios): https://www.gamedeveloper.com/programming/creating-all-humans-a-data-driven-ai-framework-for-open-game-worlds

## 概要

『Destroy All Humans 2』（Pandemic Studios）のAIアーキテクチャ解説。オープンワールドで多数のNPCが自然な行動をとるための**データ駆動型階層有限状態機械 (data-driven HFSM: Hierarchical Finite State Machine)** の設計を詳述。

## 汎用化ポイント

エンジン固有実装ではなく、オープンワールド向けNPC AI設計の汎用パターンとして応用可能。

## アーキテクチャ概要

### 階層ビヘイビアシステム

```
RootBehavior
  └── HighLevelBehavior（例: Patrol）
        ├── SubBehavior A（例: WalkToWaypoint）
        └── SubBehavior B（例: LookAround）
              └── LeafAction（例: PlayAnimation）
```

親ビヘイビアが子ビヘイビアを起動し、タスクを段階的に細分化する。

### 子ビヘイビアの4つの起動方式

| 起動方式 | 動作 | 用途 |
|---------|------|------|
| 優先度付き (Priority) | 最上位1つのみアクティブ | 戦闘 vs 歩行の切り替え |
| 順序実行 (Sequential) | 順番に実行 | アニメーションシーケンス |
| ランダム (Random) | ランダムに1つ選択 | バリエーション行動 |
| ノンブロッキング (Non-blocking) | 複数同時実行 | 移動しながら周囲を警戒 |

## データ駆動設計 (Data-Driven Design)

### ビヘイビアファイル (.behavior)
行動をコードではなくデータファイルで定義する：
- プログラマー不要でデザイナーが行動をカスタマイズ
- ゲームビルドなしでAI挙動を変更・テスト可能
- 複数NPCタイプへの同一構造の流用が容易

### パラメータシステム
親ビヘイビアが子に実行時オブジェクト（ターゲット・位置等）を受け渡す：

```
ProtectBehavior(target=Player)
  → FollowBehavior(follow_target=Player)  
  → AttackBehavior(attack_target=Enemies)
  → PatrolBehavior(patrol_area=CurrentZone)
```

ターゲットが動的に変化しても構造を変えずに対応可能。

## 実践例: Protectビヘイビア

「プレイヤーを守りながら戦う護衛NPC」を単一フレームワークで実現：

1. **距離管理**: プレイヤーとの適切な距離を維持（近すぎず遠すぎず）
2. **脅威検出**: 視野・聴覚範囲内の敵をリアルタイムで優先度付け
3. **戦闘判断**: 脅威度に応じて攻撃 vs 回避 vs 警戒を切り替え
4. **哨戒復帰**: 脅威消滅後、自動的にパトロール状態に戻る

## ビヘイビア再利用とエイリアス

同じ構造を異なるNPCで再利用する際、**エイリアスマッピング**で差異を吸収する：

```
NinjaBehavior (エイリアス: BasicMeleeBehavior)
  → AttackAction: 「NinjaKick」（基本: 「BasicPunch」）
  → MoveSpeed: 1.5x（基本: 1.0x）
  → その他: 同一構造を継承
```

共通ロジックを保ちつつ、キャラクター固有の違いをデータレベルで定義。

## オープンワールドにおける課題と解決

### 課題: 予測不可能な状況への対応
オープンワールドでは「プレイヤーがどこにでも行ける」ため、スクリプト型AIが破綻しやすい。

### 解決: 状態ベース柔軟性
- すべての行動を状態遷移で表現する
- 「想定外の入力」を新しい状態トリガーとして吸収する
- 重要な状態は優先度付き子ビヘイビアで「割り込み」として処理する

## 関連パターン

- **ビヘイビアツリー**: 本フレームワークはBTの先駆的実装に近い
- **GOAPとの違い**: GOAP（目標指向）と異なりHFSMは明示的な状態定義が必要だが、デバッグが容易
- **ブラックボード**: パラメータシステムはブラックボードパターンの一形態
