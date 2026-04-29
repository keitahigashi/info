---
name: Standard Patterns in Choice-Based Games
description: 選択ベースゲーム8構造パターン（Time Cave/Gauntlet/Branch&Bottleneck/Quest/Open Map等）・状態追跡・分岐/合流設計
type: reference
---

## 出典

These Heterogenous Tasks (Sam Kabo Ashwell): https://heterogenoustasks.wordpress.com/2015/01/26/standard-patterns-in-choice-based-games/

## 8つの構造パターン

### 1. Time Cave（時間洞窟）
- **構造**: 多数の分岐、ほぼ再合流なし
- **状態追跡**: 最小限
- **効果**: 自由と可能性の感覚。幅広いが短い体験
- **事例**: The Cave of Time, Pretty Little Mistakes

### 2. Gauntlet（ガントレット）
- **構造**: 線形中核に周辺分岐。失敗で剪定
- **2種類**: 致命的（デス分岐）vs 友好的（再合流）
- **効果**: 1つの「正統」ストーリーパス
- **事例**: Zork: The Forces of Krill

### 3. Branch and Bottleneck（分岐と瓶首）
- **構造**: 分岐は定期的に再合流。共通イベントで結集
- **状態追跡**: 重い（過去選択の累積効果を保持）
- **効果**: 時間進行を維持しつつ選択の影響を表現
- **事例**: Long Live the Queen, Choice of Games

### 4. Quest（クエスト）
- **構造**: モジュール式小クラスタ。地理的に組織化
- **再合流**: 多数のオプション
- **効果**: 探索と世界設定に焦点。エピソード的物語
- **事例**: Fighting Fantasyシリーズ, 80 Days

### 5. Open Map（開放地図）
- **構造**: 可逆的地理移動。静的世界を常時探索
- **Questとの違い**: 時間的方向性なし
- **効果**: 遅いペース、詳細なプレイヤー理解を優先
- **事例**: Duelmaster

### 6. Sorting Hat（選別帽）
- **構造**: 初期分岐 → 状態追跡 → 単一線形分岐へ割当
- **効果**: 幅と深さの妥協
- **事例**: Katawa Shoujo

### 7. Floating Modules（浮遊モジュール）
- **構造**: 中核ストーリーなし。状態で出現するモジュール式遭遇
- **難点**: 著述困難、大量コンテンツ必須
- **事例**: StoryNexus, Bee

### 8. Loop and Grow（ループと成長）
- **構造**: 中核ループが繰返され、状態により選択肢拡張
- **変種**: Spoke and Hub（複数分岐が中心に戻る）
- **事例**: Bee, Solarium

## 状態追跡の役割

| パターン | 状態追跡の重さ |
|---------|--------------|
| Time Cave | 最小 |
| Gauntlet | 低 |
| Branch and Bottleneck | **重い** |
| Quest | 中程度 |
| Sorting Hat | 中〜重 |
| Floating Modules | **非常に重い** |
| Loop and Grow | 中程度 |

## 分岐と合流の連続体

| パターン | 分岐度 | 再合流度 |
|---------|--------|---------|
| Time Cave | 最大 | 最小 |
| Gauntlet | 制約 | 強制 |
| Branch and Bottleneck | 中 | 定期的・意図的 |
| Open Map | 自由 | 常時可能 |

## 設計上の教訓

- これらは**離散的カテゴリではなく連続体**
- 多くの作品が複数パターンの要素を組み合わせている
- パターンの選択はナラティブの目標（探索/感情的深さ/リプレイ性）に依存
- 状態追跡の複雑性がパターン選択の実装コストを大きく左右
