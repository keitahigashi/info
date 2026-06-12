---
name: Claude Fable 5 は何が新しいのか？Mythos級モデル公開で変わった5つのポイント
description: Fable 5で変わった5つのポイント（新ティア・Adaptive Thinking・3層分類器・トークナイザ変更・無料期間）を実装者視点で解説
type: reference
---

## 出典

Zenn（daishiro）: https://zenn.dev/daishiro/articles/claude-fable-5-whats-new

## Fable 5 で変わった5つのポイント（2026年6月10日）

### 1. Mythos級という新ティア誕生

Opus級の上に位置する階層が新設。一般公開版がFable 5、限定提供版がMythos 5。

### 2. Extended Thinking から Adaptive Thinking へ

呼び出し側での思考制御が廃止され、モデル側が自動調整する方式に統一。
- 「思考を無効化」する設定は400エラーを返す
- プロンプトでの思考過程要求は`reasoning_extraction`拒否を引き起こす

### 3. 3層の安全分類器導入

サイバーセキュリティ、生物・化学系、蒸留防御に関連した入力を検出時はOpus 4.8へフォールバック。

### 4. トークナイザの変更（料金影響に注意）

**Opus 4.7世代のトークナイザ採用により、「同じ文章で約30%多いトークン消費」という料金影響がある。**

- Opus 4.8からFable 5へ移行すると単価2倍×トークン増30%で実質約2.6倍のコスト
- 既存プロンプトのコスト試算を必ず再計算すること

### 5. 6月22日までの無料提供

Pro/Max/Team/Enterpriseプラン利用者に追加料金なしで同梱される期間限定キャンペーン（6月9日〜22日）。

## 実装移行チェックリスト

- [ ] `max_tokens`をAdaptive thinking分（思考+本文の合計）に増やす
- [ ] `stop_reason: "refusal"` のハンドリングを追加
- [ ] トークナイザ変更を考慮したコスト再試算
- [ ] タイムアウト設定を数分〜数時間レンジに見直し
- [ ] フォールバック時の応答モデル記録を追加
