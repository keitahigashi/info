---
name: 自分のCloneに記事を執筆させるSkillシステム
description: article-writer Skill設計（過去記事分析→スタイルガイド自動生成→Subagent分離→5フェーズ執筆・更新フロー）
type: reference
---

## 出典
- URL: https://zenn.dev/heku/articles/claude-code-skill-article-creator
- 著者: かるでね（@cardene777）
- 公開日: 2025-11-27（最終更新: 2026-01-23）

## 概要
過去記事を分析し、著者の文体・構成パターンを学習した上で一貫性のある新規記事を生成・既存記事を更新するSkillシステム「article-writer」の設計と実装。

## 詳細

### アーキテクチャ
```
.claude/
├── commands/（pattern-extractor, skill-writer）
├── skills/
│   ├── article-writer/（SKILL.md, templates/, style/, history/, categories/）
│   └── generate-templates/
└── agents/（pattern-extractor, skill-writer）
```

### 主要コンポーネント
1. **article-writer Skill**: 新規記事作成＋既存記事更新
2. **generate-templates Skill**: 過去記事分析→style/+categories/自動生成
3. **Subagents**: pattern-extractor（記事→JSONパターン抽出）、skill-writer（JSON→スタイル・テンプレート生成）

### 段階的読み込み（Progressive Disclosure）
メタデータ→SKILL.md本文→バンドルリソースの3段階で段階的に読み込み、トークン消費を最適化

### 執筆フロー（5フェーズ）
Phase 0: ルール読込 → Phase 1: 情報収集 → Phase 2: アウトライン設計 → Phase 3: 執筆・書込 → Phase 4: 履歴記録 → Phase 5: レビュー

### 更新フロー
既存記事読込 → 変更計画 → ユーザー承認 → 編集実行 → 履歴追記 → 検証

### 実行例
```
/article-writer EASについて記事を書いてください。ドキュメント: https://docs.attest.org/
/article-writer articles/react-hooks.md の「useEffect」セクションを最新情報に更新してください
/generate-templates articles/
```

### 実装Tips
- Agentの`permissionMode: bypassPermissions`でファイル操作承認を省略
- スタイルガイドは箇条書き形式で簡潔に記述（トークン削減）
- 重い処理（数百記事分析等）はSubagentで分離
- Qiita/Zenn記法の自動判定対応
- 記事単位・本単位で異なる履歴管理
