---
name: Claude Agent SDK でマルチエージェントを動かしてみよう ── 便利さと、いくつかのハマりポイント
description: Agent SDKのマルチエージェント実装でハマりやすい5つの落とし穴（disallowed_toolsスコープ・tool_use_id不一致等）を実例付きで解説
type: reference
---

## 出典

note / 川原武伸（Japan Digital Design, Inc. M-AIS）: https://note.com/japan_d2/n/nfd255663d7d7

## Claude Agent SDK マルチエージェント実践（2026年5月12日）

### 概要
Agent SDKを使ったオーケストレータ+サブエージェント構成の実装方法と、実際のプロジェクトで遭遇した5つのハマりポイントを解説。

### マルチエージェント構成の基本
オーケストレータとサブエージェントをPython辞書で宣言的に記述可能。`AgentDefinition` と `ClaudeAgentOptions` を使い簡潔に構成できる。

### receive_response() で流れるメッセージ5種類
- AssistantMessage / ToolUseMessage / TaskNotification / TaskStartedMessage / TaskProgressMessage

### ハマりポイント5選

| # | 問題 | 解決策 |
|---|------|------|
| 1 | `disallowed_tools` のスコープがサブエージェント全体に適用 | `AgentDefinition.disallowedTools` で個別設定 |
| 2 | `TaskStartedMessage` にエージェント名がない（`task_type`は"local_agent"固定） | HookマッピングでID→エージェント名対応表作成 |
| 3 | `tool_use_id` 形式不一致（Hook=UUID形式、ストリーム=Bedrock形式） | 両形式をマッピングテーブルに登録 |
| 4 | HookとストリームのID登録タイミングがずれる（非同期） | 多段フォールバック設計（Hook→ToolUseBlock→description→unknown） |
| 5 | サブエージェント内のツール呼び出しが不可視 | MCPサーバー側にログ機構を追加して代替 |

### 重要な仕様：SubagentStopのHook

サブエージェントの最終出力テキストはイベントストリームだけでは取得不可。`SubagentStop` フックの `last_assistant_message` からのみ取得できる。

```python
from claude_agent_sdk import HookMatcher

hooks = {
    "PreToolUse": [HookMatcher(matcher=None, hooks=[on_pre_tool_use])],
    "SubagentStart": [HookMatcher(matcher=None, hooks=[on_subagent_start])],
    "SubagentStop": [HookMatcher(matcher=None, hooks=[on_subagent_stop])],
}
```

### AI コーディングエージェント活用の教訓
Claude Code自体がAgent SDK仕様を十分理解できず力技実装→手戻りが発生。新規ライブラリ使用時の推奨フロー：
1. ドキュメント精読 → 2. PoCスクリプト → 3. 理解の言語化 → 4. 本実装
