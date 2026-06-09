---
name: Claude Fable 5 & Mythos 5 ベンチマーク比較
description: Digital Appliedによる詳細なベンチマーク比較。競合モデル（GPT-5.5、Gemini）との性能対比を含む
type: reference
---

## 出典

Digital Applied: https://www.digitalapplied.com/blog/claude-fable-5-mythos-5-release-benchmarks-2026

## Claude Fable 5 & Mythos 5: ベンチマーク詳細

**タイトル:** Claude Fable 5 & Mythos 5: The Frontier, Split in Two  
**公開日:** 2026年6月9日

### 主要ベンチマーク結果

| ベンチマーク | Fable 5 / Mythos 5 | Opus 4.8 | GPT-5.5 | Gemini 3.1 Pro |
|------------|-------------------|----------|---------|---------------|
| SWE-Bench Pro（コーディング） | 80.3% | 69.2% | 58.6% | 54.2% |
| GDPval-AA（知識作業） | 1932 | 1890 | — | — |
| Hexベンチマーク（分析） | >90% | — | — | — |
| ExploitBench（サイバーセキュリティ）※ | 78.0% | — | — | — |
| Blueprint-Bench 2（空間推論） | 38.6% | — | — | — |
| 法務タスク | 13.3% | — | — | — |

※ ExploitBenchはMythos 5のスコア。**Fable 5は安全装置によりサイバーセキュリティ領域ではOpus 4.8相当の性能に制限される点が重要。**

### 「フロンティアを二分割」という設計思想

- **Fable 5**: 一般公開向け。コーディング・知識作業で競合をリード。危険領域はフォールバック
- **Mythos 5**: 制限なし版。サイバーセキュリティ・バイオの最高性能が解禁。限定パートナーのみ

### コーディング性能の競合比較

SWE-Bench Proでの優位性:
- Fable 5 **80.3%** > Opus 4.8 69.2% > GPT-5.5 58.6% > Gemini 3.1 Pro 54.2%
- コーディングタスクでの差は**10〜26%ポイント**と大きく、Claude Codeとの組み合わせで実用的な差が出る

### 価格対性能

| モデル | 入力/1Mトークン | 出力/1Mトークン |
|--------|---------------|---------------|
| Fable 5 / Mythos 5 | $10 | $50 |
| Opus 4.8 | $5 | $25 |
| （参考）Opus 4.7 | $3 | $15 |

SWE-Bench Proで11%ポイント向上に対してコストは2倍。大規模コード移行（Stripe事例：2カ月→1日）では価格差を大幅に上回るROIが期待できる。
