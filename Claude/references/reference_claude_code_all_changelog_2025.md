---
name: Claude Code全CHANGELOGレビュー2025
description: 2025年の176リリースを全追跡 — バージョン系列・主要機能・コンテキストエンジニアリング・課題と展望（Zenn Oikon）
type: reference
---

## 出典
- URL: https://zenn.dev/oikon/articles/claude-code-2025
- 著者: Oikon
- 公開日: 2025-12-31（更新: 2026-01-03）

## 概要
2025年のClaude Code全176リリースを追跡した包括的レビュー。「私にとってはClaude Codeの年」と評し、AIエージェントの成熟とコンテキストエンジニアリングの重要性を中心テーマに据える。

## 詳細

### バージョン系列とリリース数
- v0.2.x: 37リリース
- v1.0.x: 82リリース
- v2.0.x: 57リリース
- 合計: 176リリース

### 主要マイルストーン
- Claude 4（Opus/Sonnet）リリース（5月22日）が転機
- Claude Opus 4.5（11月24日）で親和性向上
- Agent Skills v2.0.22（10月17日）、12月18日にオープンスタンダード化
- Plugin Marketplace: VSCode Marketplace型配布システム

### コンテキストエンジニアリングの台頭
- `/context`コマンドでコンテキストウィンドウ利用状況を可視化
- MCPツール占有率削減への意識向上
- 複数機能がコンテキスト最適化と結びつく

### 仕様駆動開発（SDD）への移行
- Planモード（`Shift+Tab`）+ Interactive Question ToolでAI側から仕様確認
- 手戻り削減メカニズムとして機能

### AGENTS.md非対応の戦略的決定
- OpenAI標準規格への慎重姿勢
- 回避策: `@`インポート・シンボリックリンクで対応

### 課題
- コンテキストウィンドウ: Opus 4.5は200k（GPT-5.2の400k、Gemini 3 Proの1Mに劣後）
- コンパクション品質: 単純セッション要約傾向
- ナレッジカットオフ: WebSearch・Context7 MCPで補完

### 著者の推奨
- サードパーティツール慎重利用を推奨
- 理由:「ハーネスの外側に追加ハーネス構築」による複雑化リスク
