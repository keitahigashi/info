---
name: Claude Code組織導入セットアップガイド
description: 組織展開時の4層設定（Managed/Local/Project/User）・3パターンテンプレート（エンジニア・非エンジニア・Managed）・Hookスクリプト実装
type: reference
---

## 出典
- URL: https://zenn.dev/seeda_yuto/articles/claude-code-org-setup-guide
- 著者: yuto[SEEDA]
- 公開日: 2026-04-12

## 概要
メルカリ・Goodpatch事例を基に、Claude Codeを安全に組織展開するための設定方法を3パターンのテンプレートで解説。「設定を整えてから配った」アプローチが成功の鍵。

## 詳細

### 設定の4層構造（優先順位順）
1. **Managed**: システム全体強制設定（IT部門配布）— 誰にも上書きされない不変性
2. **Local**: 個人用リポジトリ設定（gitignore対象）
3. **Project**: リポジトリ共有設定（git管理）
4. **User**: ユーザー個人設定

### パターン1: エンジニア向け
- `npm run *`・git操作をallow
- `rm -rf /`・`sudo`・`.env`読み取りをdeny
- 3種Hookスクリプト: 危険コマンドブロッカー・シークレットスキャナー・自動リンター

### パターン2: 非エンジニア向け
- 許可コマンドを`dev`/`build`/`start`に限定
- Writeをallowに含めず、ファイル変更時は確認ダイアログ強制

### パターン3: Managed設定
- `/etc/claude-code/managed-settings.json`で全マシン適用
- `disableAutoMode: "disable"`で自律実行を初期段階で無効化
- `companyAnnouncements`で全社ガイドライン周知

### セキュリティHook実装
- **危険コマンドブロッカー**: fork爆弾・本番SSH・`.env`読み取り検知
- **シークレットスキャナー**: AWS Key・OpenAI/Anthropic APIキー・GitHub Token・秘密鍵の正規表現検出
- **自動リンター**: ファイル書き込み後ESLint/Prettier自動実行

### 導入ステップ（3日間）
- Day 1: パターン1をリポジトリに配置
- Day 2: パターン2を別環境でテスト
- Day 3: パターン3をIT部門と協調デプロイ
- 段階的アプローチ: 小規模チーム→調整→横展開

### テスト実績
提供Hookスクリプトは20件のテスト全PASS確認済み
