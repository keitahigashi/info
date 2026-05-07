---
name: Anthropic、Claude Managed Agentsに「Dreaming」機能を追加：エージェントが過去の失敗から学ぶ仕組みとは
description: XenoSpectrumによるClaude Dreaming機能の技術解説。API仕様・対応モデル・ChatGPT/Geminiとのメモリ管理比較を収録
type: reference
---

## 出典

XenoSpectrum: https://xenospectrum.com/anthropic-claude-dreaming-managed-agents-memory/

## 概要

2026年5月6日公開。Code with Claudeカンファレンス（2026年5月7日）で発表されたDreaming機能の技術仕様と、競合AIとのメモリ管理比較を詳述。

## 機能の核心

Dreamingは**マルチエージェント環境向けのメモリ整理機能**。「過去のセッションとメモリストアをまたいで重複・矛盾・陳腐化したエントリを整理し、パターン認識を自動化」する。

人間の**睡眠時の記憶固定化プロセス**をAIに応用した設計思想。

## 技術仕様

| 項目 | 詳細 |
|------|------|
| 入力 | メモリストア + 最大**100件**の過去セッション |
| 対応モデル | claude-opus-4-7、claude-sonnet-4-6 |
| 実装方式 | APIベースの**非同期ジョブ** |
| カスタマイズ | instructionsフィールドで最大**4,096文字**の指示を設定可能 |
| ステータス | リサーチプレビュー |

## 競合製品との比較

| サービス | メモリ範囲 | 用途 |
|---------|-----------|------|
| ChatGPT Memory | 単一ユーザーとAIの対話 | 個人用途 |
| Gemini | ユーザー個別設定 | 個人用途 |
| Claude Dreaming | **チームのマルチエージェント環境** | エンタープライズ |

Dreamingは「チームで運用されるマルチエージェント環境での**集合知の蓄積**」が目標で、エンタープライズ規模の実運用を想定した設計。

## 同時リリースされた機能

- **Outcomes（パブリックベータ）**: ルーブリック（評価基準）を定義し独立グレーダーが評価
- **Multiagent Orchestration（パブリックベータ）**: リードエージェントが複数スペシャリストに並列委任
- **Webhooks（パブリックベータ）**: 外部サービスとのリアルタイム連携
