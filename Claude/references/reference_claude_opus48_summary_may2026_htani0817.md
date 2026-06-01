---
name: 【2026年5月】Claude Opus 4.8がリリース！Dynamic Workflows・誠実性向上・API変更点まとめ
description: htani0817氏によるOpus 4.8の包括的まとめ。モデルスペック・ベンチマーク・新機能・API移行時の注意点を網羅
type: reference
---

## 出典

Qiita (@htani0817): https://qiita.com/htani0817/items/192700675cd44dfd1e13

## モデルスペック

| 項目 | 内容 |
|------|------|
| モデルID | `claude-opus-4-8` |
| 入力価格 | $5/1M tokens（標準） |
| 出力価格 | $25/1M tokens（標準） |
| コンテキスト | 1M tokens |
| リリース日 | 2026年5月28日 |

## ベンチマーク結果

| ベンチマーク | スコア | 備考 |
|------------|--------|------|
| SWE-bench Verified | 88.6% | 前モデル比+1pt |
| USAMO 2026 | 96.7% | +27.4ポイント |
| GraphWalks F1@1M | 68.1% | +27.8ポイント |

## 主要な新機能

### Dynamic Workflows
数百の並列サブエージェントを協調させて大規模タスクを自律遂行

### 誠実性（Honesty）の向上
- コード欠陥見逃し確率が前モデルの約1/4に低下
- flawed data hallucination 0%

### Mid-task System Entry
タスク途中での指示変更をプロンプトキャッシュ維持で実行可能

## API移行時の注意点

- `temperature` / `top_p` / `top_k` は**非サポート** → `effort` パラメータで代替
- `extended thinking budget` の明示指定は利用不可

## effortパラメータ

```json
{
  "output_config": {
    "effort": "high"  // or "xhigh" or "max"
  }
}
```

Fast Modeは従来比3倍安・2.5倍速を実現。
