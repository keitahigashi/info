---
name: Claude Code を社内導入する時の最低限ガードレール5項目 — 機密情報を漏らさない設定パターン
description: 社内Claude Code導入時に約15分で実装できる機密漏洩防止ガードレール5項目を具体的テンプレ付きで解説
type: reference
---

## 出典

Qiita: https://qiita.com/ennagara128/items/aeaee3e64e75076503fe

## 概要

組織での Claude Code 運用において、機密情報漏洩を防ぐための実践的なガードレール5項目を紹介。既存ファイルへの最小限の追加で完結する設計。

## 5つのガードレール詳細

| # | 項目 | 手段 |
|---|------|------|
| 1 | 機密ファイル除外 | `.claudeignore` に `.env`・`*.key`・`*.pem`・`credentials.json` を列挙 |
| 2 | 禁止事項の明文化 | `CLAUDE.md` に「環境変数値の出力禁止」「個人情報ログ禁止」等を記載 |
| 3 | 危険操作ブロック | `.claude/settings.json` の Hooks で `rm -rf`・`DROP TABLE` を PreToolUse で停止 |
| 4 | 本番環境変数の分離 | `secrets/` ディレクトリに本番値を配置し Claude のアクセス経路から切り離す |
| 5 | 承認フロー組み込み | Skills で DB 変更操作に人間確認ステップを必須化 |

## 推奨ディレクトリ構成

```
project/
├── .claudeignore          # 機密ファイル除外定義
├── CLAUDE.md              # 禁止事項・ルール記述
├── .claude/settings.json  # Hooks・権限設定
├── .claude/skills/db-modify/  # 承認フロー付きスキル
└── secrets/.env.production    # 本番値（Claude非参照）
```

## ポイント

- セットアップ所要時間は約15分
- 既存プロジェクトへの後付けが容易
- エンジニア・非エンジニア問わず適用可能な設計
