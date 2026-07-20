---
name: 【週次まとめ】Claude アップデート（2026年7月1日〜7月8日）
description: 2026年7月第1週のClaude全体アップデートをまとめた週次レポート。Claude Fable 5復旧・Coworkベータ・M365コネクタ強化・Claude in Chrome GA・Code v2.1.198〜202の変更を網羅。
type: reference
---

## 出典

業務ハックLab（著者: よう）: https://yougears-lab.com/claude-update-20260708/

## 概要

業務ハックLab（情シス・Power Platform専門ブログ）が発行する週次まとめ。2026年7月1日〜8日の全Claude系プロダクトの動向を整理した記事（公開: 7月11日）。

## 主要アップデート一覧

### Claude Fable 5 / Mythos 5 アクセス復旧
- 輸出規制により6月12日停止 → 7月1日全面復旧
- Pro/Max/Team/一部Enterprise で週間利用上限の最大50%まで無料利用可
- 復旧期限は当初7月7日 → 7月12日（PT）に延長

### Claude Cowork Web/モバイル対応ベータ開始（7月7日）
- Web（claude.ai）・iOS/Android・Claude Desktopで利用可能
- Maxユーザーから段階展開
- 利用上限2倍キャンペーン（〜2026年8月5日）

### Microsoft 365コネクタ 書き込みツール追加
- 新機能: メール送信・下書き作成、予定表操作、OneDrive/SharePointファイル作成・更新
- 制限: Teams読み取り専用、添付ファイル付きメール非対応
- 管理者有効化が必須

### Claude in Chrome 正式版（GA）
- 7月1日（v2.1.198）に全有料プランで正式提供開始

### Claude Code 週次バージョン変更

| バージョン | 日付 | 主な変更 |
|-----------|------|--------|
| v2.1.198 | 7/1 | サブエージェント既定バックグラウンド実行、Chrome GA |
| v2.1.200 | 7/3 | 既定権限モード「Manual」に改称、AskUserQuestion非継続化 |
| v2.1.202 | 7/6 | Dynamic workflow sizeの調整機能（small/medium/large）追加 |

## 著者コメント

「一度止まった機能が戻ってくる動きと、新しい入口が増える動きが同時発生」。情シス・M365担当者は権限設計の見直しを推奨。
