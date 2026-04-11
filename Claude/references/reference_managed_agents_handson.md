---
name: Managed Agents ハンズオン実装
description: Claude Managed AgentsのAPI実装・YAML設定・GitHub MCP連携・料金体系の実践ガイド
type: reference
---

## 出典
- URL: https://azukiazusa.dev/blog/claude-managed-agents/
- 著者: azukiazusa1
- 公開日: 2026-04-09

## 概要
Claude Managed Agentsを実際に試し、エージェント定義・環境構築・セッション管理・GitHub MCP連携までを解説したハンズオン記事。

## 詳細

### 4つのコア概念
1. **Agent**: モデル・システムプロンプト・ツール・MCPサーバーの設定
2. **Environment**: クラウドコンテナ環境でのパッケージとネットワークアクセス設定
3. **Session**: エージェントと環境を組み合わせてタスクを実行するインスタンス
4. **Events**: セッション内のやり取りを記録する単位

### エージェント定義（YAML）
```yaml
name: Coding assistant
model: claude-sonnet-4-6
mcp_servers:
  - name: github
    type: url
    url: https://api.githubcopilot.com/mcp/
tools:
  - type: agent_toolset_20260401
  - type: mcp_toolset
    mcp_server_name: github
```

### APIエンドポイント
- `/v1/agents`: エージェント作成
- `/v1/sessions`: セッション開始
- `/v1/sessions/:session_id/events`: メッセージ送信
- `/v1/sessions/:session_id/stream`: イベント受信（SSE）

### ネットワーク設定
- **unrestricted**: ブロックリスト除外で全体アクセス許可
- **limited**: 指定ホストのみアクセス許可

### GitHub連携
- Fine-grained token必要（Contents・Pull requests・Repository metadata権限）
- Vault経由での認証情報管理

### 料金
- セッションrunning時間に対し**$0.08/時**（ミリ秒単位課金）
- アイドル時は無課金

### ユースケース
長時間かかる作業、非同期に進めたい作業、複数の外部ツールをまたぐタスクに最適。
