---
name: ハーネスエンジニアリング実践「狩りから稲作へ」
description: 4層ハーネス体系（Hooks・Lefthook・Skills・CI）の実装例・タスクフロー・人間の判断領域の明確化
type: reference
---

## 出典

Zenn記事（shomatan / 情熱駆動開発）: https://zenn.dev/ignission/articles/f1c15646c990f1
公開日: 2026-03-24

## 「狩りから稲作へ」の比喩

- **「狩り」段階**: プロンプト工夫で出力品質を向上させる戦術的対応
- **「稲作」段階**: 仕組みで品質を継続的に担保する体系的アプローチ

プロジェクト: Rust（バックエンド）+ TypeScript（フロントエンド）のモノレポ

## 4層ハーネス体系

| 層 | タイミング | 実行主体 | 役割 |
|---|---|---|---|
| 第1層 | Claude Code操作前後 | hooks | AI行動をリアルタイム制御 |
| 第2層 | git操作時 | Lefthook | リポジトリ入前ゲート |
| 第3層 | 開発者任意タイミング | skills | ワンコマンド複雑検証 |
| 第4層 | Push後 | GitHub Actions + CodeRabbit | 最終防衛ライン |

## 第1層: Claude Code hooks

`.claude/settings.json` に設定:
- **pre-bash-guard**: 破壊的コマンド・`--no-verify`バイパス・先送り返信をブロック
- **post-edit-lint**: 編集後に自動lint+format
- **post-push-monitor**: push後にCI/CodeRabbit監視を起動

## 第2層: Lefthook統合

- Clippy pedantic + `allow_attributes = deny` で警告握り潰し禁止
- ast-grepでDDD層間の不正importやsqlx直接呼び出しを検出

## 第3層: Claude Code skills

- `/pre-push-review`: 4エージェント並列レビュー（code-simplifier、security-auditor、CodeRabbit CLI、security-review）
- `/merge-and-cleanup`: マージからチケット完了まで一括実行

## タスク実装フロー

1. **仕様策定・実装**: post-edit-lint + Lefthook pre-commitが品質監視
2. **PR作成前**: `/pre-push-review`で4並列レビュー実行
3. **プッシュ後**: 自動監視 + CodeRabbitコメント先送り表現検出
4. **マージ**: 全コメント解決後に自動マージ+整理

## 人間の判断領域（自動化しない）

1. 設計・実装案の承認
2. CodeRabbit指摘への対応判断
3. 未解決コメント状態の最終確認

> エンジニアリングの価値 = 制約の中で最善選択ができる能力
