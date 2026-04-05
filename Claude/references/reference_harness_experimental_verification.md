---
name: Harness Engineering実験的検証（SAKURUG）
description: 5条件（A〜E）比較実験によるハーネスの品質制御効果検証（PostToolUse hook・Stop gate・Gate TDD）
type: reference
---

## 出典
- URL: https://techplay.jp/blog/35216
- 著者: Akiyoshi（SAKURUG）
- 公開日: 2026-03-30

## 概要
Claude Codeによる顧客管理アプリ開発で、品質管理機構を段階的に追加した5条件（A〜E）を比較実験。プロンプトのみからCLAUDE.md、PostToolUse hook、UIチェックリスト、Stop gate、Gate TDDへと進化させ、品質制御と完了判定の有効性を定量的に検証。

## 詳細

### 実験スタック
- フロントエンド: Nuxt 4（SPAモード）、TypeScript
- バックエンド: Hono、Drizzle ORM + SQLite
- テスト: Playwright（e2e）、pnpm（lint/typecheck/test/e2e）

### PostToolUse Hook実装
`.claude/settings.json` に `Edit|MultiEdit|Write` マッチャーを登録し、`post-edit-check.sh` を実行。`exit 2` で失敗を返す仕組み。編集のたびに静的チェックを自動実行。

### Stop Gate構成（Red/Green/Refactor 3段階判定）
- Red: 機能要件と自動検証
- Green: UI批判的見直し
- Refactor: 構造整理まで完了条件に含める

### 実験結果
- 条件A（prompt only）: 最終成果物は合格も再実行でUI言語とseedが変動
- 条件E（Gate TDD）: PostToolUse 19回中10回block、Stop gate 9回中8回blockを返しながら一貫性を確保

### 知見
ハーネスの段階的追加により、成果物の品質と再現性が向上することを実験的に確認。特にPostToolUse hookとStop gateの組み合わせが効果的。
