---
name: "[アップデート] Claude Code 上で MCP サーバーの詳細を表示できるようになりました"
description: /mcpコマンドでMCPサーバーを選択→ツール一覧→引数詳細まで段階的に確認できるようになったアップデート（v1.0.18）の操作フロー解説
type: reference
---

## 出典

DevelopersIO（クラスメソッド / たかくに）: https://dev.classmethod.jp/articles/claude-code-mcp-server-details/

## 概要

Claude Code v1.0.18で「Added detailed MCP server tools display (`/mcp`)」が実装された。従来はサーバー一覧のみ表示だったが、各ツールの説明・引数詳細まで閲覧可能になった。

## 操作フロー（5ステップ）

1. `/mcp` 入力 → MCPサーバー一覧表示
2. サーバーを選択してEnter
3. 接続タイプ・ステータス・ツール数を確認
4. 「View tools」でツール一覧へ
5. 特定ツール選択 → 引数・使用方法の詳細表示

## 実演例（aws-documentation-mcp-server）

3ツールの詳細を画面上で直接確認可能：
- `read_documentation` - パラメータ要件付きで表示
- `search_documentation` - 引数・使用方法を表示
- `recommend` - 関連ドキュメント推薦の引数詳細

## 実用的価値

- 外部ドキュメント参照の手間を削減
- MCP設定後すぐに利用可能なツール・引数を素早く確認できる
- 開発オンボーディング時のMCP機能把握が容易化
- MCPサーバー設定が正しく動作しているかの即時確認が可能
