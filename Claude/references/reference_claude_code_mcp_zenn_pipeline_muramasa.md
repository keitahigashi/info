---
name: Claude Code と MCP で「記事を書く→Zenn公開→経歴に蓄積」を自動化した
description: Claude Code + GitHub MCPを使ってZenn自動公開と実績管理を一体化するパイプライン実装事例
type: reference
---

## 出典

Zenn（muramasa0228）: https://zenn.dev/muramasa0228/articles/2026-06-20-mcp-zenn-pipeline

## 自動化パイプラインの概要

記事執筆からZennへの公開、GitHubでの実績蓄積までを自動化するシステムの実装記録。

### 媒体選定理由

「push = 公開」かつURLが事前に確定するZennを選択：

| 媒体 | push=公開 | URL事前確定 | 自動化難易度 |
|------|-----------|-------------|------------|
| Zenn | ✅ | ✅ | 低 |
| Qiita | ✅ | ❌ | 中 |
| note | ❌ | ❌ | 高 |

### リポジトリ構成

```
repo/
├── articles/         # Zenn記事（push→自動公開）
├── books/            # Zenn本
└── career/
    └── index.json    # 実績管理（JSON）
```

- `career/index.json` から README の実績一覧を自動生成
- `articles/` と `career/` を同じリポジトリに統合することで一元管理

### 実装上の課題

**GitHub MCP 権限設定**
- fine-grained token で必要な権限を明示的に追加
- `contents:write`・`pull_requests:write` が最低限必要

**ディレクトリ使い分け**
- `articles/`：1ファイル1記事（zenn-cli形式）
- `books/`：複数章の本形式

### 設計思想

> 発信媒体は「自動化の可能性」で選定する

AI + MCP のパイプライン化により発信のハードルを大幅に低減。Claude Codeがコンテンツ生成・GitHubへのpush・実績JSONの更新を一括で担当。
