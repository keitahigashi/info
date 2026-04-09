---
name: multi-agent-shogun v1.1.0 運用改善
description: マルチエージェントv1.1.0の3層コンテキスト管理・コンパクション復帰・Thinking無効化・スキル有機的育成
type: reference
---

## 出典
- URL: https://zenn.dev/shio_shoppaize/articles/8870bbf7c14c22
- 著者: おしお (@shio_shoppaize)
- 公開日: 2026-01-27（最終更新: 2026-01-28）

## 概要
multi-agent-shogun v1.1.0のアップデート記事。実運用で発見した課題（コンテキスト圧縮による記憶喪失、将軍の過度な思考遅延、ルール忘れ）への解決策を紹介。3層コンテキスト管理、コンパクション復帰手順、「Don't think. Delegate.」の設計哲学が核心。

## 詳細

### コンパクション復帰対策
- 問題: コンテキスト圧縮時に細かいルール（禁止事項等）が抜け落ちる
- 解決: CLAUDE.mdに「コンパクション復帰時の手順」を追加
- エージェントが自分のpane名を確認→対応する指示書を再読込する仕組み

### 3層コンテキスト管理
```
Layer 1: Memory MCP (Knowledge Graph)
  → セッション超越的永続記憶（ユーザーの好み、重要決定）
Layer 2: Global Context（memory/global_context.md）
  → システム全体設定、導入済みMCP一覧
Layer 3: Project Context（context/{project_id}.md）
  → プロジェクトごとの状態
```

### 7セクション共通テンプレート
5人の専門家ペルソナに熟議させて策定:
1. What（これは何か）
2. Why（なぜやるのか）
3. Who（誰が関係するか）
4. Constraints（制約は何か）
5. Current State（今どこにいるか）
6. Decisions（決まったこと）
7. Notes（メモ・気づき）

### 将軍のThinking無効化
- 問題: Opus Thinkingモデルで将軍が過度に思考し遅延
- 解決: Extended Thinkingを無効化（MAX_THINKING_TOKENS=0）
- 哲学: **「Don't think. Delegate.」** — リーダーは思考でなく判断と委譲に特化

### スキルの有機的育成
初期状態では`.claude/commands/`にスキルを含めない設計。実運用で自然成長:
1. 足軽が汎用化可能な作業を報告
2. 家老がdashboard.mdに記載
3. 殿（人間）が承認
4. 将軍が設計、足軽が実装
5. コマンド化して保存

### v1.0.0 → v1.1.0 変更点

| 項目 | v1.0.0 | v1.1.0 |
|------|--------|--------|
| 将軍モデル | Opus thinking | Opus (thinking無効) |
| コンパクション対策 | なし | CLAUDE.mdに復帰手順 |
| コンテキスト管理 | 1層 | 3層 (Memory/Global/Project) |
| テンプレート | なし | 7セクション共通 |
| dashboard更新 | 将軍+家老 | 家老のみ |
| current_project | あり | 廃止（タスク単位指定） |

### 教訓
- AIも「うっかり」する → 根性論でなく仕組みで防ぐ
- 多数決より専門家総意 → 権威付けとバリデーションが重要
- 段階的なスキル育成 → 初期状態を白紙にしニーズに合わせて成長

## リポジトリ
GitHub: https://github.com/yohey-w/multi-agent-shogun
