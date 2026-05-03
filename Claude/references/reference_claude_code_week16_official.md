---
name: Week 16 公式What's New（2026年4月13〜17日）
description: Claude Opus 4.7・Routines・/ultrareview・/usage内訳・ネイティブバイナリ 5大機能リリース（v2.1.105〜v2.1.113）
type: reference
---

## 出典

code.claude.com（公式ドキュメント）: https://code.claude.com/docs/ja/whats-new/2026-w16

## Week 16（2026年4月13〜17日）主要機能

### 対象リリース
v2.1.105 → v2.1.113

---

### 1. Claude Opus 4.7（new model）
- Max・Team Premiumのデフォルトモデルに昇格
- 他プランでは `/model` コマンドから選択可能
- `high` と `max` の間に新エフォートレベル **`xhigh`** を追加
- `/effort` を引数なしで呼ぶと矢印キースライダーが開く

```text
> /model opus
> /effort xhigh
```

---

### 2. Routines（web）
- スケジュール・GitHub イベント・API 呼び出しで起動するクラウドエージェント
- Claude Code ウェブ版で一度定義すれば、マシン非稼働でも動作
- トリガーピッカーがGitHubイベントをオプションフィルター付きでカバー
- 全ルーチンにトークン化 `/fire` エンドポイントを提供

```text
> /schedule daily PR review at 9am
```

---

### 3. /usage breakdown（CLI）
- `high`・`medium`・`low` 等の使用制限要因を内訳表示
- 並列セッション・サブエージェント・キャッシュミス・長コンテキストの各パーセンテージ
- `d` / `w` キーで日ビュー/週ビュー切替

```text
> /usage
```

---

### 4. /ultrareview（v2.1.111）
- クラウドでの包括的コードレビュー
- ブランチをClaude Code ウェブ版の並列レビュアー全体に展開
- 各検出結果に対して敵対的批評パスを実行
- ターミナルが空いたまま検証済み検出結果レポートを返す

```text
> /ultrareview        # 現在のブランチをレビュー
> /ultrareview 1234   # PR番号を指定
```

---

### 5. ネイティブバイナリ（v2.1.113）
- `claude` CLIがバンドルJavaScriptの代わりにプラットフォーム別ネイティブバイナリを生成
- Node を呼び出さなくなった（高速化・依存削減）
- npmパッケージは `@anthropic-ai/claude-code-darwin-arm64` 等のオプション依存経由で正しいバイナリをプル

---

### その他の成果（抜粋）

| 機能 | 概要 |
|------|------|
| Auto mode | Max サブスクライバーで Opus 4.7 対応、`--enable-auto-mode` フラグ不要に |
| Session recap | 不在中の出来事を1行で表示。`/recap` でオンデマンド実行 |
| `/tui` コマンド | クラシックとちらつきなしレンダリングを途中で切り替え |
| Push 通知 | Remote Control 接続時に Claude から電話への ping が可能 |
| Plugin monitors | `monitors` マニフェストキーでバックグラウンドウォッチャーを出荷 |
| `/theme` Auto | ターミナルのダーク/ライトモードに自動追従 |
| `/fewer-permission-prompts` | トランスクリプトスキャンで読み取り専用 Bash/MCP をアローリスト提案 |
| PreCompact フック | 終了コード2 or `{"decision":"block"}` でコンパクションをブロック可能 |
| `ENABLE_PROMPT_CACHING_1H` | APIキー・Bedrock・Vertex・Foundry向け1時間プロンプトキャッシュ TTL |
| `sandbox.network.deniedDomains` | `allowedDomains` ワイルドカードから特定ドメインを除外 |
| `/undo` → `/rewind` エイリアス | `/proactive` → `/loop` エイリアス追加 |
