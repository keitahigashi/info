# 寓話データベース

世界の寓話を収集・整理するナレッジベース。

## 構成

| ファイル | 内容 |
|---------|------|
| [**INDEX.md**](INDEX.md) | **寓話一覧（カテゴリ別）** |
| [REFERENCES.md](REFERENCES.md) | 出典・参照一覧 |
| [_template.md](_template.md) | 新規追加用テンプレート |
| `fables/` | 寓話本体（1話1ファイル） |

## 寓話自動収集システム

Claude Code のスキル機能を使い、Web検索で寓話を自動収集・登録する仕組みが組み込まれている。

```
セッション開始（「寓話収集して」等）
  ↓
CLAUDE.md → スキル発火 → SKILL.md読み込み
  ↓
REFERENCES.md → 収集済み寓話で重複チェック
  ↓
Web検索（カテゴリローテーション） → 重複フィルタ
  ↓
WebFetch → 複数ソースでクロスチェック
  ↓
fables/*.md 作成 → INDEX・REFERENCES 更新 → ログ記録
```

### 使い方

```bash
# 1. このディレクトリで Claude Code を起動
cd D:/020_Work/05_environment/01_active/Info/Fables
claude

# 2. 寓話収集を指示
> 寓話収集して
> 集積を続けて

# 3. 特定の寓話を指定して追加
> イソップの「北風と太陽」を追加して

# 4. デイリー自動実行
> /loop 24h で寓話収集を設定して
```

## 命名規則

ファイル名: `{origin}-{3桁連番}-{english-slug}.md`

| origin | 出典体系 |
|--------|---------|
| `aesop` | イソップ寓話 |
| `japanese` | 日本昔話 |
| `grimm` | グリム童話 |
| `andersen` | アンデルセン童話 |
| `chinese` | 中国故事 |
| `indian` | インド寓話（パンチャタントラ等） |
| `african` | アフリカ民話 |
| `other` | その他 |
