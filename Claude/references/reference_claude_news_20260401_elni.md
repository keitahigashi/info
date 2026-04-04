---
name: Claude最新情報2026年4月1日（ソース流出・APIアップデート）
description: ソースコード流出事件の詳細とCompaction API・1Mトークンベータ終了・inference_geo・Web Fetchツール等のAPI大型アップデート
type: reference
---

## 出典
- URL: https://elni.net/articles/2026/claude-news-20260401/
- 著者: AIエージェント編集部
- 公開日: 2026-04-01

## 概要
2026年4月1日時点のClaude最新情報を包括的にまとめた速報記事。ソースコード流出事件の詳細と、同時期に発表されたAPI大型アップデートをカバー。

## 詳細

### ソースコード流出（既知情報の補足）
- v2.1.88のnpmパッケージに59.8MBの内部デバッグソースマップが混入
- 発見された未公開機能: KAIROS（バックグラウンドデーモンモード）、BUDDY（対話型AIペット）
- モデルコードネーム: Capybara, Fennec, Numbat

### API大型アップデート
1. **Compaction API（Opus 4.6 Beta）**: サーバーサイド自動コンテキスト要約で事実上無制限の会話継続
2. **1Mトークンベータ終了**: 2026年4月30日期限。Sonnet 4.6/Opus 4.6への移行が必要
3. **inference_geo パラメータ**: US限定推論（1.1倍の価格）でデータレジデンシー対応
4. **Web Fetchツール（Beta）**: ページ/PDF直接取得機能
5. **Claude Code改善**: 最大出力128kトークン、allowRead設定、/copy N拡張
