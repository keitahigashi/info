---
name: worktree並列自動開発の仕組み（twig・vscode-startup-runner・自動PR）
description: worktree作成からPR作成まで自動実行する並列開発パイプライン。twig CLIツール・VS Code拡張・defaultMode設定
type: reference
---

## 出典
- URL: https://zenn.dev/progate/articles/claude-code-worktree-parallel-automation
- 著者: 708u（Progate Prospects / Path）
- 公開日: 2026-02-05

## 概要
エンジニアが計画を立てるだけで、worktree作成→自動開発→PR作成まで一連処理が自動実行される仕組み。

## 詳細

### 技術スタック
1. **twig**: Git worktree+ブランチ作成CLI。gitignoreファイルのシンボリックリンク機能
2. **vscode-startup-runner**: 自作VS Code拡張。workspace起動時に指定スクリプト自動実行
3. **Claude Code**: `defaultMode: "acceptEdits"` でファイル編集を自動許可

### 自動化のコア
- promptファイル: `.twig-claude-prompt-<worktree名>.sh`
- Claude Code初期設定・リポジトリセットアップ・指示伝達を1ファイルにバンドル
- `~/.claude.json` に初回ダイアログスキップフラグ追加で無人起動

### 並列実行フロー
main worktreeから独立タスクを別worktreeに振り分け→並列実行→完了後レビュー→フィードバック

### Agent Teamsとの使い分け
- 複数インスタンスの**協調**が必要 → Agent Teams
- 独立した複数問題の**並列処理** → worktreeアプローチ
