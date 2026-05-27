---
name: Claude Codeに公式セキュリティプラグインが登場：「security-guidance」でAIが書くそばから自動レビュー
description: Anthropic公式マーケットプレイス提供のsecurity-guidanceプラグインの3層検査アーキテクチャと導入効果をnote記事でわかりやすく解説
type: reference
---

## 出典

note (zephel01): https://note.com/zephel01/n/nd1fe6f028e20

## 公開日

2026年5月27日

## 概要

Anthropicが公式マーケットプレイスで配布開始した `security-guidance` プラグインの紹介記事。「Claude がコードを書くたびに別の Claude インスタンスがバックグラウンドで脆弱性を自動検出・修正する」仕組みをわかりやすく解説している。

## 3層の検査アーキテクチャ

### 第1層：正規表現による即座の危険パターン検知（コスト0）

- モデル呼び出しなし → 追加費用ゼロ
- ファイル編集時に即時スキャン
- 対象: コマンドインジェクション・XSS・安全でないシリアライズ等

### 第2層：ターン終了時のバックグラウンドレビュー

- Claude Opus 4.7 の別インスタンスが差分をレビュー
- バックグラウンド実行 → 作業フローを妨げない
- 高深刻度の問題は Claude に再プロンプト → 同セッション内で修正

### 第3層：コミット時のエージェント型深層レビュー

- `git commit` / `git push` 時に起動
- 複数ファイルを横断したデータフロートレース
- IDOR・認可バイパス・クロスファイル SSRF などを捕捉

## インストールの手軽さ

インストールは2コマンドで完了:

```text
/plugin install security-guidance@claude-plugins-official
/reload-plugins
```

独自のセキュリティルールもカスタマイズ可能な設計（`.claude/claude-security-guidance.md` や `.claude/security-patterns.yaml` に記述）。

## 導入効果

Anthropic 社内ロールアウト・ベンチマークで **PR へのセキュリティ関連コメントが 30〜40% 減少**。

## ポジショニング

- プラグイン: コード作成中のリアルタイム検出（防ぎ）
- `/security-review` コマンド: オンデマンドのブランチ全体レビュー（補完）
- Code Review（PR 時）: 本番前の最終チェック（ネット）

この多層防御により「書く → レビュー → 本番」の各ステージでセキュリティリスクを低減する。

## 注意点

- 第2・第3層はモデル呼び出しを行うため通常の Claude 利用コストと同様に消費
- ログは `~/.claude/security/log.txt` に出力
- `SECURITY_GUIDANCE_DISABLE=1` で全体を一時無効化可能
