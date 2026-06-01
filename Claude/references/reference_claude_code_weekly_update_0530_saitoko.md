---
name: Claude Code 週次アップデートまとめ（2026/05/30週）
description: saitoko氏による2026年5月30日週のClaude Codeアップデート週次まとめ。Opus 4.8・/goalコマンド・Computer Use CLI・6月利用形態変更を網羅
type: reference
---

## 出典

Qiita (@saitoko): https://qiita.com/saitoko/items/bbafd1692c1cd825718a

## 主要アップデート一覧

### Opus 4.8 リリース（2026-05-28）

- 長期エージェント型コーディングの復帰性能が向上
- `effort` パラメータのデフォルト値が全サーフェスで `high` に統一
- プロンプトキャッシュ最小長が 1,024 トークンに短縮

### /goal コマンド + Agent View（v2.1.139、2026-05-18）

- **Agent View**: 複数セッションをCLIダッシュボードで一覧管理
- **/goal**: 完了条件を設定して「複数ターンを自律実行」できるコマンド

### Computer Use CLI（v2.1.85+、2026-05-22）

macOS の GUI を CLI から直接操作可能（Pro/Max プランの Research Preview）

### その他の重要な変更

| 変更 | 内容 |
|------|------|
| 6月15日施行 | エージェント利用の月次別枠クレジット化 |
| `/usage` 強化 | 内訳表示が詳細化 |
| `/skills` 強化 | リアルタイムフィルタリング機能追加 |

## 活用ポイント

/goal コマンドで完了条件を1行書いて放置する新しい開発スタイルが実現。Agent View と組み合わせることで複数の長時間タスクをCLIから統合管理できる。
