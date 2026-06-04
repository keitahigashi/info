---
name: ゲームプログラミングパターンはなぜ「設計の共通言語」になるのか
description: Robert Nystromの『Game Programming Patterns』をベースに、デザインパターンがチームの設計共通言語として機能する理由と実践方法を解説
type: reference
---

## 出典

Zenn (つかさん): https://zenn.dev/dsgarage/articles/game-programming-patterns

## 共通言語としてのパターン

パターンが設計の共通言語になる3条件：

1. **名前が問題と解決策を同時に指す** — 「Commandパターンで入力を抽象化」という一言でチーム全員が同じ設計像を共有できる
2. **実装詳細ではなく設計意図を伝える** — コードの詳細ではなく「なぜその設計か」を伝達
3. **トレードオフが共有される** — パターン名を聞いた全員が利点と欠点を理解している

## 書籍の構成：20パターンを5カテゴリに分類

| カテゴリ | 主なパターン |
|---------|------------|
| GoF再解釈 | Command、Observer、State、Prototype、Singleton、Flyweight |
| シーケンシング | Game Loop、Update Method |
| ビヘイビア | Bytecode、Type Object |
| デカップリング | Component、Event Queue |
| 最適化 | Data Locality、Object Pool |

## 4つの核心パターン詳解

### Commandパターン

「メソッド呼び出しをオブジェクト化」

```
// 入力マッピングの抽象化
void handleInput() {
    if (input.jump) { commands.push(new JumpCommand()); }
}
```

- 入力マッピングをランタイムで差し替え可能にする
- Undo/Redo機能を自然に実装できる

### Stateパターン（有限状態機械 FSM）

Booleanフラグの複雑な組み合わせからの解放：

```
// NG: フラグの組み合わせ爆発
if (isJumping && !isDucking && hasWeapon) { ... }

// OK: 状態オブジェクトに委譲
currentState.handleInput(input);
currentState.update();
```

### Componentパターン

「モノリシッククラスをドメイン境界で分割」

- PhysicsComponent、RenderComponent、InputComponentなど機能単位で分離
- UnityのGameObject + MonoBehaviourがこのパターンの典型実装

### Game Loop + Update Method

ゲーム固有の「入力がなくても世界が動き続ける」環境を実現：

```
while (running) {
    processInput();
    update(deltaTime);  // 全エンティティのUpdate呼び出し
    render();
}
```

## チームへの導入手順

1. **段階的に導入** — 一度に全パターンを適用しない
2. **コードレビューでパターン名を使う** — 「ここCommandパターン使えますね」という語彙を定着させる
3. **既存コードのリファクタリング機会に活用** — 新規開発より改善時に自然に定着
