---
name: Week 17 公式What's New（2026年4月20〜24日）
description: /ultrareviewリサーチプレビュー公開・セッションリキャップ・カスタムテーマ・Claude Code Web再設計（v2.1.114〜v2.1.119）
type: reference
---

## 出典

code.claude.com（公式ドキュメント）: https://code.claude.com/docs/ja/whats-new/2026-w17

## Week 17（2026年4月20〜24日）主要機能

### 対象リリース
v2.1.114 → v2.1.119

---

### 1. /ultrareview（リサーチプレビュー）
- パブリックリサーチプレビューとして一般公開
- クラウド内でバグ検出エージェントフリートをブランチ/PRに対して実行
- 検出結果は自動的に CLI またはデスクトップに返される
- 認証・データマイグレーション等の重要変更のマージ前に推奨

```text
> /ultrareview        # 現在のブランチ
> /ultrareview 1234   # PR番号指定
```

---

### 2. セッションリキャップ（CLI）
- 別フォーカスから戻ったとき、不在中の出来事を1行で表示
- 複数Claudeセッション同時実行時のフロー維持に有用
- `/recap` でオンデマンド生成、`/config` から自動リキャップのオン/オフ切替

```text
> /recap
```

---

### 3. カスタムテーマ（v2.1.118）
- `/theme` から名前付きカラーテーマを構築・切り替え
- `~/.claude/themes/` のJSONファイルを手動編集も可能
- ベースプリセット選択 + 変更したいトークンのみオーバーライド
- プラグインもテーマを配布可能

```text
> /theme
```

---

### 4. ウェブ上の Claude Code 再設計（web）
- `claude.ai/code` がデスクトップアプリ再設計と一致する新UIに
- セッションサイドバー・ドラッグアンドドロップレイアウト・Routinesビュー刷新
- バックエンドも再構築、応答速度と信頼性が向上

---

### その他の改善（抜粋）

| 機能 | 概要 |
|------|------|
| Vim ビジュアルモード | プロンプト入力で `v`（文字選択）・`V`（行選択）が使用可能 |
| フック→MCPツール直接呼び出し | `type: "mcp_tool"` で接続済みサーバーにプロセス生成なしでアクセス |
| `/usage` に統合 | `/cost`・`/stats` が `/usage` にマージ（旧名はタブショートカットとして残存） |
| `/config` の変更が永続化 | `~/.claude/settings.json` に保存、優先度ルールも適用 |
| フォーク型サブエージェント | `CLAUDE_CODE_FORK_SUBAGENT=1` で完全な会話コンテキストを継承 |
| デフォルトエフォート引き上げ | Opus 4.6・Sonnet 4.6 の Pro/Max で `medium` → `high` に変更 |
| ネイティブ bfs・ugrep | macOS/Linux で Glob/Grep を組み込みバイナリに置き換え（高速化） |
| `--from-pr` 拡張 | GitLab MR・Bitbucket PR・GitHub Enterprise URLに対応 |
| Auto mode `$defaults` | カスタムルールをビルトインリストと組み合わせ可能に |
| `claude plugin tag` | バージョン検証付きプラグインリリース git タグ作成コマンド |
| Opus 4.7コンテキスト修正 | ネイティブ1Mコンテキストウィンドウ対応（`/context`パーセント膨張・早期コンパクション修正） |
| `/resume` 高速化 | 大規模セッションで最大67%高速化 |
