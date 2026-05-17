---
name: 「このコード、Claudeに見せていいの？」を解決する — Claude Codeローカル運用ガイド
description: 機密コードをクラウド送信せずに済むClaude Codeローカル完結構成。Qwen3-Coder+LM Studioでローカルエンドポイントを構築する実装ガイド
type: reference
---

## 出典

Zenn（ShintaroAmaike）: https://zenn.dev/shintaroamaike/articles/c7e7e6b27509cc

## 課題と解決アプローチ

### 問題

Claude Codeは処理のためコードをクラウドに送信する。機密コード・NDA対象コード・未公開APIキーを含むコードはセキュリティリスクになる。

### 解決策

ローカルモデルを立ち上げ、Claude Code CLIがローカルエンドポイントを指すよう環境変数で差し替える。

## セットアップ手順

### 1. ローカルLLMの準備

**推奨モデル**: Qwen3-Coder-30B-A3B-Instruct GGUF

**ツール**: [LM Studio](https://lmstudio.ai/) でMessages API互換サーバーを構築

### 2. エンドポイントを差し替える

```bash
# AnthropicエンドポイントをローカルホストにオーバーライドLM Studio起動後に設定
export ANTHROPIC_BASE_URL=http://localhost:1234/v1
export ANTHROPIC_API_KEY=dummy  # ローカルLLMには不要だが変数として必要

# Claude Code CLIをそのまま起動
claude
```

### 3. VS Code拡張機能の場合

- Ollamaが手軽な代替案
- **注意**: CVE-2026-7482（Ollama脆弱性）への対応が必須

## 性能比較

| モデル | SWE-bench Verified |
|-------|-------------------|
| Claude Opus 4.6（クラウド） | 80.8% |
| Qwen3-Coder-30B（ローカル） | 約51.6% |

性能は劣るが、機密データ管理環境下では実用的な選択肢。

## 適用シーン

- 金融・医療・法務など規制業種の開発
- NDA対象の未公開プロジェクト
- APIキーや認証情報を含むコードのデバッグ
- オフライン環境・エアギャップ環境での開発

## ハードウェア要件

- RTX 5090での実装例が記事中に掲載
- 30Bモデルを快適に動かすには高性能GPUが必要（最低RTX 4090相当推奨）
