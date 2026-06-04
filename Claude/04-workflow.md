# ワークフロー・モード活用

## 目次

- [Planモード](#planモード)
- [Fastモード](#fastモード)
- [サブエージェント](#サブエージェント)
- [Gitワークツリー](#gitワークツリー)
- [タスク管理](#タスク管理)
- [チェックポイント（巻き戻し）](#チェックポイント巻き戻し)
- [コンテキスト圧縮](#コンテキスト圧縮)
- [実践例: Issue起票→並列開発→PR作成の全自動化](#実践例-issue起票並列開発pr作成の全自動化)
- [実践メモ](#実践メモ)

---

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

### Routines公式発表：3トリガー方式とプラン別上限（自動収集 2026-04-23）
2026年4月15日リサーチプレビュー開始。スケジュール（cron）・API・GitHub Webhookの3トリガーでクラウド常駐実行（端末起動不要）。プラン別日次上限: Pro=5回、Max=15回、Team/Enterprise=25回。Pro〜Enterprise対象。
> 詳細: references/reference_claude_code_routines_launch_forest.md を参照

### Subagent @mention並列委任・PowerShell対応（自動収集 2026-04-23）
2026年4月アップデートでSubagent @mention機能追加。メインセッションから `@{エージェント名}` で並列タスク委任が可能に（フロントエンド・バックエンド同時編集、リサーチ・コーディング並行実行等）。PowerShellネイティブ対応でWSL不要。Alt-screenレンダリング改善でターミナルのちらつきも解消。
> 詳細: references/reference_claude_code_april_updates_sei.md を参照

### Claude Managed Agents：3コンポーネント設計と料金（自動収集 2026-04-23）
2026年4月8日パブリックベータ開始。3コンポーネント: Session（追記専用履歴ログ・getEvents()で任意取得）、Harness（ツールルーティング・wake()で再起動）、Sandbox（Python/Node/Go実行環境）。料金: モデルトークン標準料金＋$0.08/セッション時間＋$10/1,000 Webサーチ。Notion・楽天・Asana・Sentry採用。
> 詳細: references/reference_claude_managed_agents_teria.md を参照

### Routines入門：3トリガー・プラン別制限・実践ユースケース（自動収集 2026-04-24）
2026年4月14〜15日リリース。3トリガー: Schedule（毎時〜週次）・GitHub（PR/Issueイベント）・API（HTTP endpoint）。プラン別上限: Pro=5回/日、Max=15回/日、Team/Enterprise=25回/日。クラウド実行でPC不要。デスクトップ同時リリース新機能: 並列セッション管理サイドバー・統合ターミナル・ドラッグ&ドロップレイアウト・Diffビューア。実践例: 毎朝PRレビュー・デプロイ後動作確認・バックログ自動整理。
> 詳細: references/reference_claude_code_routines_intro_qiita.md を参照

### 定期実行3手段の選択基準（Routines/loop/Desktop）（自動収集 2026-04-24）
比較軸: PC起動要否・セッション依存・ローカルツール/MCP利用可否。Routines=クラウド実行・PC不要・ローカルMCP不可・最短1時間間隔。/loop=セッション内限定・自然言語間隔指定・最大50タスク・セッション終了で消滅。Desktop タスク=ローカル実行・セッション非依存・ローカルMCP使用可。選択基準: 「PC閉じても動かしたい→Routines、ローカルツール必要→Desktop タスク、今のセッションで一時的→/loop」。
> 詳細: references/reference_claude_code_routines_scheduling_compare.md を参照

### Claude Code完全ガイド2026年4月更新版（Routines・Agent Teams・xhigh）（自動収集 2026-04-25）
2026年4月21日更新の包括的ガイド: Routines（スケジュール/API/GitHub Webhookの3トリガーでクラウド常駐自動化）・デスクトップアプリ刷新（並列エージェントサイドバー・統合ターミナル・HTMLプレビュー）・Opus 4.7 xhighがcoding/agenticタスクの推奨デフォルト・Agent Teams（同一ウィンドウ内複数エージェント並列）・MCPサーバー統合まで5分クイックスタートから本番運用まで網羅。国内事例・アンチパターン・エンタープライズ運用設定を含む実用的リファレンス（Zenn akasara）。
> 詳細: references/reference_claude_code_complete_guide_april2026.md を参照

### Claude Code Routines完全解説：3トリガー×プラン別日次上限（自動収集 2026-04-26）
Anthropicが2026年4月14日リリースのクラウド常駐自動化機能。**Schedule**（毎時/毎晩/毎週）・**API**（HTTPトリガー、ベータヘッダ必須）・**GitHub Event**（PR opened/push等Webhook）の3種で起動。プラン別日次上限: Pro=5回・Max=15回・Team/Enterprise=25回。安全設計: デフォルトで`claude/`プレフィックスブランチのみpush許可、権限スコープをコネクター選定で事前限定。個人名義実行のためチーム共有は設計注意。活用: 夜間PRレビュー・定期テスト・データパイプラインバッチ。
> 詳細: references/reference_claude_code_routines_aisouken.md を参照

### Claude Codeデスクトップ全面リデザイン：ドラッグ&ドロップ・サイドチャット・HTMLプレビュー（自動収集 2026-04-27）
2026年4月デスクトップアプリ全面リデザイン詳解。**新機能7項目**: ①新サイドバー（全セッション一元管理・ステータスフィルタ・プロジェクト別グループ化・自動アーカイブ）②ドラッグ&ドロップレイアウト（ターミナル/プレビュー/チャットペインを自由配置）③統合ターミナル（ウィンドウ切り替え不要）④ファイルエディタ統合⑤HTMLプレビュー（Webアプリ変更をリアルタイム確認）⑥サイドチャット（メインタスク継続中に別スレッドで質問）⑦テーマ自動切り替え（ターミナル設定連動でライト/ダーク自動化）。対応プラン: Pro・Max・Team・Enterprise。
> 詳細: references/reference_claude_code_new_design_vegcale.md を参照

### Claude Code Routines 3日間実録：4ルーチン・3事故・オペレーション化の教訓（自動収集 2026-04-17）
nogataka氏によるRoutines初期実運用レポート。実装4ルーチン: 朝のトレンド収集(Schedule)・夜間経理入金確認(Schedule)・GitHub Issue自動トリアージ(GitHub Event)・週次活動レポート(Schedule)。3件の事故: ①停止忘れによる予期しない課金②通知の連続発火③意図せぬセッション重複。教訓: 監視/停止手順を事前整備・Hooksによるレート制限・週次棚卸しのオペレーション化が必須。「安定運用コストと事故コストがほぼ同オーダー」。初利用者は1本のルーチンから始めることを推奨。
> 詳細: references/reference_claude_code_routines_3days_nogataka.md を参照

### Claude Managed Agentsで変わる経営判断5つ：$0.08/時間・3ステップ導入（自動収集 2026-05-01）
Anthropicが2026年4月8日に公開ベータ開始。Notion・楽天グループ・Asana・Atlassian・Sentry採用。**経営・マネジメント視点の5変化**: ①AIが複数ツールを使って長時間自律遂行 ②料金$0.08/時間（約12円）と極めて低廉 ③インフラ構築不要で導入障壁低下 ④経営者の役割が「何をAIに任せるか」設計へ転換 ⑤AI活用先進企業との格差が急速に拡大。**3ステップ導入**: ①繰り返し業務のリスト化→②アクセス権限の明文化→③小規模試験と数値測定。注意: 機密データ取り扱いにはセキュリティポリシー確認必須。技術実装詳細はreference_managed_agents_handson.mdを参照。
> 詳細: references/reference_claude_managed_agents_business_tech_noisy.md を参照

### コードを書けないSE歴26年管理職がClaude Codeで9体AIチームを10日で構築（自動収集 2026-04-26）
Zenn Book「コードを書けない私が、AIに『チーム』を持たせるまで」（¥900・約11万字）の概要記事。編集長・ライター・校閲エージェントを役割分化させ9体チームを構成。設計原則: CLAUDE.md+SKILL.mdで各エージェントの制約を明文化・失敗事例（暴走・ループ・期待外れ）を正直に記録。非エンジニア向けの「再現可能なサンプル付録」が特徴。対象: コードを書かない管理職・企画職・シングルエージェントからチーム化に進みたい人。
> 詳細: references/reference_ai_team_no_code_saitoko.md を参照

### CLAUDE.md×プロンプトテンプレートでブログ・SNS投稿を継続するワークフロー（自動収集 2026-05-05）
学習とアウトプットを別タスクにしないことが継続の鍵。CLAUDE.mdにコンテンツ生成ルール（読者設定・構成・トーン）を定義し、3種のプロンプトテンプレート（機能試行・ドキュメント読み込み・エラー解決）でブログ記事を自動生成。そのままSNS投稿3パターンも生成可能。スケジュール管理はファイルで追跡。「まず動かしながら整える」が継続の秘訣。
> 詳細: references/reference_claude_code_blog_workflow_tmdev.md を参照

### Claude Code Routines詳細解説：3種トリガー・プラン別上限・Desktop Appリデザイン・エンタープライズガバナンス（自動収集 2026-05-10）
Routinesは「プロンプト＋リポジトリ＋コネクター」をクラウドで自動実行（ローカル不要）。①スケジュール（最小1時間間隔・ワンショット機能あり）②GitHubイベント（PR作成/ラベル・リリース、条件フィルタ可）③APIトリガー（POSTリクエストで即時起動）の3種。プラン別上限: Pro=5回/日・Max=15回/日・Team/Enterprise=25回/日（超過は従量課金）。実務パターン5選: 朝のバックログ整理・デプロイ後スモークテスト・PR自動レビュー・週次ドキュメント鮮度チェック・SDK並行ポート。Desktop Appリデザイン（Week 16-17）でセッションサイドバー・ルーティンズビュー・カスタムテーマが追加。ガバナンス設計: CLAUDE.mdに「本番ブランチpush禁止・500行超でドラフト停止」を明記、Individual accountに紐付くため専用サービスアカウント推奨。
> 詳細: references/reference_claude_code_routines_desktop_redesign_uravation.md を参照

### Dynamic Workflows を技術的に整理：JS生成・1,000並列・別エージェント検証の3層構造（自動収集 2026-06-02）
Claude Code Dynamic WorkflowsはClaudeが自動生成したJavaScriptオーケストレーションスクリプトで最大1,000サブエージェントを並列実行する仕組み。①複雑計画のJS化（コンテキスト外に移管しメイン圧迫を回避）②独立サブエージェントの並列処理 ③別エージェントによる検証レビュー、の3層構造。適用領域：コードベース監査・大規模マイグレーション・クリティカルな検証。実績：BunのZig→Rustポート約75万行を約6日で完了。制限：Research Preview・Max/Team/Enterprise限定・高コスト。利用開始はUltracodeモード有効化→確認ダイアログ→小規模スコープから開始を推奨。
> 詳細: references/reference_claude_code_dw_technical_octopool.md を参照

### Dynamic WorkflowsとSubagentsの違い：「処理構造をコードで宣言する」本質と使い分け基準（自動収集 2026-06-02）
Dynamic Workflowsの本質は「処理構造をコードで宣言する」こと。Subagentsが「Claudeがその場で判断・柔軟実行」なのに対し、Dynamic Workflowsは「段取りはコードで確定、中身はAIで柔軟」という確信度向上が主な価値（速度は副産物）。使い分け：スキル=繰り返し定型処理、サブエージェント=単発・探索的、Dynamic Workflows=大規模並列・品質保証必要。コスト削減の観点では「タスクが明確に分解可能かつ独立性が高い場合のみ選択」し、探索的タスクはSubagentsで十分。
> 詳細: references/reference_claude_code_dw_vs_subagents_morphox.md を参照

### Dynamic WorkflowsをInfoQが解説：ultracode設定・並列エージェント調整・トークンコスト留意点（自動収集 2026-06-03）
Anthropicが2026年5月28日にClaude CodeへDynamic Workflowsを導入したことを英語権威メディアInfoQが報道。ユーザーの目的に基づきClaudeが自動的にワークフロー計画を生成し、複数の専門化されたサブエージェント間でタスクを分散・並列実行する。「ultracode」設定でワークフロー利用を自動判断可能。Claude Max/Team/API経由で利用可能だが、通常セッションより「かなり多くなる」トークンコストに注意し、小規模タスクから開始を推奨。開発者が手作業で行っていたワークフロー調整を形式化する画期的なステップと評価。
> 詳細: references/reference_dynamic_workflows_infoq_june2026.md を参照

### Dynamic Workflow実践レポート：/deep-researchの5フェーズ構造とカスタムワークフロー作成（自動収集 2026-06-03）
azukiazusa.devがClaude Code v2.1.154のDynamic Workflow機能を実際に試した実践記事。`/deep-research`コマンドは①Scope（質問を複数角度に分解）②Search（並列検索）③Fetch（ソース取得・主張抽出）④Verify（敵対的検証）⑤Synthesize（レポート生成）の5フェーズで動作。カスタムワークフローはプロンプトに「workflow」を含めると自動生成され、プロジェクト単位・ユーザー単位で保存・コマンドとして再利用可能。サブエージェントが独立したコンテキストで実行されるためメインセッションを圧迫しない点が重要な利点。
> 詳細: references/reference_dynamic_workflow_azukiazusa.md を参照

### Dynamic Workflows実務ガイド（Fyve）：3特徴・活用シーン・6月2日変更点・3失敗パターン（自動収集 2026-06-03）
Fyve（Claude Code for Business）が中小企業・個人事業主向けにDynamic Workflowsを解説。3特徴：①最大16体同時・1,000体順次稼働②中間結果をスクリプト変数保持でコンテキスト圧迫回避③ワークフロー再利用可能。起動キーワードは6月2日の更新で「workflow」から「ultracode」に変更（`/effort ultracode`でも有効化可）。活用シーン：大量データ一括処理・リサーチ並列実行・複数顧客横展開。3つの失敗パターン：本番リポジトリへの直接実行・コスト試算なしの常用・許可リスト設計不足を避けること。Pro/Max/Team/Enterpriseで利用可能、無料プランでは使用不可。
> 詳細: references/reference_dynamic_workflows_guide_fyve.md を参照

### Dynamic Workflows詳細解説（Uravation）：反証検証の仕組み・コスト構造変化・日本企業へのインパクト（自動収集 2026-06-03）
Uravationが動的ワークフローを実務視点で徹底解説。特筆すべきは「反証検証メカニズム」：複数エージェントの主張を相互検証し、生き残った結論だけを報告することでハルシネーションリスクを低減。技術仕様：同時実行最大16体（マシンスペック依存）、1ランあたり上限1,000体（暴走防止）。3つの実装上の注意：①本番リポジトリ直接実行回避②コスト試算なしの常用回避③許可リスト設計を事前に実施。日本企業への影響として「コスト構造が人月からトークン消費量へシフト」する可能性を指摘。
> 詳細: references/reference_claude_code_dw_1000parallel_uravation.md を参照

### Dynamic Workflow vs 4手段比較（秋霜堂）：JavaScriptオーケストレーション自動生成の仕組みと使い分け判断軸（自動収集 2026-06-04）
秋霜堂が2026年6月3日公開。4手段（通常Claude Code・サブエージェント・Agent Teams・Dynamic Workflow）を比較し、Dynamic Workflowの本質を解説。「ClaudeがJavaScriptオーケストレーションスクリプトを自動生成し、バックグラウンドランタイムが実行する仕組み」が核心。中間結果をコンテキストウィンドウではなくスクリプト変数に保持することで、ノイズ削減・コスト最適化・再現性向上を実現。起動方法4種：①プロンプトに「ultracode」②`/effort ultracode`③`/deep-research`④自然言語。判断軸：独立タスクが多数・バッチ処理・再現性が必要→Dynamic Workflow、タスク数少なく中間参照しながら進む→サブエージェント。
> 詳細: references/reference_claude_code_dw_comparison_syusodo.md を参照

### Dynamic Workflows「教科書」（note・そう）：1,000エージェント並列の仕組みとBun→Rust 75万行移植事例（自動収集 2026-06-04）
2026年5月30日公開、約1.5万文字・80画像の包括的解説記事。核心概念：「ClaudeがJavaScript実行スクリプトを生成し、独立ランタイムがそれを実行する仕組み」でメインセッションのコンテキストを圧迫せずに最大1,000並列を実現。実際の大規模事例：Bun→Rust全面移植プロジェクトで2,188ファイル・75万行を11日間で完了しテスト通過率99.8%を達成。メモリレイアウト・型システム・ランタイムの根本的差異を持つ言語間移植をDynamic Workflowsが自律的に処理した事例として特筆。有料部分（¥8,900/月）の詳細実装手順は別途参照のこと。
> 詳細: references/reference_dynamic_workflows_textbook_soh_note.md を参照

### Opus 4.8 マルチエージェント運用でのモデル振り分け：大名システム構成とコスト構造の実態（自動収集 2026-06-04）
Qiita（tanaka_taro_JP_KYUSYU）が2026年5月29日公開。Opus 4.7→4.8は価格据え置きでコード自己検証が約4倍厳格化・Fast modeが約2.5倍速/3分の1コストに改善。マルチエージェント運用の「大名システム」構成：大名（Opus 4.8・戦略判断）→家老（Sonnet 4.6・設計/テスト）→足軽（Haiku 4.5・定型処理）という階層型振り分けで、役職別に最適なモデルを明示的に`model`パラメータで指定。コスト実態：トークン単価はOpus=Sonnetの1.67倍だが消費量込みで体感3〜5倍になるため、量産タスクはSonnet基本・コア判断のみOpusという設計が経済的。
> 詳細: references/reference_opus48_multiagent_model_comparison_tanaka.md を参照

<!-- 日常で得た知見をここに追記 -->
