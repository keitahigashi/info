---
name: AIエージェントハーネスの時代 — Claude Code × Codex共通トレンド
description: Claude CodeとCodex CLIの6カテゴリ共通エコシステム分析（拡張層・CI統合・サブエージェント・ベスプラ・フレームワーク・並列実行）
type: reference
---

## 出典
- URL: https://qiita.com/backend-notes/items/d0c76aa9963e43118df4
- 著者: @backend-notes
- 公開日: 2026-04-14

## 概要
「モデル性能より運用設計がフォーカス」というテーゼのもと、Claude CodeとCodex CLIの両エコシステムが6つの共通カテゴリで収斂していることを分析。ハーネス設計が新たな競争軸であると主張。

## 詳細

### 6つの共通エコシステムカテゴリ

1. **拡張層（Extension）**
   - oh-my-claudecode（~27.5K stars）vs oh-my-codex（~20.8K stars）
   - 同一著者が異なる自律性哲学で開発

2. **CI統合**
   - claude-code-action vs codex-action
   - 各社公式のGitHub Actions

3. **サブエージェント**
   - Claude: `.claude/agents/` システム
   - Codex: awesome-codex-subagents カタログ

4. **ベストプラクティス集**
   - claude-code-best-practice / codex-cli-best-practice
   - 同一著者による並列コレクション

5. **クロスプラットフォームフレームワーク**
   - superpowers（~146K stars）
   - everything-claude-code（~150K stars）
   - Claude Code・Cursor・Codex等をまたぐ最適化

6. **並列実行**
   - claude_code_agent_farm: マルチエージェントオーケストレーション

### 設計哲学の違い
- **oh-my-claudecode**: エージェント自律性重視。`/autopilot`モード、コスト30-50%削減
- **oh-my-codex**: 計画フェーズでの人間承認ワークフロー重視。チームガバナンスモデル

### 共通の方向性
- Research → Plan → Execute → Review → Ship の共通ワークフロー
- CLIの選択よりも運用設計（ハーネス設計）が差別化要因
- GitHub Trendingの関心: コード生成→作業分割・レビュー・コンテキスト管理・CI接続へシフト
