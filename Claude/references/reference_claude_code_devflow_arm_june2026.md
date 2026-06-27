---
name: 2026年6月現在の Claude Code 開発フロー
description: フロントエンドエンジニアによる Claude Desktop + WezTerm + gtr + Zed を組み合わせた7段階の実践的開発フロー解説
type: reference
---

## 出典

Zenn（ARM Tech Blog）: https://zenn.dev/arm_techblog/articles/7712cde19988c8

## 2026年6月現在の Claude Code 開発フロー

**著者**: umetsu（フロントエンドエンジニア、2026年6月16日）

### 使用ツール構成

| ツール | 役割 |
|--------|------|
| Claude Desktop | メイン作業環境 |
| WezTerm | ターミナル |
| gtr | git worktree 管理 |
| Neovim / Zed | エディタ |

### 7段階の開発フロー

1. **worktree 作成**: gtrコマンドでブランチ・ディレクトリを分離
2. **チケット取得**: タスク内容の確認
3. **Plan モード計画**: defaultMode=planで実装前の計画立案
4. **計画レビュー**: 人間による確認・修正
5. **実装**: Claudeによる実装
6. **自動品質ゲート（dev-flow-gate）**: 5フェーズの自動検証
7. **ブラウザ動作確認**: Playwright経由の動作テスト

### 核となる設定

```json
{
  "permissions": {
    "defaultMode": "plan"
  }
}
```

デフォルトをplanモードにすることで、すべての作業が計画から始まる。

### Plugins 構成

```
superpowers      - 計画・TDD・デバッグ支援
code-simplifier  - リファクタリング提案
codex            - OpenAI連携レビュー
```

### カスタム Skills

```
commit       - Conventional Commits形式のコミットメッセージ生成
pr           - PR自動作成
browser-check - Playwright経由の動作確認
```

### dev-flow-gate（自動品質ゲート）の5フェーズ

1. 計画と実装の同期確認
2. コード整理（lint / format）
3. テスト実行
4. コードレビュー（/code-review）
5. PR作成自動化

### ポイント

- **worktreeによる並列作業**: 複数タスクを独立した環境で同時進行
- **Planモードのデフォルト化**: 衝動的な実装を防ぎ、計画品質を高める
- **ゲートによるボイラープレート排除**: lint・test・PR作成を全自動化

<!-- 日常で得た知見をここに追記 -->
