---
name: Claude有料プラン激変！2026年6月15日〜「対話」と「自動化」が完全分離
description: 2026年6月15日以降、Claudeの有料プランで利用枠が「対話」と「自動化」に分離。自動化用途には新設「Agent SDKクレジット」が適用される
type: reference
---

## 出典

あなたのAI顧問: https://ai-advisors.jp/media/ai-news/claude-plan-change-20260615/

## プラン変更の概要

### 変更日
2026年6月15日〜

### 記事公開日
2026年5月24日

## 利用枠の分離

### 対話枠（変更なし）
- Web/アプリでのチャット
- IDEでの対話的なClaude Code利用
- Claude Cowork

### 自動化枠（新規 → Agent SDKクレジットから消費）
- Agent SDK利用
- `claude -p` コマンド（headlessモード）
- GitHub Actions
- OpenClaw等のサードパーティアプリ

## 新設「Agent SDKクレジット」

| プラン | 月額クレジット |
|--------|--------------|
| Pro | $20/月 |
| Max 5x | $100/月 |
| Max 20x | $200/月 |

- 個人単位で付与
- 毎月リセット（繰り越し不可）
- 超過後は従量課金設定により課金 or 停止

## 実務上の影響
- 自動化ツールを多用するユーザーはコスト増加の可能性
- CI/CDでのClaude Code headless利用はAgent SDKクレジットが必要
- Proユーザーは$20/月の自動化枠を超えると追加費用が発生

<!-- 日常で得た知見をここに追記 -->
