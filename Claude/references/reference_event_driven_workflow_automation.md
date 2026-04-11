---
name: イベント駆動型ワークフロー自動化（Hooks×Scheduler×Skills）
description: Hooks・Scheduler・Skillsの3機能を組み合わせた4つの自動化パターンと設計原則
type: reference
---

## 出典
- URL: https://qiita.com/nogataka/items/9af38e7279f553f13e50
- 著者: @nogataka
- 公開日: 2026-04-01

## 概要
Hooks（イベント検知）・Scheduler（定期実行）・Skills（ワークフロー定義）の3機能を組み合わせ、検知→判断→実行→報告が自律的に連鎖する仕組みを構築するための実践ガイド。

## 詳細

### 3機能の役割
| 機能 | 役割 | トリガー | 設定場所 |
|------|------|---------|--------|
| Hooks | イベント検知と制御 | 25種イベント | settings.json / SKILL.md |
| Scheduler | 定期実行 | cron式/インターバル | /loop・Desktop・Cloud |
| Skills | ワークフロー定義 | 手動/他機能から呼び出し | .claude/skills/*/SKILL.md |

### 4つの実装パターン

**パターン1: Scheduler → Skill → Hook（定期収集＋異常検知）**
- Skillでデータ定期収集→JSONファイル出力→HookがFileChangedで監視→異常検知→Slack通知

**パターン2: Hook → Skill（イベント駆動ワークフロー）**
- git commit検知→CHANGELOG自動更新。Skill内Hookは「そのSkillがアクティブな間だけ有効」

**パターン3: Scheduler → Skill + 自己検証（自己修正型自動化）**
- Stop イベントで出力品質検証。exit code 2返却でClaudeが停止せず修正を試行

**パターン4: SessionStart Hook → 動的提案**
- セッション開始時に当日コンテキスト注入、必要な作業を自動提案

### 設定例（settings.json）
```json
{
  "hooks": {
    "FileChanged": [
      {
        "matcher": "pr-status\\.json$",
        "hooks": [
          {
            "type": "command",
            "command": "python3 ~/.claude/scripts/check-stale-prs.py",
            "timeout": 30
          }
        ]
      }
    ]
  }
}
```

### SKILL.mdフロントマター（Stop Hook付き）
```markdown
---
name: daily-report
description: 日次レポートを生成し、品質を自己検証する
user-invocable: true
hooks:
  Stop:
    - hooks:
        - type: command
          command: "python3 ~/.claude/scripts/validate-report.py"
---
```

### 設計原則5つ
1. ファイル経由の連携（JSONで受け渡し）
2. 関心の分離（検知・判断・実行を別設計）
3. exit codeで制御（0=成功、2=ブロッキングエラー）
4. Skill内Hookでスコープ限定（グローバル副作用最小化）
5. 段階的成長（パターン3から始め1つずつ追加）

### よくある落とし穴
- Hook内での重い処理（タイムアウトリスク）
- FileChanged Hookの無限連鎖
- Cloud環境ではローカルファイル使用不可
