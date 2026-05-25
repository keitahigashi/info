# 全体像・機能マップ

## 目次

- [Claude Code とは](#claude-code-とは)
- [機能マップ](#機能マップ)
- [ユースケース別おすすめ構成](#ユースケース別おすすめ構成)
- [実践メモ](#実践メモ)

---

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

### Claude最新機能・モデルラインナップ 2026年3月版（自動収集 2026-03-28）

- **Sonnet 4.6**（2026年2月リリース）が全プランのデフォルトモデルに。70%の開発者が前バージョンより高評価
- **Compaction機能**（2026年2月）: コンテキスト制限に近づくと自動要約・圧縮し、理論上無制限の会話継続が可能
- **メモリインポート**: ChatGPT等からの個人データ移行に対応
- エージェント領域への本格参入が2026年の主要トレンド

> 詳細: メモリ内 reference_claude_latest_features_march_2026.md を参照

### Claude 4.6モデル比較とBedrock活用（自動収集 2026-03-30）
API料金(Bedrock経由、100万トークンあたり): Opus 4.6 入力$5/出力$25、Sonnet 4.6 $3/$15、Haiku 4.5 $1/$5。コンテキスト: Opus/Sonnet 100万トークン、Haiku 20万トークン。Bedrock利点: VPCエンドポイント（ネット非経由）、IAM制御、マネージド高可用性。ハルシネーション対策にRAG（社内データ参照）と忠実性・応答関連性での継続評価が推奨。
> 詳細: メモリ内 `reference_claude_46_bedrock_guide.md` を参照

### Claude料金プラン完全ガイド（自動収集 2026-04-01）
全プラン: Free(無料)→Pro($20)→Max 5x($100)/20x($200)→Team Standard($25/人)/Premium($125/人)→Enterprise(個別)。API従量課金(100万トークン): Opus $5/$25、Sonnet $3/$15、Haiku $1/$5。コスト試算例: サポートBot(Haiku)月1万件→$20、文書分析(Sonnet)日50件→月$33、開発10名(Opus)日100回→月$1,045。最適化: Batch APIで50%OFF、プロンプトキャッシュで入力90%OFF。Freeプランはデータが学習に使用される可能性、TeamプランはデフォルトでOFF。
> 詳細: メモリ内 `reference_claude_pricing_guide_2026.md` を参照

### Claude Cowork実践ガイド Windows 11（自動収集 2026-04-01）
ファイルシステムに直接アクセスして自律的に業務実行するエージェント型AI。サンドボックス（仮想マシン）で安全に動作。要件: Windows 11 + Intel VT-x/AMD-V + 5GB以上（ARM64未サポート）。画像リサイズ等のファイル操作を自律実行。グローバル指示設定、スケジュール実行（Googleカレンダー連携）対応。有料プラン（Pro/Max/Team/Enterprise）必須。
> 詳細: メモリ内 `reference_claude_cowork_windows_guide.md` を参照

### Claude最新情報 2026年4月1日速報（自動収集 2026-04-02）
API大型アップデート: (1) Compaction API（Opus 4.6 Beta）でサーバーサイド自動コンテキスト要約→事実上無制限の会話継続 (2) 1Mトークンベータが4/30終了→Sonnet 4.6/Opus 4.6への移行必要 (3) inference_geoパラメータでUS限定推論（1.1倍価格）のデータレジデンシー対応 (4) Web Fetchツール（Beta）でページ/PDF直接取得。Claude Code改善: 最大出力128kトークン、allowRead設定、/copy N拡張。
> 詳細: メモリ内 `reference_claude_news_20260401_elni.md` を参照

### Claude Codeを知る 2026年版（自動収集 2026-04-02）
Claude（会話型AI・参照のみ）とClaude Code（実行型AI・ファイル編集/コマンド実行/Git操作可能）の明確な比較。基本機能5つ（コード作成・バグ修正・Git自動化・テスト・リファクタリング）と上級機能9つ（CLAUDE.md・MCP・Hooks・Skills・サブエージェント・エージェントチーム・CI/CD・Cowork・セキュリティ）を体系整理。利用環境: CLI/VS Code/JetBrains/Web/iOS/デスクトップ。
> 詳細: メモリ内 `reference_claude_code_know_developersio.md` を参照

### 組織導入プラン選定ガイド（自動収集 2026-04-07）
Knowledge Work社の実例。優先順位: 自由度→支払い管理→コスト制御。Teamプラン: Standard $25/月/人・Premium $125/月/人（最大150シート）。Enterprise: 150人超・カスタム価格・Admin API。段階的移行: APIキー従量→Pro/Max→Team Premium→全シート対応。コツ: Standardから開始し利用上限$100設定→超過者をPremium候補に。「完璧を待つより、まず使える方法で始めて段階的に移行」。
> 詳細: references/reference_claude_code_org_plan_guide.md を参照

### Claude Managed Agents パブリックベータ（自動収集 2026-04-10）
Anthropicが2026-04-08にManaged Agentsをパブリックベータリリース。Agent（モデル+ツール+MCP定義）・Environment（コンテナテンプレート）・Session（実行インスタンス）・Events（SSEストリーミング）の4概念で構成。ant CLIでリソース定義。料金: アクティブランタイム$0.08/時（ミリ秒単位）・アイドル無課金・Web検索$10/1000クエリ。Messages APIとの住み分け: 短時間カスタム制御→API、長時間非同期自律→Managed Agents。早期導入: Notion・楽天・Asana。判断基準: PoC・標準ランタイム・インフラ人材不足→マネージド、国内DC必須・SLA確立・リアルタイム応答→自作。
> 詳細: references/reference_claude_managed_agents.md を参照

### Managed Agents API実装ハンズオン（自動収集 2026-04-11）
YAML形式でAgent定義（model・mcp_servers・tools）。APIエンドポイント4種: `/v1/agents`（作成）・`/v1/sessions`（開始）・`/v1/sessions/:id/events`（送信）・`/v1/sessions/:id/stream`（SSE受信）。GitHub MCP連携にはFine-grained token（Contents・PR・Metadata権限）とVault認証が必要。ネットワーク設定: unrestricted（全体許可）/ limited（ホスト指定）。
> 詳細: references/reference_managed_agents_handson.md を参照

### Advisor Tool — コスト削減＋精度向上の新API（自動収集 2026-04-11）
2026-04-09ベータリリース。安価モデル（Sonnet/Haiku）をエグゼキューターとし、困ったときだけOpusに相談。SWE-bench: Sonnet単独72.1%→Advisor付き74.8%（+2.7pt）、コスト11.9%削減。BrowseComp: Haiku 19.7%→41.2%（+21.5pt）。実装: ヘッダー`anthropic-beta: advisor-tool-2026-03-01`、tools配列に`type: advisor_20260301`追加。
> 詳細: references/reference_advisor_tool_cost_reduction.md を参照

### Managed Agents API分離構造（自動収集 2026-04-12）
「brain（Claude+harness）」「hands（sandbox+tools）」「session（永続event log）」の3層分離。APIベータヘッダー`managed-agents-2026-04-01`必須。SSEストリーミング・interruption・steering対応。料金: active session-hour $0.08（token価格に追加）。Research Preview: outcomes・multiagent・memory。Claude Code（サブスクリプション）は個人〜小規模、Managed Agents（API従量）は中〜大規模プロダクト統合向け。
> 詳細: references/reference_managed_agents_api_architecture.md を参照

### Claude Mythos Preview — 制限付き公開の次世代モデル（自動収集 2026-04-12）
2026-04-07発表。ゼロデイ脆弱性を自律的に発見する能力を持ち、GPT-5.4・Gemini 3.1 Proを大幅超過。セキュリティリスクにより一般公開なし。パートナー企業（AWS・Apple・Google・Microsoft等）限定提供。AI安全性とケイパビリティのトレードオフの新段階。
> 詳細: references/reference_claude_mythos_preview.md を参照

### Capabara — Anthropicの軽量ミドルレンジモデル（自動収集 2026-04-17）
2026年4月投入。Haiku〜Sonnet帯のミドルレンジで「コスト・速度・使いやすさ」優先。Mythos（超高性能・限定提供）の対極。Constitutional AI採用。企業向けモデル選定: Capabara（バッチ処理・CS一次対応・プロトタイプ）→Sonnet（法律・経営資料）→Opus（複雑推論）→Mythos（先端セキュリティ）。ハイブリッド構成（Haiku70%+Sonnet20%+Opus10%）で約64%コスト削減、バッチ割引併用で73%削減の試算あり。
> 詳細: references/reference_capabara_lightweight_model.md を参照

### Claude Opus 4.7 — コーディング+13%・xhigh・3.75MP（自動収集 2026-04-18）
2026-04-16リリース。SWE-bench Verified 87.6%、SWE-bench Pro 64.3%、Rakuten-SWE-Benchで前モデル3倍。新推論レベル「xhigh」追加（Claude Codeで全プラン既定値）。画像認識は1.15MP→3.75MP（長辺2576px）に3倍強化。指示追従性が大幅向上（旧プロンプトの再調整が必要な場合あり）。価格はOpus 4.6据え置き（入力$5/出力$25 per 1Mトークン）。API・Bedrock・Vertex AI・Foundryで提供。
> 詳細: references/reference_claude_opus_47_gigazine.md, reference_claude_opus_47_sbbit.md を参照

### Opus 4.7 詳細ガイド（自動収集 2026-04-20）
Opus 4.6から2ヶ月でリリース。3進化軸: 長時間タスク安定性・指示追従精度（リテラル解釈化）・ビジョン3.75MP。SWE-bench Pro 64.3%（+10.9pt）、OSWorld 78.0%。新機能: xhigh effort level・/ultrareview・Task Budget。価格据え置き$5/$25。移行注意: トークナイザ変更で最大1.35倍コスト増、明示的指示が必須に。
> 詳細: メモリ内 reference_claude_opus_47_complete_guide.md を参照

### Opus 4.7 ビジョン能力の飛躍（自動収集 2026-04-21）
最大の進化はビジョン: visual-acuity 54.5%→98.5%（+81%相対向上）、画像解像度long edge 2,576px（従来の3倍超ピクセル対応）。コーディング: SWE-bench Pro 64.3%（+10.9pt）、Terminal-Bench 2.0 69.4%。xhigh effort level追加（5段階）、Bedrock東京含む4リージョン対応。価格据え置き（入力$5/M、出力$25/M）。注意: v2.1.111+必須、4/23にAPIデフォルト自動切替の可能性。
> 詳細: references/reference_opus_47_vision_serverworks.md を参照

### Claude Code Proプラン削除問題（自動収集 2026-04-22）
2026年4月21日頃、AnthropicがClaude CodeをProプラン（$20/月）からMaxプラン（$100+/月）へ告知なしで移行。pricing pageを静かに編集する形で実施され、X・Redditで「告知ゼロのプラン改悪」と強い批判。A/Bテスト（段階的展開）の可能性も示唆されている。
> 詳細: references/reference_claude_code_pro_plan_removal.md を参照

### Claude Opus 4.7 APIコード移行ガイド：破壊的変更3件と実装例（自動収集 2026-04-22）
モデルID `claude-opus-4-7`、1Mコンテキスト追加料金なし。破壊的変更3件: ①Extended Thinking budget廃止→Adaptive Thinking移行（`thinking: {type: "adaptive"}`）、②temperature/top_p/top_k廃止、③xhigh エフォートレベル追加（コーディング用途のデフォルト）。新トークナイザーで同テキストが最大1.35倍に増加するためコスト計算要注意。Batch API 50%割引は継続。ビジョン: 3.75MP（長辺2,576px）対応で視覚認識が飛躍的向上。Claude Codeでの/ultrareviewコマンドもOpus 4.7前提で再設計。
> 詳細: references/reference_claude_opus_47_api_code_qiita.md / reference_claude_opus_47_aidriven_vision_xhigh.md を参照

### Claude Managed Agents パブリックベータ詳細解説（自動収集 2026-04-23）
Messages APIとの違い: MAはマネージドインフラ上でエージェントが動作（長時間・非同期タスク向け）。3コンポーネント: Session（追記専用ログ・コンテキスト溢れ対応）・Harness（ツールルーティング・クラッシュ後wake()再起動）・Sandbox（Python/Node.js/Go実行、コンテナ交換可能）。料金: $0.08/セッション時間＋$10/1,000 Webサーチ。採用: Notion・楽天・Asana・Sentry。
> 詳細: references/reference_claude_managed_agents_teria.md を参照

### Proプラン削除騒動 Zenn分析：個人開発者視点のリスクと備え（自動収集 2026-04-23）
2026年4月21日のProプランからClaude Code削除騒動をZennで徹底分析。「2%テスト」説明の矛盾点（サポート文書全体書き換えがテスト規模と不整合）と経営的背景（逆ザヤ構造・Opus 4.7長時間実行コスト）を指摘。個人開発者向け対策: Max継続 vs Pro維持の判断基準・API従量課金の並行検討・契約解約リスク（再加入で新規ユーザー扱いになる可能性）。
> 詳細: references/reference_claude_pro_plan_removal_zenn.md を参照

### Proプラン撤退事件でプラン選び直し：ユースケース別推奨（自動収集 2026-04-23）
企業目線のプラン選択ガイド。個人軽利用=Pro $20、業務メイン=Max 5x $100、チーム開発=Team Premium $30/人。リスクヘッジ3戦略: API認証切替準備・代替ツール習得・ツール非依存ワークフロー設計。根本的問題提起: 「テスト実施済み」という事実が示す再発可能性を前提に計画すべき。
> 詳細: references/reference_claude_plan_selection_aiforall.md を参照

### Opus 4.7移行の破壊的変更3件と設計への影響（自動収集 2026-04-24）
400エラーになる変更: ①Extended Thinking固定予算廃止（Adaptive Thinkingへ移行）、②temperature/top_p/top_k禁止、③assistant prefill禁止。加えてトークナイザー刷新で同テキストが最大1.35倍に増加（コスト計算の見直しが必要）。設計対応: LLM呼び出しをアダプタ層でラップして変更耐性を確保・ゴールデンセットによるリグレッションテスト整備が推奨される。
> 詳細: references/reference_opus_47_breaking_changes_checklist.md を参照

### Claude Managed Agents完全ガイド（インフラマネージド・$0.08/時間）（自動収集 2026-04-25）
2026年4月8日パブリックベータ開始。サンドボックス実行・認証管理・チェックポイント・セッション管理をマネージドサービスとして提供し、従来自前実装が必要だったエージェントインフラを不要化。料金: トークン消費（通常API料金）+ $0.08/セッション時間の二層構造。Messages APIとの違い: 長時間実行チェックポイントが自動化・セッション管理が組み込み済み。7〜24時間にわたる自律実行・PR自動化・データパイプラインに最適。Notion・楽天・Asanaがベータパートナー。
> 詳細: references/reference_claude_managed_agents_claudelab.md を参照

### Claude Opus 4.7完全解説：SWE-bench 87.6%・xhigh・Task Budgets・各プラットフォーム（自動収集 2026-04-26）
2026年4月16日リリースのフラグシップモデル。SWE-bench Verified: 80.8%→**87.6%**、SWE-bench Pro: 53.4%→64.3%、ビジョン解像度: 1,120px→2,576px（3.75MP）。新機能: **xhigh Effort**（coding/agenticタスクのデフォルト推奨）・**Task Budgets**（エージェントループ全体のトークン予算制御）・Cyber Verification Program。**API破壊的変更3件**: ①`temperature`等非デフォルト値が400エラー ②`assistant prefill`廃止 ③固定thinking budgetが廃止。新トークナイザーで実質コスト最大35%増（料金据え置き・配額永久増量で補償）。Bedrock東京含む4リージョン・Vertex AI・Azure AI Foundry・GitHub Copilot対応。
> 詳細: references/reference_claude_opus_47_complete_aisouken.md, reference_claude_opus_47_aibridge_lab_review.md を参照

### Claude Code品質低下事件：モデル劣化ではなく製品層3変更が原因（自動収集 2026-04-27）
2026年3月〜4月にかけての品質低下はモデル自体の問題ではなく製品層の複数変更が重なった結果。影響製品: Claude Code・Agent SDK・Cowork（API経由利用は影響なし）。3原因: 推論負荷削減・キャッシュバグ・システムプロンプト制約。Anthropicの対応: `xhigh` 設定に引き上げ・バグ修正・全サブスクライバーの使用制限リセット。教訓: AIツールは製品層の変更でも品質が変動しうる。品質問題の透明な調査報告と対処でベンダー信頼性を示した事例。
> 詳細: references/reference_claude_quality_decline_xenospectrum.md, reference_claude_quality_report_hinakira.md を参照

### Claude Managed Agents — 経営者視点の5つの変化（自動収集 2026-05-01）

2026年4月パブリックベータ開始。「一問一答型」から「自律的な長時間実行」への転換を表す5変化: ①自動実行能力（人間介在なし）、②低コスト（$0.08/時間＝約12円）、③インフラエンジニア不要（Anthropicがインフラ管理）、④「何をAIに任せるか」が経営判断の核心に、⑤早期導入企業との差別化。初期採用: Notion・楽天・Asana・Atlassian・Sentry。
> 詳細: references/reference_claude_managed_agents_business_noisy.md を参照

### 2026年AIトレンド：エージェント実行力時代へ（自動収集 2026-05-01）

AIの競争軸が「モデル性能」から「エージェント実行力」へ移行。Claude 4.7（適応的思考・MCP・xhigh）、GPT-5.5（1Mコンテキスト・高速実行）、Gemini 3（Google連携）がそれぞれ差別化。Vibe Coding（詳細仕様書不要・AIとの対話で試行錯誤）が2026年の開発スタイルとして定着。コーディングエージェントがソフトウェア開発の主流ツールに。
> 詳細: references/reference_ai_trends_2026_claude47_qiita.md を参照

### Claude API Status監視・SLA設計・フォールバック実装（自動収集 2026-05-03）
2026年4月の重大障害3回（4/15: 2時間・4/28: 78分間）を受けた運用設計ガイド。Enterprise契約は99.99% SLA（月次4.4分上限）・Pro/Maxは保証なし。フォールバック設計3パターン: プロバイダー切替（OpenAI/Gemini）・モデル切替（Opus→Sonnet→Haiku）・リージョン切替。LiteLLMで `fallbacks=["gpt-4o"]` 設定が最短実装。Datadog/PagerDutyと`status.claude.com`の連携でアラート早期化。よくある失敗4選: SLAをプラン問わず同一と思い込む・フォールバック先の品質差未検証・監視をステータスページ目視任せ・障害時ユーザーメッセージ未準備。
> 詳細: references/reference_claude_status_monitoring_uravation.md を参照

### Claude Code サードパーティ制限の全容：OpenClaw・OpenCode ユーザーへの影響（自動収集 2026-04-28）
2026年4月4日のポリシー変更：Pro/MaxサブスクでOpenClaw等サードパーティツール経由の利用を制限。背景: $200/月サービスが実態では$1,000〜$5,000/日のコスト負担（構造的コスト超過）。**重要**: サードパーティ利用自体の禁止ではなく「サブスク経由のみ禁止」。APIキー直接利用（従量課金）は引き続き完全利用可能。対応選択肢3つ: ①Extra Usage追加（4/17期限）②APIキー直接利用（プロンプトキャッシュで最適化）③公式Claude Codeへ移行。長期的にはAnthropicがAPIエコシステムと消費者向けサブスクを明確に分離する方針。
> 詳細: references/reference_claude_code_third_party_policy.md を参照

### Claude Codeが2026年2月に爆発した理由：性能×体験共有×現実味の臨界点（自動収集 2026-05-05）
Claude Code登場（2025年2月）→Opus 4.5で非エンジニアも活用開始→**2026年2月5日のOpus 4.6が決定的転機**。「数時間の自律稼働」「DB設計まで完結」体験談がXで雪崩式に拡散。SemiAnalysis: 「GitHub公開コミットの4%がClaude Code由来、年末に20%超見込み」。普及の公式: 性能向上×体験共有爆発×現実味=臨界点突破。コミュニティへの体験共有（Zenn・Qiita・note）がエコシステム形成に不可欠という示唆。
> 詳細: references/reference_claude_code_why_exploded_yupy.md を参照

### Claude Sonnet 4.8：流出51万行コードから判明した次世代モデルの全貌（KAIROS・Cardinal・Mythos）（自動収集 2026-05-10）
2026年3月31日のnpmパッケージ誤配布で約51万行のTypeScriptコードが流出。Sonnet 4.8（Sonnet 4.7は存在せずOpus 4.7の次がSonnet 4.8）の新機能として①KAIROS（バックグラウンド常駐型永続エージェント）②Undercover Mode（API呼び出し時のモデル名マスク）③Cardinal（98.5%視覚精度をSonnetへ移植）④Mythos（Opusを超える最高位モデルの可能性）が確認された。価格はSonnet 4.6と同じ$3/$15据え置き予想。2026年5月「Code with Claude」（SF/London/Tokyo）での公式発表が有力。
> 詳細: references/reference_claude_sonnet_48_leak_analysis_note.md を参照

### Claude Code 2026年5月ニュースまとめ — Opus 4.7・xhigh effort・Agent SDK更新（自動収集 2026-05-17）
Qiita（株式会社Good Lab）による2026年5月の主要アップデート網羅記事。①Opus 4.7: 1Mコンテキストが標準価格に統合・新トークナイザー・xhigh effortレベル追加②プラグインマーケットプレイス強化: `--plugin-url`でURL指定インストール・`--plugin-dir`でZIPアーカイブ対応③Hooks × effort level連携: 環境変数`$CLAUDE_EFFORT`で条件分岐④`claude project purge`コマンド追加⑤`/resume`が大型セッションで最大67%高速化⑥Agent SDK v0.1.71〜v0.1.80フックevent streamingなど複数更新。Tipsとして「Opus 4.7移行後のmax_tokens見直し」「大型プロジェクト定期メンテ」を推奨。
> 詳細: references/reference_claude_code_news_may2026_qiita.md を参照

### AnthropicとGates財団が4年間2億ドルのAI社会貢献パートナーシップ発表（自動収集 2026-05-19）
2026年5月14日、AnthropicとBill & Melinda Gates財団がグラント・Claudeクレジット・技術サポートを含む4年間2億ドルのパートナーシップを締結。AI企業と世界的慈善財団の協業としては最大規模。重点領域4分野：①グローバルヘルス（ポリオ・HPV・妊産婦死亡率などの疾患研究に活用）②教育（米国・サブサハラアフリカ・インドのK-12向けAIチュータリング）③農業・経済的流動性（作物特化Claudeとスキル記録ツール）④ライフサイエンス研究。「市場だけでは対応できない分野でAIの利益を拡大する」がAnthropicの方針。Gates財団は2026年1月にOpenAIとも$50Mでアフリカ医療プロジェクト（Horizon 1000）を組んでいる。
> 詳細: references/reference_anthropic_gates_foundation_itmedia.md を参照

### アクセンチュア「Anthropicビジネスグループ」を日本で始動：3万人体制で全社AI変革支援（自動収集 2026-05-19）
2026年5月1日よりアクセンチュアが「アクセンチュア Anthropic ビジネスグループ」を始動。グローバルで約3万人のClaudeスペシャリストを体制化し、日本企業の①全社AI変革②ソフトウェア開発刷新③レガシーシステム現代化④サイバーセキュリティ変革の4領域を経営層から実装まで一貫支援。日本の主要コンサルが専任組織を立ち上げたことで、大企業・金融・製造など規制業種でのClaude導入が本格化する見込み。
> 詳細: references/reference_accenture_anthropic_japan_2026.md を参照

### Claude Code 週次アップデートまとめ（2026/05/23週）：週次制限50%拡大・Computer Use CLI macOS・スキル検索強化（自動収集 2026-05-25）
2026年5月23日週の主要アップデート4点。①週次総量上限50%拡大（7月13日まで時限措置・全プラン対象）：SpaceX Colossus 1データセンター（GPU22万台超）の利用契約に基づく措置。②Computer Use CLI macOS版（v2.1.85以降・Pro/Maxリサーチプレビュー）：CLIからmacOSのUI操作（クリック・スクロール・スクリーンショット）が可能に。③`/skills`コマンド強化：マーケットプレイスのスキル・プラグインをリアルタイムでキーワード絞り込み検索。④Claude Security パブリックベータ（Enterprise向け）：コード脆弱性の自動スキャンと修正提案。
> 詳細: references/reference_claude_code_weekly_updates_0523_saitoko.md を参照

### AnthropicのビジネスAI採用率がOpenAIを初めて上回る：34.4% vs 32.3%、Claude Opus 4.7が牽引（自動収集 2026-05-25）
2026年4月にAnthropicのビジネスAI採用率34.4%がOpenAI（32.3%）を初めて逆転。逆転の3要因：①Claude Opus 4.7のコーディング性能（複雑・長時間タスクで厳密性と一貫性を発揮）②Moody'sとのデータパートナーシップで金融サービス向けAIエージェントを先行投入③Project Glasswing/Claude Securityでセキュリティ担当者層の早期採用を確保。開発者調査（2026年2月・15,000名）ではAIエージェント頻用層の71%がClaude Codeを第一選択。ただし企業は用途別に両社を併用する設計が現実的と評価されている。
> 詳細: references/reference_anthropic_surpasses_openai_technoisy.md を参照

<!-- 日常で得た知見をここに追記 -->
