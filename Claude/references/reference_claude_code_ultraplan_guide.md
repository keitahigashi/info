---
name: /ultraplan完全ガイド — クラウド設計モード
description: /ultraplanの3起動方法・ブラウザレビュー・テレポート・3バリアント（Simple/Visual/Deep）・利用条件・スナップショット制約
type: reference
---

## 出典
- URL: https://jinrai.co.jp/blog/2026/04/11/claude-code-ultraplan/
- 著者: 齊藤一樹（株式会社仁頼）
- 公開日: 2026-04-11

## 概要
/ultraplanは2026年4月リサーチプレビュー公開。複雑な開発タスクの設計フェーズをAnthropicクラウド（CCR）に移し、ブラウザ上でインラインコメント・修正指示を繰り返しながら計画を練り上げる機能。ターミナルを占有せず最大30分間Opus 4.6に設計を委任可能。

## 詳細

### ローカルplan mode vs ultraplan

| 項目 | ローカルplan mode | ultraplan |
|------|-----------------|-----------|
| 実行環境 | ローカルターミナル | Anthropic Cloud (CCR) |
| 使用モデル | セッションのモデル | Opus 4.6（専用） |
| 最大設計時間 | コンテキストウィンドウ依存 | 最大30分 |
| ターミナル占有 | 設計中ロック | フリー |
| レビュー方法 | ターミナルテキスト | ブラウザUI（インラインコメント・絵文字リアクション） |
| 実行場所 | ローカルのみ | クラウド or テレポート（ローカル戻し） |

### 3つの起動方法
1. `/ultraplan migrate the auth service from sessions to JWTs`
2. プロンプト内に「ultraplan」キーワード含める
3. ローカルplan承認時「No, refine with Ultraplan on Claude Code on the web」選択

### ステータス表示
- `◇ ultraplan`: 設計作成中
- `◇ ultraplan needs your input`: 確認事項あり
- `◆ ultraplan ready`: 設計完了、レビュー可能

### ブラウザレビュー機能
- インラインコメント: ピンポイント指摘
- 絵文字リアクション: セクション単位の承認/懸念
- アウトラインサイドバー: 大規模計画の全体像把握

### 実行オプション
- **クラウド実行**: 「Approve Claude's plan and start coding」→ PR作成まで可能
- **テレポート**: 「Approve plan and teleport back to terminal」→ Implement here / Start new session / Cancel

### 3つのバリアント
- **Simple Plan**: サブエージェントなし
- **Visual Plan**: Mermaid/ASCII図を含む可視化
- **Deep Plan**: サブエージェント使用、リスク評価・アーキテクチャレビュー含む

### 利用条件
- Claude Code v2.1.91以降
- Claude Code on the webアカウント（Pro/Max/Team/Enterprise）
- GitHubリポジトリ接続
- Bedrock・Vertex AI・Foundry経由では利用不可
- Remote Controlとの同時使用不可

### スナップショット制約
ultraplan起動後のローカル変更は設計に反映されない。実行中は変更のないファイルに限定すること。

### ユースケース
- 大規模リファクタリング（tRPC v10→v11、47ルート定義モノレポ対応）
- サービス移行（セッション認証→JWT）
- セキュリティ監査（OWASP基準、約8分で完了）
- マルチコンポーネント機能（ドリフト防止）
