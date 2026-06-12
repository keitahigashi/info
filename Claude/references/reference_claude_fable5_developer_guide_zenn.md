---
name: Claude Fable 5 — Opus の上に来た新ティアを実装者目線で整理する
description: Fable 5のAPI差分・refusal/fallbackメカニズム・プロンプティング変更点をコード例付きで解説した実装者向けガイド
type: reference
---

## 出典

Zenn（yutabeee）: https://zenn.dev/yutabeee/articles/claude-fable-5-developer-guide

## Fable 5 実装者向け整理（2026年6月10日）

### モデル位置づけ・価格

- Opus > Sonnet > Haiku の3段構成に最上位ティアとして追加
- 入出力単価はOpus 4.8のちょうど2倍（$10/$50 vs $5/$25 per MTok）
- コンテキスト1Mトークン、最大出力128K（Opusと同一）

### API差分

```python
# thinking は常時adaptive（無効化不可）
response = client.messages.create(
    model="claude-fable-5",
    max_tokens=16000,  # 思考+本文の合計に注意
    output_config={"effort": "high"},
    messages=[{"role": "user", "content": "..."}],
)
```

- Adaptive thinkingが常時オンで「`disabled`設定は400エラー」
- Effortのデフォルトは`high`（Opus 4.8で`xhigh`推奨だったワークロードも再評価すべき）
- プロンプトキャッシュ最小長が1024→512トークンに短縮

### Refusal/Fallbackメカニズム（最大の実装ポイント）

拒否はHTTP 200で返され、エラーではなく正常レスポンス：

```python
{
  "stop_reason": "refusal",
  "stop_details": {
    "type": "refusal",
    "category": "cyber",  # or "bio" / "reasoning_extraction"
    "explanation": "This request was declined..."
  }
}
```

サーバーサイドフォールバック（beta）で自動リトライ：

```python
response = client.beta.messages.create(
    model="claude-fable-5",
    fallbacks=[{"model": "claude-opus-4-8"}],
    betas=["server-side-fallback-2026-06-01"],
    messages=[...]
)
```

SDK ミドルウェアで全プラットフォーム対応（Ruby/PHP除く）

### プロンプティングの変更点

- 「思考過程を見せて」系指示は`reasoning_extraction`拒否を引き起こす
- 指示追従が強いため過剰指示を削除推奨
- ターンが数分〜数時間に伸びるためタイムアウト設定を見直す必要

### 主要な知見

1. **移行は軽い** — Messages APIの互換性は高く、主な変更は①thinking常時オン前提のmax_tokens見直し②refusalハンドリング③プロンプト調整に集約
2. **拒否監視が重要** — HTTP 200なのでエラー率監視に現れず、`stop_reason`を個別計測する必要がある
3. **使い分け** — 「人間が数時間〜数週間かけるエンドツーエンド業務」向け。日常業務はOpus 4.8で十分（コスト半分、拒否ハンドリング不要）
4. **セキュリティ・バイオ領域** — Fable は誤反応リスクが高く、フォールバック設計を必須とするかOpus 4.8維持を検討すべき
