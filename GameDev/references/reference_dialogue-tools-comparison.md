---
name: Twine vs Yarn Spinner vs Ink vs NarrativeFlow - Dialogue Tool Comparison
description: 分岐対話ツール4種比較・Twine/Yarn Spinner/Ink/NarrativeFlow・長短所・選定基準
type: reference
---

## 出典

NarrativeFlow: https://narrativeflow.dev/blog/twine-vs-yarn-spinner-vs-ink-vs-narrativeflow-which-branching-dialogue-tool-is-right-for-your-game/

## 4ツール比較

### Twine
**用途**: インタラクティブフィクション、初心者・趣味プロトタイプ

| 長所 | 短所 |
|------|------|
| 無料で習得が容易 | ゲームエンジン統合に不向き |
| Webベース対話型小説に最適 | 変数・条件機能が限定的 |
| セットアップ最小限 | スケーラビリティの欠如、チーム作業非対応 |

### Yarn Spinner
**用途**: Unity開発者向け、軽量ブランチング

| 長所 | 短所 |
|------|------|
| マークアップ構文が習得しやすい | **Unity専用**（エンジン依存） |
| Unity統合が密接 | 可視化が受動的 |
| フローチャート可視化対応 | 大規模プロジェクトで限定的 |

### Ink
**用途**: 技術的設計者、コード志向の開発者

| 長所 | 短所 |
|------|------|
| 論理表現が強力 | ビジュアル編集機能なし |
| テキスト中心ゲームに適切 | Unity/Unreal限定 |
| 優雅な構文 | 習得曲線が急 |

### NarrativeFlow
**用途**: インディー/AAA向け、本格的なブランチング物語設計

| 長所 | 短所 |
|------|------|
| 完全なビジュアルエディタ | 比較的新しいツール |
| マルチエンジン対応（Unity/Godot/Unreal等） | — |
| リアルタイム論理検証・エラー検出 | — |
| チーム協働・マージ・ローカライズ機能 | — |

## 選定基準

| 要件 | 推奨ツール |
|------|-----------|
| インタラクティブ小説 | Twine |
| Unity軽量統合 | Yarn Spinner |
| コード志向設計 | Ink |
| チーム協働 + 複雑分岐 | NarrativeFlow |
| マルチエンジン対応 | NarrativeFlow |

## 核心メッセージ

「物語作成とブランチング設計は別」という認識が重要。対話作成だけでなく**論理・変数・状態管理・チーム運用**が必要なゲーム開発では、単なるテキストエディタでなく専門設計ツールが必須。

## 注意

この記事はNarrativeFlow提供のため、自社ツールに有利なバイアスの可能性あり。他ツールとの実際のプロジェクト評価を推奨。
