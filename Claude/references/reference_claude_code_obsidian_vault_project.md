---
name: Claude Code × Obsidian Vault「何でも相談」プロジェクト設計
description: Obsidian Vaultに成果物を集約するClaude Code専用プロジェクトの構成・CLAUDE.md配置ルール・settings.json固定・MCP設定・ポータビリティ設計
type: reference
---

## 出典
- URL: https://qiita.com/htani0817/items/0cb5e8f91fa64fb9ba8c
- 著者: @htani0817
- 公開日: 2026-04-18

## 概要
Claude Code専用プロジェクトをObsidian Vaultと統合し、成果物の自動分類・デイリーノート連携・Mac/Windowsポータブル運用を実現する設計パターン。

## 詳細

### 3つの設計原則
1. 成果物をObsidian Vaultに集約
2. ファイル配置ルールをCLAUDE.mdで自動化
3. USB/ZIPによるMac/Windowsポータブル設計

### フォルダ構成
```
project-root/
├── README.md
├── CLAUDE.md
└── obsidian-vault/
    ├── daily/          # デイリーノート（YYYY-MM-DD.md）
    ├── coding/         # コーディング相談
    ├── research/       # 技術調査メモ
    ├── docs/           # ドキュメント成果物
    ├── references/     # 参考資料・URL集
    └── archive/        # アーカイブ（月単位）
```

### CLAUDE.md活用
- 「新規ファイルは内容に応じてフォルダに配置」とルール表を記載 → Claude が自動的に正しい置き場を選択
- デイリーノート読込指示 → セッション開始時に文脈把握

### settings.json設定
```json
{
  "model": "claude-opus-4-7",
  "effortLevel": "xhigh",
  "env": {"CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING": "1"}
}
```
モデル・推論深さ・思考量を固定し安定運用。

### MCP設定
- .mcp.json でAWS Documentation MCPをuvx経由で常時有効化（古い情報回避）
- context7、exa、github、memory、playwright、sequential-thinkingはeverything-claude-codeプラグイン経由で必要時のみ

### プラグインスラッシュコマンド
/plan、/tdd、/code-review、/security、/build-fix、/refactor-clean、/verify、/checkpoint

### ポータビリティルール
- 絶対パス・ホームディレクトリ直接参照禁止
- パス区切りは `/` で統一
- UTF-8 BOMなし、LF改行
- .obsidian/ フォルダも一緒に移行

### 導入手順（最小5ステップ）
1. プロジェクトフォルダ作成、CLAUDE.md・README.md配置
2. obsidian-vault/ と6サブフォルダ作成
3. 置き場ルール表をCLAUDE.mdに記載
4. settings.jsonでmodel/effortLevel固定、.mcp.jsonでMCP有効化
5. ObsidianでVaultとして開き、Daily notesプラグイン有効化
