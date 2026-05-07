---
name: Claude Code v2.1.129〜v2.1.131 リリース｜毎日Changelog解説
description: v2.1.129〜v2.1.131の新機能・バグ修正を解説。Prompt cache TTLバグ修正（1h→5min縮小問題）・プラグインURL取得・自動更新対応が主要変更点
type: reference
---

## 出典

Qiita (moha0918_): https://qiita.com/moha0918_/items/ca528c5eaee11b779dbf

## 概要

**公開日**: 2026年5月6日

### 新機能

#### プラグイン URL ロード機能
- `--plugin-url <url>` フラグを追加
- URLからプラグイン.zipアーカイブを現在のセッションに直接適用可能

#### 自動アップデート対応
- 環境変数 `CLAUDE_CODE_PACKAGE_MANAGER_AUTO_UPDATE` を追加
- Homebrew/WinGet 環境でバックグラウンド自動更新と再起動プロンプトに対応

### バグ修正（重要）

#### Prompt cache TTL の修正（重要度高）
- **問題**: 1時間TTLがサイレントに5分へ縮められていたバグ
- **影響**: 長時間セッションでのトークンコスト増加
- **効果**: 修正により長時間タスクのキャッシュ効率が大幅改善

#### 履歴検索の改善
- `Ctrl+R` が全プロジェクト横断検索に復帰
- `Ctrl+S` でプロジェクト絞り込みが可能

#### コンテキスト出力の最適化
- `/context` のASCII ビジュアル出力を削除
- 約**1.6kトークン**の節約効果

#### VS Code Windows 対応
- Windows環境でのVS Code起動失敗を修正
