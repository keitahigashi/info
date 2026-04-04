---
name: Claude Code Plugin作り方と配布方法
description: プラグイン構成（plugin.json・Skills・Agents・Hooks・MCP統合）・Marketplace登録・ネームスペース・セキュリティ注意点（Zenn シンギュラリティ）
type: reference
---

## 出典
- URL: https://zenn.dev/singularity/articles/2026-02-08-claude-code-plugin-distribution
- 著者: Yasutaka Nishii（シンギュラリティ・ソサエティ）
- 公開日: 2026-02-08

## 概要
Claude Codeプラグインの構築・配布手法。Skills/Agents/Hooks/MCPをGitHubリポジトリ経由でパッケージ配布する仕組み。

## 詳細

### ファイル構成
```
my-plugin/
├── .claude-plugin/
│   └── plugin.json (必須)
├── skills/        # ルート直下に配置
├── agents/
├── hooks/
├── .mcp.json
└── .lsp.json
```

### 主要コマンド
- ローカルテスト: `claude --plugin-dir ./my-team-plugin`
- Marketplace登録: `/plugin marketplace add my-org/my-marketplace`
- インストール: `/plugin install review-plugin@my-team-tools`

### Skillネームスペース
Plugin内Skillは `/plugin-name:skill-name` 形式で名前衝突を自動回避。

### セキュリティ注意
- Anthropicは「プラグインの中身を検証していない」と明言
- MCP・シェルコマンド実行を含むため信頼できるソースのみ推奨
- サードパーティMarketplaceは自動更新デフォルト無効
