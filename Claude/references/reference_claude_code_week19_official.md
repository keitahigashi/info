---
name: "Week 19 · 2026年5月4日〜8日 - Claude Code 公式週次ダイジェスト"
description: .zip アーカイブ・URL からのプラグイン読み込み、全プロジェクト横断の履歴検索（Ctrl+R）、worktree.baseRef 設定、auto mode ハードデニールなど（v2.1.128〜v2.1.136）
type: reference
---

## 出典

Claude Code 公式ドキュメント: https://code.claude.com/docs/ja/whats-new/2026-w19

## Week 19 主要機能（2026年5月4日〜8日）

### .zip アーカイブと URL からのプラグイン

`--plugin-dir` が `.zip` アーカイブを受け入れるようになり、新しい `--plugin-url` フラグで URL からプラグインアーカイブを直接取得できる。

```bash
# URL からプラグインを直接読み込む
claude --plugin-url https://example.com/my-plugin.zip
```

**用途:**
- マーケットプレイス掲載前のプラグインを試用
- アーティファクトストアから社内プラグインを配布

### 全プロジェクト横断の履歴検索（v2.1.129）

`Ctrl+R` 逆検索がデフォルトで全プロジェクトの全プロンプト履歴を検索対象に。v2.1.124 以前の動作に戻った。

- 検索中に `Ctrl+S` → 現在のプロジェクト/セッションに絞り込み
- 別リポジトリで以前実行したコマンドを素早く再利用可能

## その他の改善

| 設定・機能 | 詳細 |
|-----------|------|
| `worktree.baseRef`（`fresh` \| `head`） | `--worktree`・EnterWorktree・エージェント分離ワークツリーがリモートデフォルトかローカル HEAD からブランチするかを制御。デフォルト `fresh` はプッシュ前コミットを除外 |
| `settings.autoMode.hard_deny` | allow ルールが適用されていても auto mode で一致するアクションを無条件ブロック |
| Hooks に `effort.level` / `$CLAUDE_EFFORT` | フック JSON 入力フィールドと環境変数でアクティブエフォートレベルを取得可能 |
| `CLAUDE_CODE_DISABLE_ALTERNATE_SCREEN=1` | フルスクリーン代替スクリーンレンダラーをオプトアウト、ターミナル標準スクロールバックを維持 |
| `CLAUDE_CODE_PACKAGE_MANAGER_AUTO_UPDATE` | Homebrew / WinGet インストールでバックグラウンドアップグレードを実行 |
| `CLAUDE_CODE_SESSION_ID` | Bash ツールサブプロセス環境でアクセス可能（hooks の `session_id` と一致） |
| `/mcp` でツール数表示 | 接続サーバーのツール数を表示、0 ツールのサーバーにフラグ |
| `--channels` が API キー認証で動作 | コンソール（API キー）認証で `--channels` フラグが利用可能 |
| OTEL 環境変数の継承停止 | Bash・hooks・MCP・LSP サブプロセスは `OTEL_*` を継承しなくなり、意図しない OTLP 転送を防止 |
| サブエージェント進捗サマリーのキャッシュ | プロンプトキャッシュにヒットし `cache_creation` トークンコストを約 3 分の 1 に削減 |
| OAuth 並列セッション修正 | リフレッシュトークン競合後の 401 行き止まり・MCP OAuth 同時リフレッシュでのトークン消失を修正 |
| `parentSettingsBehavior` 管理キー | 管理者が SDK `managedSettings` をポリシーマージにオプトイン可能 |
