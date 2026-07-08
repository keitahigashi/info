---
name: Claude Code Analytics API — 公式ドキュメント
description: 組織のClaude Code利用状況を日次集計で取得できるAdmin APIの完全仕様
type: reference
---

## 出典

Anthropic 公式ドキュメント: https://docs.anthropic.com/en/api/claude-code-analytics-api

## Claude Code Analytics API 仕様

### 概要

Admin API を通じて組織全体の Claude Code 利用分析データをプログラムから取得できる。個人アカウントは対象外で、Console の Organization 設定が必要。OpenTelemetry 統合とダッシュボードUIの中間的な位置づけ。

### エンドポイント

```
GET /v1/organizations/usage_report/claude_code
```

**パラメータ**
- `starting_at`（必須）: `YYYY-MM-DD` 形式のUTC日付（単日指定）
- `limit`（任意）: 1〜1000件（デフォルト20）
- `page`（任意）: カーソルベースのページネーション用トークン

### 取得できるメトリクス（1ユーザー・1日単位）

- セッション数・追加/削除コード行数・コミット数・PR数
- ツール別承認/拒否数（Edit / MultiEdit / Write / NotebookEdit）
- モデル別のトークン数（入力/出力/キャッシュ）と推定コスト（USD cents）
- ターミナル種別（vscode / iTerm.app / tmux など）

### レスポンス例（抜粋）

```json
{
  "core_metrics": {
    "num_sessions": 5,
    "lines_of_code": { "added": 1543, "removed": 892 },
    "commits_by_claude_code": 12,
    "pull_requests_by_claude_code": 2
  },
  "tool_actions": {
    "edit_tool": { "accepted": 45, "rejected": 5 }
  }
}
```

### 主なユースケース

- 経営層向けROI報告ダッシュボードの構築
- Copilot / Cursor との比較分析
- チームごとのコスト配賦・採用率モニタリング

### 制約事項

- AWS上のClaude Platform、Bedrock、Vertex AI経由の利用は対象外
- データ遅延は最大1時間。リアルタイム監視には OpenTelemetry 統合が必要
- Claude Enterprise 組織は別途 Analytics API キーを使用する
