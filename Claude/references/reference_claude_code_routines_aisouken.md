---
name: Claude Code Routinesとは？機能・使い方・料金を解説
description: Anthropic公式Routines機能をSchedule/API/GitHubの3トリガー・プラン別上限・セキュリティ設計まで包括解説
type: reference
---

## 出典

AI総合研究所（坂本 将磨 Microsoft MVP）: https://www.ai-souken.com/article/what-is-claude-code-routines

## 記事の概要

2026年4月19日公開。Anthropicが2026年4月14日にリリースした「Claude Code Routines」を、3種のトリガー・プラン別日次上限・コネクター設定・セキュリティ設計まで体系的に解説。

## Routinesの基本構成

| 要素 | 内容 |
|---|---|
| プロンプト | 実行させるタスクの指示 |
| リポジトリ | 操作対象のコードベース |
| MCPコネクタ | 連携する外部ツール |
| トリガー | 実行のきっかけ（3種類） |

## 3種のトリガー

### Schedule（スケジュール）
- 毎時・毎晩・毎週から選択
- cron代替として機能

### API
- 外部サービスからHTTPコールで起動
- ベータ段階（`anthropic-beta: routines-api-2026-04-14` ヘッダ必須）
- `/fire` エンドポイントへPOSTでトリガー

### GitHub Event
- PR opened / push などのWebhookで自動実行

## プラン別日次実行上限

| プラン | 上限 |
|---|---|
| Pro | 5回/日 |
| Max | 15回/日 |
| Team / Enterprise | 25回/日 |

## セキュリティ設計

- デフォルトでは `claude/` プレフィックスのブランチのみへのpushを許可
- 個人名義での実行となるためチーム共有ルーティンは設計注意
- 権限スコープをコネクター選定で事前に絞り込むことが重要

## 実行環境

- AnthropicのクラウドインフラでClaudeが実行（ローカルPC不要）
- 使用量はサブスクリプションの日次/月次上限に合算
- Extra Usage有効時は上限超過後もメーター課金で継続

## 活用ユースケース

- 夜間のPRレビュー自動化
- 定期的なテスト実行・障害アラート対応
- データパイプラインの定期バッチ処理
