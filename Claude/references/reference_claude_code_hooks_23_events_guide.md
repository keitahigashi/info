---
name: Claude Code Hooks完全ガイド 23種イベント
description: 3種Hookタイプ（Shell/HTTP/Prompt）・23種ライフサイクルイベント・実践レシピ10選・多層防御設計（AI Native）
type: reference
---

## 出典
- URL: https://www.ai-native.jp/blog/claude-code-hooks-complete-guide
- 著者: 田中 慎（AI Native CEO）
- 公開日: 2026-03-27

## 概要
Hooks機能の包括的ガイド。3種類のHookタイプ、23種のライフサイクルイベント、すぐ使える実践レシピ10選を提供。

## 詳細

### 3種類のHookタイプ
1. **Shell Hook**: ローカルでシェルコマンド実行（lint、テスト）
2. **HTTP Hook**: 外部APIへHTTPリクエスト（Slack通知、ログ収集）
3. **Prompt-based Hook**: Claude自身が文脈的判断

### 23種ライフサイクルイベント（主要）
- セッション: SessionStart, SessionEnd
- ツール実行: PreToolUse, PostToolUse, PreToolResult, PostToolResult
- コミット: PreCommit, PostCommit
- 停止: StopHook, InterruptHook
- 通知: Notification, PreNotification
- SubAgent: SubAgentStart, SubAgentEnd

### 実践レシピ10選
1. 危険コマンド（`rm -rf /`等）ブロック
2. モノレポ兄弟プロジェクト変更検知
3. ファイル変更時の自動テスト
4. コミット前lint/型チェック
5. 未追跡ファイル検出
6. セッション開始時プロジェクト状態確認
7. 作業完了時コードレビュー自動実行
8. MCP使用ログJSONL記録
9. タスク完了Slack通知
10. APIキー等シークレット漏洩検知

### 多層防御設計
PreToolUse→PostToolUse→PreCommit→StopHookの4層で検証
