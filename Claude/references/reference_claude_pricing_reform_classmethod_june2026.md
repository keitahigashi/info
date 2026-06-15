---
name: 2026/06/15以降に料金体系が変更されたClaudeをどう使うか考えてみた
description: 6月15日の料金改定で対話利用とプログラム的利用が分離——2つの「おさいふ」運用戦略
type: reference
---

## 出典

DevelopersIO（classmethod）: https://dev.classmethod.jp/articles/claude-2026-pricing-reform-bucket-system/

## 料金改定の概要

- **改定日**: 2026年6月15日施行
- **分離の概念**: 利用枠が「おさいふ1（インタラクティブ）」と「おさいふ2（プログラム的）」の2つに分割

## おさいふ1：インタラクティブ利用（従来通りサブスク枠）

- Claude Code（ターミナル対話モード）
- Claude.ai Web・アプリ
- Claude Cowork
- Remote Routine（`/schedule` コマンド）—— **おさいふ1を消費**
- 「5時間セッション＋週次固定リセット」方式

## おさいふ2：プログラム的利用（新・月次クレジット制）

| 対象 | 備考 |
|------|------|
| `claude -p`（ヘッドレスモード） | 自動化バッチ処理 |
| Claude Agent SDK | APIキー指定なし時 |
| Claude Code GitHub Actions | OAuth token認証時 |
| OpenClawなど第三者アプリ | Agent SDK経由 |

## プランごとの月次クレジット付与額

| プラン | 月次クレジット |
|--------|--------------|
| Pro    | $20相当       |
| Max 5x | $100相当      |
| Max 20x| $200相当      |

## 重要な技術的詳細

- **overflow toggleデフォルトOFF**: クレジット枯渇後は自動停止（意図しない高額請求を防止）
- **APIキー環境変数設定時**: サブスク枠ではなく従量課金へ切り替わる——注意が必要
- **GitHub Actionsの認証方式による差異**:
  - APIキー指定 → 従量課金（おさいふ外）
  - OAuth token → おさいふ2のクレジットを消費
- **Remote Routineはおさいふ1**: 夜間バッチの第一候補として位置付け可能

## 運用戦略の提案

- ClaudeとCodexの組み合わせ: Claudeのおさいふ節約のためCodexと使い分け
- 月次クレジット枯渇前にアラートを設定する
- `claude -p` の常時実行はコスト管理計画を立ててから
