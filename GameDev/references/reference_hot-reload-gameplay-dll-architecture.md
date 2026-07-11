---
name: How I made my Zig gameplay code hot reloadable
description: DLLを介したゲームプレイコードのホットリロード実装——スレッド同期・状態保持・関数ポインタ修正の3つの技術課題と汎用的な解決パターンを解説する。
type: reference
---

## 出典

Madrigal Games Blog: https://www.madrigalgames.com/blog/how-i-made-my-zig-gameplay-code-hot-reloadable/

## ゲームプレイコードのホットリロード実装

### 背景とアーキテクチャ

Traction Pointはエンジン（C++）とゲームプレイコード（Zig）を分離したハイブリッド構成を採用している。ゲームプレイ層をDLLとして分離することでホットリロード（hot reload）が成立する。

### コアメカニズム：DLLコピー方式

OSのファイルロック問題を回避するため、コンパイル済みDLLを別名（例: `GameReload.dll`）にコピーしてからロードする。ファイルウォッチャー（file watcher）が変更を検知するとリロードをトリガーする。

### 3つの技術課題と解法

**1. スレッド同期**

クライアント（メイン）スレッドとサーバー（バックグラウンド）スレッドが両方Zigコードを実行するため、スレッドゲート（thread gate）で安全なリロードポイントを確保する。

```zig
if (mainThread && hotReloadPending) {
    threadGate->lock(numThreadsToWait);
    performReload();
    threadGate->unlock();
} else if (serverThread) {
    threadGate->arriveAt();
}
```

**2. 状態保持**

シリアライズは型変更が生じると破綻するため、ヒープ上のメモリをリロード後も保持し続けるアプローチをとる。すべてのアロケーションをエンジン管理の永続プール（persistent pool）から行うことが前提。

```zig
// グローバル変数をヒープ構造体へ移行
pub const GlobalData = struct {
    initialized: bool = false,
    canvas: UICanvasPtr = .Null,
};

inline fn getG() *GlobalData {
    return &means.g.ui_manager.hud;
}
```

**3. 関数ポインタの修正（Pointer Patching）**

リロード後、関数アドレスが変わるため古いポインタは無効になる。対策として `beforeHotReload` / `afterHotReload` のペア関数を各モジュールに実装し、コールバックを再登録する規約を採用する。

```zig
pub fn beforeHotReload() void { tearDownCallbacks(); }
pub fn afterHotReload() void  { setupCallbacks(); }
```

仮想テーブル（vtable）の再構築には、コンパイル時型リストを使った自動修復を利用する。

```zig
fn fixupActionVTables(self: *Self) void {
    for (self.queue.items) |a| {
        inline for (&SupportedActionTypes, 0..) |T, i| {
            if (a.typeIndex == i) { a.setupVTable(T); }
        }
    }
}
```

### 制約と適用範囲

- ヒープ上の構造体レイアウト変更は不可
- エンジン（C++）側の変更はホットリロード対象外
- UI挙動・AI調整・定数チューニングなどに有効

### 汎用化ポイント

- DLLコピー + ファイルウォッチャーパターン（あらゆるDLL対応言語に適用可能）
- 状態保持の原則（シリアライズより永続メモリプールの方が安定）
- before/afterフックによるポインタ修正規約（C++/Rust/C# にも応用可能）
