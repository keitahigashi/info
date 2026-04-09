---
name: AutoHarness Skill — ルール自動生成ハーネスエンジニアリング
description: Skillsでハーネスエンジニアリングを実装。autoharness-init/updateでルール自動生成・継続改善するフレームワーク
type: reference
---

## 出典
- URL: https://zenn.dev/shintaroamaike/articles/df3ecc0ddee047
- 著者: ShintaroAmaike
- 公開日: 2026-04-01

## 概要
DeepMind 2026論文（arXiv:2603.03329）に触発されたAutoHarnessスキル。プロジェクトルールを手動記述する代わりに、エージェントフィードバックループでルールを自動生成・改善するフレームワーク。

## 詳細

### 2つのコマンド
- **`/autoharness-init`**: プロジェクト設定ファイル（pyproject.toml, tsconfig.json, .eslintrc等）を分析し自動生成:
  - `.claude/rules/harness.md` — 自然言語コーディング規約
  - `.claude/rules/harness_check.py` — JSON結果を返す検証スクリプト
  - CLAUDE.mdへのルール自動読込み設定追加

- **`/autoharness-update`**: タスク実行を監視し、型エラー・テスト失敗・フィードバック検出時に自律的にルール改善。チーム固有の慣習を段階的にエンコード

### 評価結果（n=5, 3タスク種別）
- **pathlib.Path使用**: harness有り 5/5 vs 無し 0/5
- **Decimal実装**: harness有り 5/5 vs 無し 0/5
- **型アノテーション**: harness有り 5/5 vs 無し 3/5
- **機能的正しさ（バグ修正・機能実装）**: 差異なし

### 知見
- スタイル・規約の強制に優れる（論理的正しさには影響小）
- ルール一元管理で繰り返し指示のオーバーヘッド削減
- トレードオフ: トークン消費増加、ルール陳腐化リスク、初期セットアップコスト
