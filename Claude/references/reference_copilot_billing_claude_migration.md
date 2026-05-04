---
name: GitHub Copilot 従量課金化：Pre-PR Self Review × cross-model 視点分離で Claude Code + Codex CLI へ移行した話
description: GitHub Copilotが2026年6月にAI Credits課金へ移行することを受け、Claude Code + Codex CLIによるローカル完結クロスモデルコードレビュー体制への移行手順と設計を解説
type: reference
---

## 出典

Qiita (@akatsuki39): https://qiita.com/akatsuki39/items/aea601a3680b20882f5b

## 記事内容の構造化要約

### 背景：GitHub Copilot課金体系変更（2026年6月1日）
- **PRU廃止 → AI Credits**に移行（従量課金化）
- **1 credit = $0.01 USD**
- プラン別クレジット付与:
  - Pro: $10/月
  - Pro+: $39/月
- Code Reviewは「AI Credits + GitHub Actions分」の二重消費
- **Pro からOpusモデルが削除**（Pro+ のみ残存）

### 著者の問題認識
- 「1レビューのコスト予測が構造的に不可能」
- モデル自動選択かつトークン消費が変動するため試算幅が大きい
- 「1レビューあたり20〜43回程度実行可能」という不確かな見積もりしかできない

### 提案：Pre-PR Self Review（ローカル完結クロスモデルレビュー）

#### 概念
- CIで他人にレビューを頼む前に、ローカルで自己完結したコードレビューを実施
- Claude Code + Codex CLIを組み合わせて「異なるモデルの視点」で相互補完

#### クロスモデル視点分離の仕組み
| ロール | ツール | 視点 |
|---|---|---|
| 1st reviewer | Claude Code（Opus 4.7） | 設計・意図・リファクタリング観点 |
| 2nd reviewer | Codex CLI | セキュリティ・パフォーマンス・エッジケース |
| 差分統合 | 人間 | 相互の見落としを補完 |

#### 実装フロー
```bash
# 1. Claude Codeによる設計レビュー
claude review --focus=design,readability

# 2. Codex CLIによるセキュリティ・パフォーマンスレビュー
codex review --focus=security,performance

# 3. 差分を人間がマージしてPR作成
```

### コスト比較（月次試算）
| ツール | 方式 | 月額目安 |
|---|---|---|
| GitHub Copilot Pro+ | AI Credits | $39（上限あり） |
| Claude Code（API） | トークン従量 | $20〜100（使用量次第） |
| Claude Code（Max） | サブスク | $100/月（ほぼ無制限） |
| Codex CLI | トークン従量 | $5〜30（補助的利用） |

### 移行判断の基準
- **Copilot継続が有利**: IDEシームレス統合を重視・チーム全員がCopilotを使用中
- **Claude Code移行が有利**: コードレビュー品質重視・ローカル実行を好む・API制御が必要
- **ハイブリッドが有利**: 大規模チームで役割分担が明確・コスト最適化優先

### 注意点
- クロスモデルレビューは時間コスト（2回実行）が増える
- Copilot廃止ではなく「用途別使い分け」が現実的
- Pre-PR Self Reviewを習慣化することでCI後の手戻りを削減できる
