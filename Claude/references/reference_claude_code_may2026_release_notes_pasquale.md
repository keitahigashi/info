---
name: Claude Code May 2026 Release Notes: From the /radio Tweet to the Plugin Marketplace, Everything That Changed
description: 2026年5月のClaude Codeアップデート全網羅：/radioコマンド・Plugin Marketplace・Opus 4.7（1Mコンテキスト）・ネイティブGit Worktree・/loop・/ultrareviewなど主要機能を解説した英語記事
type: reference
---

## 出典

pasqualepillitteri.it: https://pasqualepillitteri.it/en/news/2223/claude-code-may-2026-release-notes-radio-plugin-marketplace

## 公開日

2026年5月9日

## Claude Code May 2026 主要アップデート

### /radio コマンド（Claude FM）

Anthropic公式の組み込みコマンド。ブラウザでlo-fi音楽ストリームを開く機能。

```bash
/radio  # デフォルトブラウザで開く
ssh dev@server "claude /radio"  # URLを出力
mpv https://radio.claude.com/lofi/stream.m3u8  # リモート再生
```

- 直接API接続またはPro/Maxプラン以上のみ対応
- Bedrock/Vertex AI非対応

### プラグインマーケットプレイス（v2.1.108〜）

- `--plugin-url`フラグでサードパーティソース対応
- `.zip`ダウンロード機能
- スラッシュコマンド・フック・サブエージェント登録可

セキュリティ設定:
- `blockedMarketplaces`で未認可マーケットプレイス排除
- エンタープライズレベルの署名検証推奨

### Claude Opus 4.7

| 項目 | スペック |
|------|---------|
| コンテキストウィンドウ | 200k → **1Mトークン** |
| 努力レベル | auto / low / medium / high / xhigh |
| キャッシング | 1時間TTL / 強制5分キャッシング |

キャッシング設定で3〜4倍のコスト削減を実現。

### ネイティブGit Worktrees

```
worktree.baseRef = "fresh"  # メインブランチから開始
worktree.baseRef = "head"   # 現在のコミットから開始
```

- マルチセッション並列作業対応
- PRマージ時に自動削除
- CLAUDE.mdファイル自動生成

### 新スラッシュコマンド

**`/loop`**
```
/loop 5m /command  # 5分間隔
/loop /command     # 自動ペーシング
```
デプロイ監視・PR確認・ログ監視などに活用。

**`/ultrareview`**
```
/ultrareview 12345  # PR番号指定
```
クラウドベースのマルチエージェント型コード審査。

**`/caveman`**
出力トークン削減スキル（約75%削減）。lite / full / ultra の3段階。

**`/focus`、`/recap`、`/release-notes`**
- `/focus`: UIノイズ削減
- `/recap`: セッション要約
- `/release-notes`: 変更ログ表示

### MCP セキュリティ強化

- OAuth更新トークンの競合状態修正
- `/mcp`コマンドで健全性確認可能
- Bash承認ルール厳格化（`-exec`/`-delete`の自動承認廃止、システムパスへの`rm`警告）

アクセスティア:
- read: ブラウザ（表示のみ）
- click: ターミナル/IDE（クリック可）
- full: すべての操作

## 採用チェックリスト

- Claude Code v2.1.137以降へアップデート
- `/loop`と`/ultrareview`を非本番環境でテスト
- `blockedMarketplaces`をエンタープライズレベルで設定
- `worktree.baseRef = fresh`でトランク開発対応
- プラグインマーケットプレイス利用時はコード監査を実施
