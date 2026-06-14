---
name: Claude Fable 5徹底解説 — Mythos級の性能・料金・Opus 4.8との違い・個人開発での使い方【2026年6月最新】
description: Fable 5のAPI仕様変更（temperature廃止・effort5段階）、フォールバック機構、個人開発での使い分け戦略を詳解
type: reference
---

## 出典

ShiftB: https://shiftb.dev/articles/claude-fable-5-guide

## 基本スペック

- モデル識別子：`claude-fable-5`
- 新しい「Mythosクラス」の初の一般公開版
- コンテキストウィンドウ：1Mトークン、最大出力：128Kトークン
- 公開日：2026年6月9日

## 性能指標

| ベンチマーク | スコア | 備考 |
|-------------|--------|------|
| SWE-bench Pro | 80.0% | Opus 4.8比 +11pt |
| SWE-bench Verified | 95.0% | - |
| FrontierCode Diamond | 29.3% | Opus 4.8の2倍以上 |

## 料金

- API利用：$10/$50（入力/出力・1Mトークンあたり）
- Opus 4.8のちょうど2倍
- 有料プラン利用者は6月22日まで追加課金なし

## API仕様の変更点（重要）

- `thinking` は `adaptive` のみ対応、固定トークン予算は非対応
- `temperature`/`top_p`/`top_k` パラメータは廃止
- `effort` は5段階（low/medium/high/xhigh/max）に対応

```python
# Fable 5 API呼び出し例
client.messages.create(
    model="claude-fable-5",
    max_tokens=8192,
    thinking={"type": "adaptive"},
    effort="high",  # low/medium/high/xhigh/max
    messages=[{"role": "user", "content": "..."}]
)
```

## フォールバック機能（最大の特徴）

- サイバーセキュリティ・生物・化学分野のリクエストを検知すると自動でOpus 4.8に切り替え
- 95%超のセッションではフォールバック非発生
- セーフガード領域ではFable 5料金は発生しない

## 推奨される使い分け

| モデル | 適したユースケース |
|--------|-----------------|
| Fable 5 | 大規模リファクタ、長時間自律タスク、難問コーディング |
| Opus 4.8 | 日常のバグ修正、小規模機能追加 |
| 下位モデル | 定型コード生成、ドキュメント整形 |

## 試用期間（〜6月22日）の検証アクション

1. 塩漬けの大型リファクタタスク投入
2. 普段のタスクをOpus 4.8と並走
3. 知識労働系タスクの実行
