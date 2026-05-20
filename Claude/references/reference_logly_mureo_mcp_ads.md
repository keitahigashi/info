---
name: ログリー「mureo」Claude Desktop対応 ─ MCP活用のAI広告運用チームをOSSで提供
description: Google Ads/Meta Ads公式MCP上に構築したAI広告運用フレームワーク。2コマンドで導入でき、エンジニア不要。
type: reference
---

## 出典

PR TIMES（ログリー株式会社）: https://prtimes.jp/main/html/rd/p/000000197.000006043.html

## 概要

ログリー株式会社が開発するAI広告運用フレームワーク「mureo」がClaude Desktopアプリに対応。Google AdsおよびMeta Ads向け公式MCPを活用し、「ローカルで動くAI広告運用チーム」を数分で構築できるOSS（Apache 2.0）。

## 背景

- Google社がGoogle Ads MCPを2025年10月リリース
- Meta社がMeta Ads MCPを2026年4月リリース
- mureoはこれらの上位レイヤーとして、APIアクセスではなく**戦略的判断**を担当

## 7つのコア機能

| コマンド | 機能 |
|--------|------|
| STRATEGY.md | 戦略策定・判断基準の定義 |
| /daily-check | 横断モニタリング |
| /budget-rebalance | 予算配分最適化 |
| /creative-refresh | クリエイティブ提案 |
| /rescue | 性能低下への緊急対応 |
| /weekly-report | 経営向け週次サマリ |
| /learn | 知見の永続化 |

## 3つの導入モード

| モード | 特徴 | 要件 |
|--------|------|------|
| デモ | 最短でmureoの動作確認 | OAuth・データ不要 |
| BYOD | XLSX投入で分析可 | 5分で初回診断可能 |
| Live | 本番運用・変更実行フルサポート | OAuth認証必須 |

## 対応実行環境

- **Claude Code**：CLI・全機能対応
- **チャット**：自然言語操作でエンジニア以外も利用可能
- **Cowork**：フォルダ参照型のサンドボックス操作

## セットアップ

```bash
pip install mureo
mureo configure   # ブラウザUIでターミナル知識なく設定完結
```

## セキュリティ設計

- ローカルファースト（認証情報は端末内保管）
- クラウド中継なし
- ロールバック許可リスト
- GAQLバリデーション
- 統計的異常検知
- 追記専用監査ログ

## リポジトリ

- 公式サイト: https://mureo.io
- GitHub: https://github.com/logly/mureo
