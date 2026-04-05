---
name: Claude DesktopリモートMCPサーバー接続ガイド
description: Claude DesktopからリモートMCPサーバーにカスタムコネクタで接続する手順・プラン別設定・セキュリティ注意点
type: reference
---

## 出典
- URL: https://nikkie-ftnext.hatenablog.com/entry/claude-desktop-add-remote-mcp-server-as-custom-connector-202604
- 著者: nikkie-ftnext
- 公開日: 2026-04-04

## 概要
Claude DesktopからリモートMCPサーバーにカスタムコネクタ経由で接続する手順の実践レポート。

## 詳細

### ローカル vs リモートMCPサーバー
- **ローカル**: `claude_desktop_config.json`で設定。同一マシン上で実行。セキュリティ懸念（サードパーティコード実行）
- **リモート**: インターネット上でホスト。Anthropicのクラウドインフラ経由で接続。パブリックインターネットからアクセス可能である必要あり

### カスタムコネクタの追加
- **Pro/Maxユーザー**: `https://claude.ai/customize/connectors` から追加
- **Team/Enterprise**: オーナーの事前承認が必要

### 実例
- OpenAI Developers Docs MCPへの接続を実証
- 接続エラーが散発するが基本的に動作確認済み
