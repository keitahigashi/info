---
name: Claude Code Adds Dynamic Workflows for Parallel Agent Coordination
description: InfoQによるDynamic Workflows解説。並列エージェント調整・ultracode設定・トークンコスト留意点を網羅した英語権威メディア記事。
type: reference
---

## 出典

InfoQ: https://www.infoq.com/news/2026/06/dynamic-workflows-claude-code/

## 概要

- **公開日**: 2026年6月1日
- Anthropicが2026年5月28日にClaude CodeへDynamic Workflowsを導入。複雑なソフトウェアエンジニアリングタスクを複数のAIエージェントで並行処理可能にした機能を英語権威メディアInfoQが解説。

## Dynamic Workflowsの仕組み

- ユーザーの目的に基づき自動的にワークフロー計画を生成
- 複数の専門化されたサブエージェント間でタスクを分散・並列実行
- 実行進捗を保存し、中断後の再開が可能

## 主なユースケース

- 広範なバグ調査（単一エージェント対応困難な規模）
- 大規模マイグレーション・セキュリティ監査
- コードレビュー・パフォーマンス解析
- 複雑なソフトウェアプロジェクトのアーキテクチャ解析

## 利用条件・注意点

- **利用可能プラン**: Claude MaxおよびTeamプラン、またはAPI経由
- **「ultracode」設定**: ワークフロー利用を自動判断する設定を有効化可能
- **トークンコスト**: 通常のClaude Codeセッションより「かなり多くなる」可能性があるため、小規模タスクから開始を推奨

## 開発者への影響

手作業で行っていたワークフロー調整を形式化する画期的なステップと位置付けられ、ソフトウェアエンジニアリング分野のAI自動化を次段階へ引き上げる機能として評価されている。
