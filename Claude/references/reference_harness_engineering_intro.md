---
name: ハーネスエンジニアリング入門
description: CLAUDE.mdの次に来るAIエージェント制御パラダイム — 5要素(ルール・スキル・フック・メモリ・フィードバックループ)と段階的導入（Qiita @nogataka）
type: reference
---

## 出典
- URL: https://qiita.com/nogataka/items/d1b3fcf355c630cd7fc8
- 著者: @nogataka
- 公開日: 2026-03-24

## 概要
「AIエージェントの出力品質は構造で守られるべき」という前提で、CLAUDE.mdから進化した「ハーネスエンジニアリング」の概念を解説。ルール・スキル・フック・メモリ・フィードバックループの5要素からなる統合制御システムの構築方法を実運用経験に基づいて提示。

## 詳細

### ハーネスの5要素

1. **ルール（Rules）**: `.claude/rules/`に配置する行動規範。GMO事例では12カテゴリ48ルール管理
2. **スキル（Skills）**: `.claude/skills/<name>/SKILL.md`に定義する再利用可能な手順書（TDD, セキュリティレビュー等）
3. **フック（Hooks）**: イベント駆動の自動実行トリガー
   - PreToolUse: git hook bypass阻止、linter設定保護
   - PostToolUse: 自動フォーマット、型チェック
   - Stop: テスト実行、セッション永続化
4. **メモリ（Memory）**: progress.md形式の進捗管理、意思決定ログ記録
5. **フィードバックループ**: 多層検証（型チェック→リンター→ユニットテスト→構造テスト→E2E）

### 進化3段階

| 段階 | 対象 | 持続性 | 違反検知 |
|------|------|--------|---------|
| プロンプト | 単一応答 | なし | なし |
| コンテキスト | 単一セッション | セッション内 | なし |
| ハーネス | 複数セッション | 永続的 | 自動 |

### everything-claude-code参考実装（GitHub 100K+ Stars）
- 28エージェント役割定義（AGENTS.md）、125+スキル、25+フック
- `harness-optimizer`が設定を自動分析・改善
- 強度調整（minimal/standard/strict）

### 段階的導入アプローチ
- **Day 1**: CLAUDE.mdを書く（30分）
- **Week 1〜2**: 痛みを感じた作業からスキル化（2〜3個）
- **Week 2〜4**: ルール違反が気になったらフック設定
- **継続的**: エスカレーションラダー（3回ルール）— 同じ違反3回でルール強度を1段階上げ（L1:ドキュメント→L2:AI検証→L3:ツール検証→L4:構造テスト）

### フック設定例
```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Edit|Write",
      "hooks": [{ "type": "command", "command": ".claude/hooks/format.sh" }]
    }],
    "Stop": [{
      "hooks": [{ "type": "command", "command": "npm run test" }]
    }]
  }
}
```
