---
name: "Claude Code v2.1.163 新機能とバグ修正：バージョン強制機能が追加"
description: 組織ガバナンス向けのバージョン強制機能、/plugin list コマンド、Stop/SubagentStop フック改善、CI/CD 利用者に影響する claude -p ハング修正を解説（Qiita / picnic, 2026-06-05）
type: reference
---

## 出典

Qiita (picnic): https://qiita.com/picnic/items/0e8844c6590cb7dd838a

## 主な新機能

### バージョン強制機能（組織ガバナンス）

managed settings で使用可能バージョン範囲を指定できるようになった。

```json
{
  "requiredMinimumVersion": "2.1.163",
  "requiredMaximumVersion": "2.1.200"
}
```

- 承認済みバージョン外では Claude Code 起動時に拒否メッセージを表示
- 承認済みバージョンへのアップデートを案内
- セキュリティ審査済みバージョン以外の使用を組織として禁止可能

**対象**: セキュリティポリシーが厳格な組織・エンタープライズ利用者

### `/plugin list` コマンド

インストール済みプラグインを一覧表示するコマンドが追加。

```bash
/plugin list            # 全プラグインを一覧
/plugin list --enabled  # 有効なもののみ
/plugin list --disabled # 無効なもののみ
```

### Stop/SubagentStop フック改善

`additionalContext` でフックエラーを発生させずに Claude へフィードバックを提供できるようになった。

```json
{
  "additionalContext": "テスト失敗: 修正が必要な箇所が見つかりました"
}
```

## 主なバグ修正

| 修正内容 | 影響範囲 |
|---------|---------|
| `claude -p` のハング問題 | v2.1.154〜v2.1.162 の CI/CD 利用者に影響大 |
| `$TMPDIR` 上書き退行 | v2.1.154 から混入した回帰バグ |
| Bedrock/Vertex/Foundry API キーエラー | クラウドプロバイダー経由利用者 |
| Windows OneDrive 配下でのエラー | OneDrive 同期フォルダを利用している場合 |

**CI/CD 利用者は v2.1.163 以降への早期更新を推奨**（`claude -p` ハング問題の修正）

## アップデート方法

```bash
claude update
```

<!-- 日常で得た知見をここに追記 -->
