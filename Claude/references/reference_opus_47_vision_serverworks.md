---
name: Claude Opus 4.7 ビジョン大幅進化・コーディング性能向上
description: visual-acuity 54.5%→98.5%（+81%）・解像度2,576px・SWE-bench Pro 64.3%・xhigh effort・Bedrock東京対応
type: reference
---

## 出典
- URL: https://blog.serverworks.co.jp/2026/04/17/060000
- 著者: swx-tomoya-ikeda（サーバーワークス）
- 公開日: 2026-04-17

## 概要
Claude Opus 4.7のリリース速報。最大の進化はビジョン能力（visual-acuity 54.5%→98.5%）。コーディングベンチマークも軒並み向上。xhigh effort level追加、Bedrock東京リージョン対応、価格据え置き。

## 詳細

### ビジョン能力の進化
- **visual-acuity**: Opus 4.6の54.5% → **98.5%**（+81%相対向上）
- **画像解像度**: long edge 1,568px → **2,576px**に拡張
- **情報量**: ピクセル総数で従来の**3倍以上**対応可能

### コーディング性能ベンチマーク
| ベンチマーク | Opus 4.7 | Opus 4.6 | 向上幅 |
|------------|---------|---------|-------|
| SWE-bench Verified | 87.6% | 80.8% | +6.8pt |
| SWE-bench Pro | 64.3% | 53.4% | +10.9pt |
| Terminal-Bench 2.0 | 69.4% | 65.4% | +4pt |

### 主要アップデート
1. **新effort level**: xhigh（Opus 4.7デフォルト、low/medium/high/xhigh/maxの5段階）
2. **Claude Code対応**: v2.1.111以上が必須
3. **Amazon Bedrock対応**: 東京含む4リージョン
4. **価格**: Opus 4.6と同額（入力$5/Mトークン、出力$25/Mトークン）

### 実践的な注意点
- セッション間で「max」effortは保存されず都度設定が必要
- Opus 4.7は「指示を文字通りに解釈」→既存プロンプト見直し推奨
- 4月23日にAPI/Enterprise pay-as-you-goのデフォルトモデルが自動切り替わる可能性
- Bedrock利用時の「jp.」プロファイルで日本国内閉じた運用を実現
