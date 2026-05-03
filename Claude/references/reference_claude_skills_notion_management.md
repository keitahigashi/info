---
name: Claude CodeのスキルをNotionで一括管理できるようにした話
description: スキル20本超えの管理課題をNotion DBで解決。SKILL.mdのfrontmatterとsync_plugins.pyで正本・バージョン・zipパッケージを一元管理
type: reference
---

## 出典

Qiita (@taroh_7): https://qiita.com/taroh_7/items/4309f1f2f7e1dd3db7b9
公開日: 2026-05-01

## 課題

Claude Code・Codexのスキルが20本を超えると以下の管理問題が発生:
- 最新バージョンの特定が困難
- ファイル配置場所（`~/.claude/skills/` vs プロジェクト）の把握が難しい
- マルチ環境（PC複数台）での同期が手動になる
- 更新履歴が残らない

## 解決策: Notion DBスキル台帳システム

### 3コンポーネント構成

| コンポーネント | 役割 |
|--------------|------|
| `SKILL.md`（正本） | スキルの実装と frontmatter |
| `sync_plugins.py` | Notion DBへの同期スクリプト |
| Notion DB「スキル管理」 | メタデータ台帳＋zipパッケージ保管 |

### Notion DBのスキーマ（主要フィールド）

| フィールド | 型 | 内容 |
|-----------|-----|------|
| name | title | スキル名 |
| version | text | semver（例: 1.2.0） |
| description | text | 1行要約 |
| scope | select | user / project |
| updated_at | date | 最終更新日 |
| zip_url | url | zipパッケージのURL |

### SKILL.md frontmatter例

```yaml
---
name: deploy
description: 本番環境へのデプロイ手順を自動化
version: 1.3.0
scope: project
---
```

### 同期コマンド

```bash
# 単体スキルをNotionに同期
uv run scripts/sync_plugins.py ~/.claude/skills/<name>/SKILL.md

# 全スキルを一括同期
uv run scripts/sync_plugins.py --all
```

## 正本と配布先の管理

- **正本**: `~/.claude/skills/<name>/SKILL.md`（user scope）
- **プロジェクト配置**: プロジェクトの `.claude/skills/` にシンボリックリンク
- **zipパッケージ**: Notionのファイルフィールドに保管し、別PCへの配布に活用

## バージョン管理の仕組み

semver方式でfrontmatterに記録。`sync_plugins.py`がNotion DBの現バージョンと比較し、差分がある場合のみ更新。
