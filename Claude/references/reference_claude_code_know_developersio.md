---
name: Claude Codeを知る（DevelopersIO 2026年版）
description: Claude vs Claude Codeの違い・基本〜上級機能の体系整理・料金プラン・3ステップ導入ガイド（DevelopersIO記事）
type: reference
---

## 出典
- URL: https://dev.classmethod.jp/articles/shoma-2026-claude-code-know-use-leverage/
- 著者: 小林翔馬（クラスメソッド 製造ビジネステクノロジー部）
- 公開日: 2026-03-20

## 概要
Claude Codeの基礎から上級機能までを体系的に整理した入門記事。Claude（会話型AI）とClaude Code（実行型AI）の明確な比較が特徴。

## 詳細

### Claude vs Claude Code
| 項目 | Claude | Claude Code |
|------|--------|-------------|
| 種別 | 会話型AI | 実行型AI |
| ファイル | 参照のみ | 編集・作成可能 |
| コマンド | 不可 | 実行可能 |
| Git | 不可 | 操作可能 |

### 利用環境
ターミナルCLI、VS Code、JetBrains、Web版、iOS、デスクトップアプリ

### 基本機能
コード作成・編集、バグ特定・修正、Git操作自動化、テスト作成・実行、コード説明・リファクタリング

### 上級機能
CLAUDE.md（永続記憶）、MCP（外部連携）、Hooks、Skills、サブエージェント、エージェントチーム、CI/CD連携、Cowork、セキュリティ機能

### 導入3ステップ（macOS）
1. claude.aiでPro以上登録
2. `curl -fsSL https://claude.ai/install.sh | bash`
3. プロジェクトディレクトリで`claude`入力

### 実使用感
- 実装スピードが大幅に向上し、レビュー役に専念可能
- プロジェクト理解が加速
- プログラミング知識が浅くてもアプリ開発実現
