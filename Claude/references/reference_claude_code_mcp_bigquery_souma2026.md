---
name: Cursor / Claude Code × MCP × BigQuery で「自然言語データ分析」環境を作る
description: MCP Toolbox for Databases を使い Claude Code / Cursor を BigQuery に接続して自然言語によるデータ分析を実現する手順と、ナレッジ設計の重要性を解説した技術記事
type: reference
---

## 出典

Qiita (@souma_ai_2026): https://qiita.com/souma_ai_2026/items/cae3d715297c4942853d

## アーキテクチャ概要

ユーザーは Cursor/Claude Code のみを操作し、MCP・ADC 認証・BigQuery が背後で統合される設計。

```
User → Cursor/Claude Code → MCP Toolbox → ADC認証 → BigQuery
```

## MCP 設定手順

### インストール
- macOS: `brew install google-cloud-sdk` + toolbox バイナリ
- Windows: GCS から toolbox.exe をダウンロード

### 設定ファイル（`.cursor/mcp.json` または `.mcp.json`）

```json
{
  "mcpServers": {
    "bigquery": {
      "command": "toolbox",
      "args": ["--prebuilt", "bigquery", "--stdio"],
      "env": { "BIGQUERY_PROJECT": "your-gcp-project-id" }
    }
  }
}
```

### ADC 認証

```bash
gcloud auth application-default login
```

組織管理の場合は読み取り専用のサービスアカウント（`dataViewer` + `jobUser`）を使用。

## CLAUDE.md / .cursorrules の行動規約

```
- 読み取り専用。INSERT/UPDATE/DELETE/CREATE/DROP は実行しない
- 完全修飾名（project.dataset.table）で記述
- 日次テーブルは WHERE でパーティション制限
- SAFE_DIVIDE() と CURRENT_DATE('Asia/Tokyo') を使用
- docs/ の指標定義に従い、定義なしは推測しない
```

## ナレッジ設計（品質の9割を決める）

| ディレクトリ | 内容 |
|------------|------|
| `docs/` | テーブル定義・命名規則・指標ロジック |
| `queries/` | 既存 SQL（Dataform/.sql ファイル） |

### 指標定義の具体例
- 継続率 = 登録から7日以内に再訪したユーザー ÷ 登録ユーザー
- CPA = `SAFE_DIVIDE(コスト, コンバージョン)`
- 「最近」= 直近30日

## コスト管理のポイント
- 読み取り専用権限でリスク最小化
- 日次テーブルのパーティション制限でスキャン量を削減
- `SELECT *` を避け `LIMIT` で確認クエリを制限

## 非技術者への効果
曖昧な用語を事前定義することでAIの精度が大幅向上。データ抽出→分析→示唆出しが会話形式で完結し、非エンジニアが自走できる環境を実現。

<!-- 日常で得た知見をここに追記 -->
