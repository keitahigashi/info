---
name: Claude Codeと暮らす日常ワークフロー
description: 記憶喪失のペアプロ相手を文脈共有パートナーに変える母艦ワークスペース設計・記憶基盤・1日の運用パターン
type: reference
---

## 出典
- URL: https://dev.classmethod.jp/articles/claude-code-daily-workflow/
- 著者: 森茂洋（クラスメソッド 製造ビジネステクノロジー部）
- 公開日: 2026-01-30

## 概要
Claude Codeを「記憶喪失のペアプロ相手」から「文脈を共有した開発パートナー」に進化させる仕組みを紹介。母艦ワークスペース・記憶基盤・カスタムコマンド・モバイル連携による1日の運用パターン。

## 詳細

### 母艦ワークスペース構造
個別プロジェクトではなくナレッジ管理用の統一ワークスペースを中心に運用:
- `knowledge/`（日報・会議メモ・リサーチ）
- `blog/`（技術記事執筆）
- `scratchpad/`（壁打ちメモ）
- `.claude/`（カスタムコマンド・フック・エージェント定義）
- `second-brain-server/`（記憶永続化基盤）

### 記憶基盤（二刀流検索）
1. **Graphiti + FalkorDB**: 因果関係をたどる検索（設計判断の理由付け）
2. **PostgreSQL + pgvector**: セマンティック検索（「前に見た似たバグ」）
- 両者ともOllama（ローカルLLM）で処理、外部API非依存
- Docker Composeで運用可能

### 1日の実行パターン
| 時間帯 | コマンド | 機能 |
|--------|---------|------|
| 朝 | `/morning` | 予定とタスク整理（Google Calendar連携） |
| 午前 | `/context-load project-a` | プロジェクト固有コンテキスト読み込み |
| 午後 | `/clip-news` / `/research` | Perplexity経由ニュース要約・深掘り |
| 夕方 | `/context-load blog` | ブログ執筆コンテキスト |
| 終業 | `/daily-log` | 振り返り（完了状況、Good/改善点） |

### 自動化フック
- **SessionEnd**: 自動サマリー生成→ナレッジグラフ登録
- **post-commit**: gitコミット時にMarkdown自動登録
- **group_id機能**: プロジェクト別・エリア別に記憶分離しつつ横断検索可能

### モバイル連携
Happy CLI（E2E暗号化）経由でiPhoneから接続。`/quick-note`でアイデア保存→翌朝の`/morning`に反映。
