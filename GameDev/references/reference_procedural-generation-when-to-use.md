---
name: "Going Rogue-like: When to Use Procedurally Generated Environments in Games"
description: 手続き的生成の適用判断基準 — スケール vs 個性のトレードオフ・歴史的分析・実践ガイドライン
type: reference
---

## 出典

Game Developer: https://www.gamedeveloper.com/design/going-rogue-like-when-to-use-procedurally-generated-environments-in-games

## 概要

手続き的生成 (procedural generation) の戦略的な使用判断について、Beneath Apple Manor (1978) から Minecraft、No Man's Sky までの歴史を追いつつ分析。

## 手続き的生成が有効なケース

- **リソース制約のあるプロジェクト**: ソロ開発者や小規模チームが予算内で十分なコンテンツを作成可能
- **大規模ワールド構築**: Daggerfall は 62,000 平方マイル vs Skyrim の 16 平方マイル
- **パーマデス (permadeath) との自然なペアリング**: 毎回のプレイスルーが新鮮に感じられる
- **探索重視ゲーム**: 環境バリエーションによるリプレイアビリティ (replayability) の向上

## スケール vs 個性のトレードオフ

核心的な緊張関係: 手続き的システムは広大な世界を生成するが、「独創性に欠ける、または反復的に感じるゲームプレイ (unoriginal or repetitive feeling gameplay)」を生みやすい。

### 具体例

- **Elder Scrolls シリーズ**: 手作りの16平方マイル（Skyrim）は、手続き生成の62,000平方マイル（Daggerfall）より「充実して記憶に残る (fleshed out and memorable)」
- **No Man's Sky**: 数京個の惑星が可能でも、量は意味のある多様性を保証しない

## 実践的ガイドライン

- 予算制約・スケジュール・スケール要件は手続き的アプローチを示唆
- プレイヤー体験が**発見・ナラティブ一貫性・場所の独自性**に依存する場合は、開発コスト増でも手作りを検討
- **戦略的に部分適用**すべきであり、全面的に適用すべきではない
