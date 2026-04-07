---
name: isolation:worktreeエージェント定義
description: エージェント定義に1行追加でgit worktree自動生成、並列エージェント間のファイル衝突防止
type: reference
---

## 出典
- URL: https://qiita.com/NaokiIshimura/items/47f4744e1b27d417ef54
- 著者: @NaokiIshimura
- 公開日: 2026-02-24

## 概要
エージェント定義のfrontmatterに`isolation: worktree`を1行追加するだけで、サブエージェントが専用のgit worktreeで実行される機能を解説。

## 詳細

### 設定例
```yaml
---
name: feature-implementer
description: フィーチャー実装を担当するエージェント
isolation: worktree
tools:
  - Read
  - Write
  - Edit
  - Bash
---
```

### 動作の仕組み
- 起動時に `.claude/worktrees/<ランダム名>/` に専用ディレクトリ自動作成
- ブランチ名: `worktree-<名前>` 形式で自動生成
- 変更がなければ終了時に自動削除

### 活用例
- **並列フィーチャー開発**: フロントエンドとバックエンド実装を同時実行
- **コードレビュー並列化**: レビューと実装が相互非干渉
- **実験的変更**: メインブランチに影響せず安全に試行

### ベストプラクティス
- `.gitignore`に`.claude/worktrees/`を追加
- 環境設定が必要な場合はWorktreeCreateフックで対応
