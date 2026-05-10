---
name: Claude Codeのプラグインを社内で配布する完全ガイド｜Plugin Marketplaceで組織のSkillsを横断共有
description: Claude Code Plugin Marketplaceを使った社内プラグイン配布の設計指針・ファイル構成・marketplace.json/plugin.jsonの書き方・Private配布・運用パターンを詳解したはてなベース社の技術記事
type: reference
---

## 出典

はてなベース株式会社: https://hatenabase.jp/blog/claude-code-plugin-marketplace-guide/

## 公開日

2026年5月4日

## Plugin Marketplaceとは

「プラグインのカタログ」機能。1つのリポジトリに複数プラグインをまとめ、ユーザーが購読登録すると自動配布される仕組み。

含まれるコンポーネント:
- Skills（スラッシュコマンド）
- Subagents（補助エージェント）
- Hooks（イベントスクリプト）
- MCPサーバー
- LSPサーバー

## プラグイン化のタイミング

| 段階 | 配置 | 理由 |
|------|------|------|
| 1リポジトリ | `.claude/skills/`にコミット | シンプル |
| 2リポジトリ | 上記+コピー | まだ対応可能 |
| **3リポジトリ以上** | **Plugin Marketplace化** | マスター1箇所→全リポジトリ反映 |

**判断基準**：同じSkillを3リポジトリ以上にコピーした瞬間がプラグイン化の潮時。

## ディレクトリ構成

```
my-marketplace/
├── .claude-plugin/
│   └── marketplace.json              ★必須
└── plugins/
    ├── deploy-tools/
    │   ├── .claude-plugin/
    │   │   └── plugin.json           ★必須
    │   ├── skills/
    │   ├── agents/
    │   └── hooks/
    └── data-tools/
        ├── .claude-plugin/
        │   └── plugin.json
        └── skills/
```

## 最小構成プラグインの作成

```bash
mkdir -p my-marketplace/.claude-plugin
mkdir -p my-marketplace/plugins/quality-review-plugin/.claude-plugin
mkdir -p my-marketplace/plugins/quality-review-plugin/skills/quality-review
```

**SKILL.md例**:
```markdown
---
description: 直近の変更について、簡単なコードレビューを行います
---

直近の変更を分析し以下の観点で簡潔に指摘してください。
- 命名・可読性
- エラーハンドリングの抜け
- テストの過不足
```

**plugin.json例**:
```json
{
  "name": "quality-review-plugin",
  "description": "/quality-review スキルを追加します",
  "version": "1.0.0"
}
```

**marketplace.json例**:
```json
{
  "name": "company-tools",
  "owner": { "name": "DevTools Team", "email": "devtools@example.com" },
  "description": "社内開発チーム向けプラグイン集",
  "plugins": [
    {
      "name": "quality-review-plugin",
      "source": "./plugins/quality-review-plugin",
      "description": "/quality-review スキルを追加します"
    }
  ]
}
```

**インストール**:
```bash
/plugin marketplace add ./my-marketplace
/plugin install quality-review-plugin@my-plugins
```

## 5種類のプラグインソース

| ソース | 用途 | 例 |
|--------|------|-----|
| 相対パス | 同リポジトリ内 | `"./plugins/formatter"` |
| `github` | 別リポジトリから取得 | `{"source":"github","repo":"company/deploy-plugin"}` |
| `url` | Git URL指定 | `{"source":"url","url":"https://gitlab.com/..."}` |
| `git-subdir` | モノリポの一部 | `{"source":"git-subdir","url":"...","path":"tools/x"}` |
| `npm` | npmパッケージ | `{"source":"npm","package":"@org/tool"}` |

バージョン固定:
```json
{
  "source": {
    "source": "github",
    "repo": "company/deploy-plugin",
    "ref": "v2.0.0",
    "sha": "a1b2c3d4e5f6..."
  }
}
```

## Privateリポジトリでの配布

- `gh auth login`済みなら追加設定不要
- SSH鍵がssh-agentに登録済みなら動作
- **Claude Cowork（企業向け）**: 組織管理コンソールから社員に一斉配布可能（リポジトリアクセス権不要）

注意: 組織マーケットプレイスはprivate/internal限定（publicリポジトリは登録不可）

## 社内マーケットプレイスの運用パターン

**パターン1：単独リポジトリ型（小規模・10プラグイン未満）**
```
company-marketplace/
├── .claude-plugin/marketplace.json
└── plugins/
    ├── deploy/
    ├── data-pipeline/
    └── code-review/
```

**パターン2：カタログ分離型（中規模・チーム別権限管理向け）**
```
company-marketplace/（カタログ）
company/deploy-plugin/（プラグイン1）
company/data-pipeline-plugin/（プラグイン2）
```

**パターン3：公式+社内並列購読**
Anthropic公式と社内マーケットプレイスを同時購読してOSS・社内Skillsを一元管理。

## インストール・更新コマンド

| コマンド | 動作 |
|---------|------|
| `/plugin marketplace add <url>` | マーケットプレイス購読登録 |
| `/plugin install <plugin>@<marketplace>` | プラグインインストール |
| `/plugin marketplace update` | カタログ更新 |
| `/plugin update <plugin>` | プラグイン更新 |
| `/plugin uninstall <plugin>` | アンインストール |

## 運用上の推奨事項

- Skillリリースには**Pull Requestレビュー必須**
- mainマージ時に**versionを上げる**
- デプロイ・データ操作系Skillは**本番事故対策として最初から仕組みに組み込む**
- `~/.claude/plugins/cache`にキャッシュされる（プラグイン外ファイルの相対参照不可）

## marketplace.jsonの予約名（使用禁止）

- claude-code-marketplace
- claude-plugins-official
- anthropic-marketplace
- life-sciences
