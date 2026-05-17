---
name: 【2026年5月版】Claude Code公式アップデート総まとめ｜Fast modeがOpus 4.7に・/goalコマンド追加・claude agents登場
description: 2026年5月の公式アップデートをまとめた記事。Fast mode→Opus 4.7変更、/goalコマンド、claude agents Research Preview等
type: reference
---

## 出典

note.com（kazu@生成AI×教育 / 谷 一徳 | AI Academy / AI顧問）: https://note.com/kazu_t/n/nef4729e12306

## 主要アップデート

### Fast Mode → Opus 4.7 へ変更

- Fast modeのデフォルトモデルが **Opus 4.6 → Opus 4.7** に変更
- `/fast` トグルで有効化すると最新の Opus 4.7 を高速出力モードで使用

### /goal コマンド（新規追加）

- 完了条件を満たすまで複数ターンにわたる作業を自律継続
- 「テストが全部グリーンになるまで修正し続ける」といった用途に最適
- タスクが自己完結するまでClaudeが判断しながら繰り返し実行

### claude agents（Research Preview）

- 複数のバックグラウンドセッションを1つのCLIダッシュボードで管理
- 進行中・入力待ち・完了済みのセッションを一覧表示
- セッション間でのメッセージ送受信が可能

### その他アップデート

- background sessions の安定化
- プラグイン依存関係の強化
- PwCとの戦略的パートナーシップ拡大（エンタープライズ導入加速）
- Claude for Small Businessの発表

## 利用上の注意

- `claude agents` は Research Preview のためバグ・仕様変更の可能性あり
- `/goal` コマンドはループ脱出条件を明確に設定しないと過剰実行になる可能性
- Fast mode の Opus 4.7 は xhigh effort 非対応（effortレベルは別途設定）
