---
name: Anthropic wants Claude to play with money, unleashes finance agents
description: The RegisterによるAnthropicの金融エージェントテンプレート発表記事。10種以上のエージェントとClaude Opus 4.7の金融ベンチマークスコア64.37%を報道
type: reference
---

## 出典

The Register: https://www.theregister.com/software/2026/05/05/anthropic-unleashes-finance-agents-for-claude/5225868

## 概要

**公開日**: 2026年5月5日

### 金融エージェントテンプレートの概要

Anthropicが銀行・保険・資産運用・フィンテック向けに10種以上のClaudeエージェントテンプレートをリリース。

### 各テンプレートの構成要素

| 構成要素 | 説明 |
|---------|------|
| スキル | タスク用の指示とドメイン知識 |
| コネクタ | データへのアクセス管理 |
| サブエージェント | 比較可能性チェック・方法論確認等の特定サブタスク担当 |

### 提供エージェント一覧（主要）

- ピッチビルダー
- 収益レビュアー
- バリュエーションレビュアー
- 一般元帳照合
- 月次決算処理
- KYCスクリーニング（他多数）

### ベンチマーク

- **Claude Opus 4.7** がVals AIの金融エージェントベンチマークで**64.37%**を獲得（業界トップレベルと主張）

### 利用上の注意

- ユーザーは「常にループ内に留まり、Claudeの作業をレビュー・反復・承認する」ことが期待される
- Claude CoworkまたはClaude Codeのプラグインとして利用可能
