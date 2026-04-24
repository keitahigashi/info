---
name: 2026年4月版 Claude Code 環境変数チートシート ─ 劣化対策からOpus 4.7対応まで
description: Opus 4.7対応の環境変数早見表・シナリオ別プロファイル4種・チーム運用のsettings.json分離パターン
type: reference
---

## 出典

Qiita (@nogataka): https://qiita.com/nogataka/items/ea55baab00affc548c10

## Claude Code 環境変数チートシート 2026年4月版

### 記事概要

公開日: 2026年4月17日
著者: @nogataka（多数の実践記事の著者）

### 主要環境変数一覧

| 環境変数 | 説明 | 備考 |
|----------|------|------|
| `CLAUDE_CODE_EFFORT_LEVEL` | 思考強度（low/medium/high/xhigh） | Opus 4.7専用（4.6ではhighにフォールバック） |
| `CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING` | Adaptive Thinking無効化フラグ | Opus 4.7では無効（設定不可） |
| `ANTHROPIC_MODEL` | 使用モデルの明示指定 | `claude-opus-4-7` 等 |
| `CLAUDE_CODE_MAX_TOKENS` | 最大トークン数上書き | 長時間エージェント用 |
| `CLAUDE_CODE_SKIP_PERMISSIONS` | 許可プロンプトスキップ | CI/CD環境で有用 |

### シナリオ別推奨プロファイル

```bash
# ①コスト重視（日常チャット・簡単なコード補完）
CLAUDE_CODE_EFFORT_LEVEL=medium
ANTHROPIC_MODEL=claude-sonnet-4-6

# ②品質重視（複雑なアーキテクチャ設計・大規模リファクタリング）
CLAUDE_CODE_EFFORT_LEVEL=xhigh
ANTHROPIC_MODEL=claude-opus-4-7

# ③長時間エージェント（バッチ処理・overnight タスク）
CLAUDE_CODE_EFFORT_LEVEL=high
CLAUDE_CODE_MAX_TOKENS=100000

# ④開発サーバー監視（低頻度チェック）
CLAUDE_CODE_EFFORT_LEVEL=low
ANTHROPIC_MODEL=claude-haiku-4-5
```

### チーム運用: settings.json の役割分担

```
.claude/settings.json       ← チーム共有（effort レベル・プロジェクト設定）
.claude/settings.local.json ← 個人設定（APIキー・ローカルパス）
```

- APIキーは必ず個人管理（settings.local.json）
- effort レベルはチーム標準として settings.json に固定
- Gitignore で settings.local.json を除外

### よくあるハマりどころ

1. `xhigh` は Opus 4.7 専用→ 4.6 では `high` にフォールバック（静かに）
2. Routines 起動時は環境変数が届かない（Routines側で別途設定が必要）
3. `DISABLE_ADAPTIVE_THINKING` は Opus 4.7 では無効
4. CI/CD での `CLAUDE_CODE_SKIP_PERMISSIONS` 設定漏れで対話待ちになる
5. `ANTHROPIC_MODEL` と `settings.json` の `model` 設定が競合した場合の優先順位

### 判断フロー: いつ xhigh/high/medium を使うか

- **xhigh**: 大規模リファクタリング、セキュリティレビュー、複雑なバグ修正
- **high**: 通常の機能開発、コードレビュー
- **medium**: ドキュメント生成、簡単なリファクタリング、質問応答
- **low**: 監視・ポーリング、簡単な変換タスク
