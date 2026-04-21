---
name: claude-code-harness v4 Hokage Go製ハーネスFW
description: Go-native開発ハーネスFW v4.2 — 5 verb skills・25x高速hooks・13ガードレール・3自律エージェント・Node.js不要
type: reference
---

## 出典
- URL: https://github.com/Chachamaru127/claude-code-harness
- 著者: Chachamaru127
- 公開日: 2026-04-（v4.2 Hokage）

## 概要
claude-code-harnessはClaude CodeをPlan→Work→Review→Shipの規律ある開発システムに変えるGo製フレームワーク。v4（Hokageライン）でNode.js依存を排除し、hooks処理を25倍高速化。Claude Code v2.1.105+・Opus 4.7対応。

## 詳細

### アーキテクチャ
```
go/        → Go-native guardrail + hook handler engine
bin/       → コンパイル済みバイナリ (darwin-arm64/amd64, linux-amd64)
skills/    → 5 verb skills + 拡張モジュール
agents/    → 3自律エージェント (worker/reviewer/scaffolder)
hooks/     → Claude Code hook設定
templates/ → プロジェクト生成テンプレート
```

### 5 Verb Skills（ゼロコンフィグ）
1. `/harness-plan` — アイデア→Plans.md（受入基準付き）
2. `/harness-work` — 並列実装（ワーカーごとpreflight自己チェック）
3. `/harness-review` — 4視点コードレビュー（セキュリティ・パフォーマンス・品質・アクセシビリティ）
4. `/harness-release` — CHANGELOG・タグ・GitHub Release自動化
5. `/harness-setup` — プロジェクト初期化・設定ブートストラップ

### v4パフォーマンス比較
| 操作 | v3 (bash+Node.js) | v4 (Go) |
|------|-------------------|---------|
| PreToolUse | 40–60ms | **10ms** |
| SessionStart | 500–800ms | **10–30ms** |
| PostToolUse | 20–30ms | **10ms** |

### 安全ガードレール（R01–R13）
- R01–R02: sudo・シークレットファイル書込みブロック
- R04–R05: プロジェクト外書込み・再帰削除の確認
- R06: force-pushパターン拒否
- R10–R13: 検証バイパス・mainブランチ直接コミット防止
- Sub-10msレスポンス

### Breezing（Agent Teams）
- Phase 0: 計画討論（Planner vs. Critic vs. 人間承認）
- 8+タスク自動バッチ並列実装

### Session Memory（harness-mem連携）
- `.claude/state/memory-bridge-events.jsonl`にイベント記録
- セッション間記憶の取得

### インストール
```bash
/plugin marketplace add Chachamaru127/claude-code-harness
/plugin install claude-code-harness@claude-code-harness-marketplace
/harness-setup
```
