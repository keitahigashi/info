---
name: マネーフォワード クラウド × MCP連携【2026年版】Claude Codeでの実装パターンと権限設計
description: マネーフォワードクラウド会計の公式MCPサーバー対応を踏まえた実装パターン解説。Python製MCPサーバーコード例・Claude Desktop設定・実務シナリオ・セキュリティ境界線を網羅。
type: reference
---

## 出典

Aurant Technologies: https://aurant-technologies.com/blog/mcp-integration-cloud-15443/

## MF クラウド × MCP連携 — 実装ガイド

**公開日：** 2026年6月26日

### 重要な背景変化

2026年3月26日、マネーフォワード クラウド会計が「リモートMCPサーバー（β版）を全プランで提供開始」。
公式リモートMCPでは仕訳の参照・登録、試算表参照などの基盤機能から提供される。

### 連携パターン比較

| パターン | 特性 |
|---------|------|
| iPaaS | ノーコード・GUI操作、定型フロー向き |
| カスタムAPI開発 | 高自由度・高コスト |
| AIエージェント（MCP） | 自然言語・柔軟・リアルタイム |

### Python製MCPサーバー最小実装例

```python
# mf_mcp_server.py
from mcp.server import Server
from mcp.types import Tool, TextContent
import requests
import os

app = Server("mf-mcp-server")
MF_API_BASE = "https://invoice.moneyforward.com/api/v3"
MF_TOKEN = os.environ["MF_API_TOKEN"]

@app.list_tools()
async def list_tools() -> list[Tool]:
    return [
        Tool(
            name="get_office_balance",
            description="指定した事業所の月次残高を取得",
            inputSchema={
                "type": "object",
                "properties": {
                    "office_id": {"type": "string"},
                    "year_month": {"type": "string"}
                },
                "required": ["office_id", "year_month"]
            }
        ),
        Tool(
            name="search_journals",
            description="仕訳を条件で検索",
            inputSchema={
                "type": "object",
                "properties": {
                    "office_id": {"type": "string"},
                    "from_date": {"type": "string"},
                    "to_date": {"type": "string"},
                    "partner_name": {"type": "string"}
                },
                "required": ["office_id", "from_date", "to_date"]
            }
        ),
    ]

@app.call_tool()
async def call_tool(name: str, args: dict) -> list[TextContent]:
    headers = {"Authorization": f"Bearer {MF_TOKEN}"}
    if name == "get_office_balance":
        url = f"{MF_API_BASE}/offices/{args['office_id']}/monthly_balances"
        params = {"year_month": args["year_month"]}
        r = requests.get(url, headers=headers, params=params)
        return [TextContent(type="text", text=r.text)]
```

### Claude Desktop設定例

```json
{
  "mcpServers": {
    "moneyforward": {
      "command": "python",
      "args": ["/path/to/mf_mcp_server.py"],
      "env": {
        "MF_API_TOKEN": "your_oauth_token_here"
      }
    }
  }
}
```

### 実務シナリオ別パターン

- **月次異常検知**：前月比50%以上変動の勘定科目を自動検出
- **請求遅延予兆**：未入金取引先の自動判定
- **仕訳自動分類**：銀行明細から勘定科目を推定
- **経営資料自動生成**：四半期決算サマリー作成

### セキュリティ上の境界線

| AI任せでよい業務 | 必ず人間判断 |
|----------------|------------|
| 過去データ集計 | 仕訳最終承認 |
| 仕訳下書き生成 | 銀行振込実行 |
| 異常抽出 | 税務処理判断 |

### API仕様と制約

- レート制限への対処が必要
- 仕訳重複防止のため「外部連携ID」設計が重要
- 読み取り専用スコープの活用でセキュリティを確保
- 電子帳簿保存法適合性の確認が必要
