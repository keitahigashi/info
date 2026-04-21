---
name: /init大幅進化 ユーザーインタビューモードで自動セットアップ
description: /initコマンドが対話形式に進化 — 技術スタック・習熟度を質問→CLAUDE.md・スキル・フックを自動生成
type: reference
---

## 出典
- URL: https://zenn.dev/truestar/articles/455e5b54f3368e
- 著者: しんや（truestarテックブログ）
- 公開日: 2026-03-23（更新: 2026-04-20）

## 概要
Claude Code の /init コマンドが大幅進化し、対話形式のユーザーインタビューモードでプロジェクト初期設定を自動生成する機能が追加。環境変数で有効化し、技術スタック・習熟度・コミュニケーション設定を段階的に質問してCLAUDE.md・スキル・フックを自動セットアップ。

## 詳細

### 有効化方法
環境変数 `CLAUDE_CODE_NEW_INIT=1` を設定後、`/init` を実行

### ユーザーインタビューの流れ
1. セットアップ対象ファイル選択（Project / Personal / 両方）
2. スキルとフックの構成
3. プロジェクトの目的
4. 技術スタック（Python/TypeScript/Rust等）
5. Claude Code習熟度
6. コミュニケーション設定

### 自動生成される成果物

**設定ファイル**:
- `CLAUDE.md`（チーム共有の指示書）
- `CLAUDE.local.md`（個人設定）
- `.gitignore` 更新

**スキル**:
- `/verify`: lint・テスト実行で変更を検証
- `/setup-env`: Python(uv)/TypeScript環境セットアップガイド

**フック**:
- ファイル保存時に自動フォーマット（Python: ruff、TypeScript: prettier）

### 設定方法
- ターミナルログイン時の都度指定
- または `~/.claude/settings.json` に記述して永続化
