---
name: Claude Opus 4.7 徹底解説：SWE-bench Pro 64.3%、3.75MP視覚、新effort level「xhigh」
description: AI-Driven LabによるOpus 4.7の詳細分析（視覚3倍強化・xhigh詳細・Claude Code新機能との関係）
type: reference
---

## 出典

note (AI-Driven Lab): https://note.com/ai_driven/n/n714052e37303

## 公開日

2026-04-17

## 主要内容

### コーディング性能の向上
- SWE-bench Pro: 64.3%（Opus 4.6: 53.4%、+10.9pt）
- SWE-bench Verified: 87.6%
- 長時間タスクの自動実行能力が強化
- 「自分の出力を自分で検証する」挙動を示すよう改善

### ビジョン機能の大幅拡張
- 長辺2,576ピクセル（約3.75メガピクセル）対応
- 従来比3倍超の解像度
- UI要素の細部認識や複雑図面の解釈精度が飛躍的に向上

### 新効果レベル「xhigh」
- highとmaxの間に位置する中程度の推論深化レベル
- Claude Codeにおける新しい既定値として設定
- コーディング・エージェント用途でのデフォルト推奨

### 価格
- 入力5ドル、出力25ドル / 100万トークン（変更なし）

### Claude Code新機能との関連
- `/ultrareview` コマンド: auto modeと組み合わせ
- task budgets: エージェント実行時のトークン管理が可能に
- 指示追従の厳密化により既存プロンプトの再チューニングが必要になる場合あり

### 移行時の注意
4.6から4.7へ移行する際、同じテキストが最大1.35倍のトークンに増加する新トークナイザーの影響に注意。
