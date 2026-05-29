---
name: Adaptive UI for Video Games
description: レスポンシブWebデザインの概念をゲームUIに応用し、複数スクリーンサイズ・入力デバイスへの単一実装対応を実現するアダプティブUIアーキテクチャ
type: reference
---

## 出典

Game Developer (Thomas Cashman, 2017): https://www.gamedeveloper.com/programming/adaptive-ui-for-video-games

## アダプティブUI（Adaptive UI）の概要

**アダプティブUI** とは「複数のスクリーンサイズおよび入力デバイスに対応する単一のUI実装」。WebのレスポンシブデザイN（Responsive Web Design）の概念をゲーム開発に移植したもの。

プラットフォーム固有のUI実装を複数維持するコストを削減し、クロスプラットフォーム開発時間を短縮する。

## アーキテクチャの3層構造

### 1. UI要素（UI Elements）

CSSとHTMLに倣い **スタイルとコンテンツを分離**。Webのボックスモデル（background・margin・padding・border）を採用。

| 基本要素 | 役割 |
|--------|------|
| Labels | テキスト表示 |
| Images | 画像・スプライト |
| TextBoxes | テキスト入力 |
| Progress Bars | 進捗・ゲージ表示 |
| Select Boxes | 選択肢リスト |

### 2. レイアウト・レンダリング（Layout & Rendering）

ブラウザのレンダリング方式を参考にした2ツリー分離設計。

- **Content Tree**（コンテンツツリー）: UI要素の論理構造
- **Render Tree**（レンダーツリー）: 実際の描画計算結果

**ダーティビット（Dirty Bit）システム**: 変更されたノードのみを再計算対象にしてパフォーマンスを最適化。変更のないノードは再レンダリングをスキップ。

**12カラムグリッドシステム**: Bootstrapの設計に倣い親要素を12列に分割。比率ベースのレイアウトで異なる解像度に自動対応。

### 3. アダプティブ入力（Adaptive Input）

3種の入力方式を透過的に扱う統一インターフェース。

| 入力方式 | 主なプラットフォーム |
|--------|----------------|
| キーボード / マウス | PC |
| タッチスクリーン | モバイル・タブレット |
| ゲームパッド | コンシューマー機 |

各UI要素の状態管理：
- **Normal**: デフォルト表示
- **Highlighted**: ホバー / フォーカス状態
- **Active**: クリック / タッチ / ボタン押下状態

## 汎用化ポイント

mini2Dx フレームワーク固有の実装ではあるが、設計思想はエンジン非依存。

- CSSボックスモデルの概念はどの2D UIシステムにも応用可能
- ダーティビットによる差分更新はUI再描画最適化の汎用パターン
- 入力抽象化レイヤーはInput Actionシステム（UnityのNew Input System、Godotの InputMap 等）と同じ発想

特にモバイル・PC クロスプラットフォームタイトルや、ゲームパッドとマウスを共存させる設計が求められる場面で参照価値が高い。
