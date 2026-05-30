---
name: Claude Code の Dynamic Workflows を理解する — Subagents / Skills との違いと実務での使い方
description: Dynamic WorkflowsとSubagents・Skillsの違いを整理し、実務での適用シーン・設定手順を解説
type: reference
---

## 出典

Zenn (akasara): https://zenn.dev/akasara/articles/ccfb2f7a5174e0

## 概要

- Dynamic Workflows は「Claudeがその場でオーケストレーション用のJavaScriptを書き、複数のサブエージェントを並列に動かす仕組み」
- 2026年5月28日にClaude Opus 4.8とともにresearch previewとして提供開始

## 他の仕組みとの違い（計画を誰が持つか）

| 仕組み | 役割 | 計画の保持場所 |
|--------|------|--------------|
| CLAUDE.md | ルール・指針 | 設定ファイル |
| Skills | 再利用可能なプロンプト | Skillファイル |
| Subagents | 並列実行の実行単位 | 会話コンテキスト |
| Hooks | イベントトリガー | 設定ファイル |
| Dynamic Workflows | オーケストレーション | JavaScriptスクリプト |

**最大の違い**: 計画をスクリプトで管理することでコンテキスト圧迫を緩和し、再利用性を向上させる

## 適用シーン（8つ）

1. コードベース全体のセキュリティ監査
2. デッドコード・技術的負債の棚卸し
3. 大規模マイグレーション
4. PRマージ前の重いレビュー
5. 設計判断のレビュー
6. 社内ドキュメント・Runbookの整合性チェック
7. ブログ・SEO記事の一括レビュー
8. 調査レポートのクロスチェック

## 起動方法（3種類）

- `/deep-research` コマンド（ビルトイン）
- プロンプトに「workflow」を含める
- `/effort ultracode` で自動判定

## 設定手順

1. バージョン確認（v2.1.154以降必須）
2. `/config` で Dynamic Workflows を有効化
3. ワークフロー実行時の承認プロセスを確認
4. `/workflows` で進捗監視
5. スクリプトを保存して再利用

## 注意点

- Research preview のため仕様変更の可能性あり
- 単純な修正には不向き（コスト・時間がかかる）
- 権限・コスト・セッション間の制限あり
