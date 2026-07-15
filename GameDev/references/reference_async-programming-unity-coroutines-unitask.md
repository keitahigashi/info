---
name: "Async Programming in Unity: Coroutines, Task, Awaitable & UniTask"
description: ゲームエンジンにおける4つの非同期アプローチをアロケーション・SOLID原則・テスト容易性の観点で徹底比較した技術記事
type: reference
---

## 出典

cxyda.github.io（開発者個人ブログ）: https://cxyda.github.io/AsyncProgrammingInUnity

## 汎用化ポイント

Unity固有の記事だが以下はエンジン非依存で応用可能：
- コルーチンはステートマシンにコンパイルされる原理（あらゆる非同期実装の内部実装と共通）
- キャンセルトークン (CancellationToken) パターン
- SynchronizationContextの概念（特定スレッドへの処理ポストバック抽象化）
- インターフェースベースのサービス設計によるテスト容易性
- struct vs classの非同期型設計によるアロケーション差

## 4アプローチの概要

| アプローチ | 型 | 特徴 |
|-----------|-----|------|
| コルーチン (Coroutine) | Unity固有 | `IEnumerator`ベース、yield制御 |
| Task async/await | .NET標準 | 参照型、SynchronizationContext依存 |
| Awaitable | Unityネイティブ | プーリング、明示的スレッド制御 |
| UniTask | サードパーティ | 構造体ベース、ゼロアロケーション |

## コルーチンとステートマシン

`yield return` はコンパイラがステートマシンに変換する。これはあらゆる非同期実装の内部実装と共通の原理。`StartCoroutine()` 呼び出しごとに約352バイト、`WaitForSeconds` ごとに約40バイトのアロケーションが発生。制限として try-catch ブロック内に yield return を置けない（コンパイルエラーCS1626）。

## SynchronizationContextの仕組み（汎用概念）

SynchronizationContext は「特定のコンテキスト（通常は特定スレッド）へ処理をキューイングする抽象化」。ゲームエンジンのメインスレッドへの安全な処理ポストバックを担う：

```csharp
async void Start() {
    await LoadDataAsync();  // バックグラウンドスレッドで実行
    // ← ここはメインスレッドで実行（SynchronizationContextが保証）
    UpdateUI();
}
```

**安全性が崩れる3パターン**:
1. `.ConfigureAwait(false)` の明示的使用
2. バックグラウンドスレッドからのasync開始
3. ライブラリ内部の `.ConfigureAwait(false)` 使用

## アロケーション比較（汎用設計原則）

| 操作 | コルーチン | Task | Awaitable | UniTask |
|------|-----------|------|-----------|---------|
| 操作開始 | あり | あり(クラス) | 削減(プール) | **最小(構造体)** |
| Wait/Delay | あり | あり | 削減(プール) | **最小** |

**設計原則**: 非同期型を参照型(class)でなく値型(struct)で設計するとヒープアロケーションを排除できる。

## Fire-and-Forget パターン（汎用パターン）

```csharp
// ❌ 危険：例外がサイレントに消える
_ = SomeAsyncTask();

// ✅ 例外がログに記録される
SomeAsyncTask().Forget();

// ✅ 明示的Fire-and-Forget
async UniTaskVoid FireAndForget() { ... }
FireAndForget().Forget();
```

## SOLID原則への準拠

| 原則 | コルーチン | Task/Awaitable |
|------|-----------|----------------|
| 単一責任 | フレームワークにロジック混在 | サービス分離可能 |
| 依存性逆転 | フレームワーク直接依存 | 抽象に依存可能 |
| テスト容易性 | 制限あり | ランタイムなしで完全テスト可 |

## テスト設計（汎用パターン）

インターフェースとDI（依存性注入）を組み合わせることで、ゲームランタイムなしで完全分離テストが可能：

```csharp
[Test]
public async Task LoadInventoryAsync_WithValidPlayer_ReturnsInventory()
{
    var result = await _sut.LoadInventoryAsync("player1");
    Assert.AreEqual(2, result.Items.Count);
}
```
