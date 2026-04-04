---
name: CoDD（整合性駆動開発）
description: Prompt→Context→Harnessの次に来る整合性維持方法論 — 依存グラフ・変更影響分析・Wave順生成でAI設計書の整合性を自動保証（Zenn おしお）
type: reference
---

## 出典
- URL: https://zenn.dev/shio_shoppaize/articles/shogun-codd-coherence
- 著者: おしお (@shio_shoppaize)
- 公開日: 2026-03-29

## 概要
ハーネスエンジニアリングの未踏領域「設計変更時の整合性維持」を解く新方法論CoDD（Coherence-Driven Development）を提唱。実案件LMS開発で設計書18本・全コード・全テストを自動生成した実績あり。

## 詳細

### AI開発方法論の進化
1. プロンプトエンジニアリング（2023〜2024）: 単発の入力最適化
2. コンテキストエンジニアリング（2024〜2025）: CLAUDE.md等の永続的文脈管理
3. ハーネスエンジニアリング（2025〜2026）: Hook・Skill・ルール宣言によるAI制御
4. **CoDD（2026〜）**: 依存グラフによる整合性の自動保証

### CoDDコア機能
```
codd scan                    # 依存グラフ構築
codd impact --diff HEAD~1   # 変更影響分析
codd validate               # 整合性検証
```

### Wave概念（波状処理）
設計書を上流→下流へ依存順で処理:
- Wave 1: 要件定義（依存先なし）
- Wave 2: 基本設計
- Wave 3: 詳細設計・API設計
- Wave 4: テスト戦略・インフラ設計

### フロントマター（各設計書のYAMLヘッダ）
```yaml
codd:
  node_id: "design:api-design"
  depends_on:
    - id: "design:system-design"
      relation: derives_from
    - id: "req:lms-requirements-v2.0"
      relation: implements
```

### Claude Code統合
- Skills: `/codd-init`, `/codd-scan`, `/codd-impact`, `/codd-generate`, `/codd-validate`
- PostToolUse Hook: Edit|Write時にcodd scan自動実行

### 影響分析の3帯域プロトコル
- **Green**: 高信頼度→自動更新可能
- **Amber**: 中信頼度→人間確認必須
- **Gray**: 低信頼度→参考情報

### 導出原則（Derive, Don't Configure）
上流設計が下流を決定。例: system_designに"Next.js + Supabase"→テスト戦略はvitest+Playwright自動導出。

### 方法論比較
| 評価軸 | バイブコーディング | ハーネス | CoDD |
|-------|----------------|--------|------|
| 初速 | ◎最速 | ○中程度 | △遅い |
| 変更耐性 | ✕全作り直し | △人間が追う | ◎自動特定 |
| 大規模対応 | ✕破綻 | ○制御可能 | ◎スケール |

### インストール
`pip install codd-dev` / GitHub: https://github.com/yohey-w/codd-dev
