---
name: Claude Code のスキル機能 + MCP で Qiita への自動投稿を作ってみた
description: SKILL.mdとmcp-server-qiitaを組み合わせてQiita自動投稿フローを構築した実装手順と3つのハマりポイント
type: reference
---

## 出典

Qiita（@s20014）: https://qiita.com/s20014/items/543b016e2842646840a9

## スキル vs MCPの違い

- **スキル（SKILL.md）**: 手順書形式。Claudeがマッチングして呼び出す
- **MCP**: Claude が文脈から判断してツールを選んで実行する（インテリジェントなツール選択）
- 本記事では両方を組み合わせてQiita投稿フロー全体をカバー

## セットアップ手順

```bash
# mcp-server-qiita のインストール
npm install -g mcp-server-qiita

# settings.json に追記
{
  "mcpServers": {
    "qiita": {
      "command": "mcp-server-qiita",
      "env": { "QIITA_TOKEN": "YOUR_TOKEN" }
    }
  }
}
```

## SKILL.md の構成

- 記事フォーマットガイドライン（タイトル・タグ・本文構造）
- 投稿前チェックリスト（誤字・リンク・コードブロック確認）
- Qiita APIとの連携手順を自然言語で記述

## 3つのハマりポイント

1. **settings.jsonへの直接記述が必要**: `.mcp.json` ではなく `settings.json` に書く
2. **コマンドオプション順序に注意**: `--token` フラグは引数の後ではなく前に置く
3. **Claude Code再起動忘れ**: MCP設定変更後は必ず再起動しないと反映されない

## 実用的な応用

- Zenn/Dev.to への横展開も同様の構成で対応可能
- 英訳ファイルの有無チェックで誤投稿防止ガードも追加可能
- SKILL.mdにスタイルガイドを書けばAIが文体を模倣して記事執筆
