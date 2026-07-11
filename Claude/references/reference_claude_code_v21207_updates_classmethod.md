---
name: Main Updates in Claude Code v2.1.207
description: v2.1.207（2026年7月10日リリース）の24変更を整理。Bedrock/Vertex での Auto mode 開放、デフォルトモデルの Opus 4.8 変更、セキュリティ修正が主要トピック。
type: reference
---

## 出典

DevelopersIO（Classmethod）: https://dev.classmethod.jp/en/articles/20260711-cc-updates-v2-1-207/

## Claude Code v2.1.207 主要アップデート解説

### 記事概要

2026年7月11日公開。Claude Code v2.1.207（2026年7月10日リリース）の全24変更を Classmethod が解説した英語記事（DevelopersIO 恒例の公式 changelog 翻訳・解説シリーズ）。

### 新機能

- **Auto mode の開放**: AWS Bedrock・Google Vertex AI・Microsoft Foundry において、環境変数の手動設定なしで Auto mode が利用可能に。クラウドプロバイダー経由ユーザーの利便性が大幅向上。
- **デスクトップアプリにブラウザ内蔵**: アプリ内ブラウザが追加され、外部ブラウザを起動せずに参照可能に。

### モデルデフォルト変更

- Bedrock・Vertex AI・AWS の Claude プラットフォームでのデフォルトモデルが **Claude Opus 4.8** に変更。能力向上の恩恵を自動的に受けられるが、コスト増に注意。

### 重要なバグ修正

- **ターミナルフリーズ問題の解消**: 長いリスト・テーブル・コードブロックのストリーミング中にキー入力が遅延・フリーズする問題を修正。
- **セキュリティ同意ダイアログ不表示の修正**: `claude -p` や SDK での非対話型実行時に、リモート管理設定が同意ダイアログを経ずに「同意済み」として永続記録されていた重大な安全性問題を解決。

### 破壊的変更

シェルインジェクション対策として、プラグインフックとモニター内の特定の記法が**廃止**。既存のフック設定を持つユーザーは記法の確認・更新が必要。
