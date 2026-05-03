---
name: Blender・Autodesk・AdobeとつながるClaudeの新Connector
description: Claude for Creative Work（2026年4月28日発表）コネクタの概要とBlender統合の技術的詳細（npaka）
type: reference
---

## 出典

note（npaka）: https://note.com/npaka/n/n7864b38c7432

## 概要

2026年4月28日、AnthropicがBlender・Adobe Creative Cloud・Autodesk Fusion・Ableton・Splice・SketchUp・Resolume ArenaなどとつながるConnectorを発表。CreatorはClaudeを「複雑なソフトウェアのオンデマンドチューター」として活用できる。

## 主な機能

- **ツール習得支援**: コンテキスト依存の使い方解説
- **カスタムコード生成**: ツール固有スクリプトの自動生成
- **複数アプリ間データ連携**: ソフトウェア横断でのアセット連携
- **反復的タスク自動化**: バッチ処理・ファイル整理

## Blender Connectorの技術的詳細

| 機能 | 内容 |
|------|------|
| シーン解析 | Blenderシーンの構造を自然言語で解析・説明 |
| スクリプト作成 | 一括変更用 Python スクリプト生成 |
| 自然言語インターフェース | Python API へのアクセスを自然言語で提供 |
| オープン設計 | MCP上に構築、Claude以外のLLMからも利用可能 |

## ポイント

- MCP（Model Context Protocol）をベースに構築されているため、他のLLMからも利用可能
- Blenderの「オープンソース性と相互運用性」の理念を反映
- 全Claudeプランで利用可能（Freeプラン含む）
