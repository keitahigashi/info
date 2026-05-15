---
name: Claude Code 5月アップデート総括 — skills検索 / async hooks / HTTP hooksを個人開発パイプラインへ組み込む
description: 2026年5月のClaude Code 3大アップデート（skills曖昧検索・async hooks・HTTP hooks）の実装例と設計注意点を解説
type: reference
---

## 出典

Qiita (@creolab_dev): https://qiita.com/creolab_dev/items/5f058d93b1f88c43f339

## 概要

2026年5月14日投稿。Claude Codeの5月アップデートで追加された3つの重要機能について、企業エンジニア視点での実装例と設計上の落とし穴を解説。「派手ではないが個人開発から少人数チームへのスケーリングを実現する構造的改善」と評価。

## 3つの主要アップデート

### 1. Skills 検索ボックス

- `/`メニューからskill名・descriptionを**曖昧検索**可能に
- 従来はファイル名記憶か一覧表示のみ → skills数十〜100超でも実用的なカタログ運用が可能に
- 組織共有skillsの発見コストを大幅削減

### 2. Async Hooks

PostToolUseフックに `async: true` フラグが追加：

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write",
        "async": true,
        "command": "node scripts/notify-slack.mjs"
      }
    ]
  }
}
```

- 同期実行でメインフローがブロックされていた問題を解消
- Slack通知・画像生成（1分超）などをバックグラウンドで実行
- CreoLabパイプラインで**30〜60秒の短縮**を実現

### 3. HTTP Hooks

外部Webサーバへ直接POSTが可能に：

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write",
        "async": true,
        "http": {
          "url": "https://example.internal/ci/trigger",
          "method": "POST",
          "headers": {
            "Authorization": "Bearer $INTERNAL_CI_TOKEN"
          },
          "bodyTemplate": "{\"file\": \"${updatedToolOutput.path}\"}"
        }
      }
    ]
  }
}
```

- 社内CI、Issue Tracker、ダッシュボードへのイベント発火をhook1行で実装可能
- サーバーレス関数やWebhook経由でクラウドサービスとの連携も容易

## 設計上の3つの落とし穴

1. **async hookの失敗ハンドリング** — stderrを集約するwrapperスクリプト経由でSlack/Sentryへ転送する
2. **認証情報の管理** — トークンは`.env`経由または秘匿wrapper経由で呼び出し（設定ファイルへの直書き禁止）
3. **責務分離の明文化** — PreToolUse（検証・拒否）とPostToolUse（副作用）の役割を明確に区別

## 重要性の評価

これらの更新により「個人開発→少人数チームへのスケーリング」が初めて現実的になった。skillsのカタログ化と非同期自動化の両立が可能になった転換点。

<!-- 日常で得た知見をここに追記 -->
