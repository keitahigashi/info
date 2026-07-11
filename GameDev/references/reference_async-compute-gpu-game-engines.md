---
name: Async compute all the things
description: GPUの遊休ユニットを活用するAsyncコンピュートの原理・DirectX 12/Vulkanでの実装・タスクペアリング戦略を実測データとともに解説する。
type: reference
---

## 出典

Interplay of Light（Kostas Anagnostou）: https://interplayoflight.wordpress.com/2025/05/27/async-compute-all-the-things/

## Async Compute（非同期コンピュート）のゲームエンジン活用

### なぜ Async Compute が必要か

GPUは多数のプログラマブルユニットを持つが、個々のレンダリングパスはそれらを均等に使わない。例えばシャドウパスはジオメトリユニットを酷使する一方、ALUやメモリ帯域は遊休状態になる。Async compute はこの「波形の谷（GPU occupancy gap）」に別タスクを差し込むことで全体のGPU稼働率を向上させる。

### DirectX 12 での実装

**コマンドキューの作成**

```cpp
D3D12_COMMAND_QUEUE_DESC queueDesc = {
    D3D12_COMMAND_LIST_TYPE_COMPUTE,
    D3D12_COMMAND_QUEUE_PRIORITY_NORMAL,
    D3D12_COMMAND_QUEUE_FLAG_NONE
};
m_device->CreateCommandQueue(&queueDesc, IID_PPV_ARGS(&m_computeCommandQueue));
```

**フェンス（fence）によるキュー間同期**

```cpp
// グラフィクスキューが完了を通知
m_commandQueue->Signal(m_toComputeFence.Get(), ++m_toComputeFenceValue);

// コンピュートキューが待機
m_computeCommandQueue->Wait(m_toComputeFence.Get(), m_toComputeFenceValues);
```

### タスクペアリング戦略

効果的なペアリングには「ボトルネックが異なるタスク」を選ぶことが重要。

| ペア | グラフィクス側 | コンピュート側 | 効果 |
|------|---------------|----------------|------|
| 推奨例 | RTコア酷使（レイトレースシャドウ） | キャッシュ＋ALU酷使（GTAO） | 相補的で効果大 |
| 悪い例 | メモリ帯域酷使 | メモリ帯域酷使 | 競合で逆効果 |

### 実測パフォーマンス

- RTシャドウ + GTAO の組み合わせ：逐次実行 5.73ms → 並列実行 約 4.6ms
- ただしリソース競合により個別タスクの実行時間は増加するケースあり

### 制約事項

- コンピュートキューは `D3D12_RESOURCE_STATE_RENDER_TARGET` 等グラフィクス専用のリソース状態遷移を行えない
- 最適なペアはGPUアーキテクチャごとに異なるため、実測必須
- Async実行パスと非Asyncパスの両方を実装して比較計測すること

### 適用推奨シナリオ

- シャドウマップパス・Zプリパスとコンピュートワークの重複
- スクリーンスペース照明技術のラスタライズ処理との重複
- GPUが十分なリソースを持つミドル〜ハイエンド向け最適化

### 汎用化ポイント

DX12コードは特定APIだが、Async computeの概念・タスクペアリング戦略・フェンス同期の原則はVulkan・Metal・WebGPU等にも共通して適用可能。
