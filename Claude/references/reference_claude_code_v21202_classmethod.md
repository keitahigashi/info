---
name: Claude Code v2.1.202 の主要アップデート
description: Claude Code v2.1.202のリリース詳細。Dynamic workflow sizeのsmall/medium/large設定、OpenTelemetryへのworkflow属性追加、/reviewコマンドのシングルパス回帰など18変更を解説。
type: reference
---

## 出典

DevelopersIO（Classmethod）著者: 石川覚（Satoru Ishikawa）: https://dev.classmethod.jp/en/articles/20260707-cc-updates-v2-1-202/

## 概要

DevelopersIO（Classmethod）がClaude Code v2.1.202（2026年7月6日リリース）を詳細解説。18変更（新機能4件・バグ修正13件・動作変更1件）を網羅。

## 新機能

### 1. 動的ワークフローサイズ設定
- `/config` に「Dynamic workflow size」設定を追加
- 生成されるエージェント数を `small / medium / large` から選択可能
- タスク規模に合わせてリソース制御が実現

### 2. テレメトリ強化（OpenTelemetry）
- `workflow.run_id` と `workflow.name` 属性を追加
- ワークフロー実行アクティビティの再構築・トレースが可能に

## 改善点
- **MCPエラーメッセージ改善**: `url` はあるが `type` がない設定で明確な修正提案を表示
- **`/workflows`エージェントリスト**: タイトル列拡大・専用時間列追加・モデル名短縮でUI改善

## 主要バグ修正
- セッション再開の遅延とGitワークツリー多数リポジトリのメモリ肥大化
- `claude agents` でのチャット開き時クラッシュループ
- Ctrl+R履歴検索時のクラッシュ
- スキル読み込みの重複
- mTLSハンドシェイクの一時的な失敗
- `/remote-control` セッションの権限表示エラー

## 重要な動作変更

**`/review <pr>` コマンドの仕様変更**
- 単一パスの高速レビューに回帰
- マルチエージェントレビューは `/code-review <level> <pr#>` を使用する必要あり
