---
name: Loop Engineeringで失敗しないためのハーネス設計
description: AI coding agentのループ工程を制御する5層ハーネス設計フレームワークと、実装例kajiの使い方を解説
type: reference
---

## 出典

Zenn（著者: kamo）: https://zenn.dev/kamo78/articles/kaji-guarded-loop-engineering

## 構造化要約

### 背景と課題

AI coding agentを業務で使う際に頻発する問題：

- テスト実行の「見かけ上の成功」
- 修正による新たな問題の発生
- 無限の修正ラリー
- コーディング規約からの逸脱
- 完了根拠の欠落

これらの原因は「ハーネスが弱い」ことにあり、放置すると開発を速くするどころか失敗を量産する。

### ハーネス設計の5層構造

| 層 | 役割 |
|----|------|
| Workflow guard | 工程制御、分岐、戻り先、停止条件 |
| Step guard | 各工程内の手順規定 |
| Verdict guard | LLMの判断を構造化出力に変換 |
| Quality gate guard | 決定論的チェック（テスト、lint等） |
| Standards guard | コーディング規約、文書化規約 |

**重要な区別:** Verdict guard は「LLMの判断」を扱い、Quality gate guard は「LLMを通さない検証」を扱う。この分離が判定の信頼性を担保する。

### kaji（workflow harness）について

- Claude Code 等の agent CLI を、ワークフローYAMLに沿って実行するツール
- GitHub Issue から `design → implement → review → fix → verify → PR` までの再開可能な closed loop を管理
- ワークフロー定義で最大反復回数と終了条件を明示的に指定できる

### kaji-starter-python の特徴

- GitHub リポジトリテンプレート形式
- Python プロジェクト骨格、5本のワークフローYAML、23の汎用skill を同梱
- 作成直後から `make check` が通る完成状態でスタート可能
- セットアップは6ステップ（リポジトリ作成 → 設定編集 → sync → 検証 → commit → ラベル設定 → Issue作成）

### 実装経験から得た知見

- 判定機構が脆弱（文字列マッチング頼り）だと無限ループの危険がある
- 修正PR #263で、ツールが埋め込む決定論的な目印による判定方式へ改良
- 工程のやり直し回数の上限未設定がバグとして発見された

### 認識の転換

> AIにループを任せるなら、人間の仕事は prompt 作成から**ハーネス設計**へ移る

## 反映先候補

ハーネスエンジニアリング、自動化ワークフロー、Loop Engineering、実装パターン
