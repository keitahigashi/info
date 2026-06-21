---
name: Claude Code 週次アップデートまとめ（2026/06/20週）
description: v2.1.183〜185の主要変更点を整理した週次サマリー。破壊的コマンドの自動ブロック・Fable 5一時停止・Tool(param:value)権限構文を解説
type: reference
---

## 出典

Qiita（saitoko）: https://qiita.com/saitoko/items/26250481df51c2bab83e

## 週次アップデートまとめ（2026/06/20週）

### v2.1.185（2026-06-21）

- ストリーム停止時のヒント表示を改善
- 20秒の沈黙後に自動再試行するよう変更

### v2.1.183（2026-06-19）：破壊的コマンドの自動ブロック

auto modeで危険なコマンドに明示的ガードが追加：

**ブロック対象（明示的指示がない限り）**
- `git reset --hard`
- `git checkout -- .`
- `git clean -fd`
- `git stash drop`
- `git commit --amend`（エージェントが作成していないコミットへ）
- `terraform destroy` / `pulumi destroy` / `cdk destroy`

### Fable 5 アクセス全停止（v2.1.177）

- 米国政府の輸出規制指令によりFable 5へのアクセスが一時停止
- モデル選択時は自動的に Opus 4.8 に切り替わる
- 解除時期は不明

### Tool(param:value) パーミッション構文（v2.1.178）

ツール単位から「パラメータ値レベル」での権限制御が可能に：

```
Agent(model:opus)   # Opus モデルのサブエージェント起動のみ許可
```

### その他の主要更新

- `/config key=value` 構文で設定変更が可能に（v2.1.181）
- ネスト `.claude/skills` ディレクトリのサポート追加
- WSL2・Linux サンドボックスの安定性向上
- 非推奨モデルID使用時にstderrへ警告出力
