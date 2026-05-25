---
name: AWS MCP Server がGAに - Claude Codeから検証: IAMガードレール設計
description: AWS MCP Server一般提供開始と、IAMベースのガードレール・CloudTrail監査設計を解説
type: reference
---

## 出典

フューチャー技術ブログ: https://future-architect.github.io/articles/20260525a/

## AWS MCP Server 概要

2026年5月6日にAWSが一般提供（GA）を開始したマネージドMCPエンドポイント。AIコーディングエージェントからAWSサービスへ、IAMベースのガードレール・CloudWatchメトリクス・CloudTrailロギングを伴って安全にアクセスできる。

## 提供ツール（11種類）

### 知識系（6種類）
- ドキュメント検索
- リージョン情報取得
- サービス一覧取得
- など

### API系（5種類）
- AWS CLI実行
- Python実行
- 署名付きURL生成
- など

## IAMガードレール設計の2軸

### 1. 経路別 Deny
`aws:ViaAWSMCPService` コンテキストキーでMCP経由の操作を識別し、破壊的操作（ec2:TerminateInstances等）を選別制限する。

```json
{
  "Effect": "Deny",
  "Condition": {
    "StringEquals": {
      "aws:ViaAWSMCPService": "true"
    }
  },
  "Action": ["ec2:TerminateInstances", "s3:DeleteBucket", ...]
}
```

### 2. 包括キャップ
AssumeRoleで専用ロール（ReadOnlyAccess + Inline Deny）に権限を絞り、エージェント実行コンテキスト全体をキャップ。最小権限の徹底が可能。

## CloudTrail 監査

MCP経由の操作は `userIdentity.invokedBy = aws-mcp.amazonaws.com` で識別可能。

**注意点**: `sourceIPAddress` が固定値になるため、`aws:SourceIp` 制限との併用設計には注意が必要。

## 設計上の推奨事項

- MCP専用IACロールを別途作成し最小権限を付与
- CloudTrailフィルタに `invokedBy = aws-mcp.amazonaws.com` を追加
- Deny-first設計: まず全破壊的操作をDenyしてから必要なものだけAllow

## 公開日

2026年5月25日（著者: 棚井龍之介）
