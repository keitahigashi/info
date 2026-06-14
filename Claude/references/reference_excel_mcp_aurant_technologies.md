---
name: Excel MCPとは【2026年版】スプレッドシートをClaude/Cursorから操作するときの仕組みとリスク
description: MCP経由でClaudeがExcelを読み書きする仕組み・従来手法との違い・セキュリティリスクと対策を解説
type: reference
---

## 出典

Aurant Technologies Blog: https://aurant-technologies.com/blog/claude-excel-mcp-explained-implementation-15429/

## Excel MCPとは

Anthropic社が提唱したMCP（Model Context Protocol）により、ClaudeやCursorといったAIがExcelやスプレッドシートを「読み書き」できるようになった技術。

## 従来のファイルアップロードとの違い

| 特性 | 従来（ファイルアップロード） | MCP方式 |
|------|--------------------------|---------|
| 双方向性 | 一方向（読み取り専用） | 双方向（読み書き可能） |
| 最新性 | スナップショット | リアルタイム最新データ |
| 構造理解 | テキスト変換後に処理 | Excelの構造を直接理解 |
| 継続操作 | 毎回再アップロード必要 | セッション中は継続保持 |

## セキュリティリスク

| リスク | 内容 |
|--------|------|
| 数式破壊 | AI操作により計算式が意図せず上書きされる |
| 個人情報漏えい | Excelに含まれる個人情報がAIに渡る可能性 |
| 監査ログ不記録 | ローカル実行のためログが残らない |

## 推奨されるリスク対策

1. **アクセス権限の制限**：読み書き対象ファイルを限定する
2. **データマスキング**：個人情報を含むセルはMCP経由で渡さない
3. **運用ルールの整備**：どのファイルをMCP経由で操作するか社内ポリシーで明確化
4. **バックアップ**：AI操作前に必ずバックアップを取る

## 活用シーン
- 定期レポートの自動生成・更新
- 大量データの集計・分析
- スプレッドシートのフォーマット統一化
- 複数シート間のデータ連携

## Claude Code での利用例

```json
// MCP設定（settings.json）
{
  "mcpServers": {
    "excel": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-filesystem"],
      "env": {
        "ALLOWED_DIRECTORIES": "/path/to/allowed/excel/files"
      }
    }
  }
}
```
