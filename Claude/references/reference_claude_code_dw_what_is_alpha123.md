---
name: "Claude Code Dynamic Workflowsとは一体何なのか"
description: Dynamic Workflowsが「固定ワークフロー設計」から「実行時動的構成」へのシフトである点を解説。Claudeがリポジトリ構造を分析して自動的にワークフローを構築する仕組みを説明（Qiita / alpha123, 2026-05-30）
type: reference
---

## 出典

Qiita (alpha123): https://qiita.com/alpha123/items/bbe84d53a4d95e1cb044

## Dynamic Workflows とは

### 従来のアプローチ（静的設計）

「migration skill」など、人間がサブエージェントを明示的に組み合わせてワークフローを事前設計していた。

```
人間 → ワークフロー設計 → サブエージェントA → サブエージェントB → ...
```

### Dynamic Workflows（動的構成）

タスク全体を Claude に渡すと、**リポジトリ構造や依存関係に応じて Claude 側がワークフローを自動構築**する。

```
人間 → タスク記述 → Claude がワークフロー生成 → 並列サブエージェント実行
```

## 特に効果的なユースケース

| タスク種別 | 理由 |
|-----------|------|
| Spring Boot マイグレーション | モジュール間依存の自動解析が必要 |
| Java バージョン更新 | 多数ファイルへの影響範囲を動的に特定 |
| コードベース全体の監査 | ファイル数・構造によって分割方法が変わる |
| 大規模リファクタリング | 変更箇所の依存グラフが事前不明 |

## Skills や Subagents との違い

- **Skills**: 人間が定義した再利用可能な手順
- **Subagents**: 並列実行される個別エージェント（サブタスク担当）
- **Dynamic Workflows**: Claude が必要に応じてスクリプトを生成し、サブエージェントを動的にオーケストレーション

## 使用例

```text
> create a workflow that migrates every internal fetch() call to the new HttpClient wrapper
```

Claude がリポジトリを分析し、影響ファイル数・依存関係に応じたワークフロースクリプトを生成してから実行する。

<!-- 日常で得た知見をここに追記 -->
