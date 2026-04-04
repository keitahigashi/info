---
name: Claude Agent SDK完全ガイド
description: Claude Agent SDKのインストール・API仕様・ビルトインツール・Hooks・サブエージェント・MCP連携・本番デプロイまでの実践ガイド（AQUA記事）
type: reference
---

## 出典

AQUA記事: https://www.aquallc.jp/claude-agent-sdk-complete-guide/
著者: AQUA合同会社
公開日: 2026-03-09

## 概要

Claude Agent SDKはClaude Code CLIと同一のエージェントループ・ツール実行機構・コンテキスト管理をPython/TypeScriptライブラリとして提供。ツール実装を自前で記述不要。

## パッケージ

| 項目 | Python | TypeScript |
|------|--------|-----------|
| パッケージ名 | claude-agent-sdk | @anthropic-ai/claude-agent-sdk |
| バージョン | v0.1.48 | v0.2.71 |
| 要件 | Python 3.10+ | Node.js 18+ |

```bash
pip install claude-agent-sdk
# or
npm install @anthropic-ai/claude-agent-sdk
export ANTHROPIC_API_KEY=your-api-key
```

クラウド対応: Bedrock(`CLAUDE_CODE_USE_BEDROCK=1`), Vertex AI(`CLAUDE_CODE_USE_VERTEX=1`), Azure(`CLAUDE_CODE_USE_FOUNDRY=1`)

## ビルトインツール（9種）

Read, Write, Edit, Bash, Glob, Grep, WebSearch, WebFetch, AskUserQuestion

## 権限モード

| モード | 編集 | コマンド実行 | 用途 |
|-------|------|-----------|------|
| default | 承認必要 | 承認必要 | 対話型開発 |
| acceptEdits | 自動承認 | 承認必要 | コード修正 |
| plan | 承認必要 | 承認必要 | 計画立案 |
| bypassPermissions | 自動 | 自動 | サンドボックス（Docker必須） |

## Hooks（介入ポイント）

18種類以上。主要: PreToolUse（実行前許可/拒否）、PostToolUse（ログ記録）、Stop（クリーンアップ）、Notification（Slack等連携）

## サブエージェント

AgentDefinitionで専門特化型を定義。フィールド: description(必須), prompt(必須), tools(任意), model(任意: sonnet/opus/haiku/inherit)

## MCP連携

- stdio: ローカルプロセス接続
- HTTP/SSE: リモートサーバー
- SDK MCPサーバー: インプロセス（`@tool`デコレータで定義）
- ツール命名: `mcp__<サーバー名>__<ツール名>`

## セッション管理

- continue: 同一セッション自動継続
- resume: session_idで後から再開
- fork: 分岐して別アプローチを試す

## モデル・価格

| モデル | 入力 | 出力 | 特徴 |
|-------|------|------|------|
| Opus 4.6 | $15/MTok | $75/MTok | 最高性能 |
| Sonnet 4.6 | $3/MTok | $15/MTok | コスト効率最良 |
| Haiku 4.5 | $0.80/MTok | $4/MTok | 高速低コスト |

Batch API: 50%割引

## ユースケース

PRレビュー自動化、コードマイグレーション、ドキュメント生成、テスト生成、インシデント対応

## フレームワーク比較

Agent SDK vs LangChain vs CrewAI vs OpenAI Agents — Agent SDKはビルトインツール9個・MCPネイティブ対応・学習コスト低が優位点
