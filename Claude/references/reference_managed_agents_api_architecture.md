---
name: Managed Agents技術分析 — 4概念・API・料金構造
description: Managed Agentsの4コア概念（Agent/Environment/Session/Events）・APIベータヘッダー・SSE・Research Preview機能・制限事項
type: reference
---

## 出典
- URL: https://claudeai.dev/ja/blog/claude-managed-agents-what-just-launched/
- 著者: Claude AI Dev
- 公開日: 2026-04-09

## 概要
2026-04-08パブリックベータ開始のManaged Agentsの技術分析。「brain（Claude+harness）」「hands（sandbox+tools）」「session（永続event log）」の分離構造を持つマネージド実行プラットフォーム。

## 詳細

### 4つのコア概念
- **Agent**: モデル、システムプロンプト、ツール、MCPサーバー、スキルの定義
- **Environment**: 設定済みコンテナテンプレート
- **Session**: 実行中agentインスタンス
- **Events**: 実行中agentとのメッセージ・更新

### 組み込みツール
- bash実行
- ファイル操作（read、write、edit、glob、grep）
- ウェブサーチ・取得
- MCPサーバー接続

### 料金体系
- active session-hour あたり $0.08（通常のtoken価格に追加）
- 「model tokens」と「runtime duration」の二軸コスト
- アイドル時間は課金なし

### API仕様
- Beta header: `managed-agents-2026-04-01` が全エンドポイントで必須
- ストリーミング: SSE（Server-Sent Events）対応
- セッション制御: interruption・steering機能

### Research Preview機能（限定的）
- outcomes
- multiagent
- memory

### 位置づけ
- Claude Code（サブスクリプション課金）: 個人〜小規模チーム向け
- Managed Agents（API従量課金）: 中〜大規模プロダクト統合向け
- 単発の簡単な自動化には過剰な可能性が高い
- 評価とhuman oversightは依然必要
