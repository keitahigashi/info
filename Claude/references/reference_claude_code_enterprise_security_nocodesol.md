---
name: セキュリティを考慮したClaude Codeの企業運用に正解を出してみる
description: Permissions・Sandbox・Managed Settings・OpenTelemetryの多層防御で企業レベルのClaude Code統制を実現する設定集
type: reference
---

## 出典

ノーコードソリューションズ: https://nocode-sol.co.jp/blog/tech/claude-code-enterprise-security-guide/

## 概要

「AIがコードを読み・ファイルを編集し・コマンドを実行する」Claude Code を安全に企業導入するための包括的ガイド。公開日：2026年5月18日。権限管理・サンドボックス・監査ログの具体的実装方法を提供。

## セキュリティリスク5類型

- プロンプトインジェクション
- 機密情報漏洩
- 権限の暴走（許可範囲外の操作）
- サプライチェーン汚染
- 監査証跡の欠如

## 権限管理の4階層（優先順位高→低）

```
Managed settings（最強・組織強制）
  → コマンドライン引数
    → ローカルプロジェクト設定
      → 共有プロジェクト設定
        → ユーザー設定（最弱）
```

## 必須設定の実装例

```json
{
  "permissions": {
    "disableBypassPermissionsMode": "disable",
    "deny": [
      "Bash(rm -rf /*)",
      "Read(~/.ssh/**)",
      "Read(./.env)"
    ]
  },
  "sandbox": {
    "enabled": true,
    "failIfUnavailable": true
  }
}
```

## Sandboxing（OS隔離）

- **macOS**: Seatbelt 機能によるファイルシステム・ネットワーク隔離
- **Linux/WSL2**: bubblewrap によるプロセス隔離

## OpenTelemetry 監査ログ連携

`CLAUDE_CODE_ENABLE_TELEMETRY=1` 等の環境変数設定で SIEM・Splunk・Datadog へログ集約可能。

## 企業導入5段階チェックリスト

1. 導入前評価（リスクアセスメント）
2. 環境構築（Sandbox・権限設定）
3. ポリシー設計（Managed Settings 作成）
4. 監査・運用（OpenTelemetry 連携）
5. 継続運用（月次レビュー）
