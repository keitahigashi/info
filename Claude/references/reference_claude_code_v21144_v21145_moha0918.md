---
name: Claude Code v2.1.144〜v2.1.145 リリース｜毎日Changelog解説
description: v2.1.144-v2.1.145の新機能・セキュリティ修正・パフォーマンス改善・バグ修正42件を解説。/resumeのbg対応・agents --json・Bash権限バイパス修正など
type: reference
---

## 出典

Qiita (@moha0918_): https://qiita.com/moha0918_/items/2df74a3fd85dcbe60cad

## 公開日

2026年05月19日

## Claude Code v2.1.144〜v2.1.145 リリース内容

### 著者

@moha0918_（毎日Changelog解説シリーズ）

### 新機能

**`/resume` がbackground sessionsに対応**
- `claude --bg` や agent view のセッションも resume picker に表示
- `bg` バッジで通常セッションと識別可能

**`claude agents --json`**
- セッション一覧をJSON形式で出力
- スクリプト化・tmux連携が可能に

**`/model` のセッションスコープ化**
- 現在セッションのみモデル変更（デフォルト更新は分離）
- セッション間での設定汚染を防止

**`/plugin` Discover機能強化**
- インストール前にプラグイン内容を表示
- Browse時のコンテンツプレビューが可能

### セキュリティ修正

**Bash権限プロンプトのバイパス修正**
- allowlist外の環境変数への "bare assignment" がauto-approveされていた脆弱性を修正
- セキュリティ影響：意図しない環境変数変更がユーザー承認なしに実行される可能性があった

### パフォーマンス改善

| 項目 | 改善内容 |
|------|---------|
| API呼び出しタイムアウト | 15秒タイムアウト追加→起動75秒ハング問題を解消 |
| SDK/headless MCP起動 | 最大2秒短縮 |
| spinner軽量化 | VS Codeのレンダリング改善 |

### バグ修正

全42項目（v2.1.145で9項目、v2.1.144で33項目）
- macOSのFull Disk Access問題対応
- Windows PowerShellの互換性問題修正
- その他UI・接続・権限管理の修正

<!-- 日常で得た知見をここに追記 -->
