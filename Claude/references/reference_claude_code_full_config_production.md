---
name: Claude Code完全設定ガイド2026 本番運用全部入り
description: 7層設定アーキテクチャ（CLAUDE.md・Auto Memory・rules・settings.json・Hooks・Skills・MCP）の本番運用テンプレート集
type: reference
---

## 出典
- URL: https://qiita.com/emi_ndk/items/56b2fc8bf4e7ed5ba7f3
- 著者: emi_ndk（Babushka AI）
- 公開日: 2026-02-28

## 概要
「全機能を正しく設定しているエンジニアは1%」として、7層設定の本番運用テンプレートを提供。GitHub連携のセットアップスクリプト付き。

## 詳細

### 7層設定アーキテクチャ
1. **CLAUDE.md**: 「人間が知っていてClaudeがコードから推測できない情報」のみ記載（package.json等から読める情報は書かない）
2. **Auto Memory**: 自動学習システム
3. **.claude/rules/**: 条件ベースのモジュラールールファイル
4. **settings.json**: 権限・ツール設定
5. **Hooks**: ライフサイクル自動化（17イベント種別）
6. **Skills**: カスタムスラッシュコマンド
7. **MCP**: 外部ツール統合

### settings.json権限優先順位（高→低）
Management policy → CLI flags → Project local → Project shared → User local → User shared

### 権限設定例
**許可リスト**: `Bash(pnpm run *)`, `Bash(git status)`, `Bash(gh pr *)`
**拒否リスト**: `Bash(git push --force *)`, `Bash(rm -rf *)`, `Read(.env*)`

### アンチパターン（よくある設定ミス）
- 過剰に寛容なアクセス制御
- 冗長なドキュメント（コードから推測可能な情報の記載）
- Hookのタイムアウト未設定
- 危険なSkillsで`disable-model-invocation`フラグ忘れ

### セットアップスクリプト
`bash <(curl -fsSL https://raw.githubusercontent.com/babushkai/claude-code-config/main/setup.sh)`
で一括プロビジョニング可能
