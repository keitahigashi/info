# ワークフロー・モード活用

## Planモード

**目的**: 実装前に方針を固め、手戻りを防ぐ。ファイル読み取り・探索のみ可能で、コード編集は不可。

**起動方法**:
- 1回限り: `/plan` + プロンプト
- セッション全体: `Shift+Tab` → planモード、または `--permission-mode plan`

**活用場面**:
- 大規模リファクタの事前計画
- 未知のコードベースの理解
- 3ステップ以上のタスク開始時

**フロー**: Plan → 承認 → acceptEditsに切替 → 実装

---

## Fastモード

**目的**: 速度・コスト優先で処理。同じOpus 4.6モデルを高速出力で使用。

**切替**: `/fast` コマンド

**向いているタスク**: 定型的な変更、簡単なバグ検索、テスト生成、ドキュメント修正

**向いていないタスク**: 複雑な設計、セキュリティレビュー、新規アーキテクチャ

---

## サブエージェント

**目的**: 独立したコンテキストを持つClaudeインスタンスで、メインの文脈を温存しながら並列作業する。

### 使うべき場面

| 場面 | 理由 |
|------|------|
| 調査・リサーチ | メインのコンテキストを温存 |
| 独立した並列タスク | 時間短縮 |
| 試験的な修正（POC） | 失敗してもメインが汚れない |
| テスト・レビュー | 実装と検証を分離 |

### 1サブエージェント = 1タスクが鉄則

複数タスクを1つに詰め込まない。分業を明確にすると失敗リスクが下がる。

### 並列実行パターン

```
メイン：計画を立てる
  ↓（並列起動）
サブA：ファイルA実装
サブB：ファイルB実装
サブC：テスト追加
  ↓
メイン：結果を統合・確認
```

### カスタムエージェント定義

`.claude/agents/<name>.md` に配置:

```yaml
---
model: claude-sonnet-4-6
description: "コードレビュー専用"
tools: [Read, Grep, Glob]
permissions:
  mode: plan
---

コードレビューの指示をここに記述...
```

---

## Gitワークツリー

**目的**: ブランチを分離して並列にコード変更を行う。

```bash
claude -w feature-auth    # ワークツリー作成して開始
```

サブエージェントに `isolation: "worktree"` を指定しても利用可能。変更がなければ自動クリーンアップ。

---

## タスク管理

セッション内で進捗を追跡する仕組み。

| ツール | 機能 |
|--------|------|
| TaskCreate | タスク作成 |
| TaskList | 一覧表示 |
| TaskUpdate | ステータス更新（pending → in_progress → completed） |
| TaskStop | 背景タスク停止 |
| TaskOutput | 背景タスク出力取得 |

`Ctrl+T` でタスクリスト表示/非表示。

---

## チェックポイント（巻き戻し）

`Esc+Esc` で任意の地点に巻き戻し、またはそこまでを要約してコンテキストを節約できる。

**用途**: 誤った方向への修正をロールバック、コンテキスト節約

---

## コンテキスト圧縮

`/compact` で会話履歴を要約し、コンテキスト領域を確保する。

**使うべき時**: デバッグの往復が多い時、大きなファイルを読んだ後
**避けるべき時**: 設計・計画フェーズ（文脈を落とすと方向性がズレる）

`/compact` 後は「前提は変わらない」と明示して次の指示を出すと効率的。

---

---

## 実践例: Issue起票→並列開発→PR作成の全自動化

出典: [Claude Codeで「Issue起票→並列開発→PR作成」を全自動化したら、開発速度が異次元になった](https://qiita.com/kazuki_ogawa/items/c05c3aed3bf8e46a7ddb) (@kazuki_ogawa, 2026-03-15)

### 3つのSkillによるパイプライン

| Skill | 役割 |
|-------|------|
| `/issue-create` | 雑なメモを構造化GitHub Issueに変換 |
| `/dev-plan` | 複数Issueの依存関係を分析し、Wave（実行順序）構造を決定 |
| `/gtr-workflow` | git worktreeで隔離環境を作成し並列開発 |

**核となる思想**: 実行を自動化して、人間は要件定義（思考）に集中する。

### Wave構造による並列開発

依存関係に基づきIssueをWaveに分類:

| パターン | 判断 |
|---------|------|
| DBスキーマ変更 | 最初のWaveに配置 |
| UI基盤変更 | 早いWaveに配置 |
| 独立した機能 | 同じWaveに並列配置 |
| 明示的な依存 | 後のWaveに配置 |

```
Wave 1:       #30（共通基盤セットアップ）
Wave 2（2並列）: #31（メール通知）, #32（Slack通知）
Wave 3（5並列）: #33, #34, #35, #36, #38（各トリガー実装）
Wave 4（2並列）: #37（リアルタイムUI）, #39（統合テスト）
```

### git worktreeによる並列開発

ブランチごとに独立したディレクトリを作成し、ファイル競合を完全回避:

```
~/dev/myapp/                          ← 本体 (develop)
~/dev/myapp-worktrees/feature-auth/    ← worktree 1
~/dev/myapp-worktrees/feature-ui/      ← worktree 2
~/dev/myapp-worktrees/feature-api/     ← worktree 3
```

### .gtrconfig — worktreeの自動セットアップ

```ini
[copy]
include = .env*
include = CLAUDE.md

[hooks]
postCreate = npm install
```

### wt-dev — worktree開発サーバー起動ユーティリティ

```bash
wt-dev() {
  local name="${1//\//-}"
  local port="${2:-3001}"
  local dir="$HOME/dev/myapp-worktrees/$name"
  if [ ! -d "$dir" ]; then
    echo "worktree not found: $dir"
    return 1
  fi
  local url="https://localhost:$port"
  (cd "$dir" && npm install --silent && \
   PORT=$port BETTER_AUTH_URL=$url NEXT_PUBLIC_APP_URL=$url npm run dev)
}
```

複数ターミナルで並列にサーバー起動:
```
ターミナル 1: make dev             → :3000 (メイン)
ターミナル 2: wt-dev feature-auth  → :3001
ターミナル 3: wt-dev feature-ui    → :3002
```

---

## 実践メモ

### Autoモード（自動収集 2026-03-26）

リスク評価に基づく選別自動実行モード。安全な操作は自動実行し、リスクのある操作はブロック/代替/確認を行う。`--enable-auto-mode` で起動、`Shift+Tab` でモード切替。Team/Enterprise/APIプラン対応（リサーチプレビュー）。本番環境での使用は非推奨、サンドボックス環境推奨。

> 詳細: メモリ内 `reference_claude_code_auto_mode.md` を参照

### /loop・Voice mode（自動収集 2026-03-26）

- **/loop**: `/loop 5m <prompt>` で指定間隔の定期実行。デプロイ監視やPRチェックに活用
- **Voice mode**: スペースキー長押しで音声入力（Push-to-Talk方式）。STT 20言語対応
- **Cronスケジューリング**: CronCreateツールで柔軟なスケジュール設定

> 詳細: メモリ内 `reference_claude_code_9_features.md` を参照

### 2026年3月 主要変更点（自動収集 2026-03-26）

- Opus 4.6 デフォルトeffort設定が medium に変更
- プロンプトキャッシュ効率化（セッション再開時 約600トークン削減）
- VS Code内ネイティブMCP管理ダイアログ追加
- スキル自己参照変数 `${CLAUDE_SKILL_DIR}` 対応
- サブエージェントレポートの簡潔化
- REPLメモリリーク修正（約35MB蓄積問題解消）

> 詳細: メモリ内 `reference_claude_code_updates_2026.md` を参照

### v2.1.74〜v2.1.84 ワークフロー改善（自動収集 2026-03-27）

- **MCP Elicitation (v2.1.76)**: MCPサーバーがタスク中にユーザーへ構造化入力を要求。JSON Schemaで入力フォーム定義。用途: コミットメッセージ入力・実装戦略選択・認証情報入力・破壊的操作確認
- **Computer Use**: Pro/Maxプラン向けmacOSデスクトップ操作の自律実行（ファイル操作・クリック・スクリーンショット）
- **ワークツリーsparse-checkout (v2.1.76)**: `sparsePaths`で必要ディレクトリのみチェックアウト。大規模モノレポのディスク使用量削減
- **パフォーマンス**: 起動約90ms高速化、メモリ起動時約80MB削減、`--resume`で最大45%高速化

> 詳細: メモリ内 `reference_claude_code_v2174_v2184.md` を参照

### 公式推奨ワークフロー: 探索→計画→実装→コミット（自動収集 2026-03-29）
公式ベストプラクティスの4フェーズワークフロー。(1) Plan Modeで探索（変更なし）、(2) 計画作成→Ctrl+Gでエディタ直接編集、(3) Normal Modeで実装・テスト実行、(4) コミット＆PR。小さなタスク（1文で差分を説明できる場合）は計画スキップ可。2回修正失敗したら`/clear`して学んだことを組み込んだ新プロンプトで再開。スケール手法: Writer/Reviewerパターン（セッション分離）、ファンアウト（`claude -p`×ファイルリスト）。
> 詳細: メモリ内 `reference_claude_code_best_practices_official.md` を参照

### 2026年3月アップデート総括（自動収集 2026-03-29）
2026年3月はClaude Codeの転換期的アップデート月。音声モード（/voice）、Channels（Telegram/Discord連携で外出先から指示）、/loop（自律ループ）、Opus 4.6対応が同時に実現。「声で指示」「スマホから操作」「放置で自律実行」の3軸が揃った。
> 詳細: メモリ内 `reference_claude_code_march_2026_updates_arashiyama.md` を参照

### Claude Code全CHANGELOG追跡 — 2025年176リリースの総括（自動収集 2026-04-01）
2025年の全176リリース（v0.2.x:37、v1.0.x:82、v2.0.x:57）を追跡。「AIモデル=馬、Claude Code=馬具」の比喩でハーネス完成度が差別化要因と結論。仕様駆動開発（SDD）がPlanモード+Interactive Question Toolで実現。課題: コンテキストウィンドウサイズ（Opus 4.5は200k、GPT-5.2は400k、Gemini 3 Proは1M）、コンパクション品質。サードパーティツールの慎重利用を推奨（「ハーネスの外側に追加ハーネス」リスク）。
> 詳細: メモリ内 `reference_claude_code_all_changelog_2025.md` を参照

### Agent Teams — 複数エージェント協働（自動収集 2026-04-04）
双方向コラボレーションで複数エージェントが協働する実験的機能。
有効化: 環境変数 `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`。
teammateMode: auto（自動判断）/ in-process（同一プロセス）/ tmux（ターミナル分離）の3種。
トークン消費は通常の約7倍。TeammatesにSonnet/Haiku使用でコスト管理が必須。
/rewind・/resume非対応（プレビュー段階の制限事項）。
> 詳細: references/reference_agent_teams_gihyo.md を参照

### Git Worktreeネイティブサポート（自動収集 2026-04-04）
v2.1.49で`--worktree (-w)`フラグ追加。Subagentフロントマターに`isolation: worktree`指定で独立worktree動作。作成先: `.claude/worktrees/<n>/`。Desktop版は`.worktreeinclude`で.env自動複製。有効: 並列開発・大規模マイグレーション・Writer/Reviewerパターン。不向き: 逐次処理・共通ファイル編集・エージェント間通信必須時。
> 詳細: references/reference_git_worktree_native_support.md を参照

### worktree並列自動開発パイプライン（自動収集 2026-04-04）
twig(worktree CLI)+vscode-startup-runner(自作拡張)+Claude Code(`defaultMode: "acceptEdits"`)で計画→worktree作成→自動開発→PR作成を自動実行。Agent Teamsとの使い分け: 協調→Agent Teams、独立並列→worktree。promptファイル`.twig-claude-prompt-<name>.sh`で初期設定・セットアップ・指示を1バンドル。
> 詳細: references/reference_worktree_parallel_automation.md を参照

### isolation:worktreeエージェント定義（自動収集 2026-04-07）
エージェント定義のfrontmatterに`isolation: worktree`を1行追加でサブエージェント専用git worktree自動生成。`.claude/worktrees/<ランダム名>/`に作成、ブランチ名`worktree-<名前>`形式。変更なし時は自動削除。活用: 並列フィーチャー開発（フロント/バック同時）、コードレビュー並列化、実験的変更。`.gitignore`に`.claude/worktrees/`追加推奨。
> 詳細: references/reference_isolation_worktree_agent.md を参照

### ワークフロー設計: 5段階移譲とProgressive Disclosure（自動収集 2026-04-07）
SMS社の体系的ワークフロー設計。5段階移譲レベル: Consult（人間主導相談）→Agree（協業）→Inquire（LLM主導確認）→Delegate（完全移譲）。Progressive Disclosure: CLAUDE.mdは最小限（80%のタスクで必要な情報のみ）、Skills/Commandで段階的供給。マルチエージェント: メインセッションは調整役、サブエージェントが単一責任。否定形レビュー指摘が効果的。トレードオフ: 対話的ブラッシュアップに不向き→部分採用でバランス。
> 詳細: references/reference_sms_workflow_design.md を参照

### Usecase Design DocによるAI委譲最適化（自動収集 2026-04-08）
CADDi社の事例。AIエージェントへの実装委譲で「お世話負荷」（詳細プロンプト・監視・並列認知負荷）が課題に。解決策: Usecase Design Doc（サマリー・CRUD表・シーケンス図・IF仕様・チェックリスト）を事前作成し、未実装項目をAIに投入→PR作成→午後レビューの非同期サイクル確立。タスク分割はPR200〜300行でレイヤー/DDD集約/同期非同期単位。結果: マージPR数2倍、認知負荷軽減。教訓: 「プロンプト工夫より設計ドキュメントが効率的」。
> 詳細: references/reference_usecase_design_doc_caddi.md を参照

### multi-agent-shogun v1.1.0: 3層コンテキスト管理と運用改善（自動収集 2026-04-08）
multi-agent-shogun v1.1.0の実運用改善。3層コンテキスト管理: Layer1 Memory MCP（セッション超越永続記憶）、Layer2 Global Context（システム全体設定）、Layer3 Project Context（プロジェクト状態）。コンパクション復帰手順をCLAUDE.mdに追加し記憶喪失を仕組みで防止。将軍のExtended Thinking無効化（MAX_THINKING_TOKENS=0）で「Don't think. Delegate.」を実現。スキルは初期白紙→実運用で有機的に育成する設計。
> 詳細: references/reference_multi_agent_shogun_v110.md を参照

### multi-agent-shogun: tmux×9体AIエージェント並列開発（自動収集 2026-04-08）
Claude Code×tmuxで将軍/家老/足軽8の階層マルチエージェントシステム。YAMLベース通信（JSONよりデバッグ容易）。tmux send-keysは2回分割が必須（メッセージとEnterを分離）。ポーリング（9体×5秒=108回/分）ではAPI破綻→イベント駆動で待機中API消費ゼロ。ダッシュボードはVSCode Markdownプレビューで外部化。人間の役割は判断のみ（「テストして」「お願いします」＋A/B選択）。
> 詳細: references/reference_multi_agent_shogun.md を参照

### Codex・Claude Code・Copilot適材適所ガイド（自動収集 2026-04-09）
Copilot: IDE内補完特化（GPT-5 mini無料クォータ）。Claude Code: 複数ファイルリファクタリング・基盤設計（Opus 4.6自律完遂）。codex-plugin-cc: Claude CodeからCodexを呼ぶクロスモデルレビュー層（確証バイアス回避）。トークン実測: Figmaクローン生成でCodex約150万 vs Claude Code約620万（約4倍差）。推奨4段階: Copilot補完→Claude Code設計実装→codex-plugin-ccレビュー→GitHub PRチームレビュー。注意: review-gate無限ループ（修正→再レビュー繰り返し）に注意。
> 詳細: references/reference_codex_claude_copilot_comparison.md を参照

### Claude Code v2.1.89〜v2.1.92 ワークフロー改善（自動収集 2026-04-10）
defer権限決定（v2.1.89）: PreToolUseフックにallow/denyに加え「defer」追加。実行を一時停止し外部シグナルで再開待機。CI/CD承認ゲート・マルチエージェント連携に活用。MCP 500K文字制限（v2.1.91）: `_meta.anthropic/maxResultSizeChars: 500000`でツール結果サイズ拡大。パフォーマンス: Writeツールdiff計算60%高速化、SSEトランスポートO(n²)→O(n)改善。安定性修正: tmux終了後サブエージェント再生成・`--resume`キャッシュミス回帰・auto-compact無限ループ・CJK/絵文字履歴欠落・ネストCLAUDE.md再注入。
> 詳細: references/reference_claude_code_april_2026_update.md を参照

### Claude Managed Agents セッション管理（自動収集 2026-04-10）
Managed Agentsのセッション: AgentとEnvironmentを指定して起動、SSEでイベントストリーミング。長時間非同期タスク向け（数分〜数時間）。プロンプトキャッシュ・コンテキスト圧縮が自動処理。実装検証5ステップ: ①ベータヘッダー`managed-agents-2026-04-01`準備→②最小Agent定義→③最小権限Environment→④課金監視→⑤MCP接続。
> 詳細: references/reference_claude_managed_agents.md を参照

### イベント駆動型ワークフロー自動化 — Hooks×Scheduler×Skills（自動収集 2026-04-11）
3機能組み合わせの4パターン: ①Scheduler→Skill→Hook（定期収集＋FileChanged異常検知→Slack通知）、②Hook→Skill（git commit検知→CHANGELOG自動更新、Skill内Hookでスコープ限定）、③Scheduler→Skill+自己検証（Stopイベントでexit code 2→自己修正）、④SessionStart Hook→動的提案。設計原則: ファイル経由連携・関心の分離・exit code制御・段階的成長。
> 詳細: references/reference_event_driven_workflow_automation.md を参照

### Managed Agents API実装パターン（自動収集 2026-04-11）
Agent定義（YAML: model・mcp_servers・tools）→Environment設定（unrestricted/limited）→Session開始→SSEイベントストリーミング。GitHub MCP連携にはFine-grained token＋Vault認証。料金: $0.08/時（ミリ秒課金）。長時間非同期タスク向け。
> 詳細: references/reference_managed_agents_handson.md を参照

### スケジューラー段階的育成（自動収集 2026-04-11）
3タイプ: /loop（セッション内・3日失効）→Desktop（ローカル・スリープ時停止）→Cloud（完全自動）。育成: 手動確認→Desktop登録（3回連続成功で昇格）→Cloud放置。6パターン: 1on1準備・議事録・日次レポート・デイリーサマリー・自動化提案・KPI分析。11個で週4.5時間削減。
> 詳細: references/reference_scheduler_nurturing_guide.md を参照

### /ultraplanによるクラウド設計ワークフロー（自動収集 2026-04-12）
ブラウザUIでインラインコメント・絵文字リアクション・アウトラインサイドバーを使ったレビュー。完了後: クラウド実行（PR作成まで）or テレポート（ローカル実装）。ユースケース: 大規模リファクタリング（tRPC移行等）・サービス移行・セキュリティ監査（OWASP約8分）・マルチコンポーネント機能。ターミナル解放が最大の価値。
> 詳細: references/reference_claude_code_ultraplan_guide.md を参照

### Managed Agents APIワークフロー（自動収集 2026-04-12）
Agent定義→Environment設定→Session開始→SSEイベントストリーミング。組み込みツール: bash・ファイル操作・Web検索・MCP接続。セッション制御: interruption（中断）・steering（方向修正）。単発自動化には過剰、長時間非同期タスクや大規模プロダクト統合向け。
> 詳細: references/reference_managed_agents_api_architecture.md を参照

### PRレビュー全自動化 — 83%自動マージへの段階的ロールアウト（自動収集 2026-04-15）
Claude Code GitHub Actionsで3ペルソナ並列レビュー（品質・セキュリティ・インフラ）。信頼度スコア=一致度×CI通過率×変更規模（0.8以上で自動マージ）。6ヶ月計画: シャドーモード→10%→30%→83%自動マージ。コスト: 400行diffで$0.04/PR（10名チームで月$24）。キルスイッチ・強制人間レビューコマンド等のフォールバック設計あり。
> 詳細: references/reference_claude_code_pr_review_automation.md を参照

### GMO 8ステップ開発オーケストレーター（自動収集 2026-04-15）
Skills・Rules・Hooks・Sub Agents・Agent Teams・Memoryの6機能で全工程8ステップ自動化。5つのAgentTeamテンプレート（Research・Implement-orchestrator・Independent-impl・Review・Debug）。経験則自動メモリ: Hook監視→パターン抽出→失敗3回以上でSkill昇格。ドキュメント800行超で自動分割、トークン消費3〜10分の1に削減。
> 詳細: references/reference_claude_code_orchestrator_gmo.md を参照

### Routines — スケジュール・API・GitHubイベント駆動の無人セッション（自動収集 2026-04-16）
Routines（Research Preview）はAnthropic管理クラウド上でClaude Codeを無人実行する新機能。トリガー3種: スケジュール（最小1h間隔）・APIコール・GitHub Webhook。構成=プロンプト+リポジトリ+コネクタ。日次上限: Pro5回・Max15回・Team/Enterprise25回。cronとの違い: 固定スクリプトではなくLLMがコンテキスト依存で動的判断。制約: 個人紐づけ（チーム共有不可）・承認ダイアログなし・Research Preview段階で仕様変更あり。
> 詳細: references/reference_routines_implementation_notes.md, references/reference_routines_vs_cron_analysis.md を参照

### Claude Codeデスクトップアプリ再設計 — 並列エージェント時代のUI（自動収集 2026-04-16）
2026年4月14日発表。複数セッションを1ウィンドウで並列管理するサイドバー、統合ターミナル、ファイルエディタ、高速diffビューア、プレビューペイン（HTML・PDF対応）。Command+;でクイックチャット、3段階表示モード（Verbose/Normal/Summary）。SSH経由リモートセッション（Mac・Linux）。プラグイン互換性とコンテキスト使用量モニタリング。
> 詳細: references/reference_claude_code_desktop_redesign.md, references/reference_desktop_routines_overview.md を参照

### Claude Code × Codex エコシステム共通トレンド（自動収集 2026-04-16）
両CLIが6カテゴリで収斂: 拡張層（oh-my-claudecode27.5K vs oh-my-codex20.8K）・CI統合（claude-code-action vs codex-action）・サブエージェント・ベスプラ集・クロスプラットフォームFW（superpowers146K/everything-claude-code150K）・並列実行。設計哲学の差: Claude=エージェント自律性、Codex=人間承認ワークフロー。共通方向: Research→Plan→Execute→Review→Ship。
> 詳細: references/reference_harness_ecosystem_trends_april.md を参照

### Routinesハンズオン — 既存スケジューリングとの5軸比較・3サンプル設計（自動収集 2026-04-17）
Routinesをローカルタスク・/loop・GitHub Actionsと5軸比較。Routinesの強み: PC不要のクラウド実行・YAML不要のGitHubイベント反応・ターミナルからの`/fire` APIオンデマンド起動。弱み: 最小間隔1h・個人紐づけ（チーム共有不可）・日次上限あり。3サンプル: 週次Activity→Slack（スケジュール）、ターミナル→Issue（API）、PR文書チェック（GitHubイベント）。注意: MCPコネクタがデフォルト全有効、cronがUTC基準、GitHubトリガーはPR+Releaseのみ（UIとドキュメントに乖離あり）。
> 詳細: references/reference_routines_handson_comparison.md を参照

### 1週間13リリースの戦略分析 — 画面・クラウド・組織の3面攻撃（自動収集 2026-04-17）
4/8-15に13機能リリース。画面面: Desktop再設計・Focus view・3段階表示モード。クラウド面: Routines・Ultraplan（plan/実装分離）・Monitor tool（event-driven）・1hキャッシュ。組織面: Cowork Enterprise（RBAC・支出上限・OTel SIEM連携）・/team-onboarding・OS CA trust。Multi-agent 5パターン: Generator-verifier→Orchestrator-subagent→Agent teams→Message bus→Shared-state。「最も単純なパターンから始めて進化」が推奨。
> 詳細: references/reference_claude_code_13_releases_week.md を参照

### Routines完全ガイド — トリガー・上限・セキュリティ設計（自動収集 2026-04-17）
- 3トリガー: スケジュール（ローカルTZ対応）、API（HTTPエンドポイント+トークン発行）、GitHubイベント（著者・タイトル・ブランチフィルタ可）
- プラン別日次上限: Pro 5回、Max/Team 25回、Enterprise 25回（超過従量課金）
- セキュリティ: `claude/`プレフィックスブランチのみプッシュ可。AI生成PRは必ず人間レビュー後にマージ
- 設定3ステップ: routines画面→トリガー選択→コネクタ接続。PCオフでもAnthropicクラウドで継続実行
> 詳細: references/reference_routines_complete_guide_jinrai.md を参照

### RoutinesでGAS定期タスク置き換え（自動収集 2026-04-17）
- GASはスプレッドシート連携に強く、Routinesは複数SaaS連携×自然言語判断に最適
- GAS廃止ではなく補完的活用を推奨。MCPコネクタは権限最小限で選定
- Research Preview段階のため仕様変更の可能性あり
> 詳細: references/reference_routines_gas_replacement.md を参照

### 30連続アップデート注目機能カテゴリ整理（自動収集 2026-04-17）
- 5週間でv2.1.69→v2.1.101、30+リリース。Opus 4.6 1Mコンテキスト正式GA
- カテゴリ別に整理され、開発者体験を根本から変える機能群が一気に追加
> 詳細: references/reference_claude_code_30_updates_note.md を参照

### モバイルプッシュ通知と非同期開発パターン（自動収集 2026-04-20）
v2.1.110でRemote Control有効セッションにモバイルプッシュ通知追加。Claudeの判断ポイントで自動通知→モバイルから承認・指示可能。実践パターン: テスト実行→離席→通知→リモート承認、夜間バッチ→通勤中に通知→Remote Control回答。注意: 本番環境での自動承認はリスク大。
> 詳細: メモリ内 reference_claude_code_tui_mobile_remote.md を参照

### Claude Code Game Studios: 49体AIで並列ゲーム開発（自動収集 2026-04-21）
49体の専門AIエージェント+72ワークフロースキルのOSS。3層体制: Tier1（3体Opus: CD/TD/Producer）、Tier2（8体Sonnet: 部門リーダー）、Tier3（38体Sonnet/Haiku: スペシャリスト）。12種自動検証フック・11種パス別コーディングルールでHuman-in-the-loop確保。個人がAAA規模の組織構造でゲーム開発可能。
> 詳細: references/reference_claude_code_game_studios.md を参照

### Claude Code デスクトップ版刷新：並列エージェント対応（自動収集 2026-04-22）
2026年4月、デスクトップアプリを大幅刷新。新サイドバーで全セッションを一覧管理し、Subagent @mention機能でメインセッションからタスクを委任する並列処理が可能に。統合ターミナル・ファイルエディタ・差分ビューア・HTML/PDFプレビューが1ウィンドウ内に統合。Windows: `Ctrl + ;` でサイドチャット起動。詳細・通常・概要の3段階表示モード対応。Pro/Max/Team/Enterprise プラン対象。
> 詳細: references/reference_claude_code_desktop_parallel_sbbit.md を参照

<!-- 日常で得た知見をここに追記 -->
