---
name: Claude Managed Agents入門 — セルフホストサンドボックスとMCPトンネル活用ガイド
description: 2026年5月19日発表の新機能をPythonコード例付きで解説。規制業界（金融・医療・製造）でのエンタープライズ導入ガイド
type: reference
---

## 出典

Qiita (@kai_kou): https://qiita.com/kai_kou/items/16b4aa9fe3f235d66205

## 公開日

2026年05月20日

## Claude Managed Agents入門 — セルフホストサンドボックスとMCPトンネル活用ガイド

### TL;DR

- セルフホストサンドボックス：オーケストレーションはクラウド、ツール実行は企業インフラ
- MCPトンネル：内部MCPサーバーへのアウトバウンド暗号化接続のみ
- 対応プロバイダー：Cloudflare / Daytona / Modal / Vercel
- 必須ヘッダー：`anthropic-beta: managed-agents-2026-04-01`
- セッション料金：$0.08/session-hour（実行状態のみ課金）

### アーキテクチャ

| レイヤー | 実行場所 | 内容 |
|---------|--------|------|
| オーケストレーション | Anthropicクラウド | コンテキスト・エラーリカバリー・ループ制御 |
| ツール実行 | 企業インフラ | ファイル操作・コマンド実行・内部API |

### セルフホストサンドボックスのPython実装例

```python
import anthropic

client = anthropic.Anthropic()

# Step 1: Agentを作成
agent = client.beta.agents.create(
    name="enterprise-agent",
    model="claude-opus-4-7",
    tools=[{"type": "agent_toolset_20260401"}],
)

# Step 2: セルフホスト用Environmentを作成
environment = client.beta.environments.create(
    name="self-hosted-env",
    config={
        "type": "self_hosted",
        "provider": "cloudflare",  # cloudflare/daytona/modal/vercel
    },
)

# Step 3: SessionをAgent+Environmentで開始
session = client.beta.sessions.create(
    agent=agent.id,
    environment_id=environment.id,
)
```

### MCP Tunnels経由でのMessages API呼び出し

```python
response = client.beta.messages.create(
    model="claude-opus-4-7",
    max_tokens=1024,
    mcp_servers=[
        {
            "type": "url",
            "url": "https://your-subdomain.tunnel-domain/mcp",
            "name": "internal-db-mcp",
        }
    ],
    messages=[{"role": "user", "content": "社内データベースの最新レポートを取得"}],
    extra_headers={"anthropic-beta": "managed-agents-2026-04-01"}
)
```

### セッション課金

| 課金要素 | 単価 |
|---------|------|
| トークン使用量 | 通常のAPI単価 |
| セッション実行時間 | $0.08/session-hour（running状態のみ） |

### 規制業界別ユースケース

| 業界 | 対応基準 | 活用例 |
|-----|---------|------|
| 金融 | FISC安全管理基準・SOX | 取引データ分析を社内環境で実行 |
| ヘルスケア | HIPAA | PHI（患者データ）のクラウド転送禁止 |
| 製造業 | OTセキュリティポリシー | ERP・MES・PLCへのエージェント接続 |

### 現時点での制限事項

- AWS上のClaude Platform未対応
- Memoryフィーチャーとの組み合わせ未サポート

### Managed Agents機能一覧（2026年5月時点）

| 機能 | ステータス |
|-----|----------|
| Self-hosted sandboxes | Beta |
| MCP tunnels | Research Preview |
| Dreaming | Research Preview |
| Outcomes | Public Beta |
| Multiagent Orchestration | Public Beta |

<!-- 日常で得た知見をここに追記 -->
