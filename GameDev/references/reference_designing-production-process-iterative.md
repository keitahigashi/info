---
name: "Designing A Production Process: Part 1"
description: Star Wars: First Assault開発のJeff Morrisが構築したイテレーティブ生産方法論をベースに、2週間スプリント・物理進捗ボード・日次スタンドアップからなるゲーム開発プロセス設計の全体像を解説した実践的ガイド。
type: reference
---

## 出典

Game Developer: https://www.gamedeveloper.com/production/designing-a-production-process-part-1

## イテレーティブ生産プロセスの設計フレームワーク

### プロセスへの投資が持つ価値

- 良いプロセスは「約20メタクリティックポイント相当の価値」を持つ（著者の主張）
- チームの燃え尽き症候群 (burnout) を防ぎ、士気を高める副次効果

### 2週間スプリントの4要素構成

1. **予定作業日 (Scheduled Work Days):** 見積もり付きタスク完了用
2. **非予定作業日 (Unscheduled Work Days):** バグ修正・緊急タスク用（2週間に2日確保）
3. **計画日 (Planning Day):** 次スプリントの優先順位付け
4. **スケジュール解決会議 (Schedule Resolution Meeting):** リーダー間の競合タスク解決

### 主要な実践手法

**毎日のスタンドアップ (Daily Standup)**
- 15分以内を厳守
- 全チームへの透明性と説明責任を確保

**物理的進捗ボード (Physical Task Board)**
- 5段階状態管理:
  ```
  ブロック → 未開始 → 進行中 → 検証待ち → 完了
  ```
- デジタルではなく物理ボードを使う理由: 視認性・チームの共有感覚

**タスク見積もり (Task Estimation)**
- 個人の習慣に基づく見積もりで80〜95%の精度を目標
- 過去の実績データを蓄積して見積もり精度を継続的に改善

### 核心的洞察

プロセスはゲーム開発と同様に、日次イテレーション (daily iteration) と継続的改善が必要。完成したプロセスを維持するのではなく、プロセス自体を開発し続ける姿勢が重要。スプリントの「非予定作業日」設定は、割り込みタスクをシステムで吸収するバッファ設計の具体例。
