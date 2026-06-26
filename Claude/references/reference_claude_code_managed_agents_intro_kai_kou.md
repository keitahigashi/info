---
name: Claude Code Managed Agents入門 — スケジュール実行とCLI統合の実装ガイド
description: AnthropicがパブリックベータリリースしたManaged Agentsの実装ガイド。スケジュール実行・CLI統合・エージェント定義ファイル・secrets管理・監視まで網羅した実践記事。
type: reference
---

## 出典

Qiita（@kai_kou）: https://qiita.com/kai_kou/items/337eb235da9b9a081836

## Claude Code Managed Agents入門

**公開日：** 2026年6月20日

### Managed Agentsとは

Anthropicが「Claude Code Managed Agents」をパブリックベータリリース。
スケジュール実行（cron記法）、CLIツールの安全統合、Vault管理の環境変数を備えたエージェント自動化基盤。

### 主要機能

- **スケジュール実行**：cron記法で定期実行（例：毎日09:00 JSTにトレンド収集）
- **CLI tools安全統合**：許可コマンドをホワイトリストで制御
- **Vault管理**：環境変数（secrets.json）を暗号化管理

### エージェント定義ファイル

`.claude/agents/my-agent.md` に配置し、フロントマター（name・description・tools・model）で定義。

### 実装例：日次トレンドレポート自動送信

「Web検索→分析→Slack投稿」の完全なワークフロー：
1. 毎日09:00 JST にトリガー
2. Web検索でトレンド収集
3. 分析・サマリー生成
4. Slackへ自動投稿

### ベストプラクティス

- エラーハンドリングの実装
- リソース制限の設定
- 実行ログの監視体制

### 制限事項・注意点

- パブリックベータのため仕様変更の可能性あり
- CLI tools統合には許可コマンドのホワイトリスト設定が必須
- secrets.jsonは暗号化管理されるが取り扱いに注意
