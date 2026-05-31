---
name: Claude Code の Dynamic Workflows をはじめる + 有効化の落とし穴（env var と GrowthBook flag の二重 gate）
description: Dynamic Workflowsの有効化で躓く「環境変数とGrowthBook flagの二重gate」問題を解説したQiita記事。env var未設定時にflagがtrueでも無効化される挙動を詳述
type: reference
---

## 出典

Qiita（@leven-E）: https://qiita.com/leven-E/items/d1b61812ccedae93d4f2

## 概要

2026年5月30日公開。Dynamic Workflows（2026-05-28リリース）を有効化しようとして躓く人向けの解説記事。env varとGrowthBook flagの二重gateという仕様上の落とし穴を解説し、確実な有効化手順を示す。

## Dynamic Workflowsとは

Claude Codeが「数十〜数百のサブエージェントを1セッション内で並列にオーケストレーション」できる機能。大規模フレームワーク移行やセキュリティ監査などに活用。

## 利用可能プラン

| プラン | デフォルト状態 |
|--------|--------------|
| Max / Team | デフォルト有効 |
| Claude Code via API | デフォルト有効 |
| Enterprise | デフォルト無効（管理者が有効化可能）|

## 有効化の3ルート

1. プロンプトで直接「動的ワークフロー作成」と依頼
2. `/effort ultracode`（ultracode = xhigh + workflows）を設定
3. 環境変数 `CLAUDE_CODE_WORKFLOWS=1` を設定

## 落とし穴：二重gateの問題

**問題の構造：**
```
環境変数 CLAUDE_CODE_WORKFLOWS=1
    AND
GrowthBook flag tengu_workflows_enabled = true
```

**この二重gateにより：**
- GrowthBook flagがtrueでも、環境変数が未設定なら機能はOFF
- 機能が「無言で無効化」されるため、原因が分かりにくい

**解決策：**
```bash
export CLAUDE_CODE_WORKFLOWS=1
# その後 Claude を起動する
```

## skill・command・workflowの違い

- **skill**: 事前定義された再利用可能なプロセス
- **command**: 単一ステップの操作
- **workflow**: 動的に生成される複数ステップのオーケストレーション

## 注意点

- 通常セッションより大幅に多いトークンを消費
- 実行中はユーザー入力不可
- 最大並列エージェント: 16、1実行上限: 1,000エージェント
