---
name: Claude Code Plugin Marketplace 試してみたので導入手順と詰まり所をまとめてみた
description: Claude Code v2.1.139 で追加された Plugin Marketplace の導入手順と実際に詰まったポイントを体験ベースでまとめた入門記事。
type: reference
---

## 出典

Qiita（@R-You）: https://qiita.com/R-You/items/45c69a02b46d1e757001

## Claude Code Plugin Marketplace 導入ガイド

### Plugin Marketplace の概要
- 対応バージョン：Claude Code v2.1.139 以降必須
- Skill・Agent・Hook・MCP Server 設定をまとめてパッケージ化
- npm の Claude Code 版として活用可能

### 同梱できる4種類のコンポーネント

| 種類 | 内容 |
|------|------|
| Skill | Claude が参照する知識・手順書 |
| Agent | サブエージェントとして呼び出すカスタムエージェント |
| Hook | ファイル編集後の自動実行コマンド |
| MCP Server 設定 | 外部ツールへの接続設定 |

### 導入5ステップ
1. マーケットプレイスのディレクトリ構成を作成
2. 別リポジトリで動作確認
3. `/plugin marketplace add` でマーケットプレイスを追加
4. `/plugin install` でプラグインをインストール
5. `/reload-plugins` でリロードして動作確認

### 詰まりポイント
- **VS Code 拡張機能は CLI とは別動作**：拡張機能側ではなく必ずターミナルの CLI でコマンドを実行すること
- プライベートリポジトリ利用時は事前に `gh auth login` が必要

### 現時点の制限事項
- インストール粒度はプラグイン単位（内部要素の個別選択は不可）
- 自動更新機能は未実装（編集後は手動で `/reload-plugins` が必要）
