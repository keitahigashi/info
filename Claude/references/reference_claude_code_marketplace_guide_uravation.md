---
name: 【2026年5月】Claude Code Marketplaceガイド｜全解説
description: Anthropic公式プラグインディレクトリの仕組み・コマンド・カスタムMarketplace作成・セキュリティの完全ガイド
type: reference
---

## 出典

Uravation: https://uravation.com/media/anthropic-marketplace-plugin-complete-guide-2026/

## Claude Code Marketplace完全解説（2026年5月3日）

### 概要

Anthropic公式プラグインディレクトリ「claude-plugins-official」はClaude Code起動時に自動で利用可能。2026年5月時点で55以上のプラグインをカバーし、LSP・外部サービス統合・開発ワークフローの3カテゴリに分類される。

### 3大プラグインカテゴリ

#### 1. コードインテリジェンス（LSP）プラグイン

| 言語 | プラグイン名 | 必要なバイナリ |
|------|------------|-------------|
| TypeScript/JavaScript | typescript-lsp | typescript-language-server |
| Python | pyright-lsp | pyright-langserver |
| Go | gopls-lsp | gopls |
| Rust | rust-analyzer-lsp | rust-analyzer |
| Java | jdtls-lsp | jdtls |
| Swift | swift-lsp | sourcekit-lsp |

機能: 自動診断（型エラー即座検出）、コードナビゲーション（定義ジャンプ・参照検索）

#### 2. 外部サービス統合プラグイン

- ソース管理: GitHub、GitLab
- プロジェクト管理: Jira/Confluence、Linear、Notion
- デザイン: Figma
- インフラ: Vercel、Firebase、Supabase
- セキュリティ: Aikido、42Crunch、CrowdStrike
- モニタリング: Sentry、Datadog、Amplitude

#### 3. 開発ワークフロープラグイン

- `commit-commands` - Gitコミット・push・PR作成の自動化
- `pr-review-toolkit` - プルリクエストレビュー専門エージェント
- `code-review` - コードレビューエージェント
- `feature-dev` - フィーチャー開発の自動化
- `agent-sdk-dev` - Claude Agent SDK開発ツール
- `plugin-dev` - 独自プラグイン作成ツールキット
- `code-modernization` - レガシーコード近代化

### 基本操作コマンド

```bash
# Marketplace対話UIを開く
/plugin

# プラグインをインストール
/plugin install github@claude-plugins-official

# インストール済みプラグイン一覧
/plugin list

# 無効化（削除なし）
/plugin disable github@claude-plugins-official

# 再有効化
/plugin enable github@claude-plugins-official

# 完全削除
/plugin uninstall github@claude-plugins-official

# 再起動不要でリロード
/reload-plugins
```

### インストールスコープ

| スコープ | 対象 | 設定ファイル |
|---------|------|------------|
| User | 全プロジェクト（デフォルト） | ~/.claude/settings.json |
| Project | リポジトリの全コラボレーター | .claude/settings.json |
| Local | 自分のみ・このリポジトリだけ | .claude/settings.local.json |

```bash
# チーム全体に適用
claude plugin install formatter@your-org --scope project

# 自分だけ
claude plugin install debug-helper@your-org --scope local
```

### カスタムMarketplace作成

最小構成（marketplace.json）:

```json
{
  "name": "your-org-plugins",
  "description": "Your Org向けプラグインカタログ",
  "plugins": [
    {
      "name": "security-lint",
      "description": "機密情報のハードコード検出",
      "category": "security",
      "source": {
        "type": "path",
        "path": "plugins/security-lint"
      },
      "author": "your-org"
    }
  ]
}
```

チームへの配布:

```bash
/plugin marketplace add your-org/claude-plugins
/plugin install security-lint@your-org-plugins
/plugin marketplace add your-org/claude-plugins#v1.0.0
```

### セキュリティ注意事項

1. **信頼できるソースのみ追加** - Anthropic公式・組織内リポジトリ推奨
2. **LSPプラグインはバイナリを先にインストール**
3. **Marketplace削除前にプラグインを先に移行**
4. **プラン制限** - プラグイン機能はPro・Team・Enterpriseプラン限定

エンタープライズ管理設定:

```json
{
  "allowedMarketplaces": [
    "anthropics/claude-plugins-official",
    "your-org/approved-plugins"
  ],
  "blockedMarketplaces": [
    "untrusted-org/*"
  ]
}
```

### SkillsとMarketplaceプラグインの違い

| 側面 | Claude Skills 2.0 | Marketplaceプラグイン |
|------|-----------------|-------------------|
| 対象 | カスタムインストラクション | Claude Code機能拡張 |
| 権限 | Claudeの振る舞い変更 | マシン上のコード実行 |
| 配布 | ユーザー自身が管理 | Marketplaceカタログ経由 |

### 統計（2026年5月時点）

- プラグイン総数: 4,200以上のスキル、770以上のMCPサーバー、2,500以上のMarketplace
- 公式Marketplace: 55以上のプラグイン
