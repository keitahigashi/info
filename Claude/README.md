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
| [**REFERENCES.md**](REFERENCES.md) | **参照記事・収集記事一覧** |

## 更新方針

日常的に得た知見を随時追記していく。各ファイル末尾の「実践メモ」セクションに具体的な体験・Tipsを蓄積する。

## 記事自動収集システム

このリポジトリには、Claude Code のセッション間で持続する記事自動収集の仕組みが組み込まれている。
詳細は [CLAUDE.md](CLAUDE.md) に定義されたワークフローを参照。

### アーキテクチャ

```
セッション開始（「記事収集して」等）
  ↓
CLAUDE.md → ワークフロー手順を読み込み
  ↓
MEMORY.md + REFERENCES.md → 収集済みURL一覧で重複チェック
  ↓
Web検索（3キーワード並列） → 重複フィルタ
  ↓
WebFetch → reference_*.md（メモリ内）に詳細保存
  ↓
MEMORY.md・REFERENCES.md 更新 → コミット＆プッシュ
```

### 永続化の仕組み

| 要素 | 保存先 | 永続性 | 役割 |
|------|--------|--------|------|
| **CLAUDE.md** | リポジトリ内 | Git管理 | ワークフロー手順をセッション開始時に自動読み込み |
| **REFERENCES.md** | リポジトリ内 | Git管理 | 参照記事・収集記事の一覧（重複チェック対象） |
| **MEMORY.md** | Claudeメモリ | セッション間で永続 | 収集済みURL一覧 + メモリファイルインデックス |
| **reference_*.md** | Claudeメモリ | セッション間で永続 | 各記事の詳細情報（要約・コード例・設定例等） |

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
