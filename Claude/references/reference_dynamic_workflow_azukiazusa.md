---
name: Claude Code の Dynamic Workflow を試してみた
description: azukiazusa.devによるDynamic Workflow実践レポート。/deep-researchコマンド・カスタムワークフロー作成・5フェーズ構造を実際に試した技術記事。
type: reference
---

## 出典

azukiazusa.dev: https://azukiazusa.dev/blog/claude-code-dynamic-workflow/

## 概要

- **公開日**: 2026年5月29日
- Claude Code v2.1.154で追加されたDynamic Workflow機能を実際に試した実践レポート。「数時間から数日かかるような大規模な作業を実行するために設計」された機能の構造と動作を詳細に解説。

## ワークフローの5フェーズ構造

`/deep-research`コマンド実行時の内部フェーズ：

1. **Scope**: 質問を複数角度に分解
2. **Search**: 並列検索の実行
3. **Fetch**: ソース取得と主張の抽出
4. **Verify**: 敵対的検証（クロスチェック）
5. **Synthesize**: レポート生成

## 起動方法

- **コマンド**: `/deep-research {調査トピック}` で組み込みワークフローを実行
- **カスタム**: プロンプトに「workflow」を含めるとClaudeが自動的にワークフロースクリプトを生成（記事執筆時点）
- **保存・再利用**: 作成したワークフローはプロジェクト単位またはユーザー単位で保存し、コマンドとして再利用可能

## 実践での気づき

- サブエージェントが独立したコンテキストで実行されるため、メインセッションを圧迫しない
- 複数エージェントによる相互検証で調査精度が向上
- ワークフローのカスタマイズにより繰り返し作業を自動化できる
