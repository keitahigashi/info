---
name: 【2026年5月最新】Claude Code ニュースまとめ — Opus 4.7・xhigh effort・プラグインマーケットプレイス・Agent SDK
description: 2026年5月時点のClaude Code主要アップデートを網羅的にまとめた技術記事（Qiita）
type: reference
---

## 出典

Qiita（@kotaro_ai_lab / 株式会社Good Lab 開発部）: https://qiita.com/kotaro_ai_lab/items/4ead93c23597722eef62

## 主要アップデート一覧（2026年5月時点）

### Claude Opus 4.7 リリース

- 1Mコンテキストウィンドウが標準価格に統合（長文コンテキスト追加料金なし）
- 新トークナイザー導入（効率向上）
- **xhigh effortレベル**を追加 → 大規模リファクタ・セキュリティレビューに推奨

### プラグインマーケットプレイス強化

```bash
# URLから直接インストール
claude --plugin-url https://example.com/plugin.zip

# ローカルZIPアーカイブからインストール
claude --plugin-dir ./my-plugin.zip
```

### Hooks × effort level 連携

- 環境変数 `$CLAUDE_EFFORT` で条件分岐が可能
- 例: effortがxhighのときのみ特定hookを発火させる

### 新コマンド・改善

- `claude project purge` でプロジェクト状態を一括削除
- `/resume` が大型セッションで最大**67%高速化**

### Agent SDK（v0.1.71〜v0.1.80）

- フック event streamingなど複数機能を更新
- バックグラウンドセッション安定性向上

## 業務利用時のTips

1. Opus 4.7アップグレード後は `max_tokens` を見直す（新トークナイザーの影響）
2. Hooks の effort 連携で不要なhook実行を削減
3. 大型プロジェクトは `claude project purge` を定期メンテナンスに組み込む
