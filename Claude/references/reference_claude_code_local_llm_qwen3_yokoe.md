---
name: 無料で Claude Code？！ Qwen3.6 と LM Studio でローカルLLMコーディング
description: LM StudioとQwen3.6を使ってClaude Codeをサブスク不要でローカル実行する手順。settings.jsonのcustomApiKey設定からDiscord Botサンプルまで実践解説
type: reference
---

## 出典

Zenn (yokoe24): https://zenn.dev/yokoe24/articles/147ceccdd72319

## 公開日

2026年04月27日

## ローカルLLMでClaude Code実行ガイド

### 著者

横江（よこえ）

### 概要

Claude Codeのサブスクリプション費用を抑えたい開発者向けに、LM StudioとQwen3.6モデルを使用してローカルでAIコーディングを行う方法を解説。

### セットアップ手順

1. **LM Studioのインストール**
2. **Qwen3.6モデルのダウンロード**（推奨: 35B-A3B variant・Apple Silicon最適化版）
3. **パラメータ設定**（context length、temperature等）
4. **ローカルAPIサーバーの起動**（デフォルト: `http://localhost:1234`）

### Claude Code設定

```json
// .claude/settings.json
{
  "customApiKey": "lm-studio",
  "apiBaseUrl": "http://localhost:1234/v1",
  "model": "qwen3.6"
}
```

### 実践例：Discord Botの作成（Go言語）

- Plan Mode使用でより良い結果を得られる
- Qwen3.6はClaude Sonnet 4.6に及ばないが実用的な水準

### パフォーマンス・制約

| 項目 | 詳細 |
|------|------|
| RAM消費 | 約34GB（Qwen3.6 35B-A3B） |
| 主なボトルネック | ハードウェア性能（計算リソース） |
| 品質比較 | Claude Sonnet 4.6より劣るが、Plan Mode活用で実用的 |
| コスト | APIコール分のサブスク不要（電力・ハードウェアのみ） |

### 注意点

- 高性能GPU/CPUとRAMが必須
- 商用モデルと比較して品質は劣る
- M2/M3 MacなどApple Siliconでの動作最適化あり

<!-- 日常で得た知見をここに追記 -->
