---
name: 【2026年最新】Claude Code 9つの知られざる機能｜生産性を変革する
description: 公式ドキュメントで見落とされがちな9機能（Focus View・/buddy・Channels・Hooks・Session Branching等）を4層フレームワークで整理
type: reference
---

## 出典

Uravation: https://uravation.com/media/claude-code-9-hidden-features-2026/

## 知られざる9機能の全容

### 即効性が高い3機能

| 機能 | 操作 | 効果 |
|------|------|------|
| Focus View | Ctrl+O | 出力をクリーン表示（可読性3倍）、v2.1.97から正式実装 |
| /buddy | `/buddy enable` | 18種のターミナルペット（duck〜legendary）でモチベーション管理 |
| /btw | `/btw {質問}` | メインコンテキスト維持のまま割り込み質問 |

### 4層分類フレームワーク

| レイヤー | 機能例 | 難易度 |
|--------|-------|--------|
| 基本操作 | Focus View、/btw、/buddy | ★☆☆ |
| 計画・設計 | Ultra Plan、/branch | ★★☆ |
| 自動化・統合 | Channels、Hooks、Chrome連携 | ★★★ |
| スケール | Git Worktrees、/loop | ★★★ |

### 全9機能の詳細

**1. Ultra Plan** - クラウドブラウザUIで設計実行（Simple/Visual/Deep 3モード）

**2. Channels** - 外部イベント（CI失敗・Discord等）をセッションにプッシュ
```json
{
  "channels": {
    "github-ci": {
      "type": "webhook",
      "secret": "${CLAUDE_CHANNEL_SECRET}",
      "events": ["push", "pull_request"]
    }
  }
}
```

**3. Hooks** - 実行ライフサイクルの前後に任意スクリプトを挿入
- `pre_write`：ファイル書き込み前（APIキースキャン等）
- `post_write`：書き込み後（自動フォーマット・テスト実行）
- `pre_bash`：コマンド実行前（危険コマンド防止）

**4. Session Branching（/branch）** - 実験管理用ブランチ機能
```bash
/branch create experiment-1
/branch checkout main
/branch merge experiment-1
```

**5. Chrome統合（MCP経由）** - DOM操作・スクリーンショット・コンソールエラー確認

**6. /loop** - インフラ上で時間指定繰り返しタスク実行
```bash
/loop schedule "npm audit" --cron "0 9 * * 1-5"  # 平日9時
/loop schedule "curl health-check" --every 5m    # 5分ごと
```

**7. Remote Control** - URLベース24時間有効リンクで別デバイスからセッション継続

**8. Git Worktrees + 並列エージェント** - 複数ブランチで複数エージェントが同時実行

**9. /branch + Ultra Plan の組み合わせ** - 設計→複数実装→CI確認→統合の完全自動フロー

## 企業導入時の失敗パターン4選

| ❌ 失敗 | ⭕ 正解 |
|---------|---------|
| 全機能を一度に導入 | 1機能ずつ1週間ごと導入 |
| 全Hooksを`block`に設定 | セキュリティ関連のみblock、テストは`warn` |
| シークレットを直書き | 環境変数参照`"${CLAUDE_CHANNEL_SECRET}"` |
| /loopのcron式ミス | テスト環境で検証、最初は1時間ごと |

## 段階的導入ロードマップ

| フェーズ | 期間 | 機能 | 期待効果 |
|---------|------|------|---------|
| Phase 1 | 1週目 | Focus View、/btw | 出力可読性向上（30%時間削減） |
| Phase 2 | 2-3週 | Hooks、Ultra Plan | セキュリティリスク低減 |
| Phase 3 | 4-6週 | Channels | CI対応時間50%削減 |
| Phase 4 | 2ヶ月 | Git Worktrees | チケット消化スピード2倍 |
