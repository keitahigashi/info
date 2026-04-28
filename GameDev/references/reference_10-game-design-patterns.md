---
name: "10 Game Design Patterns Every Developer Should Know"
description: ゲーム開発必須の10パターン — Object Pool/FSM/Observer/Command/Flyweight/Component/Factory/Strategy/Decorator/Event Queue
type: reference
---

## 出典

Medium (ATNO For Game Developer): https://medium.com/@atnoforgamedev/10-game-design-patterns-every-developer-should-know-c9d232914aa9

## 10のゲームデザインパターン

| # | パターン | 解決する問題 | 使用場面 |
|---|---------|------------|---------|
| 1 | **Object Pool** | 頻繁なInstantiate/Destroyによる性能スパイク | 毎秒10以上の同一オブジェクト生成 |
| 2 | **State Machine (FSM)** | 状態遷移のスパゲッティif-else | 明確で排他的な振る舞いモード |
| 3 | **Observer** | 相互に知るべきでないシステム間の密結合 | 1つのトリガーに複数システムが反応 |
| 4 | **Command** | 入力処理・Undo/Redo・リプレイ・入力バッファリング | 入力バッファ、リマッピング、Undo機能 |
| 5 | **Flyweight** | 類似オブジェクト数千個のメモリ膨張 | 大量オブジェクトが重いデータを共有 |
| 6 | **Component** | 継承地獄（Enemy→FlyingEnemy→FireFlyingEnemy） | エンティティが一部の振る舞いのみ共有 |
| 7 | **Factory Method** | 散在するハードコードされた生成ロジック | 生成ロジックが複雑またはランタイムデータ依存 |
| 8 | **Strategy** | ランタイムで交換が必要なハードコードアルゴリズム | 振る舞いをコアロジック変更なしにスワップ |
| 9 | **Decorator** | 修飾子・パワーアップによる指数的サブクラス化 | 動的なモディファイア・パワーアップのスタッキング |
| 10 | **Event Queue (Message Bus)** | 同期的ボトルネック、入力ドロップ、フレームヒッチ | 入力処理、ネットワーク、重い非同期操作 |

## 実践的組み合わせ例

- **Command + Queue** = 入力バッファリング（格闘ゲーム）
- **Observer + Event Queue** = 非同期イベント処理
- **Component + Factory** = データ駆動エンティティ生成

## ゴールデンルール

「パターンはコードを増やすためではなく、より少ないコードでより多くを実現するため」。事前にパターンを適用せず、問題を解決してからリファクタリングする。出荷された乱雑なコードは、完璧だが未完成のアーキテクチャに勝る。
