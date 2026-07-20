---
name: Loop Engineering（ループエンジニアリング）とは — AIエージェントに「指示する」のをやめ、エージェントを回す「ループ」を設計する
description: Addy Osmani氏が命名したLoop Engineeringの定義・用語系譜・Claude CodeとCodexの対応機能表・ループの落とし穴を体系的に解説した定義記事。
type: reference
---

## 出典

Qiita（著者: @y-morimatsu / NECソリューションイノベータ株式会社）: https://qiita.com/y-morimatsu/items/e8563a60c6a5cb94ffe7

## 用語の系譜（段階的拡張）

```
Prompt Engineering → Context Engineering → Harness Engineering → Loop Engineering
（モデルへの話し方）  （入力全体の構成）   （足場全体の設計）    （自走システムの設計）
```

- GoogleエンジニアのAddy Osmani氏が2026年6月に命名
- Boris Cherny（Claude Code）とPeter Steinberger（OpenClaw）の実務発言がきっかけ

## ループの6部品と実装例（Claude Code vs OpenAI Codex）

| 部品 | Claude Code | OpenAI Codex |
|---|---|---|
| Automations | `/loop`、cron、Routines | Automationsタブ |
| Worktrees | `--worktree`フラグ | スレッド自動取得 |
| Skills | Agent Skills（`SKILL.md`） | `.agents/skills` |
| Connectors | MCP（stdio/HTTP） | `config.toml` |
| Sub-agents | `.claude/agents/`（Markdown） | `.codex/agents/`（TOML） |

## 重要な知見

- 「記憶はコンテキストではなくディスクに置く。エージェントは忘れるがリポジトリは忘れない」（Osmani氏）
- 検証の自動化が最も困難：生成モデルは自分のコードを採点するのに「優しすぎる」
- 解決策：生成と検証を異なるサブエージェントに分離、新コンテキストで敵対的視点のレビュー

## 4つの落とし穴

| 落とし穴 | 発生メカニズム | 対策 |
|---|---|---|
| 理解の負債 | 生成速度 > 人間の理解速度 | 小さく・低頻度から開始 |
| 思考の放棄 | 自動化快適性で評価判断停止 | 厳しい完了条件を設定 |
| トークン暴走 | 無制限に検証モデルが実行 | 予算制御・数日監視 |
| 未レビュー公開 | 生成速度がレビュー速度を超過 | 人間の最終責任を堅持 |
