---
name: "Game Programming Patterns: The Complete Catalog (2026)"
description: 15以上のゲームプログラミングパターンをTypeScriptで実装例付きで解説した2026年版総合カタログ
type: reference
---

## 出典

Generalist Programmer: https://generalistprogrammer.com/game-design-patterns

## ゲームプログラミングパターン総合カタログ

2026年6月17日更新。4カテゴリ・15種以上のパターンをTypeScriptのワーキングコード例付きで解説する。アンチパターン（God Object、Singleton乱用）の解説も充実している。

## パターン4カテゴリ

| カテゴリ | 含まれるパターン |
|----------|----------------|
| シーケンシング | ゲームループ、ダブルバッファ、更新メソッド |
| ビヘイビアル | ステート、コンポーネント、ECS、型オブジェクト |
| デカップリング | オブザーバー、サービスロケーター、イベントキュー、コマンド |
| 最適化 | オブジェクトプール、フライウェイト、空間分割、Dirty Flag |

## 主要パターンの実装ポイント

- **ゲームループ:** 固定タイムステップ vs 可変タイムステップの選択基準と実装例
- **コンポーネントパターン:** 「継承より合成 (composition over inheritance)」─ Unity/Godot方式の汎用化
- **ECS（エンティティ・コンポーネント・システム）:** キャッシュ効率的データレイアウト、Bevy（Rust）とUnity DOTSの設計比較
- **ステートパターン:** FSM（有限状態機械）→ 階層FSM → プッシュダウンオートマタの段階的移行
- **オブジェクトプール (object pool):** 弾丸・パーティクル等の生成コスト削減

## アーキテクチャパターン

- **MVC（Model-View-Controller）:** ターンベースゲーム向け、ドメインロジックとビジュアルの分離
- **クリーンアーキテクチャ (clean architecture):** マルチプラットフォーム対応・テスト重視
- **データ駆動設計 (data-driven design):** ScriptableObjects/JSONでコンテンツをコードから分離

## アンチパターン

| アンチパターン | 問題 |
|-------------|------|
| God Object | 責任過多なGameManagerクラス |
| Singleton乱用 | グローバルな隠れた状態の増殖 |
| Update Spaghetti | 巨大な単一Updateメソッド |
| マジックナンバー | ハードコードされた定数値 |
