---
name: Claude Code Workflow Studio完全ガイド｜ビジュアルでAIワークフローを構築する新時代
description: VS Code拡張「Claude Code Workflow Studio」でノードのドラッグ＆ドロップによりマルチエージェント連携ワークフローをビジュアル設計し、標準準拠のMarkdownとしてエクスポートできる。
type: reference
---

## 出典

アイドリ | AI-Driven Lab（ポノテク株式会社運営）: https://note.com/ai_driven/n/nce437c34242f

## Claude Code Workflow Studioとは

VS Code拡張機能として機能するAIワークフローのビジュアルエディタ。開発者「breaking-brake」氏によるAGPL-3.0ライセンスのOSSプロジェクト（v3.10.0、1,100+ GitHubスター、297件マージ済みPR）。

## 解決する3つの課題

- 設定ファイルの複雑さ（従来はMarkdown/YAML手動記述）
- 複雑なマルチエージェントフローの可視化困難
- 非エンジニアの参加障壁

## 8種類以上のノードシステム

Promptノード、Sub-Agentノード、IfElseノード、Switchノード、AskUserQuestionノード、Skillノード、MCPノード。テンプレート変数は `{{variableName}}` 形式で動的入力に対応。

## 主要機能

- ビジュアルキャンバス: ノードのドラッグ＆ドロップで設計
- AI支援編集: 自然言語でワークフロー修正
- エクスポート: `.claude/agents/`・`.claude/commands/` 準拠のMarkdown形式
- モデル選択: Haiku（高速）・Sonnet（バランス）・Opus（高品質）

## 実践ユースケース例

1. ドキュメント要約パイプライン: Document Input → Key Extractor → Summarizer → Formatter
2. コード分析・修復: Code Input → Analyzer → HasBugs分岐 → Security Checker/Fix Proposer
3. PR自動レビュー: GitHub MCP → File Type Router（Switch）→ Frontend/Backend/Infrastructure専門レビュアー
4. インタラクティブデータ分析: Data Input → AskUserQuestion → 統計/可視化/予測分岐

## 前提環境・制限事項

- VS Code 1.80.0以上、Node.js 18.0以上、RAM 2GB（推奨4GB）、Anthropic APIキー
- 最大50ノード/ワークフロー、デフォルト90秒タイムアウト（30秒〜5分設定可能）
