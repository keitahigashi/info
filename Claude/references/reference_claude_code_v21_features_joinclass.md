---
name: Claude Code v2.1の新機能まとめ — /effort・PostCompact Hook・セッション名で自動化が進化する
description: Claude Code v2.1で導入された5大新機能（/effort・--name・PostCompact Hook・system-promptキャッシュ・MCP説明文制限）の実践解説
type: reference
---

## 出典
- URL: https://zenn.dev/joinclass/articles/claude-code-new-features-2026-03
- 著者: joinclass
- 公開日: 2026-04-12

## 概要
Claude Code v2.1で導入された5つの主要新機能を実践的に解説。特にコスト削減（/effortで月20%削減）と長時間タスクの安定化（PostCompact Hook）に注目する。

## 詳細

### 1. `/effort` コマンド
- 処理の複雑さを「低・中・高」の3段階で指定
- `effort low`: 定型タスクに使用。月額トークン消費が**約20%削減**した実績あり
- `effort high`: 複雑な設計や分析に使用。より深い思考と詳細な出力
- 用途に応じてコストをコントロールする最重要機能

### 2. `--name` フラグ
- セッションに名前をつけることで並行プロセスを可視化
- 例: `claude --name "feature-auth"` でどのセッションが何をしているか一目で把握
- マルチエージェント環境での管理に特に有効

### 3. PostCompact Hook
- コンテキスト圧縮時に自動実行するスクリプトを設定
- 長時間タスクの安定性を向上（コンテキスト圧縮後も状態を維持）
- 設定例:
  ```json
  {
    "hooks": {
      "PostCompact": ["bash scripts/restore-context.sh"]
    }
  }
  ```
- 長時間の自律稼働に不可欠な機能

### 4. system-promptキャッシュ改善
- CLAUDE.mdが自動キャッシュされ、2回目以降のリクエストでトークン消費がほぼゼロ
- 大型CLAUDE.mdを使うプロジェクトでのコスト削減に直結
- プロジェクト間でのキャッシュ分離も考慮した設計

### 5. MCP説明文の2KB自動制限
- MCPツールのdescriptionが2KBを超えると自動トリミング
- コンテキスト使用量を予測しやすくする
- 多数のMCPツールを使うプロジェクトでのコスト管理に有効

### まとめ
- **コスト最適化**: /effortとsystem-promptキャッシュで合計25〜30%のコスト削減が期待できる
- **安定性向上**: PostCompact Hookで長時間タスクの中断リスクを大幅低減
- **可視性向上**: --nameフラグでマルチエージェント環境を管理しやすく
