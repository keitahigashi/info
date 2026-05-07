---
name: Designing and Implementing a Pool Allocator for Memory Management in Games
description: ゲームにおけるプールアロケータ（pool allocator）の設計・実装を解説した技術記事。O(1)割り当て・解放とメモリ断片化回避を両立する手法
type: reference
---

## 出典

Game Developer (Mateus Gondim Lima): https://www.gamedeveloper.com/programming/designing-and-implementing-a-pool-allocator-data-structure-for-memory-management-in-games

## なぜカスタムアロケータが必要か

ゲーム開発ではメッシュ・スプライト・テクスチャなど同一型のオブジェクトを大量に動的生成する。OSの標準ヒープアロケータ（malloc）は以下の問題を持つ：

1. **管理オーバーヘッド**：汎用ツールとしての設計により余分な計算コストが発生
2. **カーネルコンテキストスイッチ**：ユーザーモード→カーネルモードの切り替えコスト
3. **メモリ断片化**：可変サイズ割り当てによる断片化でキャッシュ効率低下

## プールアロケータの仕組み

**核心原則**：「同じサイズの要素のみを割り当て・解放する」

あらかじめ大きなメモリブロックを確保し、その中から固定サイズ要素を取得・返却する。フリーリスト (free list) と呼ばれる連結リスト構造で空き領域を管理する。

```
メモリブロック
[elem0][elem1][elem2][elem3]...[elemN]
   ↑
フリーリスト先頭ポインタ（未使用要素が連鎖）
```

## 実装の核心

### 初期化：フリーリストの構築

```cpp
m_ppfree_memory_list = static_cast<void**>(m_pmemory);
for (size_t i = 0; i < num_elements; ++i) {
    *curr_memory = reinterpret_cast<void*>(next_address);
    // 各要素内に「次の空き要素へのポインタ」を格納
}
```

各要素の先頭に「次の空き要素へのポインタ」を埋め込むことで、別途リスト管理用メモリを不要にする。

### メモリ割り当て：O(1)

```cpp
void* Pool_allocator::get_element() {
    void* pblock = reinterpret_cast<void*>(m_ppfree_memory_list);
    m_ppfree_memory_list = static_cast<void**>(*m_ppfree_memory_list);
    return pblock;
}
```

フリーリスト先頭の要素を返し、先頭ポインタを次へ進める。定数時間で完了。

### メモリ解放：O(1)

```cpp
void Pool_allocator::free_element(void* pblock) {
    m_ppfree_memory_list = reinterpret_cast<void**>(pblock);
    *m_ppfree_memory_list = reinterpret_cast<void*>(prev_head);
}
```

解放された要素をフリーリスト先頭に追加。定数時間で完了。

## プールアロケータの利点

| 特性 | 標準malloc | プールアロケータ |
|------|-----------|-----------------|
| 割り当て速度 | O(n)〜O(log n) | **O(1)** |
| 解放速度 | O(n)〜O(log n) | **O(1)** |
| メモリ断片化 | 発生する | **発生しない** |
| カーネル切り替え | 発生する | **発生しない** |
| 適用条件 | 任意サイズ | 同一サイズ要素のみ |

## 適用シナリオ

- **パーティクルシステム**：大量の同一構造パーティクルの生成・消滅
- **弾丸・発射物**：射撃ゲームの大量弾丸管理
- **エンティティコンポーネント**：ECSにおける同一型コンポーネントの管理
- **テクスチャ管理**：固定サイズテクスチャのプール管理

## オブジェクトプールパターンとの関係

本記事のプールアロケータは低レベルメモリ管理の実装。ゲームプログラミングパターンの「オブジェクトプール (Object Pool Pattern)」はこの仕組みを上位設計として活用する。アロケータはメモリ割り当て自体を高速化し、パターンはその上で再利用ロジックを提供する。
