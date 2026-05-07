---
name: Claude Code Routinesで週次生成AIトレンド記事を自動生成する
description: Claude Code Routinesを使って毎週月曜日にAIトレンド記事を自動生成→Zenn公開するパイプラインの実装例。GitHub Actionsとの役割分担も解説
type: reference
---

## 出典

Zenn (tm_dev): https://zenn.dev/tm_dev/articles/2026-05-06-zenn-auto-publish-schedule

## 概要

**公開日**: 2026年5月6日

### Claude Code Routinesとは

- Anthropicのクラウド上で指定時刻に自動起動してClaudeが作業を実行する機能
- ローカル環境不要でWeb検索・ファイル作成・Git pushなどを自動実行

### 自動化パイプラインの構成

```
毎週月曜日 → Routinesが起動
  ↓
① WebでAIトレンド調査
  ↓
② マークダウン記事を作成（公開フラグ=非公開で保存）
  ↓
③ X (Twitter) 投稿文の準備
  ↓
④ GitHubリポジトリにpush
  ↓
水曜日 9:00 → GitHub Actionsが公開フラグを有効化
  ↓
Zennに掲載
```

### 役割分担の設計ポイント

- **Routines**: コンテンツ生成・リポジトリへの書き込み担当
- **GitHub Actions**: 公開タイミングの制御担当
- 記事作成時点では非公開フラグを設定し、後でGitHub Actionsが自動公開

### 必要な条件

- **プラン**: Pro以上
- **認証**: プライベートリポジトリアクセス用のGitHub Personal Access Token
