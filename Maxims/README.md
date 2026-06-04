# 格言データベース

古今東西の格言・名言・箴言を収集・整理するナレッジベース。

## 構成

| ファイル | 内容 |
|---------|------|
| [**INDEX.md**](INDEX.md) | **格言一覧（カテゴリ別）** |
| [REFERENCES.md](REFERENCES.md) | 出典・参照一覧 |
| [_template.md](_template.md) | 新規追加用テンプレート |
| `maxims/` | 格言本体（1格言1ファイル） |

## 格言自動収集システム

Claude Code のスキル機能を使い、Web検索で格言を出典確認しながら自動収集・登録する仕組みが組み込まれている。

```
セッション開始（「格言収集して」等）
  ↓
CLAUDE.md → スキル発火 → SKILL.md読み込み
  ↓
references/{category}.md → 収集済み格言で重複チェック
  ↓
Web検索（カテゴリローテーション） → 重複フィルタ
  ↓
出典検証（誤帰属の排除・典拠確認）
  ↓
maxims/*.md 作成 → INDEX・REFERENCES 更新 → ログ記録
```

### 使い方

```bash
# 1. このディレクトリで Claude Code を起動
cd Maxims
claude

# 2. 格言収集を指示
> 格言収集して
> 集積を続けて

# 3. 特定の格言を指定して追加
> カントの「我が上なる星空…」を追加して

# 4. デイリー自動実行
> /loop 24h で格言収集を設定して
```

## 命名規則

ファイル名: `{category}-{3桁連番}-{english-slug}.md`

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

**ローテーション順**:
`western-philosophy` → `eastern-thought` → `japanese` → `chinese-idioms` → `world-proverbs` → `notable-figures` → `latin` → `literature` → 先頭へ
