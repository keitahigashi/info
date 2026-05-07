---
name: Claude CodeがAPIキー不要に：開発者のセキュリティ負荷を下げる新認証を導入
description: AnthropicがClaude APIにWIF（Workload Identity Federation）を統合し、静的APIキー不要のCI/CDパイプライン認証が可能になった解説記事
type: reference
---

## 出典

XenoSpectrum: https://xenospectrum.com/claude-api-workload-identity-federation/

## 概要

2026年5月4日、AnthropicがClaude APIにWIF（Workload Identity Federation）を統合。`sk-ant-`で始まる静的APIキーをCI/CDや本番環境に保存する必要がなくなった。AWS IAM・Google Cloud・Azure・GitHub Actions・Kubernetes・Oktaなどのアイデンティティプロバイダーに対応。

## WIF認証フロー（3ステップ）

1. **IdP JWT発行**: GitHub Actions等のOIDCエンドポイントがワークロード認証用JWTを発行
2. **トークン交換**: SDKが`POST /v1/oauth/token`でAnthropicアクセストークンに交換
3. **トークン管理**: SDK内部で有効期限3600秒のトークンを自動リフレッシュ

## 設定3要素

| 要素 | プレフィックス | 役割 |
|------|------------|------|
| サービスアカウント | `svac_...` | APIアクセス主体 |
| フェデレーション発行者 | `fdis_...` | IdPのOIDCエンドポイント |
| フェデレーションルール | `fdrl_...` | JWTクレームとサービスアカウントのマッピング |

## APIキーからWIFへの移行（4ステップ）

1. WIF設定を並行構成（既存キーは維持）
2. 認証機能をテスト環境で検証
3. `ANTHROPIC_API_KEY`環境変数を削除
4. 旧APIキーを失効させる

## セキュリティ上のメリット

- 静的シークレットの漏洩リスクをゼロに
- 短命トークン（3600秒）による被害範囲の限定
- IdP側の監査ログで認証履歴を完全追跡
- 既存のIAMロール・OIDC設定を再利用可能
