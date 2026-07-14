---
name: Claude Code MCPサーバーの選び方と組み合わせレシピ｜接続デバッグ手順【2026年6月版】
description: 選定軸・レシピ3パターン・デバッグ手順を実践解説
type: reference
---

## 出典

秋霜堂株式会社 / 石川 瑞起: https://syusodo.co.jp/tech-blog/articles/claude-code-mcp-setup-workflow

## MCPエコシステムの現状（2026年5月時点）

- 公式レジストリに約9,652件登録、複数レジストリ横断では累計5万9千件超に拡大

## サーバー選定の4つの判断軸

1. コピペ作業が発生しているか確認する
2. 「公式・準公式か、ソースを確認できるか」を優先する
3. 書き込み機能は読み取り専用から段階的に導入する
4. チーム共有か個人用かでスコープを区分する

## 利用実態ランキング（定番上位）

Context7 → GitHub → Playwright → Filesystem → Brave Search の順で最多利用。「この3本で開発フローの約8割をカバーできる」

## 実装レシピ3パターン

- **DB + Filesystem:** 仕様準拠の実装を自動で回す
- **GitHub + Context7:** Issue起点の実装を自動実行
- **Sentry + GitHub:** 本番エラー調査を自動化

## デバッグ手順

- 初手は `/mcp` コマンドで状態確認
- 最頻エラーは「再起動忘れ」
- stdioサーバー失敗の主因はstdoutへのログ出力

## MCP vs API直接呼び出しの使い分け

- 対話的開発 → MCP
- 定型バッチ処理 → API直接呼び出し
- MCPは「柔軟性の対価にトークン消費」が増える点に注意
