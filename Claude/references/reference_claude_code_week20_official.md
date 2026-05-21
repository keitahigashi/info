---
name: "Week 20 · 2026年5月11日～15日 - Claude Code 公式週次ダイジェスト"
description: エージェントビュー（claude agents コマンド）、/goal コマンド、Fast Mode の Opus 4.7 デフォルト化など週次の主要新機能まとめ（v2.1.139〜v2.1.142）
type: reference
---

## 出典

Claude Code 公式ドキュメント: https://code.claude.com/docs/ja/whats-new/2026-w20

## Week 20 主要機能（2026年5月11日〜15日）

### エージェントビュー（research preview）

`claude agents` コマンドで全 Claude Code セッションを1画面で管理できるダッシュボードが登場。

```bash
claude agents
```

- **実行中・待機中・完了**のセッションを一覧表示
- 複数のバックグラウンドセッション（バグ修正・PRレビュー・テスト調査など）を並列起動し、必要な時だけ介入
- 任意のセッションに接続して全会話を確認、`←` でリストに戻る
- 各バックグラウンドセッションはターミナル接続なしで実行継続

**ディスパッチフラグ対応:**
```bash
claude agents --cwd <path>          # セッションリストをディレクトリにスコープ
claude agents --model claude-opus-4-7
claude agents --effort xhigh
claude agents --permission-mode auto
```

### /goal コマンド（v2.1.139）

完了条件を設定すると、Claude が複数ターンにわたり自律的に作業し続ける。

```
> /goal all tests in test/auth pass and the lint step is clean
```

- 各ターン後に高速モデルが条件を評価 → 未達成なら次のターンを開始
- モジュール移行・テスト全通過など「検証可能な終了状態」を持つ作業に最適
- 条件達成でゴールは自動クリア
- インタラクティブ、`-p`、リモートコントロールで動作

### Fast Mode が Opus 4.7 にデフォルト移行（research preview）

`/fast` は Opus 4.6 ではなく Opus 4.7 でデフォルト実行されるようになった。

- Opus 4.7 Fast は約 2.5 倍高速（同モデル品質で）
- 価格は Opus 4.6 Fast と同じ $30/$150 per MTok
- Opus 4.6 に固定する場合: `CLAUDE_CODE_OPUS_4_6_FAST_MODE_OVERRIDE=1`

```
> /fast   # Opus 4.7 Fast 1M に切り替え
```

## その他の改善（v2.1.139〜v2.1.142）

| 機能 | 詳細 |
|------|------|
| Hooks の `args: string[]` exec フォーム | シェルなしでコマンドを直接生成、パスプレースホルダーに引用符不要 |
| `continueOnBlock`（PostToolUse フック） | フック拒否理由を Claude にフィードバックしターン継続 |
| `terminalSequence` フィールド | フックがデスクトップ通知・ウィンドウタイトル・ベルを発行可能 |
| Rewind「ここまで要約」 | 最近のターンを保持しながら以前のコンテキストを圧縮 |
| API キー設定時の機能制限 | リモートコントロール・`/schedule`・Claude.ai MCP コネクタ等は ANTHROPIC_API_KEY 設定時に無効化 |
| MCP stdio が `CLAUDE_PROJECT_DIR` 受信 | フックと整合、プラグイン設定で `${CLAUDE_PROJECT_DIR}` を参照可能 |
| `claude plugin details <name>` | プラグインのコンポーネントインベントリとトークンコスト予測を表示 |
| ルートレベル `SKILL.md` のプラグイン | `skills/` サブディレクトリなしでスキルとして認識 |
| `subagent_type` の大文字小文字無視 | `"Code Reviewer"` → `code-reviewer` に自動解決 |
