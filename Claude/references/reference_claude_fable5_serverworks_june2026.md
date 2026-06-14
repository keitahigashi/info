---
name: Claude Fable 5 とは Mythos級モデルの実力とClaude Codeでの使い方
description: ServerworksエンジニアブログによるFable 5のベンチマーク検証と、Claude Codeでの切り替えコマンド・価格体系の解説
type: reference
---

## 出典

サーバーワークスエンジニアブログ: https://blog.serverworks.co.jp/2026/06/10/070000

## Claude Fable 5とは

- 2026年6月9日にAnthropicがリリース
- 限定パートナー向けだったMythosクラスモデルを一般向けに調整
- APIモデルID: `claude-fable-5`

## ベンチマーク性能

| ベンチマーク | Fable 5 | Opus 4.8 | 差分 |
|-------------|---------|----------|------|
| SWE-Bench Pro | 80.3% | 69.2% | +11.1pt |
| FrontierCode Diamond | 29.3% | 13.4% | +15.9pt |

- GPT-5.5比ではFrontierCode Diamondで +23.6pt
- **難易度が高いほど他モデルとの差が拡大する特性**

## セーフガード機構

- サイバーセキュリティ・生物学関連クエリは自動的にOpus 4.8にフォールバック
- フォールバック発動率は5%未満（セッション全体の95%以上で通常動作）

## Claude Code での使い方

```bash
# v2.1.170以降で利用可能
# モデル切り替えコマンド
/model fable

# デフォルトモデルではなく明示的選択が必要
```

- v2.1.170以降で利用可能
- `/model fable` コマンドで切り替え
- デフォルトモデルではないため、明示的に選択が必要

## 価格体系

| 期間 | 条件 | 料金 |
|------|------|------|
| 〜6月22日 | Pro/Max/Team/Enterpriseプラン | 追加費用なし |
| 6月23日以降 | API利用 | $10/$50 per Mトークン（Opus 4.8の2倍） |
| 将来 | サブスク標準化予定 | - |
