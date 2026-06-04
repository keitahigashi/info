# Maxim Collector Skill

## このSkillを使うタイミング

以下のいずれかに該当する場合に読み込む:

- 「格言収集」「格言を集めて」「maxim collect」等の指示があった場合
- 「続けて」「前回の続き」と言われ、文脈が格言収集である場合
- `/loop` でデイリー自動実行する場合

---

## 禁止事項

- **git commit / push は行わない**（ファイル更新まで）
- ユーザーのツール許可以外の確認ダイアログを出さない
- **ログにPR情報（URL・番号等）を記載しない**
- **`## Pull Request` ブロックをログに追記しない**（PR URL・番号・ラベル等を含む）
- **コミット/PR作成後にログファイルへの追記は一切行わない**
- 理由: PRマージ後のブランチへの追記はmainに反映されず、不要な差分を生む
- **コンテキスト制限を理由に途中で中断しない**。本当に制限に近い場合は、現時点までの作業をコミットした上でユーザーに状況を伝える。勝手な早期中断は禁止

---

## 収集ワークフロー（全8ステップ）

### Step 1: カテゴリの決定

**1回の収集は1カテゴリのみ**。以下の優先順で決定する:

1. ユーザーが指定した場合 → そのカテゴリ
2. 指定がない場合 → `log/` の直近ログから前回カテゴリを確認し、下記ローテーション順で次を選ぶ

**ローテーション順**:
`western-philosophy` → `eastern-thought` → `japanese` → `chinese-idioms` → `world-proverbs` → `notable-figures` → `latin` → `literature` → `western-philosophy` …

### Step 2: 該当カテゴリの収集済み確認

**`references/{category}.md` のみ** を読み込み、収集済みの格言（本文・著者）一覧を取得する。
（REFERENCES.md 全体は読まない → コンテキスト節約）

### Step 3: Web検索＆内容取得（サブエージェント委譲）

サブエージェント（Explore）に以下を委譲する:

- 該当カテゴリの検索キーワードでWeb検索
- 検索結果から未収集の格言候補を抽出
- 各候補について本文・原文・著者・出典・意味・背景を取得
- **有名な格言**（検索上位に複数ヒット）→ 1ソースで可
- **マイナーな格言** → 複数ソースでクロスチェック
- **誤帰属に注意**：典拠が確認できないものは採用しない／`author: 作者不詳` 扱い

サブエージェントへの指示に含めること:
- 収集済み一覧（重複回避用）
- 検索キーワード
- 抽出すべき情報（text / text_original / author / source / theme / tags / 意味 / 背景 / english_slug / source_url）

**検索キーワード例**:

| category | キーワード例 |
|----------|------------|
| `western-philosophy` | 西洋哲学 名言 出典、ソクラテス/カント/ニーチェ 格言 原文、philosopher famous quotes source |
| `eastern-thought` | 論語 名言、老子 荘子 格言、孫子 兵法 言葉、禅語 |
| `japanese` | 日本のことわざ 由来、福沢諭吉/西郷隆盛 名言、日本 故事 格言 |
| `chinese-idioms` | 故事成語 由来、四字熟語 出典、史記 菜根譚 名言 |
| `world-proverbs` | 世界のことわざ、英語 ことわざ 意味、各国 格言 |
| `notable-figures` | アインシュタイン/リンカーン 名言 出典、偉人 名言 検証、famous quotes verified |
| `latin` | ラテン語 格言 金言、Latin maxims meaning、Carpe diem 出典 |
| `literature` | 小説 名言 出典、戯曲 詩 名句、famous literary quotes |

### Step 4: 連番の決定

`maxims/{category}/` 内の既存ファイルから最大連番を確認し、続きの3桁連番を割り当てる。

### Step 5: 格言ファイルの作成

`_template.md` に従い、`maxims/{category}/{category}-{連番}-{english-slug}.md` を作成する。
- frontmatter全項目を埋める（不明な原文は text と同じでよい）
- 「意味」「背景・解説」を充実させる（充実型ナレッジベースのため）
- UTF-8 で保存

### Step 6: カテゴリ別 index / references の更新

- `index/{category}.md` に1行追記（id・本文・著者）
- `references/{category}.md` に1行追記（本文・著者・出典・URL）

### Step 7: ハブの件数更新

- `INDEX.md`・`REFERENCES.md`・`README.md` の該当カテゴリ件数と合計を更新

### Step 8: ログ記録

`log/{YYYY}/{MM}/{YYYY-MM-DD}.md` に収集ログを記録する。
- 収集カテゴリ・件数・追加したid一覧・通算件数
- **PR情報は書かない**

---

## 1回の収集件数の目安

デフォルト **10件**（ユーザー指示で増減）。
