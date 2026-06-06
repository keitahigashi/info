---
name: "Week 22 · 2026年5月25日～29日 - Claude Code 公式週次ダイジェスト"
description: Claude Opus 4.8 リリース、Dynamic Workflows（リサーチプレビュー）、Security Guidance プラグイン、Fast Mode の Opus 4.8 対応など主要新機能まとめ（v2.1.150〜v2.1.157）
type: reference
---

## 出典

Claude Code 公式ドキュメント: https://code.claude.com/docs/ja/whats-new/2026-w22

## Week 22 主要機能（2026年5月25日〜29日）

### Claude Opus 4.8（new model）

Opus 4.8 が Max・Team Premium・Enterprise pay-as-you-go・Anthropic API のデフォルトモデルになった。デフォルトで高いエフォートレベルを使用し、v2.1.154 以降が必要。

```text
> /model claude-opus-4-8
```

難しいタスクには `/effort xhigh` を使用する。

### Dynamic Workflows（research preview）

Claude がタスク用のオーケストレーションスクリプトを生成し、バックグラウンドで多数のサブエージェントを並列実行する機能。大規模タスク（コードベース全体の監査・大規模移行・クロスチェックが必要な調査）に適する。

```text
> create a workflow that migrates every internal fetch() call to the new HttpClient wrapper
```

`/workflows` コマンドで実行を管理する。

### Security Guidance プラグイン（plugin）

Claude のコード変更を脆弱性の観点でレビューし、同一セッション内で修正まで行うプラグイン。

- **高速パターンチェック**: 各編集時に実行
- **モデルレビュー**: 各ターン終了時
- **アジェンティックレビュー**: コミット・プッシュ時に深いレビュー

```text
> /plugin install security-guidance@claude-plugins-official
> /reload-plugins
```

プロジェクトルールは `.claude/claude-security-guidance.md` に記述する。

### Fast Mode on Opus 4.8（research preview）

Fast Mode が Opus 4.8 でデフォルト化。価格: **$10/$50 per MTok**（Opus 4.7/4.6 は $30/$150 のまま）。速度は約 2.5 倍。Opus 4.6 の Fast Mode は廃止。

```text
> /fast
```

## その他の改善

| 機能 | 概要 |
|------|------|
| `claude agents` シェルコマンド | `!` プレフィックスでバックグラウンドジョブとして実行 |
| `.claude/skills` 自動ロード | マーケットプレイス不要でスキルが自動読み込み |
| `/reload-skills` | 再起動なしにスキルを再スキャン |
| `disallowed-tools` frontmatter | スキルアクティブ中に特定ツールを無効化 |
| `MessageDisplay` フックイベント | アシスタントメッセージをフックで変換・非表示可能 |
| `--fallback-model` | プライマリモデル不在時に自動切り替え |
| `defaultEnabled: false` | インストール済みプラグインをデフォルト無効で配布 |
| Vim モード `/` キー | NORMAL モードで逆履歴検索 |
| ストリーミングツール実行 | Bedrock/Vertex/Foundry でも常時有効 |
| Chrome 複数ブラウザ対応 | `/chrome` でブラウザ選択 |

<!-- 日常で得た知見をここに追記 -->
