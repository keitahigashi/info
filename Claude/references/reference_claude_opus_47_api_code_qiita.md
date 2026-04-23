---
name: Claude Opus 4.7 徹底解説 — ベンチマーク・価格・1Mコンテキスト・実コード例まで
description: QiitaによるOpus 4.7の完全解説（APIコード例・ベンチマーク・破壊的変更・モデル使い分け）
type: reference
---

## 出典

Qiita (@kotaro_ai_lab): https://qiita.com/kotaro_ai_lab/items/a21df0903ab7d3515183

## 公開日

2026-04-19

## 主要内容

### リリース情報
- モデルID: `claude-opus-4-7`
- 1Mコンテキスト対応（追加料金なし）
- リリース日: 2026年4月16日

### ベンチマーク成績
| ベンチマーク | Opus 4.6 | Opus 4.7 | 差分 |
|---|---|---|---|
| SWE-bench Verified | 80.8% | 87.6% | +6.8pp |
| Terminal-Bench 2.0 | 65.4% | 69.4% | +4.0pp |
| GPQA Diamond | 91.3% | 94.2% | +2.9pp |

### 価格
- 入力 $5 / 出力 $25 per Million tokens（4.6と据え置き）
- 新トークナイザで同テキストが最大1.35倍に膨らむため実コスト注意
- Batch API で50%割引

### API破壊的変更
- Extended Thinking budget 廃止 → Adaptive Thinking のみ対応
- temperature / top_p / top_k 廃止
- 新エフォートレベル「xhigh」追加

### コード例（Python）

```python
import os
from anthropic import Anthropic

client = Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

response = client.messages.create(
    model="claude-opus-4-7",
    max_tokens=4096,
    thinking={"type": "adaptive", "display": "summarized"},
    output_config={"effort": "xhigh"},
    messages=[{"role": "user", "content": "Pythonで二分探索木を実装してください"}]
)
```

### Claude Code新機能
- `/ultrareview` コマンド: クラウドサンドボックスで複数レビューエージェントを並列実行
- xhigh エフォートレベルがデフォルト推奨に

### モデル使い分け
| モデル | 適用シナリオ |
|---|---|
| Opus 4.7 | 長時間エージェント、巨大コードベース調査 |
| Sonnet 4.6 | 一般的なバックエンド開発、日常コーディング支援 |
| Haiku 4.5 | リアルタイムチャット、軽量分類（コスト最適化） |
