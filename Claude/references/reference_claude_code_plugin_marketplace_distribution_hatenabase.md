---
name: Claude Code のプラグインを社内で配布する完全ガイド｜Plugin Marketplace で組織のSkillsを横断共有
description: 企業内でSkills・Subagents・Hooks・MCPサーバーをプラグイン化して配布・管理するPlugin Marketplace構築の実装フレームワーク
type: reference
---

## 出典

はてなベース株式会社: https://hatenabase.jp/blog/claude-code-plugin-marketplace-guide/

## Claude Code プラグイン社内配布完全ガイド

## コア概念
Plugin Marketplace = 再利用可能なAIコンポーネント（Skills、Subagents、Hooks、MCPサーバー）を企業内で一元カタログ化・配布するシステム

## 3層構造モデル

### 第1層：マーケットプレイス層
- ファイル: `marketplace.json`
- 役割: 全利用可能プラグインの中央カタログリスト

### 第2層：プラグイン層
- ファイル: `plugin.json`（プラグインごと）
- 役割: コンポーネント所在地を定義するマニフェスト

### 第3層：実装層
- 実体: Skills、エージェント、統合機能

## プラグインアーキテクチャ導入判断

| 規模 | アプローチ | 理由 |
|---|---|---|
| **1リポジトリ** | `.claude/skills/`にコミット | プロジェクト統合管理 |
| **2リポジトリ** | コピペ可（管理可能） | 管理上問題なし |
| **3+リポジトリ** | **Plugin Marketplace導入** | **バージョン漂流防止に必須** |

**トリガーポイント**: 同じSkillを3リポジトリで複製する状況が発生時に統合必須

## 実装フレームワーク

### 最小必須ファイル

```
.claude-plugin/
├── marketplace.json (カタログ)
└── {plugin-name}/
    └── plugin.json (プラグインマニフェスト)
```

### インストールフロー

```bash
/plugin marketplace add <url-or-path>
/plugin install <plugin>@<marketplace>
```

## 配布オプション

| 方式 | 用途 | メリット |
|---|---|---|
| **単一リポジトリ** | 相対パス参照 | 共存プラグイン管理 |
| **複数リポジトリ** | GitHub参照（分離） | プラグイン独立更新 |
| **プライベートリポジトリ** | 既存Git認証利用 | セキュアな企業内配布 |
| **エンタープライズ統合** | Claude Cowork組織 | 管理者制御配布 |

## バージョン管理

### ベストプラクティス
1. 明示的バージョニングを実装
2. 本番プラグインはPRレビューワークフロー必須
3. デプロイ・データ操作系スキルは特に厳格な検証が必須

**目的**: 実行時失敗防止

## 導入メリット

### ビジネスメリット
- スキル開発時間の削減
- 企業標準の統一
- 組織間のベストプラクティス共有

### 技術メリット
- 一元更新管理（バージョン漂流排除）
- 依存性の明確化
- テスト・デプロイ自動化可能

## キーテイクアウト
"Plugin Marketplaceは『Claude Codeコンポーネント版npm』 — リポジトリ規模3以上で導入ROI最大化"
