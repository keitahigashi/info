---
name: Game UI/UX Design: Complete Player Experience Guide 2026
description: モバイル・PC・コンソール・VRのプラットフォーム別UI/UX設計の差異、認知負荷管理、ユーザーリサーチ手法、アクセシビリティ実装を体系的に網羅した包括ガイド。
type: reference
---

## 出典

GeneralistProgrammer: https://generalistprogrammer.com/tutorials/game-ui-ux-design-complete-player-experience-guide-2025

## 概要

「UIの不備が最初の15分以内にプレイヤーの70%を離脱させる」という課題認識をもとに、心理学・アクセシビリティ・データ駆動最適化の三軸でゲームUI/UXを体系化した実践ガイド。

## 基礎設計原則

- **没入感と明瞭さのバランス**: レイヤード・インターフェース (layered interface)（状況に応じて情報を段階的に表示）
- **情報ヒエラルキー (information hierarchy)**: ゲームプレイ上の重要度に基づく優先表示
- **密なフィードバックループ (feedback loop)**: プレイヤーアクション → システム応答の遅延最小化
- **動的適応 (dynamic adaptation)**: ゲームプレイコンテキストに合わせたインターフェース自動調整

## プレイヤー心理とリサーチ手法

- **認知負荷管理 (cognitive load)**: 7±2の情報処理限界を考慮した情報量制御
- **フロー状態 (flow state) の保持**: 不要な割り込み・ダイアログの排除
- **リサーチ手法**: シンクアラウドプロトコル (think-aloud protocol)・A/Bテスト・アイトラッキングの組み合わせ

## プラットフォーム別設計指針

| プラットフォーム | 主要考慮事項 |
|---|---|
| モバイル | タッチターゲット最小44〜48pt、デバイス断片化対応、パフォーマンス制約 |
| PC | 複雑なレイアウト可、精密入力前提、マルチモニター対応 |
| コンソール | コントローラーナビゲーション、居間での視聴距離（約3m）設計 |
| VR/クラウド | 空間インタラクション設計、レイテンシ考慮 |

## アクセシビリティ実装の4領域

- **視覚**: カラーブラインドパレット (colorblind palette)、ハイコントラストモード
- **運動 (motor)**: スイッチコントロール対応、スキャニングナビゲーション
- **認知 (cognitive)**: インターフェース負荷軽減、明確な目標表示
- **聴覚 (auditory)**: 字幕（話者ラベル付き）、視覚的サウンドインジケーター

## 開発プロセス統合

ワイヤーフレーム → 高忠実度プロトタイプ (high-fidelity prototype) → エンジン実装 → 行動解析（ヒートマップ/ファネル分析）→ 反復改善

## 設計哲学

アクセシブルなゲームは全体設計品質が高い傾向にある — 柔軟性とプレイヤーへの敬意がUIの質を決定する。

## 汎用化ポイント

エンジン固有のUI実装例（Canvas設定等）は「UIレイヤリング設計の原則」として汎用化できる。エンジン横断的な概念として読み替え可能。

## 関連資料

- reference_game-ui-design-15-principles.md（UI設計の15原則）
- reference_cognitive-psychology-game-ux.md（認知心理学とゲームUX）
- reference_basic-ui-ux-principles-game-designers.md（ゲームデザイナー向けUI/UX基礎）
