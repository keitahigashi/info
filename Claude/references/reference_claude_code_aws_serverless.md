---
name: Claude Code AWS サーバーレス開発高速化
description: 大規模AWSサーバーレスプロジェクト（TypeScript 3万行・Lambda 20+・Terraform 170+）でClaude Codeを導入し開発生産性を向上させた実践事例
type: reference
---

## 出典
- URL: https://zenn.dev/geneg/articles/claude-code-aws-serverless
- 著者: seigen（AWSサーバーレスアーキテクチャ設計・開発・運用エンジニア）
- 公開日: 2026-03-27

## 概要
大規模AWSサーバーレスプロジェクトでClaude Codeを導入し、Lambda関数追加・Terraform生成・テストコード作成の各工程で大幅な時間短縮を実現した実践レポート。「CLAUDE.mdの質 = 生成コードの質」という相関性を強調し、プロジェクト規約の設計が最重要投資であると論じている。

## 詳細

### プロジェクト規模
- TypeScript 30,000行以上
- Lambda関数: 20個以上
- Terraformファイル: 170個以上
- 環境: dev/stg/prd の3環境完全分離
- DB: DynamoDB + Aurora PostgreSQL
- 非同期処理: SQS FIFO / EventBridge / Step Functions

### Claude Codeが効くポイント4つ

**1) Lambda関数の雛形生成**
既存関数を参照させた上で新規関数を作成指示。生成コードに含まれる要素:
- エントリーポイント（handler）
- リクエストバリデーション
- DynamoDB/RDSアクセス
- エラーハンドリング
- OpenTelemetry Log Data Model準拠の構造化ログ（SeverityNumber: DEBUG=5, INFO=9, WARN=13, ERROR=17）

**2) Terraformモジュール生成**
170ファイル以上のコードベースから既存パターンを踏襲したTerraformコードを自動生成:
- Lambda関数リソース
- IAMロール・ポリシー（最小権限設計）
- API Gatewayルート追加
- CloudWatch Logs設定
- SQSイベントソースマッピング

**3) テストコード生成**
テスト方針をCLAUDE.mdに記載し、適切な粒度でテスト生成:
- `aws-sdk-client-mock` でのモック
- 処理ロジックの分岐にフォーカス
- 型定義やラッパー関数のテストは生成しない

```typescript
describe("processOrder", () => {
  it("DynamoDB から認可情報を取得して SQS にジョブを送信する", async () => {
    ddbMock.on(GetItemCommand).resolves({
      Item: marshall({ userId: "user-001", role: "admin" }),
    });
    sqsMock.on(SendMessageCommand).resolves({ MessageId: "msg-001" });
    const result = await handler(createTestEvent({ action: "process" }));
    expect(result.statusCode).toBe(202);
  });
});
```

**4) 仕様駆動開発との組み合わせ**
Requirements → Design → Tasks → Implementation の段階的ワークフローで、各フェーズで人間がレビュー・承認。仕様ズレの早期検出と手戻り削減を実現。

### CLAUDE.md設計（最重要投資）
記載すべき内容:
- プロジェクト概要とアーキテクチャ
- ディレクトリ構成
- コーディング規約（ログ、エラーハンドリング、命名規則）
- テスト方針（何をテストするか明文化）
- Terraformモジュール構成ルール
- API設計標準（エラーレスポンス形式など）

### 生産性向上の実測値

| 項目 | 従来 | Claude Code導入後 |
|------|------|-----------------|
| Lambda関数追加 | 数時間 | 30分〜1時間 |
| Terraformリソース追加 | 1時間以上 | 15分〜30分 |
| テストコード作成 | 1時間以上 | 15分〜30分 |

### 失敗パターン（避けるべき）
- CLAUDE.mdなしで使用（修正コストが増加）
- 生成結果のレビュー省略（特にIAMポリシー）
- 複雑なビジネスロジックの一発生成（段階的進行が効率的）
