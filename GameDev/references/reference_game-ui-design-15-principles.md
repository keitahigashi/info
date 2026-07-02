---
name: "Game UI Design"
description: ゲームUIデザインの実践的15原則を、倫理的設計・ハードウェア物理特性・将来拡張性まで含めて解説したチェックリスト記事。
type: reference
---

## 出典

Game Developer (gamedeveloper.com): https://www.gamedeveloper.com/design/game-ui-design

## ゲームUI設計の15原則

著者: Brian Oppenlander（M.S. in Human-Computer Interaction, Indiana University）、2015年12月23日、Game Developer

---

### 15の実践的UI設計原則

| # | 原則名 | 内容 |
|---|---|---|
| 1 | Fast Hook | ゲーム開始までの手順を最小化。プレイヤーの注意は短い |
| 2 | Keep It Light | UI要素ごとに認知負荷が増加。視覚ノイズとテキストを削減 |
| 3 | Bake the Tutorial In | チュートリアル画面は不要。レベルデザインで自然に学ばせる |
| 4 | Guide Users Ethically | ダークパターン（dark patterns）の排除。購入・広告クリックへの誘導でプレイヤーを騙さない |
| 5 | Theme Consistency | UIの美学はゲームの世界観と一致させる |
| 6 | Focus on Content | ゲームプレイを中断するUI要素を最小化し没入感を維持 |
| 7 | Sketch & Wireframe | コーディング前にローファイスケッチで批評。色やボタンに惑わされない |
| 8 | Visual Hierarchy | 視線誘導を意図的に設計し、要素間の優先度競合を防ぐ |
| 9 | Leverage Familiarity | 慣習的なジェスチャー・ボタン配置を活用（iPhoneの戻るボタンは左上等） |
| 10 | Hardware Awareness | デバイスの物理的な持ち方を考慮。端スワイプはシステム機能と競合 |
| 11 | User Testing | 実際のプレイヤーを観察し躊躇を検出。設計者の思い込みを排除 |
| 12 | Maintain Flow | チャレンジと退屈のバランスを維持し、エンゲージメント（engagement）状態を中断しない |
| 13 | Create Consistency | カラーパレット・ナビゲーション・デザインパターンを全編通じて統一 |
| 14 | Provide Feedback | ユーザー行動を明確に確認させる（色変化・アニメーション） |
| 15 | Plan Ahead | 将来機能のためのUI空間を予約（Hearthstoneのタバーンブロール枠がその例） |

---

### 具体的実装事例

**Furdemption（原則3: Bake the Tutorial In）**
アニメーション付きスワイプチュートリアルでテキストなしにコアメカニクスを教える実例。文字なしでのオンボーディング設計の好例。

**Yukon Warrior（原則14: Provide Feedback）**
カラーフィリング付きプログレスバーがアップグレード購入を視覚的に示す。行動の結果を即座にフィードバックする設計。

**Hearthstone（原則15: Plan Ahead）**
タバーンブロール機能リリース前からUIスペースを確保。機能追加時にUIの大幅改修が不要になる設計先行の実例。

---

### 特に注目すべき視点

**倫理的設計（原則4）**

2015年時点で既にダークパターン問題を提起。「プレイヤーの信頼を維持することが長期的価値」という視点は現代のゲームUI設計でも重要。短期収益よりもプレイヤーとの信頼関係を優先する設計指針。

**ハードウェア物理特性への配慮（原則10）**

- スマートフォンの持ち方を実測して配置設計
- 画面端のシステムジェスチャーとの競合回避
- モバイルゲーム設計において特に重要な視点（親指到達範囲の考慮）
