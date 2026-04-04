---
name: Claude Code v2.1.74〜v2.1.84アップデートまとめ
description: 2026年3月のClaude Code連続アップデート（Remote Control・MCP Elicitation・Computer Use・Hooks拡充・ワークツリー強化・パフォーマンス改善）
type: reference
---

## 出典
https://qiita.com/kotaro_ai_lab/items/aa2fe480b062720d3b60
著者: kotaro_ai_lab（株式会社Good Lab）、公開日: 2026-03-26

## 概要
Claude Code v2.1.74〜v2.1.84（2026年3月12日〜27日）の連続アップデートを網羅的にまとめた記事。Remote Control、Computer Use、MCP Elicitationの3大リサーチプレビュー機能に加え、Hooks拡充、ワークツリー強化、パフォーマンス改善を詳述。

## 詳細

### 主要新機能（リサーチプレビュー）
- **Remote Control**: `/remote-control`でセッションをブリッジ化。claude.ai/codeやiOSアプリから遠隔操作。WebSocket再接続でスリープ復帰後も数秒で復帰。Permission Relayでスマホからツール承認可能
- **Computer Use**: Pro/Maxプラン向けmacOSデスクトップ操作。ファイル操作・ポイント&クリック・スクリーンショットを自律実行
- **MCP Elicitation (v2.1.76)**: MCPサーバーがタスク実行中にユーザーへ構造化入力を要求。JSON Schemaで入力フォーム定義。用途: コミットメッセージ入力、実装戦略選択、認証情報入力、破壊的操作確認

### Hooks拡充（v2.1.74〜v2.1.84）
新規イベント: PostCompact, TaskCreated, StopFailure, CwdChanged, FileChanged, Elicitation/ElicitationResult
HTTP フック対応 (v2.1.84): WorktreeCreateで`type: "http"`対応

### ワークツリー強化
- sparse-checkout対応 (v2.1.76): `sparsePaths`で必要ディレクトリのみチェックアウト
- セッション復帰: `--resume`でワークツリーセッション自動復帰 (v2.1.81)

### パフォーマンス改善
- 起動速度: macOS並列キーチェーン読み取り約60ms高速化、setup()並列化約30ms高速化
- メモリ: 起動時約80MB削減（25万ファイルリポ）、`--resume`で最大45%高速化・100〜150MB削減
- 未認証HTTP/SSE MCP: 約600ms高速化

### その他
- **Transcript Search (v2.1.83)**: Ctrl+O→/キーで会話ログ検索
- **--bareフラグ (v2.1.81)**: フック・LSP・プラグイン同期スキップ
- **Opus 4.6**: 1Mコンテキストデフォルト化（Max/Team/Enterprise）
- **最大出力トークン**: デフォルト64k、上限128k
- **セキュリティ**: サンドボックス無断無効化防止、`sandbox.failIfAvailable`設定、子プロセス認証情報除去
- **トークン表示**: 1M以上は「1.5m」表示に変更
