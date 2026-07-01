---
name: Claude Code 企業導入セキュリティガイド【2026年最新】｜データ保護・権限管理・コンプライアンスを完全網羅
description: CTOや情報システム部門向けに、データフロー・コンプライアンス認証・規制業種対応まで16章構成で解説する企業向けセキュリティ完全ガイド
type: reference
---

## 出典

AQUA テックブログ（AQUA合同会社）: https://www.aquallc.jp/claude-code-enterprise-security-guide/

## 概要

公開日：2026年3月12日。AQUA合同会社のテックブログが42分読了を想定した16章構成で、企業のClaude Code導入における最大の懸念「ソースコード・データの取り扱い」を網羅的に解説。

## データフロー（3パターン）

| パターン | 特徴 |
|---|---|
| Direct API | Anthropicインフラ経由 |
| AWS Bedrock | コード・プロンプトがAnthropicに渡らない |
| Google Vertex AI | 同上、自社GCP環境内に留まる |

## コンプライアンス認証

- SOC 2 Type II、ISO 27001、ISO/IEC 42001、HIPAA BAA対応
- Team/Enterprise契約ではモデル学習に一切使用されない保証あり
- データ保持期間は標準30日間、ZDR（Zero Data Retention）オプションあり

## Enterprise機能

- SSO・SCIM・RBAC・監査ログ
- .claudeignore、settings.json denyルール、サンドボックス設定コード例を掲載

## セキュリティ3段階ガイド

- Level 1：スタートアップ向け最小構成
- Level 2：中堅企業向け
- Level 3：金融・医療大企業向け（個人情報保護法・金融庁AIガイドライン・FISC基準への適合）

## 既知脆弱性対応

CVE-2025-59536・CVE-2026-21852の対応履歴も記載。導入前チェックリスト20項目付き。
