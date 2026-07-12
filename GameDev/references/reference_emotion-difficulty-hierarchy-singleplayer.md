---
name: Emotion in Single-Player Games
description: シングルプレイヤーゲームで喚起「しやすい感情」から「ほぼ不可能な感情」までを4段階の難易度ヒエラルキーで整理し、設計上の制約と突破口を論じる。
type: reference
---

## 出典

Game Developer: https://www.gamedeveloper.com/design/emotion-in-single-player-games

## 感情喚起難易度ヒエラルキー（emotion difficulty hierarchy）

**テーマ**: シングルプレイヤーゲームにおける感情喚起難易度の階層モデルと構造的制約

### 4つの難易度レベル

**Level 1「容易」（刺激反応型）**
- 恐怖（fear）・嫌悪（disgust）・退屈（boredom）
- 進化的サバイバル反応をトリガーするため安定して発生させやすい
- ホラーゲームが感情設計で優位な理由

**Level 2「中難度」**
- 畏敬（awe）・好奇心（curiosity）・プライド（pride）・恥（shame）
- バランス設計と不完全情報提供から自然発生
- システム的設計の精度が感情の安定性を左右する

**Level 3「困難」**
- 悲嘆（grief）・平静（serenity）・ユーモア（humor）
- プレイヤーの感情移入や内省（reflection）が前提条件
- コンテキスト設計の積み重ねが必要

**Level 4「ほぼ不可能」**
- 嫉妬（jealousy）・信頼（trust）・愛（love）・軽蔑（contempt）
- 意識ある他者（other person）の存在が本質的要件
- シングルプレイヤー固有の構造的限界

### シングルプレイヤー固有の根本課題

- 「感情移入する対象はゲームそのものしかない」という構造的制約
- Companion Cube（Portal）事例：ゲームプレイのインタラクションで愛着形成が可能
- プレイヤーの内省を引き出す設計（自律的行動から生じる感情）

### 実践的設計示唆

- 好奇心はエンゲージメント（engagement）の後から生じる：投資なき好奇心は設計不可能
- セーブ/ロード排除が感情的賭けを強化（高難度感情の喚起に有効）
- ゲーム固有のインタラクティブユーモア（interactive humor）形式の探求が競合差別化になる
- 感情喚起の「難易度」を認識した上で、現実的な感情設計目標を設定することが重要
