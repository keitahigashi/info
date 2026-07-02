---
name: Claude CodeのHooksをハックして自律駆動するマルチエージェントを作った
description: Claude CodeのHooks機能を活用し、タスク自動分解・セッション継続性・自己修正を備えた自律型マルチエージェントシステム「ChainCrew」を構築した65日間の実装報告
type: reference
---

## 出典

ZAICO Developers Blog（たろう芋）: https://zenn.dev/zaico/articles/d6b882c78fe4b3

## 概要

Claude Codeの「Hooks」機能を活用して、複数のAIエージェントが協調して動作する自律型システム「ChainCrew」を開発した実験・実践レポート。「stdoutの出力がコンテキストに追加される」というシンプルな仕組みで複雑な自律制御を実現している。

## ChainCrewの3層アーキテクチャ

| 層 | 構成要素 |
|----|---------|
| 指示書層 | CLAUDE.md、ルール定義ファイル |
| 実行層 | Hooksスクリプト、ChainCrew実行エンジン |
| 状態層 | `task_stack.json`、`status/current.md`（ファイルシステム管理） |

## 4つの主要機能と実装方式

| 機能 | 実装方式 |
|------|--------|
| タスク自動分解 | `task_stack.json`による依存関係管理 |
| セッション継続性 | SessionStart Hookで中断タスク検出・再開 |
| ルール自動適用 | UserPromptSubmit Hookで毎ターン注入 |
| 自己修正 | PostToolUseで問題検知・修正タスク生成 |

## Hooksの活用方法

4つのフックポイントから自動生成されたコンテキストをClaudeに注入する：

- **SessionStart**: 中断タスクを検出し、再開プロンプトを自動注入
- **UserPromptSubmit**: 毎ターン、現在のルールセットを自動追加
- **PostToolUse**: ツール実行後の結果を評価し、問題を検知したら修正タスクを積む
- **Stop**: セッション終了時にタスクスタックを保存

## 自己修復の事例（OpenH264プロジェクト）

依存関係チェック欠如で9タスクが失敗 → SessionStart Hookが問題を検出 → システム自体がコード修正まで実行した自己修復を実現。人間の介入なしに問題を解決。

## 65日間の運用実績

| 指標 | 値 |
|------|-----|
| 運用期間 | 65日間 |
| 総トークン消費 | 約44億（キャッシュ込み） |
| API換算コスト | 約$15,400 |
| 実際支払額 | $400（Claude Max定額プラン） |

## 注意事項

- 本システムは実験段階
- 従量課金環境での利用はコスト管理に要注意
- Claude Max定額プランでのみコスト効率が成立する構成
