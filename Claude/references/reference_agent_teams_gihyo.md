---
name: Claude Code Agent Teamsの衝撃と実際
description: Agent Teams アーキテクチャ・有効化方法・ユースケース・コスト管理・tmux設定の実践ガイド
type: reference
---

## 出典

gihyo.jp記事（平川知秀）: https://gihyo.jp/article/2026/02/get-started-claude-code-07
公開日: 2026-03-03

## Agent Teamsとは

複数のエージェントが協働して課題を解決する仕組み。従来のSub Agentが結果を孤立して返すのに対し、Agent Teamsは**双方向コラボレーション**を実現。

## アーキテクチャ

| コンポーネント | 役割 |
|---|---|
| Team Lead | チームメンバーを生成・組織 |
| Teammates | 割り当てタスクを自律的に処理 |
| Task List | 共有JSON (`~/.claude/tasks/[team-name]`) |
| Communication | P2Pメッセージングで通信履歴を保持 |

タスクステータス: Pending → In Progress → Completed

## 有効化方法

```bash
# 環境変数
CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1 claude

# または settings.json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

呼び出し: プロンプトに「チームで行ってください」を含める

## ユースケース

1. **大規模リファクタリング**: TypeScriptアプリのスキーマ移行。数日→半日〜1日に短縮
2. **グリーンフィールド開発**: DBスキーマ設計・API実装・バックエンドを並列実行
3. **コードレビュー**: 設計・セキュリティ・パフォーマンス・DBクエリの多角的分析

## Teammateモード

| モード | 説明 |
|---|---|
| auto | 環境自動検出（デフォルト） |
| in-process | 単一画面でShift+↑/↓切替 |
| tmux | 分割ペイン表示（要Tmux） |

## コスト管理

- トークン消費量: **通常の約7倍**
- 対策: TeammatesにSonnet/Haiku使用、MCPサーバー最小化、CLIツール優先

## 制限事項（プレビュー機能）

- `/rewind`・`/resume` 非対応
- Team Leadのみ `Delegate Mode` 維持推奨
- 自動品質ゲート（テスト・lint・セキュリティレビュー）の実装が重要

## tmux設定

```bash
# Linux/WSL2
sudo apt install tmux
# ナビゲーション: Ctrl+b → o/矢印キー

# iTerm2 (Mac)
# Settings → General → Magic でPython API有効化
uv tool install it2
# settings.json: "teammateMode": "tmux"
```

## 将来的意義

線形の解決フローから、自律的タスク生成・リソース共有・協調的問題解決への進化。エージェントに「社会性」が生まれつつある。
