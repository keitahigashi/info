---
name: awesome-claude-md 入門｜CLAUDE.mdベストプラクティス集の歩き方と取り込み手順
description: josix/awesome-claude-mdのカタログ構造・採点基準・6カテゴリを解説し、自プロジェクトへの移植手順まで示したガイド。
type: reference
---

## 出典

AI Heartland 編集部: https://ai-heartland.com/explain/awesome-claude-md-guide/

## awesome-claude-md とは

- GitHubプロジェクトから優良CLAUDE.mdをカテゴリ別にキュレーションしたコレクション（★389、収録108件）
- 目的: 「複雑なコードベースへのAIオンボーディングの業界ベストプラクティスを示す」

## 採点基準（100点満点、60点以上が収録ライン）

- スター数の寄与は全体の **10%のみ**（人気よりも学べる中身を優先）

## カテゴリ構成（6分類）

| カテゴリ | 件数 | 用途 |
|----------|------|------|
| developer-tooling | 41件 | CLI・プラグイン・MCP |
| libraries-frameworks | 27件 | API規約の明示 |
| complex-projects | 25件 | 大規模アーキテクチャ |
| getting-started | 6件 | 入門・スターターキット |
| infrastructure-projects | 6件 | 低レイヤ基盤 |
| project-handoffs | 3件 | 引き継ぎドキュメント |

## 優れたCLAUDE.mdの4要素

1. コンテキスト共有（目的・アーキテクチャ・スタック）
2. コーディング規約（命名・ライブラリ・フォーマット）
3. コマンド一覧（ビルド・テスト・デプロイ）
4. アンチパターン明示（禁止事項）

## 自プロジェクトへの移植手順

プロジェクト性格を特定 → 近い実例を選定 → 元リポジトリで本物確認 → 構成要素抽出 → 移植 → Claude Codeで検証・調整
