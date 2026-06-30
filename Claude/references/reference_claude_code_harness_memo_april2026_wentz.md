---
name: Claude Codeのハーネスエンジニアリングに関する備忘録（2026年4月）
description: Claude CodeハーネスのCLAUDE.md・Hooks・Skills等の設定を定期監査し最適化する実践ガイド
type: reference
---

## 出典

Wentz Design: https://wentz-design.com/post/claude-code-harness-engineering-memo-2026-04/

## ハーネスエンジニアリングの本質

- プロンプトエンジニアリングは1回の入出力を最適化する手法
- ハーネスエンジニアリングはエージェントの全体的な運用環境を対象（CLAUDE.md、settings.json、Hooks、Skills、Auto Memory、MCPサーバー）
- 従来の設定は新機能・モデル改善で陳腐化するため定期的な監査が必要

## Claude Codeハーネスの5大コンポーネント

| コンポーネント | 目的 | 備考 |
|---|---|---|
| CLAUDE.md | ビルド手順・プロジェクト固有ルール | ガイダンス向け |
| Auto Memory | 作業中に自動蓄積されるプロジェクト知識 | 手動知識入力を置き換え |
| Hooks | 特定のライフサイクル時点で実行される自動処理 | 確実に実行される |
| Skills | 必要時に文脈的に読み込む参照情報 | 条件付き読み込み |
| settings.json | パーミッション、モデル選択、ツールアクセス制御 | 確実に実行される |

## 確率的制御 vs. 決定論的制御

- **CLAUDE.mdの指示は絶対ではない**（AIの確率的処理）
- **Hooks と settings.json の拒否ルールは確実に実行される**（決定論的）
- 危険な操作を防ぐルールはHooks/パーミッションに配置すべき

## 設定が陳腐化する例

- Auto Memoryが手動知識入力を置き換え → CLAUDE.mdへの手動記述が不要に
- Hooksが反復的なプロンプト指示を不要化（例：Prettier自動フォーマット）
- モデル改善により基本動作の指示が効力喪失

## 監査タイミングの目安

- 大規模Claude Code更新時
- CLAUDE.mdが200行を超えた時点
- 同じ問題が繰り返し発生している
- 書かれたルールが実行されていない兆候
