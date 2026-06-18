---
name: 【知らないと損】Claude Code の隠し機能5つ｜6月リリースで全部入った神アプデまとめ
description: --safe-mode・/cd・fallbackModel・MAX_THINKING_TOKENS=0・ultracodeの5つの隠し機能解説
type: reference
---

## 出典

Qiita（emi_ndk / Babushka Ai）: https://qiita.com/emi_ndk/items/cc128fc0afaf40346651

## Claude Code 6月の隠し機能5選（2026年6月11日）

### 5つの隠し機能まとめ

| 機能 | 追加バージョン | 概要 |
|------|-------------|------|
| `--safe-mode` | v2.1.169 | カスタマイズ全無効で安全起動 |
| `/cd` | v2.1.169 | キャッシュ保持したままディレクトリ移動 |
| `fallbackModel` | v2.1.166 | モデル過負荷時に自動フェイルオーバー |
| `MAX_THINKING_TOKENS=0` | v2.1.166 | thinking無効化でレスポンス高速化 |
| `ultracode` | v2.1.160 | 大規模エージェント起動キーワード（`workflow`から改名） |

### 各機能の詳細

#### `--safe-mode`（v2.1.169）
```bash
claude --safe-mode
```
- CLAUDE.md・hooks・設定ファイルを全て無視して起動
- 「設定が原因か、モデルが原因か」の切り分けが迅速
- トラブルシュートの第一手として有効

#### `/cd`（v2.1.169）
```
/cd path/to/subproject
```
- プロンプトキャッシュを保持したままディレクトリ移動
- モノレポ内サブプロジェクト間の移動で特に有効
- 従来は `exit` → 再起動が必要でキャッシュ損失が発生

#### `fallbackModel`（v2.1.166）
```json
{
  "fallbackModel": "claude-sonnet-4-6"
}
```
- Opus過負荷時はSonnetで継続
- CIパイプラインの完走率向上に有効
- Fable 5停止時の自動フォールバックにも活用

#### `MAX_THINKING_TOKENS=0`（v2.1.166）
```bash
MAX_THINKING_TOKENS=0 claude
```
- thinking機能を無効化してレスポンス高速化
- 定型作業・繰り返しタスクのコスト削減に有効

#### `ultracode`（v2.1.160）
- 大規模エージェント起動のキーワードが `workflow` から `ultracode` に改名
- 旧キーワード `workflow` は廃止（要注意）

### 追加の小改善
- `disableBundledSkills` — 標準スキルを非表示化（ノイズ削減）
- 設定ファイル書き込み時の確認プロンプト実装
- deny ルールの glob パターン強化
- ストリーミング/アニメーション中のCPU負荷低減
