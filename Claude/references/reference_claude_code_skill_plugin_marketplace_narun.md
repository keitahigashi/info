---
name: Claude Codeのスキルをプラグイン化してマーケットプレイスで配布する方法
description: スキルからプラグインへのパッケージング手順をステップバイステップで解説し、公式skill-creatorの日本語化実例も紹介。
type: reference
---

## 出典

narun / Zenn: https://zenn.dev/narun/articles/20260310-claude-code-skill-to-plugin

## プラグインの定義

- スキル・コマンド・エージェント・フック・MCPサーバーを1つのパッケージとして配布可能

## 必須構成ファイル

```
.claude-plugin/
└── plugin.json          # プラグイン定義（name, version, description, skills配列）

marketplace.json          # GitHubリポジトリに配置してMarketplace化
```

## 実装ステップ

1. プラグイン構造の作成（`.claude-plugin/plugin.json`を用意）
2. ローカル動作確認: `claude --plugin-dir ./my-plugin` コマンドで検証
3. `marketplace.json` でカタログ化
4. GitHubにpublicリポジトリとして公開

## Vercel Skillsとの比較

| 項目 | Claude Code Marketplace | Vercel Skills |
|------|------------------------|---------------|
| 対象 | Claude Code専用 | 複数エージェント対応 |
| コンポーネント | スキル・MCP・フックなど複合 | スキルのみ |

## 実例

公式の `skill-creator` を日本語化してプラグイン化する完全な実装例を収録。初めてプラグインを公開する際の参照実装として活用可能。
