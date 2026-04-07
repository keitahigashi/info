---
name: 組織導入プラン選定ガイド（Knowledge Work実例）
description: Claude Code組織導入のプラン選定（Team vs Enterprise）と段階的移行の実践例
type: reference
---

## 出典
- URL: https://zenn.dev/knowledgework/articles/claude-code-organization-plan-guide
- 著者: minodisk（株式会社ナレッジワーク）
- 公開日: 2026-03-06

## 概要
Knowledge Work社のClaude Code組織導入実例。プラン選定の3つの優先順位（自由度・支払い管理・コスト制御）と4フェーズの段階的移行を解説。

## 詳細

### プラン選定の優先順位
1. **自由度**: 開発者が新しいツールを試せる環境
2. **支払い管理**: 組織による一元管理
3. **コスト制御**: 予測可能な費用構造

### Teamプラン vs Enterpriseプラン

| | Teamプラン | Enterpriseプラン |
|--|-----------|----------------|
| 規模 | 最大150シート | 150人超 |
| 価格 | Standard $25/月/人、Premium $125/月/人 | カスタム |
| 分析 | 管理画面+CSVエクスポート | Admin APIで利用状況プログラム取得 |

### 段階的移行（4フェーズ）
- Phase 1: APIキー従量課金
- Phase 2: Pro/Maxプラン
- Phase 3: Teamプラン Premium
- Phase 4: 全シートでClaude Code対応

### 実装のコツ
- Standardシートから開始
- 利用上限を$100に設定→超過者をPremium移行候補に
- パーチェシングカードで定額課金一本化

### 避けるべき構成
1. Max/Proプランでの個人管理（支払い分散）
2. APIキー単体利用（コスト管理困難）
3. プラン整備の完成を待つ（「完璧を待つより、まず使える方法で始めて段階的に移行」）
