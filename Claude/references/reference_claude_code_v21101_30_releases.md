---
name: Claude Code v2.1.101 5週間30+リリースまとめ
description: v2.1.69〜v2.1.101の5週間30+リリース完全ガイド（Focus View・/team-onboarding・PermissionDenied Hook・PID名前空間分離）
type: reference
---

## 出典
- URL: https://uravation.com/media/claude-code-v2-1-101-30-releases-5-weeks-guide-2026/
- 著者: 佐藤傑（株式会社Uravation）
- 公開日: 2026-04-13

## 概要
2026年3月上旬〜4月第3週の5週間で v2.1.69→v2.1.101 まで30+リリースされた全注目機能を網羅的にまとめた記事。

## 詳細

### リリースタイムライン
| バージョン | 期間 | 主な変更 |
|---|---|---|
| v2.1.69〜72 | 3月上旬 | /loop、/plan、TaskCreated Hook、/context管理 |
| v2.1.74〜76 | 3月中旬 | Opus 4.6 1M GA、/color、OAuth RFC 9728、MCP 500K |
| v2.1.83〜84 | 3月下旬 | CwdChanged/FileChanged Listener、PowerShellプレビュー |
| v2.1.89〜90 | 4月第1週 | NO_FLICKERレンダリング、/powerupチュートリアル、PermissionDenied Hook |
| v2.1.92〜98 | 4月第2週 | /release-notes、Focus View（v2.1.97）、Vertex AI設定ウィザード、Monitor |
| v2.1.101 | 4月第3週 | /team-onboarding、OS CA証明書信頼、コマンドインジェクション修正 |

### 注目機能
- **Focus View（v2.1.97）**: Ctrl+Oでプロンプト・ツールサマリー・最終回答のみ表示。NO_FLICKERレンダリングと組み合わせ
- **/powerup（v2.1.90）**: 使用履歴分析→未使用の便利機能をインタラクティブに提案
- **/team-onboarding（v2.1.101）**: 使用履歴からチーム新メンバー向けクイックスタートガイド自動生成
- **PermissionDenied Hook（v2.1.90）**: Auto Mode操作拒否時にSlack通知・監査ログ記録可能
- **PID名前空間分離（v2.1.98）**: Linuxサブプロセスのホストシステム参照・操作を防止
- **OS CA証明書信頼（v2.1.101）**: エンタープライズTLSプロキシ対応
- **Monitor（v2.1.98）**: `/monitor` でバックグラウンド処理をリアルタイム監視

### 設定例
```json
{
  "rendering": { "noFlicker": true, "focusViewDefault": true },
  "security": { "trustSystemCAs": true, "credentialScrubbing": true, "pidNamespaceIsolation": true },
  "hooks": {
    "PermissionDenied": [{ "command": "curl -s -X POST $SLACK_WEBHOOK...", "description": "セキュリティ拒否をSlackに通知" }]
  }
}
```
