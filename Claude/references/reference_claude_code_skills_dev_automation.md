---
name: Skills開発自動化8スキル実装例
description: Claude Code skillsで8つの開発自動化（commit/deploy/report/sync/zenn/e2e）を実装した具体的設計パターン
type: reference
---

## 出典
- URL: https://qiita.com/mk18/items/3b7403b3487f8df68e0b
- 著者: @mk18
- 公開日: 2026-02-28

## 概要
Claude Code の skills（`.claude/skills/{name}/skill.md`）を使い、自然言語の手順書をそのまま自動化ツールにする実践例。8つのスキルを実装し、設計パターンと保守のポイントを解説。

## 詳細

### 8つの実装スキル

| スキル名 | 用途 |
|---------|------|
| commit | Git コミット実行 |
| push | Git プッシュ実行 |
| save-report | 作業レポート保存 |
| sync-oss | OSS リポジトリ同期 |
| zenn | Zenn 記事作成 |
| deploy-azure | Azure デプロイ |
| dev-server | 開発サーバー起動 |
| playwright-e2e-test | E2E テスト実行 |

### 設計パターン

- **Commit スキル**: 手順は番号付きリストで順序保証。コミットメッセージに「Claudeの感想」セクション（`---`区切り）を追加
- **除外ルール**: `.env`やクレデンシャルのステージング禁止、`git add -A` 使用禁止を明記
- **保護ファイル概念**（sync-oss）: monorepo一方通行同期で README/LICENSE/package.json を保護。rsync スコープを限定
- **トリガー設計**（save-report）: 12バリエーション＋キーワード検出による暗黙トリガー
- **二重保存**（zenn）: 元ネタ（`docs/09_reports/`）と Zenn ドラフト（`docs/zenn/drafts/`）の2箇所同時保存

### 保守のポイント
- スキルサイズは最初10行→最終的に100行前後へ成長
- 「やってほしいこと」より「やってはいけないこと」の明記が最優先
