---
name: "Rocketwerkz CEO says frameworks, not engines, are the future of game development"
description: DayZ開発者がカスタムフレームワーク「Brutal」で示す「エンジンではなくフレームワーク」時代のアーキテクチャ哲学
type: reference
---

## 出典

Game Developer: https://www.gamedeveloper.com/programming/rocketwerkz-ceo-predicts-frameworks-not-engines-will-be-future-of-game-development

## 「エンジンではなくフレームワーク」というアーキテクチャ哲学

2025年11月20日公開。DayZを開発したRocketwerkzのCEO Dean HallとKerbal Space Programの作者Felipe Falangheが、従来型ゲームエンジンに代わるカスタムフレームワーク開発の利点を主張。自社フレームワーク「Brutal」を用いたKitten Space Agencyのアルファ版を約1年で完成させた事例を紹介する。

## 設計思想：「何をしたいか」から始める

Hallは「まず『何をしたいか？』を問い、次に『どう実現するか？』を問う」べきと主張。従来のエンジン依存開発では、エンジンの制約に引きずられた設計になりがちだと指摘する。

## フレームワーク「Brutal」の特性

| 特性 | 内容 |
|------|------|
| 言語 | C#（.NETベース） |
| グラフィックス | Vulkanへの低レベルアクセス |
| 主目的 | 「浮動原点 (floating origin)」など宇宙シミュレーターに必要な高精度の実現 |
| ワークフロー | GUIではなくテキストベースのコード中心 |

## 従来エンジンの限界

- Unity/Unrealのシーン相対レンダリングは宇宙スケールのシミュレーションに不向き
- エンジンのブラックボックス化により、根本的な制約の回避が困難

## LLMとの親和性

テキストベースの構造化コードを中心に据えるカスタムフレームワークは「AIコーディングツールとの相性が良い」と主張。ただし「バイブコーディング (vibe-coding)」ではなく、AIをドキュメント調査に使う姿勢を強調する。

## Build vs. Buy 判断軸

カスタムフレームワーク採用はゲームの核心的な制約が既存エンジンのデフォルト設計と衝突する場合に有効。ゲームジャンル・規模に応じた「Build vs. Buy」の判断が重要であることを実例で示す。
