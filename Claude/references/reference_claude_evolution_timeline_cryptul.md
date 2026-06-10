---
name: Claude・Claude Code 進化の年表｜2023年から2026年6月まで
description: AnthropicのClaude/Claude Codeの進化を「モデル世代」と「エコシステム拡張」の二軸で2023年〜2026年6月まで時系列整理した年表記事
type: reference
---

## 出典

Cryptul Insights: https://cryptul.co.jp/insights/articles/009-claude-evolution-timeline

## Claude・Claude Code 進化の年表（2023〜2026年6月）

### 基本情報
- 公開日: 2026年5月9日（最終更新: 2026年6月10日）
- 運営: 株式会社クリプタル（Cryptul Insights）

---

## 時系列アップデート

### 2021〜2023年：Anthropic設立と初期モデル
- Anthropic設立（元OpenAI研究者チーム）
- Claude 1 リリース（2023年3月）

### 2024年：Claude 3ファミリーとMCP
- **Claude 3ファミリー登場**（2024年3月）：3サイズ戦略確立
  - Haiku：軽量・高速
  - Sonnet：中位・コスト対性能主力
  - Opus：最大規模・複雑タスク向け
- **Model Context Protocol (MCP)** 公開（2024年11月）：「AI向けのUSB-C」と表現される統一プロトコル

### 2025年前半：Claude 3.7・Claude Code登場
- Claude 3.7 Sonnet リリース
- Claude Code の初期バージョン公開

### 2025年後半：Claude Code拡張機能
- **Subagents**（2025年7月）
- **Hooks**（2025年9月）
- **Plugins・Skills**（2025年10月）

### 2025末〜2026春：Opus 4.5〜4.8とAgent Teams
- Opus 4.5、4.6、4.7、4.8 と段階的アップデート
- **Agent Teams**（2026年2月）：マルチエージェント協調

### 2026年春：Code with Claude 2026
- **SpaceX Colossus 1提携**（GPU 220,000個）
- **Managed Agents**: Dreaming・Outcomes・Multi-agent Orchestration
- **Auto Mode**：セーフな操作は自動進行、リスク操作だけ人間承認
- **Dynamic Workflows**（2026年5月）：最大1,000並列実行

### 2026年初夏：Claude Fable 5の一般公開（2026年6月9日）
- SWE-bench Verified 95.0% 達成
- フォールバック設計：高リスク領域はOpus 4.8が代わりに応答
- **Claude Mythos 5**：分類器なし版（限定提供）

---

## パフォーマンス進化

| 時期 | モデル | SWE-bench Verified |
|------|--------|-------------------|
| 2024年6月 | Claude 3.5 Sonnet | 33.4% |
| 2025年 | Opus 4.x 系 | 段階的向上 |
| 2026年6月 | Claude Fable 5 | 95.0% |

2年間で約2.8倍の性能向上。

---

## 主要コマンド・機能（2026年6月時点）

| コマンド | 機能 | 対応バージョン |
|---------|------|-------------|
| `/goal` | コンプリーション条件ドリブン自走 | v2.1.139〜 |
| `/model fable` | Fable 5切り替え | v2.1.170〜 |
| `/usage` | プラン上限内訳表示 | 最新版 |
| `/workflows` | Dynamic Workflows実行管理 | 最新版 |

---

## 料金体系（2026年6月時点）

| モデル | 入力 | 出力 | 単位 |
|--------|------|------|------|
| Claude Fable 5 | $10 | $50 | 100万トークン |
| Claude Opus 4.8（標準） | $5 | $25 | 100万トークン |
| Opus 4.8（Fast Mode） | $10 | $50 | 100万トークン |

---

## 今後の要チェックポイント

- Outcomesの Claude Code対応時期
- Dreamingの一般提供への移行
- Routinesの料金体系確定
- Advisor戦略（Opus助言・Sonnet実行）の標準化
- Mythos 5の利用範囲拡大

<!-- 日常で得た知見をここに追記 -->
