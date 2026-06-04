# CLAUDE.md

## このリポジトリについて

世界の格言・名言・ことわざを収集・整理するナレッジベース。1格言1ファイルのmarkdown形式（充実型：原文・出典・背景・解説つき）で管理する。

## 絶対ルール（必ず守ること）

- エンコードは必ず UTF-8
- 重複チェックは必ず実施してから追記（REFERENCES.md / references/{category}.md で出典を確認）
- 格言ファイルは `maxims/{category}/` ディレクトリ内に配置
- ファイル命名規則: `{category}-{3桁連番}-{english-slug}.md`
  - category例: `western-philosophy`, `eastern-thought`, `japanese`, `chinese-idioms`, `world-proverbs`, `notable-figures`, `latin`, `literature`
- フロントマター（YAML）は必須。テンプレートに従うこと
- **出典の信頼性を重視**：ネット上の名言は誤帰属（偽の引用）が多い。典拠が確認できないものは `author: 作者不詳` 扱いにするか採用を見送る

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

## カテゴリ（出典・文化圏別）

| category | 日本語名 | 範囲 |
|----------|---------|------|
| `western-philosophy` | 西洋哲学 | 西洋哲学者の言葉（古代ギリシャ〜近代） |
| `eastern-thought` | 東洋思想 | 孔子・老子・荘子・孫子・仏教・禅 の語録 |
| `japanese` | 日本 | 日本のことわざ・故事・偉人の言葉 |
| `chinese-idioms` | 中国故事成語 | 由来説話を伴う成語・四字熟語 |
| `world-proverbs` | 世界のことわざ | 各国の民間格言 |
| `notable-figures` | 著名人 | 近現代の科学者・政治家・実業家・文豪 |
| `latin` | ラテン語金言 | 西洋古典の金言 |
| `literature` | 文学作品の名言 | 小説・戯曲・詩の一節 |

> 注: `eastern-thought`（思想家の語録）と `chinese-idioms`（成語の由来）は「思想 vs 慣用句の語源」で区別する。迷ったら思想家の語録は `eastern-thought` に寄せる。

## 格言ファイルのフォーマット

`_template.md` を参照。

## 手動操作

| やること | 指示例 |
|----------|--------|
| 格言を追加 | 「ニーチェの〇〇を追加して」 |
| 一覧を更新 | 「INDEXの収録状況を更新して」 |
| 出典を検索 | 「〇〇の原典を調べて」 |
| 自動収集 | 「格言収集して」「集積を続けて」 |
| 定期実行 | 「/loop 24h で格言収集を設定して」 |
