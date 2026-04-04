---
name: AGENTS.md完全入門ガイド
description: AGENTS.md（AIコーディングエージェント向け共通設定ファイル）の仕様・書き方・ツール対応状況・ベストプラクティス（Qiita記事）
type: reference
---

## 出典

Qiita記事: https://qiita.com/nogataka/items/ad15bfa383c98ae5cc36
著者: @nogataka
公開日: 2026-03-24
タグ: GitHub, AI, OSS, エージェント, ClaudeCode

## 概要

AGENTS.mdは「AIコーディングエージェント向けのREADME」。リポジトリに配置することで、Codex CLI、Cursor、GitHub Copilotなど複数のツールが共通の指示を読み取れる。60,000以上のリポジトリが採用。

## 背景：なぜ必要か

複数のAIコーディングツールがそれぞれ異なる設定ファイルを要求する問題：
- Claude Code: `CLAUDE.md`
- Cursor: `.cursorrules` / `.cursor/rules/`
- GitHub Copilot: `.github/copilot-instructions.md`
- Windsurf: `.windsurfrules`

設定ファイルの同期漏れは静かに品質を蝕む。

## 基本仕様

| 項目 | 内容 |
|------|------|
| ファイル名 | `AGENTS.md`（大文字、複数形） |
| フォーマット | 標準Markdown（UTF-8推奨） |
| 配置場所 | リポジトリルート＋サブディレクトリ対応 |
| 必須セクション | なし（完全に自由） |
| ライセンス | MIT |

## 業界動向

- 2025年8月: OpenAIが公開
- 2025年12月: Linux FoundationのAgentic AI Foundation（AAIF）創設プロジェクトとして正式採択
- AAIF創設プロジェクト: MCP（Anthropic）、goose（Block）、AGENTS.md（OpenAI）
- Platinumメンバー: AWS、Anthropic、Block、Bloomberg、Cloudflare、Google、Microsoft、OpenAI

## ツール別対応状況

| ツール | 対応状況 | 備考 |
|--------|---------|------|
| OpenAI Codex CLI | ネイティブ対応 | ディレクトリ階層走査、32KiB上限 |
| Cursor | ルートのみ対応 | サブディレクトリ非対応（v1.5時点） |
| GitHub Copilot | 対応 | リポジトリ指示として読み取り |
| Gemini CLI | 設定変更で対応 | デフォルトはGEMINI.md |
| Claude Code | 公式未確認 | CLAUDE.md推奨、フォールバック不確定 |
| Amp, Jules, Factory, Devin等 | 対応 | 公式互換ツール |

## CLAUDE.mdとの使い分け

- **AGENTS.md**: ツール非依存のプロジェクト情報（技術スタック、コマンド、規約、境界）
- **CLAUDE.md**: Claude Code固有機能（@import、Planモード、サブエージェント指示、メモリ等）
- AGENTS.mdはより宣言的に書く（「Planモードで開始」ではなく「テスト実行」）
- プロジェクト情報はAGENTS.mdに集約、ツール固有設定は各ファイルに

## 推奨セクション構成

1. **Project Overview**: 技術スタック・アーキテクチャ概要
2. **Commands**: ビルド・テスト・Lint等の具体的コマンド
3. **Code Style**: ファイル命名、コンポーネント規約、コード例
4. **Testing**: テストフレームワーク、カバレッジ目標、モック方針
5. **Git**: コミットメッセージ規約、ブランチ命名
6. **Boundaries**: 禁止事項（.env変更禁止、本番設定変更時の確認等）

## Codex CLIの優先順位（階層走査）

1. ユーザーのチャット入力（最優先）
2. 編集対象ファイルに最も近いAGENTS.md
3. 親ディレクトリのAGENTS.md
4. リポジトリルートのAGENTS.md
5. グローバル `~/.codex/AGENTS.md`（最低優先）

## ベストプラクティス

- **具体的なコマンドを書く**: `pytest -v --cov=src --cov-report=term-missing`（曖昧な指示は避ける）
- **コード例で規約を伝える**: 文章説明より実際のコード例が効果的
- **簡潔に保つ**: 200行超は混乱の原因。最初は5〜10個の最重要ルールから
- **定期的に更新**: PRテンプレートにAGENTS.md更新チェック項目を追加
- **READMEと役割分離**: 人間向け→README、エージェント向け→AGENTS.md

## よくある失敗パターン

| パターン | 対策 |
|---------|------|
| 書きすぎて矛盾 | 最初は5〜10ルール、1週間運用後に追加 |
| Project Overviewにビジネス背景を長文 | 技術情報に絞る |
| 既存ファイルと矛盾 | AGENTS.mdをSingle Source of Truth、ツール固有ファイルは独自機能のみ |
| 32KiB上限超過 | サブディレクトリに分割 |

## 導入効果（Before/After）

| 観点 | Before | After |
|------|--------|-------|
| PRレビュー指摘数 | 平均3〜5件 | 平均0〜1件 |
| ビルドコマンド誤り | 週2〜3回 | ほぼゼロ |
| 禁止ファイル変更 | 月1〜2回 | ゼロ |
| 新メンバー設定時間 | 30分〜1時間 | ファイルを置くだけ |
