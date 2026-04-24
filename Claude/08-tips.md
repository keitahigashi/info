# プロンプト技法・ベストプラクティス

## プロンプトの書き方

### 結論ファースト

最初の1文で「何をしたいか」を明確にし、次に「なぜ」「制約」を添える。

```
○ 「認証機能のテストを追加したい。理由はXXバグの再発防止。既存テストを壊さないこと」
× 「えーと、先日XXというバグがあって、認証周りが怪しいので、テストがあるといいかなと...」
```

### 1ターン1〜2タスク

3つ以上の独立タスクがある場合はPlanモードで全体像を先に固める。

### コンテキストを明示的に渡す

- 「このファイルの `Foo` クラスを見てから判断して」
- 「既知の制約: XXは変更できない、YYは後で対応」
- 仮定を置かず、不明点は質問する

---

## コンテキスト管理

### コンテキストの節約

| 手法 | 効果 |
|------|------|
| 必要なファイルだけRead | 不要な情報を読み込まない |
| Grepで事前に絞り込んでからRead | ピンポイントで読む |
| 大きなファイルはlimit/offsetで部分読込 | 全行読まない |
| サブエージェントに委譲 | メインのコンテキストを温存 |
| `/compact` で圧縮 | 会話履歴を要約 |
| `Esc+Esc` で巻き戻し/要約 | 不要な履歴を削除 |

### /compact のタイミング

**使う**: デバッグの往復が多い時、大きなファイルを読んだ後
**避ける**: 設計・計画フェーズ（文脈が落ちると方向性がズレる）
**目安**: コンテキスト使用率50%到達時に手動 `/compact` 推奨（`/context` で確認）

`/compact` 後は「前提は変わらない」と明示すると効率的。

### 質問攻めしてもらうテクニック

指示の最後に「不明点があればクリアになるまで質問して」と一言追加する。

```
認証機能を実装して。あいまいな点があれば、クリアになるまで質問して。
```

ClaudeがAskUserQuestionで選択肢を提示してくれるので、番号を選ぶだけで仕様が具体化する。自分で気づかなかった考慮漏れも洗い出せる。

---

## サブエージェント活用のコツ

- **調査はサブエージェントに任せる**（メインのコンテキスト温存）
- **1サブエージェント = 1タスク**（複数詰め込まない）
- **独立タスクは並列起動**（1メッセージ内で複数Agent呼び出し）
- **委譲時に前提を明示**（ルール・制約・期待する出力形式）
- **失敗しても問題ないPOCはサブエージェントで**（メインが汚れない）

---

## メモリシステムの活用

### 分類

| タイプ | 内容 | 例 |
|--------|------|-----|
| user | ユーザーの役割・好み | 「C#メイン、xUnit優先」 |
| feedback | 行動の修正指示 | 「テストなしで完了報告しない」 |
| project | 進行中の作業の状況 | 「認証機能実装中、決済は未着手」 |
| reference | 外部リソースの場所 | 「バグはLinearのINGESTプロジェクト」 |

### 更新のルール

- 重要な判断があったら即座に記録
- 重複チェック → 矛盾があれば確認
- コードから読み取れる情報は保存しない

---

## セッション最適化チェックリスト

### 開始時
- [ ] CLAUDE.mdが読み込まれているか
- [ ] 権限設定は適切か
- [ ] タスクの規模感を見積もる（3ステップ以上→Plan）

### 実行中
- [ ] ファイルを無駄に読み込んでいないか
- [ ] Grep/Globで事前絞り込みしているか
- [ ] 1メッセージ1〜2タスクに収まっているか

### 完了時
- [ ] テストを実行して動作確認した
- [ ] 既存テストを壊していないか
- [ ] 新しい知見があればナレッジベースに追記

---

## Anthropic社員の実践テクニック

出典: [Anthropic社員のClaude Code活用術8選](https://zenn.dev/happy_elements/articles/046faa4f61d98f) (ko.+, 2026-03-18)

### 並列セッション運用（Boris Cherny）

ローカル5 + リモート5〜10セッション同時稼働。各セッションは独立したgit checkout（物理分離）。セッション破棄は想定内。

### Task Diary（セッション横断の知識蓄積）

タスク完了時に日記エントリを記録: 試みた内容、うまくいった点、失敗と理由。蓄積した観察結果をCLAUDE.mdに統合→以降の全セッションが賢くなる「複利的エンジニアリング」。

### Stop Hookでテスト通過を完了条件に

確率的モデルから「確定的成果」を引き出す。テスト全通過まで完了させない。

### TDD実装分担

| ステップ | 担当 |
|---------|------|
| テストケース設計（入出力定義） | 人間 |
| テストコード記述 | Claude |
| 実装コード記述 | Claude |
| テスト実行・修正ループ | Claude |
| レビュー | 人間 |

検証フィードバックループで最終品質2〜3倍向上（Boris Cherny実績）。

### 戦略分岐: ゴール明確時 vs 曖昧時

- **明確** → Plan Mode → 計画確定後にauto-acceptで一発実装
- **曖昧** → 使い捨てプロトタイプ → 出力から必要事項発見 → 正式仕様作成（初回は破棄前提）

共通: 「成功基準の定義」がステップ指示より重要（例:「テスト全部通ればOK」）

---

## フィードバックループの4段階

出典: [カンリー社内Claude Code勉強会](https://zenn.dev/canly/articles/cc0891517e45cc) (ふくだ, 2026-02-12)

| 段階 | 内容 | いつ使う |
|------|------|---------|
| 1. その場で修正 | 手軽だが毎回同じやり取り | 今すぐ直したい |
| 2. 人間がルール化 | 修正経緯を分析しCLAUDE.mdに追記 | 同じ問題が2回以上 |
| 3. Claudeにルール化させる | 「最初からこの出力を出すにはどんな指示が必要だった？」 | 言語化が難しい |
| 4. 自動ルール改善 | GitHub Actionsで修正指摘を自動分析しCLAUDE.md更新PR | チーム全体の品質向上 |

**注意**: ルールは定期的にリファクタリング。モデル性能向上で不要になるルールもある。

---

## Rate Limit との付き合い方

- 最初の5時間: 調査とタスク化に集中
- 次の5時間以降: 自動実装に流し込む
- `/usage` で残量確認。並列化・長文コンテキスト放置は週次消費加速要因
- Planモード承認時「Yes, clear context and auto-accept edits」で調査ノイズを削除して実行開始

---

## 仕様駆動開発（SDD）

出典: [Claude Codeで仕様駆動開発、tsumikiが良かった](https://zenn.dev/hidechannu/articles/20260314-spec-driven-development-tsumiki) (hidechannu, 2026-03-11)

「思考は手放すな、作業を任せろ」— 人間が要件定義と設計で曖昧さを排除し、AIがタスク化以降の実装を担う。

### SDDツール

| ツール | 特徴 |
|--------|------|
| [tsumiki](https://github.com/classmethod/tsumiki) | 信号機システム（青=確実/黄=推測/赤=要議論）で不確実性を可視化。TDDフロー内蔵 |
| [cc-sdd](https://github.com/gotalab/cc-sdd) | 基本的なSDD支援 |
| [OpenSpec](https://github.com/Fission-AI/OpenSpec) | 仕様書生成特化 |

基本フロー: 要件定義 → 設計 → タスク化 → TDD実装（Red→Green→Refactor→Verify）

---

## Why/Whether を手放すな

出典: [AIを使うほど、判断力が落ちる人がいる理由](https://zenn.dev/cognitiveosmdl/articles/231033371a6735) (cognitiveosmdl, 2026-03-21)

AIは「どう書くか（How）」に特化した装置。「なぜ（Why）」「そもそもやるべきか（Whether）」は人間が保持する。

| 先鋭化する人 | 低下する人 |
|------------|----------|
| Why/Whetherを自分で保持しHowだけ委託 | 全てをAIに委託 |
| AIの出力を「下書き」として検証 | 「AIがそう言っているから」を根拠 |
| 判断の頻度と密度が上昇 | 差分処理が発生せず判断精度低下 |

**3つのアクション**:
1. AIに投げる前に「なぜこれを作るのか」を一行書く
2. AIの出力に対して「これでいい理由」を一文で言語化
3. 定期的にAIなしで判断する時間を確保

---

## プチ仕様駆動開発

Claude Codeで作業する際に4つのドキュメントを活用するフレームワーク。

| ファイル | 目的 | 例 |
|---------|------|-----|
| PLAN.md | やりたいことを音声入力で一気にダンプ | 企画の想い・対象者 |
| SPEC.md | 仕様の壁打ち・齟齬解消 | 構成・ストーリー・強調点 |
| TODO.md | タスク管理・コンテキスト保持 | 各ステップの進捗 |
| KNOWLEDGE.md | 学習・ハマり防止 | NG表現・スタイル記録 |

### 音声入力の活用

Aqua Voice等で「えっと〜」などの冗長な音声もそのまま入力。Claude Codeが自動解釈してくれるため、キーボード入力では得られない情報量（数千文字分）を一気に渡せる。AIに「生成」させるのではなく、自分の思考を「整理」させる使い方。

---

## MCP vs Skills vs CLAUDE.md の使い分け

| 機能 | 準備 | コンテキスト消費 | 用途イメージ |
|------|------|-----------------|-----------|
| CLAUDE.md | 低 | 常時 | 社訓・行動規範（常に意識すべきルール） |
| MCP | 低 | ツール呼び出し時 | 汎用SaaS連携（全機能サポート） |
| Skills | 高 | 実行時のみ | 業務マニュアル（特定用途の手順化） |

**判断基準**: 常に認識が必要→CLAUDE.md、特定場面で必要→Skills、何度も使うMCP機能→Skillsへ移行検討

---

## 外部エージェント集の活用（agency-agents）

[agency-agents](https://github.com/msitarzewski/agency-agents) — 144個のAIエージェント定義をMarkdownで提供するOSS。

```bash
git clone https://github.com/msitarzewski/agency-agents.git
cd agency-agents
./scripts/install.sh --tool claude-code --no-interactive
# → ~/.claude/agents/ に配置
```

12カテゴリ（Marketing 26、Engineering 23、Specialized 23、Design 8、Testing 8 等）。全カテゴリ一括導入はコンテキスト過多になるため、業務に近いカテゴリから始める。

---

## 実践メモ

- 出典: [Claude Codeですべての日常業務を爆速化しよう！](https://qiita.com/minorun365/items/114f53def8cb0db60f47) (@minorun365, 2026-03-01)
- 出典: [Claude Code 知らないと損するコマンド・時短術 20選](https://qiita.com/miruky/items/48ede59ebe33b4b774ac) (@miruky, 2026-03-16)
- 出典: [ClaudeCodeの中級者になりたい人は集合してください](https://qiita.com/K5K/items/72cc4282819ace823524) (@K5K, 2026-03-13)
- 出典: [agency-agentsでClaude Codeに144種類のエージェントチーム作成](https://qiita.com/nogataka/items/5b5747f619e6eb745436) (@nogataka)
### 非技術者のClaude Code運用事例 — Anthropic社内（自動収集 2026-03-26）

Anthropicグロースマーケティングチーム（非技術者1人）がエンジニアなしでGoogle Ads自動生成・Figmaプラグイン開発・Meta Ads MCP構築を実現。**3つのコツ**: (1) API保有ツールの反復作業を狙う（広告PF・デザインツール・分析基盤）、(2) タスク分割で専門サブエージェントを配置し品質確保、(3) 即座にコーディングせず段階的に設計。成果: 広告コピー作成2時間→15分、クリエイティブ生産量10倍。

> 詳細: メモリ内 `reference_anthropic_marketing_claude_code.md` を参照

### 105+ Skills実践運用 — AI Nativeの事例（自動収集 2026-03-27）

AI Native社が105+Skillsを4カテゴリ（開発40/コンテンツ37/SEO15/基盤13）で運用。5つの専門サブエージェント（コードレビュー・セキュリティ監査・パフォーマンス分析・SRE評価・PR作成）を並列稼働。Max 20xプラン（$200/月）で8並列同時操作、月額10〜20万円規模。Opus 4.6は日本語を英語と同等品質で処理。

> 詳細: メモリ内 `reference_claude_code_complete_guide_ainative.md` を参照

### 非エンジニア向けClaude Code活用術5シーン（自動収集 2026-03-27）

100社研修実績に基づく5業務シーン: CSV分析→グラフ（80-85%削減）、競合調査レポート（75-80%削減）、議事録→アクションアイテム（75-80%削減）、週次レポート（85-90%削減）、メール返信ドラフト一括（83-85%削減）。活用型: ファイル処理型→情報収集型→自動化型の順で難易度UP。避けるべき5ミス: パス不完全指定、権限無視、数字無検証、プロンプト過剰、日本語ファイル名文字化け。

> 詳細: メモリ内 `reference_claude_code_non_engineer_guide.md` を参照

### 専門家ペルソナプロンプトの精度低下（自動収集 2026-03-28）
南カリフォルニア大学の研究で、LLMに「あなたは専門家です」と役割を与えると知識精度が低下することが実証された（MMLU: 71.6%→68.0%）。特に事実検索・数学タスクで悪影響が大きい。一方、安全性（53.2%→70.9%）やライティング品質には有効。タスク種類に応じたペルソナの使い分けが重要で、PRISMという動的ルーティングシステムが提案されている。
> 詳細: メモリ内 `reference_expert_persona_prompt_accuracy.md` を参照

### 公式ベストプラクティス: 一般的な失敗パターンと対策（自動収集 2026-03-29）
公式ドキュメントが列挙する5つの失敗パターン: (1) キッチンシンクセッション（関連のないタスク混在→`/clear`）、(2) 何度も修正（2回失敗後→`/clear`+良い初期プロンプト）、(3) 過度なCLAUDE.md（重要ルール埋没→削除 or Hooks化）、(4) 検証ギャップ（テスト・スクリーンショット必須、検証は最も高いレバレッジ）、(5) 無限探索（無スコープ調査→サブエージェント使用）。プロンプトの具体性が高いほど修正が少なくなる。Claudeにインタビューさせる手法（AskUserQuestion→SPEC.md→新セッション実装）も推奨。
> 詳細: メモリ内 `reference_claude_code_best_practices_official.md` を参照

### 引き継ぎプロンプトによるコンテキスト管理（自動収集 2026-03-29）
長いチャットセッションの切り替え時に「要約」ではなく「作業引き継ぎメモ」を作成する手法。8項目（目的・移行理由・背景・経緯・決定事項・未解決事項・次の依頼文・完成形文章）を構造化して整理する。「短くすること優先ではなく、次のチャットで困らないこと優先」がポイント。Claude Codeのauto-compactionの補完として、ユーザー主導の引き継ぎポイント明示にも応用可能。
> 詳細: メモリ内 `reference_chatgpt_handover_prompt.md` を参照

### 思考拡張キーワードとSerena LSP（自動収集 2026-03-30）
思考拡張で推論リソースを制御: `think`(4,000トークン)→`think hard`(10,000)→`think harder/ultrathink`(31,999)。Serena MCP（LSPベースコード解析）でシンボルベース解析、トークン消費削減・精度向上。ccmanager（`npm install -g ccmanager`）でGit Worktree並列作業を効率管理。CLAUDE.mdに「英語思考、日本語応答」設定が有効との報告。
> 詳細: メモリ内 `reference_claude_code_project_tips_10.md` を参照

### ライトユーザー向け万人受け便利設定6選（自動収集 2026-04-01）
(1) ユーザーメモリで全プロジェクト共通ルール (2) 音声フィードバック（PermissionRequest/Stop時にafplay） (3) statusline.shでコンテキスト使用率%表示 (4) MCP活用（Context7・Playwright・Chrome DevTools） (5) サブエージェント分離（技術調査・テスト用）でコンテキスト圧縮防止 (6) 参照系操作のみ自動承認。`claude-code-guide`ビルトインサブエージェントが設定支援可能。
> 詳細: メモリ内 `reference_claude_code_light_user_settings.md` を参照

### Claude Code開発者のための完全ガイド（自動収集 2026-04-01）
9パート構成の網羅的ガイド。会話管理6機能（Rewindが最頻出）、MCP 3層構造（AIアプリ→プロトコル→Transport）、Plan Mode 4権限モード、Worktree並列作業、`/effort low|medium|high|max`の推論レベル制御、ヘッドレスモード（`claude -p`+JSON出力+セッション引き継ぎ）、CLAUDE.md 3階層配置+`/init`自動生成。場面別逆引きリファレンス付き。
> 詳細: メモリ内 `reference_claude_code_developer_complete_guide.md` を参照

### 実践Claude Code入門 — 3つの構造的課題と解決策（自動収集 2026-04-01）
コーディングエージェントの3課題を体系化: (1) コンテキスト忘却→構造化ノート(`.steering/`)＋サブエージェント分離 (2) 意図不一致→Skills(3切り口: 成果物・タスク・ドメイン)＋Hooks(絶対ルール強制) (3) 外部連携不能→MCP＋CLIツール。段階的導入順: CLAUDE.md→Skills→Hooks→MCP。機能選択の判断基準表付き。
> 詳細: メモリ内 `reference_practical_claude_code_introduction.md` を参照

### Claude Code全社導入の意思決定（自動収集 2026-04-02）
Web受託開発Gemcookの導入史: Copilot(2023/02, 効果限定的)→Devin(2025/01, 期待より限定的)→Claude Code実験(2025/02, 「6-7割をAIに任せられる」)→全社導入(2026/02)。選定理由: 実装品質と速度のバランス・普及度・Teamプラン運用性。教訓: 「1-2ヶ月で導入是非を判断」「完璧な決定を待たない」。
> 詳細: メモリ内 `reference_claude_code_company_wide_gemcook.md` を参照

### Claude Codeでできること20選（自動収集 2026-04-02）
4カテゴリ20機能: 開発7(コード生成・リファクタ・テスト・デバッグ・Git・APIドキュメント・レビュー)、ビジネス6(データ分析・レポート・営業メール・議事録・企画書・契約書)、クリエイティブ4(ブログ・画像分析・翻訳・プレゼン)、運用3(デプロイ・セキュリティチェック・バッチ処理)。各機能にコピペ可能なプロンプト例付き。「Codeはあらゆる構造化された作業の自動化を意味する」。
> 詳細: メモリ内 `reference_claude_code_features_20_uravation.md` を参照

### Claude Code完全入門ガイド 2.7万文字（自動収集 2026-04-02）
バイブコーディング5ステップ: (1)目的整理 (2)GPT-5 deep Researchで要件明確化 (3)Best practicesをシステムプロンプトに (4)Maxプランで開発 (5)CodeXでエラー対応。月額400円活用術（API従量課金最適化）。おすすめSkills・SubAgents情報。SaaSの未来展望。
> 詳細: メモリ内 `reference_claude_code_complete_guide_chaen.md` を参照

### Claude Code完全リファレンス — PR品質ゲート（自動収集 2026-04-04）
PR作成前の品質ゲートチェーン: /simplify→/security-review→/diff→/commit-push-pr。
便利機能: Ctrl+S（下書き保存でセッション中断に備える）、#テキスト（auto-memoryへの即時記録）、スパースworktree（大規模モノレポでの並列作業効率化）。
「!コマンド」でClaude経由せずシェル直接実行し、出力を会話コンテキストに追加可能。
> 詳細: references/reference_claude_code_complete_reference_nogataka.md を参照

### 上級テクニック: Hooks設計・コスト最適化（自動収集 2026-04-04）
Hooks設計原則「Block-at-Submit, not Block-at-Write」: AIの思考フローを妨げないゲート設計。サブエージェントは小さく単機能なSkillの組み合わせ推奨。コスト最適化: CLAUDE.md 500行以下の「広告スペース」原則、新規セッション約20Kトークンがベースライン。CI/CDヘッドレスモードでGitHub Actions統合可能。
> 詳細: references/reference_claude_code_advanced_techniques_aqua.md を参照

### 初心者向けベストプラクティス: テスト駆動開発フロー（自動収集 2026-04-06）
TDDフロー: テスト記述→失敗確認→テストコミット→実装記述→実装コミット。ビジュアルモック開発: デザイン画像→実装指示→スクリーンショット確認→反復修正。コンテキスト管理: `/clear`で全リセット、`/compact`で要約圧縮、`/init`でCLAUDE.md更新。
> 詳細: references/reference_claude_code_best_practice_beginner.md を参照

### Claude Code実践事例集: 効率の幻想と協働設計（自動収集 2026-04-07）
METR調査で「体感20%高速化→客観測定19%遅化」が判明。定型業務（テスト生成・ドキュメント）はAI、文脈依存判断（アーキテクチャ・セキュリティ）は人間に分業が処方箋。Rimo社: 3-5時間の広告分析→体感7分（BigQuery+Salesforce CLI統合・70-100項目チェックリスト）。アソビュー CPO: 非エンジニアが11個の自動化構築（毎朝7時自動実行・Slack連携）。Oh-My-ClaudeCode: 32種専門エージェント・5実行モード・自動モデルルーティングで30-50%トークン削減。
> 詳細: references/reference_claude_code_daily_discoveries_apr02.md を参照

### ワークフロー設計の実践: 移譲レベルとProgressive Disclosure（自動収集 2026-04-07）
タスクごとに移譲レベル（Consult/Agree/Inquire/Delegate）を設定し適切な協業形態を選択。「エージェントはコンテキストがすべて」の原則。CLAUDE.mdは80%のタスクで必要な情報のみ→Skills/Commandで段階的供給。ツール選択指標: Slash Command=人間直接実行、Skill=複数セッション再利用、Subagent=複雑な責務の独立実行。
> 詳細: references/reference_sms_workflow_design.md を参照

### Claude Code加速スキル・ツール・設定14選 — Ubie Findy登壇（自動収集 2026-04-09）
Raycastホットキー・スニペットで起動高速化、CleanShot X OCRでトークン節約。ghq+pecoでリポジトリ管理統一、Multi-Folder Git Cloneで並列作業。`/btw`（軽量質問）・`/fork`（会話分岐）・`/rewind`（巻き戻し）で複数会話管理。feature-devプラグイン（7フェーズ開発フロー）、nano-banana-2-skill（画像生成）。情報キャッチアップ: RSSHub→Gemini翻訳→ハイライト→Obsidian保存パイプライン。
> 詳細: references/reference_claude_code_tips_findy_ubie.md を参照

### 50 Claude Code Tips — Builder.io包括ガイド（自動収集 2026-04-10）
英語圏の代表的ベストプラクティス50選。6カテゴリ構成: ①Plan Mode（複雑タスクの事前構想整理）、②CLAUDE.md設計（永続コンテキスト・コーディング規約明文化）、③サブエージェント（専門分割で品質向上）、④Worktree並列開発（コンテキスト切り替えなし並行作業）、⑤Hooks自動化（コミット前lint/テスト/フォーマット）、⑥MCP統合（外部サービス連携パイプライン）。基本方針: 明確なコンテキスト提供・大タスク分割・生成コード検証。
> 詳細: references/reference_50_claude_code_tips_builder.md を参照

### Advisor Tool — 適材適所モデル配置でコスト最適化（自動収集 2026-04-11）
Sonnet/Haikuをエグゼキューター、Opusをアドバイザーに配置。APIヘッダー`anthropic-beta: advisor-tool-2026-03-01`とtools配列`type: advisor_20260301`で実装。効果: コスト11.9%削減＋精度2.7pt向上。Haiku+Opusの組み合わせはBrowseCompで19.7%→41.2%と劇的改善。全処理をOpusで流すより、判断ポイントだけ相談する設計が鍵。
> 詳細: references/reference_advisor_tool_cost_reduction.md を参照

### 非開発者が1ヶ月で39個の業務自動化ツール作成（自動収集 2026-04-11）
SIerインフラ/セキュリティ担当（非プログラマー）がPython約17,000行を生成。5カテゴリ: 日常業務・ドキュメント生成（最大）・情報収集・インタラクティブHTML・高度な自動化。成功原則: 小さく始める・要件明確化・CLAUDE.mdで環境ルール・仕様文書化・レビュープロセス。組織図生成30分→3分。Claude Codeは「業務課題解決ツール」であり「プログラミング学習ツール」ではない。
> 詳細: references/reference_non_developer_39_tools.md を参照

### トークンコスト52%削減の実測テクニック（自動収集 2026-04-12）
月額$312→$144達成。最大効果: セッション分割（30%削減、1タスク1セッション・20往復目安）。CLAUDE.mdダイエット（2,800→950トークン、66%圧縮）。.claudeignore（45→18ファイル、62%削減。対象: dist/, .next/, lock系, *.sql, generated/）。Skill再利用（毎回450→80トークン、再指示率30%→5%）。/compact活用（カスタム指示で必要情報のみ保持）。段階的導入で2ヶ月かけて定着。
> 詳細: references/reference_token_cost_52_percent_reduction.md を参照

### AI臭さの正体とコンテキストエンジニアリング7手法（自動収集 2026-04-13）
スロップの本質は表面的マーカーでなく「反証可能な主張へのコミットメントの欠如」。LLMは増幅器であり、信号なければノイズを増幅。実践7手法: (1)角度を渡す (2)文体見本を貼る (3)やるなリスト明示 (4)状況詳述 (5)先に質問させる (6)段階的生成+各段階介入 (7)自己評価要求。根本原則: コンテキストエンジニアリング（何を聞くかより何を見せるか）で注意予算を固有文脈で埋める。
> 詳細: references/reference_ai_slop_context_engineering.md を参照

### AWSサーバーレス開発でのClaude Code活用（自動収集 2026-04-14）
大規模AWSサーバーレスプロジェクト（TS 3万行・Lambda 20+・Terraform 170+）での実践事例。Lambda関数追加が数時間→30分、Terraform追加が1時間→15分に短縮。成功の鍵は「CLAUDE.mdの質 = 生成コードの質」で、コーディング規約・テスト方針・Terraformルール・API設計標準を明文化すること。既存パターンの踏襲作業で最も効率化が顕著。IAMポリシーのレビュー省略や複雑ロジックの一発生成は避けるべき失敗パターン。
> 詳細: メモリ内 reference_claude_code_aws_serverless.md を参照

### claude-code-best-practice 定量指針5つ（自動収集 2026-04-18）
45,400+ Stars リポジトリの定量運用指針: (1)CLAUDE.md 200行以下 (2)PR分割中央値118行 (3)コンテキスト使用率50%で手動/compact・80%で自動compact(`CLAUDE_AUTOCOMPACT_PCT_OVERRIDE`) (4)小規模タスクはvanilla ccがワークフローより効率的 (5)複雑タスク前は必ずPlan Mode。settings.json権限3層: allow(日常25項目)・ask(破壊的22項目)・deny空。Cross-Model検証: Plan(Claude)→QA(Codex)→Implement(Claude)→Verify(Codex)でバイアス回避。
> 詳細: references/reference_claude_code_best_practice_quantitative.md を参照

### プロンプト設計術7テクニック（自動収集 2026-04-20）
初回正答率を大幅向上させる7手法: (1)ゴールファースト（最終状態を冒頭に）、(2)制約の明示（やってはいけないこと）、(3)Before/After提示（変換パターンの具体例）、(4)段階的タスク分解、(5)検証手順の組み込み（テスト・lint・curl）、(6)CLAUDE.mdとの連携（チーム全員Git共有）、(7)コンテキストウィンドウ最適化（/compact・/mcp disable）。必須: ゴールファースト・制約明示・CLAUDE.md連携。
> 詳細: メモリ内 reference_claude_code_prompt_engineering_7.md を参照

### Obsidian Vault連携プロジェクト運用（自動収集 2026-04-20）
Claude Code専用プロジェクトでObsidian Vaultに成果物集約。6フォルダ分類（daily/coding/research/docs/references/archive）をCLAUDE.mdのルール表で自動化。settings.jsonでmodel・effortLevel・思考量を固定し安定運用。everything-claude-codeプラグインで8種スラッシュコマンド活用。USB/ZIP移行可能なポータブル設計。
> 詳細: references/reference_claude_code_obsidian_vault_project.md を参照

### Claude Code Meetup Japan #4 技術知見（自動収集 2026-04-21）
Microsoft会場LT大会14セッション。注目知見: Planner→Builder→Variator 3段階で音声→1-3hプロトタイプ自動生成。PRD.md+spec.json+context.jsonの3ファイル要件定義自動化。Kaggle 3,800チーム中5位（人間=アイデア、AI=実装のロール分担）。組織展開: Team Plan+Managed Settings+Jamf(MDM)で数百台一元配布。M5Stackロボット開発でも有効性実証。
> 詳細: references/reference_claude_code_meetup_japan_4.md を参照

### Claude Codeと暮らす: 母艦ワークスペース運用（自動収集 2026-04-22）
個別プロジェクトではなく統一ワークスペースを母艦に運用。記憶基盤はGraphiti+FalkorDB（因果関係検索）とPostgreSQL+pgvector（セマンティック検索）の二刀流、Ollamaでローカル処理。朝`/morning`→午前`/context-load`→午後`/research`→終業`/daily-log`の1日パターン。SessionEndフックで自動サマリー→ナレッジグラフ登録。Happy CLI（E2E暗号化）でモバイルからも接続。
> 詳細: references/reference_claude_code_daily_living.md を参照

### Claude Code 9つの知られざる機能と4層フレームワーク（自動収集 2026-04-23）
基本操作（Focus View=Ctrl+O可読性3倍・/btw割り込み質問・/buddy 18種ペット）→計画設計（Ultra Plan・/branch）→自動化（Channels webhook・Hooks pre_write/post_write）→スケール（Git Worktrees・/loop）の4層で習得。企業導入は1機能ずつ週1ペースで段階的に。シークレットは必ず環境変数で管理。
> 詳細: references/reference_claude_code_9_hidden_features_uravation.md を参照

### Boris Cherny直伝：Opus 4.7を最大限活かす6つのヒント（自動収集 2026-04-24）
Claude Code作者が語る6ヒント: ①自動モード（許可プロンプトを分類器が自動承認）、②`/fewer-permission-prompts`（セッション履歴から許可リスト推奨）、③リキャップ（長時間セッションの進捗要約）、④`/focus`（途中作業を非表示にして最終結果のみ表示）、⑤`/effort xhigh`（適応的思考強度をタスクに応じて調整）、⑥検証手段の提供（テスト→lint→PR作成の標準ワークフロー定義）。「古いワークフローでも改善は感じるが、調整すれば大きな飛躍になる」。
> 詳細: references/reference_opus_47_boris_cherny_tips.md を参照

<!-- 日常で得た知見をここに追記 -->
