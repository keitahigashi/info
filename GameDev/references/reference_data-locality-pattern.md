---
name: "Data Locality · Optimization Patterns · Game Programming Patterns"
description: CPUキャッシュの特性を活用し、処理順序に合わせてデータを連続配置することでキャッシュヒット率を最大化する最適化パターン
type: reference
---

## 出典

Game Programming Patterns (Robert Nystrom): https://gameprogrammingpatterns.com/data-locality.html

## データ局所性 (Data Locality) パターン

### 概要

「メモリ内でデータを処理順序に合わせて連続配置することで、CPUキャッシュヒット率を向上させる」パターン。著者の実測では、同一計算をキャッシュミスが多い配置で実行した場合、最大50倍の性能差が生じることが報告されている。

### なぜキャッシュが重要か

- CPUとRAMの速度差は年々拡大しており、RAMアクセスには数百サイクルのストールが発生する
- CPUはキャッシュラインと呼ばれる単位（通常64バイト）でメモリをロードする
- 隣接メモリへのアクセスはキャッシュに残るため高速（空間的局所性）
- 直近でアクセスしたメモリの再アクセスも高速（時間的局所性）

### 主要な最適化技法

#### 1. 連続配列によるコンポーネント管理

ポインタ追跡の代わりに、同種コンポーネントを連続配列に格納して順次スキャンする。

```cpp
// 悪い例：ポインタ経由でバラバラに配置
Entity* entities[MAX_ENTITIES];
for (auto& e : entities) e->update();  // キャッシュミス多発

// 良い例：コンポーネントを型別連続配列に格納
AIComponent aiComponents[MAX_ENTITIES];
PhysicsComponent physicsComponents[MAX_ENTITIES];
for (auto& ai : aiComponents) ai.update();  // キャッシュフレンドリー
```

#### 2. ホット/コールドデータ分割 (Hot/Cold Data Separation)

毎フレームアクセスする「ホットデータ」と稀にしかアクセスしない「コールドデータ」を分離することで、ホット側のキャッシュ占有率を最大化する。

```cpp
// 悪い例：頻繁アクセスデータと希少アクセスデータが混在
struct Enemy {
    Vector3 position;    // 毎フレームアクセス (hot)
    float health;        // 毎フレームアクセス (hot)
    string name;         // 稀にしか不要 (cold)
    Texture* portrait;   // UIでのみ使用 (cold)
    LootTable* loot;     // 死亡時のみ (cold)
};

// 良い例：分割管理
struct EnemyHot { Vector3 position; float health; };
struct EnemyCold { string name; Texture* portrait; LootTable* loot; };
EnemyHot hotData[MAX_ENEMIES];
EnemyCold coldData[MAX_ENEMIES];
```

#### 3. アクティブパーティクルの前方整列

パーティクル配列でアクティブなものを前方にまとめ、非アクティブ要素を末尾へ移動させることで、条件分岐を排除しキャッシュラインを効率利用する。

```cpp
// アクティブパーティクルを前方に詰めてswap管理
int numActive = 0;
for (int i = 0; i < numActive; i++) {
    if (!particles[i].update()) {
        std::swap(particles[i], particles[--numActive]);
        i--;  // 同じインデックスを再チェック
    }
}
```

### AoS vs SoA レイアウト

| 方式 | 構造 | 向いている用途 |
|------|------|----------------|
| AoS (Array of Structures) | `[{x,y,z,hp,name}, ...]` | 単一エンティティの全プロパティを一度に参照する場合 |
| SoA (Structure of Arrays) | `{[x...], [y...], [z...], [hp...]}` | 全エンティティの同一プロパティを一括処理する場合 |

ECSアーキテクチャのコンポーネント配列はSoAの典型。ゲームのシステム処理（全AIの更新、全物理の更新）とは相性が良い。

### パフォーマンスと トレードオフ

**メリット:**
- キャッシュヒット率向上で大幅な速度改善（実測50倍のケースも）
- シンプルな配列操作でベクトル化（SIMD）も容易になる

**デメリット:**
- 仮想関数・継承・インターフェースなどの抽象化と相性が悪い
- ポリモーフィズムを捨てる設計判断が必要
- コードの可読性や拡張性が下がる可能性

### 適用判断

- ゲームのホットパス（毎フレーム呼ばれるシステム）に優先的に適用する
- プロファイラでキャッシュミスを計測してから最適化する（早すぎる最適化を避ける）
- ECSアーキテクチャはデータ局所性の恩恵を自然に受けるように設計されている
