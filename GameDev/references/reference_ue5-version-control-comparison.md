---
name: Version Control for UE5 Teams - Git LFS vs Perforce vs Anchorpoint
description: UE5向けVCS 3ツール比較・ファイルロック戦略・チームサイズ別推奨・日次ワークフロー・よくある失敗5選
type: reference
---

## 出典

StraySpark Studio: https://www.strayspark.studio/blog/version-control-ue5-git-lfs-perforce

## UE5固有の課題

バイナリアセット形式（.uasset、.umap）により、一般的なソフトウェアプロジェクトより複雑。テキストベースのマージが不可能。

## 3ツール比較

| 項目 | Git LFS | Perforce | Anchorpoint |
|------|---------|----------|------------|
| 方式 | 分散型 | 集中型 | 分散型（Git内蔵） |
| バイナリ処理 | LFS拡張 | ネイティブ | LFS内蔵 |
| ファイルロック | コマンド型 | 排他的チェックアウト | ビジュアル型 |
| オフライン作業 | 完全対応 | 限定的 | 完全対応 |
| 学習曲線 | 中程度 | 急峻 | 低い |

## チームサイズ別推奨

| 規模 | 推奨 | 理由 |
|------|------|------|
| **ソロ** | Git + GitHub | 無料・簡潔・サーバー管理不要 |
| **小規模（2-5人）** | Git LFS / Anchorpoint / Perforce無料枠 | チーム構成で選択 |
| **中規模（5-20人）** | **Perforce** | バイナリ競合根本防止・100GB+対応 |
| **大規模（20人+）** | **Perforce必須** | AAA標準・ストリーム対応 |

## ファイルロック戦略

```
# Git LFS
git lfs lock Content/Maps/MainLevel.umap

# .gitattributes
*.umap lockable
*.uasset lockable
```

**重要**: バイナリファイル修正前に**必ずロック**。並行編集は片方の作業喪失。

## ブランチ戦略

```
main（安定版）
→ develop（統合）
  → feature/*（機能別）
  → hotfix/*（緊急対応）
```

## よくある失敗5選

1. バイナリをGitに直格納（リポジトリ肥大化）
2. ロック忘れによる作業喪失
3. 生成ファイル（Intermediate/等）のコミット
4. 大規模かつ低頻度なコミット
5. 意味不明なコミットメッセージ

## 日次ワークフロー

**Perforce**: 朝→最新同期→チェックアウト→編集→テスト→コミット→競合解決
**Git**: 朝→プル→ロック→編集→ステージング→コミット→プッシュ→ロック解除
