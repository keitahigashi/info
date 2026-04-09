---
name: Claude Managed Agents パブリックベータ
description: Anthropic Managed Agents（2026-04-08）のアーキテクチャ・料金・ant CLI・早期導入企業事例・自作vsマネージド判断基準
type: reference
---

## 出典
- URL: https://gleamhub.net/media/0132-claude-managed-agents/
- 著者: 鈴木 翔（GH Media）
- 公開日: 2026-04-08

## 概要
Anthropicが2026年4月8日にパブリックベータリリースしたClaude Managed Agentsの全容解説。Agent/Environment/Session/Eventsの4概念、ant CLI、料金体系、早期導入企業（Notion・楽天・Asana）、自作vsマネージド判断基準。

## 詳細

### 4つの主要概念
| 概念 | 機能 |
|------|------|
| Agent | モデル・システムプロンプト・ツール・MCP・Skillsを統合した定義 |
| Environment | Python/Node.js/Go等プリインストールのコンテナテンプレート |
| Session | AgentとEnvironmentを指定して起動する実行インスタンス |
| Events | ユーザー入力・ツール結果をSSEでストリーミング配信 |

### 組み込みツール
- Bash実行、ファイル操作、Web検索/フェッチ、MCPサーバー接続
- プロンプトキャッシュとコンテキスト圧縮を自動処理

### 料金体系
- アクティブランタイム: セッション1時間あたり $0.08（ミリ秒単位計算）
- Web検索: 1,000クエリあたり $10
- アイドル時間: 課金対象外（数分〜数時間の長時間実行を想定）
- トークン課金: Messages APIと同様

### Messages API との住み分け
| 項目 | Messages API | Managed Agents |
|------|--------------|----------------|
| 位置付け | 直接モデルアクセス | マネージド実行環境 |
| 用途 | カスタム制御・短時間処理 | 長時間・非同期自律タスク |
| インフラ管理 | 自前構築 | Anthropicが提供 |

### 早期導入企業
- Notion: ドキュメント横断調査・要約・リライト
- 楽天: 商品データと顧客履歴を統合した対応支援
- Asana: タスク依存関係の解釈と進捗管理

### 実装検証5ステップ
1. ベータヘッダー準備: `managed-agents-2026-04-01` が必須
2. 小規模Agent定義: 1モデル+2〜3ツール最小構成
3. Environment設計: 最小権限・最小パッケージ構成
4. 課金監視: セッション毎のコスト実測
5. MCP接続: 社内APIのMCPサーバー化と統合

### 自作 vs マネージド判断基準
- マネージド向き: 越境OK・標準ランタイム・PoC段階・非同期処理・インフラ人材不足
- 自作向き: 国内DC必須・独自GPU・SLA確立済み・リアルタイム応答・運用チーム既存
