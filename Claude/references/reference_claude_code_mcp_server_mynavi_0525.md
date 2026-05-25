---
name: Claude Codeに目と手足を与える「MCPサーバー」 - ブラウザ操作からテスト自動化まで
description: MCPサーバーがClaude Codeに「目と手足」を与える仕組み・種類・活用例を解説
type: reference
---

## 出典

マイナビニュース（Techplus）: https://news.mynavi.jp/techplus/article/20260525-4471904/

## MCPサーバーとは

MCPサーバー（Model Context Protocol）は、Claude Codeに新機能を追加するためのオープン規格。Claude Codeを「頭脳」に例えると、MCPサーバーが「目と手足」を追加する仕組み。

## MCPサーバーの種類

- **ローカル型**: ユーザーのPC上で動作
- **リモート型**: クラウド上のサーバーを利用
- **企業公式**: Microsoft、GitHub、Slack、Figma等が提供
- **コミュニティ製**: 有志が開発・公開
- **自作**: 独自ツールとの統合に

## 主な利点

- コンテキスト消費が少ない
- 大型データ処理に優れている

## 活用例：Playwright MCP（Microsoft提供）

Playwright MCPを使用することで、自然言語の指示だけでブラウザ操作が可能になる。

主なユースケース:
- フォーム入力から送信まで自動化
- スクリーンショット付きテスト報告書の自動生成
- 従来は手作業だった反復的ブラウザ操作を全自動化

## その他の代表的なMCPサーバー

- GitHub MCP: プルリクエスト・イシュー操作
- Slack MCP: メッセージ送受信・チャンネル管理
- Figma MCP: デザインファイルの読み取り・更新
- AWS MCP: AWSリソースへの安全なアクセス

## 公開日

2026年5月25日
