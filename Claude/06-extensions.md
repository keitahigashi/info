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

### claude-peers-mcp — マルチセッション連携（自動収集 2026-03-26）

複数Claude Codeセッション間でリアルタイムメッセージ交換するMCPサーバー。Bun + localhost:7899のSQLiteブローカーで動作。list_peers/send_message/set_summary/check_messagesの4ツール。スコープ別（machine/repo/directory）にピアを検出。セキュリティ: 認証なし・localhost限定のため個人開発マシン向け。

> 詳細: メモリ内 `reference_claude_peers_mcp.md` を参照

### Claude Agent SDK（自動収集 2026-03-26）

Claude Code CLIと同一のエージェントループをPython（`claude-agent-sdk`）/TypeScript（`@anthropic-ai/claude-agent-sdk`）ライブラリで提供。ビルトイン9ツール（Read/Write/Edit/Bash/Glob/Grep/WebSearch/WebFetch/AskUserQuestion）、4つの権限モード、18種類以上のHooks。サブエージェント（AgentDefinition）でマルチエージェント構成が可能。Bedrock/Vertex AI/Azure対応。

> 詳細: メモリ内 `reference_claude_agent_sdk_guide.md` を参照

### MCP必須サーバー10選・Tool Search（自動収集 2026-03-26）

推奨MCPサーバー: GitHub MCP、DBHub（PostgreSQL等）、Docker MCP Toolkit、Playwright MCP、Sentry MCP、Vitest MCP、Context7（最新ドキュメント注入）、Notion MCP、Slack MCP、Rube。**Tool Search**（`ENABLE_MCP_TOOL_SEARCH=auto`）でトークンオーバーヘッド最大95%削減。セキュリティ注意: CVE-2025-6514（mcp-remote, Critical 9.6）等の既知脆弱性あり。`managed-mcp.json`で組織レベルの許可/拒否リスト管理が可能。

> 詳細: メモリ内 `reference_claude_code_mcp_guide.md` を参照

### filesystem MCP — Claude Desktop（自動収集 2026-03-26）

Claude Desktopでfilesystem MCPを設定し、指定フォルダ内のファイルを直接読み書き可能にする。`@modelcontextprotocol/server-filesystem` をnpxで起動。Windows（パス `\\` エスケープ必要）/Mac対応、無料版でも利用可能。複数フォルダ・Googleドライブ指定も可。

> 詳細: メモリ内 `reference_claude_desktop_filesystem_mcp.md` を参照

### Preview MCP — フロントエンドファースト開発設計（自動収集 2026-03-27）

Claude CodeのMCPデュアルモード（クライアント+サーバー）で `claude mcp serve` によりネイティブツールを外部公開。**Raindrop MCP**の4段階フロー（UI構築→PRD自動生成→バックエンド実装→統合テスト）でUIを先に確定し仕様の曖昧さを激減。Chrome DevTools MCP（v0.19.0）でLighthouse自動監査・WCAG準拠チェック。MCP Tool Searchでトークン消費89%削減。2026年3月時点でMCPサーバー公式200+、コミュニティ3,000+。

> 詳細: メモリ内 `reference_claude_code_preview_mcp.md` を参照

### MCP完全ガイド 2026 — 外部ツール連携の全体像（自動収集 2026-03-27）

MCPは「AIのためのUSB-Cポート」。Claude Coworkでは Settings→Connectors からOAuth対応サービスをワンクリック接続。Claude Codeでは `.claude/mcp_config.json` に記述。自作サーバーはMCP SDK（Python/TypeScript/Java）で実装可能。セキュリティ: 明示的許可のみアクセス可、スコープ設定可、本番DBは読み取り専用推奨。

> 詳細: メモリ内 `reference_mcp_complete_guide_2026.md` を参照

### プラグイン・MCP・ツール総まとめ 2026（自動収集 2026-03-27）

MCP必須級4選: GitHub MCP（PR・Issue）、Context7（最新ドキュメント参照）、Playwright（E2E・スクリーンショット）、Sentry（エラー監視）。注目プラグイン: Claude-Mem（★20,000超、セッション自動記録）、Superpowers（★43,000超、Anthropic公式採択、7フェーズ開発）、Ralph Wiggum Loop（自動反復）。推奨初期構成: 個人→Context7+Playwright+Brave Search、チーム→+GitHub+Sentry+Linear。

> 詳細: メモリ内 `reference_claude_code_plugins_mcp_tools_2026.md` を参照

### Claude Code外部サービス連携3パターン（自動収集 2026-03-27）

外部連携を3パターンに分類: (1) MCPサーバー（FastMCPでNotion/Slack Webhook統合）、(2) Hook機能（npm→bun自動差し替え等の開発環境統一、Slack/Notion自動通知）、(3) OSS+CI/CD連携（Lint統合・品質レビュー結果のSlack/Discord共有）。初心者はMCPから、組織導入はHook+CI/CDを段階的に。

> 詳細: メモリ内 `reference_claude_code_api_integration_cases.md` を参照

### freee-mcp: 基幹業務APIのMCPサーバーOSS（自動収集 2026-03-28）

- freee社が約270本のAPIをMCP互換形式で公開（会計・人事労務・請求書・工数管理・販売）
- npmパッケージとして配布、GitHub: https://github.com/freee/freee-mcp
- Claude Desktop / Claude Code / Cursor に対応
- 「請求書を作って」→ 取引先登録から発行まで自動完了の実用例

> 詳細: メモリ内 reference_freee_mcp_oss.md を参照

### Skills vs MCP: 抽象化レイヤーの違いと補完パターン（自動収集 2026-03-28）

- MCP = インフラストラクチャ層（接続性・データアクセス）、Skills = アプリケーション層（ワークフロー・手順）
- MCPが「キッチンと材料」、Skillsが「レシピ」という補完関係
- MCP UI Framework（2026年1月）: MCPサーバーがチャットウィンドウ内でインタラクティブGUIを提供可能に

> 詳細: メモリ内 reference_claude_skills_vs_mcp_2026.md を参照

### 公式MCPドキュメント要点（自動収集 2026-03-30）
サーバー追加3方式: HTTP(推奨)・SSE(非推奨)・stdio(ローカル)。スコープ3レベル: local(デフォルト) > project(.mcp.json, チーム共有) > user(全プロジェクト)。ツール検索: MCPツール定義がコンテキスト10%超で自動有効化、オンデマンド動的ロード。管理対象MCP: managed-mcp.jsonで排他制御、allowedMcpServers/deniedMcpServersでポリシー制御。Windowsではstdioに`cmd /c`ラッパー必要。`claude mcp serve`でClaude Code自体をMCPサーバーとして公開可能。
> 詳細: メモリ内 `reference_claude_code_mcp_official_docs.md` を参照

### Claude Code Plugin作り方と配布方法（自動収集 2026-04-01）
Skills/Agents/Hooks/MCPをパッケージ化しGitHubリポジトリで配布。構成: `.claude-plugin/plugin.json`(必須)+ルート直下にskills/agents/hooks/。Skillネームスペース`/plugin-name:skill-name`で名前衝突回避。コマンド: `claude --plugin-dir`(テスト)、`/plugin marketplace add`(登録)、`/plugin install`(導入)。**注意**: Anthropicは「プラグインの中身を検証していない」と明言。
> 詳細: メモリ内 `reference_claude_code_plugin_creation_distribution.md` を参照

### Hooks完全ガイド 23種イベント（自動収集 2026-04-01）
3種Hookタイプ: Shell(ローカルコマンド)・HTTP(外部API)・Prompt-based(Claude自身が判断)。主要イベント: SessionStart/End、PreToolUse/PostToolUse、PreCommit/PostCommit、StopHook、SubAgentStart/End等。多層防御設計: PreToolUse(実行前ブロック)→PostToolUse(ファイル検査)→PreCommit(最終チェック)→StopHook(レビュー)。ホワイトリスト方式推奨。
> 詳細: メモリ内 `reference_claude_code_hooks_23_events_guide.md` を参照

### Claude DesktopリモートMCPサーバー接続（自動収集 2026-04-04）
ローカルMCP（claude_desktop_config.json）に加えリモートMCPサーバーにカスタムコネクタで接続可能。Pro/Maxは`claude.ai/customize/connectors`から追加、Team/Enterpriseはオーナー承認必要。Anthropicクラウド経由でパブリックインターネット上のMCPサーバーに接続。OpenAI Docs MCP等で動作実証済み。
> 詳細: references/reference_claude_desktop_remote_mcp.md を参照

### 国土交通省 地理空間MCPサーバー（自動収集 2026-04-06）
国交省が「地理空間MCP Server」（α版）を公開。不動産情報ライブラリAPIの25種データ（地価公示・不動産取引価格・防災情報・地形・人口等）に自然言語でアクセス可能。APIキー取得が前提。2025年11月の「MLIT DATA PLATFORM MCP Server」に続く公共MCP事例で、PLATEAUとの連携拡大も焦点。
> 詳細: references/reference_mlit_geospatial_mcp_server.md を参照

### --mcp-configで作業別MCP構成切り替え（自動収集 2026-04-07）
MCPサーバー追加しすぎのコンテキスト圧迫対策。`claude --mcp-config=path/to/.mcp.json`で構成ファイルを切り替え。基本構成（filesystemのみ）と開発用（filesystem+context7+linear）をalias化: `alias c='claude --mcp-config=~/.claude/.mcp.json'`。プロジェクトルートの`.mcp.json`と併用可能。`--strict-mcp-config`でプロジェクト固有設定を無視。
> 詳細: references/reference_claude_code_mcp_config_tips.md を参照

### Hooks全14イベント完全ガイド（自動収集 2026-04-07）
14フックポイント: SessionStart/UserPromptSubmit/PreToolUse/PermissionRequest/PostToolUse/PostToolUseFailure/Notification/SubagentStart/SubagentStop/Stop/TeammateIdle/TaskCompleted/PreCompact/SessionEnd。3ハンドラータイプ: Command（シェル実行）・Prompt（LLM判断）・Agent（サブエージェント起動）。Exit 2でブロッキングエラー。設定は3層（`~/.claude/settings.json`・`.claude/settings.json`・`.claude/settings.local.json`）。
> 詳細: references/reference_claude_code_hooks_14_events.md を参照

<!-- 日常で得た知見をここに追記 -->
