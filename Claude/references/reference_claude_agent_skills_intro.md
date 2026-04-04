---
name: Agent Skills紹介（MCPとの違い解説）
description: Claude Agent Skillsの概要・MCPとの3つの違い・実装種類・メリット解説（iret.media記事）
type: reference
---

## 出典
- URL: https://iret.media/189465
- 著者: iret.media
- 公開日: 2026年3月頃

## 概要
Agent Skillsを「Claudeの機能を拡張するための再利用可能な専門スキルのモジュール」として解説し、MCPとの明確な違いを3つの観点から説明。

## 詳細

### Agent Skillsとは
指示書、ワークフロー、実行可能なスクリプト、参照データを1つのパッケージとして保存し、関連タスク時に自動呼び出し。

### MCPとの3つの違い

| 観点 | Agent Skills | MCP |
|------|-------------|-----|
| 動作環境 | Claude内の仮想マシン環境 | Claudeと外部システム間の通信規格 |
| 用途 | 内部の振る舞い・処理手順の専門化 | リアルタイムな外部データ取得 |
| トークン効率 | 段階的読み込みで最適化 | 全体読み込み |

### 実装の種類
- **ビルト済みSkills**: Word/Excel/PowerPoint/PDF処理
- **カスタムSkills**: 企業独自のコーディング規約や業務フローを構築可能

### メリット
- 汎用AIを特定分野の専門家に育成
- 繰り返し指示が不要になり業務効率化
