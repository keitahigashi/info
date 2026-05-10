---
name: 【2026年5月】Claude Code Routines完全解説｜自動化の全貌
description: Claude Code Routinesの3種トリガー（スケジュール・GitHub・API）・実務パターン5選・Desktop Appリデザイン・プラン別実行上限・エンタープライズ導入ガバナンスを解説したUravation記事
type: reference
---

## 出典

株式会社Uravation: https://uravation.com/media/claude-code-routines-desktop-redesign-2026/

## 公開日

2026年5月3日

## Claude Code Routinesとは

「プロンプト＋リポジトリ＋コネクター」を1度定義すれば、Anthropicのサーバーが自動実行する機能。2026年4月13〜17日にリサーチプレビューとして公開。

特徴:
- Linuxのcron機能に近い仕組み
- 対話的操作が不要（自律実行）
- クラウドインフラで稼働
- ローカルマシンのオン・オフを問わず動作

## 3種類のトリガー

### 1. スケジュールトリガー

- 実行タイミング：毎時・毎日・平日・週次など（最小間隔：1時間）
- タイムゾーン自動変換対応
- ワンショット機能（一回限りの将来予約・日次枠にカウントされない）

```
/schedule daily PR review at 9am
/schedule in 2 weeks, open a cleanup PR
```

### 2. GitHubイベントトリガー

| イベント | 起動タイミング |
|---------|--------------|
| Pull request | PR作成・クローズ・ラベル付け時 |
| Release | リリース作成・公開・編集時 |

フィルタリング: 特定ラベル付きPRのみ・ドラフトでないPRのみ など条件指定可能。

### 3. APIトリガー

HTTPエンドポイント発行でPOSTリクエストにより即時起動。

```bash
curl -X POST https://api.anthropic.com/v1/claude_code/routines/[ID]/fire
```

レスポンス例:
```json
{
  "type": "routine_fire",
  "claude_code_session_id": "session_01...",
  "claude_code_session_url": "https://claude.ai/code/session_01..."
}
```

## 実務パターン5選

| パターン | トリガー | 処理内容 |
|---------|---------|---------|
| 朝のバックログ整理 | 毎平日8:30 | issue自動ラベリング・担当者割り当て・Slackレポート |
| デプロイ後スモークテスト | CDパイプライン完了 | ヘルスチェック・エラーログ確認・Slack通知 |
| PR自動コードレビュー | PR作成時（ドラフト除外） | セキュリティ・パフォーマンス・規約チェック |
| 週次ドキュメント鮮度チェック | 毎週月曜9:00 | ドキュメント更新PR自動生成 |
| SDK間の並行ポート | Python SDKマージ時 | Node.js SDKへの自動移植 |

## Desktop App リデザイン（Week 16-17）

| 機能 | 内容 |
|------|------|
| セッションサイドバー | 複数セッション並列管理 |
| ドラッグ&ドロップ | ペイン配置自由変更 |
| ルーティンズビュー | Desktop上でRoutine管理 |
| セッション要約 | 別セッション後の状態把握 |
| カスタムテーマ | JSON定義でカラーテーマ変更 |

## プラン別実行上限

| プラン | 1日の実行回数 |
|-------|------------|
| Pro | 5回/日 |
| Max | 15回/日 |
| Team/Enterprise | 25回/日 |

- 超過分は従量課金
- ワンショットは日次枠にカウントなし
- 使用量確認：`/usage`（d/wキーで日次・週次切り替え）

## 導入の失敗パターン

**失敗1：プロンプトが曖昧**
```
❌「コードの問題を見つけて直してください」
⭕「src/auth/ 配下に限定し、SQLインジェクションリスク確認。
   パラメータ化されたクエリ使用を徹底。不明点はPRコメントで停止。」
```

**失敗2：コネクター絞り込みなし** → 必要最小限に限定する

**失敗3：ブランチ保護設定なし** → `claude/`プレフィックスのみ許可、mainへのpush制限を設定

**失敗4：リサーチプレビュー前提で本番化** → ステージング環境でのテスト必須

## エンタープライズ導入のガバナンス設計

CLAUDE.mdへの記述例:
```markdown
## Routinesからの操作制限
- 本番ブランチへの直接pushは禁止
- 事前承認済みエンドポイントのみ許可
- 個人情報・認証情報の変更は禁止
- 500行超の変更はドラフトで停止
```

Individual accountに紐付くため、専用サービスアカウントの使用を推奨。

## CLI vs Web vs Desktop での作成方法

| 環境 | 対応トリガー | 特記事項 |
|------|------------|---------|
| CLI（ターミナル） | スケジュールのみ | `/schedule`, `/schedule list`, `/schedule run` |
| Web（claude.ai/code/routines） | 3種類全て | APIトリガートークン生成はWebのみ |
| Desktop App | 3種類全て | サイドバー「Routines」→「New routine」→「Remote」 |

## 関連バージョン時系列

| Week | バージョン | 主要機能 |
|-----|---------|--------|
| W13 | v2.1.83-85 | Auto mode・条件付きhooks |
| W16 | v2.1.105-113 | Routines・Opus 4.7・xhigh effort |
| W17 | v2.1.114-119 | セッション要約・Webリデザイン |
