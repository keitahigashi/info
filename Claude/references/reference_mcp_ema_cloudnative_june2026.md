---
name: MCPの認証をIdP経由にして「個別OAuth野良化」を止める｜Enterprise-Managed Authorization（EMA）解説2026
description: EMA（Enterprise-Managed Authorization）による MCP サーバーへのアクセス認可を組織のIdP経由で一元統制する方法と実務的考慮点
type: reference
---

## 出典

CloudNative BLOGs: https://blog.cloudnative.co.jp/articles/mcp-enterprise-managed-authorization-xaa-id-jag-2026/

## EMAとは

2026年6月18日に安定版がリリースされた「Enterprise-Managed Authorization（EMA）」は、MCPサーバーへのアクセスをIdP（ID プロバイダ）で一元管理するための仕様。従来の個別OAuth承認（ユーザーが毎回承認する「プロンプト疲れ」）を排除し、組織が一括でアクセス制御できるようにする。

## 技術基盤

- **ID-JAG（Identity-Augmented JWTs for Agent Authorization）**: IETFのOAuthワーキンググループで標準化中のベンダー中立仕様
- 短命トークン（数分で失効）によるセキュリティ強化
- 現時点でClaude向け対応IdPはOktaのみ。OpenAI/ChatGPTは未対応

## ビジネス・情シス上の効果

| 効果 | 内容 |
|------|------|
| アクセス可視化と即時失効 | 誰がどのMCPツールを使っているか把握・取り消しが容易 |
| 監査証跡の一元集約 | IdPにすべてのアクセスログが集まる |
| 同意画面フィッシング耐性 | ユーザーへの個別OAuth承認画面が出なくなる |
| 個人アカウント混入の構造的防止 | 組織管理外のアカウントでのMCPアクセスを排除 |

## 残る課題・注意点

- **IdP侵害時の影響拡大**: アクセス統制が一点集中するため、IdP自体が侵害されると被害が広範囲に
- **プロンプトインジェクションなど実行時リスク**: EMAは認可層のみをカバー。エージェントが取得した実行内容の安全性は別途対策が必要
- **Claude Codeの特権昇格リスク**: ローカル実行環境では別途サンドボックス対策が必要
- **シャドーMCPの検知**: 組織管理外でセットアップされたMCPサーバーの把握が必要

## 実装フロー概要

1. Oktaで「MCPアプリ統合」を設定
2. Claudeの組織管理画面でEMAを有効化
3. ユーザーはOktaでサインインするだけでMCPサーバーへのアクセスが許可される（個別OAuth承認不要）

<!-- 日常で得た知見をここに追記 -->
