---
name: Opus4.7の登場により、Claude Codeの開発者と公式が「これはもうやめろ」と言い始めた6つのこと
description: Opus 4.7リリースに伴い公式・Boris Chernyが非推奨とした6つの旧習慣と代替ベストプラクティス
type: reference
---

## 出典

Qiita @ot12: https://qiita.com/ot12/items/06420caf41a34a910c53

## Opus 4.7時代に「やめるべき」6つの行動

2026年4月16日のOpus 4.7リリースに伴い、Anthropic公式およびClaude Code作者Boris Chernyが推奨方針を大幅転換。4.6までの正解が4.7では逆効果になる。

### 1. 細かく指示する「ペアプロ」スタイル

| 旧 | 新 |
|---|---|
| 指示→修正→指示の往復型 | 初回プロンプトに全要件を一括記載 |

**初回プロンプトに含めるべき要素：**
- Goal（目的）
- Constraints（制約）
- Acceptance criteria（完了条件）
- 関連ファイルの場所

### 2. Effort Levelを常にMAXに設定

| レベル | 用途 |
|---|---|
| **xhigh** | **推奨デフォルト**（coding/agentictask） |
| max | オーバーシンキング傾向あり・非推奨 |
| high | 知能重視タスク（最低ライン） |
| medium | 単発Q&A・要約 |

### 3. `--dangerously-skip-permissions`の常用

| 代替手段 | 対象プラン |
|---|---|
| Auto Mode（Shift+Tab） | Max以上限定（Research Preview） |
| `/fewer-permission-prompts` | Pro・Max共通 |

### 4. 長時間セッションの横付き監視

**新しいツール：**
- **`/focus`（Focus Mode）**：途中プロセスを非表示、結果のみ表示
- **Recaps**：長時間セッション復帰時に自動サマリー表示

4.7は自律実行が長時間化するため、常時監視の必要性が低下。

### 5. 毎回Subagentを呼び出す

4.7は自律判断能力が向上。毎回指示するとむしろ性能低下。  
委譲すべきケース：複数ファイルの並列作業・独立した複数タスク。

### 6. 検証機構なしで自律実行させる

**公式が最高評価する施策：**「テスト・スクリーンショット・期待出力を与える」

**Stop Hookでテストを繋ぐ（バックエンド）：**
```json
{
  "hooks": {
    "Stop": [{"hooks": [{"type": "command", "command": "npm test"}]}]
  }
}
```
フロントエンドはPlaywright/Puppeteerまたは Chrome拡張で自動検証。

---

## 実務移行チェックリスト

- [ ] Claude Code v2.1.111以上に更新
- [ ] モデル：Opus、Effort：xhigh設定
- [ ] 初回プロンプトにGoal/Constraints/基準を一括記載
- [ ] Stop Hookで検証ループ構築
- [ ] Auto Mode試用（Max以上）
- [ ] `/fewer-permission-prompts` で許可リスト整理

## Opus 4.7関連の新機能

- **`/ultrareview`**：複数視点でのコード厳格レビュー
- **Task budgets（beta）**：エージェント全体のトークン予算管理
- **高解像度画像対応**：最大2,576px（従来1,568px）
