---
name: Claude Code Skills 20選ガイド
description: Claude Code / Copilot Agent向けSkills（ルールセット）20個の一覧・インストールコマンド・活用ガイド
type: reference
---

## 出典

Qiita記事: https://qiita.com/yamamoto0/items/17817dc09a78078fa132

## Skillsとは

Agentに「業界のベストプラクティス」「実プロジェクトの経験値」「エンジニアリングの制約ルール」「構造化された思考フレームワーク」を注入する仕組み。モデルのパラメータ数よりもルール定義（Skills）が実際の品質差を生むという考え方。

## Skills一覧（推奨度順）

### Tier 1: 最優先（体感が大きく変わる）

| # | Skill名 | コマンド | 用途 |
|---|---------|---------|------|
| 1 | find-skills | `npx skills add https://github.com/vercel-labs/skills --skill find-skills` | Agentが自分でSkillsを検索・発見する機能 |
| 2 | vercel-react-best-practices | `npx skills add https://github.com/vercel-labs/agent-skills --skill vercel-react-best-practices` | React/Next.jsパフォーマンス最適化（64ルール・8カテゴリ） |
| 3 | frontend-design | `npx skills add https://github.com/anthropics/skills --skill frontend-design` | UI配色・レイアウト・アニメーション品質向上 |
| 4 | web-design-guidelines | `npx skills add https://github.com/vercel-labs/agent-skills --skill web-design-guidelines` | 100+のWebアクセシビリティ・UX・パフォーマンスルール |
| 5 | remotion-best-practices | `npx skills add https://github.com/remotion-dev/skills --skill remotion-best-practices` | React動画作成（Remotion）の最適化 |

### Tier 2: おすすめ

| # | Skill名 | コマンド | 用途 |
|---|---------|---------|------|
| 6 | brainstorming | `npx skills add obra/superpowers --skill brainstorming` | 構造化ブレインストーミング・TDD・ワークフロー設計 |
| 7 | agent-browser | `npx skills add vercel-labs/agent-browser` | ブラウザ自動操作（ページ閲覧・フォーム入力・スクショ） |
| 8 | browser-use | `npx skills add browser-use/browser-use` | Rust実装の高速ブラウザ操作 |
| 9 | supabase-postgres-best-practices | `npx skills add supabase/agent-skills --skill supabase-postgres-best-practices` | PostgreSQL最適化・SQLアンチパターン回避 |
| 10 | azure-cost-optimization | `npx skills add microsoft/github-copilot-for-azure --skill azure-cost-optimization` | Azureコスト最適化ルール |
| 11 | cloudflare/skills | `npx skills add cloudflare/skills` | Cloudflare Workers・Edge Computing最適化 |

### Tier 3: 用途に応じて

| # | Skill名 | コマンド | 用途 |
|---|---------|---------|------|
| 12 | redis/agent-skills | `npx skills add redis/agent-skills` | Redisキャッシュ・ベクトル検索・ストリーム処理 |
| 13 | vercel-composition-patterns | `npx skills add vercel-labs/agent-skills --skill vercel-composition-patterns` | Reactコンポジションパターン設計 |
| 14 | vercel-react-native-skills | `npx skills add vercel-labs/agent-skills --skill vercel-react-native-skills` | React Native公式ベストプラクティス |
| 15 | sleek-design-mobile-apps | `npx skills add sleekdotdesign/agent-skills --skill sleek-design-mobile-apps` | モバイルアプリUIデザイン |
| 16 | ui-skills | `npx skills add ibelick/ui-skills` | UIコンポーネント・インタラクション設計 |
| 17 | pdf | `npx skills add anthropics/skills --skill pdf` | PDF生成・解析・処理 |
| 18 | seo-audit | `npx skills add coreyhaines31/marketingskills --skill seo-audit` | Webサイト監査と改善提案 |
| 19 | skill-creator | `npx skills add anthropics/skills --skill skill-creator` | カスタムSkills開発 |
| 20 | code-review-expert | `npx skills add sanyuan0704/code-review-expert` | シニアエンジニア水準のコードレビュー |

## 導入のポイント

- まずTier 1の5つから始めると体感が大きく変わる
- Skillsはプロジェクト単位でインストールされる
- `find-skills`を入れておくと、Agent自身が必要なSkillを探せるようになる
