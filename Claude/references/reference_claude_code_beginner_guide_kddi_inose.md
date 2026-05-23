---
name: 【Claude Code入門】今から追いつくClaude Code 徹底解説
description: KDDIアジャイル開発センター発。Claude Codeの基本概念・インストール・CLAUDE.md・Plan Mode・Skills・Hooks・MCPを体系的に解説した入門完全ガイド
type: reference
---

## 出典

Qiita (@i-inose / KDDIアジャイル開発センター株式会社): https://qiita.com/i-inose/items/e644e9b620ee1c8d3c1b

## 公開日

2026年04月21日（最終更新：2026年04月27日）

## Claude Code入門 徹底解説

### 著者

Izuru Inose（@i-inose）/ KDDIアジャイル開発センター株式会社

### Claude Codeとは

コード補完ツール（Copilot等）とは異なり、**「作業そのものを実行する」AIエージェント**。
自然言語指示でファイル読み込み・コマンド実行・コード作成を自律的に実行する。

### インストール・初期設定

```bash
npm install -g @anthropic-ai/claude-code
claude  # プロジェクトルートで実行→ブラウザでAnthropicアカウントにログイン
```

### 基本的な使い方のポイント

- **「何をしたいか」を具体的に伝える**ことが重要
- コンテキストウィンドウ管理がパフォーマンスに大きく影響
- セッション内の不要な会話は `/clear` で削除

### 主要機能

**CLAUDE.md（プロジェクト記憶）**
- プロジェクト固有のルール・コンテキストを記録
- 毎回のセッションで自動読み込み
- 200行以内に収めることを推奨

**Plan Mode**
- コード変更前に実行計画を確認
- Shift+Tabで切り替え
- 方向性のズレを早期に発見

**Skills（プラグイン）**
- 繰り返しタスクをスキルとして定義
- `skills/` ディレクトリに配置

**Hooks**
- ツール実行の前後に処理を挟む
- CI/CD統合、通知、ログ収集に活用

**MCP（Model Context Protocol）**
- 外部ツール・APIとの連携基盤
- GitHub・Slack・Notionなど6,000以上のサービスと接続可能

### コンテキスト管理の重要性

長時間のセッションではコンテキストが蓄積し性能が低下する。
定期的な `/compact`（要約） または `/clear`（リセット）が推奨される。

<!-- 日常で得た知見をここに追記 -->
