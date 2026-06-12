---
name: Anthropicの新モデル「Claude Fable 5 & Mythos 5」を徹底解説
description: Fable 5とMythos 5の違い・ベンチマーク・セーフガード機構・LLMOps課題を網羅したZenn徹底解説記事
type: reference
---

## 出典

Zenn（galirage）: https://zenn.dev/galirage/articles/claude-fable-5

## Fable 5 & Mythos 5 徹底解説（2026年6月10日）

### モデルの位置づけ

| モデル | 区分 | 対象 |
|--------|------|------|
| Claude Fable 5 | 最初に一般提供されたMythos級モデル（セーフガード付き） | 一般向け |
| Claude Mythos 5 | 同一モデルからセーフガード一部解除版 | Project Glasswing限定 |

中身は同じ、ガードの有無だけが異なる設計。

### セーフガード機構

- **クラシファイア方式**：サイバーセキュリティ、生物・化学、蒸留領域を検出
- 発動率は「セッション全体の5%未満」
- ブロック時はClaude Opus 4.8へ自動フォールバック
- ユーザーへの通知あり、出力生成前の拒否は課金対象外

### ベンチマーク成績

| ベンチマーク | スコア |
|-----------|--------|
| SWE-bench Verified | 95.0% |
| SWE-bench Pro | 80.3% |
| OSWorld-Verified | 85.0% |
| FrontierCode Diamond | 29.3% |

### API実装上の特徴

- コンテキストウィンドウ：標準100万トークン
- 最大出力：128Kトークン/リクエスト
- 思考モード：アダプティブシンキング常時オン
- `stop_reason: "refusal"` でクラシファイア拒否を検知

### 価格と提供形態

- **入力$10 / 出力$50**（100万トークンあたり）
- Mythos Preview比で50%以下の値下げ
- API、Claude Platform on AWS、Amazon Bedrock、Vertex AI、GitHub Copilotで提供

### LLMOpsの新課題

- フォールバック発生（5%）を監視・ログ記録する必要性
- 実際の応答モデルがAPIレベルで切り替わる可能性への対応が必須

### 科学研究での成果

- 創薬プロセスの約10倍高速化達成
- 新規科学仮説の生成が初めて実現（社内科学者の80%が支持）
- 138種動物のシングルセルゲノミクス分析を自律実行

### 国防・重要インフラへの拡大

Project Glasswing約50社から15カ国超150組織へ拡大。重要インフラアクセスにはセキュリティ審査が必須化。
