---
name: Claude Code v2.1.126 リリース｜毎日Changelog解説
description: v2.1.126の注目変更点：claude project purge新コマンド・/modelゲートウェイ対応・OAuthターミナル認証・Windows日本語修正
type: reference
---

## 出典

Qiita (@moha0918_): https://qiita.com/moha0918_/items/e3ddb3764b70912ae6c5
公開日: 2026-05-01

## 概要

2026年5月1日リリースのv2.1.126。プロジェクト管理・認証経路・ゲートウェイ互換性が中心。

## 主要な変更点

### 新コマンド: `claude project purge`

プロジェクト単位でtranscripts・設定をまとめて削除できる新サブコマンド。

```bash
# プロジェクト履歴を一括削除
claude project purge --project-id <id>
```

**用途**: 機密プロジェクトのクリーンアップ、ストレージ削減

### `/model`がゲートウェイのモデル一覧を動的取得

`ANTHROPIC_BASE_URL`経由のプロキシ（LiteLLM等）でも実モデル一覧を動的取得可能に。

```bash
# プロキシ経由でモデル一覧を取得
ANTHROPIC_BASE_URL=https://my-proxy/v1 claude
/model  # ゲートウェイの /v1/models を読んで一覧表示
```

### OAuthコードのターミナル貼り付け対応

WSL2・SSH・コンテナ環境でのOAuth認証詰まりを解消。ブラウザを開かずにOAuthコードをターミナルに貼り付けてログイン可能。

### セキュリティ修正

- `--dangerously-skip-permissions`の保護範囲が縮小: `.claude/`・`.git/`・`.vscode/`への書き込みがバイパス対象外に
- 管理ドメイン許可リストの脆弱性修正

### バグ修正

- Windows環境での日本語文字化け修正（27項目のバグ修正を含む）
- UIおよびテレメトリ関連の改善（11項目）

## 注意事項

`--dangerously-skip-permissions`の挙動変更により、`.claude/settings.json`・`.git/`・`.vscode/`への書き込みは**常に確認が必要**になった（CI/CDパイプラインで注意）。
