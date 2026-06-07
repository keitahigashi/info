---
name: Claude Code利用者がCodexを使い始めるときに最低限やっておきたい設定・コマンド比較まとめ
description: Claude Code（v2.1.168）からCodex（v0.137.0）への移行に必要な設定・コマンド・起動オプションの差異を体系的に整理した実践ガイド
type: reference
---

## 出典

Qiita (@C_HERO / CHI-3): https://qiita.com/C_HERO/items/270cff58c0367affba10

## 対象バージョン
- Claude Code: 2.1.168
- Codex: 0.137.0

## 1. ルールのインポート

CLAUDE.md のルールを Codex でも使う場合、AGENTS.md 内で `@CLAUDE.md` をインポートして参照する構成に変更する。

## 2. スキル（カスタムコマンド）の移行

| 項目 | Claude Code | Codex |
|------|------------|-------|
| プレフィックス | `/` | `$` |
| 管理方法 | シンボリックリンク or コピー | 同左 |

## 3. コマンド比較

### 互換コマンド（両方で使用可）

| コマンド | 機能 |
|---------|------|
| `/clear` / `$clear` | 会話リセット |
| `/model` / `$model` | モデル切り替え |
| `/status` / `$status` | セッション状態確認 |

### Claude Code 独自機能

| コマンド | 機能 |
|---------|------|
| `/rewind` | 過去状態への復帰 |
| `/memory` | 手動メモリ管理（人間がプロジェクトルール記述） |
| `/effort` | 推論品質を5段階設定（low〜max） |
| `/batch` | 並列実行 |
| `/schedule` | 永続スケジュール（最小1時間間隔） |

### Codex 独自機能

| コマンド | 機能 |
|---------|------|
| `$fork` | 会話分岐生成 |
| `$personality` | AI応答スタイル選択 |
| `$memories` | AI自動生成メモリ管理 |

## 4. 起動オプション比較

### 基本起動
```bash
claude /path/to/project     # Claude Code
codex /path/to/project      # Codex
```

### セッション再開
```bash
claude -c                   # Claude Code（短縮形）
claude --resume             # Claude Code（フル）
codex resume --last         # Codex
```

### モデル指定
```bash
claude --model sonnet       # Claude Code（短縮形OK）
codex --model gpt-5.5       # Codex（フルバージョン指定必須）
```

### パーミッション制御
```bash
# Claude Code: 単層構造
claude --permission-mode acceptEdits

# Codex: 2層構造
codex --sandbox workspace-write --ask-for-approval on-request
```

## メモリ管理の思想的違い

| ツール | 方式 | 特徴 |
|-------|------|------|
| Claude Code `/memory` | 人間が明示的にルール記述 | 意図的・一貫性重視 |
| Codex `$memories` | AIがセッションから傾向を自動抽出 | 自動化・蓄積型 |

両者は相補的な設計。プロジェクトの性質に応じて使い分けが有効。

<!-- 日常で得た知見をここに追記 -->
