---
name: 2026/06/15以降に料金体系が変更されたClaudeをどう使うか考えてみた
description: 「2つのおさいふ」分離モデルの詳細解説と、Remote Routine活用・GitHub Actions最適化・Codex併用による実務的コスト対処法。
type: reference
---

## 出典

DevelopersIO（Classmethod）: https://dev.classmethod.jp/articles/claude-2026-pricing-reform-bucket-system/

## Claude 2026年6月15日料金改定 実務対処法

### 公開日
2026年6月15日

### バケットシステムの2分離（「2つのおさいふ」）

| おさいふ | 対象 | 課金方式 |
|---------|------|---------|
| **1（インタラクティブ）** | claude.ai・ターミナル/IDE・Cowork | サブスクリプション枠（変更なし） |
| **2（プログラマティック）** | Agent SDK・`claude -p`・GitHub Actions・サードパーティ統合 | 月次クレジット制（新規） |

### バケット2 月次クレジット付与額

| プラン | クレジット/月 |
|-------|------------|
| Pro | $20 |
| Max 5x | $100 |
| Max 20x | $200 |

### 推奨対処法

**1. Remote Routine優先**
- Remote Routine はバケット1（インタラクティブ）枠を消費
- `claude -p` ではなく Routine として実装することで月次クレジットを温存

**2. GitHub Actions の課金先変更**
```yaml
# APIキー直指定でバケット2のクレジット消費を回避
env:
  ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
```

**3. Claude × Codex 使い分け**
- Claude（設計・思考）: バケット1で利用
- Codex（実装・コード生成）: 別途クレジット活用
- 各ツールの強みに応じた枠の最適活用

### 日中/夜間の推奨構成

| 時間帯 | 推奨ツール |
|-------|-----------|
| 日中 | Claude設計 + Codex実装 + `/loop` + Cowork schedule |
| 夜間 | Remote Routine（バケット1優先）→ Codexクラウド |
| CI | APIキー直指定（バケット2クレジット消費を回避） |

### 注意点

- クレジット繰り越し・プール不可（月次リセット）
- Extra usage OFF 時は本番処理が停止する可能性あり
- opt-in 設定が必要（Anthropicからのメールで実施）

<!-- 日常で得た知見をここに追記 -->
