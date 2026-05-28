---
name: OrcaRouter MCP Server正式リリース ― Claude Code等200+AIモデルへの統一アクセス
description: OrcaRouterがMCP Server機能を正式リリースし、Claude Code/Cursor等から200以上のAIモデルに1エンドポイントでアクセス可能に
type: reference
---

## 出典

PR TIMES（FlashLabs株式会社）: https://prtimes.jp/main/html/rd/p/000000036.000138449.html

## OrcaRouter MCP Server概要

### 発表日
2026年5月28日

### 概要
FlashLabs株式会社（提携先：Continuum AI Corporation）が「OrcaRouter」のMCP Server機能を正式リリース。Claude Desktop、Cursor、Windsurf、Zed等のMCPクライアントから200以上のAIモデルに統一アクセスできる。

### 対応AIモデル（例）
- Anthropic Claude Opus 4.7
- OpenAI GPT-5.5
- DeepSeek V4 Pro API（75%割引）
- Google Gemini
- Qwen 3.7 Max

### 主要機能

| 機能 | 概要 |
|------|------|
| 統一エンドポイント | 200+モデルを1つのMCPサーバーで利用 |
| 適応型自動ルーティング | 定型処理をオープンモデルで約1/15コスト処理 |
| 自動フォールバック | モデル障害時に別モデルへ自動切替 |
| ガードレール（8種） | 個人情報保護・シークレット検出等 |
| ベンダーロックイン排除 | モデル間の柔軟な切り替えが可能 |

### 活用シーン
- Claude Codeで複数モデルを使い分けるコスト最適化
- モデル障害時の自動フォールバックによる可用性向上
- エンタープライズ向けコンプライアンス対応（PII保護等）

<!-- 日常で得た知見をここに追記 -->
