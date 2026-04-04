# Article Collector Skill

Claude Code ナレッジベースへの記事自動収集ワークフロー。

## トリガー

以下のいずれかでこのワークフローを開始する:
- 「記事収集して」「情報集積を続けて」「記事探して」
- `/loop` でのスケジュール実行
- URL直接指定

## 制約

- **1回の実行で最大5記事**
- **収集済みURLへの重複追加禁止**
- ナレッジベース（00-11）への追記は所定フォーマットに従う
- ログは必ず `log/{YYYY-MM-DD}.md` に作成する

## ワークフロー

### Phase 1: 重複チェック準備

1. `REFERENCES.md` を読み込み、収集済みURLの一覧を取得する
2. これを重複判定のソースとして使用する

### Phase 2: 記事検索

1. Web検索で3キーワードを**並列実行**する
   - キーワード例: `Claude Code 活用 2026`, `Claude Code MCP 新機能`, `Claude Code ハーネス 実践`
   - 前回の収集ログ（`log/` 内の最新ファイル）を確認し、同じキーワードの繰り返しを避ける
2. 検索結果からPhase 1のURL一覧で重複を除外する
3. 残った候補から最大5件を選定する

### Phase 3: 記事取得・詳細保存

各記事について:
1. `WebFetch` で記事本文を取得する
2. `references/reference_{slug}.md` に以下のフォーマットで保存する:

```markdown
---
name: {記事タイトル}
description: {1行要約}
type: reference
---

## 出典

{ソース名}: {URL}

## {記事内容の構造化要約}

（見出し・箇条書き・テーブル・コード例を含む）
```

### Phase 4: メタデータ更新

1. `REFERENCES.md` の「収集済み記事」テーブルに行を追加する:
   ```
   | reference_{slug}.md | {内容} | {ソース} | {YYYY-MM-DD} | {反映先} |
   ```

2. `log/{YYYY-MM-DD}.md` にデイリーログを作成/追記する:
   ```markdown
   # {YYYY-MM-DD} 収集ログ

   収集件数: {N}件

   ## 収集記事

   ### 1. {タイトル}
   - **URL**: {url}
   - **ソース**: {source}
   - **反映先**: {target}
   - **サマリー**: {2-3行の要約}
   ```

### Phase 5: 完了

- ファイル更新まで実行し、commit/push はユーザー確認を待つ

## 検索キーワード戦略

### 基本キーワード（ローテーション）
| カテゴリ | キーワード例 |
|---------|------------|
| 機能・アップデート | `Claude Code 新機能 2026`, `Claude Code アップデート`, `Claude Code changelog` |
| 設定・運用 | `CLAUDE.md 設計`, `Claude Code 設定 ベストプラクティス` |
| MCP・拡張 | `Claude Code MCP サーバー`, `MCP 活用 事例` |
| Skills・プラグイン | `Claude Code Skills`, `Claude Code プラグイン 作り方` |
| ハーネス・自動化 | `ハーネスエンジニアリング`, `Claude Code 自動化 ワークフロー` |
| セキュリティ | `Claude Code セキュリティ`, `AIエージェント 権限管理` |
| 事例・比較 | `Claude Code 導入事例`, `Claude Code vs Cursor`, `バイブコーディング 実践` |
| 公式ドキュメント | `site:code.claude.com`, `site:docs.anthropic.com` |

### キーワード選定ルール
- 直近3回のログで使ったキーワードは避ける
- 収集が少ないカテゴリを優先する
- 時事性の高いトピック（新バージョン・セキュリティ事案等）があれば優先する

## ファイル構成

```
Claude/
├── references/          ← 記事詳細（Git管理）
│   └── reference_*.md
├── REFERENCES.md        ← 収集済み記事テーブル（重複チェックの正）
├── log/                 ← デイリー収集ログ
│   └── YYYY-MM-DD.md
└── 00-11               ← ナレッジベース本体（手動キュレーション）
```
