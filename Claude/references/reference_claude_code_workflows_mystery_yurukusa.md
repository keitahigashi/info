---
name: Claude Code の /workflows が changelog に登場した翌日に GitHub Actions の commit で沈黙の削除—公式の文書と実装の乖離の事例の検証
description: v2.1.147のCHANGELOGに登場したWorkflow tool機能が23時間後にサイレント削除された事件を検証し、公式文書と実装の継続的な乖離パターンを指摘した調査記事
type: reference
---

## 出典

Qiita（@yurukusa）: https://qiita.com/yurukusa/items/b3936d68814783b03e16

## 公開日

2026年5月23日

## /workflows 機能のサイレント削除事件

### 事象の概要

- Claude Code v2.1.147（2026-05-20公開）のCHANGELOG.mdに「Workflow tool」機能が記載された
- 23時間後、GitHub Actions自動コミット（65d44eb134e6）で当該記述が痕跡なく削除
- 公式からの説明・声明なし

### 削除された記述内容

```
- Added the Workflow tool for deterministic multi-agent orchestration.
  It is off by default — set CLAUDE_CODE_WORKFLOWS=1 to enable
- Hardened REPL and Workflow tool sandboxes against prototype-pollution
  and thenable-based escapes
```

Workflow toolは「マルチエージェントの直列連鎖をLLMの判定ではなく決定論的コードで制御する仕組み」として記述されていた。

### 証拠の検証方法

```bash
# GitHub APIで差分確認
curl -sS https://api.github.com/repos/anthropics/claude-code/commits/65d44eb134e6f710e2d9fbcfd4bb977698e476dc | jq '.files[] | select(.filename == "CHANGELOG.md") | .patch'

# 現在のCHANGELOGで存在確認
curl -sS https://raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md | grep -i workflow
```

### 異常シグナル

- npm最新版v2.1.150でバージョン番号が不連続（v2.1.146が欠落、v2.1.145→v2.1.147へ）
- 内部状態の何らかの異常を示唆

## 構造的問題：公文書と実装の乖離パターン

### 確認された同型事例

| 事例 | 内容 |
|------|------|
| Soft Upgrade Pattern | v2.1.140〜145で未文書化の後退動作が複数報告 |
| settings.json沈黙上書き | v2.1.143でリリースノート無記載の変更 |
| auto-compact動作乖離 | 公式文書と実装が矛盾（#50467） |

「単発の事故ではなく構造的な系統」と指摘。Redditの r/ClaudeCode で775点の支持を集めたスレッドが発生。

## 推奨される防衛戦略

### 3つの対策経路

1. **自動検証の実装**：`npx cc-safe-setup` で設定回帰テスト実行
2. **公式文書への依存停止**：実機動作を真実として扱う
3. **履歴記録の自動化**：日次 changelog 保存でサイレント変更を追跡

```bash
# 日次changelog自動保存のcronジョブ例
mkdir -p ~/.claude-code-changelog-history
curl -sS https://raw.githubusercontent.com/anthropic-ai/claude-code/main/CHANGELOG.md \
  > ~/.claude-code-changelog-history/$(date +%Y-%m-%dT%H-%M-%SZ).md
```

### ツール

- Changelog History Viewer（HTML単一ファイル、サーバ不要）で削除履歴追跡が可能

## 結論

- 「公式文書と実装の乖離」は一時的な不具合ではなく継続的パターン
- ユーザー側で能動的な検証体制の構築が必須
- CHANGELOG.mdの変更をGit履歴で監視することが重要な自衛手段

<!-- 日常で得た知見をここに追記 -->
