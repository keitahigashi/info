---
name: GitHub CLIでAIエージェントの「スキル」を管理可能に：gh skillコマンドの登場
description: GitHub CLIに追加されたgh skillコマンドの完全ガイド（インストール・更新・公開・対応エージェント）
type: reference
---

## 出典

Zenn (Headwaters): https://zenn.dev/headwaters/articles/github-cli-gh-skill-agent-skills

## 公開日

2026-04-20

## 主要内容

### 概要
2026年4月16日、GitHub CLIに「スキル」管理機能「gh skill」がパブリックプレビューとしてリリース。

### スキルとは
AIエージェントに対し、特定タスクを実行するための処理手順・スクリプト・リソースをパッケージ化したもの。オープンなAgent Skills仕様に準拠。

### 対応エージェントホスト
- GitHub Copilot（デフォルト）
- Claude Code
- Cursor
- Codex
- Gemini CLI
- Antigravity

### 主要コマンド

| コマンド | 機能 |
|---|---|
| `gh skill search` | GitHub Code Searchからスキルを検索 |
| `gh skill preview` | インストール前の内容確認（必須推奨） |
| `gh skill install` | 対話形式でスキルをインストール |
| `gh skill update` | 全スキルの一括更新確認 |
| `gh skill publish` | セキュリティ検証付きでGitHubリリースに公開 |

### スコープ管理
- プロジェクトスコープ: リポジトリ単位での管理
- ユーザースコープ: 全プロジェクト共有
- タグ/コミットSHAでバージョンピン留め可能

### セキュリティ
- インストール前に `gh skill preview` で内容精査が必須
- `gh skill publish` 実行時にセキュリティ検証が自動実施
