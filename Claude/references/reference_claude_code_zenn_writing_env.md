---
name: Claude Code×Zenn執筆環境を育てた記録
description: Skills・pre-commitフック・MCP・カスタムエージェントを活用したZenn執筆環境の段階的構築記録
type: reference
---

## 出典
- URL: https://qiita.com/shimo4228/items/1513ae9a3a11769df170
- 著者: shimo4228
- 公開日: 2026-02-19

## 概要
2週間かけてClaude CodeでZenn執筆環境を構築した記録。反復的に発生する問題がシステム化され、命令パターンはスキル化、手作業はスクリプト化、発見した問題は学習スキルとして蓄積される循環プロセスを実践。

## 詳細

### Skills定義
- `zenn-writer` スキル: 一貫したトーン維持（「技術的だが不勉強ではない」「AIっぽい表現なし」「失敗に正直」）
- `learned/zenn-markdownlint-config`: configファイルとlint-staged間のglob設定競合回避
- `learned/prh-hyphen-regex-escape`: Node.js 20 Unicodeモードでハイフン含むパターンのクラッシュ防止

### Pre-commit フック構成
- package.json（lint-staged設定）
- .husky/pre-commit（npx lint-stage実行）
- .textlintrc.json（textlintルール: preset-ja-technical-writing + no-dead-link + prh）
- .markdownlint-cli2.jsonc（markdownlintルール: MD013・MD025・MD041・MD060無効化）
- prh.yml（表現統一辞書）

### MCPサーバー統合
`~/.claude.json` 経由でJapaneseTextAnalyzerを実装。kuromoji.jsによる形態素解析で正確な文字数計測。LLMの推定値誤差（400文字以上の乖離）を解決。

### クロスプラットフォーム公開スクリプト
`scripts/publish.py`: Zenn構文を変換
- `:::message` → ブロッククォート
- `:::details Title` → HTML `<details>` タグ
- `/images/` → GitHub raw URL
- `--update auto` で記事タイトルベースの更新（Qiita、Dev.to、Hashnodeサポート）

### 品質レビュー用エージェント
`.claude/agents/editor.md` で6次元評価: 技術的正確性、コード品質、ナラティブ流暢性、用語一貫性、AIっぽさ検出、読者レベル適切性。EXCELLENT/GOOD/NEEDS REVISION/MAJOR ISSUESの4段階。
