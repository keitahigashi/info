---
name: Claude Codeマルチエージェント開発の実践ガイド｜並列開発・タスク分割・同期設計
description: git worktree + AGENT_TEAM.md + Orchestrator-Workersパターンで単一エージェント比3〜5倍の開発速度を実現するマルチエージェント実践ガイド（5段階導入ステップ付き）
type: reference
---

## 出典

株式会社StartLink（今枝拓海）: https://start-link.jp/hubspot-ai/ai/claude-code-practice/claude-code-multi-agent-development

## 概要

Claude Codeのマルチエージェント開発により、複数のAIエージェントを並列実行させることで単一エージェント比で開発速度を3〜5倍に高める実践ガイド。git worktree + AGENT_TEAM.md + Orchestrator-Workersパターンが中核手法。

## コア手法

| 要素 | 説明 |
|-----|------|
| **worktree並列開発** | 複数作業ディレクトリを同一リポジトリから生成、ファイル競合を物理排除 |
| **AGENT_TEAM.md** | エージェント役割・担当ファイル・ステータスを一元管理するファイルロック宣言方式 |
| **Orchestrator-Workers** | メインエージェントが子エージェントへタスク委任するパターン |

## worktree設定コマンド

```bash
git worktree add ../project-agent-frontend feature/frontend
git worktree add ../project-agent-backend feature/backend
cd ../project-agent-frontend && claude
```

## インターフェース先行定義（TypeScript）

```typescript
export interface CRMContact {
  id: string;
  email: string;
  lifecycleStage: 'subscriber' | 'lead' | 'customer';
}
```

## Hooks自動化設定

```json
{
  "hooks": {
    "SubagentStop": [{ "command": "npm test -- --changed" }]
  }
}
```

## タスク分割の判断基準

並列化に適するケース：
- ファイル依存性が低い（異なるディレクトリを扱う）
- データ依存性がない
- 並列化コスト < 並列化効果

## 運用上の限界

- 最適エージェント数は**2〜4個**（それ以上はオーケストレーションコスト過大）
- 小規模プロジェクトには不向き
- コンテキスト共有の困難さが最大の課題

## 5段階導入ステップ

| ステップ | 内容 | 期間 |
|---------|------|------|
| 1 | サブエージェント1つで委任テスト | 1〜2日 |
| 2 | worktreeで2ブランチ分離 | 3〜5日 |
| 3 | AGENT_TEAM.md導入（3エージェント） | 1〜2週間 |
| 4 | 自動化Hooks追加 | 2〜4週間 |
| 5 | 最適構成確立 | 継続改善 |
