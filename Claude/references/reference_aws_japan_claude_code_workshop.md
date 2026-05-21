---
name: "手を動かして学ぶ Claude Code 入門ワークショップ - AWS Japan 公式"
description: AWS Japan 有志による Claude Code 入門ワークショップ。CLAUDE.md・Plan Mode・コンテキスト管理・MCP・サブエージェント・Skills・Hook・Plugin の全機能を Excalidraw を題材に実装しながら習得
type: reference
---

## 出典

Zenn（AWS Japan 有志 / Ryosuke Yamazawa）: https://zenn.dev/aws_japan/articles/introduction-to-claude-code-workshop

## 記事概要

- **公開日**: 2026年5月12日
- **著者**: Yamary / Ryosuke Yamazawa（AWS Solutions Architect）
- **対象読者**: Claude Code 入門者
- **環境**: EC2 上の Code Editor サーバー（Amazon Bedrock 経由でモデル呼び出し）
- **題材**: OSS ホワイトボードツール「Excalidraw」

## ワークショップ構成（3 モジュール）

| スキル | 内容 |
|--------|------|
| コードベース把握 | 見知らぬリポジトリの構造把握・編集ファイル特定 |
| フィードバックループ | 動作確認・迅速な反復 |
| Git 管理 | 履歴管理・コミット運用 |

## 主要トピックと実装ポイント

### 1. CLAUDE.md

毎セッション自動読み込みの設定ファイル。「Claude が自分で把握できないこと」に絞るのがコツ。

記載推奨内容:
- ビルド/テストコマンド
- コードスタイル・フォーマット規約
- 重要ディレクトリ構成
- ドメイン固有用語・略語

### 2. Plan Mode

`Shift+Tab×2` または `/plan` で切り替え。実行前に計画を承認するモード。

効果:
- 思考プロセスの可視化
- 軌道修正チェックポイント
- コード品質向上

### 3. コンテキスト管理

コンテキストウィンドウ（Claude の RAM）には容量上限あり。

| コマンド | 用途 |
|---------|------|
| `/context` | 使用量確認 |
| `/compact` | 要約と冗長部分削除 |
| `/clear` | 完全リセット |
| `/rename` | セッション名変更 |
| `/resume` | セッション再開 |

### 4. MCP（Model Context Protocol）

Claude を外部ツールに接続する標準規格。

代表的な MCP サーバー:
- **Playwright**: ブラウザ自動化
- **Filesystem**: 拡張ファイル操作
- **GitHub**: リポジトリ管理
- **PostgreSQL/MySQL**: データベースクエリ

### 5. サブエージェント（Subagents）

特定タスクに特化した専門家として振る舞う Claude。テスト・デバッグ等の異なるタスクをコンテキスト分離して並列実行。`/agents` コマンドで対話的に作成可能。

### 6. Skill

再利用可能なワークフローをファイルとしてパッケージ化する機能。`SKILL.md` ファイルに説明を書くと Claude が自動的に関連タスクで適用。

**Progressive Disclosure 設計:**
- セッション開始時は説明文のみ読み込み
- マッチしたときに本文展開
- 複数スキル保有でもコンテキスト圧迫しない

### 7. Hook

特定イベントで自動実行されるスクリプト。

| タイミング | 例 |
|-----------|-----|
| PreToolUse | ツール使用前の検証 |
| PostToolUse | 自動フォーマット（Prettier 等） |
| SessionStart | 環境初期化 |
| Stop | クリーンアップ |

### 8. Plugin（2026年5月 GA）

スラッシュコマンド・エージェント・MCP 設定・Hook を1回のインストールで導入できる仕組み。AWS MCP Server も対応。

```bash
/plugin marketplace add aws/agent-toolkit-for-aws
/plugin install aws-core@agent-toolkit-for-aws
/reload-plugins
```
