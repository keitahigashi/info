---
name: Anthropic、Claude有料プランでプログラムによる利用専用の月間クレジットを導入へ
description: 2026年6月15日よりAgent SDK・claude -pコマンド等の自動化利用向けに月間クレジットを別枠で付与する制度を導入
type: reference
---

## 出典

gihyo.jp: https://gihyo.jp/article/2026/05/claude-agent-sdk-credit

## 概要

Anthropicが2026年6月15日より、Claude有料プランに「Claude Agent SDKクレジット」として月間クレジット制度を導入。自動化・プログラミング利用を対話型利用から分離する。

## 変更内容

### 対象となる利用方法（クレジットから消費）

- Claude Agent SDK（Python/TypeScript）を通じた独自プロジェクト
- Claude Codeの `claude -p` コマンド（非対話モード）
- Claude Code GitHub Actions
- Agent SDKを通じてClaudeサブスクリプションで認証するサードパーティアプリ

### 月額クレジット付与額

| プラン | 月額クレジット |
|--------|--------------|
| Claude Pro | $20 |
| Max 5x | $100 |
| Max 20x | $200 |
| Team Standard | シートあたり$20 |
| Team Premium | シートあたり$100 |

### 運用ルール

- クレジットは月単位でリセット（未使用分の繰り越しなし）
- 超過利用時はAPIレート（従量課金）で追加請求
- WebブラウザやIDEでの対話型利用はサブスク枠が適用（変更なし）

## 背景

Claude Codeの急激な普及と、エージェント的AI活用の拡大により、プログラムによる大量消費と対話型利用が同じ枠で管理されていた問題を解消するため。

## その他の変更

- 2026年7月13日まで、全有料プランのClaude Code週次利用上限が50%引き上げ（期間限定）
- 適用開始日：2026年6月15日

<!-- 日常で得た知見をここに追記 -->
