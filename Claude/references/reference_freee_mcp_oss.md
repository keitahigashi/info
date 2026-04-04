---
name: freee-mcp OSS公開
description: freee社がAIエージェントからfreee基幹業務APIを操作可能にするMCPサーバーをOSS公開（プレスリリース）
type: reference
---

## 出典
- URL: https://corp.freee.co.jp/news/20260302freee_mcp.html
- 著者: フリー株式会社
- 公開日: 2026-03-02

## 概要
freeeが開発したMCPサーバー「freee-mcp」は、AIエージェントからfreeeの基幹業務APIを直接操作可能にするOSS。約270本のAPIを網羅し、会計・人事労務・請求書・工数管理・販売の5領域をカバー。

## 詳細

### 技術仕様
- プロトコル: MCP（Model Context Protocol）
- 配布形式: npmパッケージ
- GitHub: https://github.com/freee/freee-mcp
- NPM: https://www.npmjs.com/package/freee-mcp

### 対応API範囲（約270本）
1. 会計
2. 人事労務
3. 請求書
4. 工数管理
5. 販売

### 主要機能
- **MCPツール群**: freee Public APIをMCP互換形式に変換
- **Agent Skills**: AIエージェントが業務文脈を理解した正確な操作実行を支援する指示セット

### 対応AIツール
- Claude Desktop / Claude Code / Claude Cowork / Cursor

### 使用例
- チャットで「請求書を作って」→ 取引先登録から発行まで自動完了
