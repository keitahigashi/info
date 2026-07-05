---
name: Claude Code / GitHub Copilot のトークン消費を手軽に削減する2つのツール
description: シェル出力の不要な情報を除去するRTKと、Claude Code専用の出力トークン削減ツールCavemanの2つを紹介し、実測で入力2.1Mトークン削減（76.4%）・出力70万トークン削減（65%）を達成した具体的な数値を示す。
type: reference
---

## 出典

Qiita / rairaii（株式会社ACCESS）: https://qiita.com/rairaii/items/0ea0ebf709eb00230b93

## Claude Code / GitHub Copilot トークン削減ツール2選（2026年6月10日）

### 前提
トークン課金型のAIコード生成サービスにおいて、コスト削減の実用的な手段を紹介する記事。

### ツール1：RTK（入力トークン削減）

- **概要**：シェルコマンドの出力を最適化し、不要な情報を自動削除
- **対象**：Claude Code・GitHub Copilot 双方に対応
- **インストール**：

```bash
curl -fsSL https://raw.githubusercontent.com/rtk-ai/rtk/refs/heads/master/install.sh | sh
```

- **実測効果**：
  - 削減量：**2.1Mトークン削減**
  - 削減率：**76.4%**

### ツール2：Caveman（出力トークン削減、Claude Code専用）

- **概要**：AIの回答スタイルを変更し、説明や装飾を最小限に抑えた出力へ変換
- **対象**：Claude Code専用
- **インストール**：

```bash
curl -fsSL https://raw.githubusercontent.com/JuliusBrussee/caveman/main/install.sh | bash
```

- **実測効果**：
  - 削減量：**約708,728トークン削減**
  - 削減率：**65%**

### 特に有効なシーン
- 不具合解析・ログ調査
- 原因切り分け
- 試行錯誤の反復作業（コンテキストが膨らみやすい場面）

### 導入のポイント
2つのツールを組み合わせることで入力・出力の両面からトークン消費を抑制でき、日常的なコーディング作業でのコストを大幅に削減できる。
