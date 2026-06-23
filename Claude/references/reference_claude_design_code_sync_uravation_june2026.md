---
name: 【速報6月】Claude Design刷新｜Claude Code連携機能の全貌
description: 2026年6月20日公開。Claude DesignとClaude Codeの双方向連携・デザインシステム取込・9プラットフォームコネクタを解説
type: reference
---

## 出典

Uravation（佐藤傑）: https://uravation.com/media/claude-design-june-2026-update-code-sync/

## Claude Design 2026年6月大型アップデート

### 概要

公開日：2026年6月20日。株式会社Uravation代表・佐藤傑による6月のClaude Designアップデート速報。2026年6月17〜18日にかけてリリースされたアップデートで、Claude DesignがClaude Codeとの双方向連携ハブへ進化した内容を解説。

### 主要アップデート5点

#### 1. /design-sync・/design コマンド

```bash
# Claude Codeから直接デザイン作成・同期
/design new landing-page
/design-sync --import=./design-tokens/
```

- Claude Codeから既存コードベースのデザインシステムをClaude Designに取り込み
- 修正したデザインをClaude Codeと逆方向に同期

#### 2. デザインシステム自動検証機能

- 取り込んだデザインシステムのカラー・フォント・スペーシングを自動検証
- 矛盾・未定義変数を検出してレポート

#### 3. PDF・PowerPointエクスポート対応

- デザインをPDF（印刷・提案書用）またはPowerPoint形式でエクスポート
- クライアント向け提案資料として直接使用可能

#### 4. 9プラットフォームコネクタ追加

| カテゴリ | 対応プラットフォーム例 |
|----------|----------------------|
| CMS | Webflow, WordPress |
| EC | Shopify |
| デザイン | Figma |
| ドキュメント | Notion |
| その他 | Adobe, Canva 等 |

#### 5. admin役割によるブランドコントロール

- 組織管理者がブランドカラー・フォント・ロゴを一元管理
- メンバーはブランド外の変更不可に制限可能

### 使用枠の変更

- Claude Design、Claude Code、通常チャットの使用枠が**統一プール**に変更
- 以前はDesign利用でチャット枠が別途消費されていたが、一本化により「Designを使うとチャットが使えなくなる」問題が解消
