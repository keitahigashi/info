---
name: Claude Code プラグイン入門 — Skills・Hooks・MCPをチームで共有する完全ガイド
description: プラグインシステムの構造と配布戦略の完全ガイド
type: reference
---

## 出典

Qiita: https://qiita.com/kai_kou/items/71ee39f27fc09d451cf8

## 概要

投稿日: 2026年5月6日（更新: 2026年6月16日）。Skills・Hooks・MCPサーバーをプラグイン化してチーム間で共有・配布する完全ガイド。

## プラグインシステムの概要

従来の `.claude/` ディレクトリはプロジェクト固有のみ対応だったが、新プラグインシステムはチーム共有・複数プロジェクト運用・OSS公開が可能になる。スキル呼び出しが `/hello` から `/my-plugin:hello` に変わる。

## ディレクトリ構造

```
my-plugin/
├── .claude-plugin/
│   └── plugin.json        # 唯一の必須ファイル（name/description/version/author）
├── skills/<name>/
│   └── SKILL.md
├── hooks/
│   └── hooks.json
├── monitors/
│   └── monitors.json
└── .mcp.json
```

## 初回作成の3ステップ

1. `.claude-plugin/plugin.json` を含むディレクトリ構造を作成
2. `skills/hello/SKILL.md` でスキルを定義
3. `claude --plugin-dir ./my-plugin` で開発中テスト

## 配布戦略

| 対象 | 方法 |
|---|---|
| チーム内 | プライベートGitリポジトリをマーケットプレイスとして使用 |
| 全社展開 | `.claude/settings.json` の `extraKnownMarketplaces` に設定 |
| OSS公開 | claude.ai/settings/plugins/submit に申請 |

## 既存設定の移行

`.claude/` の既存スキル・フック・エージェントを段階的に移行可能。命名規則統一とフックフォーマット互換性を保ちながら旧ファイルを削除する。`/reload-plugins` で再読み込み。`$ARGUMENTS` プレースホルダーでユーザー入力を受け取れる。
