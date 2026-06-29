---
name: Claude Code Skills を使いこなす — プラグイン導入から自作スキルまで全部やる
description: Claude Code Skillsの基礎（繰り返しタスク自動化）からプラグインマーケットプレイス、コミュニティスキル、カスタムスキル開発・設定まで体系的に網羅
type: reference
---

## 出典

Zenn (acntechjp): https://zenn.dev/acntechjp/articles/adb97bbc0a7d9c

## Claude Code Skills を使いこなす

## コア概念
"Claude Code に追加できるカスタムコマンド" — 反復的な指示パターンを消去し、マークダウンベースの再利用可能なスキルファイルで実現

## 第1章：スキルの本質

スキルは繰り返し作業の短縮形。例：フォーマット要件を毎回指定する代わりに、`/our-excel`で統一設計基準を自動適用

## 第2章：プラグイン管理

### インストール方法（3パターン）
1. `/plugin`コマンド直接実行
2. Claude Code UIからマーケットプレイス選択
3. 手動git クローン

### 公式マーケットプレイス主要スキル
- **frontend-design**: フロントエンド設計ガイドライン
- **playground**: コード実行環境
- **commit-commands**: Git コミット支援

## 第3-4章：コミュニティスキル

### 主要リソース
- **daymade/claude-code-skills** (37スキル)
  - PowerPoint生成スキル
  - 複数ドキュメント形式対応

- **tfriedel/claude-office-skills**
  - ドキュメント自動化
  - Office連携

- **マーケットプレイス**: skillsmp.com, claudecodeplugins.io

## 第5章：カスタムスキル開発（4実践例）

### 例1：デザインルールExcel生成
```yaml
name: design-rule-excel
description: ユーザー入力に基づき設計ルールExcelを生成
```
`$ARGUMENTS` 変数でユーザー入力をキャプチャ

### 例2：ドキュメント翻訳
位置引数（`$0`、`$1`）で複数言語翻訳を制御

### 例3：環境チェック
埋め込みコマンド（`` !`command` ``）でシェル出力を動的注入

### 例4：自動ルール適用
`user-invocable: false` で自動実行スキルを実装

## 技術設定フロントマター

### 制御フィールド

| フィールド | 機能 | デフォルト |
|---|---|---|
| **name** | コマンド識別子（小文字、ハイフン、64文字以内） | 必須 |
| **description** | 自動起動判定に重要（250文字で起動判定） | 必須 |
| **model** | 特定モデルを指定 | デフォルトモデル |
| **user-invocable** | 手動呼び出し可否 | true |
| **disable-model-invocation** | モデル自動実行禁止 | false |

## キーテイクアウト
"スキルは本質的に『ファイル化されたClaude指示』であり、プログラミング専門知識不要 — 反復指導パターンを構造化ドキュメントとして保存するだけ"
