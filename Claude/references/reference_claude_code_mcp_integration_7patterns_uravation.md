---
name: 【2026年最新】Claude Code × MCP 連携完全ガイド｜サーバー導入7パターン+認可OAuth設定
description: Claude Code × MCPの連携設計を7パターンで体系化。.mcp.jsonの3スコープ・OAuthフロー・認証失敗パターン・セキュリティ設計3原則を網羅した実践ガイド。
type: reference
---

## 出典

株式会社Uravation公式メディア（著者: 佐藤傑）: https://uravation.com/media/claude-code-mcp-integration-complete-guide-2026/

## 概要

Uravation（佐藤傑氏）によるClaude Code × MCP連携の実践ガイド（2026年6月公開）。公式レジストリに9,400以上のサーバーが登録された現状を踏まえ、7パターンの導入手順とOAuth設定を解説。

## MCPアーキテクチャ 3層構造
- **MCPホスト**: Claude Code / Claude Desktop / Cursor等
- **MCPクライアント**: 各サーバーとの接続維持
- **MCPサーバー**: 外部ツール機能を提供（Tools / Resources / Prompts）

## .mcp.json の3スコープ

| スコープ | 保存場所 | Git共有 | 用途 |
|---------|--------|--------|------|
| local | ~/.claude.json | なし | 個人開発環境 |
| project | プロジェクトルート/.mcp.json | 可 | チーム全員が使うツール |
| user | ~/.claude.json | なし | 全プロジェクト横断設定 |

## 7パターン MCPサーバー導入

| パターン | 認証方式 | 主な用途 |
|--------|--------|--------|
| GitHub MCP | Bearer / PAT | コードレビュー・PR自動化 |
| Notion MCP | OAuth only | ドキュメント管理 |
| Slack MCP | OAuth | チャット連携 |
| Linear MCP | APIキー（Authorization header） | プロジェクト管理 |
| Filesystem MCP | stdio型 | ローカルファイルアクセス |
| Database MCP | 読み取り専用ユーザー推奨 | DB参照 |
| Custom MCP | Python SDK | 社内システム連携 |

## OAuth認可フロー（5ステップ）
1. サーバー追加 → 2. 認証チェック → 3. ブラウザ認可 → 4. コールバック処理 → 5. トークン保存
- コールバックポートは `--callback-port` で固定可能

## よくある失敗パターン4選
1. OAuthが必要なサーバーをBearerトークンで設定
2. 認証ループ（ブラウザが何度も開く）
3. スコープ過剰設定
4. APIキーを `.mcp.json` に直書きしてcommit

## セキュリティ設計3原則
- APIキーは環境変数で渡す（`${ENV_VAR}` 形式）
- `.mcp.json` はGit管理（ただしシークレット不含）
- CIではenv secretsを使用

## 重要な注意点
旧ドキュメントに残る `.claude/mcp.json` は誤記。正しいパスは **プロジェクトルート直下の `.mcp.json`**。
