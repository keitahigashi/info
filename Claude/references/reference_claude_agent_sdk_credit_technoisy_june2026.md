---
name: Claude、6月15日にAgent SDKを別枠化。月次クレジット制へ移行
description: Agent SDK・claude -p・GitHub Actionsの月次クレジット分離の仕組みと、プラン別クレジット額・ユーザー対応手順を解説
type: reference
---

## 出典

TECH NOISY: https://tech-noisy.com/2026/06/05/claude-agent-sdk-monthly-credit-system/

## 変更概要

- **実施日**: 2026年6月15日
- **内容**: Agent SDKと`claude -p`（非対話モード）の利用をサブスク枠から分離し、専用の月次クレジット制に移行
- プログラム経由の利用と対話利用（チャット、Claude Code）を別の「財布」で管理

## 対象となる利用方法

- Agent SDK（Python/TypeScript）
- `claude -p` の非対話実行
- GitHub Actions連携
- Agent SDK経由のサードパーティアプリ認証

## 各プランの月次クレジット額

| プラン | クレジット |
|--------|-----------|
| Pro | $20 |
| Max 5x | $100 |
| Max 20x | $200 |
| Team Standard | $20 |
| Team Premium | $100 |
| Enterprise Premium | $200 |

## クレジット超過時の対応

- 月次クレジット枯渇後、usage creditsを有効化していれば自動継続課金
- 無効のままだと処理が停止

## ユーザーが実施すべき対応

1. **クレジット受け取り（claim）**: オプトイン方式で事前手続きが必要
2. 直近1ヶ月の利用量を把握
3. usage credits有効化の判断
4. チーム共有の自動化はAPIキーへの移行を検討

```bash
# 現状確認コマンド（claude -p の月間使用量確認）
claude usage --period monthly --breakdown programmatic

# APIキー直接利用への移行
export ANTHROPIC_API_KEY="sk-ant-..."
# Agent SDKではAPIキーが最初に参照される
```
