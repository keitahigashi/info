---
name: ハーネスエンジニアリング5社解釈比較
description: OpenAI・Anthropic・LangChain・Martin Fowler・arXiv論文の5者によるハーネスエンジニアリング解釈の横断比較分析
type: reference
---

## 出典
- URL: https://zenn.dev/kenimo49/articles/harness-engineering-interpretations-2026
- 著者: 井本 賢（kenimo49）
- 公開日: 2026-04-04

## 概要
ハーネスエンジニアリングの定義が各組織でバラバラな問題を整理。OpenAI・Anthropic・LangChain・Martin Fowler・arXiv論文の5者の解釈を横断比較し、共通点と相違点を明確化。実務者向け3ステップ実装ガイドも提示。

## 詳細

### 共通認識: ハーネス ⊇ コンテキスト ⊇ プロンプト
全プレイヤーが合意する階層構造。ここから先の解釈が分岐する。

### 5者の解釈比較

| 項目 | OpenAI | Anthropic | LangChain | Martin Fowler | 学術(arXiv) |
|------|--------|-----------|-----------|---------------|-------------|
| 比喩 | ステアリング | 馬具 | 車体 | コードの型 | 仕様書 |
| 出発点 | 100万行実験 | 安定性課題 | ベンチマーク | コード品質 | 研究 |
| 力点 | 宣言的制約 | コンテキスト管理 | モデル非依存 | 暗黙の制約 | 形式化 |
| 独自概念 | Agent-first | Context anxiety | Agent=M+H | ハーネスしやすさ | 委任境界 |

### 各者の特徴
- **OpenAI**: 5ヶ月間エンジニアがコード0行。宣言的制約でエージェントに実装委託。並列スケーリング推奨
- **Anthropic**: Context anxiety（AIも情報過多で不安になる）を提唱。claude-progress.txt+git履歴でセッション引き継ぎ。モデル性能向上でシングルエージェント化
- **LangChain**: ハーネス改善のみでベンチマーク52.8%→66.5%（+13.7pt）。Agent=Model+Harness。LangGraph+LangSmithで実装
- **Martin Fowler**: コードベース自体がハーネス。TypeScript strict mode/Rustのborrow checker=最強の暗黙のハーネス。ハーネスは後付けでなく内在
- **arXiv**: ハーネスパターンロジックを可読かつ実行可能なオブジェクトとして外部化。AGENTS.mdの制約はプロンプトでなく「ハーネスの仕様」

### 全員の合意点
1. モデルの外側が重要
2. 制約は「お願い」ではなく「強制」
3. フィードバックループ必須
4. プロンプトエンジニアリングは不要にならない

### 意見が分かれる点
- マルチ vs シングルエージェント（OpenAI: 並列 vs Anthropic: シングルで十分）
- ハーネスの粒度（プロジェクト全体 vs 型チェック1つ）
- 「置き換え」か「積み重ね」か

### 実務者向け3ステップ
1. AGENTS.md/CLAUDE.md を500文字程度で初期化
2. 品質ゲート自動化（リンター・型チェック・pre-commitテスト）
3. フィードバックループ運用（失敗記録→制約追加→次回排除）
