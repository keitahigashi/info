---
name: Claude Code「新卒部下」ワークフロー
description: Claude Codeを「優秀な新卒部下」として扱い個人開発を3〜5倍高速化するワークフロー設計
type: reference
---

## 出典
- URL: https://zenn.dev/yoshiaki0217/articles/9dd7a3666d475f
- 著者: yoshiaki0217
- 公開日: 2026-02-24

## 概要
Claude Codeを単なるコード補完ではなく「経験の浅い新卒エンジニア」として扱い、環境設計（CLAUDE.md + ai/rules + GitHub MCP）で個人開発を3〜5倍高速化するワークフローを解説。

## 詳細

### 実装の3つの柱

**1. CLAUDE.mdの設計（思想と実行原則）**
- 計画フェーズ: 3ステップ以上は自動でプランモード
- サブエージェント戦略: リサーチを委譲
- 自己改善ループ: lessons.md で失敗パターンを記録
- 完了前の検証: 動作実証が必須

**2. ai/rulesディレクトリによるルール分割**
```
ai/rules/
├── GIT_WORKFLOW.md          # ブランチ・コミット・PR規約
├── PROJECT_ARCHITECTURE.md  # アーキテクチャ定義
└── REACT_NATIVE_GUIDELINES.md # コード規約
```
特定タスク時に関連ルールだけ参照→「迷わない環境」を実現

**3. GitHub MCPでIssue→PR全自動化**
GitHub API経由でIssue作成→ブランチ管理→PR作成を自律実行。GIT_WORKFLOW.mdルール準拠で一貫性保証。

### 生産性の実測値

| 項目 | 導入前 | 導入後 |
|------|-------|-------|
| 新機能1つ | 2〜3時間 | 30〜60分 |
| バグ修正 | 30分〜1時間 | 5〜15分 |
| ブランチ〜PR | 15〜20分 | ほぼ0分 |

### Claudeに任せない領域
- 本番環境への最終デプロイ判断
- git push --force などの破壊的操作
- 認証・課金・個人情報関連の実装
- 曖昧な大規模リファクタリング

### 成功の本質
「プロンプト工夫」ではなく「環境設計」が鍵。初期2〜3時間の投資（CLAUDE.md + ai/rules整備）で以降の開発で何十倍にも回収。
