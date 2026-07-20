---
name: Claude Code 週次アップデートまとめ（2026/07/11週）
description: v2.1.202〜207の7月第3週アップデートを網羅
type: reference
---

## 出典

Qiita / @saitoko（さいとう こういち）: https://qiita.com/saitoko/items/992631068d62dfef46b0

## 主要ハイライト（v2.1.202〜v2.1.207）

- **Artifacts機能のPro/Max解放（v2.1.202〜207）**
  - 従来はTeam/Enterprise限定だったArtifacts機能がPro・Maxプランでも利用可能に
  - Pro/Maxでは本人のみへの共有に限定

- **/reviewコマンド体系を刷新（v2.1.202）**
  - `/review <pr>` は高速確認コマンドに変更
  - 詳細レビューは新コマンド `/code-review <level> <pr#>` に分離
  - Dynamic workflowの規模を4段階から選択可能に

- **/doctorの機能強化（v2.1.206）**
  - CLAUDE.mdの肥大化を検出し簡素化提案する新チェックを追加
  - `/cd` にディレクトリパス候補表示を搭載
  - `/commit-push-pr` でorigin以外のpushリモート（remote.pushDefault等）も自動許可対象に拡大

- **インフラ・安定性改善（v2.1.203〜205）**
  - ログイン期限切れ警告、バックグラウンドセッション安定化
  - ヘッドレスセッションのSessionStartフック修正
  - セッション文字起こし改ざん防止を強化

- **v2.1.207でBedrock/Vertex/FoundryでautoモードがデフォルトONに、Opus 4.8がデフォルトモデルへ**
