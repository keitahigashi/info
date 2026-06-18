---
name: Anthropic 2026年6月発表まとめ｜Claude Fable 5 一般公開・Mythos との違い・Agent SDK課金変更
description: 2026年6月のAnthropicの主要3発表：Fable 5一般公開・Mythos 5との設計差異・Agent SDK課金変更（後に撤回）を整理
type: reference
---

## 出典

Cryptul Insights: https://cryptul.co.jp/insights/articles/157-anthropic-june-2026-recap

## 概要

公開日：2026年6月10日

2026年6月のAnthropicによる重要発表を3テーマで整理した記事。

## 1. Claude Fable 5の一般公開（2026年6月9日）

### スペック
| 指標 | スコア |
|------|--------|
| SWE-bench Verified | 95.0% |
| SWE-bench Pro | 80.3% |
| 料金 | 入力 $10 / 出力 $50 / MTok |

### セーフガード機構
- サイバーセキュリティ・生物学・蒸留関連リクエストは自動的にOpus 4.8へフォールバック
- クラシファイア発動率：セッション全体の5%未満
- フォールバック時の課金：Opus 4.8レートが適用（差額補正あり）

## 2. Claude Mythos 5との設計差異

| 項目 | Fable 5 | Mythos 5 |
|------|---------|----------|
| セーフガード | あり（3層分類器） | なし |
| 対象 | 一般ユーザー | Project Glasswing承認顧客のみ |
| 提供方針 | 広め | 限定 |

「中身は同じ・ガードの有無だけが異なる設計」——同一モデルの異なるプロファイルとして位置付け。

## 3. Agent SDK / claude -p の課金変更（後に撤回）

- 6月15日施行予定でサブスクリプション枠から月次クレジット制へ分離を発表
- 施行当日（6月15日）にAnthropicが撤回を発表
- 再施行時期は未定

## 実装への示唆

- Fable 5利用時はフォールバック発生を`stop_reason: "refusal"`で監視する設計が必要
- `agents.md`にフォールバックモデルを明示し、特定モデルへの依存を避ける
- 課金体系変更は予告なく施行・撤回される可能性があるため、利用量モニタリングを常時運用
