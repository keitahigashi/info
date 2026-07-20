---
name: Claude Code Skillの配布方法 - Plugin・Marketplace・Skills CLI
description: Skill配布3方式の比較と実装上の落とし穴
type: reference
---

## 出典

Zenn（シンギュラリティ・ソサエティ Publication）: https://zenn.dev/singularity/articles/claude-code-skill-distribution

## 概要

著者: Isamu（公開: 2026年2月25日）。Claude Codeで作成したSkillを他ユーザーと共有する3つの配布方法と実装上の注意点を詳説。

## 3つの配布方法

| 方法 | 概要 | 適用場面 |
|---|---|---|
| 自前Plugin Marketplace | GitHubリポジトリベースの社内/チーム配布 | 最も一般的 |
| 公式Plugin Marketplace | Anthropic公式ストアへの登録 | OSS・パブリック公開 |
| Skills CLI（vercel-labs/skills） | 40以上のエージェント対応のCLI配布 | エージェント横断利用 |

## 実装上の重要な落とし穴

### 1. Skill名プレフィックス変化問題
- ローカル開発時: `/skill-name` で呼び出し
- Plugin化後: `/plugin:skill-name` にプレフィックスが付く
- 複数Skillを連携させる場合に呼び出し名の変更が必要

### 2. CLIコマンド名の差異
- 開発時の `yarn run cli` と配布後のグローバルコマンド名が異なる
- SKILL.mdにフォールバック情報を記載することを推奨

### 3. 命名衝突によるインストール失敗
- marketplace.jsonの`name`とplugin.jsonの`name`を同一にするとLinux環境でインストール失敗
- 両ファイルで意図的に名前を分けることが必要

## まとめ

配布方法の選択はスコープ（個人→チーム→公開）に応じて使い分ける。いずれの方法でも命名規則と呼び出しパス変化に注意が必要。
