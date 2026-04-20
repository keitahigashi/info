---
name: Claude Code /tui全画面・モバイル通知・Remote Control強化
description: v2.1.110の新機能3つ（/tui fullscreen・モバイルプッシュ通知・Remote Controlコマンド拡張）の詳細と実践ワークフロー
type: reference
---

## 出典
- URL: https://uravation.com/media/claude-code-april-2026-tui-mobile-remote/
- 著者: 佐藤傑（株式会社Uravation CEO）
- 公開日: 2026-04-18

## 概要
Claude Code v2.1.110で追加された3つの新機能（/tui fullscreen、モバイルプッシュ通知、Remote Controlコマンド拡張）を解説。非同期開発パターンの実現に焦点。

## 詳細

### 1. /tui fullscreen — フリッカーフリー全画面レンダリング
- `"/tui fullscreen"` でちらつきのない全画面ターミナル表示
- tmux・iTerm2環境の描画問題を解消
- `/focus` で集中表示ON/OFF切り替え
- 設定: `~/.claude/settings.json` で `"autoScrollEnabled": false`

### 2. モバイルプッシュ通知
- Remote Control有効セッションがClaudeの判断ポイントで自動通知
- セットアップ: Remote Control → Enable → "Push when Claude decides" → On
- モバイルから承認・指示が可能

### 3. Remote Controlコマンド拡張（4コマンド追加）
| コマンド | 機能 |
|---------|------|
| `/autocompact` | 自動コンテキスト圧縮制御 |
| `/context` | 残りトークン確認 |
| `/exit` | セッション安全終了 |
| `/reload-plugins` | プラグイン再読み込み |

### バージョンタイムライン
- v2.1.101-109: Writeツール60%高速化、セキュリティサンドボックス強化
- v2.1.110: /tui fullscreen、モバイル通知、Remote Control拡張

### 実践シナリオ
- テスト監視: テスト実行→離席→スキーマ変更通知→リモート承認→帰着時に完了
- 夜間バッチ: コード生成開始→通勤中に仕様確認通知→Remote Controlで回答→翌朝完了

### 注意事項
- 複数セッション同時の/tui fullscreen → 表示競合（tmux分割で代替）
- プッシュ通知の自動承認 → 本番環境リスク
- `/exit` の誤実行 → 長時間プロセス中断
- MCP設定変更後は `/reload-plugins` 必須
