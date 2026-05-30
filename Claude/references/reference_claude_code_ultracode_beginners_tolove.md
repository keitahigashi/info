---
name: 【初心者向け】Claude Codeの新機能「ultracode」とは？ ―並列エージェントで重いタスクを一気に片付ける
description: ultracodeの仕組み・有効化手順・適用場面をわかりやすく解説した初心者向けガイド
type: reference
---

## 出典

note（東京PCレスキュー隊長）: https://note.com/tolove/n/n08cf64926fd4

## ultracodeとは

- Claude Codeの「全力モード」（xhigh + Dynamic Workflows の組み合わせ）
- 2026年5月28日のClaude Opus 4.8リリースに伴い追加された新機能
- Claudeが「このタスクはワークフローでやったほうがいい」と判断したら自動でチームを組んで動く

## Dynamic Workflowsの仕組み

- タスクを自動的にサブタスクに分解
- 複数のサブエージェントを並列実行
- 結果を検証・反証して収束させる

## 適用場面

- コードベース全体のバグ調査・セキュリティ監査
- 大規模なリファクタリングやマイグレーション
- 複数角度からの調査とレポート作成

## 前提条件

| 項目 | 要件 |
|------|------|
| モデル | Opus 4.8/4.7などxhigh対応モデル |
| バージョン | Claude Code v2.1.154以降 |
| プラン | Max・Team・Enterprise対応 |

## 有効化手順

1. `/config` で Dynamic Workflows をオン
2. モデルを Opus 4.8 に設定
3. `/effort` で `ultracode` を選択

## 使用時の注意点

- トークン消費が大幅に増加
- セッション限定の設定（再起動すると初期化）
- 自動モード（autoモード）との併用が推奨
