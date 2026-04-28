# ゲーム開発ナレッジベース

エンジン非依存のゲーム開発ナレッジを収集・整理するリポジトリ。

## 構成

| ファイル | 内容 |
|---------|------|
| [**00-foundations.md**](00-foundations.md) | **ゲームデザイン基礎（MDA、フロー理論、プレイヤー心理学）** |
| [01-mechanics.md](01-mechanics.md) | ゲームメカニクス（コアループ、バランス、経済設計） |
| [02-level-design.md](02-level-design.md) | レベルデザイン（空間設計、ペーシング、難易度曲線） |
| [03-narrative.md](03-narrative.md) | ナラティブデザイン（分岐、ダイアログ、ワールドビルディング） |
| [04-ui-ux.md](04-ui-ux.md) | UI/UXデザイン（HUD、フィードバック、アクセシビリティ） |
| [05-visual-audio.md](05-visual-audio.md) | ビジュアル・オーディオ（アート、サウンド、ジュース/ポリッシュ） |
| [06-programming-patterns.md](06-programming-patterns.md) | プログラミングパターン（ECS、ステートマシン、入力処理） |
| [07-technical-systems.md](07-technical-systems.md) | 技術システム（物理、AI、ネットワーク、手続き生成） |
| [08-production.md](08-production.md) | プロダクション（プロトタイピング、プレイテスト） |
| [09-genre-studies.md](09-genre-studies.md) | ジャンル別分析（アクション、RPG、ストラテジー等） |
| [**REFERENCES.md**](REFERENCES.md) | **参照記事・収集記事一覧** |

## 更新方針

日常的に得た知見を随時追記していく。各ファイル末尾の「実践メモ」セクションに具体的な体験・Tipsを蓄積する。

## 記事自動収集システム

このリポジトリには、Claude Code のセッション間で持続する記事自動収集の仕組みが組み込まれている。
詳細は [CLAUDE.md](CLAUDE.md) に定義されたワークフローを参照。

### アーキテクチャ

```
セッション開始（「記事収集して」等）
  ↓
skills/article-collector/SKILL.md → ワークフロー手順を読み込み
  ↓
REFERENCES.md → 収集済みURL一覧で重複チェック（単一ソース）
  ↓
Web検索（3キーワード並列・日英混合） → 重複フィルタ
  ↓
WebFetch → references/reference_*.md（Git管理）に詳細保存
  ↓
REFERENCES.md 更新 → コミット＆プッシュ
```

### 使い方

```bash
# 1. このディレクトリで Claude Code を起動
cd D:/020_Work/05_environment/01_active/Info/GameDev
claude

# 2. 記事収集を指示（以下のいずれか）
> 記事収集して
> ゲーム開発の記事探して
> 集積を続けて

# 3. URLを直接指定して追加も可能
> https://example.com/article-url

# 4. セッション内でデイリー自動実行を設定したい場合
> /loop 24h で記事収集を設定して
```
