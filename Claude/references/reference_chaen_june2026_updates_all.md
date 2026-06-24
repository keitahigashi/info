---
name: 【完全保存版】Claude Code 2026年6月アップデート全まとめ｜アーティファクト・Claude Design・法人対応の詳細をわかりやすく
description: 2026年6月のClaude Codeアップデートを網羅的にまとめた保存版。Artifacts・Claude Design刷新・法人向け機能・Fable 5統合の全容
type: reference
---

## 出典

note（チャエン | 重要AIニュースを毎日発信）: https://note.com/chaen_channel/n/n16d021ca1da7

## 2026年6月アップデート全まとめ

### 著者の総評

「Claude Codeが単なるコーディングツールから、『チームの仕事そのものを動かすプラットフォーム』へ進化した」と指摘。

### 主要アップデート一覧

| 日付 | 内容 |
|------|------|
| 6/8〜12 | 開発者向け新機能ラッシュ（/cd、サブエージェント入れ子、--safe-mode、fallbackModel追加） |
| 6/9 | Claude Fable 5がClaude Code内で選択可能に（Mythos 5同時公開） |
| 6/12〜13 | 米国輸出管理指令によりFable 5 / Mythos 5への全世界アクセス停止 |
| 6/15 | 課金体系変更：「対話」と「自動化」が別枠に分離 |
| 6/17 | Claude Designの大型更新（/design-syncコマンド追加、Claude Code双方向連携） |
| 6/17 | Workload Identity Federation（WIF）GA |
| 6/18 | **Artifacts in Claude Code** ベータ提供開始 |

### Artifacts in Claude Code（重点解説）

- Claude Codeのセッション成果物を「ライブで開ける共有Webページ」に変換
- URLは自動更新型で、同じURLにアクセスするたびに最新状態を表示
- チームへの共有・デモが大幅に簡略化

### 週次新機能（6/8〜12）の詳細

- **`/cd` コマンド** - ディレクトリ変更のショートカット
- **サブエージェント入れ子** - エージェントがさらにサブエージェントを呼び出す多段構成が可能
- **`--safe-mode`** - 破壊的操作を防止するセーフモード
- **`fallbackModel`** - Fable 5停止時などに自動フォールバックするモデル指定

### 課金変更（6/15施行）のポイント

- ProプランでもAgentやRoutinesの「自動化」利用は別クレジット枠に
- 対話（チャット）使用枠と自動化使用枠の明確分離が目的
- 詳細確認には「設定 > 使用状況」での内訳確認を推奨
