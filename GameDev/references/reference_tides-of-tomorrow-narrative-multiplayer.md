---
name: Has Tides of Tomorrow cracked the narrative multiplayer formula?
description: Digixartの非同期ナラティブマルチプレイシステムの設計解説 — プレイヤーの選択結果が他プレイヤーのゲームに波及するシステムの実装と課題
type: reference
---

## 出典

Game Developer (Bryant Francis): https://www.gamedeveloper.com/design/has-tides-of-tomorrow-cracked-the-narrative-multiplayer-formula-

## ナラティブマルチプレイの公式を解くか — Tides of Tomorrow

### 概要
Road 96開発元Digixartが制作したポストアポカリプス系アクションアドベンチャー。プレイヤーの選択が他プレイヤーのゲームセッションに波及する非同期ナラティブシステム (asynchronous narrative system) が特徴。

### 非同期ナラティブシステムの設計

- **基本構造**: プレイヤーが行った選択の結果が、別プレイヤーのゲーム環境に反映される
- **インスピレーション**: Death Stranding・Elden Ring・ダークソウルの非同期マルチプレイを進化させた形
- **ゴーストシステム (ghost system)**: 他プレイヤーが同じ空間を移動する様子を断片的に表示

### プリプロダクションの重要性

制作者Kevin Bardの原則:
> 「良い事前制作 (pre-production) とは、その後に質問が残らないプロセス」

**検証メソッド**
- 「プロトテキスト」による選択肢と分岐ツリーのテスト
- プレイヤーへの「楽しさ」と「理解度」定量評価
- データに基づいた選択肢の絞り込み

### スコープ管理の判断
- シームレスな島間移動システムを開発後に廃止
- 「その努力はコアメカニクスに値するか」という問いを判断基準に使用
- 開発リソースをコア機構（非同期ナラティブ）に集中させる判断

### 残された課題
- プレイテスターの一部はシステムの仕組みを理解できなかった
- 数百万規模プレイヤーでのシステム動作は未検証領域
