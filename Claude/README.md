# Claude Code ナレッジベース

Claude Code CLIを便利に使うための方法論・ナレッジを集積するリポジトリ。

## 構成

| ファイル | 内容 |
|---------|------|
| [**00-quickstart.md**](00-quickstart.md) | **はじめてガイド（初心者はここから）** |
| [01-overview.md](01-overview.md) | 全体像・機能マップ |
| [02-setup.md](02-setup.md) | 基本設定・構成ファイル |
| [03-commands.md](03-commands.md) | コマンド・スラッシュコマンド一覧 |
| [04-workflow.md](04-workflow.md) | ワークフロー・モード活用 |
| [05-tools.md](05-tools.md) | 組み込みツールの使い分け |
| [06-extensions.md](06-extensions.md) | MCP・フック・IDE連携・プラグイン |
| [07-skills.md](07-skills.md) | カスタムスキル（スラッシュコマンド）作成 |
| [08-tips.md](08-tips.md) | プロンプト技法・ベストプラクティス |
| [09-troubleshooting.md](09-troubleshooting.md) | ハマりどころと対処法 |
| [10-security.md](10-security.md) | 権限・セキュリティ |
| [11-harness-engineering.md](11-harness-engineering.md) | ハーネスエンジニアリング（長期エージェント運用） |

## 更新方針

日常的に得た知見を随時追記していく。各ファイル末尾の「実践メモ」セクションに具体的な体験・Tipsを蓄積する。

## 記事自動収集システム

このリポジトリには、Claude Code のセッション間で持続する記事自動収集の仕組みが組み込まれている。

### アーキテクチャ

```
┌─────────────────────────────────────────────────────────┐
│  セッション開始                                            │
│  ユーザー: 「記事収集して」「続けて」等                        │
└──────────────┬──────────────────────────────────────────┘
               ▼
┌─────────────────────────────────────────────────────────┐
│  CLAUDE.md（リポジトリ内）                                  │
│  → ワークフロー手順・トリガー条件を定義                        │
└──────────────┬──────────────────────────────────────────┘
               ▼
┌─────────────────────────────────────────────────────────┐
│  MEMORY.md（Claudeメモリ）                                 │
│  → 収集済みURL一覧（重複チェック用）                          │
│  → メモリファイルのインデックス                               │
└──────────────┬──────────────────────────────────────────┘
               ▼
┌─────────────────────────────────────────────────────────┐
│  Web検索（3キーワード並列）                                  │
│  「Claude Code 新機能」                                    │
│  「Claude MCP エージェント」                                │
│  「Claude AI 最新」                                       │
└──────────────┬──────────────────────────────────────────┘
               ▼
┌─────────────────────────────────────────────────────────┐
│  重複フィルタ                                              │
│  MEMORY.md の Collected Article URLs                     │
│  + README.md の参照記事一覧                                │
│  と照合し、未収集記事のみを選別                               │
└──────────────┬──────────────────────────────────────────┘
               ▼
┌─────────────────────────────────────────────────────────┐
│  記事取得・保存（最大5件/回）                                │
│  WebFetch → reference_*.md（メモリ内）に詳細保存             │
│  → MEMORY.md のインデックス・URL一覧を更新                   │
└─────────────────────────────────────────────────────────┘
```

### 永続化の仕組み

| 要素 | 保存先 | 永続性 | 役割 |
|------|--------|--------|------|
| **CLAUDE.md** | リポジトリ内 | Git管理 | ワークフロー手順をセッション開始時に自動読み込み |
| **MEMORY.md** | Claudeメモリ | セッション間で永続 | 収集済みURL一覧（重複チェック）+ ファイルインデックス |
| **reference_*.md** | Claudeメモリ | セッション間で永続 | 各記事の詳細情報（要約・コード例・設定例等） |
| **README.md 参照記事一覧** | リポジトリ内 | Git管理 | 手動キュレーション済み記事（重複チェック対象に含む） |

### 使い方

```bash
# 1. このディレクトリで Claude Code を起動
cd D:/020_Work/05_environment/01_active/Info/Claude
claude

# 2. 記事収集を指示（以下のいずれか）
> 記事収集して
> 情報集積を続けて
> 記事探して

# 3. URLを直接指定して追加も可能
> https://example.com/article-url

# 4. セッション内でデイリー自動実行を設定したい場合
> /loop 24h で記事収集を設定して
```

### 現在の収集済み記事（メモリ内 reference_*.md）

| メモリファイル | 内容 | ソース |
|--------------|------|--------|
| reference_claude_code_skills_guide.md | Skills 20選ガイド | Qiita |
| reference_claude_peers_mcp.md | claude-peers-mcp セットアップ | Zenn |
| reference_agents_md_guide.md | AGENTS.md完全入門 | Qiita |
| reference_claude_code_auto_mode.md | Claude Code autoモード | 窓の杜 |
| reference_claude_agent_sdk_guide.md | Claude Agent SDK完全ガイド | AQUA |
| reference_claude_code_mcp_guide.md | Claude Code × MCP実践活用 | AQUA |
| reference_anthropic_marketing_claude_code.md | Anthropic社内マーケティング運用事例 | izanami |
| reference_claude_code_2_1_81.md | Claude Code v2.1.81アップデート | ClaudeNote |

## 参照記事一覧

| 記事 | 著者 | 主な反映先 |
|------|------|----------|
| [Claude Code Skills 完全活用ガイド 2026](https://qiita.com/nogataka/items/ad9995fb1b3db7055740) | @nogataka | 07-skills, 10-security |
| [Issue起票→並列開発→PR作成を全自動化](https://qiita.com/kazuki_ogawa/items/c05c3aed3bf8e46a7ddb) | @kazuki_ogawa | 04-workflow |
| [Claude Code 知らないと損するコマンド・時短術 20選](https://qiita.com/miruky/items/48ede59ebe33b4b774ac) | @miruky | 03-commands, 08-tips |
| [Claude Codeですべての日常業務を爆速化しよう！](https://qiita.com/minorun365/items/114f53def8cb0db60f47) | @minorun365 | 08-tips |
| [Claude Codeで行うべきセキュリティ設定 10選](https://qiita.com/miruky/items/51db293a7a7d0d277a5d) | @miruky | 10-security |
| [ClaudeCodeの中級者になりたい人は集合してください](https://qiita.com/K5K/items/72cc4282819ace823524) | @K5K | 03-commands, 08-tips |
| [ハーネスエンジニアリングとは何か](https://qiita.com/miruky/items/155f3b5a0dcde72fcd10) | @miruky | 11-harness |
| [agency-agentsで144種類のエージェントチーム作成](https://qiita.com/nogataka/items/5b5747f619e6eb745436) | @nogataka | 08-tips |
| [新年度からコーディングエージェントを使いこなす](https://speakerdeck.com/nwiizo/) | nwiizo @3-SHAKE | 11-harness |
| [Anthropic社員のClaude Code活用術8選](https://zenn.dev/happy_elements/articles/046faa4f61d98f) | ko.+ | 08-tips |
| [カンリー社内Claude Code勉強会](https://zenn.dev/canly/articles/cc0891517e45cc) | ふくだ | 08-tips |
| [Claude Codeで仕様駆動開発、tsumikiが良かった](https://zenn.dev/hidechannu/articles/20260314-spec-driven-development-tsumiki) | hidechannu | 08-tips |
| [CLAUDE.md設計の7つの原則](https://qiita.com/nogataka/items/04bb1e3690b04aeae1a4) | @nogataka | 02-setup |
| [AIを使うほど、判断力が落ちる人がいる理由](https://zenn.dev/cognitiveosmdl/articles/231033371a6735) | cognitiveosmdl | 08-tips |
| [ハーネスエンジニアリングを自分のプロジェクトで実装してみた](https://qiita.com/nogataka/items/a8306067788798975fa7) | @nogataka | 11-harness |
| [「人間はコードを1行も書かない」5ヶ月間のハーネスエンジニアリング](https://qiita.com/nogataka/items/43c01957fa1e54d9a079) | @nogataka | 11-harness |
