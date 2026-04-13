---
name: Agent Skills設計ガイド — トークン予算・ネスト・compaction対策
description: Skills 3段階ロード・description予算管理（60個超で130文字以下）・モノレポネスト発見・compaction消失対策・Subagent注入制御
type: reference
---

## 出典
- URL: https://zenn.dev/polipoli/articles/agent-skills-context-architecture
- 著者: シュレック倉田（株式会社PoliPoli）
- 公開日: 2026-03-20

## 概要
Agent Skillsのトークン予算管理・ネスト発見設計・compaction対策を体系的に解説。63個のSkillで33%が隠れた実例を紹介し、description最適化の具体的数値基準を提示。

## 詳細

### 3段階ロード
- **Stage 1（起動時）**: name+descriptionのみシステムプロンプトに注入
- **Stage 2（ファイル操作時）**: サブディレクトリの`.claude/skills/`を自動ディスカバリ
- **Stage 3（Skill発動時）**: SKILL.md本文をコンテキストに読み込み

### Description Budget
- 消費計算: `description文字数 + 約109文字（XMLオーバーヘッド）`
- コンテキストウィンドウの2%で動的スケール

| Skill数 | description上限 | 状態 |
|---------|-----------------|------|
| 20個 | 300文字 | 余裕あり |
| 40個 | 150文字 | 収まる |
| 60個 | 130文字 | ギリギリ |
| 80個 | 90文字 | ギリギリ |

**実例**: 63個のSkillで42個のみ表示、33%が隠れた。

### モノレポのネスト発見設計
```
monorepo/
├── .claude/skills/              ← Stage 1で即ロード
├── packages/frontend/.claude/skills/  ← frontendアクセス時にディスカバリ
└── packages/backend/.claude/skills/   ← backendアクセス時にディスカバリ
```
- 名前衝突優先順位: プロジェクト > ユーザー > プラグイン
- `~/.claude/skills/`は再帰スキャンされない（フラット構造必須、シンボリックリンク回避策）

### Compaction対策
| 項目 | 状態 | 理由 |
|------|------|------|
| CLAUDE.md | 保持 | ディスク再読み込み |
| Skill一覧 | 保持 | システムプロンプト再注入 |
| SKILL.md本文 | 消失 | 会話コンテキスト内で要約削除 |

対策: タスク小分割、`context: fork`活用、CLAUDE.mdに「Compact Instructions」設置、手動`/compact`でフォーカス指定

### Skill × Subagentのコンテキスト制御

| 制御方法 | 動作 | コンテキスト消費 | 用途 |
|---------|------|-----------------|------|
| `context: fork` | 別コンテキストで実行 | main消費なし | 大量ファイル操作 |
| subagent `skills:` | 全文起動時注入 | subagent消費 | 専門知識付与 |
| `disable-model-invocation: true` | コマンド実行のみ | description常時 | 危険操作ガード |

**重要**: subagentの`skills`フィールド指定Skillは遅延ロードではなく全文が起動時注入。

### Description最適化
- 60個以上なら130文字以下、40〜60個なら150文字以下
- トリガーワードは冒頭50文字に集中
- XMLタグ不可（パースエラー）
- Frontmatter: name最大64文字（小文字英数字+ハイフン）、description最大1,024文字

### デバッグコマンド
- `/context`: トークン消費一覧（budget超過警告含む）
- `/skills`: 現在ディスカバリSkill一覧
- `/doctor`: ツール全体状態確認
- `Ctrl+O`: トランスクリプトモード

### CLAUDE.md vs Skillsの判断基準
- CLAUDE.md: 全タスク適用、10〜40行、毎セッション全文消費（例: コーディング規約）
- Skills: 特定タスク、100行超、descriptionのみ常時消費（例: デプロイフロー）
