---
name: Week 22 · 5月25〜29日、2026年 - Claude Code Docs
description: Claude Opus 4.8のデフォルト化・Dynamic Workflows・Security Guidanceプラグイン・ファストモード値下げの4大機能をリリースしたWeek 22公式ノート。
type: reference
---

## 出典

Anthropic（Claude Code公式ドキュメント）: https://code.claude.com/docs/ja/whats-new/2026-w22

## 対象バージョン: v2.1.150 → v2.1.157（4機能）

## 1. Claude Opus 4.8（new model）

Max・Team Premium・Enterprise pay-as-you-go・Anthropic APIのデフォルトモデルに昇格。デフォルト effort は `high`。より難しいタスクには `/effort xhigh` を使用。v2.1.154以降が必要。

```
> /model claude-opus-4-8
```

## 2. Dynamic Workflows（research preview）

Claudeがタスク用オーケストレーションスクリプトを自動生成し、バックグラウンドで多数のサブエージェントを並列実行。コードベース全体の監査・大規模移行・クロスチェック型調査に活用。`/workflows` で実行を管理。

```
> create a workflow that migrates every internal fetch() call to the new HttpClient wrapper
```

## 3. Security Guidance Plugin（plugin）

コード変更の脆弱性をレビューし同一セッション内で修正。編集時に高速パターンチェック、ターン終了時にモデルレビュー、コミット/プッシュ時に深いアジェンティックレビューを実行。プロジェクトルールは `.claude/claude-security-guidance.md` に追記可能。

```
> /plugin install security-guidance@claude-plugins-official
> /reload-plugins
```

## 4. Fast Mode on Opus 4.8（research preview）

Opus 4.8でのファストモードが $10/$50 per MTokに値下げ（約2.5倍速）。Opus 4.7/4.6は $30/$150 のまま。Opus 4.6のファストモードは廃止。

```
> /fast
```

## その他の主要改善

- `.claude/skills` ディレクトリのプラグインが自動ロード（マーケットプレイス不要）。`claude plugin init <name>` で新プラグインをスキャフォールド
- `/reload-skills` コマンドで再起動なしにスキルディレクトリを再スキャン
- スキル/コマンドのfrontmatterで `disallowed-tools` を設定しツール制限が可能
- 新しい `MessageDisplay` フックイベント（アシスタントメッセージを表示時に変換・非表示化）
- `--fallback-model` でプライマリモデル不在時に自動フォールバック
- Bedrock/Vertex/Foundryでもストリーミングツール実行が常時有効化
