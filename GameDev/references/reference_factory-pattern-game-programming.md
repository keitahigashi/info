---
name: Game Programming Design Patterns - The Factory Pattern
description: ゲームオブジェクトの複雑な生成ロジックをFactoryクラスに集約するファクトリパターンの実践的解説。スポーン・弾丸生成・セーブデータ復元への応用を具体的コード例で示す
type: reference
---

## 出典

Game Developer (Michael Haney, 2012): https://www.gamedeveloper.com/programming/game-programming-design-patterns---the-factory-pattern

## ファクトリパターン (Factory Pattern)

### 定義と目的

**ファクトリパターン**: オブジェクトの複雑な生成ロジックをクラスメソッドに集約し、呼び出し側が初期化の詳細を知らなくてよい設計。

**問題**: 異なる設定を持つ同種オブジェクト（例: 異なる動作をする複数の敵タイプ）を生成するたびに、初期化コードが分散・重複する。

**解決**: `BugFactory.bugFallingAtSpeed(100)` のように「何を作るか」だけを呼び出し側が宣言し、「どう作るか」はファクトリが管理する。

### 基本構造

```
class EnemyFactory {
  static Enemy spawnStatic();            // 動かない敵
  static Enemy spawnTutorial();          // チュートリアル用（弱体化）
  static Enemy spawnAtSpeed(float spd);  // 速度指定
  static Enemy spawnBoss();              // ボス設定
}
```

実装例:
```
static Enemy spawnStatic() {
  Enemy e = new Enemy();
  e.speed = 0;
  e.hp = 10;
  return e;
}
```

### ゲームへの主な適用場面

| 場面 | ファクトリの役割 |
|------|---------------|
| 敵スポーン | ゾーンに応じたパラメータ設定（HP・速度・AI種別）を集中管理 |
| 弾丸・プロジェクタイル生成 | 武器種別・発射位置・初速・エフェクト設定を1箇所に集約 |
| セーブデータからの復元 | シリアライズされたパラメータをオブジェクトに適用する復元ロジックを分離 |
| UIウィジェット生成 | ウィジェットタイプ・サイズ・スタイル設定のバリエーション管理 |
| レベルオブジェクト配置 | 乱数シードやバイオームパラメータに基づく生成ロジックの隔離 |

### メリット

- **変更の局所化**: 敵パラメータ調整時に変更箇所がファクトリ1クラスに集中する
- **拡張性**: 新しいバリアントを追加する際、既存コードを変更せずメソッドを追加できる
- **テストしやすさ**: ファクトリメソッド単体で生成結果を検証できる
- **オブジェクトプールとの親和性**: ファクトリからプールを経由してオブジェクトを取得するパターンに自然に発展

### シングルトンへの注意

同記事中で著者はシングルトンパターンについて警告: 

> 「シングルトンは悪い設計を隠す傾向がある」

グローバルアクセスが必要な場合は、シングルトンより**DIコンテナ**または**サービスロケーター** (Service Locator) の使用を推奨。ファクトリパターン自体も、状態を持たないスタティックメソッドとして実装することでシングルトン依存を回避できる。

### 関連パターン

- `reference_object-pool-pattern.md`: ファクトリで生成したオブジェクトをプールで再利用
- `reference_service-locator-pattern.md`: ファクトリの取得先としてサービスロケーターを使う構成
- `reference_component-pattern.md`: コンポーネント組み合わせをファクトリで管理する設計
- `reference_design-patterns-game-programming.md`: シングルトン・オブザーバー・ステートを含む総合パターン解説
