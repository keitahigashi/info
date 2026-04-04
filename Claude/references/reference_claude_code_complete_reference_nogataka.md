---
name: Claude Code 完全リファレンス
description: 全機能網羅+意外と知らない便利機能トップ10・ショートカット・スラッシュコマンド・CLIフラグ・Hooks・Skills設定例
type: reference
---

## 出典

Qiita記事（@nogataka）: https://qiita.com/nogataka/items/5e64037cc452c5d497fa
公開日: 2026-04-02

## 意外と知らない便利機能トップ10

| # | 機能 | 説明 |
|---|------|------|
| 1 | `/btw` | メインコンテキストを汚さずサイドクエスチョン。トークンコスト最小 |
| 2 | `Ctrl+S` | プロンプト下書き保存（Git stashと同発想） |
| 3 | `#テキスト` | auto-memory永続化。次セッションでも一貫性保持 |
| 4 | `/loop` | 最大3日間、指定間隔でプロンプト/コマンド自動実行 |
| 5 | `!コマンド` | Claude推論スキップでシェル直接実行 |
| 6 | `Ctrl+B` | バックグラウンド実行。`Ctrl+T`で進捗確認 |
| 7 | `--bare` | hooks・LSP・auto-memory等スキップで最速起動。CI/CD向け |
| 8 | `/rewind`（ESC×2） | 直前のファイル変更を巻き戻し |
| 9 | `Ctrl+G` | `$EDITOR`で長文プロンプト編集 |
| 10 | スパースworktree | `worktree.sparsePaths`で大規模モノレポの起動高速化 |

## キーボードショートカット一覧

| ショートカット | 機能 |
|---|---|
| `Ctrl+S` | 下書き保存 |
| `Ctrl+G` | エディタ編集 |
| `Ctrl+R` | 履歴逆方向検索 |
| `Ctrl+B` | バックグラウンド実行 |
| `Ctrl+C` | 応答中断 |
| `Ctrl+T` | タスクリスト表示 |
| `Ctrl+O` | トランスクリプト表示 |
| `Shift+Tab` | パーミッションモード切替 |
| `Alt+T` | 拡張思考トグル |
| `Alt+P` | モデルピッカー |

## スラッシュコマンド（主要）

### セッション管理
`/compact [指示]`, `/clear`, `/resume`, `/rename`, `/color`, `/context`, `/export`

### 実行制御
`/plan`, `/effort [low/medium/high/max]`, `/schedule`, `/branch`

### コード品質
`/simplify`（3エージェント並列レビュー）, `/batch`, `/security-review`, `/diff`, `/pr-comments [PR番号]`

### 設定・診断
`/config`, `/status`, `/doctor`, `/init`, `/memory`

## CLIフラグ（主要）

```bash
# ワンショット
claude -p "質問" --output-format json --max-turns 10
# セッション継続
claude -c / claude -r "名前" / claude --from-pr 142
# 実行モード
claude --permission-mode auto / --bare / --max-turns 20
# ワークツリー
claude -w feature-auth
```

## 実践パターン

1. **CI/CDパイプライン**: `--bare -p --output-format json --model sonnet`
2. **並列ブランチ開発**: 複数ターミナルで`-w`+`/color`で管理
3. **PR作成前品質ゲート**: `/simplify` → `/security-review` → `/diff` → `/commit-push-pr`
4. **定期監視**: `/loop 10m npm test` or `/schedule`
5. **PR修正の翌日継続**: `claude --from-pr 142`

## Hooks設定例

```json
{
  "hooks": {
    "PreToolUse": [
      { "matcher": "Bash(rm -rf *)", "command": "echo 'BLOCKED' && exit 1" }
    ],
    "PostToolUse": [
      { "matcher": "Write(*.ts)", "command": "npx prettier --write $CLAUDE_FILE_PATH" }
    ]
  }
}
```

## Skills フロントマター例

```yaml
---
name: my-skill
allowed-tools: Read,Write,Bash
model: sonnet
context: fork
user-invocable: true
argument-hint: "<ファイル名>"
---
```
