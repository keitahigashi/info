---
name: GPGPUを体験しよう！ WebGPUのコンピュートシェーダー入門
description: WebGPUコンピュートシェーダーでGPGPU（GPU汎用計算）を実装する7ステップ——20万パーティクルシミュレーションを題材に、CPU→GPU→CPUのデータフローとWGSL記述を解説する。
type: reference
---

## 出典

ICS MEDIA（川勝 研太郎 / 株式会社ICS）: https://ics.media/entry/250626/

## WebGPU コンピュートシェーダー入門（GPGPU）

### GPGPU とは

General Purpose computing on GPU（GPUによる汎用計算）。ゲームエンジンにおいては粒子シミュレーション・物理演算・AI前処理などをGPUで並列実行するために使われる。WebGPU は従来のWebGL（ハック的GPGPU）を廃止し、真の並列コンピュートを提供する。

### 実装7ステップ

**Step 1: GPUデバイス取得**

```js
const adapter = await navigator.gpu.requestAdapter();
const device  = await adapter.requestDevice();
```

**Step 2: WGSLシェーダー記述**

WebGPU専用シェーディング言語（WGSL）でコンピュートシェーダーを書く。

```wgsl
@group(0) @binding(0) var<storage, read_write> data: array<f32>;

@compute @workgroup_size(64)
fn main(@builtin(global_invocation_id) id: vec3<u32>) {
    let i = id.x;
    data[i] = data[i] + 1.0;
}
```

**Step 3: コンピュートパイプライン作成**

```js
const pipeline = device.createComputePipeline({
    layout: 'auto',
    compute: { module: shaderModule, entryPoint: 'main' }
});
```

パイプラインは複数回再利用するため初期化時に一度だけ作成する。

**Step 4-5: バッファーとバインドグループ作成**

GPUバッファーにデータを転送し、バインドグループ（bind group）でシェーダーに紐付ける。型安全なバインドグループレイアウトを定義することでデバッグが容易になる。

**Step 6: コマンド実行**

```js
const encoder = device.createCommandEncoder();
const pass = encoder.beginComputePass();
pass.setPipeline(pipeline);
pass.setBindGroup(0, bindGroup);
pass.dispatchWorkgroups(Math.ceil(dataSize / 64));
pass.end();
device.queue.submit([encoder.finish()]);
```

**Step 7: 結果取得**

```js
await resultBuffer.mapAsync(GPUMapMode.READ);
const result = new Float32Array(resultBuffer.getMappedRange());
```

### 適用場面（ゲーム開発観点）

| 用途 | 説明 |
|------|------|
| 大規模パーティクル | 20万粒子の位置・速度更新をGPUで並列処理 |
| 物理シミュレーション | 布・流体の粒子ベースシミュレーション |
| AI前処理 | NPC行動評価・経路コスト計算の並列化 |
| 画像処理 | ポストエフェクト・ブラーの高速化 |

### WebGPU vs 従来技術

- **WebAssembly**: シングルスレッドCPU計算。大規模並列には向かない
- **Web Workers**: CPUマルチスレッドだがGPUの並列度には遠く及ばない
- **WebGPU Compute**: GPUの数千スレッドを活用。大量データの並列演算に最適

### 汎用化ポイント

WebGPU/ブラウザ環境向けだが、コンピュートシェーダーの概念（ワークグループ・バインドグループ・パイプライン）はDX12/Vulkan/Metalと共通。「コンピュートシェーダーでできること」の理解促進に有効。
