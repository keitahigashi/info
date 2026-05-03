---
name: Claude Code Ultraplan & Ultrareview入門 — クラウドで計画・レビューする実践ガイド
description: /ultraplanと/ultrareviewを開発ライフサイクルに組み込む実践ガイド（Qiita）
type: reference
---

## 出典

Qiita（kai_kou）: https://qiita.com/kai_kou/items/fe63afd97fe6e2aaf0a4

## 概要

Claude Codeの2つのクラウド実行コマンド（`/ultraplan`・`/ultrareview`）を開発ライフサイクルの異なるフェーズで活用する実践ガイド。

## Ultraplan（計画機能）

```bash
/ultraplan {タスク}
```

- **用途**：実装前の詳細な計画立案
- **実行環境**：Anthropicクラウド上で動作
- **特徴**：ブラウザでインラインコメントを付けて精緻化し、クラウドまたはローカルで実装可能
- **利点**：ターミナルが解放され、他の作業と並行実施できる

## Ultrareview（レビュー機能）

```bash
/ultrareview          # ブランチ全体
/ultrareview 1234     # PR番号指定
```

- **用途**：マージ前の深いコードレビュー
- **特徴**：マルチエージェントが独立して並列検証し、誤検知を削減
- **所要時間**：5〜10分
- **無料枠**：Pro/Maxユーザーは2026年5月5日までに3回分無料

## 開発サイクルへの組み込み

```
実装前  → /ultraplan  （計画立案）
実装中  → /review     （日常チェック）
マージ前 → /ultrareview （深層バグ検出）
```

この3段階の活用で、コード品質の向上と開発効率化を両立できる。

## ポイント

- `/ultraplan` と `/ultrareview` はいずれもクラウドで非同期実行されるため、実行中も他の作業を継続できる
- 費用対効果が高い場所（認証・決済・マイグレーション）での `/ultrareview` 使用を優先する
