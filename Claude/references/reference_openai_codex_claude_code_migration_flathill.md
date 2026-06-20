---
name: AIエージェントSci-Phiの育成日記（8）：OpenAI Codex廃止——そして「帰還」
description: OpenAI Codex廃止後にClaude Codeへ移行した実録。Agent SDKクレジット解禁との幸運なタイミング
type: reference
---

## 出典

Qiita（flathill）: https://qiita.com/flathill/items/9e587b4bb577e027cc96

## OpenAI Codex廃止 → Claude Code移行の実録

### 概要

公開日：2026年6月16日。OpenAI CodexがGPT-5.4/5.5への集約で2026年6月2日に廃止されたことで、Claude Code CLIで動作するAIエージェント「Sci-Phi」が停止。復旧までの経緯と、Agent SDKクレジット解禁とのタイミングが重なった体験記。

### 停止の原因（3点）

| 原因 | 詳細 |
|------|------|
| OpenAI APIの廃止 | ChatGPT OAuth経由の`gpt-5.3-codex`が廃止、GPT-5.4/5.5に集約 |
| OpenClawの陳腐化 | 4ヶ月間更新なし、モデルルーティング仕様の変更に未対応 |
| 認証トークン失効 | Claude Code CLIの認証トークンが2月24日に期限切れ |

### 解決手順

1. OpenClawを`2026.2.19-2` → `2026.6.6`にアップデート
2. モデルを`claude-cli/claude-sonnet-4-6`に変更
3. Claude Proの認証を再実行

### Agent SDK クレジット解禁との偶然の一致

復旧当日（2026年6月15日）、Anthropicが**Agent SDKクレジット制度を正式解禁**。

- Claude Pro内に月$20クレジットが含まれるように
- `claude -p`コマンドでのエージェント実行が制限からクレジット消費へ変更
- タイミングが良く、追加コストなしでスムーズに移行完了

### コーディングエージェント移行の示唆

- Codexのような独自モデルに依存する設計はリスクが高い
- Claude Code CLIを介したエージェント設計は汎用的で移行性が高い
- Agent SDKのクレジット分離により、自動化用途のコスト見積もりが明確化
- OpenClawのようなオープンソースAIフレームワークは最新APIへの追従が課題

### 教訓

**「止まったら早めに原因を3分割して考える」**
1. 外部API側の変更か
2. フレームワーク側の更新漏れか
3. 認証情報の失効か
