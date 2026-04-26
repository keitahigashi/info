---
name: Claude Code全コマンド チートシート2026年版
description: スラッシュコマンド40+・CLIフラグ20+・ショートカット18種を網羅した逆引きリファレンス（2026年4月25日更新）
type: reference
---

## 出典

StartLink: https://start-link.jp/hubspot-ai/ai/claude-code-practice/claude-code-cheatsheet

## 記事の概要

2026年4月25日更新。Claude Codeで使用できる全コマンドをスラッシュコマンド・CLIフラグ・ショートカットに分類し、実務用途・逆引きインデックス付きで整理した実践的リファレンス。

## スラッシュコマンド（40+種）カテゴリ

| カテゴリ | 代表コマンド |
|---|---|
| セッション管理 | `/clear`, `/reset`, `/compact` |
| コンテキスト最適化 | `/context`, `/focus`, `/effort` |
| コード差分確認 | `/diff`, `/review` |
| スキル実行 | `/<skill-name>` |
| 設定変更 | `/config`, `/model` |
| 情報表示 | `/help`, `/status`, `/cost` |

## CLIフラグ（20+種）主要一覧

| フラグ | 用途 |
|---|---|
| `--model <id>` | 使用モデルを指定 |
| `--no-interactive` | 非対話モードで実行 |
| `--mcp-config <path>` | MCP設定ファイルを指定 |
| `--permission-mode` | 権限モードを設定 |
| `--output-format` | 出力フォーマット指定 |

## ショートカットキー（18種）

| ショートカット | 動作 |
|---|---|
| `Ctrl+;` | サイドチャット起動（Windows） |
| `Esc` | 実行キャンセル |
| `Tab` | 補完 |
| `↑/↓` | 履歴ナビゲーション |

## 実務活用パターン

- **大規模タスク進行管理**: `/status` + `/focus` の組み合わせ
- **CI/CD自動化**: `--no-interactive` + `--output-format json`
- **コスト管理**: `/cost` での定期確認

## 逆引きインデックスの特徴

「やりたいこと」から逆引きできるインデックスを備え、コマンド名を知らない状態からも目的のコマンドにたどり着ける構成。各コマンドには実務での用途と詳細解説へのリンクが付属。
