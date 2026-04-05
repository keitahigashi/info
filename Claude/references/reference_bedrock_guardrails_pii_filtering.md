---
name: Amazon Bedrock Guardrailsで機密情報フィルタリング（PII検出・マスク・ブロック）
description: Claude Code×Bedrock経由でPII（メール・電話・住所）をGuardrailsでフィルタリングする設定方法と実装例
type: reference
---

## 出典
- URL: https://dev.classmethod.jp/articles/claude-code-bedrock-guardrails-filtering/
- 著者: 酒井貴央（DevelopersIO）
- 公開日: 2026-03-10

## 概要
Claude CodeをAmazon Bedrock経由で利用する際に、Bedrock Guardrailsで個人情報（PII）をフィルタリングする実装方法。

## 詳細

### Bedrock Guardrailsの機能
- コンテンツフィルタ、拒否トピック、機密情報フィルタ（PII）、ワードフィルタ、コンテキストグラウンディングチェック

### 設定手順
1. **Guardrails作成**: PII検出タイプ（EMAIL, PHONE, ADDRESS）を設定
2. **アクション選択**: 各タイプごとに「ブロック」or「マスク」を選択
   - EMAIL: 入出力ともにマスク処理（`{EMAIL}`に置換）
   - 電話・住所: 入出力ともにブロック
3. **Claude Code設定**: `~/.claude/settings.json` の `ANTHROPIC_CUSTOM_HEADERS` にガードレールID・バージョンを記載

### 効果
- マスク設定: PII部分が識別子に置換されて処理継続
- ブロック設定: 入力自体が拒否される
- 企業における意図しない個人情報送信リスクの低減
