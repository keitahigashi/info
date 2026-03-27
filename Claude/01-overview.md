# 全体像・機能マップ

## Claude Code とは

Anthropic公式のCLIツール。ターミナル上でClaudeと対話しながらコード読み書き・実行・Git操作・外部連携を行える。

## 機能マップ

```
Claude Code
├── 基本操作
│   ├── 対話モード（インタラクティブ）
│   ├── 非対話モード（--print / パイプ）
│   └── セッション管理（再開・フォーク・名前付け）
│
├── 設定・構成
│   ├── CLAUDE.md（グローバル / プロジェクト / ローカル）
│   ├── settings.json（権限・モデル・フック等）
│   ├── keybindings.json（キーバインド）
│   └── .claudeignore（除外パターン）
│
├── ワークフロー
│   ├── 権限モード（default / acceptEdits / plan / auto / dontAsk / bypass）
│   ├── Planモード（読み取り専用で計画）
│   ├── Fastモード（高速・低コスト）
│   ├── サブエージェント（並列・委譲）
│   └── タスク管理（TaskCreate / TaskUpdate等）
│
├── ツール
│   ├── ファイル操作（Read / Write / Edit / Glob / Grep）
│   ├── 実行（Bash / WebFetch / WebSearch / Chrome）
│   └── メタ（Agent / Skill / EnterPlanMode等）
│
├── 拡張
│   ├── MCP（外部ツール・DB・API接続）
│   ├── フック（21種類のライフサイクルイベント）
│   ├── カスタムスキル（.claude/skills/）
│   ├── プラグイン（Skills + Hooks + MCP パッケージ）
│   └── カスタムエージェント（.claude/agents/）
│
├── IDE連携
│   ├── VS Code拡張
│   ├── JetBrains連携
│   └── リモート開発（WSL / SSH）
│
└── CI/CD・自動化
    ├── GitHub Actions連携
    ├── GitLab CI連携
    ├── Slack連携
    └── /loop による定期実行
```

## ユースケース別おすすめ構成

| 用途 | 推奨モード | キースキル | 備考 |
|------|----------|----------|------|
| 初期学習・探索 | `default` | `/plan` | 全操作確認しながら学ぶ |
| コード確認＆反復修正 | `acceptEdits` | `/simplify` | 編集は自動、Bashのみ確認 |
| 大規模リファクタ | `plan` → `acceptEdits` | `/batch`, サブエージェント | 計画→実行の2段階 |
| バグ調査 | `auto` or `default` | サブエージェント | 並列調査で効率化 |
| CI/CD | `dontAsk` | カスタムスキル | ホワイトリスト限定 |

---

## 実践メモ

### Computer Use・Dispatch（自動収集 2026-03-26）

ClaudeがPC操作（アプリ起動・ブラウザ操作・スプレッドシート入力）を行う新機能。Mac版から研究プレビュー提供（Pro/Maxプラン）。スマート接続でSlack・Gmail・Googleカレンダー等のコネクターを優先使用し、必要に応じて画面を直接操作する。Dispatch機能でスマホからPC操作を指示可能。対応アプリはClaude CodeとClaude Cowork。

> 詳細: メモリ内 `reference_claude_computer_use.md` を参照

### Computer Use実例 — スマホからPC操作（自動収集 2026-03-27）

スマホからPCに「スライド作成→カレンダー登録」「開発サーバー起動→スクリーンショット送信」「画像1200px一括変換+ロゴ追加」等を依頼可能。連携アプリ（Slack・Google等）を優先し、非接続時のみ画面操作にフォールバック。現時点でMac + Pro/Maxプラン + 研究プレビュー。

> 詳細: メモリ内 `reference_claude_computer_use_gizmodo.md` を参照

### Claude Code始め方・できること 2026年版（自動収集 2026-03-27）

SWE-bench Verified 80.9%のコーディング能力に加え、ライティング・データ分析・ファイル管理・業務自動化にも対応。2026年新機能としてボイスモード（20言語）、/loop、100万トークンコンテキスト、MCP Elicitation、Coworkアプリを追加。競合比較: ChatGPTはUI・マルチモーダル、Gemini CLIは無料枠・Google連携が強み。

> 詳細: メモリ内 `reference_claude_code_beginner_guide_2026.md` を参照

### Claude Code vs Copilot vs Cursor 競合比較（自動収集 2026-03-27）

Claude Codeはエージェント型（ゴール提示→計画→自律実行）で大規模変更・15ファイル横断リファクタリングに強い。GitHub Copilotはリアルタイム補完特化（$10〜/月）、CursorはAI搭載IDE・初心者向けUI、OpenAI Codexはクラウドサンドボックス実行。推奨使い分け: 日常補完→Copilot/Cursor、大規模変更・デプロイ自動化→Claude Code。2026年3月時点でOpus 4/4.1→4.6自動移行、レガシーSDK→新SDK移行必須。

> 詳細: メモリ内 `reference_claude_code_vs_copilot_cursor.md` を参照

<!-- 日常で得た知見をここに追記 -->
