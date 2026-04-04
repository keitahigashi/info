---
name: AIエージェント導入セキュリティ対策（AI Guardian）
description: Claude Code/Cursorのチーム導入時セキュリティ説明術 — AI Guardianによる操作ログ・ポリシー制御・PII墨消し・監査証跡（Zenn記事）
type: reference
---

## 出典
- URL: https://zenn.dev/sharu389no/articles/e07c926d87ac57
- 著者: しゃる (@sharu389no)
- 公開日: 2026-03-28

## 概要
AIエージェント（Claude Code、Cursor）のチーム導入時に情シス/セキュリティ部門から聞かれる3つの質問（操作ログ・アクセス制御・監査証跡）への技術的回答方法。AI Guardianというオープンソースツールを活用。

## 詳細

### AI Guardian 導入
```bash
pip install aig-guardian
aig init --agent claude-code
```

### 3つの質問と回答

**Q1: 操作ログは取れるのか？**
- `aig logs` で全操作を自動記録
- 記録情報: 時刻、操作内容、対象、リスク判定（0-100）、ポリシー判定

**Q2: 危険な操作を制限できるか？**
- YAMLポリシーで14個のデフォルトルール
- ブロック対象: rm -rf、.env*書込、SSH鍵アクセス、認証情報ファイル
- 要確認対象: git push、sudoコマンド

**Q3: 監査証跡・コンプライアンスレポートは？**
```bash
aig logs --export-excel monthly_report
aig status
aig report --days 30 --format json
```

### PII検知と墨消し
```python
from ai_guardian import scan, sanitize
result = scan("マイナンバーは１２３４５６７８９０１２です")
cleaned, _ = sanitize("電話番号は090-1234-5678です")
# → "[PHONE_REDACTED]"
```

### 日本の規制対応
AI推進法、AI事業者ガイドライン、個人情報保護法の技術要件に対応可能。ただし技術対策のみでは不十分で、コスト・運用体制・社内規程・契約面の検討も必要。
