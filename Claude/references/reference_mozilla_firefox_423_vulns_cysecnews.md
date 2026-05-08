---
name: Mozilla Patches 423 Firefox 0-Day Vulnerabilities with Claude Mythos and Other AI Models
description: CyberSecurity NewsによるMozillaのAI活用セキュリティパイプライン解説：Claude MythosとAIモデルでFirefox 423個の脆弱性を2026年4月に修正
type: reference
---

## 出典

CyberSecurity News: https://cybersecuritynews.com/firefox-423-0-day-vulnerabilities/

## 概要

2026年5月8日公開。Mozillaが2026年4月にFirefoxの脆弱性423件を修正した事実を詳細に報道。Anthropicの「Claude Mythos Preview」が271件（全体の約64%）を発見したAIエージェント型セキュリティパイプラインの全貌を解説。

## スケール感

| 指標 | 数値 |
|------|------|
| 2026年4月のFirefox修正数 | **423件** |
| 2025年の月平均修正数 | 約21件 |
| 月平均比 | **約20倍** |
| Claude Mythos Previewが発見 | **271件**（全体の64%） |

## Claude Mythosの貢献内訳

| 深刻度 | 件数 |
|--------|------|
| sec-high（高） | 180件 |
| sec-moderate（中） | 80件 |
| sec-low（低） | 11件 |

※ sec-high = 通常のユーザー操作（悪意あるWebページを閲覧するだけ）で悪用可能

## 発見された注目脆弱性

- 15年前のHTMLの`<legend>`要素の欠陥
- 20年前のXSLTエンジンのメモリ解放後使用（UAF）バグ
- IPC競合状態によるサンドボックス回避
- NaN型ポインタ逆シリアル化

## AIパイプラインの進化プロセス

**Phase 1（Claude Opus 4.6で開始）：**
- 約6,000件のC++ファイルをスキャン
- 22件の確認済みセキュリティバグ → Firefox 148で修正

**Phase 2（Claude Mythos Preview導入）：**
- 静的解析から**エージェント型動的検証**へ移行
- 「バグ仮説生成 → 再現可能なPoC自動生成 → 動的実行検証」のループ
- 誤検知を大幅削減、大規模展開が可能に

## セキュリティ業界への示唆

- AIによるバグ発見が「試験的取り組み」から**工業スケールの実務ツール**へ転換
- ハーネスエンジニアリング（エージェント型パイプライン設計）が突破口
- 単純なプロンプトではなく、テストケース自動生成・動的検証の組み合わせが鍵
- 将来的にはブラウザセキュリティの標準的な開発プロセスに組み込まれる可能性
