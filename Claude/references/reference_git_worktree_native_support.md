---
name: Git Worktreeネイティブサポート（並列セッション・Subagent isolation）
description: Claude Code v2.1.49のGit Worktreeネイティブサポート。--worktreeフラグ・isolation:worktree・並列開発ユースケース
type: reference
---

## 出典
- URL: https://zenn.dev/hiraoku/articles/74f4b3083b582f
- 著者: hiraoku
- 公開日: 2026-02-25

## 概要
Claude Code v2.1.49で追加されたGit Worktreeネイティブサポートの機能詳細・ユースケース解説。

## 詳細

### 主要機能
- **`--worktree (-w)` フラグ**: 複数セッションが同一リポジトリ上で干渉せず並列作業
- **`isolation: worktree`**: Subagentフロントマターに指定し独立worktreeで動作
- **worktree作成位置**: `.claude/worktrees/<n>/`、ブランチ名 `worktree-<n>`
- **Desktop版**: `.worktreeinclude` で `.env` 等を自動複製

### 有効なユースケース
1. 複数セッション並列開発（認証機能とバグ修正等）
2. 大規模コードマイグレーション（ドメイン別分割）
3. 同仕様の複数実装比較（A/Bテスト的利用）
4. Writer/Reviewerパターン（異なるコンテキストでのレビュー）

### 向いていないケース
- 逐次処理、共通ファイル編集、小規模タスク、エージェント間コミュニケーション必須時
