---
name: Claude Code加速スキル・ツール・設定（Findy登壇・Ubie）
description: Ubie鹿野氏のFindy登壇資料。Raycast・CleanShot X・ghq・codex-plugin-cc・nano-banana等14項目の実践Tips
type: reference
---

## 出典
- URL: https://zenn.dev/ubie_dev/articles/claude-code-tips-findy-2026
- 著者: 鹿野 壮（Ubie）
- 公開日: 2026-03-11
- イベント: Findy「Claude Codeをさらに加速させる私の推しツール」

## 概要
Ubie開発者がFindyイベントで紹介した、Claude Code開発を加速する14カテゴリのスキル・ツール・設定集。

## 詳細

### ターミナル・起動の効率化
- **Raycast**: ホットキー（`⌥⌘T`）でターミナル即起動。スニペット（`c;`でClaude Code起動）
- **プロンプト付き起動**: `claude "プロンプト内容"` で起動待ちを排除

### 画像・テキスト処理
- **CleanShot X**: OCR機能で画像内文字をテキスト化し貼付け。トークン節約

### GitHub連携
- **upload-image-to-pr**: 自作スキル。Playwright MCPでPR descriptionに画像貼付け

### 作業環境の可視化
- **ステータスライン設定**: ディレクトリ・ブランチ・コンテキスト使用率・モデル名表示

### リポジトリ管理
- **Multi-Folder Git Clone**: Raycast自作ツール。同一リポジトリを複数フォルダに自動採番クローン
- **ghq + peco**: 統一ディレクトリ構造でインタラクティブ検索

### 画像生成
- **nano-banana-2-skill**: Claude Code内で高品質画像生成。複数枚同時・試行錯誤可能

### 複雑な開発フロー
- **feature-devプラグイン**: 7フェーズ構成（Discovery→探索→質問→設計→実装→レビュー→サマリー）

### 複数会話の管理
- `/btw`: コンテキスト消費しない軽量質問
- `/fork`: 会話分岐で並列作業
- `/rewind`: 会話巻き戻し
- `--resume ID`: セッション再開

### リモート操作
- **Claude Code Remote Control**: スマホから家のマシンに作業指示

### その他ツール
- **ni**: ロックファイル検出でnpm/yarn/pnpm/bun/deno自動切替
- **skillsmp.com**: マーケットプレイス型スキル検索
- **情報キャッチアップ**: RSSHub→Gemini翻訳→ハイライト→nano-banana画像化→Obsidian保存
