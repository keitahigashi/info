---
name: Claude Code 1週間13リリース全深堀り
description: 2026年4月8-15日の13リリース完全分析（Managed Agents・Monitor Tool・Advisor Tool・Routines・Desktop再設計・Cowork Enterprise・Ultraplan）
type: reference
---

## 出典
- URL: https://zenn.dev/yokoi_ai/articles/cc-2026-04-15
- 著者: 横井のAI日和（関西出身、40代の社内SE）
- 公開日: 2026-04-15

## 概要
1週間で13個の主要機能がリリースされた4月8-15日を「画面」「クラウド」「組織」の3軸で分析。各機能の技術詳細・API例・運用チェックリストを網羅。

## 詳細

### リリース一覧（13機能）

| 日付 | 機能 | 種別 | 概要 |
|------|------|------|------|
| 4/8 | Managed Agents | Platform beta | $0.08/session-hour課金 |
| 4/8 | v2.1.96/97 | CLI | Focus view、Cedar構文対応 |
| 4/9 | Cowork Enterprise | GA | RBAC・支出上限・OTel・Zoom MCP |
| 4/9 | Advisor tool | Platform | Opus助言機能（advisor_20260301） |
| 4/9 | v2.1.98 | CLI | Monitor tool（バックグラウンド監視） |
| 4/10 | 設計エッセイ2本 | Docs | Tool設計論・multi-agent coordination |
| 4/10 | Ultraplan | Research preview | クラウドベース計画立案 |
| 4/10 | /autofix-pr | CLI | PR自動修正 |
| 4/10 | /team-onboarding | v2.1.101 | 運用ガイド自動生成 |
| 4/13 | v2.1.105 | CLI | PreCompact hook、plugin monitors |
| 4/14 | Routines | Research preview | クラウド自動実行 |
| 4/14 | Desktop再設計 | UI更新 | マルチセッション・統合ターミナル |

### Monitor Tool（v2.1.98）
- バックグラウンドでプロセス監視、イベントを会話に流す
- ターンを占有しない、pollingループ不要
- 用途: デプロイ後エラー率監視・E2Eテスト監視・ファイル変更検知

### Advisor Tool
- Opus/Sonnetの2層分業。Executor（Sonnet）が通常タスク→詰まったらOpusにescalate
- adviser呼出率30%超ならexecutor選定を見直す指標

### Routines運用チェックリスト
- 失敗非致命的なworkから開始
- branch制限（`claude/` prefix）
- API key厳密管理、Connectors除外設定
- group spend limit設定、SIEM連携確認
- PreCompact hookでcritical時刻のcompact block

### v2.1.108最適化
```bash
export ENABLE_PROMPT_CACHING_1H=1  # cache TTL: 5分→1時間
```

### Multi-agent coordination 5パターン
1. Generator-verifier（生成・検証分業）
2. Orchestrator-subagent（親が委譲、子が実行）
3. Agent teams（同格協働）
4. Message bus（疎結合pub/sub）
5. Shared-state（状態共有同期）

### 3面攻撃（戦略分析）
- **画面面**: Desktop再設計・Focus view・3段階表示モード
- **クラウド面**: Routines・Ultraplan・Monitor・1hキャッシュ
- **組織面**: Cowork Enterprise RBAC・/team-onboarding・OTel SIEM連携
