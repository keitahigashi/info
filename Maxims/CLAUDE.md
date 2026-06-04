# CLAUDE.md

## このリポジトリについて

古今東西の格言・名言・箴言を収集・整理するナレッジベース。1格言1ファイルのmarkdown形式で管理する。

## 絶対ルール（必ず守ること）

- エンコードは必ず UTF-8
- **誤帰属に注意**。典拠（出典作品・章節）が確認できないものは採用しない。作者が特定できない場合は「作者不詳」扱いとする
- 重複チェックは必ず実施してから追記（`references/{category}.md` で確認）
- 格言ファイルは `maxims/{category}/` ディレクトリ内に配置
- ファイル命名規則: `{category}-{3桁連番}-{english-slug}.md`
- フロントマター（YAML）は必須。テンプレートに従うこと

## Skillsの発火条件

タスク開始前に必ず該当するSKILL.mdを読んでから作業すること。

| やること | 参照するSKILL.md | トリガーワード |
|----------|-----------------|---------------|
| 格言の自動収集 | `.claude/skills/maxim-collector/SKILL.md` | 「格言収集」「格言を集めて」「集積して」「続けて」 |

## ファイル構成

| パス | 役割 |
|------|------|
| `README.md` | プロジェクト概要・収録状況 |
| `INDEX.md` | 格言一覧ハブ（収録状況テーブル + 各カテゴリへのリンク） |
| `index/` | カテゴリ別の格言一覧（8ファイル） |
| `REFERENCES.md` | 出典一覧ハブ（重複チェックの単一ソース + 各カテゴリへのリンク） |
| `references/` | カテゴリ別の出典一覧（8ファイル） |
| `maxims/{category}/` | 格言本体（1格言1ファイル、カテゴリ別サブディレクトリ） |
| `_template.md` | 新規追加用テンプレート |
| `.claude/skills/maxim-collector/SKILL.md` | 自動収集ワークフロー |
| `log/` | デイリー収集ログ |

## カテゴリ一覧

| category | テーマ |
|----------|--------|
| `western-philosophy` | 西洋哲学 |
| `eastern-thought` | 東洋思想 |
| `japanese` | 日本の格言・名言 |
| `chinese-idioms` | 中国故事成語 |
| `world-proverbs` | 世界のことわざ |
| `notable-figures` | 著名人の言葉 |
| `latin` | ラテン語の格言 |
| `literature` | 文学の名言 |
| `fiction` | 創作の名言（漫画・ラノベ・ゲーム等） |

**ローテーション順**:
`western-philosophy` → `eastern-thought` → `japanese` → `chinese-idioms` → `world-proverbs` → `notable-figures` → `latin` → `literature` → `fiction` → `western-philosophy` …

## 格言ファイルのフォーマット

```markdown
---
id: {category}-{3桁連番}
text: （格言の日本語訳・本文を1文で）
text_original: （原語原文。日本語の格言は空でも可）
author: （著者名。不明な場合は「作者不詳」）
author_en: （著者の英語/原語表記）
source: （出典作品・章節）
category: （カテゴリ）
tags: [タグ1, タグ2, ...]
---

# （格言本文 日本語）

> （原文・原語）

## 著者

（著者の簡単な紹介）

## 解説

（格言の意味・文脈の解説）

## 出典

- （出典情報。作品名・章節・年代など）
```

## 手動操作

| やること | 指示例 |
|----------|--------|
| 格言を追加 | 「カントの〇〇を追加して」 |
| 一覧を更新 | 「INDEXの目次を更新して」 |
| 出典を検索 | 「〇〇の出典を調べて」 |
| 自動収集 | 「格言収集して」「集積を続けて」 |
| 定期実行 | 「/loop 24h で格言収集を設定して」 |
