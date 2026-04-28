---
name: "Music Syncing in Rhythm Games"
description: リズムゲーム音楽同期3原則・DSPタイミング・ビートベースノート生成・補間移動パターン
type: reference
---

## 出典

Game Developer: https://www.gamedeveloper.com/programming/music-syncing-in-rhythm-games

## リズムゲーム同期の3原則

1. **AudioSettings.dspTime** で曲位置を追跡（Time.timeSinceLevelLoad ではなく）
2. 常に**曲位置ベース**で移動を更新
3. フレームごとの時間差更新ではなく**補間**を使用

## DSPタイミングの優位性

`AudioSettings.dspTime` はオーディオシステムのタイマーで、フレーム更新より**高頻度に更新**。フレームタイミングのギャップによるレイテンシを回避し同期を維持。

## コア実装: SongManager

### 追跡変数

| 変数 | 説明 |
|------|------|
| songPosition（秒） | DSP時間から計算した現在再生位置 |
| songPositionInBeats（ビート） | BPMで変換したビート位置 |
| secPerBeat | ビートあたり秒数（60 / BPM） |

### 初期化

曲開始時に `AudioSettings.dspTime` を記録。

### フレーム更新

```
songPosition = dspTime - dspSongTime
songPositionInBeats = songPosition / secPerBeat
```

## ビートベースのノート生成

ノートをビート位置の配列として格納:
- 現在ビート位置 > ノートビート位置 − 先行表示ウィンドウ
- → ノートをスポーン

## 移動の補間

ノート位置は**スポーン点と除去点の間の線形補間**で計算。補間係数は経過時間ではなく**ビート距離**から導出 → 視覚的進行がオーディオと整合。
