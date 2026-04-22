---
name: Harness最適化完全ガイド7軸70点満点
description: everything-claude-code(ECC)のHarness Audit 7カテゴリ（Tool Coverage・Context・Quality Gates・Memory・Eval・Security・Cost）による定量評価
type: reference
---

## 出典
- URL: https://qiita.com/hisaho/items/3e1a29bc8b265616614f
- 著者: hisaho (Hisaho Nakata)
- 公開日: 2026-03-29

## 概要
GitHub 60,000+ Stars OSSプロジェクト「everything-claude-code（ECC）」のHarness Audit 7カテゴリに基づき、AIコーディングエージェントの出力品質を体系的に定量評価・最適化する手法を解説。

## 詳細

### 7軸評価フレームワーク（70点満点）
| # | カテゴリ | 配点 | 主要評価項目 |
|---|---------|------|------------|
| 1 | Tool Coverage | 10pt | Hooks・Agents・Skills・Commandsの数と整合性 |
| 2 | Context Efficiency | 10pt | 200Kトークンのコンテキスト効率利用 |
| 3 | Quality Gates | 10pt | テスト・検証パイプライン充実度 |
| 4 | Memory Persistence | 10pt | セッション間メモリ永続化 |
| 5 | Eval Coverage | 10pt | 評価フレームワーク整備度 |
| 6 | Security Guardrails | 10pt | セキュリティチェック機構 |
| 7 | Cost Efficiency | 10pt | コスト最適化の仕組み |

### コスト最適化設定例
```json
{
  "model": "sonnet",
  "env": {
    "MAX_THINKING_TOKENS": "10000",
    "CLAUDE_AUTOCOMPACT_PCT_OVERRIDE": "50",
    "CLAUDE_CODE_SUBAGENT_MODEL": "haiku"
  }
}
```
- sonnet変更でコスト約60%削減（日常タスク約80%カバー）
- MAX_THINKING_TOKENS 31,999→10,000で内部推論約70%削減
- サブエージェントをhaikuで実行

### ECCツール群の規模
- agents/: 30定義（言語レビュアー・ビルド解析等）
- skills/: 135定義（TDDワークフロー・セキュリティレビュー等）
- commands/: 60定義（/tdd・/plan・/code-review・/build-fix等）

### Harness Audit実行
```bash
node scripts/harness-audit.js           # 全体評価
node scripts/harness-audit.js --format json  # CI/CD統合用
```

### 核心思想
「エージェントの完了品質を向上させるには、プロダクトコードではなくHarness設定を改善する」— 同じモデルでも環境設計で劇的に異なる出力品質を実現可能。
