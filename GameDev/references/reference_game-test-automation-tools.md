---
name: "Game Test Automation Tools: Comprehensive Review"
description: ゲームテスト自動化ツール比較・3コア技法（画像認識/API/ボット）・AltUnity/Airtest/Poco/Unium詳細
type: reference
---

## 出典

IXIE Gaming: https://www.ixiegaming.com/blog/comprehensive-review-game-test-automation-tools/

## 自動化の利点

| 利点 | 説明 |
|------|------|
| 速度 | スクリプトが手動テスターより大幅に高速実行 |
| 一貫性 | 反復実行で信頼性の高い比較可能結果 |
| カバレッジ | ストレス/パフォーマンス/マルチプラットフォーム検証 |
| 精度 | エッジケースや稀なシナリオを露出 |
| 効率 | リグレッション＋バグ修正検証の迅速化 |

## 3コア自動化技法

### 1. 画像ベース認識
スクリーンショットをキャプチャ → 視覚要素を分析 → グラフィカル外観に基づき操作。
- **強み**: プラットフォーム非依存、任意のUIで動作
- **弱み**: グラフィクス変更に脆弱、計算コスト高い
- ツール: Sikuli, Airtest, Zap Test

### 2. API公開要素
確立されたAPIチャネル経由でゲームと通信。
- **強み**: 直接制御、精密操作、即時フィードバック
- **弱み**: ゲーム開発者の実装が必要
- ツール: Alt Unity, Poco Driver, Game Driver

### 3. ゲームボットシミュレーション
AI/ルールベースシステムで人間的プレイヤー行動を再現。
- **強み**: 動的シナリオへの適応、学習能力
- **弱み**: 急な学習曲線、ゲーム固有カスタマイズ必要
- ツール: AutoHotkey, Pulover's Macro Creator

## 主要ツール比較

| ツール | エンジン | 言語 | 強み | 制限 |
|--------|---------|------|------|------|
| **Alt Unity** | Unity限定 | C#/Python/Java/JS | UIフレンドリー、Inspector（有料） | Unity限定 |
| **Airtest** | 全エンジン | Python | OSS、OpenCV画像検出 | コミュニティリソース限定 |
| **Poco Driver** | Unity/Unreal/Cocos2D | Python | シンプルAPI、記録/再生 | 小規模ユーザーベース |
| **Unium** | Unity限定 | HTTP経由 | 新ビルド不要、高速＋低影響 | ソースコード必要 |
| **AutoHotkey** | Windows限定 | AHK | マクロ自動化 | 動的ゲームに不向き |

## 選定基準

| 基準 | 考慮事項 |
|------|---------|
| 統合要件 | API公開のサポート有無 |
| スクリプト言語 | チーム専門知識との整合 |
| プラットフォーム範囲 | 単一エンジン vs クロスエンジン |
| サポートレベル | アクティブコミュニティの重要度 |
| ドキュメント品質 | 独立学習＋トラブルシュートの可能性 |
