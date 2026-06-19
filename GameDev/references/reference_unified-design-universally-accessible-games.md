---
name: "Unified Design of Universally Accessible Games (Say What?)"
description: 障害の有無を問わずすべてのプレイヤーが同時にプレイできるUA-Games設計の5段階手法
type: reference
---

## 出典

Game Developer (Dimitris Grammenos): https://www.gamedeveloper.com/audio/unified-design-of-universally-accessible-games-say-what-

## Unified Design of Universally Accessible Games (UA-Games)

著者: Dimitris Grammenos / 公開: 2006年12月7日

### 概要

従来のアクセシビリティ対応（後付けの設定オプション追加など）を超え、**障害の有無に関わらずすべてのプレイヤーが同一セッションで同時プレイできる**ゲームの設計手法 — UA-Games（普遍的にアクセス可能なゲーム）を提唱。

### 5段階の設計プロセス

```
Stage 1: 抽象的タスク設計 (Abstract Task Design)
    入出力デバイスに依存しない形でゲームの基本活動を定義する
    例: 「マス目を選択する」=「任意の入力方法でセルを指定する」と定義

Stage 2: 多形的専門化 (Polymorphic Specialization)
    異なるユーザー属性（視覚・聴覚・運動障害ほか）に対応した
    複数の物理的設計バリエーションを作成する

Stage 3: 適切性分析 (Appropriateness Analysis)
    各設計バリエーションが各ユーザー属性にどの程度適合するかを
    マトリックスで評価する

Stage 4: 互換性分析 (Compatibility Analysis)
    複数の設計バリエーションが同一セッションで同時機能するかを確認する

Stage 5: プロトタイピング評価
    思考発話法 (think-aloud protocol) を用いたユーザーテストで検証する
```

### 具体的な適用例

| ゲーム | 視覚バリエーション | 聴覚バリエーション | 運動バリエーション |
|-------|-----------------|-----------------|-----------------|
| チェス | ビジュアル表示 | 音声読み上げ | スキャン入力 |
| スペースインベーダー | 通常グラフィック | サウンドのみ | 単ボタン操作 |

### 設計への示唆

- **同一ゲームの複数モダリティ設計**: 視覚・聴覚・触覚を独立したチャネルとして設計し、任意の組み合わせで利用可能にする
- 「アクセシビリティモード」として分離するのではなく、**基本設計から多形的に展開する**アプローチ
- インクルーシブデザイン (inclusive design) の実践として、開発早期段階での統一設計が後のコスト削減につながる

### 汎用化ポイント（エンジン非依存）

このアプローチはエンジンや技術を問わず、ゲームプレイの「抽象的タスク」を先に定義してから実装モダリティを選択するという思考プロセス自体が普遍的に応用可能。
