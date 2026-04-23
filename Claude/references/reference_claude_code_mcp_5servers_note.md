---
name: Claude CodeのMCPとは？設定方法と実際に使っているサーバー5つを紹介
description: MCPの基本概念（3登場人物・3プリミティブ）から4つの設定方法、実際に活用するNotion・Canva・Figma・Ahrefs・GitHub MCP 5サーバーの実運用事例
type: reference
---

## 出典

note（AI実践会）: https://note.com/ai_jissennkai/n/nc9ebedadd1f2

## MCPとは

**基本定義**
- Model Context Protocol の略
- AIアプリケーションを外部ツール・データソースに接続するオープンソース標準プロトコル
- USB規格のような共通接続仕様

### 3つの登場人物

| 役割 | 説明 |
|------|------|
| MCPホスト | Claude Code等のAIアプリケーション本体 |
| MCPクライアント | ホスト内の接続管理機能 |
| MCPサーバー | 外部ツール側が提供するプログラム |

### 3つのプリミティブ

| 種類 | 機能 |
|------|------|
| Tools | 外部サービスの操作実行 |
| Resources | 外部データの読み込み |
| Prompts | MCPサーバーが提供するテンプレートコマンド |

## 4つの設定方法

| 方法 | コマンド例 | 用途 |
|------|----------|------|
| コネクタ | 自動有効 | Notion・GitHub・Figma等の主要サービス |
| HTTP接続 | `claude mcp add --transport http` | コネクタ未対応サーバー |
| stdio接続 | `claude mcp add --transport stdio` | ローカルサーバー（npm利用） |
| .mcp.json | 設定ファイル | チーム共有設定 |

> **Windows環境の注意**: stdio接続でエラー回避には `cmd /c` ラッパーが必須

## 実際に使用している5つのサーバー

| サーバー | 主な用途 |
|---------|---------|
| Notion MCP | 投稿管理・タスク自動化の中核 |
| Canva MCP | テンプレートのテキスト・画像差し替え |
| Figma MCP | デザイン読み取り＆コード変換・書き込み |
| Ahrefs MCP | キーワード調査・競合分析 |
| GitHub MCP | PR・Issue管理 |

## セキュリティチェックポイント

- サービス提供元による公式提供か確認
- Anthropic認証済みコネクタを優先
- ソースコード公開されているか確認
- シークレット情報は環境変数で管理

## 実運用の効果

「情報確認→作業実行」が同一インターフェース内で完結し、複数ツール間の移動が削減された
