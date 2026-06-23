---
name: Claude Code で「HQ AIカンパニー」を1人で動かす全体像
description: macOS launchd + Claude Code + n8n + Telegramで構築する6部署無人AI組織の実装パターン
type: reference
---

## 出典

Qiita（YushiYamamoto）: https://qiita.com/YushiYamamoto/items/f1a9327bddeea1d954ab

## HQ AIカンパニー：Claude Code自律組織の全体像

### 概要

公開日：2026年6月23日。著者（山本勇志 / ITPRODX.com代表）が実際に構築・運用する「1人で動かす無人AI組織」の全体設計を公開。macOS launchd + Claude Code + n8n + Telegramを組み合わせ、6部署を自動分業させる構成。

### システム構成

```
macOS launchd
  └→ Claude Code（各部署エージェント）
       ├─ n8n（ワークフローオーケストレーション）
       └─ Telegram（人間承認ゲート）
```

### 6部署の分業設計

| 部署 | 担当業務 |
|------|---------|
| 営業・集客 | リサーチ・提案資料生成・SNS発信 |
| SaaS事業 | 機能開発・バグ修正・リリース管理 |
| 経理（法人） | 請求書・経費・税務書類の自動整理 |
| 経理（個人） | 個人収支・確定申告準備 |
| 開発 | コード生成・PR作成・テスト実行 |
| 管理 | スケジューリング・ログ管理 |

### 安全性設計（ヒューマンインザループ）

- **外向き行動**（送信・公開・デプロイ）→ Telegramで人間承認を必須化
- **内部作業**（生成・分析・整理）→ 完全自動実行
- 「内部で何かを作る」は自動、「外に何かを出す」は人間確認の原則

### 自動発信パイプライン

- 5チャンネル（Qiita/Zenn/note/X/LinkedIn）に日次コンテンツを自動配信
- Claude Codeがコンテンツ生成→n8nで媒体別フォーマット変換→Telegram承認→自動投稿

### 実装で遭遇した4パターンの失敗と対応

1. **CronCreateの永続性問題**：launchdを直接管理する設計に変更
2. **Telegram webhook競合**：ポーリング方式への切り替えで解消
3. **Claude Codeセッション断絶**：タスク完了ファイルでハンドオフ
4. **n8n変数スコープ問題**：グローバル変数からファイルベースの状態管理に移行
