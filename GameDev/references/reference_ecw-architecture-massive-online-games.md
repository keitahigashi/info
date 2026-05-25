---
name: The Entity-Component-Worker Architecture and Its Use on Massive Online Games
description: ECSをスケールアウト分散システムに拡張したECWアーキテクチャの解説とWorldsAdrift実装例
type: reference
---

## 出典

Game Developer (Gabriel Gambetta, 2016): https://www.gamedeveloper.com/programming/the-entity-component-worker-architecture-and-its-use-on-massive-online-games

## ECWアーキテクチャの概要

### ECSからECWへの拡張

従来のECS（Entity-Component-System）では、単一サーバーの処理能力が上限になる。Entity-Component-Worker（ECW）アーキテクチャはECSの各システムを「ワーカー (worker)」という分散プロセスに置き換え、何千ものワーカーが協調して大規模ゲームワールドを維持する。

| アーキテクチャ | 処理単位 | スケーラビリティ |
|--------------|---------|----------------|
| ECS | 単一プロセス内のシステム | サーバー1台の上限 |
| ECW | 分散ワーカープロセス | 水平スケールアウト可能 |

### ワーカーの役割

- **ゲームエンジンワーカー**: Unity/UE等のクライアント処理
- **ロジックワーカー**: ゲームロジック・AIの分散処理
- **クライアントワーカー**: プレイヤー接続管理

### 設計の核心

```
開発者視点：「シングルプレイゲームのようにコードを記述しながら、
            コンポーネント更新の担当ワーカーを指定するだけで
            世界がスケールする」
```

コンポーネントに「どのワーカーが更新を担当するか」のアノテーションを付与するだけで、分散化が実現される。開発者は通常のECSコードと同様に実装できる。

## Worlds Adrift での実装事例

BossaStudios開発の「Worlds Adrift」がUnityとSpatialOSを組み合わせてECWを採用。SpatialOSがワーカー間の通信・負荷分散を自動管理する。

- 多数プレイヤーが同じ空間に存在しても、ワーカーが自動分割
- 特定エリアへのロード集中は担当ワーカーを自動追加
- プレイヤーは通常のマルチプレイとして体験

## ゲーム以外への応用

大規模シミュレーション（気象、交通、インターネットトポロジー）にも適用可能。「ゲームエンジンを使って宇宙の脊髄通信をシミュレーション」するような規模のシミュレーションが視野に入る。

## 汎用化ポイント（エンジン非依存）

- ECWはUnity/SpatialOS固有ではなく、**分散ECSの一般設計パターン**
- 実装の本質：「システムをステートレスなワーカーに分解し、ステートをコンポーネントに持たせる」
- MMOやライブサービスゲームのバックエンド設計に応用可能
