---
name: Claude Code の Plugin Marketplace でスキルをオプトイン配布にする
description: 数十個に増えたスキルの誤発火とコンテキスト肥大化をPlugin Marketplaceのオプトイン配布で解決した実装事例。
type: reference
---

## 出典

newmo 技術ブログ: https://tech.newmo.me/entry/2026/04/01/130000

## 課題と解決策

**問題**: スキルが増加するにつれ、全員に一律適用されるデフォルト動作で意図しない誤発火が増加し、コンテキストウィンドウも圧迫。

**解決策**: Plugin Marketplace を活用し、role別パック（チーム向け / QA向け）をオプトイン形式で配布。

## 実装構成

```
marketplace.json        # カタログ全体を定義
.claude/settings.json  # Marketplaceの登録
/plugin install        # インストール管理コマンド
```

## スキル namespace 設計のポイント

- SKILL.md の `name` フィールドに `"my-team:prd-guide"` のように namespace を明示
- 補完時の識別性が向上し、同名スキルの衝突を回避

## 今後の展望

- Codex への同様機能搭載に伴い、単一ソースから複数Agent向け設定を自動生成する仕組みを構築予定
- Marketplace JSON を組織の単一の真実源（Single Source of Truth）として運用する設計思想
