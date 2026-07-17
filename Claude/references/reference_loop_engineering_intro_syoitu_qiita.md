---
name: 入門から実践 -「🔁 ループエンジニアリング」#ClaudeCode
description: Claude Codeを中心にループエンジニアリングの4層構造・6パーツ・CLAUDE.md/Hooks/Agentsの実装例を含む入門から実践まで網羅した技術記事。
type: reference
---

## 出典

Qiita（著者: Syoitu / KDDIアジャイル開発センター所属）: https://qiita.com/Syoitu/items/97ed37e7ba9c38dc75d8

## 概念の4層積み上げ構造

| 層 | 概念 | 主眼 |
|---|---|---|
| L1 | Prompt engineering | 一回の指示文 |
| L2 | Context engineering | ウィンドウ内の情報管理 |
| L3 | Harness engineering | 単発実行の装備 |
| **L4** | **Loop engineering** | **自動反復の仕組み** |

## ループの5アクション

- 発見（discovery）・受け渡し（handoff）・**検証（verification）← 最重要**・記憶（persistence）・スケジューリング（scheduling）

## ループを組む6パーツ

| パーツ | 役割 |
|---|---|
| Automations | スケジューリング |
| Worktrees | タスク隔離 |
| Skills | 知識の再利用 |
| Connectors(MCP) | 外部接続 |
| Sub-agents | 評価役の分離 |
| Memory | 状態保存 |

## Claude Codeでの実装3ファイル構成

1. `CLAUDE.md` — 変更→チェック→失敗時再試→最大5回・同一エラー2回で停止などループ協議を定義
2. `.claude/settings.json` — StopフックでCI実行、PostToolUseフックで型チェック自動化
3. `.claude/agents/fixer.md` — 4回失敗後に別コンテキストの評価役エージェントが介入

## 4つの落とし穴と対策

- 検証の積み残し → 評価役を必須化
- 理解の劣化 → 定期的な自分での説明確認
- 判断の放棄 → 実行は任せ、判断は手放さない
- トークン暴走 → 予算上限・再試行上限を本番前に設定
