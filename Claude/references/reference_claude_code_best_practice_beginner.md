---
name: Claude Codeベストプラクティス初心者向け解説
description: Anthropic公式ベストプラクティスの初心者向け解説（CLAUDE.md・MCP・ワークツリー・ヘッドレスモード）
type: reference
---

## 出典
- URL: https://zenn.dev/tmasuyama1114/articles/claude_code_best_practice_guide
- 著者: とまだ@AI（フリーランスエンジニア、Udemy講師）
- 公開日: 2025-10-13（最終更新: 2026-01-23）

## 概要
Anthropic公式ベストプラクティスを初心者向けに噛み砕いて解説。CLAUDE.mdによるチーム開発効率化、サブエージェント活用、MCP統合設定、権限管理、テスト駆動開発、Git連携、カスタムコマンド作成、セキュリティ対策まで包括的にカバー。

## 詳細

### CLAUDE.md設定例
```markdown
# プロジェクトのコマンド
- npm run build: プロジェクトをビルド
- npm run typecheck: 型チェック実行
# コーディング規約
- ES modulesを使用（CommonJSは使わない）
```

### MCPサーバー設定（HTTP型）
```json
{
  "mcpServers": {
    "sentry": {
      "type": "http",
      "url": "https://mcp.sentry.dev/mcp",
      "args": ["--sentry-auth-token", "your-auth-token"]
    }
  }
}
```

### 主要コンテキスト管理コマンド
- `/clear`: 全コンテキストリセット
- `/compact`: 作業内容を要約・圧縮
- `/init`: CLAUDE.md更新

### カスタムコマンド定義
`.claude/commands/fix-github-issue.md` にMarkdownで定義、`$ARGUMENTS` で引数受け取り

### think機能（段階的思考予算）
「think」→「think hard」→「think harder」→「ultrathink」（Tabキーでも有効）

### テスト駆動開発フロー
1. テスト記述 → 2. 失敗確認 → 3. テストコミット → 4. 実装記述 → 5. 実装コミット

### 並行作業（Gitワークツリー）
```bash
git worktree add ../project-feature-a feature-a
cd ../project-feature-a && claude
```

### ヘッドレスモード（CI/CD自動化）
```bash
claude -p "指示文" --output-format stream-json
claude -p "イシュー分類" --dangerously-skip-permissions
```
