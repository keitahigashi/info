---
name: Apple's Three-Role Architecture Just Leaked: Juno AI Shadow Backend and CLAUDE.md in Production
description: AppleのサポートアプリにCLAUDE.mdが誤同梱された事件から、AIビルドパイプラインのセキュリティリスクを詳細分析
type: reference
---

## 出典

Lyrie Research: https://lyrie.ai/research/research/2026-05-03-apple-claude-md-leak-juno-ai-shadow-architecture

## Apple CLAUDE.md流出事件分析（2026年5月2日）

### 事件の概要

2026年4月30日、Apple Support App v5.13がApp Storeにリリースされた際、`CLAUDE.md`ファイルがバンドルに含まれたまま配布された。24時間以内にv5.13.1として緊急パッチが配信されたが、情報は既に拡散。元Apple社員がRedditで「Junoは実在する」と確認した。

### Juno AIのアーキテクチャ

Apple内部の会話型AI対応チャットシステム「Juno AI」の3ロール構造が判明:

- **`.client`** - ユーザー
- **`.agent`** - 人間のAppleサポート担当者
- **`.assistant`** - Juno AI

実装: `#if JUNO_ENABLED`の条件コンパイルで制御され、`SupportAssistantAPIProvider`として実装。

**重要な特徴**: ユーザーインターフェースは「どの役割が応答しているか」を表示しない。

> "View model doesn't know which backend is active"

### セキュリティ・プライバシー上の課題

1. **チャット履歴の保存方法**
   - キーチェーンに接続情報を保存
   - `CachesDirectory/TemporaryChatTranscripts/`にプレーンテキストで保存
   - フォレンジック調査・ディスカバリーで容易に回復可能

2. **内部バグ追跡番号の露出**
   - `rdar://164022273`（SwiftUI ID衝突バグ）が公開
   - Apple非公開スキームのチケット番号が第三者に競争優位情報を提供

3. **AI工具アーティファクトの本番漏洩**
   - 開発ワークフローの残存物が本番環境に混入する構造的問題

### ビルドパイプラインの多層的失敗

| 防御層 | 失敗内容 |
|--------|---------|
| Xcodeビルド設定 | `.md`ファイル除外なし |
| CI/CDパイプライン | 非コードアーティファクト除外なし |
| App Store審査 | バンドル検査で未検出 |
| 自動化ツール | 権限・プライバシー確認のみ |

4つの独立した防御層が同時に失敗。

### 企業への推奨対応

1. **ビルドアーティファクト監査**: `CLAUDE.md`、`.cursor/rules`、`.aider.conf.yml`などを検査
2. **除外ルール追加**: `.gitignore`と`.dockerignore`にAI工具パターンを明示
3. **コードレビュー強化**: AI生成コードのレビュープロセス整備
4. **従業員教育**: AI工具の設定ファイルを内部ドキュメントとして扱う認識醸成

### 業界への含意

- Apple Supportチャットの3ロール透過設計は業界標準になりつつある
- Intercom、Zendesk、Salesforceなども同様のパターンを採用
- EU AI法の透明性要件との乖離が問題化する可能性

> "assume any customer-service chat in 2026 is an AI by default"
