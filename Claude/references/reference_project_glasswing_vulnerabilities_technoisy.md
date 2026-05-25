---
name: Project Glasswing 初動報告。Anthropicが1ヶ月で重大脆弱性1万件超を発見
description: AnthropicのセキュリティプロジェクトProject Glasswingが開始1ヶ月で高深刻度脆弱性1万件超を発見した初期報告
type: reference
---

## 出典

TECH NOISY: https://tech-noisy.com/2026/05/25/project-glasswing-vulnerabilities-discovered/

## 公開日

2026年5月25日

## Project Glasswing 概要

Anthropicが2026年5月22日に発表したサイバーセキュリティプロジェクト。約50のパートナー組織と連携し、Claude Mythos Previewを活用した脆弱性発見を実施。

## 初動成果（開始1ヶ月）

- **発見脆弱性数**: 高深刻度または重大深刻度 **10,000件超**
- **Cloudflare**: 2,000件のバグを検出
- **Mozilla**: Firefoxでこれまでの**10倍超**の脆弱性を特定

## 第三者評価

英国AI Security Instituteによる評価：
- Claude Mythos Previewが複数のセキュリティベンチマークで最高スコアを達成

## 課題：修正側のボトルネック

| 指標 | 数値 |
|------|------|
| 報告された脆弱性 | 530件 |
| パッチ適用済み | 75件 |
| パッチ適用率 | 約14% |

発見から修正への移行ボトルネックが主要課題として浮上。AI発見速度に対して人間の修正リソースが追いつかない構造的問題。

## Claude Security との関係

Claude Security（パブリックベータ）は、Project Glasswingの知見を活かしたEnterprise向け機能として5月公開。コード脆弱性の自動スキャンと修正提案を提供。

## 参加パートナー組織

Cloudflare、Mozilla等の主要クラウドベンダー・OSS組織を含む約50社。金融機関も含む。
