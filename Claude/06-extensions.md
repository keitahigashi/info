# MCP・フック・IDE連携・プラグイン

## MCP（Model Context Protocol）

外部ツール・DB・APIをClaudeに接続するための標準プロトコル。

### サーバータイプ

| タイプ | 説明 | 用途 |
|--------|------|------|
| stdio | ローカルプロセス（Node.js / Python等） | ローカルDB・ファイル操作 |
| HTTP | リモートHTTPエンドポイント | 外部サービス連携 |
| SSE | Server-Sent Events | Webベース実装 |

### 設定方法

**ファイル配置**: `.mcp.json`（プロジェクト）、`~/.claude/mcp.json`（ユーザー）
**CLIフラグ**: `--mcp-config ./mcp.json`
**環境変数**: 設定内で `${ENV_VAR}` 展開をサポート

```json
{
  "mcpServers": {
    "postgres": {
      "type": "stdio",
      "command": "node",
      "args": ["/path/to/mcp-postgres.js"]
    },
    "github": {
      "type": "http",
      "url": "https://mcp.example.com/github"
    }
  }
}
```

### 代表的なMCPサーバー

- **GitHub**: リポジトリ操作、PR管理
- **データベース**: PostgreSQL / MySQL クエリ実行
- **Sentry**: エラーモニタリング
- **Slack / Notion / Jira**: 外部サービス連携

### 高度な機能

- **Tool Search**: 大量のツールから関連するものを動的に検索
- **リソース参照**: `@server:resource` 形式で直接参照
- **MCPプロンプト**: MCPサーバー定義のプロンプトを `/command` で実行

---

## フック（Hooks）

ライフサイクルイベントに応じてカスタム処理を実行する仕組み。

### 主要なフック

| フック | タイミング | 代表的な用途 |
|--------|-----------|------------|
| SessionStart | セッション開始時 | 環境変数設定、初期化 |
| UserPromptSubmit | ユーザー入力後 | プロンプト前処理 |
| PreToolUse | ツール実行前 | 危険コマンドブロック |
| PostToolUse | ツール実行後 | 自動フォーマット・ログ |
| PermissionRequest | 権限確認時 | 自動承認/拒否 |
| Notification | 通知イベント時 | デスクトップ通知 |
| Stop | セッション終了時 | クリーンアップ |
| PreCompact/PostCompact | コンテキスト圧縮時 | メモリ管理 |

### 設定場所

`~/.claude/settings.json`（ユーザー）または `.claude/settings.json`（プロジェクト）の `hooks` キー。

### フック実装タイプ

| タイプ | 説明 |
|--------|------|
| command | シェルスクリプト実行。exit codeでブロック/許可 |
| http | HTTP POSTリクエスト |
| prompt | Claude自身による判定 |
| agent | サブエージェント実行 |

### 活用例: 自動フォーマット

```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Edit(**/*.ts)",
      "hooks": [{
        "type": "command",
        "command": "npx prettier --write {filePath}"
      }]
    }]
  }
}
```

### マッチャー

- `*` : すべてのイベント
- `Bash` : Bashツールのみ
- `Edit|Write` : 複数ツール
- `mcp__memory__.*` : 正規表現でMCPツール指定

---

## IDE連携

### VS Code

- Marketplaceから「Claude Code」をインストール
- ファイル/フォルダ参照（`@path/to/file`）
- セッション再開、Chrome自動化、Git連携
- Extension Settingsで各種設定可能

### JetBrains（IntelliJ / PyCharm / WebStorm等）

- Marketplaceから「Claude Code」をインストール
- IDE内およびターミナルから起動
- WSL / SSH / リモート開発対応

---

## プラグイン

Skills・Hooks・MCPサーバー・LSPサーバーをパッケージ化したもの。

```
my-plugin/
├── plugin.json
├── skills/
├── hooks/
├── mcp-servers/
└── lsp-servers/
```

**管理**: `/plugin add <url>`, `/plugin enable/disable`

---

---

## 実践例: Unity MCP連携

[Unity MCP](https://github.com/CoplayDev/unity-mcp) — Claude CodeからUnityエディタを直接操作するMCPサーバー（7.5k+ Stars）。

### セットアップ

1. Unity Package Managerで追加: `https://github.com/CoplayDev/unity-mcp.git?path=/MCPForUnity#main`
2. `Window > MCP for Unity` → Start Server（localhost:8080）
3. MCP設定に追加:

```json
{
  "mcpServers": {
    "unityMCP": {
      "url": "http://localhost:8080/mcp"
    }
  }
}
```

### 主要ツール（35+種類）

| カテゴリ | ツール例 | できること |
|---------|---------|----------|
| スクリプト | `create_script`, `validate_script` | C#スクリプト作成・編集・Roslyn検証 |
| ゲームオブジェクト | `manage_gameobject`, `manage_components` | 作成・削除・階層管理・コンポーネント操作 |
| シーン | `manage_scene` | マルチシーン編集・テンプレート適用 |
| アセット | `manage_asset`, `manage_material` | テクスチャ・マテリアル・シェーダー管理 |
| ビルド | `manage_build` | クロスプラットフォームビルド・非同期追跡 |
| グラフィックス | `manage_graphics`, `manage_camera` | ボリューム・URP・Cinemachine |
| パッケージ | `manage_packages` | インストール・削除・検索 |
| 一括実行 | `batch_execute` | 複数操作を10-100倍高速に実行 |

### 複数Unityインスタンス対応

`unity_instances`リソースで一覧確認→`set_active_instance`でプロジェクト切替。

---

## 実践メモ

<!-- 日常で得た知見をここに追記 -->
