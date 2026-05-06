---
name: 2026年初頭のClaude Code Skillsについてまとめる
description: Claude Code Skillsの進化史まとめ。2025年10月登場から2026年初頭までのアップデート追跡・他機能との関係性整理・使い分けガイド
type: reference
---

## 出典
- URL: https://zenn.dev/nanahiryu/articles/claude-code-skills-202601
- 著者: nanahiryu
- 公開日: 2026-02-03（更新: 2026-02-06）

## 概要
Claude CodeのSkills機能の進化を追跡した記事。2025年10月の登場から2026年初頭のv2.1.3まで、各バージョンでどう変化したかを整理し、Rules・Commands・Subagentsとの現在の関係を解説する。

## 詳細

### Skillsの4つの特性
1. **Composable**: 複数のSkillを組み合わせてワークフローを構築
2. **Portable**: プロジェクト間で再利用可能
3. **Efficient**: Progressive Disclosure により必要な時だけロード
4. **Powerful**: SKILL.mdとreferences/による知識外部化で大型ワークフローに対応

### 主要アップデート履歴
| バージョン | 変更内容 |
|-----------|---------|
| v2.0（2025年10月）| Skillsが初登場。プロンプト・スクリプト・参照データを1パッケージに |
| v2.1.0 | CommandsとSkillsの統合が始まる |
| v2.1.3 | **CommandsがSkillsに統合**。`/`で呼び出せるように |
| 2026年初頭 | Subagentsとの境界が曖昧化 |

### 他機能との現在の関係性
- **Rules**: 発表時から変わらず「常時適用される制約」。Skillsとの役割分担は明確
- **Commands**: v2.1.3でSkillsにほぼ統合。独立したCommandsはほぼ不要に
- **Subagents**: Skillsが複雑化するにつれてSubagentに近い役割を担い始め、境界が曖昧化

### 使い分けの指針
1. **参照情報用Skills**: ドキュメント・スタイルガイド・設計原則などの知識をreferences/に格納
2. **実行タスク用Skills**: コード生成・テスト実行・デプロイなどのワークフローをSKILL.mdに定義
3. この分離が「Skills膨張」を防ぐ鍵

### 著者の結論
「Skillsはほぼ必須の仕組みになっている」。Claude Codeを使い込むほどSkillsなしの運用は考えられなくなる。SKILL.md設計に投資する価値は高い。
