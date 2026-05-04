---
name: 【2026年5月】Claude 9コネクタ解説｜Blender・Adobe連携
description: MCPベースでClaudeをBlender・Adobe CC等9つのクリエイティブツールに接続するコネクタの全容・セットアップ・活用法を解説
type: reference
---

## 出典

Uravation: https://uravation.com/media/claude-connectors-9-creative-tools-2026/

## 記事内容の構造化要約

### コネクタとは何か
- MCP（Model Context Protocol）を使用した外部ツール統合の仕組み
- AIモデルがツール内のリアルタイムデータに直接アクセス可能
- 全プラン（無料含む）で追加コストなし
- 会話ごとの有効化設計（常時接続ではない）

### 9コネクタ一覧

| コネクタ名 | 対応ツール | 主なユースケース |
|---|---|---|
| Adobe for Creativity | 50以上のCreative Cloud製品 | LPビジュアル生成・SNSバナー量産・動画変換 |
| Blender | Blender（3Dモデリング） | Python生成による3Dモデル自動作成・シーン編集 |
| Autodesk Fusion | Fusion（CAD設計） | 機械部品設計の自然言語指示・寸法確認 |
| Ableton | Ableton Live | 操作ガイド・プロジェクトドキュメント参照 |
| Splice | 音源ライブラリ | キーワードによる音源検索・プレイリスト生成 |
| Affinity by Canva | Canva / Affinity | デザイン自動化・テンプレート適用 |
| SketchUp | SketchUp | 建築・インテリア3D設計の自然言語補助 |
| Resolume Arena/Wire | Resolume | VJ映像制作・エフェクト設定補助 |
| （9つ目） | ※記事公開時点で確認中 | ― |

### セットアップ手順
1. Web版Claude（claude.ai）の設定を開く
2. 「Connectors」セクションへ移動
3. 使用したいコネクタを選択してインストール
4. 所要時間：約5分

### 利用条件・制限事項
- 全プランで追加コストなし（無料プランも含む）
- 会話ごとに有効化が必要（自動常時接続ではない）
- Adobe for Creativityは50以上のCC製品に対応

### 企業導入での注意点
1. 社内セキュリティポリシーの確認（外部サービスへのデータ送信）
2. AIの初期出力は必ず人間がレビュー・検証する
3. 段階的な導入を推奨（1コネクタずつ試す）
4. クリエイティブ評価能力（美的判断）は人間が担う点を意識

### 関連コネクタ記事との違い
- reference_adobe_claude_connector_shiftb.md：Adobe単体の詳細解説
- reference_claude_connectors_npaka.md：各コネクタの技術的概要
- 本記事：全9コネクタの一覧・比較・セットアップ手順を網羅
