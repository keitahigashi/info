---
name: Anthropic公式プラグイン「security-guidance」でClaude Codeセキュリティ自動化（Zenn）
description: security-guidanceプラグインの3層アーキテクチャ・インストール手順・プライバシー注意点を実践的に解説したZenn記事
type: reference
---

## 出典

Zenn (shirochan): https://zenn.dev/shirochan/articles/95c5c286beb5a3

## 公開日

2026年5月27日

## 概要

Anthropicが2026年5月27日にリリースした公式プラグイン `security-guidance` を使い、Claude Code のセキュリティレビューを自動化する実践ガイド。

## 3層アーキテクチャの実践解説

### 第1層：Regex パターンマッチ（コスト0）

約25種の危険パターンを即時検出:
- 安全でないデシリアライズ（`pickle`等）
- XSS 脆弱性（`dangerouslySetInnerHTML`等）
- コマンドインジェクション（`child_process.exec`等）

**特徴**: モデル呼び出しなし → 追加コスト不要

### 第2層：LLM レビュー（ターン終了時）

- Claude Opus 4.7 がフル差分をバックグラウンドでレビュー
- バックグラウンドフックで実行 → 返答遅延なし
- 高深刻度の発見は Claude に再プロンプト → 同セッション内で修正

### 第3層：エージェント型レビュー（git commit/push 時）

- クロスファイル解析で多ファイル脆弱性を検出
- IDOR・認可バイパス・クロスファイル SSRF などを捕捉
- 文字列マッチが誤検知するケースを文脈理解で回避

## インストール手順

**前提条件**:
- Claude Code CLI v2.1.144+
- Python 3.8+

```text
/plugin install security-guidance@claude-plugins-official
/reload-plugins
```

## プライバシー上の注意点

- エンド・オブ・ターンおよびコミットレビューは差分データを別モデルエンドポイントに送信
- 機密コードを含む場合、送信されるデータの範囲を把握しておく必要がある
- `ENABLE_CODE_SECURITY_REVIEW=0` でモデルレビューを完全無効化可能（パターンマッチのみ残す）

## カスタムセキュリティルール

`.claude/security-patterns.yaml` で独自ルールを追加:

```yaml
patterns:
  - rule_name: internal_api_key
    substrings: ["sk_live_"]
    reminder: "本番 API キーをハードコードしないこと"
```

## 他ツールとの組み合わせ

記事では以下の多層防御を推奨:
- `security-guidance`: コード生成中のリアルタイム検出（第1層）
- `/security-review`: オンデマンドのブランチ全体レビュー（第2層）
- Code Review（PR 時）: Anthropic Team/Enterprise プランの多エージェントレビュー（第3層）
- CI 静的解析: 言語固有ルール（第4層）
