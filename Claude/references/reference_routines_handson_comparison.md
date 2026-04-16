---
name: Routinesハンズオン比較（既存スケジューリングとの差分・3サンプル設計）
description: Routinesをローカルタスク・/loop・GitHub Actionsと5軸比較、ナレッジワーカー向け3サンプル設計（週次集計・API起動Issue作成・PR文書チェック）
type: reference
---

## 出典
- URL: https://zenn.dev/canly/articles/ed403b2b3d3bb3
- 著者: ふくだ（fukuda ryu / カンリー）
- 公開日: 2026-04-15

## 概要
Routines（Research Preview）を実際に触り、ローカルタスク・/loop・GitHub Actionsとの差分を5軸で比較。3つの実践サンプル設計とドキュメント-UI乖離点を報告。

## 詳細

### 5軸比較表

| 項目 | Routines | ローカルタスク | /loop | GitHub Actions |
|------|----------|------------|-------|-----------------|
| PC起動必須 | No | Yes | Yes | No |
| クラウド実行 | Yes (Anthropic VM) | No | No | Yes (GitHub runners) |
| 最小間隔 | 1時間 | 1分 | 1分 | 約5分 |
| チーム共有 | No（個人紐づけ） | No | No | Yes |
| 日次上限 | 15-28回 | 無制限 | 無制限 | 無制限 |

### サンプル1: 週次Activity集計→Slack（スケジュールトリガー）
- 毎週金曜17:00にリポジトリメトリクス集計
- MCP Slackコネクタで直接投稿
- 利点: PC sleep問題回避、Webhook URL管理不要

### サンプル2: ターミナル→Issue作成（APIトリガー）
- `fire-issue "feature request"`で構造化GitHub Issue作成
- 重複チェック付き、auto-implementワークフローと連携
- `/fire` APIエンドポイントによるパラメータ付きオンデマンド実行

### サンプル3: ドキュメント整合チェック（GitHubイベントトリガー）
- PR作成時にドキュメント関連性を検証、コメント投稿
- 制限: 現在PR系（約22種）とRelease系（7種）のみ対応

### ドキュメント-UI乖離点

| 項目 | ドキュメント | 実際のUI |
|------|-----------|----------|
| GitHubトリガーイベント | 18種類 | PR + Releaseのみ |
| カスタムcron | CLI `/schedule update` | Web UIタブあり |
| cronタイムゾーン | ローカル | **UTC基準** |

### Routines選択指針
- **Routines向き**: クラウド実行必須・YAML不要のGitHubイベント反応・ターミナルからのオンデマンド起動
- **GitHub Actions向き**: チーム共有必須・5分未満ポーリング・共有インフラ責任

### 注意点
- MCPコネクタがデフォルト全有効（明示的削除が必要）
- カスタムcronがUTC基準（ローカルタイムゾーンではない）
- GitHubトリガーは1リポジトリ/トリガー制限
