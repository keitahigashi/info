---
name: Agent Skills実践ガイド（設計・構築・運用）
description: Agent Skillsを0から設計・構築・運用するまでの包括ガイド。SKILL.md構造・description最適化・呼び出し制御・知識外部化
type: reference
---

## 出典
- URL: https://qiita.com/dai_chi/items/a061382e0616fa76fb32
- 著者: @dai_chi（ディップ株式会社）
- 公開日: 2026-02-27

## 概要
Agent Skillsを「必要時にロードされる専門知識パッケージ」と定義し、Progressive Disclosure原則に基づく設計・構築・運用の実践ガイド。

## 詳細

### 設計の3ポイント
1. **SKILL.md構造**: フロントマター必須、references/による知識外部化、500行以下推奨
2. **description最適化**: セマンティックマッチングの核。トリガーフレーズを複数含める
3. **呼び出し制御**: `disable-model-invocation`や`user-invocable`で副作用のある操作の安全性確保

### 実践ワークフロー（5段階）
1. 日常業務をまずClaude Codeで実現
2. 観察結果をもとにSkill化
3. descriptionをチューニング
4. 知識をreferences/に外部化
5. フィードバックループで継続改善

### Progressive Disclosure
コンテキストウィンドウの有限性を解決する設計原則。CLAUDE.md（常時）→ Skills（必要時）→ references/（詳細時）の3段階で情報をロード。
