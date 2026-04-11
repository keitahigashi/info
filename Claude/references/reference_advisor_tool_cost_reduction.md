---
name: Advisor Tool — Opus相談でコスト削減＋精度向上
description: Anthropic Advisor Toolの仕組み・API実装・ベンチマーク結果（コスト11.9%削減・精度2.7pt向上）
type: reference
---

## 出典
- URL: https://xenospectrum.com/anthropic-advisor-tool-cost-reduction/
- 著者: Y Kobayashi
- 公開日: 2026-04-10

## 概要
Anthropicが2026-04-09にベータリリースした「Advisor Tool」の解説。安価なモデル（Sonnet/Haiku）をエグゼキューターとし、困ったときだけOpusに相談する仕組みでコスト削減と精度向上を両立。

## 詳細

### 仕組み
- エグゼキューター（Sonnet 4.6 / Haiku 4.5）がタスクをエンドツーエンドで実行
- 複雑な判断ポイントでのみClaude Opus 4.6にエスカレーション
- 1つのAPIコール内で完結

### ベンチマーク結果
- **SWE-bench Multilingual**: Sonnet単独72.1% → Opus Advisor付き74.8%（+2.7pt）
- **コスト**: タスクあたり11.9%削減
- **BrowseComp**: Haiku単独19.7% → Opus Advisor付き41.2%（+21.5pt）

### API実装
- ベータヘッダー: `anthropic-beta: advisor-tool-2026-03-01`
- toolsに`type: advisor_20260301`を追加
- プライマリモデルにSonnet/Haikuを指定

### 料金体系
- Advisor（Opus）トークン: Opus料金で課金
- Executor（Sonnet/Haiku）トークン: 各モデル料金で課金
- 全体としてOpus単独利用より大幅に安価
