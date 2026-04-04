---
name: Claude Code autoモード紹介
description: Claude Codeの新機能「auto mode」（リスク評価ベースの選別自動実行）の概要・起動方法・制限事項（窓の杜記事）
type: reference
---

## 出典

窓の杜記事: https://forest.watch.impress.co.jp/docs/news/2095965.html
著者: 樽井 秀人
公開日: 2026-03-25

## 概要

Claude Codeに新機能「auto mode」が追加。従来の全操作承認制と全自動実行の中間的な選択肢として、リスク評価に基づいた選別実行を実現する。

## 対象プラン

- Team プラン（現在提供中）
- Enterprise プラン（順次展開予定）
- API（順次展開予定）
- リサーチプレビュー版として提供

## 機能詳細

- 操作の危険度を自動判定
- 安全と判断した操作は自動実行
- リスクのある操作はブロックまたは代替手段を実行、もしくは開発者に可否を確認
- ファイル読み書き、bashコマンド実行などの操作を対象

## 起動方法

```bash
Claude Code --enable-auto-mode
```

モード切り替え: `Shift + Tab` キー

## 注意点

- リスク完全排除ではなく、リスク軽減機能
- 本番環境での使用は非推奨（サンドボックス環境での利用を推奨）
