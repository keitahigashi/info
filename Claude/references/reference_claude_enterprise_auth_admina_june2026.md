---
name: Claude Enterprise認証管理 完全ガイド｜Enterprise-Managed AuthorizationによるMCPガバナンス
description: Admina（マネーフォワード）によるClaude Enterprise向けEMA解説。情シス視点でのMCPガバナンス実践ガイド
type: reference
---

## 出典

Admina by Money Forward: https://admina.moneyforward.com/jp/blog/claude-enterprise-auth-management

## MCPガバナンスの課題背景

AIエージェントが社内データベース・APIと接続する「MCP（Model Context Protocol）」の普及に伴い、以下の課題が顕在化：
- 従業員が個人判断でMCPサーバーを設定（シャドーMCP）
- 誰がどの外部ツールに接続しているか把握困難
- 退職者のアクセストークンが残存するリスク

## EMAの革新性

2026年6月18日正式リリースの「Enterprise-Managed Authorization（EMA）」により：
- **ゼロタッチOAuth**: ユーザーが繰り返しOAuth承認する手間を排除
- **数分で失効するトークン**: 堅牢なセキュリティを実現
- **情シスによる一元管理**: 全MCPアクセスをIdP（現在はOktaのみ対応）で制御

## 情シスの実装課題

1. **Okta以外のIdP対応状況の確認**: Microsoft Entra IDなど他IdPの対応は今後
2. **シャドーMCPの検知**: 既存のローカル・個人設定MCPサーバーの洗い出し
3. **Claude Codeの特権昇格リスク対策**: ローカル実行環境の制御は別途必要

## 導入効果の実例

- Workato社では EMA 導入後にClaude利用量が700%以上増加（ガバナンスが整備されたことで活用が加速）
- アクセス可視化により、コンプライアンス担当への説明が容易に

## ビジネスへの示唆

適切なガバナンス整備がAI活用の成果を左右する。「使わせない」のではなく「安全に使わせる」仕組みが競争優位につながる。

<!-- 日常で得た知見をここに追記 -->
