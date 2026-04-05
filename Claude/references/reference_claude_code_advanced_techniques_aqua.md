---
name: Claude Code上級テクニック完全ガイド（Hooks・サブエージェント・CI/CD・コスト最適化）
description: Hooks設計原則・サブエージェント構築・CI/CDヘッドレスモード統合・コンテキストコスト最適化の上級テクニック集
type: reference
---

## 出典
- URL: https://www.aquallc.jp/claude-code-advanced-techniques-guide/
- 著者: AQUA合同会社
- 公開日: 2026-02-20

## 概要
Hooks・サブエージェント・CI/CD自動化・コスト最適化を網羅した上級テクニックガイド。

## 詳細

### Hooks設計原則
- 6つのライフサイクルイベント、3タイプ（Command・Prompt・Agent）
- **Block-at-Submit, not Block-at-Write**: AIの思考フローを妨げないゲート設計
- PreToolUseでAPIキー漏洩防止、PostToolUseで自動フォーマット

### サブエージェント構築
- 役割特化型エージェント（コードレビュー専門・セキュリティ監査専門等）
- メモリ機能でプロジェクト固有知識をチーム間共有
- 「小さく単機能なSkillを組み合わせる」設計推奨

### CI/CD自動化（Headless Mode）
- GitHub Actionsとの完全統合
- PR差分の自動分析、セキュリティレビューの自動実行

### コスト最適化
- 「広告スペース」の原則: CLAUDE.mdを希少なコンテキストとして扱い500行以下に保つ
- 新規セッションで約20Kトークン消費（ベースライン）
