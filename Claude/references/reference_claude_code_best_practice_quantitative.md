---
name: claude-code-best-practice 定量指針と設計パターン
description: Claude Code運用判断の数値化 — CLAUDE.md200行・PR118行・コンテキスト50%/80%・権限3層・RPI8エージェント
type: reference
---

## 出典
- URL: https://qiita.com/backend-notes/items/95b3fe0b1cabafb0f8b0
- 著者: backend-notes（大手IT企業でのシステム開発経験者、AIスタートアップ勤務）
- 公開日: 2026-04-16
- 対象リポジトリ: claude-code-best-practice（shanraisshan作成、45,400+ Stars）

## 概要
Claude Codeの運用判断を定量化する5つの核心メトリクスと、settings.json設計パターン、オーケストレーション設計パターンの解説。

## 詳細

### 5つの定量指針

#### 指針1: CLAUDE.md行数制限 — 200行以下
行数超過時に優先度が曖昧化し、重要ルール見落しが発生。モノレポ対応は`.claude/rules/`にグロブパターン付きで分散配置。

#### 指針2: PR分割サイズ — 中央値118行（p50）
Boris Cherny実績データ（1日141件PR、45K行変更）に基づく。大型変更時に「118行程度に分割」と指示する根拠。

#### 指針3: コンテキスト使用率管理 — 50%手動/80%自動
- 手動介入閾値: 50%（`/compact`実行）
- 自動compact設定: 80%（`CLAUDE_AUTOCOMPACT_PCT_OVERRIDE`環境変数）
- 二重管理構造: 自動化は80%まで委譲し、重要作業は50%で人間が介入

#### 指針4: タスク規模とワークフロー選定
「vanilla cc is better than any workflows with smaller tasks」— 小規模タスクではオーケストレーションのオーバーヘッドが効果を上回る。

#### 指針5: Plan Mode優先実行
複雑タスク前に必ずPlan Mode起動。AskUserQuestionツールでヒアリング後に実装着手。

### settings.json権限3層構造

```json
{
  "permissions": {
    "allow": ["Edit(*)", "Write(*)", "Bash(*)", "WebFetch(domain:*)", "mcp__*"],
    "ask": ["Bash(rm *)", "Bash(pip3 *)", "Bash(docker *)", "Bash(kubectl *)"],
    "deny": []
  }
}
```
設計思想: 日常操作は許可（25項目）、破壊的操作は確認要求（22項目）、denyは空でaskで細粒度制御。

その他設定:
- `plansDirectory: "./reports"` — 計画書をリポジトリ内に永続化
- `outputStyle: "Explanatory"` — 詳細説明とInsightボックス付加
- `attribution.commit` — Co-Authored-By自動付与

### オーケストレーション設計パターン

#### Agent Skill vs Skill
- **Agent Skill（プリロード型）**: エージェントfrontmatter内の`skills:`に記述。ドメイン固有知識として事前注入
- **Skill（直接呼出型）**: `Skill`ツールで独立呼び出し。汎用再利用処理として設計

#### RPI開発ワークフロー（8エージェント）
フェーズ構成: Research → Plan → Implement（各フェーズでMD出力）
8ロール: requirement-parser、product-manager、senior-software-engineer、ux-designer、code-reviewer、technical-cto-advisor、documentation-analyst-writer、constitutional-validator
ゲート機構: 各フェーズ間にGO/NO-GO判定。

#### Cross-Model検証
4ステップ: Plan(Claude)→QA Review(Codex)→Implement(Claude)→Verify(Codex)
同一モデルバイアス回避のため異モデルを品質ゲートに使用。

### リポジトリ構成
```
claude-code-best-practice/
├── CLAUDE.md (125行)
├── best-practice/ (8本)
├── implementation/ (5本)
├── reports/ (9本)
├── .claude/
│   ├── settings.json
│   ├── agents/ (10ファイル)
│   ├── commands/workflows/
│   ├── skills/ (7セット)
│   └── hooks/ (27フック・Python ~480行)
└── development-workflows/rpi/ (8エージェント)
```

### 段階的導入パス
1. CLAUDE.md200行化（即効性高い初期改善）
2. settings.json権限設計（allow/ask/denyの3層化）
3. ワークフロー選定（中規模以上の繰り返し作業に限定）
