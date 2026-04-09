---
name: multi-agent-shogunマルチエージェント並列開発
description: Claude Code×tmuxで9体AIエージェント階層構造（将軍/家老/足軽）・イベント駆動・自律ガバナンス構築の実践事例
type: reference
---

## 出典
- URL: https://zenn.dev/shio_shoppaize/articles/5fee11d03a11a1
- 著者: おしお (@shio_shoppaize)
- 公開日: 2026-01-25（最終更新: 2026-03-16）

## 概要
Claude Code × tmuxを使ったマルチエージェントシステム「multi-agent-shogun」の開発事例。戦国時代の軍制をモチーフにした階層構造（将軍1・家老1・足軽8）で、人間は判断のみ・AIが自律的に動作する。AIが自発的にバグ修正・ルール追加・Skills提案まで行った実践報告。

## 詳細

### システム構成
- **将軍**（Claude Code）: 戦略統括
- **家老**（Claude Code）: タスク分解・展開
- **足軽**（Claude Code ×8）: 並列実行
- 環境: Windows PC + WSL2 + tmux

### tmuxウィンドウ構成
```
0:shogun    （将軍用）
1:karo      （家老用）
2:ashigaru  （足軽×8、8ペインに分割）
```

### 重要な技術パターン

**send-keysの2回分割ルール**
```bash
# ❌ 動かない
tmux send-keys -t multiagent:0.1 "メッセージ" Enter

# ✅ 正解
tmux send-keys -t multiagent:0.1 "メッセージ"
tmux send-keys -t multiagent:0.1 Enter
```

**YAMLベース通信**（JSONより人間がデバッグしやすい）
```yaml
task_id: "task_001"
command: "create_file"
target: "hello1.md"
content: "# Hello World"
```

### イベント駆動設計
- ポーリング方式（9体×5秒=108回/分）ではAPI消費が破綻
- イベント駆動で待機中のAPI消費をゼロに
- Claude Max ×5（月額$100）→ 後にMax ×20（月額$200）で運用

### 自律ガバナンス構築エピソード
- **自己デバッグ**: 足軽が全タスク実行 → 将軍が「最小権限の原則」に基づきYAML分割を自発提案
- **独自ルール追加**: 将軍が「自分のタスクのみ実行せよ（違反は切腹）」と指示書を自主改修
- **ルール違反検知**: send-keys 2回分割ルール違反を検知し自動是正
- **全軍周知**: 各エージェントに新ルール理解度を確認し「全軍、実戦投入準備完了」と報告

### Skills自動生成
将軍が繰り返し作業パターンを検知 → Web検索（17秒）→ 公式ドキュメント分析（255KB）→ 既存Skillとの重複確認 → Skill化提案

### ダッシュボード
- VSCodeでMarkdownプレビュー（status/dashboard.md）を監視
- tmuxイベント駆動とは独立したリアルタイム更新

### 人間の役割
実際の入力: 「テストして」「お願いします」「やっといて」+ 対応案選択（A or B）のみ。判断だけで手を動かさない。

### ナレッジ自動形式知化
仕事を投入するだけでSkillsが蓄積 → 退職時もポータブルな資産として残存。Claude.ai・API・他AIツールでも再利用可能。
