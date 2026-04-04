---
name: Claude Desktop filesystem MCP設定ガイド
description: Claude Desktopでfilesystem MCPを設定しローカルファイルを操作する手順（Windows/Mac対応、無料版OK）（DevelopersIO記事）
type: reference
---

## 出典

DevelopersIO記事: https://dev.classmethod.jp/articles/free-claude-desktop-filesystem-mcp-setup/
著者: 福田 寅成
公開日: 2026-03-04

## 概要

Claude Desktopでfilesystem MCPサーバーを設定し、指定フォルダ内のファイルをClaude が直接読み書きできるようにする手順。無料版でも利用可能。

## 前提条件

- Claude Desktop インストール済み
- Node.js インストール済み

## セットアップ手順

### 1. npmセキュリティ設定
`%USERPROFILE%\.npmrc` に追記:
```
min-release-age=3
```

### 2. 設定ファイル編集
Claude Desktop → 設定 → 開発者 → 設定を編集 → `claude_desktop_config.json`

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "C:\\Users\\ユーザー名\\Documents"
      ]
    }
  }
}
```

### 複数フォルダ指定
```json
"args": [
  "-y",
  "@modelcontextprotocol/server-filesystem",
  "C:\\Users\\ユーザー名\\Documents",
  "C:\\Users\\ユーザー名\\Desktop"
]
```

### Googleドライブ指定
```json
"args": [
  "-y",
  "@modelcontextprotocol/server-filesystem",
  "G:\\マイドライブ\\my_documents"
]
```

## 注意点

- Windowsパス区切りは `\\` でエスケープ必要（Macは `/` でそのまま）
- 指定フォルダ配下のみ操作可能
- 設定後はClaude Desktopの完全終了→再起動が必要（タスクマネージャーからプロセス終了）
- 無料版は1日のメッセージ数に制限あり
