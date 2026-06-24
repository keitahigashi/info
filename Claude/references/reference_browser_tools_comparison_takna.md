---
name: Claude Code ブラウザ操作４ツールの徹底比較 ─ Claude in Chrome/chrome-devtools-mcp 他
description: Claude Code環境で利用できるブラウザ操作ツール4種（Claude in Chrome・chrome-devtools-mcp・agent-browser・Playwright MCP）を用途別に比較した技術記事
type: reference
---

## 出典

Zenn（takna）: https://zenn.dev/takna/articles/ai-agent-browser-tools

## 記事概要

**公開日:** 2026年6月21日

Claude Codeとの連携を前提に、ブラウザ操作の主要4ツールを比較・評価した技術記事。

## 比較対象4ツール

| ツール | 提供元 | 特徴 |
|--------|--------|------|
| **Claude in Chrome** | Anthropic | Chrome拡張として動作、実ログイン状態でのブラウザ操作が可能 |
| **chrome-devtools-mcp** | Google Chrome | DevTools APIを活用、パフォーマンス診断に強み |
| **agent-browser** | Vercel Labs | CLIベース、スクリプト効率を重視した設計 |
| **Playwright MCP** | Microsoft | クロスブラウザ対応、E2Eテストの自動化に最適 |

## 用途別推奨ツール

| 用途 | 推奨ツール | 理由 |
|------|-----------|------|
| 実ログイン状態での操作 | **Claude in Chrome** | ブラウザセッションをそのまま利用可能 |
| パフォーマンス診断 | **chrome-devtools-mcp** | DevTools指標へ直接アクセス |
| CLI効率重視の自動化 | **agent-browser** | 軽量・高速、スクリプトとの親和性が高い |
| クロスブラウザE2Eテスト | **Playwright MCP** | Chrome/Firefox/Safariに対応 |

## 重要な所見

- **chrome-devtools-mcp** は2026年6月にMCPモードが追加されたばかりで実運用事例は少ない
- ツールを単一選択するよりも、用途に応じて複数を組み合わせる構成が現実的
- Claude in Chromeはログイン必須サービス（社内ツール等）の操作自動化に特に有効
- Playwright MCPはCI/CDパイプラインへの統合に向いた設計

## MCPサーバーとしての設定

各ツールはMCPサーバー形式でClaude Codeに統合可能。設定例：

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    },
    "chrome-devtools": {
      "command": "npx",
      "args": ["chrome-devtools-mcp"]
    }
  }
}
```
