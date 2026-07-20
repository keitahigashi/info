---
name: "Fibers, Oh My!"
description: M:Nファイバーモデルの詳細実装ガイド。スレッドプールの欠陥・コンテキスト切り替え・同期プリミティブ・Reactorパターンまで網羅
type: reference
---

## 出典

Dale Weiler 個人ブログ (graphitemaster.github.io): https://graphitemaster.github.io/fibers/

## 概要

ゲームエンジン開発者 Dale Weiler によるファイバーの理論・実装詳細・落とし穴を扱う包括的ガイド。ファイバーは「グリーンスレッド (green thread)」「ユーザー空間スレッド (user-space thread)」「コルーチン (coroutine)」とも呼ばれ、スケジューリングをカーネルからユーザー空間に移すことが核心。Naughty Dog（GDC 2015）の事例も参照。

## スケジューリングモデルの対比

| モデル | 切り替えタイミング | 主体 | 代表例 |
|--------|-----------------|------|-------|
| プリエンプティブ | IO/スリープ/割り込み | OS | OS スレッド |
| 協調的 (cooperative) | 明示的yield | コード | ファイバー |

## スレッドプールの欠陥（なぜファイバーが必要か）

**問題1: 参照の局所性問題**

```cpp
// 危険：lambdaがローカル変数への参照を捕捉
void upload_file(const String& filename) {
    thread_pool->add_job([&] {  // filenameは関数返却後に無効化
        auto file = open_file(filename);
    });
}
```

**問題2: ネスト誘発デッドロック**  
ジョブがサブジョブをスケジュールし結果を待つ場合、`wait_for_all_jobs` でデッドロック発生。ファイバーはyieldで回避。

## M:Nアーキテクチャ

- **N:1**: 複数ファイバーが1つのOSスレッドを共有（Lua, JS async/await, Python）
- **M:N**: 複数ファイバーが複数OSスレッドに分散 → ハードウェア並列性を活用

M:Nファイバーにより：
- ブロッキングスタイルのコードが実際にはブロックしない
- ネストデッドロックをファイバースケジューリングで回避
- コンテキスト切り替えを必要最小限に抑制

## ユーザー空間コンテキスト切り替え実装

OSプリミティブより高性能なカスタム実装：

```cpp
// 64バイト・1キャッシュライン収納のコンテキスト構造
struct Context {
    void *rip, *rsp;
    void *rbx, *rbp, *r12, *r13, *r14, *r15;
};

get_context();   // 現在の実行状態を保存
set_context();   // 保存状態を復元してジャンプ
swap_context();  // 原子的にコンテキスト交換
```

## スタック管理戦略

- スタック割り当てはスケジューラ準備完了まで遅延
- 複数サイズクラスで効率化
- 解放済みスタックの再利用（キャッシュヒット率向上）
- OSスケジューラスレッドをハードウェアスレッドに固定

## コンパイラ・デバッガ対応

コンテキスト切り替えは通常の制御フローを破るため特別な対応が必要：

```cpp
// AddressSanitizer対応
__sanitizer_start_switch_fiber(fake_stack, bottom, size);
swap_context(&src, &dst);
__sanitizer_finish_switch_fiber(fake_stack, &old_bottom, &old_size);

// ThreadSanitizer対応
auto fiber = __tsan_create_fiber(0);
__tsan_switch_to_fiber(fiber, 0);

// Valgrind対応
VALGRIND_STACK_REGISTER(stack_start, stack_end);
```

## ブロッキング操作のReactorパターン

ファイバーはOSブロッキング呼び出しを直接使えないため：

```
[ファイバー] → IOリクエストをキューに積みyield
[Reactorスレッド] → IO実行 → 完了ポーリング → ファイバーをwake
```

プラットフォーム別ポーリング機構：
- Linux: `poll()` / `epoll()` / `io_uring()`
- BSD/macOS: `kqueue()`
- Windows: IOCP (I/O Completion Ports)

## カスタム同期プリミティブ

OSプリミティブはスレッドをブロックするためファイバー非互換。基盤はSpinlock だが、Skylake以降のCPUでPAUSE命令レイテンシが140サイクルに増加したため、PAUSEベースのSpinlockは非推奨。

## ファイバーが解決できないもの

- 優先度逆転問題（リアルタイム音声ミキシング等には不適）
- OSのブロッキング呼び出し（IO、スリープ等は専用スレッドに委譲必須）
