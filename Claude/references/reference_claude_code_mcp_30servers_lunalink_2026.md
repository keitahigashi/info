---
name: Claude Codeで使えるMCPサーバー30選【2026年版】
description: 2026年7月時点でMCPサーバー30種を用途・必須度評価付きで6カテゴリに分類紹介。
type: reference
---

## 出典

Qiita（著者: @LunaLink / Luna Link）: https://qiita.com/LunaLink/items/05403960354c9606bb0a

## MCPサーバー30選 2026年版

### 概要

2026年7月5日公開。MCPエコシステムが公開サーバー1万種規模に拡大した背景のもと、
Web開発・インフラ・データベース・AI系を網羅する30サーバーを整理した保存版ガイド。

### 収録カテゴリと主なサーバー

| カテゴリ | 主なサーバー | 必須度 |
|--------|-----------|------|
| 基盤系 | Filesystem, GitHub, Docker | ★★★ |
| Web開発系 | Playwright, Figma, Vercel, Netlify | ★★★ |
| データベース系 | Supabase, PostgreSQL, SQLite, MySQL | ★★★ |
| 検索・AI系 | Brave Search, Sequential Thinking | ★★☆ |
| チーム連携系 | Slack, Notion, AWS, Kubernetes | ★★☆ |

### 推奨10本セット（Web制作向け）

Filesystem / GitHub / Playwright / Context7 / Figma /
Supabase / Brave Search / Docker / Vercel / Sequential Thinking
→ 「コーディング〜デプロイまで1フロー」を実現

### 重要な注意点

- MCPサーバーは「多く入れる」ことが目的ではない
- Tool Search機能でコンテキストウィンドウ消費を抑制可能（複数サーバー問題への対応）
- セキュリティリスクも解説（公式MCP優先、権限スコープ絞り込みを推奨）

### スコープ管理

ユーザーグローバル・ローカル・プロジェクト共有の3スコープを使い分ける設計を解説。
