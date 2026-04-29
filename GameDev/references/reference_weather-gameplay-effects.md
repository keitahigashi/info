---
name: The Dynamic Impact of Weather Systems on Gameplay
description: 天候システムのゲームプレイ影響・視認性/戦闘/移動/音響/AI反応への効果・設計原則・技術実装
type: reference
---

## 出典

DesignTheGame: https://www.designthegame.com/learning/tutorial/the-dynamic-impact-weather-systems-gameplay

## ゲームプレイへの直接的影響

| 領域 | 効果 |
|------|------|
| **視認性と戦闘** | 霧・豪雨で視界制限、遠距離戦闘困難化、潜行戦術の機会創出 |
| **移動と物理** | 雨・氷で表面滑り、泥地で速度低下、強風で弾道変化 |
| **音響環境** | 豪雨が足音消去、雷鳴が銃声隠蔽 |
| **AI反応** | NPC視認距離短縮、避難行動変化 |
| **リソース管理** | 防寒装備・シェルター必要性（生存ゲーム） |

## 設計原則

- プレイヤーへの明確なフィードバック（視覚・音響・UI要素）
- プレイヤーが対抗手段を持つバランス設計
- 天候は没入感と戦略性を強化するツール

## 技術実装

体積雲/フォグ、パーティクルベース降水、風物理、動的ライティング変化。
