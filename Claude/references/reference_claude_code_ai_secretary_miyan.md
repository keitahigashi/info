---
name: 自律 AI 秘書を Claude Code で組む — 5 層と 7 つの境界
description: Claude Code Routinesで自律AI秘書を構築する際の5層アーキテクチャと「やらない判断」7項目を実装観点で解説（2026年5月16日）
type: reference
---

## 出典

Zenn（miyan）: https://zenn.dev/miyan/articles/claude-code-ai-secretary-design-2026

## 自律 AI 秘書を Claude Code で組む — 5 層と 7 つの境界

### 概要

2026年5月16日公開。Claude Code Routinesを活用して「自律AI秘書」を構築する際の設計方針を解説。既存記事が見落とす`permission_mode`の無効化など前提変更を指摘しつつ、5層アーキテクチャと7つの「やらない判断」を提示。

### 5層アーキテクチャ

| 層 | 役割 |
|----|------|
| 入力層 | 外部データ・イベントの受信（Connectors経由） |
| 判断層 | 優先度・緊急度の評価、要否判断 |
| 行動層 | ツール実行・ファイル操作・API呼び出し |
| 記憶層 | MEMORY.md・外部DB・ベクトルストア |
| 通知層 | プッシュ通知・Slack・メール等 |

### 7つの「やらない判断」

1. メール自動送信（誤送信リスク）
2. カレンダー確定（ダブルブッキング）
3. 金銭判断（承認フロー省略）
4. 機密情報のConnector連携（情報漏洩）
5. 記憶の無制限蓄積（MEMORY.md容量制約）
6. IPI（Indirect Prompt Injection）対策省略
7. 秘書ロールへの過剰バイアス（Claude的判断の歪み）

### 実装ステップ

```
1. ローカルCLIでプロトタイプ
   → `claude -p` で動作確認

2. Routines化
   → スケジュール・API・GitHubイベントでトリガー設定

3. 組織配布
   → プラグイン化・マーケットプレイス経由
```

### 実装の罠（7項目）

- Connectors デフォルト全有効（意図しないデータ取得）
- MEMORY.md 容量制約（数MB単位でコンテキスト爆発）
- 失敗の静かな進行（エラーが通知されず無視）
- permission_mode が Routines では効かない
- 非同期Hook とスケジュールの競合
- コスト爆発（トークン上限設定必須）
- セッション間状態の不整合

### コスト・撤退設計

- 撤退コスト目安：0.5〜1人月
- プライバシー規制対応：GDPR・個人情報保護法の確認が必須
- API価格試算：月次1〜5万円が典型ライン（業務量による）

### キーポイント

Claude Code Routinesの`permission_mode`はRoutines環境では無効化されるため、Hooks（PreToolUse）による独自の権限制御が必要。ローカル動作確認後にRoutines化するステップを踏むことで、本番トラブルを最小化できる。
