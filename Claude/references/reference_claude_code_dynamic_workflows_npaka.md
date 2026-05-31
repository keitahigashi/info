---
name: Claude Code の dynamic workflows の概要
description: npaka氏によるDynamic Workflows概要解説。対応プラットフォーム・ユースケース・Bun事例・注意点を網羅
type: reference
---

## 出典

note（npaka）: https://note.com/npaka/n/ne4ec7f5bfc1b

## 概要

2026年5月28日にAnthropicが発表したDynamic Workflows機能の概要を、公式情報をもとに整理した記事。単一セッション内で数十〜数百のサブエージェントを並列実行し、複雑な大規模タスクを効率化する仕組みを解説。

## 対応プラットフォーム

- Claude Code CLI、Desktop、VS Code拡張機能
- Claude API、Amazon Bedrock、Vertex AI、Microsoft Foundry
- Max・Team・Enterpriseプラン（リサーチプレビュー版）

## 4つの技術的特徴

1. **動的な計画立案とサブタスク分割** — Claudeが自動でオーケストレーション設計
2. **結果検証前の並列実行** — 各サブエージェントが独立して処理
3. **敵対的エージェントによる検証** — 複数視点での反証と収束
4. **実行状況の自動保存** — 中断再開に対応

## 主なユースケース

- コードベース全体のバグハンティングとセキュリティ監査
- 大規模な移行・近代化作業（フレームワーク移行など）
- 重要作業の二重チェック

## Bun事例（実績）

- Jarred Sumner氏がZigからRustへの移植に使用
- 約75万行のRustコードを生成
- 既存テストの99.8%合格
- 11日間で完了（本番環境未投入と明記）

## 重要な注意点

「通常のClaude Codeセッションよりも大幅に多くのトークンを消費する可能性」があるため、小さいスコープから開始を強く推奨。
