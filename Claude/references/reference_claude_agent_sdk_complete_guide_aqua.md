---
name: Claude Agent SDK 完全ガイド【2026年最新】｜Python・TypeScriptでAIエージェントを構築する実践手法
description: Agent SDKの15セクション実践ガイド（コード例15本）
type: reference
---

## 出典

AQUA テックブログ: https://www.aquallc.jp/claude-agent-sdk-complete-guide/

## 概要

掲載日: 2026年3月9日。導入から本番デプロイまでを15セクション・コード例15本で解説。Python・TypeScript両言語対応。

## Agent SDKの位置づけ

Claude Agent SDKは「Claude Codeの内部エンジンをPython/TypeScriptライブラリとして公開したもの」。Messages APIとの違いはツール実行の自前実装が不要な点。

## 9つのビルトインツール

| カテゴリ | ツール名 |
|---|---|
| ファイル操作 | Read / Write / Edit |
| システム | Bash / Glob / Grep |
| Web | WebSearch / WebFetch |
| インタラクション | AskUserQuestion |

## マルチエージェント構成

- `AgentDefinition`で専門特化サブエージェントを定義
- コンテキスト分離・並列実行・ツール制限を実現
- 複雑タスクを役割分担で処理

## セキュリティ機能

```python
# 権限モード
permission_mode: default | acceptEdits | plan | bypassPermissions
# Hooksによる監査
PreToolUse / PostToolUse で細かい制御が可能
```

## MCP連携とセッション管理

- MCPでGitHub・Docs等の外部ツールを統合
- セッション管理: 会話履歴永続化・resume・fork をサポート

## 本番運用コスト試算

月間$15〜$300（用途・規模による）。「bypassPermissionsはサンドボックス環境でのみ使用」を強調。
