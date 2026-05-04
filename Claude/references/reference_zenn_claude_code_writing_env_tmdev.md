---
name: Claude Codeで学んだことを発信する環境をZennで整える
description: ZennとGitHubを連携し、Claude Codeで記事執筆から自動公開までを実現するワークフロー構築ガイド
type: reference
---

## 出典

Zenn（tm_dev）: https://zenn.dev/tm_dev/articles/2026-05-03-zenn-github-claude-code-setup

## Zenn・GitHub・Claude Code連携ガイド（2026年5月3日）

### 全体目標

記事作成から公開まで自動化するワークフロー構築。「Claude Codeで学んだことをそのまま発信する」環境整備。

### 必要なツール（全て無料）

- GitHubアカウント（記事管理）
- Zennアカウント（公開先）
- Node.js v18以上
- Claude Code

### 実装手順

#### ステップ1：GitHubリポジトリ準備

```bash
git clone https://github.com/YOUR_USERNAME/zenn-content.git
cd zenn-content
```

#### ステップ2：Zenn CLI導入

```bash
node -v  # v18確認
npm install -g zenn-cli
npx zenn init
```

生成される構造:

```
articles/  （ブログ記事）
books/     （本形式）
.gitignore
```

#### ステップ3：ZennとGitHubの連携設定

Zenn内で「GitHubからのデプロイ」を開き、リポジトリ選択。`git push`で自動反映開始。

#### ステップ4：記事作成・プレビュー

```bash
npx zenn new:article
npx zenn preview
```

Frontmatter形式:

```yaml
---
title: ""
emoji: "😊"
type: "tech"  # or "idea"
topics: []
published: false
---
```

#### ステップ5：Claude Code統合

リポジトリルートに`CLAUDE.md`を配置し、フォーマット指定:

- ファイル場所: `articles/YYYY-MM-DD-slug.md`
- type値の指定（tech/idea）
- topicsタグ設定

指示するだけで正しい形式で記事生成。

### 公開ワークフロー

```bash
git add articles/
git commit -m "記事タイトル"
git push origin main
```

数秒〜数十秒で自動反映。

### 利点

- 下書き（published: false）で準備→公開時に切替え可能
- Claude Codeで学習→執筆→pushの連続自動化実現
- GitHubをバックアップ兼バージョン管理として活用
