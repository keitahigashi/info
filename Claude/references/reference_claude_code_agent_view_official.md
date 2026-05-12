---
name: Agent view in Claude Code
description: Anthropic公式ブログ：Claude Codeの複数エージェントセッションを1画面で管理する「Agent View」機能の正式発表（2026年5月11日）
type: reference
---

## 出典

Anthropic Blog: https://claude.com/blog/agent-view-in-claude-code

## Agent view in Claude Code

### 概要

2026年5月11日、AnthropicはClaude Codeに「agent view」機能をリリース（Research Preview）。
複数のClaudeエージェントセッションを1か所で管理・監視・操作できるCLIダッシュボード。

### 起動方法

```bash
claude agents          # Agent Viewを起動
claude --bg [task]     # 新規セッションをバックグラウンドで起動
/bg                    # 既存セッションをバックグラウンド化
```

### 主な機能

| 機能 | 説明 |
|------|------|
| セッション一覧表示 | 進行中・入力待ち・完了済みを1画面で表示 |
| インライン返答 | 「入力待ち」セッションに画面を離れずに返答 |
| バックグラウンド管理 | `/bg`コマンドで既存セッションをバックグラウンドへ |
| プレビュー | セッション選択で最後のやり取りをインライン確認 |

### 各行の表示内容

- セッション状態（実行中 / 入力待ち / 完了）
- 最新レスポンスの要約
- 最後の操作時刻

### 対応プラン

Pro、Max、Team、Enterprise、Claude API（全有料プラン）

### 同時リリースの関連機能

- `/goal`コマンド：完了条件達成まで自律継続
- MCPサーバー並列接続：外部ツール連携の高速化
- 必須バージョン：v2.1.139以上
