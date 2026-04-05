# コマンド・スラッシュコマンド一覧

## CLIコマンド（起動・管理）

| コマンド | 用途 |
|---------|------|
| `claude` | インタラクティブセッション開始 |
| `claude "query"` | 初期プロンプト付きで開始 |
| `claude -p "query"` | 非対話モード（結果出力して終了） |
| `cat file \| claude -p "query"` | パイプ入力＋非対話 |
| `claude -c` | 直近セッション再開 |
| `claude -r "name"` | 名前指定でセッション再開 |
| `claude -w feature-name` | Gitワークツリー内で開始 |
| `claude update` | 最新版へ更新 |
| `claude auth login/logout/status` | 認証管理 |
| `claude agents` | サブエージェント一覧 |
| `claude mcp` | MCPサーバー設定 |

## 主要CLIフラグ

### セッション制御
| フラグ | 説明 |
|--------|------|
| `--name`, `-n` | セッション名設定 |
| `--continue`, `-c` | 最新セッション再開 |
| `--resume`, `-r` | 指定セッション再開 |
| `--fork-session` | 新規IDで再開（分岐） |

### 実行モード
| フラグ | 説明 |
|--------|------|
| `--print`, `-p` | 非インタラクティブ出力 |
| `--bare` | 最小化モード（高速起動） |
| `--permission-mode` | 権限モード指定 |

### ツール・ディレクトリ制御
| フラグ | 説明 |
|--------|------|
| `--add-dir` | 追加作業ディレクトリ |
| `--tools` | 使用可能ツール限定 |
| `--allowedTools` | 権限確認なしツール指定 |
| `--disallowedTools` | ツール無効化 |

### 出力・フォーマット
| フラグ | 説明 |
|--------|------|
| `--output-format` | `text` / `json` / `stream-json` |
| `--input-format` | 入力フォーマット指定 |
| `--verbose` | 詳細ログ出力 |

### モデル・コスト制御
| フラグ | 説明 |
|--------|------|
| `--model` | モデル指定（sonnet / opus / haiku） |
| `--effort` | 推論レベル（high / low） |
| `--max-turns` | 最大ターン数制限 |
| `--max-budget-usd` | 最大予算指定 |

### MCP・システムプロンプト
| フラグ | 説明 |
|--------|------|
| `--mcp-config` | MCP設定ファイル読込 |
| `--system-prompt` | システムプロンプト全置換 |
| `--append-system-prompt` | システムプロンプト追加 |

---

## スラッシュコマンド（セッション内）

### セッション管理
| コマンド | 機能 |
|---------|------|
| `/clear` | 会話リセット |
| `/compact` | コンテキスト圧縮（会話を要約） |
| `/resume` | 保存済みセッション再開 |
| `/rename` | セッション名変更 |
| `/reset` | 完全リセット（権限・フック含む） |

### 設定・表示
| コマンド | 機能 |
|---------|------|
| `/config` | 設定メニュー（権限・モデル・テーマ・Output Style） |
| `/model` | モデル切替（opus / sonnet / haiku / opusplan） |
| `/fast` | Fastモード切替（同じOpus 4.6を2.5倍高速、コスト2倍） |
| `/context` | コンテキスト使用量をカラーグリッドで可視化 |
| `/diff` | Git差分のインタラクティブ閲覧（←→でターン別、↑↓でファイル間） |
| `/export` | 会話をファイル/クリップボードに書き出し |
| `/copy` | 最後の回答をクリップボードにコピー |
| `/memory` | CLAUDE.md・メモリ編集 |
| `/permissions` | 権限ルール管理・棚卸し |
| `/hooks` | フック設定 |
| `/cost` | トークン使用量・費用表示 |
| `/doctor` | 診断ツール |
| `/theme` | カラーテーマ変更 |
| `/statusline` | ステータスライン設定 |
| `/keybindings` | キーバインド編集 |
| `/vim` | Vimモード切替 |
| `/chrome` | Chrome連携の有効化・再接続 |

### ワークフロー
| コマンド | 機能 |
|---------|------|
| `/plan` | 1回限りのPlanモード実行 |
| `/agents` | サブエージェント管理 |
| `/skills` | スキル一覧 |
| `/mcp` | MCPサーバー管理 |
| `/plugin` | プラグイン管理 |
| `/btw` | 副問い合わせ（会話履歴に残さない） |

### 組み込みスキル
| コマンド | 機能 |
|---------|------|
| `/simplify` | 3エージェント並列で品質レビュー（再利用・品質・効率性）。引数で観点指定可 |
| `/batch` | 大規模変更を5〜30のworktreeで並列実行。コード調査→分解→承認→実装→PR |
| `/loop 5m <prompt>` | 定期実行（5m/2h/1d等）。最大3日で自動期限切れ。自然言語リマインダーも可 |
| `/claude-api` | Claude API開発サポート |

### 隠れた便利機能

| 機能 | 使い方 | 説明 |
|------|--------|------|
| `ultrathink` | プロンプト内に記述 | そのターンだけ`effort=high`を発動（Opus/Sonnet限定） |
| `!` プレフィックス | `! npm test` | Claudeを経由せずBash直接実行。出力は会話に追加 |
| `opusplan` | `/model opusplan` | Plan=Opus、実行=Sonnetの自動切替（高品質設計×低コスト実装） |
| `@` ファイル参照 | `@src/index.ts` | ファイル/フォルダ/URLをコンテキストに直接渡す |
| Output Styles | `/config` → Output style | Default/Explanatory/Learning/カスタムで応答スタイルを変更 |

---

## キーボードショートカット

### 全般制御
| ショートカット | 機能 |
|---------------|------|
| `Ctrl+C` | キャンセル・中断 |
| `Ctrl+D` | セッション終了 |
| `Ctrl+G` | 外部エディタで編集 |
| `Ctrl+L` | 画面クリア |
| `Ctrl+B` | 背景実行に移行 |
| `Ctrl+T` | タスクリスト表示/非表示 |
| `Shift+Tab` | 権限モード循環 |
| `Esc+Esc` | チェックポイント（巻き戻し・要約） |
| `Alt+P` | モデル切り替え |

### マルチライン入力
| 方法 | キー |
|------|------|
| エスケープ方式 | `\` + `Enter` |
| Shift方式（推奨） | `Shift+Enter` |
| 制御文字 | `Ctrl+J` |

---

## 構造化出力（CI/CD向け）

```bash
# JSON Schemaに従った構造化出力
claude -p --json-schema '{"type":"object","properties":{"bugs":{"type":"array"}}}' "バグを分析"

# ストリーミングJSON
cat log.txt | claude -p --output-format stream-json

# 予算上限 + ターン数制限 + フォールバック
claude -p --max-budget-usd 5.00 --max-turns 3 --fallback-model sonnet "分析して"
```

---

## 実践メモ

- 出典: [Claude Code 知らないと損するコマンド・時短術 20選](https://qiita.com/miruky/items/48ede59ebe33b4b774ac) (@miruky, 2026-03-16)
- 出典: [ClaudeCodeの中級者になりたい人は集合してください](https://qiita.com/K5K/items/72cc4282819ace823524) (@K5K, 2026-03-13)
### v2.1.81 新フラグ（自動収集 2026-03-26）

- `--bare`: スクリプト実行時のオーバーヘッドを軽量化。CI/CDや自動化スクリプトでの起動が高速に
- `--channels`: モバイルデバイス経由での権限承認を可能にする。多様なデバイスからのアクセスに対応
- OAuth関連の安定性も向上し、外部サービス連携の信頼性が強化

> 詳細: メモリ内 `reference_claude_code_2_1_81.md` を参照

### v2.1.74〜v2.1.84 コマンド・機能追加（自動収集 2026-03-27）

- `/remote-control`: セッションをブリッジ化しclaude.ai/codeやiOSアプリから遠隔操作。Permission Relayでスマホからツール承認
- `Ctrl+O`→`/`: Transcript Search（会話ログ検索）。`n/N`でマッチ箇所前後移動
- `--bare`: フック・LSP・プラグイン同期スキップ。CI/CD・スクリプト実行時の起動高速化
- 出力トークン: デフォルト64k、上限128k。トークン表示は1M以上「1.5m」形式に変更
- Hooks新規イベント: PostCompact, TaskCreated, StopFailure, CwdChanged, FileChanged, Elicitation/ElicitationResult

> 詳細: メモリ内 `reference_claude_code_v2174_v2184.md` を参照

### Claude Code追加機能タイムライン 2025/07〜2026/03（自動収集 2026-03-30）
半年間の全機能追加を月別に網羅。主要マイルストーン: 2025/07 Subagents・Plan Mode、2025/10 Background Tasks (Ctrl+B)・PermissionRequest Hook、2025/12 /loop・/voice・Remote Control、2026/01 v2.1.0 (1096コミット)・/doctor・Instant Compact・/branch、2026/02 Agent Teams・Auto Memory・/batch・HTTP Hooks・Opus 4.6デフォルト化(ultrathink)、2026/03 /btw(トークン最大50%削減)・Native Plugins・/effort・MCP Elicitation・Channels・--bare。
> 詳細: メモリ内 `reference_claude_code_feature_timeline.md` を参照

### Claude Code Cheat Sheet — 毎日自動更新リファレンス（自動収集 2026-04-01）
全機能を1ページにまとめた包括的チートシート（https://cc.storyfox.cz/）。毎日CHANGELOGをチェックし新機能に「NEW」バッジ付与。ショートカット・スラッシュコマンド・CLIフラグ・MCP・Skills・Agents・環境変数をカバー。単一HTML・軽量・印刷可能（A4横向き）。Hacker Newsで高評価。
> 詳細: メモリ内 `reference_claude_code_cheatsheet_storyfox.md` を参照

### Claude Code完全リファレンス — 便利機能トップ10（自動収集 2026-04-04）
便利機能トップ10: /btw（サイドクエスチョン）、Ctrl+S（下書き保存）、#テキスト（auto-memory）、/loop（定期実行）、!コマンド（シェル直接）、Ctrl+B（バックグラウンド）、--bare（軽量起動）、/rewind（巻き戻し）、Ctrl+G（エディタ編集）、スパースworktree。
PR作成前品質ゲート: /simplify→/security-review→/diff→/commit-push-pr。
> 詳細: references/reference_claude_code_complete_reference_nogataka.md を参照

### 必須コマンド＆スキル完全ガイド2026（自動収集 2026-04-06）
自動化コマンド群: `/batch`（50ファイル同時変更・5〜30独立タスク並列処理、git worktree上実行）、`/loop`（定期監視、デフォルト10分・3日後自動終了）、`/btw`（会話汚染なし質問、プロンプトキャッシュ再利用でトークン削減）、`/rc`（スマホからリアルタイム操作）。
コード品質: `/simplify`（v2.1.63追加、3サブエージェント並列で再利用性・可読性・パフォーマンス個別検査）。
スキル vs コマンド: スラッシュコマンドはハードコード固定処理、スキルはMarkdownベースプロンプト（AI推論で並列エージェント生成可能）。
> 詳細: references/reference_claude_code_commands_skills_complete.md を参照

<!-- 日常で得た知見をここに追記 -->
