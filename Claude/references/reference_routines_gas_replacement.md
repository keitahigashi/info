---
name: RoutinesでGAS定期タスク置き換え
description: Routines vs GAS比較分析 — GASはスプレッドシート連携・Routinesは複数SaaS×自然言語判断に最適・補完活用推奨
type: reference
---

## 出典
- URL: https://zenn.dev/drasenas/articles/claude-code-routines-gas-automation
- 著者: drasenas
- 公開日: 2026-04-15

## 概要
GAS（Google Apps Script）の定期タスクをClaude Code Routinesで置き換える実践ガイド。GASとの使い分け、設定手順、現実的な制限を解説。

## 詳細

### Routinesの基本
「AIエージェントを使ったジョブスケジューラー」。自然言語プロンプト1本で定期タスクを自動化。PCを閉じていても確実に実行される。

### 3つのトリガー
1. **スケジュール型**: 毎時・毎日・平日・毎週から選択
2. **API型**: HTTPエンドポイント経由での呼び出し
3. **GitHubイベント型**: プッシュやPRイベントに連動

### 実装ステップ
1. claude.ai/code/routinesにアクセス
2. 自然言語でプロンプト記述
3. MCPコネクタを権限最小限で選定
4. トリガー時刻を指定
5. テスト実行してセッション確認

### GASとの使い分け
- **GAS**: スプレッドシート連携に強い
- **Routines**: 複数SaaS連携と自然言語判断に最適
- 結論: **GAS廃止ではなく補完的活用**を推奨

### 現実的な制限
- Research Preview段階（仕様変更の可能性）
- Pro: 1日5回、Max: 15回の実行上限（※jinrai.co.jp記事ではMax 25回と記載、情報源により差異あり）
- ルーティンはユーザー個人に紐づく
- `claude/`プレフィックスブランチのみプッシュ可能
