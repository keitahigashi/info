---
name: Lua Game Development & Scripting Complete Guide
description: Lua選定理由（軽量/JIT/C統合）・データ駆動設計・コルーチンAI・ホットリロード・WoW/Roblox事例・最適化戦略
type: reference
---

## 出典

Generalist Programmer: https://generalistprogrammer.com/tutorials/lua-game-development-scripting-complete-guide-2025

## Luaが選ばれる3つの理由

| 理由 | 詳細 |
|------|------|
| **軽量性** | インタプリタ全体が300KB未満。リソース制約環境に最適 |
| **JITパフォーマンス** | LuaJITで標準Luaの10〜100倍高速。ほぼC言語に匹敵する速度 |
| **C/C++統合** | 直接的なバインディングインターフェースでエンジン機能を公開 |

## 業界での採用事例

| ゲーム | 用途 |
|--------|------|
| World of Warcraft | UI/アドオンシステム |
| Roblox | 完全なLuau実装（月間2億人以上） |
| Angry Birds | Corona SDK |
| Don't Starve | 全ゲームプレイコード |

## データ駆動設計パターン

テーブルベースの設定でゲームエンティティを定義:

```lua
local inventory = {
    sword = { damage = 50, durability = 100 },
    potion = { healing = 25, quantity = 5 }
}
```

コアコードに触れずにゲームパラメータを調整可能 → 反復開発に不可欠。

## スクリプティング実装パターン

### ゲームループアーキテクチャ
LÖVE フレームワークの3関数パターン:
- `love.load()` — 初期化
- `love.update(dt)` — ロジック更新
- `love.draw()` — レンダリング

### コンポーネントシステム
メタテーブルを使用したエンティティ-コンポーネント構成:

```lua
local entity = Entity.new()
entity:addComponent(TransformComponent, x, y)
entity:addComponent(PhysicsComponent)
```

柔軟なエンティティ構成と再利用可能なシステム。

## AIの行動実装: コルーチン

コルーチンが時間ベースAIシーケンスの優雅な解決策を提供:
- ステートマシンが不要になる
- `coroutine.yield()` で一時停止点を設定
- 順次的なコルーチン実行でAIが自然に流れる

## イベントシステム（メッセージパッシング）

```lua
msg.post(self.sprite_url, "flash")
msg.post("/game_manager#script", "player_death")
```

疎結合によるコンポーネント間通信。剛体な依存関係なしに独立更新可能。

## ホットリロード

「Luaファイルを保存するとゲームが自動的にリロード」:
- 即座のフィードバックループ
- ビルドサイクルなしで値の変更と結果を確認
- イテレーション速度を劇的に向上

## パフォーマンス最適化戦略

### オブジェクトプーリング
弾丸等の事前割り当てでGCポーズを防止。共有コールバックロジックで割り当てオーバーヘッド削減。

### 空間グリッド
セルベースの空間分割で「近接エンティティのみクエリ」。全エンティティチェックを回避 → 数百オブジェクトへのスケールに不可欠。

### テーブル再利用
ループ内での関数生成回避、高コスト計算のキャッシュ。

## フレームワーク比較

| フレームワーク | 強み | 用途 |
|--------------|------|------|
| LÖVE | ゼロセットアップ、即座のフィードバック | インディー2Dゲーム、学習 |
| Defold | ビジュアルエディタ、プロフェッショナルパイプライン | 商業モバイル/デスクトップ |
| Roblox Luau | 組み込みマルチプレイ、マネタイゼーション | プラットフォーム+ユーザーベース |
