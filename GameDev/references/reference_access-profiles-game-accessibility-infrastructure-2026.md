---
name: Reimagining infrastructure for video game accessibility: exploring Access Profiles with players with disabilities and game designer-developers
description: プレイヤー・開発者・エンジン・ストアを横断する新たなアクセシビリティインフラ「アクセスプロファイル（AP）」を提案した2026年7月発表の査読研究。
type: reference
---

## 出典

Frontiers in Computer Science: https://www.frontiersin.org/journals/computer-science/articles/10.3389/fcomp.2026.1823366/full

## 概要

障害当事者プレイヤー9名とインディー開発者5名へのインタビューをもとに、現行のアクセシビリティ提供体制の課題を明らかにし、「アクセスプロファイル（AP: Access Profile）」という新しいインフラアーキテクチャを提案した研究論文（2026年7月発表）。

## APフレームワークの仕組み

- プレイヤーが「使用したいアクセシビリティ機能のプロファイル」を事前に設定する
- ゲーム起動時にAPI経由でAPを自動適用（字幕・ハイコントラスト・入力支援等）
- 開発者はエンジン向けプラグインと「機能-ニーズ対応ドキュメント」を受け取る
- ストアにはAPタグによる標準的な検索・フィルタリングが追加される

## プレイヤーへのメリット

- 設定画面ナビゲーション時間の大幅削減（自動適用）
- 標準タグによるアクセシブルゲームの発見容易化
- プライバシー保護（障害情報ではなく機能要件のみ共有）
- 健康状態の変動に対応した動的アクセシビリティ

## 開発者へのメリット

- エンジンプラグインによる実装コスト削減
- 抽象的ガイドラインではなく「どの機能がどのニーズに応えるか」の明示
- 既存開発ワークフローへの統合

## 現行の構造的障壁（研究が特定）

- ゲームエンジンに字幕等の成熟した機能のネイティブサポートが欠如
- ストアのアクセシビリティ情報が曖昧で標準用語が存在しない
- インディー開発者のアクセシビリティ知識・教育機会の不足
- 現行のプレイヤー-開発者コミュニケーション経路の不備（敵対的になるケースもある）

## 設計上の重要な原則

- APは「認定制度 (certification)」ではなく「反復的プロセス」として機能
- プレイヤーのローカル設定がAPデフォルトを上書き → 開発者の芸術的ビジョンを保護
- 成熟した機能（字幕など確立済み）と新興機能（実験的）を区別し段階的サポート
- 第三者機関によるタグ正確性の監査が必須（自己申告制の問題を回避）

## 関連資料

- reference_game-accessibility-best-practices.md（アクセシビリティのベストプラクティス）
- reference_accessible-player-experiences-apx.md（APXフレームワーク）
- reference_unified-design-universally-accessible-games.md（ユニバーサルアクセシブル設計）
