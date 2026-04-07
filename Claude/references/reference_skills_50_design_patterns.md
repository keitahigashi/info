---
name: Skills50個の設計パターン
description: 実践で50個のSkillsを作った設計パターンと注意点（frontmatter・ディレクトリ構成・傘型設計・トークン管理）
type: reference
---

## 出典
- URL: https://nexa-corp.jp/claude-code-skills-design-patterns/
- 著者: 川島陸（株式会社Nexa 代表取締役）
- 公開日: 2026-03-28

## 概要
50個のカスタムスキルを実装した経験から、SKILL.mdの構造設計・ディレクトリ構成・トークン管理・スキル間連携のパターンを体系化。

## 詳細

### SKILL.md構造の基本
- YAML frontmatterでname/descriptionを指定
- **descriptionがトリガー判定の鍵**: ユーザーが実際に使う自然な言い回しを含める
- 本文は5,000トークン以内が推奨

### ディレクトリ構成による分類
- **シンプルスキル**: SKILL.md単独で完結
- **スクリプト連携型**: `scripts/`フォルダにPython/シェルを配置
- **リファレンス分離型**: `references/`フォルダで詳細情報を管理→肥大化防止

### Keychainによる認証管理
APIキーをSKILL.mdに直書きせず、macOS Keychainで安全管理。`security add-generic-password`で登録、Pythonから`subprocess`で取得。

### 傘型設計（10以上の関連スキル）
`context.md`で共通情報（サイト情報・文体ルール・認証参照先）を一元管理し、複数サブスキルから参照。

### スキル間のデータ受け渡し
ファイルシステム経由でパイプライン型に。前のスキルが出力保存→次のスキルが読み込み。失敗時の再実行が容易。

### 具体例: SEO記事制作フロー
10サブスキル（KW選定→リサーチ→構成→執筆→レビュー等）をcontext.mdで統一管理。

### 実装上の注意点
- descriptionの調整が最優先（トリガーされない場合は言い回し追加）
- 5,000トークン超はリファレンス/スクリプトに分離
- skill-creatorで既存スキル参照→自動生成で構築時間約1/3短縮
