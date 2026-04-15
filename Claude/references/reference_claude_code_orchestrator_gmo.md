---
name: GMO 8ステップオーケストレーターワークフロー
description: Claude Code基本機能（Skills・Rules・Hooks・Sub Agents・Agent Teams・Memory）で開発全工程8ステップを自動化（8エージェント・21スキル・4Hook構成）
type: reference
---

## 出典
- URL: https://recruit.group.gmo/engineer/jisedai/blog/claude-code-orchestrator/
- 著者: K.X.D（次世代ベトナム研究室）
- 組織: GMOインターネットグループ グループ研究開発本部
- 公開日: 2026-04-06

## 概要
Skills・Rules・Hooks・Sub Agents・Agent Teams・Memoryの6基本機能を組み合わせて開発全工程を8ステップで自動化するワークフロー設計。3つの施策で品質・学習・コスト課題を解決。

## 詳細

### 設計4原則
1. コンテキスト分割: Agent Teamsでタスク毎にセッション分離
2. ロール明示: Sub Agentで「テスター」等の役割定義
3. 手順化: Skillで標準作業フロー確立
4. ルール注入: Rules + Hookで規約を自動適用

### 8ステップワークフロー
- Step 1: 人間による要件整理
- Step 2: Researcher Agent（Scout Skill並列情報取得）
- Step 3: Planner Agent（開発ルール・アーキテクチャ確認→詳細設計）
- Step 4: Code Agent（計画に沿った実装）
- Step 5: Tester Agent（自動テスト・セキュリティ検証）
- Step 6: Code Reviewer Agent（規約準拠性・ロジック確認）
- Step 7: Docs Manager Agent（ドキュメント自動更新）
- Step 8: Git Agent（Conventional Commit形式プッシュ）

### 施策1: 複数エージェントオーケストレーター
- 課題: 大きなタスクで品質低下
- 解決: Agent Teams + Sub Agentsで自動タスク分割
- 5つのAgentTeamテンプレート: Research・Implement-orchestrator・Independent-impl（worktree）・Review・Debug
- 成果: プロフィール8画面を約30分で全自動実装

### 施策2: 経験則自動メモリ
- 課題: 同じミスの繰り返し
- Hook①「memory-save-detector」: 修正指示・承認・外部参照・ユーザー情報を検出
- Hook②「skill-create-on-miss」: 繰り返しパターンをSkill化提案
- 6ステップ学習フロー: 行動観察→データ蓄積→パターン抽出→経験則保存→昇格判定（失敗3回以上）→次セッション自動適用

### 施策3: ドキュメント自動メンテナンス
- 課題: トークンコスト膨張
- Scout Skill: ワークフロー初期段階で関連仕様を並列収集
- 800行超過時に自動分割（Docs Manager Agent）
- 効果: トークン消費を3〜10分の1に削減

### 最終構成
- Agent定義8種: architecture, researcher, planner, developer, code-reviewer, tester, code-simplifier, git-manager
- Skill定義21種: plan, scout, code-review, debug, research, impl-orchestrator等
- カスタムHook4種: session-init.cjs, dev-rules-reminder.cjs, descriptive-name.cjs, post-edit-simplify.cjs
