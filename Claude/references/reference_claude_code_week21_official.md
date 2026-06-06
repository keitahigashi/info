---
name: "Week 21 · 2026年5月18日～22日 - Claude Code 公式週次ダイジェスト"
description: Pro プランで Auto mode が利用可能に、/usage でコスト内訳確認、/code-review コマンド追加など（v2.1.143〜v2.1.149）
type: reference
---

## 出典

Claude Code 公式ドキュメント: https://code.claude.com/docs/ja/whats-new/2026-w21

## Week 21 主要機能（2026年5月18日〜22日）

### Pro プランでの Auto mode（CLI）

Auto mode が Pro プランで利用可能になり、Opus と並んで Sonnet 4.6 もサポート。権限プロンプトをバックグラウンド安全チェックに置き換える。

- **通常アクション**: 中断なく実行
- **破壊的・疑わしいアクション**: ブロックして表示

```bash
claude update       # まず最新版に更新
# Shift+Tab でモードを切り替え → auto mode が表示される
```

### その他の改善

| 機能 | 概要 |
|------|------|
| `/usage` | スキル・サブエージェント・プラグイン・MCP サーバーごとにプラン制限の内訳を表示 |
| 名称変更 | 「Extra usage」→「usage credits」、`/extra-usage` → `/usage-credits`（旧名も動作継続） |
| `/code-review` | 選択したエフォートレベルで正確性バグを報告。`--comment` で GitHub PR インラインコメントとして投稿 |
| バックグラウンドセッション | `/resume` にインタラクティブセッションと並んで表示、`bg` でマーク |
| `claude agents --json` | ライブセッションを JSON 形式で一覧（スクリプティング向け） |
| PowerShell ツール | Windows の Bedrock/Vertex/Foundry でデフォルト有効 |
| プラグイン依存チェック | `claude plugin disable` は依存する他プラグインがある場合に拒否 |
| マーケットプレイス強化 | コンテキストコスト予測表示、コマンド・エージェント・スキルをインストール前に確認 |
| `worktree.bgIsolation: "none"` | バックグラウンドセッションが worktree 不使用で作業コピーを直接編集 |
| GFM タスクリスト | Markdown でチェックボックスをレンダリング |
| Enterprise | `allowAllClaudeAiMcps` で claude.ai クラウド MCP コネクタを読み込み |

## `/code-review` の使い方

```text
> /code-review         # デフォルトエフォート
> /code-review high    # 高精度レビュー
> /code-review --comment  # GitHub PR インラインコメントとして投稿
```

`/simplify` は引き続きリファクタリング専用のクリーンアップレビューとして分離されている。

<!-- 日常で得た知見をここに追記 -->
