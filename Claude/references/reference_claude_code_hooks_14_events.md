---
name: Hooks完全ガイド全14イベント
description: Claude Code Hooksの全14イベント詳細解説（3ハンドラータイプ・Exit Code制御・設定例付き）
type: reference
---

## 出典
- URL: https://qiita.com/nogataka/items/17fc8d9c2b2efde570a6
- 著者: @nogataka
- 公開日: 2026-02-09（2026-02-27更新）

## 概要
Claude Codeのライフサイクル上の14個のフックポイントを詳細解説。3種のハンドラータイプ、Exit Code制御、実践設定例を網羅。

## 詳細

### 全14イベント一覧

| イベント | タイミング | ブロック可否 | 主要用途 |
|---------|----------|-----------|---------|
| SessionStart | セッション開始時 | 不可 | 環境初期化・環境変数設定 |
| UserPromptSubmit | ユーザー入力処理前 | 可能 | プロンプト検証・機密情報フィルタリング |
| PreToolUse | ツール実行前 | 可能 | 危険コマンド検出・ブロック |
| PermissionRequest | 権限確認時 | 可能 | 権限の自動許可・拒否判定 |
| PostToolUse | ツール実行成功後 | 不可 | 自動フォーマッタ実行 |
| PostToolUseFailure | ツール失敗時 | 不可 | エラーログ記録 |
| Notification | UI通知イベント時 | 不可 | 通知音再生 |
| SubagentStart | サブエージェント起動時 | 不可 | 活動監視・ログ |
| SubagentStop | サブエージェント完了時 | 可能 | 処理続行判定 |
| Stop | Claude応答完了時 | 可能 | 品質チェック・通知 |
| TeammateIdle | チームメイトアイドル時 | 可能 | アイドル防止 |
| TaskCompleted | タスク完了時 | 可能 | 品質ゲート |
| PreCompact | コンテキスト圧縮前 | 不可 | ログ保存 |
| SessionEnd | セッション終了時 | 不可 | クリーンアップ・統計記録 |

### 3つのハンドラータイプ
1. **Command Hook**: シェルコマンド実行。最もシンプル
2. **Prompt Hook**: LLMに判断を委ねる。意味的チェック向き
3. **Agent Hook**: ファイル調査能力を持つサブエージェント起動

### Exit Code制御
- Exit 0: 成功（JSON出力で細かい制御可能）
- Exit 2: ブロッキングエラー（対応イベントのみ）
- その他: 非ブロッキングエラー

### 設定ファイル配置場所
- `~/.claude/settings.json`: 個人全体設定
- `.claude/settings.json`: プロジェクト共有設定
- `.claude/settings.local.json`: 個人プロジェクト設定

### 実践設定例（自動フォーマット）
```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Edit|Write",
      "hooks": [{
        "type": "command",
        "command": "npx prettier --write $FILE",
        "statusMessage": "フォーマット中..."
      }]
    }]
  }
}
```

### セキュリティ注意
- フックはユーザー権限で実行される
- stdoutに機密情報を出力しない
- `disableAllHooks: true`で一時無効化可能
- エンタープライズ管理者は`allowManagedHooksOnly`でユーザー定義フックをブロック可能
