---
name: AIに渡す指示書の役割分担: AGENTS.md/SKILL.md/DESIGN.mdと仕様駆動開発の現在地
description: AGENTS.md・SKILL.md・DESIGN.mdの3層分業とSDD接続を解説
type: reference
---

## 出典

Zenn（GENDA Publication）/ ikenyal: https://zenn.dev/genda_jp/articles/f71d3ed7d4d7e8

## 概要

公開日：2026-05-03。自然言語1ファイルから3層分業へ移行する動きを解説。仕様駆動開発（SDD）との共通哲学も論じた実践的考察記事。

## 背景

- 自然言語Markdown（CLAUDE.md等）の効果：文体・スタンスの明文化、チーム共有、一貫した指示
- 課題：検証が人間任せ、属人性が残存

## 3層分業の全体像

| 層 | 形式 | 対象 | 例 |
|---|---|---|---|
| 動き方 | AGENTS.md / CLAUDE.md | エージェント全体の前提・ロール・禁止事項 | ロール別ファイル |
| 個別タスク | SKILL.md | 再利用可能なタスク・手順・専門知識 | avoid-ai-writing等 |
| 見た目 | DESIGN.md | デザインシステムの仕様・検証可能な見た目 | トークン定義 |

本質的な違い：機械可読性と人間可読性の重心位置が層ごとに異なる。

## DESIGN.md（Google Labs, 2026年4月公開）

- YAML形式のデザイントークン + Markdown本文
- CLI検証ツール付属：`npx @google/design.md lint`
- 検証可能項目：WCAGコントラスト比 / トークン参照の整合性 / 構造規約の遵守
- 日本語対応：`kzhrknt/awesome-design-md-jp`

## SKILL.md / AGENTS.md

**SKILL.md（Anthropic準拠）**：
- 再利用可能なタスク単位の定義
- 例：`avoid-ai-writing`スキル（AI生成テキストの文体矯正・構造化監査結果出力）

**AGENTS.md（OpenAI・Google・Sourcegraph共同策定）**：
- エージェント全体の前提・ロール・禁止事項
- 2025年12月にLinux Foundation寄贈
- `CLAUDE.md` はClaude固有の実装（上位互換ではなく実装例）

## 分割判断軸

- デザインシステム規約 → DESIGN.md
- 特定タスク手順 → SKILL.md
- 全体の前提・境界 → AGENTS.md

## SDD（仕様駆動開発）との対応

| 項目 | SDD | 3層分業 |
|---|---|---|
| 対象 | 「これから作るもの」 | 「すでにある規範」 |
| スコープ | 単一機能のライフサイクル | 永続的な規範・スタイル |
| 更新リズム | 完成後アーカイブ | 長期メンテナンス |

将来像：機能specが永続specのトークンを参照する形へ。

## 仕様化すべきもの・しないもの

- 仕様化対象：色のコントラスト比（DESIGN.md）・用語の言い換え（SKILL.md）
- 自然言語ドキュメントに残るもの：文体トーン・文化的ニュアンス・共感ベースの表現

## 実装ステップ

1. 既存 `CLAUDE.md` の検証可能部分を分類
2. 最も独立性が高い項目から切り出し
3. 既製スキルの取り込み（例：`avoid-ai-writing`）
4. 段階的導入：ドキュメント分割→運用試行→仕様化
