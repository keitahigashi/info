---
name: claude-peers-mcp セットアップガイド
description: 複数のClaude Codeセッション間でリアルタイムにメッセージ交換するMCPサーバーのセットアップ・活用方法（Zenn記事の詳細版）
type: reference
---

## 出典

Zenn記事: https://zenn.dev/ait/articles/claude-peers-mcp-quickstart
GitHub: https://github.com/louislva/claude-peers-mcp
著者: aito（UIUXエンジニア/デザインエンジニア）
公開日: 2026-03-22

## 概要

複数のClaude Codeセッション間でリアルタイムにメッセージ交換を可能にするMCPサーバー。localhostのブローカーデーモン（port 7899）がSQLiteでメッセージを管理し、各セッションが1秒間隔でポーリングする仕組み。

## アーキテクチャ

- ブローカーデーモンがlocalhost:7899で動作
- SQLiteデータベースでメッセージ管理
- 各セッションはstdioトランスポートでMCPサーバーを起動
- ブローカーに登録後、1秒ごとにポーリング
- Channelプロトコル経由でメッセージプッシュ受信
- ブローカーは初回セッション起動時に自動起動、停止したピアは自動クリーンアップ
- 全通信が127.0.0.1に限定（外部アクセス不可）
- SQLインジェクション対策: パラメタライズ済み

## 前提条件

- Bun（JavaScriptランタイム）
- Claude Code v2.1.80以上
- ログイン済みClaude Code環境

## セットアップ

```bash
# Bun インストール
curl -fsSL https://bun.sh/install | bash
# または
brew install oven-sh/bun/bun

# リポジトリクローン
git clone https://github.com/louislva/claude-peers-mcp.git ~/claude-peers-mcp
cd ~/claude-peers-mcp
bun install

# MCPサーバー登録
claude mcp add --scope user --transport stdio claude-peers -- bun ~/claude-peers-mcp/server.ts

# 起動（エイリアス推奨）
alias claudepeers='claude --dangerously-skip-permissions --dangerously-load-development-channels server:claude-peers'
claudepeers
```

## 提供ツール（4つ）

| ツール | 機能 |
|--------|------|
| list_peers | インスタンス検出（machine/repo/directoryスコープ） |
| send_message | IDベースのメッセージ送信（Channelプロトコル経由で即時到着） |
| set_summary | 作業内容の説明文設定（他ピアから参照可能） |
| check_messages | 手動メッセージ確認（Channelフォールバック） |

## CLIコマンド

```bash
cd ~/claude-peers-mcp
bun cli.ts status            # ブローカーステータスと全ピア情報表示
bun cli.ts peers             # ピア一覧表示
bun cli.ts send <id> <msg>   # メッセージ送信
bun cli.ts kill-broker       # ブローカー停止
```

## 環境変数

| 変数 | デフォルト | 説明 |
|------|-----------|------|
| CLAUDE_PEERS_PORT | 7899 | ブローカーポート |
| CLAUDE_PEERS_DB | ~/.claude-peers.db | SQLiteパス |
| OPENAI_API_KEY | — | 設定すると起動時に作業サマリーを自動生成（gpt-5.4-nano使用、モデル変更不可） |

## 活用シーン

### スコープ別
- `machine`: 異なるリポジトリ間でAPI仕様確認
- `repo`: フロント・バック分担作業で変更内容や競合確認
- `directory`: 同一ディレクトリで異なるタスク並行処理

### 具体例
- リポジトリ横断トラブルシューティング（別リポジトリのセッションに調査依頼→環境変数管理やProvider構成のパターンをフィードバック）
- 記事の相互レビュー（関連リポジトリのセッションに技術記事レビュー依頼→正確性検証と改善点フィードバック）
- マルチプロジェクト開発の効率化

## セキュリティ注意点

- コード規模: 約1,200行・依存パッケージは公式MCP SDKのみ → 全体を読み通せる
- **認証なし**: localhost上の任意プロセスがピアになりすまし可能。メッセージバリデーション不在でプロンプトインジェクション経路になりうる
- **--dangerously-skip-permissions併用リスク**: メッセージ受信→自動応答→承認なしでファイル操作やコマンド実行が実行される可能性
- **API情報送信**: 自動サマリー有効時に作業パス・ブランチ名・ファイル名がOpenAI APIに送信
- **総合判断**: 個人の開発マシンで使う分には十分許容範囲。共有サーバー/チーム環境には不適切
- PRで改善が進行中（クロスマシン対応・Windows対応等）

## 関連ツール

- Calyx（macOS 26+）: ネイティブターミナルアプリケーション。Claude Code・Codex間の連携に対応予定
