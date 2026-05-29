---
name: AnthropicがClaude Opus 4.8を発表、Opus 4.7からのアップグレードでコーディング性能と誠実さの向上を実現
description: Claude Opus 4.8がリリース。SWE-Bench Pro 69.2%でGPT-5.5を超え、コード欠陥見落とし率が1/4に低下。Dynamic Workflows・Effort Control搭載
type: reference
---

## 出典

GIGAZINE: https://gigazine.net/news/20260529-anthropic-claude-opus-4-8/

## Claude Opus 4.8 概要

**公開日：** 2026年5月29日

## 主なトピック

- エージェント型コーディング性能の向上
- 「誠実さ」の大幅改善（前世代比で欠陥見落としが約4分の1に削減）
- 複数分野にまたがる推論能力の強化
- Dynamic Workflows機能の研究プレビュー導入
- Effort Control機能の追加
- Messages APIのシステムエントリ拡張

## ベンチマーク数値

| テスト項目 | Opus 4.8 | Opus 4.7 | GPT-5.5 |
|-----------|----------|----------|---------|
| SWE-Bench Pro | **69.2%** | 64.3% | 58.6% |
| Terminal-Bench 2.1 | 74.6% | — | 78.2% |
| Humanity's Last Exam | 49.8% | — | — |
| OSWorld-Verified | **83.4%** | — | — |
| Finance Agent v2 | 53.9% | — | — |

## 新機能

| 機能 | 概要 |
|------|------|
| Dynamic Workflows | Claude Codeで数百の並列サブエージェント実行が可能 |
| Effort Control | 思考深度を5段階で調整（Low〜Max） |
| System Entries | Messages API実行時にシステム指示をリアルタイム更新 |

## 価格情報

| モード | 入力 | 出力 |
|--------|------|------|
| 通常 | $5 / 100万トークン | $25 / 100万トークン |
| Fast Mode | $10 / 100万トークン | $50 / 100万トークン |

※Opus 4.7と同価格。Fast Modeは旧比3分の1に値下げ

<!-- 日常で得た知見をここに追記 -->
