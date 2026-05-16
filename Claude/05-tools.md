# 組み込みツールの使い分け

## 目次

- [ファイル操作](#ファイル操作)
- [実行・検索](#実行検索)
- [メタツール](#メタツール)
- [ツール選択の失敗パターン](#ツール選択の失敗パターン)
- [実践メモ](#実践メモ)

---

## ファイル操作

| ツール | 用途 | 権限 | ポイント |
|--------|------|------|---------|
| **Read** | ファイル読み取り | 不要 | `offset`/`limit`で部分読込可。画像・PDF・ipynbも対応 |
| **Write** | ファイル作成・全上書き | 必要 | 新規作成向き。既存ファイルはEditを優先 |
| **Edit** | ファイルの部分編集 | 必要 | 差分方式。既存ファイルの変更はこれが第一選択 |
| **Glob** | パターンでファイル検索 | 不要 | `**/*.ts`等。findコマンドの代替 |
| **Grep** | ファイル内容の正規表現検索 | 不要 | ripgrep準拠。`glob`/`type`でフィルタ可能 |
| **NotebookEdit** | Jupyter notebookセル編集 | 必要 | セルの追加・削除・編集 |

### Read のコツ

```
Read("path/to/file.ts")                         # 全行読込（2000行まで）
Read("path/to/large.log", offset=100, limit=50) # 行100-150を読込
Read("path/to/image.png")                       # 画像を視覚的に認識
Read("path/to/doc.pdf", pages="1-5")            # PDF特定ページ
```

### Edit vs Write

- **既存ファイルの部分修正** → Edit（差分のみ送信、コンテキスト効率が良い）
- **新規ファイル作成** → Write
- **ファイル全体の大幅書き換え** → Write（Readで先に読んでから）

### Grep のコツ

```
output_mode: "files_with_matches"  # ファイルパスのみ（デフォルト）
output_mode: "content"             # マッチ行を表示（-A/-B/-Cで前後行も）
output_mode: "count"               # マッチ数

glob: "*.ts"                       # TypeScriptファイルのみ
type: "py"                         # Pythonファイルのみ
head_limit: 10                     # 結果を10件に制限
multiline: true                    # 複数行パターン
```

---

## 実行・検索

| ツール | 用途 | 権限 | ポイント |
|--------|------|------|---------|
| **Bash** | シェルコマンド実行 | 必要 | 各実行は独立プロセス。作業ディレクトリは保持 |
| **WebFetch** | URL内容取得 | 必要 | 認証URLは不可。HTML→テキスト変換 |
| **WebSearch** | Web検索 | 必要 | キーワード＋年号を明示するとよい |
| **Chrome** | ブラウザ自動化 | 必要 | クリック・入力・スクリーンショット |

### Bash の注意

- 環境変数はセッション間で引き継がれない（SessionStartフックでexport）
- タイムアウト: デフォルト2分、最大10分（`timeout`パラメータ）
- `run_in_background: true` でバックグラウンド実行可
- `Ctrl+B` でフォアグラウンド→バックグラウンド移行

---

## メタツール

| ツール | 用途 |
|--------|------|
| **Agent** | サブエージェント起動（並列・委譲） |
| **Skill** | カスタムスキル実行 |
| **EnterPlanMode / ExitPlanMode** | Planモード制御 |
| **EnterWorktree / ExitWorktree** | Gitワークツリー制御 |
| **AskUserQuestion** | ユーザーへの質問（選択肢付き） |
| **ToolSearch** | MCPツールの動的検索・読み込み |
| **TaskCreate / TaskUpdate / TaskList** | タスク管理 |
| **CronCreate / CronList / CronDelete** | 定期実行スケジュール |

---

## ツール選択の失敗パターン

| やりがち | 問題 | 正解 |
|---------|------|------|
| Bashで`cat`/`grep`/`find` | 専用ツールより遅い・不便 | Read / Grep / Glob を使う |
| Readで巨大ファイル全読込 | コンテキスト浪費 | `limit`+`offset`で部分読込 |
| Grepで正規表現が雑 | 大量ヒットで処理重い | `glob`で絞り、`head_limit`設定 |
| WebFetchで認証ページ取得 | エラーで時間浪費 | 専用CLIツール（gh等）を使う |

---

## 実践メモ

### インタラクティブダイアグラム（自動収集 2026-03-26）

claude.aiでチャット内に直接インタラクティブなチャート・ダイアグラムを生成できる新機能（ベータ版）。生成された図のトピックをクリックすると追加情報とともに新しい図を生成。SVGエクスポート・クリップボードコピー対応。無料プランを含む全プランで利用可能。

> 詳細: メモリ内 `reference_claude_interactive_diagrams.md` を参照

### Code Review機能のコスト実測と運用戦略（自動収集 2026-03-29）
Claude Code新機能「Code Review」の実測レポート。マネージド版は70行Markdown差分で$31.54（30分）、大規模Goコードで$77.96（47分）と公式記載（$15〜25）を大幅超過。プラグイン版（`/code-review:code-review`）は5エージェント並列で$0追加・4分で完了。REVIEW.mdでレビュー項目・言語カスタマイズ可能。プラグイン版メイン運用が現実的。
> 詳細: メモリ内 `reference_claude_code_review_cost.md` を参照

### Claude Design — 対話型AIデザインツール（自動収集 2026-04-20）
2026年4月17日リリース、Opus 4.7搭載。テキスト指示でプロトタイプ・スライド・マーケティング素材を生成。PDF/PPTX/HTML/Canva/Claude Code連携で出力。Pro以上で利用可、独立した利用枠。Figma（精密制御）やCanva（仕上げ）との補完関係。非デザイナー向けの設計→実装自動化が差別化ポイント。
> 詳細: メモリ内 reference_claude_design_guide.md を参照

### /ultrareview — クラウド型マルチエージェントによる深層コードレビュー（自動収集 2026-05-01）

Claude Code v2.1.86で追加。クラウドサンドボックスで複数エージェントが並列実行し、マージ前のブランチ・PRのバグを深層検出する。全findingsは独立再現・検証済み（スタイル提案は除外）。

**実行方法**: `/ultrareview`（ブランチ全体）/ `/ultrareview 1234`（PR番号指定）  
**所要時間**: 10〜20分（バックグラウンド動作可）  
**料金**: Pro/Maxは2026年5月5日まで3回無料（ワンタイム）、以降$5〜$20/回  
**制限事項**: Claude.aiアカウント必須・Bedrock/Vertex/Foundry経由不可・ZDR有効組織不可

**使い分け**: `/review`（日常・ローカル・無料）→ `/ultrareview`（本番マージ直前・クラウド・有料）

無料3回の優先使用先: 認証ロジック・決済処理・DBマイグレーション・並行処理リファクタ

> 詳細: references/reference_claude_code_ultrareview_zenn.md, reference_claude_code_ultrareview_weel.md, reference_claude_code_ultraplan_ultrareview_qiita.md を参照

<!-- 日常で得た知見をここに追記 -->
