---
name: Claude Code の最新脆弱性と対策まとめ – RCE・CSRF漏洩・サンドボックス化
description: Claude Codeで発生しうるRCE・CSRF・シークレット漏洩の仕組みを解説し、Docker/Firejailサンドボックス化・CI統合スキャンまで網羅した実装レベルの防御策まとめ。
type: reference
---

## 出典

アプリの達人 / 葵: https://app-tatsujin.com/claude-code-recent-vulnerabilities-2026/

## 記事概要

- 著者: 葵@アプリの達人
- 公開日: 2026年5月9日
- Claude Codeを使う開発環境で実際に発生しうる脆弱性とその対策を、実装レベルで解説した実践的まとめ記事。

## 主要な脆弱性2種類

### 1. リポジトリ公開によるシークレット漏洩とRCE

- **発生メカニズム:** `.claude/` ディレクトリに平文のAPIキーやスクリプトが格納され、`.gitignore` に除外設定がない場合、`git clone` で攻撃者が取得可能
- **危険性:** スクリプト内の危険なシステムコマンド実行によるRCE（リモートコード実行）と、APIキーの外部送信が同時発生
- **防御策:**
  - 環境変数・外部シークレットストア（AWS Secrets Manager等）の活用
  - CI時点でのシークレット検出（`git-secrets`、`truffleHog`）
  - `.gitignore` への `.claude/` 関連ファイルの明示的追加

### 2. RailsアプリのCSRF設定ミス

- `SameSite` 属性が `None` に設定されている、Origin ヘッダー未チェックという複合的な設定ミス
- **推奨設定:** Rails 7.1+ で `same_site: :strict` または `:lax` を使用

## 実装レベルの総合防御策

| 対策カテゴリ | 具体的手法 |
|-------------|----------|
| サンドボックス化 | Docker+非rootユーザー、Firejailプロファイル活用 |
| 自動アップデート | GitHub Actions + Dependabotで週次 `bundle update` |
| 脆弱性スキャン | Trivy（コンテナ）、Brakeman（Ruby）、Bandit（Python）をCI統合 |
| ネットワーク制御 | egressフィルタリングで外部通信を制限 |

## インシデント対応フロー

1. ログ取得・ネットワーク遮断（即時対応）
2. バックアップ確認後の安定版ロールバック
3. パッチ適用と動作確認
4. HackerOne経由でのAnthropicへの正式報告

## ポイント

Claude Codeは `.claude/` ディレクトリにスクリプト・設定・認証情報が集中しやすい構造を持つため、他のAIコーディングツールと比べてGitリポジトリ経由の漏洩リスクが特有の形で高い。CIパイプラインへのセキュリティスキャン統合が防御の要となる。
