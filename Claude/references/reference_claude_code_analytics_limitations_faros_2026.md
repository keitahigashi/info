---
name: "Claude Code Analytics: What the Data Can and Can't Tell You"
description: Analytics APIで計測できることとできないことを22,000人規模データで実証し、完全なエンジニアリング把握には追加指標が必要と解説。
type: reference
---

## 出典

Faros AI Blog（著者: Naomi Lurie）: https://www.faros.ai/blog/claude-code-analytics

## Claude Code Analytics APIの実践的限界

### 概要

2026年6月29日公開。Faros AIがClaude Code Analytics APIの実践的限界を指摘した
高品質な英語技術記事。22,000人の開発者データに基づく実証分析を含む。

### データ収集の2経路

| 方式 | 対象プラン | 特徴 |
|----|---------|-----|
| Analytics API | 従量課金（Pay-as-you-go） | Pull型・日次集計・過去データ参照可 |
| OpenTelemetry | Enterprise / Team | Push型・リアルタイム・設定時点以降のみ |

### 計測できる3指標カテゴリ

- **Usage（採用状況）**: セッション数・アクティブユーザー数
- **Contribution（貢献度）**: 承認率・コミット数・コード変更行数・PR作成数
- **Cost（コスト）**: トークン消費量・コミットあたり単価

### 計測できない領域（重要な指摘）

Analytics APIが捉えるのは「エディタ内の活動」のみ。以下は把握不可：

- コードレビュー品質
- CI/CDパイプラインの成否
- 本番障害との相関

> 「承認率は "Claudeが生成したコードを使った" ことを示すが、
>   そのコードがレビューを通過したかは分からない」

### 危険なパターン（22,000人データより）

ツール指標だけでは不可視な問題が発生：

- PR中央値レビュー時間が441%増加
- PRあたりインシデント率が243%上昇

### 解決策（Faros Token Intelligence）

トークン消費を「生産的・非効率・無駄」に分類し、
実際にシップされた成果物と接続することで真の生産性を計測。
