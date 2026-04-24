---
name: Claude Code Routines入門 — スケジュール・API・GitHub連携で開発タスクを自動化する
description: Routines 3トリガー詳細・プラン別利用制限・デスクトップ新機能・実践ユースケース
type: reference
---

## 出典

Qiita (@kai_kou): https://qiita.com/kai_kou/items/67811e6df536b4bee19c

## Claude Code Routines 入門

### 記事概要

公開日: 2026年4月16日
著者: @kai_kou（甲斐 甲）
タグ: GitHub, automation, Anthropic, AIAgent, ClaudeCode

### Routines とは

2026年4月14〜15日リリース。「プロンプト + リポジトリ + コネクタを1セットにしたClaude Code自動化機能」。クラウド実行でローカル環境への依存なし。

### 3種類のトリガー

| トリガー種別 | 実行間隔/条件 | ユースケース |
|------------|-------------|------------|
| **Schedule** | 毎時・日次・平日・週次 | バックログ整理・定期レポート |
| **GitHub** | PR作成・Issue オープン等のイベント | PRレビュー自動化・Issueトリアージ |
| **API** | HTTP エンドポイント経由の外部呼び出し | Slack/webhookからのトリガー |

### プラン別利用制限

| プラン | 1日あたりRoutines実行上限 |
|--------|------------------------|
| Pro | 5回 |
| Max | 15回 |
| Team / Enterprise | 25回 |

### デスクトップアプリ同時リリース新機能

- **並列セッション管理サイドバー**: アクティブ/最近使用セッションを一覧表示
- **ドラッグ&ドロップレイアウト**: ペインの自由配置
- **統合ターミナル**: セッションと並行してビルド・テスト実行
- **ファイルエディタ**: エディタ不要でファイル参照・編集
- **Diff ビューア**: AI変更差分の視覚的確認

### 実践ユースケース

```yaml
# サンプル: 毎朝PRレビューRoutine
trigger:
  schedule: "daily at 9:00 JST"
prompt: |
  昨日オープンされたPRをレビューし、
  重要度でラベル付けしてコメントを追加してください
repository: my-org/my-repo
```

- **バックログ自動管理**: 毎週月曜日にIssueを優先度別に整理
- **ドキュメント更新検知**: コード変更をGitHubイベントで検知してREADME自動更新
- **デプロイ後自動検証**: APIエンドポイントからトリガーして動作確認

### Routinesを使い始める手順

1. Claude Code設定画面で「Routines」タブを選択
2. プロンプト・リポジトリ・コネクタの3要素を設定
3. トリガー（Schedule/GitHub/API）を選択して保存
4. 初回実行で動作確認
