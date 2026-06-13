---
name: Claude Fable 5が突然使えなくなった（輸出管理指令によるアクセス停止）
description: 開発者が実際にClaude Codeでfable-5モデルが使えなくなったエラーを体験し、原因・背景・対処法をまとめた記録
type: reference
---

## 出典

Zenn（yamadatt）: https://zenn.dev/yamadatt/articles/20260613-fable5-access-suspended

## エラー内容と原因

### 発生事象
Claude Code で `claude-fable-5` モデルを指定しようとすると「モデルが存在しないか、アクセス権がない」というエラーが発生。

### 根本原因
米国政府の輸出管理指令によるもの。国家安全保障上の理由から Fable 5 と Mythos 5 への全面的なアクセス停止が実施された。

### 停止の背景
- Fable 5 はリリース直後（無料クレジット期間中）での停止
- 同じ基盤モデルの Mythos 5 も同様に影響を受けている
- Anthropic は「この措置は誤解である」として可能な限り迅速な復旧に取り組んでいると表明

## 対処法

1. 作りかけのプロジェクトを一時中断
2. Claude Code の使用モデルを `claude-opus-4-8` 等の他のAnthropicモデルに切り替え
3. 復旧時期は未定のため公式発表を待つ

## Claude Code での具体的な切り替え方

```bash
# 環境変数でモデルを指定する場合
export ANTHROPIC_MODEL=claude-opus-4-8

# または CLAUDE.md / agents.md に記述
# model: claude-opus-4-8
```

## 教訓
- Claude Code のハーネス設計では**モデルIDをハードコードしない**ことが重要
- フォールバックモデルの設定を事前に準備しておく
- Anthropic の Status Page を定期的に確認する習慣をつける
