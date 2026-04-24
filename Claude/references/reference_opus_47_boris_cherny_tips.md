---
name: 【Opus 4.7】本家エンジニアBoris Chernyが教える、4.7を最大限活かす6つのヒント
description: Claude Code作者Boris Chernyが語るOpus 4.7最適化6ヒント（自動モード・/effort・/focus・検証手段提供）
type: reference
---

## 出典

Zenn (Na/yuche): https://zenn.dev/yuche/articles/claude-code-opus-4-7-tips

## Opus 4.7を最大限活かす6つのヒント

### 記事概要

公開日: 2026年4月17日
著者: Na（yuche）
Claude Code作者 Boris Cherny のX投稿をまとめた一次情報に近い記事。

### Opus 4.7の基本スペック

- **位置づけ**: 現在最も強力な一般提供モデル
- **コンテキスト**: 1M tokens（追加料金なし）
- **価格**: $5/input MTok、$25/output MTok
- **新機能**: 高解像度画像対応（2,576px）、adaptive thinking強化、タスク予算ベータ

### 6つのヒント

| # | ヒント | 内容 |
|---|--------|------|
| 1 | **自動モード** | 許可プロンプトがモデルベース分類器にルーティングされ、安全と判断されれば自動承認 |
| 2 | **/fewer-permission-prompts** | セッション履歴をスキャンして許可リストを推奨（煩わしいプロンプトを削減） |
| 3 | **リキャップ** | 長時間セッションの進捗を短く要約させる |
| 4 | **/focus（フォーカスモード）** | 途中作業を非表示にして最終結果のみ表示 |
| 5 | **/effort（エフォートレベル）** | 適応的思考をタスクに応じて調整（xhigh推奨） |
| 6 | **検証手段の提供** | テスト→整形→PR作成の標準ワークフロー定義 |

### Boris Chernyの核心メッセージ

> "ワークフローを調整する時間を取ってほしい。古いワークフローでも改善は感じるが、調整すれば大きな飛躍になる"

### 実践ポイント

- Opus 4.7 + xhigh の組み合わせで高難度タスクに対応
- `/fewer-permission-prompts` でCI/CDパイプライン組み込み時の摩擦を削減
- 検証コマンド（テスト実行・lint）をCLAUDE.mdに明記することでモデルが自律的に検証
