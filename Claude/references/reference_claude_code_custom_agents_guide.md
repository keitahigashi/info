---
name: カスタムサブエージェントの作り方
description: .claude/agents/定義方法・フロントマター設定・メモリスコープ・1責務の原則・自動委譲メカニズム（StartLink）
type: reference
---

## 出典
- URL: https://start-link.jp/hubspot-ai/ai/claude-code-practice/claude-code-custom-agents
- 著者: 今枝 拓海（StartLink）
- 公開日: 2026-03-30

## 概要
.claude/agents/にMarkdownファイルを配置して特定業務に特化したサブエージェントを定義する方法。

## 詳細

### フロントマター設定項目
| フィールド | 説明 |
|----------|------|
| name | 一意な識別子（小文字・ハイフン区切り） |
| description | 委譲条件の説明文（Claudeが適合性判断に使用） |
| tools | 使用可能ツール（カンマ区切り） |
| model | sonnet/opus/haiku/inherit |
| memory | user/project/local スコープ |
| isolation | worktree（分離実行） |

### 実装パターン例
- SEO記事レビュー: tools=Read,Glob,Grep / memory=project
- HubSpot API操作: memory=user（複数プロジェクト横断）
- デバッグ専門: tools=Read,Edit,Bash,Grep,Glob / isolation=worktree

### 設計原則
1. **1責務の原則**: 各エージェントは単一領域に特化
2. **ツール最小化**: 必要最小限から段階的に追加
3. **Git管理**: プロジェクトレベル定義は版管理対象化推奨

### メモリスコープ
- user: 全プロジェクト横断で学習共有
- project: 特定プロジェクト向け
- local: gitignore対象の機密情報

### 自動委譲
Claudeはdescriptionフィールドからタスク適合性を判断し自動委譲する。
