---
name: OpenAI Codex CLIにゴール永続化が来た！Claude Codeを脅かすMultiAgentV2の全貌
description: OpenAI Codex CLIの2026年5月アップデート「Persisted Goal Workflows」とMultiAgentV2の全貌を解説し、Claude Codeとの機能比較を行うQiita記事。
type: reference
---

## 出典

Qiita (emi_ndk): https://qiita.com/emi_ndk/items/377f89d24b6ea520e90b

## OpenAI Codex CLI MultiAgentV2 vs Claude Code

### Codex CLIの最新アップデート（2026年5月）

#### Persisted Goal Workflows（ゴール永続化）

AIエージェントの作業内容を「永続的に保存」し、途中で中断しても続きから再開できるようになった。

- セッションをまたいで作業状態が保持される
- 長期タスクの中断・再開が可能

#### MultiAgentV2 の改善点

- 明示的なスレッド上限設定と待機時間コントロールを実装
- ルート/サブエージェントの役割が明確化
- 競合する設定は拒否されるようになりエラーが減少

### Claude Code との機能比較

| 機能 | Codex CLI | Claude Code |
|------|-----------|-------------|
| ゴール永続化 | ✅ あり | ❌ なし |
| 途中再開 | ✅ 可能 | ❌ 不可 |
| マルチエージェント | ✅ MultiAgentV2 | ✅ Subagents |
| コード品質 | — | ✅ 優位 |

### 著者の結論

- Claude Code のコード品質はまだ優れており、今すぐの乗り換えは不要
- ゴール永続化は長期タスクで有効だが、コード品質がより重要な場合は Claude Code が適切
- Codex の進化により選択肢が増えたが、用途に応じた使い分けが現実的
