---
name: Claude Code Marketplaceを使ったSkillのチーム展開とPlugin化の恩恵
description: GitHubリポジトリベースのMarketplace機能でSkillを関心事別に分類・自動更新配布した組織導入事例。
type: reference
---

## 出典

株式会社ヘンリー エンジニアブログ（warabi）: https://dev.henry.jp/entry/claude-code-marketplace

## チーム展開の方針

- 「個人環境の改善と汎用Skillの任意利用」を採用
- GitHubリポジトリを監視して自動更新できる仕組みを構築

## 導入手順（コマンド1発）

```bash
/plugin marketplace add <GitHub-repo-URL>
```

設定ファイルとPluginフォルダを含めるだけでMarketplace作成が可能。

## 選定理由（他の方式との比較）

| 方式 | 問題点 |
|------|--------|
| 複数リポジトリへの配置 | 更新同期が破綻しやすい |
| ローカルクローン | 管理が煩雑 |
| **Marketplace（採用）** | 同期自動化・管理簡潔 |

## Plugin化の副次的メリット

- 100を超えるSkillがフラットに並ぶ問題を解決
- 関心事別（`dev-workflow`、`github-pr`、`retrospective`等）にPluginを整理
- Skill開発者の生産性向上・オーバーヘッド削減
