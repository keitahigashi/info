# カスタムスキル（スラッシュコマンド）作成

## Skillとは

`.claude/skills/` に配置するMarkdownファイルで、`/skill-name` で呼び出せるカスタムコマンド。

## ディレクトリ構造

```
.claude/skills/my-skill/
├── SKILL.md              # 必須：メイン説明
├── reference.md          # オプション：詳細資料
├── examples.md           # オプション：使用例
└── scripts/
    └── helper.sh         # オプション：実行スクリプト
```

## 配置スコープ

| 場所 | スコープ | 共有 |
|------|---------|------|
| `~/.claude/skills/` | ユーザー全体 | 不可 |
| `.claude/skills/` | プロジェクト | 可（Git管理） |
| プラグイン内 | プラグイン有効時 | 可 |

## SKILL.md フロントマター

```yaml
---
name: deploy
description: "Deploy to production"
user-invocable: true
allowed-tools: ["Read", "Bash"]
model: sonnet
effort: high
argument-hint: "[environment]"
context: fork
---

デプロイ手順の説明をここに記述...
```

### 主要フィールド

| フィールド | 説明 |
|-----------|------|
| `name` | スラッシュコマンド名 |
| `description` | 説明（Claudeの自動呼び出し判定にも使用） |
| `user-invocable` | ユーザー呼び出し可否（falseならClaude専用） |
| `disable-model-invocation` | Claude自動呼び出し無効化 |
| `allowed-tools` | 使用可能ツール制限 |
| `model` | スキル専用モデル指定 |
| `effort` | 推論レベル |
| `argument-hint` | 引数のヒント表示 |
| `context` | 実行コンテキスト（`fork`で分離実行） |
| `agent` | サブエージェント種類指定 |
| `hooks` | スキル固有フック |

## 動的コンテキスト注入

`` !`<command>` `` でスキル実行前にシェルコマンドを評価:

```markdown
---
name: pr-summary
---

## PR情報
- Diff: !`gh pr diff`
- コメント: !`gh pr view --comments`

上記の情報を元にPRのサマリーを作成してください。
```

## 引数処理

| プレースホルダ | 説明 |
|---------------|------|
| `$ARGUMENTS` | すべての引数 |
| `$ARGUMENTS[0]` または `$0` | 最初の引数 |
| `$1`, `$2`, ... | 2番目以降 |
| `${CLAUDE_SESSION_ID}` | セッションID |
| `${CLAUDE_SKILL_DIR}` | スキルディレクトリパス |

## Skillの種類

### 参照Skill（知識ベース）
Claude が自動で参照する知識。API規約やスタイルガイド等。
- `user-invocable: false` + `disable-model-invocation: false`

### タスクSkill（手動実行）
ユーザーが `/command` で明示的に呼び出す。デプロイ・コミット等。
- `user-invocable: true` + `disable-model-invocation: true`

### バックグラウンドSkill（Claude専用）
Claude だけが必要に応じて呼び出す。コンテキスト提供・自動判定等。
- `user-invocable: false`

---

## Progressive Disclosure（段階的開示）

Claude Code はSkillを段階的に読み込む:

1. **Skill名とdescription** を確認（全Skill対象）
2. 該当Skillの **SKILL.md をロード**（必要な1〜2個だけ）
3. 必要に応じて **references/ 内の資料にアクセス**

つまり20個のSkillがインストールされていても、実際にロードされるのは1〜2個。この仕組みを活かすため:

- **SKILL.md は短く保つ**（500行超は避ける）
- 詳細は `references/` に分離して必要時だけ読み込ませる
- **description が最重要** — 自動トリガーの精度はここで決まる

### descriptionの書き方

```yaml
# 悪い例（曖昧）
description: "記事に関するタスクを行う"

# 良い例（具体的な状況を記述）
description: "記事の下書きを生成する必要があるとき。「記事を書いて」「下書きして」で発火"
```

手動呼び出し（`/skill-name`）が多い場合は、descriptionの改善が必要なサイン。

---

## CLAUDE.md との使い分け

| 観点 | Skills | CLAUDE.md |
|------|--------|-----------|
| 用途 | 特定タスクのワークフロー・テンプレート | 全体のルール・規約・環境設定 |
| ロード | 必要時のみ（Progressive Disclosure） | 常時ロード |
| 可搬性 | あり（個人Skills持ち運び可） | リポジトリ固有 |
| 粒度 | 1Skill = 1タスク | プロジェクト全体の方針 |

---

## 設計パターン集

### 1. ワークフロー自動化型

定型業務を手順化して自動実行する。

```yaml
---
name: write-draft
description: "記事の下書きを生成する必要があるとき。「記事を書いて」「下書きして」で発火"
---
```

### 2. テンプレート駆動型

テンプレートを元にコンテンツを生成する。

```
proposal-creation-toolkit/
├── SKILL.md
└── templates/
    ├── how-to/template.md
    ├── concept/template.md
    └── troubleshooting/template.md
```

### 3. パイプライン型

複数ステップを順次実行する。各ステップの完了条件を明確にし、途中成果をファイル保存する指示を含める。

### 4. サブエージェント分離型

大量の情報読み込みが必要だが、メインには要約だけ返せばよい場合。`context: fork` でサブエージェント隔離実行。

```yaml
---
name: deep-research
description: "深い調査が必要なとき。「調べて」「リサーチして」で発火"
context: fork
---
```

### 5. マルチエージェント協調型

複数エージェントが協調して作業する。エージェント間の依存関係（順序実行 vs 並行実行）を明確にする。

### 6. ガードレール型

「CI/CDパイプラインのローカル版」として機能。コード変更後に自動的にレビュー・チェックを実行。

```yaml
---
name: pr-review
description: "PRレビューを実行するとき。コード変更後に自動的に発火"
---
```

---

## チーム展開のポイント

- テストケースを定義して**客観的な評価基準**を確立する
- チームSkillは**スターターキット**として提供し、個人カスタマイズを推奨
- **個人Skill**（`~/.claude/skills/`）と**チームSkill**（`.claude/skills/`）を分離してポータビリティを維持

---

## アンチパターン

| アンチパターン | 問題 | 対策 |
|--------------|------|------|
| SKILL.mdの肥大化 | ロード時間・コンテキスト浪費 | 500行超は `references/` に分離 |
| descriptionの曖昧さ | 自動トリガーが不発 | 具体的な状況・トリガーワードを記述 |
| 手動呼び出しへの依存 | descriptionの設計不足 | 自動発火するよう改善 |
| 状態管理の欠如 | 長時間タスクが中断で消失 | 中間成果をファイル保存する指示を含める |
| 権限の野放し | セキュリティリスク | `allowed-tools` で実行可能ツールを制限 |

---

## 実践メモ

- 出典: [Claude Code Skills 完全活用ガイド 2026](https://qiita.com/nogataka/items/ad9995fb1b3db7055740) (@nogataka, 2026-03-12)
### Skills 20選 — Tier別導入ガイド（自動収集 2026-03-26）

**Tier 1（最優先・体感が大きく変わる）**: find-skills（Agent自身がSkillを検索）、vercel-react-best-practices（64ルール）、frontend-design（配色・レイアウト）、web-design-guidelines（100+ルール）、remotion-best-practices。**Tier 2（おすすめ）**: brainstorming、agent-browser、browser-use、supabase-postgres、azure-cost-optimization、cloudflare/skills。**Tier 3（用途別）**: redis、React Native、モバイルUI、PDF、SEO、skill-creator、code-review-expert等。`npx skills add <repo> --skill <name>` でプロジェクト単位にインストール。まずfind-skillsとTier 1の5つから始めると効果的。

> 詳細: メモリ内 `reference_claude_code_skills_guide.md` を参照

### Agent Skills紹介: MCPとの3つの違い（自動収集 2026-03-28）

- Agent Skillsは「再利用可能な専門スキルのモジュール」。指示書・ワークフロー・スクリプト・参照データを1パッケージ化
- MCPとの違い: (1) 動作環境（Skills=Claude内仮想マシン / MCP=外部通信） (2) 用途（Skills=内部処理専門化 / MCP=外部データ取得） (3) トークン効率（Skills=段階的読み込みで最適化）
- ビルト済みSkills: Word/Excel/PowerPoint/PDF処理
- カスタムSkills: 企業独自の規約・業務フローを構築可能

> 詳細: メモリ内 reference_claude_agent_skills_intro.md を参照

### autoresearch: /loopで自律パフォーマンスチューニング（自動収集 2026-03-31）
Karpathy氏のautoresearch思想を応用し、`/loop 10m`でRailsコントローラーのレスポンスタイムを自律改善するスキル実装事例。3原則: 固定評価基準（ベンチマークはAI変更不可）・固定時間予算（9分/サイクル）・進化的選択圧（改善→keep、悪化→discard）。エージェント権限分離（tuning-agent=コード改善のみ、data-setup-agent=テストデータのみ）とHooks（Read/Bashフック）で防御。
> 詳細: メモリ内 `reference_autoresearch_loop_perf_tuning.md` を参照

### 機能使い分け判断基準（自動収集 2026-04-04）
CLAUDE.md（常時読み込み）・Skills（必要時自動読み込み）・スラッシュコマンド（手動呼び出し）・サブエージェント（過程不要の独立タスク）・Hooks（確実な自動実行）の5機能をコンテキスト効率軸で使い分け。常に必要→CLAUDE.md、特定タスク→Skills、人間が起動→コマンド、過程不要→サブエージェント、確実自動→Hooks。
> 詳細: references/reference_claude_code_feature_distinction.md を参照

### Agent Skills設計・構築・運用ワークフロー（自動収集 2026-04-04）
Progressive Disclosure原則: CLAUDE.md→Skills→references/の3段階情報ロード。設計3ポイント: SKILL.md 500行以下、descriptionにトリガーフレーズ複数、disable-model-invocationで安全性確保。5段階ワークフロー: 日常業務実現→Skill化→description調整→知識外部化→フィードバック改善。
> 詳細: references/reference_agent_skills_practice_guide.md を参照

### 拡張機能4層構造の体系整理（自動収集 2026-04-04）
カスタムコマンド（定型プロンプト）→スキル（段階的開示）→サブエージェント（独立コンテキスト）→プラグイン（パッケージ配布）の4層。v2.1.3でコマンドはスキルに統合。Agent Skills標準準拠でCodex CLI移植性確保。引数は`$ARGUMENTS[0]`推奨、副作用防止に`disable-model-invocation: true`。
> 詳細: references/reference_claude_code_extensions_overview.md を参照

### Zenn執筆環境をClaude Codeで育てた実践記録（自動収集 2026-04-06）
2週間の執筆で反復問題がシステム化される循環プロセスを実証。`zenn-writer`スキルでトーン統一、`learned/`スキルで技術的地雷（markdownlint glob競合・prh正規表現クラッシュ）を再発防止。MCPサーバー（kuromoji.js形態素解析）で正確な文字数計測。`.claude/agents/editor.md`で6次元品質レビュー（技術的正確性・コード品質・ナラティブ・用語一貫性・AIっぽさ検出・読者レベル）。
> 詳細: references/reference_claude_code_zenn_writing_env.md を参照

<!-- 日常で得た知見をここに追記 -->
