---
name: Claude Code Game Studios 49体AI並列ゲーム開発
description: 49体の専門AIエージェント・3層体制・72ワークフロースキルで個人がAAAスタジオ規模のゲーム開発を実現するOSSプロジェクト
type: reference
---

## 出典
- URL: https://qiita.com/emi_ndk/items/e4c1fbad2bf2f73c5091
- 著者: emi_ndk (Babushka AI)
- 公開日: 2026-04-19

## 概要
Claude Code Game Studiosは、49体の専門AIエージェントと72種類のワークフロースキルを使い、個人開発者がAAAゲームスタジオと同等の組織構造でゲーム開発を行えるOSSプロジェクト。2026年4月18日にGitHub公開。

## 詳細

### 3層エージェント体制
- **Tier 1（3体）- Claude Opus**: Creative Director、Technical Director、Producer（戦略層）
- **Tier 2（8体）- Claude Sonnet**: Game Designer、Lead Programmer、Art Director、Audio Director、Narrative Director、QA Lead、Release Manager、Localization Lead（部門リーダー層）
- **Tier 3（38体）- Sonnet/Haiku**: プログラマー・デザイナー等の専門分野別スペシャリスト

### 72種類のワークフロースキル
/コマンド形式で提供:
- オンボーディング
- ゲームデザイン
- 開発フロー
- リリース関連

### 安全装置
- 12種類の自動検証フック
- 11種類のパス別コーディングルール
- Human-in-the-loopモデル（AIの自動提案を人間が承認）
