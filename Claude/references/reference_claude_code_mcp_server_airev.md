---
name: Claude Code MCPの使い方｜Claude Code自体をMCPサーバーとして動かす構成ガイド【2026年最新】
description: Claude Code自体をMCPサーバーとして動かす公式版・サードパーティ版の比較と実装パターン4種の詳細ガイド
type: reference
---

## 出典

AI革命株式会社メディア: https://ai-revolution.co.jp/media/claude-code-mcp-server-guide/

## 概要

Claude Code自身をMCPサーバーとして機能させることで「エージェントの中のエージェント」を実現する構成ガイド（2026年5月更新）。

## 2つのアプローチ比較

| 項目 | 公式`claude mcp serve` | サードパーティ`@steipete/claude-code-mcp` |
|------|---|---|
| パーミッション | 承認プロンプトあり | `--dangerously-skip-permissions`常時使用 |
| 適用シーン | GUI安全利用優先 | 重い一括タスク委譲 |
| 初心者向け | ○推奨 | △要検討 |

## v2.1系主要MCPアップデート

- v2.1.139: `CLAUDE_PROJECT_DIR`環境変数追加・再起動不要な即時反映（`/mcp Reconnect`）
- v2.1.121: `alwaysLoad`オプション追加・自動リトライ
- v2.1.118: **Hooks から MCP ツール直接呼び出し対応**
- v2.1.141: MCP OAuth改善

## 実務パターン4種

| パターン | 構成 | 典型タスク |
|---|---|---|
| A | Claude Desktop→MCP→claude mcp serve | ドキュメント整理・一括リライト |
| B | Cursor→MCP→@steipete版 | 大規模リファクタリング |
| C | 親Code→MCP→子Code→各種MCP | PR解析→生成→テスト→報告 |
| D | 入れ子化claude mcp serve | ログ解析・一括生成 |

## セキュリティ4大リスクと対策

1. `--dangerously-skip-permissions`常用→信頼環境のみで使用
2. プロンプトインジェクション→外部コンテンツ検査必須
3. 認証情報平文保存→環境変数参照形式に変更
4. 監査ログ欠落→業務用に別途ログ基盤構築

## 現時点の制約

- MCPパススルー不可・セッション非共有・Windows非推奨・プロセスオーバーヘッド数秒〜
