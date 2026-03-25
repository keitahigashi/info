# 権限・セキュリティ

## 権限ルールの設定

### 基本構造

```json
{
  "permissions": {
    "allow": ["Bash(git *)", "Read", "Edit"],
    "ask": ["Bash(rm *)", "WebSearch"],
    "deny": ["Bash(sudo *)", "Bash(rm -rf *)"]
  }
}
```

### ツール別パターン例

| ツール | パターン例 | 説明 |
|--------|----------|------|
| Bash | `Bash(git log *)` | git logのみ許可 |
| Bash | `Bash(npm *)` | npm系コマンド許可 |
| Read | `Read(**/.env)` | .envファイルの読取制御 |
| Edit | `Edit(src/**)` | srcディレクトリ内の編集 |
| WebFetch | `WebFetch(https://api.*)` | 特定URLパターン |

### 最小権限の原則

- デフォルトは最小限にし、必要なものだけ `allow` に追加
- 破壊的操作（push, delete, format）は `ask` に入れる
- 絶対に許可しない操作は `deny` に入れる

---

## 機密情報の保護

### .envファイル等の保護

```json
{
  "permissions": {
    "deny": [
      "Read(**/.env)",
      "Read(**/.env.*)",
      "Read(**/secrets/**)",
      "Read(**/*.key)"
    ]
  }
}
```

### 原則

- DB接続文字列、APIキー、JWT秘密鍵は `.gitignore` で除外
- コンテキストに機密情報が流入するとリスク → denyで防ぐ
- 本当に必要なら Vault / Secrets Manager を使う

---

## サンドボックス

Bashコマンドをファイルシステム・ネットワーク隔離で実行する機能（macOS: Seatbelt、Linux: Bubble Wrap）。

### 基本有効化

```json
{
  "sandbox": {
    "enabled": true,
    "allowUnsandboxedCommands": false
  }
}
```

`allowUnsandboxedCommands: false` でescape hatch（脱出口）も塞ぐ。`/sandbox` で状態確認可能。

### ネットワーク制限（ホワイトリスト方式）

```json
{
  "sandbox": {
    "network": {
      "allowedDomains": [
        "github.com",
        "*.githubusercontent.com",
        "*.npmjs.org",
        "registry.yarnpkg.com",
        "pypi.org"
      ]
    }
  }
}
```

プロンプトインジェクションによるデータ窃取を防止。

### ファイルシステム制限

```json
{
  "sandbox": {
    "filesystem": {
      "denyRead": ["~/.aws/credentials", "~/.ssh"]
    }
  }
}
```

---

## 権限モードの使い分け

| 場面 | 推奨モード | 理由 |
|------|----------|------|
| 機密コードの調査 | `default` | 全操作前に確認 |
| 日常の開発 | `acceptEdits` | 編集は自動、Bashのみ確認 |
| 設計・計画 | `plan` | 編集不可で安全 |
| 長時間の自動タスク | `auto` | 背景分類器が判定 |
| CI/CD | `dontAsk` | ホワイトリスト限定 |
| 隔離コンテナ内 | `bypassPermissions` | 最も危険、コンテナ内のみ |

---

## フックによるセキュリティ強化

### 危険コマンドのブロック

```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Bash",
      "hooks": [{
        "type": "command",
        "command": ".claude/hooks/validate-bash.sh"
      }]
    }]
  }
}
```

### 権限リクエスト通知

```json
{
  "hooks": {
    "PermissionRequest": [{
      "matcher": "*",
      "hooks": [{
        "type": "command",
        "command": "notify-send 'Claude Code' '権限確認が必要です'"
      }]
    }]
  }
}
```

---

## 第三者Skillのリスク評価

外部から取得したSkillは、信頼度に応じて扱いを変える。

### 信頼度レベル

| レベル | ソース | 対応 |
|--------|--------|------|
| 1 (最安全) | 自作Skill | そのまま使用 |
| 2 | チーム内レビュー済み | レビュー後に使用 |
| 3 | Anthropic公式リポジトリ | 基本的に信頼 |
| 4 | 著名OSS公開Skill | 内容確認推奨 |
| 5 (要注意) | その他 | 全ファイル監査必須 |

### 確認すべき項目

- **SKILL.md**: 悪意ある指示（データ送信、ファイル削除等）がないか
- **scripts/**: 外部通信・破壊的操作を行うスクリプトがないか
- **references/**: プロンプトインジェクションが仕込まれていないか

### リスク緩和策

信頼度の低いSkillは `context: fork` でサブエージェント隔離実行し、メインコンテキストへの影響を最小化する。

---

## 実践メモ

---

## devcontainerで完全隔離

コンテナ内でClaude Codeを実行し、ホストマシンから完全隔離する。VS Code Remote Containers拡張で簡単セットアップ。bypassPermissionsモード使用時の安全策。

---

## Managed Settings（組織ポリシー強制）

チーム向けに設定を一括管理し、個人が上書きできないようにする。

| 方式 | 特徴 | 適用場面 |
|------|------|--------|
| Server-managed settings | Claude.aiコンソール配信、MDM不要 | リモートワーク・BYOD |
| Endpoint-managed settings | MDMデバイス配置（Jamf、Intune） | セキュリティ重視組織 |

OS別配置パス:
- macOS: `/Library/Application Support/ClaudeCode/managed-settings.json`
- Linux: `/etc/claude-code/managed-settings.json`
- Windows: `C:\Program Files\ClaudeCode\managed-settings.json`

主要設定キー:
- `disableBypassPermissionsMode` : スキップモード禁止
- `allowManagedPermissionRulesOnly` : 管理者ルール以外無効
- `allowManagedHooksOnly` : 管理者フックのみ
- `allowManagedMcpServersOnly` : 許可MCPサーバーのみ

---

## セキュリティ導入ステップ

1. **初期段階**: サンドボックス有効化 + 危険コマンドdeny + 機密ファイルdeny
2. **段階的導入**: ネットワーク制限 + PreToolUseフック
3. **チーム環境**: Managed Settingsで組織ポリシー統一
4. **継続監視**: `/permissions` で定期的に権限を棚卸し

---

## 実践メモ

- 出典: [Claude Code Skills 完全活用ガイド 2026](https://qiita.com/nogataka/items/ad9995fb1b3db7055740) (@nogataka, 2026-03-12)
- 出典: [Claude Codeで行うべきセキュリティ設定 10選](https://qiita.com/miruky/items/51db293a7a7d0d277a5d) (@miruky, 2026-03-14)
<!-- 日常で得た知見をここに追記 -->
