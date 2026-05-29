---
name: 【Claude Opus 4.8】価格据え置きで正直さと判断力が大幅強化されたAnthropicのフラグシップモデルを徹底解説
description: Claude Opus 4.8の完全解説。USAMO 96.7%・GDPval-AA 1890 Eloなど詳細ベンチマーク付きで新機能・価格・安全性を網羅
type: reference
---

## 出典

WEEL（ウィール）: https://weel.co.jp/media/tech/claude-opus-4-8/

## Claude Opus 4.8概要

**公開日：** 2026年5月29日

## 主なトピック

- コード欠陥の見逃し率が前世代の**約4分の1**に低下
- Opus 4.7と同価格で提供
- ASL-3保護措置のもとでデプロイ
- Dynamic Workflows・Effort Control・Fast Mode値下げ

## ベンチマーク比較（詳細）

| 指標 | Opus 4.8 | Opus 4.7 | GPT-5.5 |
|------|----------|----------|---------|
| SWE-Bench Pro | **69.2%** | 64.3% | 58.6% |
| GDPval-AA（Elo） | **1890** | 1753 | 1769 |
| USAMO 2026 | **96.7%** | 69.3% | — |
| GraphWalks（F1） | **68.1%** | 40.3% | — |

## 新機能の詳細

### Dynamic Workflows
数百の並列サブエージェントで大規模タスクを自動分解・実行。Claude Codeでの大規模自律コーディングが強化

### Effort Control
- 5段階推論レベル設定（Low/Medium/High/Extra/Max）
- デフォルト：High

### Fast Mode（価格改定）
- 速度：通常の**2.5倍**
- 価格：従来比**3分の1**に値下げ

## 料金体系

| モード | 入力 | 出力 | コンテキスト |
|--------|------|------|------------|
| 通常 | $5 / 100万 | $25 / 100万 | 100万トークン |
| Fast | $10 / 100万 | $50 / 100万 | — |

## 安全性

ASL-3（Anthropic Safety Level 3）保護措置のもとでデプロイ済み

<!-- 日常で得た知見をここに追記 -->
