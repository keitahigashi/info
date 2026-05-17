---
name: Claude Code MCPで広告運用を自動監視｜Google・Meta広告の停止検知
description: Meta/Google広告のトークン期限切れや停止をClaude Code MCPサーバーで自動検知・自動更新する実装事例
type: reference
---

## 出典

F2T Blog: https://f2t.jp/blog/claude-code-mcp-ads-monitoring

## 問題の背景

Meta広告のアクセストークンは約**60日で期限切れ**となりデータ取得が停止する。
夜間にサイレントに停止するため、翌朝までCPA悪化・レポート欠損に気付けないケースがある。

## 解決策: Claude Code + MCP による自動監視

### アーキテクチャ

```
launchd（macOS）/ cron（Linux）
    ↓ 毎朝定時起動
Claude Code MCP ヘルスチェックスクリプト
    ↓ 20個のMCPサーバー健全性を確認
Google Ads MCP / Meta Ads MCP / TikTok Ads MCP
    ↓ 異常検知
Slack通知 / 自動トークン更新
```

### 実装内容

- **20個のMCPサーバーの健全性を毎朝確認**
- Metaトークンの自動更新ループ: 残り14日以下で新トークンに自動切り替え
- 月額$20（Claude Pro）で実現可能
- コピペで動くbashスクリプト・launchd設定ファイルを全公開

### launchd設定例（macOS）

```xml
<!-- ~/Library/LaunchAgents/com.f2t.ads-monitor.plist -->
<key>StartCalendarInterval</key>
<dict>
    <key>Hour</key><integer>8</integer>
    <key>Minute</key><integer>0</integer>
</dict>
```

## 費用対効果

| 項目 | コスト |
|------|--------|
| 代理店外注（監視のみ） | 月5〜10万円 |
| Supermetrics等の外部ツール | 月$99〜$499 |
| **本構成（Claude Code MCP）** | **月$20** |

## 適用可能な広告プラットフォーム

- Google Ads（公式MCPサーバーあり）
- Meta Ads（非公式MCPサーバー）
- TikTok Ads（非公式MCPサーバー）

## 初心者向け導入ステップ

1. Claude Code + MCP環境を構築
2. 広告プラットフォームのMCPサーバーを設定
3. 健全性チェックスクリプトを作成
4. launchd/cronでスケジューリング
5. Slack webhook で異常通知を設定
