# ハマりどころと対処法

## コンテキスト枯渇

### サイン
- 回答が短くなる・雑になる
- 計算ミスが増える
- 以前の指示を忘れる

### 対策
1. `/compact` でコンテキスト圧縮
2. サブエージェントに残りタスクを委譲
3. 大きなファイルの全読込をやめる（部分読込に切替）
4. 「ここで区切ります」と正直に中断宣言

### 予防
- タスク開始前にステップ数を見積もる
- 3ステップ以上ならPlanモードで先に全体像を固める
- 調査・リサーチはサブエージェントに任せる

---

## 権限の問題

### よくあるエラー
- `Permission denied: Bash(docker *)` → 権限がない
- `Cannot write to file` → ファイルロック・権限不足

### 対策
- `settings.json` の `permissions` セクションで `allow` / `ask` を調整
- `Shift+Tab` で権限モードを切り替え
- Linux権限問題 → WSL環境の確認

### 予防
- 新しいツール（docker, ssh等）を使う前に権限設定を確認
- 破壊的操作は `ask` リストに入れておく

---

## ツール選択の失敗

| やりがち | 対策 |
|---------|------|
| Bashで`cat`/`grep`/`find` | Read / Grep / Glob を使う |
| Readで巨大ファイル全読込 | `limit`+`offset`で部分読込 |
| Grepで正規表現が雑→大量ヒット | `glob`で絞り、`head_limit`設定 |
| WebFetchで認証ページ取得 | 専用CLIツール（gh等）を使う |
| WebSearchでクエリが曖昧 | キーワード＋年号を明示 |

---

## パフォーマンス

### Claude Codeの応答が遅い
- ファイル数が多すぎないか確認（数千ファイルで重くなる）
- `node_modules`等を `.claudeignore` に追加
- `--bare` フラグで高速起動

### ビルド・テストが遅い
- テスト並列実行を有効化
- ファイル変更検知の範囲を絞る

### Git操作が遅い
- 大きなリポジトリは shallow clone
- `.gitignore` を確認（大量の未追跡ファイルがないか）

---

## よくある落とし穴

### Bashの環境変数が引き継がれない
各Bash実行は独立プロセス。セッション全体で必要な変数は `SessionStart` フックで `export` する。

### /compact後に文脈が失われる
圧縮後は背景コンテキストが消えるため、次の指示で「前提は変わらない」と再度簡潔に述べる。

### サブエージェントの結果がユーザーに見えない
Agentツールの結果はユーザーに直接表示されない。メインが要約して伝える必要がある。

### 既存ファイルの読み忘れ
Editツールは事前にReadしていないとエラーになる。変更前に必ず現状を確認する。

---

## 実践メモ

### トークン消費バグ7件の実測分析（自動収集 2026-04-09）
修正済み3件: Sentinel（キャッシュプレフィックス破壊→v2.1.88修正）、Resume（`--resume`キャッシュ破壊→v2.1.89修正）、Cache invalidation（ターン毎キャッシュ無効化→4/4修正）。未修正4件（v2.1.92時点）: Microcompact（30ターン超でツール結果消去）、Budget cap（200K上限で結果切り詰め）、False rate limit（並行サブエージェントで偽カウント）、Log inflation（`/cost`表示が実測の約2倍）。対処法: 最新版更新、`--resume`回避、30ターン上限リセット、offset/limit活用、`/cost`値÷2が実測値。
> 詳細: references/reference_claude_code_token_bugs_7.md を参照

### Opus 4.7移行時の破壊的変更と400回避チェックリスト（自動収集 2026-04-24）
400エラーになる3件: ①`thinking.budget_tokens`固定値→Adaptive Thinking（`thinking: {type: "adaptive"}`）へ移行必須、②`temperature`/`top_p`/`top_k`のデフォルト外値が400に、③`assistant`メッセージのprefill禁止。静かな変更: thinking表示デフォルト変更・より文字通りの解釈・応答長の可変化。コスト影響: 新トークナイザーで最大+35%増・高解像度画像は最大4,784tokens/枚。8項目チェックリスト: temperature削除→adaptive thinking切替→effort設定→prefill撤去→max_tokens確認→画像コスト試算→LLM呼び出しアダプタ化→ゴールデンセット整備。
> 詳細: references/reference_opus_47_breaking_changes_checklist.md を参照

### Opus 4.7移行の実務落とし穴8ポイント（GMO初日レポート）（自動収集 2026-04-25）
「モデル名差し替えだけ」では危険な理由: ①曖昧な指示が文字通り解釈されプロンプト動作変更、②`temperature`/`top_p`/`top_k`非デフォルト値が400エラー化、③`assistant prefill`が使用不可（400エラー）、④固定`thinking budget`廃止（adaptive thinkingへ移行）、⑤新トークナイザーで同一入力が1.0〜1.35倍に増加。Effort設定指針: coding/agenticは`xhigh`から開始、知能重視は`high`以上、単発Q&Aは`medium`。Notion事例: ツールエラーが1/3に削減・複雑ワークフローで14%改善。初日は本番直入れを避け、stagingで1〜2日の回帰テストを推奨。
> 詳細: references/reference_claude_opus47_gmo_migration.md を参照

### Opus 4.7移行実録：AI-Bridge Lab が感じた3つの進化と注意点（自動収集 2026-04-26）
Opus 4.6実務ユーザーによる移行レポート（2026-04-22）。**3つの進化**: ①指示追従・日本語実務対応力向上（曖昧指示の文字通り解釈は両面あり）②複雑意思決定での構造把握強化（長文コンテキスト検索はやや低下）③コーディング・デザイン品質改善。**移行時の落とし穴**: トークンコスト最大35%増・API互換性3件（`temperature`等400エラー・`prefill`廃止・thinking budget廃止）・4.6向けプロンプトが逆効果になるケース。**移行推奨**: coding/agenticタスク主体・日本語精度重視・staging検証可能な場合。**様子見推奨**: APIプロンプト固定済み・コスト増許容不可・本番即日投入必要な場合。
> 詳細: references/reference_claude_opus_47_aibridge_lab_review.md を参照

<!-- 日常で得た知見をここに追記 -->
