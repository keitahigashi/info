---
name: Claude Opus 4.7 コーディング能力向上（SBbit）
description: Claude Opus 4.7技術分析 — SWE-bench Verified 87.6%・Rakuten-SWE-Bench3倍・xhigh推論レベル・セキュリティ自動保護
type: reference
---

## 出典
- URL: https://www.sbbit.jp/article/cont1/184682
- 著者: ビジネス+IT（SBbit）
- 公開日: 2026-04-17

## 概要
Claude Opus 4.7のコーディング性能向上に焦点を当てたエンタープライズ向け技術分析。SWE-benchスコア、Rakuten-SWE-Benchでの3倍改善、xhigh推論レベル、セキュリティ自動保護機能。

## 詳細

### コーディング性能ベンチマーク
- SWE-bench Verified: 87.6%
- SWE-bench Pro: 64.3%
- Rakuten-SWE-Bench: 本番レベルタスクを「前モデルの3倍の速度」で解決

### ビジョン機能
- 従来: 1568ピクセル（1.15メガピクセル）
- Opus 4.7: 2576ピクセル（3.75メガピクセル）
- 密度の高いスクリーンショットや複雑な図表の認識精度が向上

### 新機能: xhigh推論レベル
- 思考リソース割り当て機能に新レベル追加
- 計算リソースを強化配分し、より深い推論が可能

### 指示追従性の変化
- 「従来モデルより厳格に指示を解釈」
- 既存の実装ではプロンプト再調整が必要になる可能性

### セキュリティ
- リアルタイムのサイバーセキュリティ自動保護を実装
- 利用規約違反リクエストの自動ブロック

### 料金・提供
- 価格据え置き: 入力$5/1Mトークン、出力$25/1Mトークン
- Claude API、Amazon Bedrock、Google Vertex AI、Microsoft Foundryで提供
