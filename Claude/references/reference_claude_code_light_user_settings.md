---
name: Claude Codeライトユーザー便利設定6選
description: 万人受けする実用設定 — 音声フィードバック・コンテキスト監視・MCP・サブエージェント分離・権限自動承認（Qiita minorun365）
type: reference
---

## 出典
- URL: https://qiita.com/minorun365/items/3711c0de2e2558adb7c8
- 著者: minorun365（みのるん / KDDIアジャイル開発センター）
- 公開日: 2026-01-01（更新: 2026-01-14）
- 反応: 463いいね、386ストック

## 概要
初心者向けClaude Code実用設定6項目。「使う」側のテクニックとして最小限必要な設定を厳選。

## 詳細

### 1. 全プロジェクト共通ルール（ユーザーメモリ）
- 日本語対応、AWS認証設定（`aws login`）、BedrockモデルID設定
- コンテキスト節約のためサブエージェント活用を指示

### 2. 音声フィードバック設定
- PermissionRequestとStopイベント時に`afplay /System/Library/Sounds/Glass.aiff`実行
- 作業中の注意喚起に有効

### 3. コンテキストウィンドウ監視（statusline.sh）
- シェルスクリプトでコンテキスト使用率をパーセンテージ表示
- jq使用して`context_window`情報を抽出

### 4. MCPサーバー活用
- ドキュメント検索系: AWSナレッジ、AWS CDK、Bedrock AgentCore、Context7
- 開発系: GitHub（ファイル参照）、Playwright（ブラウザ操作）、Chrome DevTools

### 5. サブエージェント分離
- `.claude/agents`配下にマークダウン配置
- 技術調査・テスト&ログ調査サブエージェントでメインセッションのコンテキスト圧縮防止

### 6. 権限設定の自動承認
- 参照系操作（WebFetch、WebSearch、MCP操作）を自動承認
- コード編集・コマンド実行は手動承認のまま

### Tips
- 会話圧縮前のダンプはHooksで対応が効果的
- `claude-code-guide`ビルトインサブエージェントが設定支援可能
- MCPサーバー設定は`.claude.json`（ホームディレクトリ直下）に記載
- `/agents`コマンドで自然言語からサブエージェント作成可能
