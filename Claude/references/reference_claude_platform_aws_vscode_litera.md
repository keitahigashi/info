---
name: Claude Platform on AWS で VS Code の Claude Code を動かす
description: Qiita（LiteRa）：2026年5月11日GA版Claude Platform on AWSへのIAM認証設定・VS Code環境構築手順と、Amazon Bedrockとの比較を解説（2026年5月12日）
type: reference
---

## 出典

Qiita（@LiteRa）: https://qiita.com/LiteRa/items/7fc0bd30022497f9e01c

## Claude Platform on AWS × VS Code セットアップガイド

### 概要

2026年5月12日公開。2026年5月11日にGA（一般提供）開始となったClaude Platform on AWSを利用して、VS Code + Claude Code環境を構築する手順を解説。IAM認証・CloudTrail監査対応・Bedrockとの違いを含む実践ガイド。

### Claude Platform on AWS vs Amazon Bedrock

| 項目 | Claude Platform on AWS | Amazon Bedrock |
|------|----------------------|----------------|
| 運営者 | Anthropic | AWS |
| データ処理 | Anthropicインフラ | AWS境界内 |
| 新機能リリース速度 | 最新（Anthropic直接） | 遅延あり |
| AWS IAM認証 | ✅ | ✅ |
| CloudTrail監査 | ✅ | ✅ |

### VS Code 設定手順

`settings.json`に以下3つの環境変数を設定：

```json
{
  "claude.workspaceId": "<your-workspace-id>",
  "claude.region": "<aws-region>",
  "claude.authType": "iam"
}
```

### IAM権限設定

```
推奨：AWS マネージドポリシーを使用
- AnthropicFullAccess（または必要な最小権限ポリシー）
- EC2インスタンスロールへの権限付与
- 自前ポリシーよりマネージドポリシーを優先
```

### Outbound Web Identity Federation の有効化

初回のみ設定が必要：

```bash
# sts:GetWebIdentityToken の実行権限が必要
aws sts get-web-identity-token
```

### よくあるエラーと対処法

| エラー | 原因 | 対処 |
|--------|------|------|
| CreateInference権限不足 | IAMポリシー未適用 | AnthropicFullAccess追加 |
| GetWebIdentityToken未設定 | WIF初期設定漏れ | 初期設定を実施 |
| リージョン不一致 | settings.jsonのregion設定ミス | 正しいリージョンを指定 |
| ワークスペースID誤り | コピーミス | Anthropicコンソールで再確認 |

### ポイント

- GA版（2026年5月11日）からAWS IAM認証が正式対応
- CloudTrailによる全API呼び出しの監査ログが取得可能
- Enterprise環境でのセキュリティ・コンプライアンス要件を満たしやすい
- Bedrockと異なりAnthropicの最新機能がすぐに利用可能
