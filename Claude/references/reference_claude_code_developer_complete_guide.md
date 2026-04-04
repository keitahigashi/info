---
name: Claude Code開発者のための完全ガイド
description: 9パート構成の網羅的ガイド — 会話管理・MCP・Plan Mode・並列作業・効率化・ヘッドレス・CLAUDE.md・ショートカット・スラッシュコマンド（Zenn MAAAAAAAAAAA）
type: reference
---

## 出典
- URL: https://zenn.dev/417/articles/c15af4f4106a9f
- 著者: MAAAAAAAAAAA
- 公開日: 2026-03-25

## 概要
Claude Codeの実務的活用を9パートで網羅的に解説。会話管理からMCP、Plan Mode、並列作業、自動化まで、具体的なコマンド例付きで段階的に学べる構成。

## 詳細

### Part 1: 会話管理6機能
- Rewind（Esc×2）: 直前の指示を取り消し、元の会話は別セッションとして残る
- フォーク: `claude --continue --fork-session` で並行検証
- セッション再開: `claude --continue` / `/resume`
- セッション命名: `claude -n auth-refactor` / `/rename`
- コンテキスト圧縮: `/compact` / `/context`
- サイドクエスチョン: `/btw`（会話履歴に残らない）

### Part 2: MCP 3層構造
```
AIアプリ層 → MCPプロトコル層(JSON-RPC 2.0) → Transport層(stdio/http/sse)
```
- スコープ: Local(~/.claude.json) > Project(.mcp.json) > User(~/.claude.json全プロジェクト)
- OAuth 2.0認証フロー対応
- 環境変数: `${ENV_VAR}` 展開サポート

### Part 3: Plan Mode
- 起動: `claude --permission-mode plan` / `Shift+Tab×2`
- 4権限モード: default, acceptEdits, plan, dontAsk
- 典型フロー: Plan→計画+Q&A→Shift+TabでDefault→実装

### Part 4: 並列作業（Worktree）
- `claude --worktree feature-auth` で独立ディレクトリ作成
- `.claude/worktrees/<name>/`に分離、リポジトリ履歴は共有

### Part 5: 効率化機能
- `/effort low|medium|high|max` で推論レベル制御
- `/fast`: 同じモデルで高速出力
- `!command`: Bash直通
- `Ctrl+V`: 画像ペースト
- `Option+T`: 拡張思考トグル

### Part 6: ヘッドレスモード
- `claude -p "指示" --output-format json`
- パイプ連携: `cat error.txt | claude -p "原因分析"`
- セッション引き継ぎ: `--resume "$session_id"`
- CI用ツール限定: `--allowedTools "Bash,Edit,Read"`

### Part 7: CLAUDE.md配置と自動生成
- `~/.claude/CLAUDE.md`: 全プロジェクト共通
- `./.claude/CLAUDE.md`: プロジェクト固有
- `./.claude/rules/*.md`: ファイルタイプ別
- `/init` でコードベース分析後に自動生成

### 著者の強調ポイント
- Rewindが最頻出機能
- MCPは「JSONに書くだけ」で外部ツール統合
- Plan Modeの段階的実装で手戻りコスト削減
