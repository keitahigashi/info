---
name: Claude Codeソースコード流出事件（npmソースマップ）
description: v2.1.88のnpmパッケージにソースマップが混入し51万行が流出 — 経緯・内部構造・隠れた機能・開発者向け対策（AI Heartland）
type: reference
---

## 出典
- URL: https://ai-heartland.com/news/claude-code-source-leak/
- 著者: AI Heartland
- 公開日: 2026-03-31
- 発見者: Chaofan Shou氏（セキュリティ研究者）

## 概要
Anthropicがnpmパッケージ `@anthropic-ai/claude-code v2.1.88` にソースマップ（.mapファイル）を除去せず公開。1,902個のTypeScriptファイル・512,000行以上が流出。数時間でGitHubにアーカイブが複数作成され回収不可能に。

## 詳細

### 流出の原因
- `.npmignore`によるブラックリスト方式を採用 → ソースマップが対象外に
- ホワイトリスト方式（`"files"`フィールド）なら防げた

### 流出した内部構造
- UI層: React + Ink（ターミナル描画）、main.tsx（785KB）
- ツール定義: 29,000行
- AI通信部分: 46,000行
- 内部コードネーム:「Tengu（天狗）」が30ファイル以上で登場
- コード品質課題: ある関数が3,167行・12段階ネスト・約486分岐

### 隠れた機能（解析者の推測、公式未確認）
- **KAIROS**: ユーザー指示待ち→自律的常駐アシスタントへの進化計画。GitHub自動監視・バックグラウンド動作
- **autoDream**: 24時間経過時に過去セッションを自動検索し記憶を統合・圧縮。インデックス25KB以下に圧縮
- **107個のフィーチャーフラグ**: GrowthBookで管理（VOICE_MODE、ULTRATHINK等）

### 開発者向け対策3項目
1. パブリッシュ前確認: `npm pack --dry-run | grep -i ".map"`
2. ホワイトリスト方式: `"files": ["dist/", "README.md", "LICENSE"]`
3. CI/CDでソースマップ検出・拒否ステップを構築

### 使用者向けリスク
- 不正リポジトリで `claude -p` を実行する危険性
- `.mcp.json`等の設定ファイルに見せかけたコマンド実行の可能性

### 時系列
- 3月26日: 未リリースモデル「Claude Mythos」詳細流出
- 3月31日: ソースコード流出（5日で2度目の重大事態）
- 対応: ソースマップ除去アップデートを即座にプッシュ（公式声明なし）
