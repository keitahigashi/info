---
name: 2026/06/15以降に料金体系が変更されたClaudeをどう使うか考えてみた
description: 「2つのおさいふ」分離モデルの解説とCodexとの使い分け・コスト試算
type: reference
---

## 出典

DevelopersIO: https://dev.classmethod.jp/articles/claude-code-pricing-change/

## Claude 2026年6月15日料金改定まとめ（2026年6月15日）

### 基本概念：「2つのおさいふ」
2026年6月15日以降、Claudeの課金が2系統に分離された。

| おさいふ | 対象 | 課金方式 |
|---------|------|---------|
| **おさいふ1（インタラクティブ）** | claude.ai・ターミナル/IDE・Cowork | サブスクリプション枠（従来通り） |
| **おさいふ2（自動化）** | Agent SDK・`claude -p`・GitHub Actions | 月次クレジット制 |

### Agent SDK月次クレジット付与額

| プラン | クレジット/月 |
|-------|------------|
| Pro | $20 |
| Max 5x | $100 |
| Max 20x | $200 |

### Codexとの課金モデル比較

| 項目 | Claude インタラクティブ | Codex |
|-----|---------------------|-------|
| 上限リセット | 5時間セッション＋週次固定リセット | 5時間ウィンドウ＋追加の週次上限 |

### 実務的な使い分け戦略
- **日中**: Claude設計 + Codex実装 + `/loop` + Cowork schedule
- **夜間**: Remote Routine（おさいふ1優先） → Codexクラウド
- **CI**: API キー直指定推奨（クレジット消費を回避）

### コスト試算例
- Max 5x + Agent SDK で約444PR/月対応可能
- 高頻度CIはAPIキー移行が実質的に必要

### 注意点
- クレジット繰り越し・プール不可
- opt-inはAnthropicからのメールで実施
- Extra usage OFF時は本番が停止する可能性あり
