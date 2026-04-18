---
name: AWS MCP Server（Remote）実践メモ
description: Claude CodeからAWS MCP Server（Remote）を接続するセットアップ手順・.mcp.json設定・IAM権限・動作確認
type: reference
---

## 出典
- URL: https://sadayoshi-tada.hatenablog.com/entry/2026/04/11/190322
- 著者: sadayoshi_tada
- 公開日: 2026-04-11

## 概要
AWS MCP Server（Remote）をClaude Codeで使用するためのセットアップ手順と動作確認結果。IAM権限設定、.mcp.json構成、S3やLambdaの自然言語操作を実証。

## 詳細

### AWS MCP Serverとは
AWSが提供するマネージドリモートMCPサービス。AIエージェントとClaude CodeからAWSサービスの操作を可能にする:
- AWS公式ドキュメント参照
- 15,000以上のAWS API呼び出しの生成・実行
- SOP（Standard Operating Procedures）によるステップバイステップガイダンス

### 前提条件
`uv`パッケージマネージャーのインストール:
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

### IAM権限設定
必要なアクション:
- `aws-mcp:InvokeMcp`
- `aws-mcp:CallReadOnlyTool`
- `aws-mcp:CallReadWriteTool`

### 認証設定
環境変数でAWSクレデンシャルを設定:
```bash
export AWS_ACCESS_KEY_ID=XXXX
export AWS_SECRET_ACCESS_KEY=XXXX
export AWS_SESSION_TOKEN=XXXX
```

### .mcp.json設定
プロジェクトルートに配置:
```json
{
  "mcpServers": {
    "aws-mcp": {
      "command": "uvx",
      "args": [
        "mcp-proxy-for-aws@latest",
        "https://aws-mcp.us-east-1.api.aws/mcp",
        "--metadata", "AWS_REGION=ap-northeast-1"
      ]
    }
  }
}
```

### 動作確認結果
- **S3バケット一覧**: 自然言語で「aws-mcp で S3 のリストを出して」→ `aws s3 ls`を実行、71バケット取得
- **Lambda関数確認**: `aws lambda list-functions --region ap-northeast-1`で5関数の詳細状態取得

### 注意事項
- 認証: IAM認証、CloudTrailで監査ログ
- 料金: サービス自体は無料（リソース・転送費用は別途）
- リージョン: US East（N. Virginia）のみ対応
- **重要**: `aws-mcp:CallReadWriteTool`権限付与時はIAMポリシーで厳格に権限制限すること（意図しない変更防止）
