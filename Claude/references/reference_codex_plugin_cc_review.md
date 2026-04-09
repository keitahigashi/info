---
name: codex-plugin-cc AIコードレビュー多角化プラグイン
description: Claude CodeからOpenAI Codexを呼び出すプラグイン。導入4ステップ・7コマンド・adversarialレビュー・Stopレビューゲート
type: reference
---

## 出典
- URL: https://zenn.dev/ino_h/articles/2026-04-05-claude-code-codex-plugin
- 著者: 井ノ実（ino_h）
- 公開日: 2026-04-05

## 概要
Claude Code内からOpenAI Codexを呼び出し、クロスモデルレビューを実現するプラグイン「codex-plugin-cc」の導入・設定・活用ガイド。

## 詳細

### 導入4ステップ
1. `/plugin marketplace add openai/codex-plugin-cc`
2. `/plugin install codex@openai-codex`
3. `/reload-plugins`
4. `/codex:setup`
- 前提: `npm install -g @openai/codex` と `codex login`

### 設定
- `~/.codex/config.toml` またはプロジェクトレベル `.codex/config.toml`
- 設定例: `model = "gpt-5.4-mini"`, `model_reasoning_effort = "xhigh"`

### 7つのスラッシュコマンド
- `/codex:review`: 読み取り専用コードレビュー
- `/codex:adversarial-review`: 厳格レビュー（設計判断・セキュリティ・エッジケース・トレードオフ検証）
- `/codex:rescue`: Codexへのタスク委譲（`--resume-last`, `--write`, `--background`オプション）
- `/codex:status`: ジョブ状態確認
- `/codex:result`: 完了ジョブの出力表示
- `/codex:cancel`: ジョブキャンセル
- `/codex:setup`: インストール・認証チェック

### Stopレビューゲート
- Claude Codeセッション終了時に自動Codexレビュー実行
- 問題検出時は停止をブロックし修正を促す
- セットアップコマンドで有効/無効切替

### 利点
ワークフロー維持、複数AI相乗効果、問題解決の代替手段、待機時間削減、品質ゲート自動化、既存設定継承
