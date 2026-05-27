---
name: Catch security issues as Claude writes code（公式）- security-guidanceプラグイン完全ガイド
description: Anthropic公式security-guidanceプラグインの仕組み・インストール・カスタマイズ・他ツールとの連携を網羅した公式ドキュメント
type: reference
---

## 出典

Claude Code Docs (公式): https://code.claude.com/docs/en/security-guidance

## 公開日

2026年5月27日（Code w/ Claude London イベントに合わせリリース）

## 概要

`security-guidance` プラグインは Claude Code CLI v2.1.144+ 向けの公式セキュリティプラグイン。Claude がコードを書くたびに **3層の検査**を自動実行し、PRに到達する前に脆弱性を検出・修正する。

## 前提条件

- Claude Code CLI **v2.1.144 以降**
- Python 3.8 以降（PATH 上に `python3` / `python` / `py -3`）
- Git リポジトリ（エンド・オブ・ターンとコミットレビューに必須）

## インストール

```text
/plugin install security-guidance@claude-plugins-official
/reload-plugins
```

クラウドセッション・リポジトリ共有時は `.claude/settings.json` に記述:

```json
{
  "enabledPlugins": {
    "security-guidance@claude-plugins-official": true
  }
}
```

## 3層の検査メカニズム

### 第1層：ファイル編集時（パターンマッチ）
- モデル呼び出し **なし**（コスト0）
- 即時に危険パターンを検知

検出カテゴリ例:
| カテゴリ | パターン |
|---------|---------|
| 動的コード実行 | `eval(`, `new Function`, `os.system`, `child_process.exec` |
| 安全でないデシリアライズ | `pickle` |
| DOM インジェクション | `dangerouslySetInnerHTML`, `.innerHTML =`, `document.write` |
| ワークフローファイル | `.github/workflows/` 以下の編集 |

同一ファイル・同一セッションで同じパターンが繰り返し検出されてもフラッドしない（1回のみ警告）。

### 第2層：ターン終了時（バックグラウンドLLMレビュー）
- `Claude Opus 4.7` がターン内のすべての変更差分をレビュー
- **バックグラウンド実行**（Claude の返答遅延なし）
- 問題発見時は Claude に再プロンプトして同セッション内で修正
- 最大30ファイル、最大3回連続で発火

検出例:
- 認可バイパス
- IDOR（安全でない直接オブジェクト参照）
- インジェクション
- SSRF（サーバーサイドリクエストフォージェリ）
- 弱い暗号化

### 第3層：コミット/プッシュ時（エージェント型深層レビュー）
- `git commit` / `git push` 時に起動
- 関連ファイル（呼び出し元・サニタイザー・関連ファイル）を読み込んで多ファイル脆弱性を検出
- 誤検知を低減（孤立したパターンだけでは危険と断定しない）
- 上限: 1時間あたり20件のレビュー
- Claude 自身が実行した Bash コマンド経由のコミットのみ対象（手動コミットは対象外）

## レビューモデルのカスタマイズ

| 環境変数 | 対象 |
|--------|------|
| `SECURITY_REVIEW_MODEL` | エンド・オブ・ターンレビューのモデル |
| `SG_AGENTIC_MODEL` | コミットレビューのモデル |

## カスタムルールの追加

### モデルレビュー向けガイダンス（Markdown）
`.claude/claude-security-guidance.md` に追記:

```markdown
- INFO レベル以上で `customer_id` や `account_number` をログしない
- `/admin` 以下のルートは DB 読み取り前に `require_role("admin")` を呼ぶ
```

### パターンマッチルール（YAML/JSON）
`.claude/security-patterns.yaml` に追記:

```yaml
patterns:
  - rule_name: internal_api_key
    substrings: ["sk_live_", "AKIA"]
    reminder: "ハードコードされた API キー。シークレットマネージャーから読み込むこと。"
  - rule_name: tenant_unfiltered_query
    regex: "\\.objects\\.all\\(\\)"
    paths: ["**/src/tenants/**"]
    reminder: "マルチテナントコードは org_id でフィルタすること。"
```

## 無効化・アンインストール

| 環境変数 | 効果 |
|---------|------|
| `ENABLE_PATTERN_RULES=0` | パターンチェック無効化 |
| `ENABLE_STOP_REVIEW=0` | ターン終了レビュー無効化 |
| `ENABLE_COMMIT_REVIEW=0` | コミットレビュー無効化 |
| `ENABLE_CODE_SECURITY_REVIEW=0` | モデルレビュー全体無効化 |
| `SECURITY_GUIDANCE_DISABLE=1` | プラグイン全体を一時無効化 |

```text
/plugin disable security-guidance@claude-plugins-official
/plugin uninstall security-guidance@claude-plugins-official
```

## ツール連携（多層防御）

| 段階 | ツール | カバー範囲 |
|------|-------|----------|
| セッション内 | security-guidance プラグイン | Claude が書くコードの一般的脆弱性 |
| オンデマンド | `/security-review` | 現在ブランチへの単発セキュリティパス |
| PR 時 | Code Review（Team/Enterprise） | フルコードベースコンテキストでの多エージェントレビュー |
| CI | 静的解析・依存スキャン | 言語固有ルール・サプライチェーン |

## 効果

Anthropic の社内ロールアウト・ベンチマークで、プラグイン使用時の **PR セキュリティコメントが 30〜40% 減少**。

## ホック構成（技術詳細）

| フック | 目的 |
|--------|------|
| `SessionStart` | Python 環境のブートストラップ |
| `UserPromptSubmit` | ターンレビュー用の作業ツリーベースラインを取得 |
| `PostToolUse` on `Edit/Write/NotebookEdit` | パターンマッチ |
| `Stop` | ターン終了差分レビュー（バックグラウンド） |
| `PostToolUse` on `Bash`（`git commit/push`フィルタ） | コミットレビュー（バックグラウンド） |

## トラブルシューティング

ログ: `~/.claude/security/log.txt`

よくあるスキップ原因:
- Git リポジトリ外（ターン/コミットレビューはスキップ）
- Anthropic 認証なし（モデルレビューはスキップ）
- PyYAML が importable でない → `security-patterns.json` を使用
