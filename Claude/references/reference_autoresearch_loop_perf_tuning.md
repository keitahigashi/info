---
name: autoresearch /loopで自律パフォーマンスチューニング
description: Karpathy氏のautoresearch思想を応用し、/loopで10分ごとにコード変更→計測→判定→記録のPDCAを自律反復するRails改善事例（Zenn クラシル）
type: reference
---

## 出典
- URL: https://zenn.dev/dely_jp/articles/3117e590465e38
- 著者: たろう眼鏡（Kurashiru / dely）
- 公開日: 2026-03-30

## 概要
Karpathy氏のautoresearchプロジェクトの設計思想を応用し、AIエージェントがRailsコントローラーのレスポンスタイムを自律的に改善する仕組み。「コード変更→計測→判定→記録」のPDCAを10分ごとに自動反復し、寝ている間に数十回の改善サイクルを実行。

## 詳細

### 3つの設計原則
1. **固定された評価基準**: ベンチマークスクリプトはAI変更不可
2. **固定された時間予算**: 1サイクル9分以内
3. **進化的選択圧**: 改善→keep、悪化→discard

### 実行方法
```
/autoresearch-controller setup UsersController#index
/loop 10m /autoresearch-controller run
```

### ファイル構成
- `benchmark/run.rb` — ベンチマーク実行（AI変更禁止）
- `benchmark/config.yml` — 対象エンドポイント設定
- `benchmark/seed_data.rb` — テストデータ（tuning-agentから隠蔽）
- `tuning_results.tsv` — 試行履歴ログ

### 防御機構（ハーネス）
- **Read hook**: データファイル読み取りをブロック
- **Bash hook**: ホワイトリスト方式でコマンド制限
- **ブランチ保護**: `perf-tune/`プレフィックス以外では動作しない
- **変更可能範囲**: controller/model/service/migration のみ

### エージェント権限分離
- `autoresearch-tuning-agent`: コード分析・改善（データファイル読み取り禁止）
- `autoresearch-data-setup-agent`: テストデータ定義・DB投入（benchmark/へのフルアクセス）

### 設計のポイント
- テストデータ隔離により「特定データへの過最適化」を防止
- 試行結果が次サイクルの入力となる再帰構造で改善精度向上
- 9分の固定時間予算で小さな変更が自然に選ばれ安全
