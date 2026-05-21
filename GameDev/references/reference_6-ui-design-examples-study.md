---
name: "6 Examples of UI Design That Every Game Developer Should Study"
description: Clash Royale・Half-Life 2・Hearthstone・Overwatch・Assassin's Creed・Dead Space の6事例から抽出した UI/HUD 設計原則
type: reference
---

## 出典

Game Developer (Staff, 2017): https://www.gamedeveloper.com/audio/6-examples-of-ui-design-that-every-game-developer-should-study

## UI/HUD 設計の6事例分析

### 前提

HUDはプレイヤーがゲームの中核システムと相互作用する方法を決定し、プレイヤー行動を形作る重要な要素。優れたUI設計は認知負荷を軽減しながら、ゲームの美学と一体化し、ゲームプレイを向上させる。

### 6事例と設計原則

#### 1. Clash Royale — 情報の表面化 (Information Surfacing)

**専門家コメント**: Om Tandon（DIGIT Game Studios メディアディレクター）

- 多くのミッドコアゲームが複数メニュー階層で「摩擦 (friction)」を生じさせている問題に対処
- 二次情報を各セクション上部に配置、タブスクロール設計で即座にコンテンツ表示
- 結果：読み込み時間・操作ステップの削減

**原則**: 深い階層を避け、最もよく使う操作を最短で到達可能にする

---

#### 2. Half-Life 2 — 動的で音響的デザイン (Dynamic & Audio-Visual HUD)

**専門家コメント**: David Candland（Bungie デザインリード）

- 琥珀色の単色パレットが「シンプルで戦闘環境を妨げない」
- 収納中の武器はHUDに表示せず、必要な情報のみ動的に表示
- 音声キューが明確で、激しい戦闘中でも情報伝達が可能

**原則**: HUDは美的であり、表示/非表示を戦略的に制御する。情報は必要なときだけ表示する

---

#### 3. Hearthstone — 触覚的で明確なフィードバック (Tactile & Clear Feedback)

**専門家コメント**: Stanislav Costiuc（Ubisoft ゲームデザイナー）

- 重要情報が常に明確に表示
- カード移動などの単純な操作でも視覚と音声フィードバックを同時提供
- 「各クリックが満足感を与える」設計

**原則**: UIはゲーム世界の追加レイヤーではなく、ゲーム本体の一部として感じられるべき

---

#### 4. Overwatch — コンパクトで中心配置 (Compact & Center-weighted)

**専門家コメント**: Oliver Janoschek（Massive Entertainment シニアUIアーティスト）

- Zaryaのエネルギー指示器が照準十字星の周辺に配置
- 情報アクセスが容易かつ視線移動が最小化
- 高速FPSでの情報密度と視認性のバランス

**原則**: 注視点（照準・カーソル）の近くに重要情報を集約し、視線移動コストを最小化する

---

#### 5. Assassin's Creed — ミニマリズム (Minimalism / HUDレス)

**専門家コメント**: Stanislav Costiuc

- HUD廃止オプションがゲーム体験を大きく変える
- HUDなしでは「アイコンに従うのではなく、視覚的・音響的な環境の手がかりを探索して目標を発見」

**原則**: 強い設計哲学はHUDなしでも機能する。HUDはプレイヤーがゲーム世界を読み解く力を信頼するかどうかの指標

---

#### 6. Dead Space — 世界への統合 (Diegetic Integration)

**専門家コメント**: Jim Brown（Epic Games シニアデザイナー）

- 背中のヘルスメーター・床に投影される地図により「2Dオーバーレイ」を排除
- ヘルスバーが唯一の光源として恐怖の緊張感を醸成
- 目標表示が移動制限を生み、脆弱性を演出

**原則**: HUDをゲーム世界に有機的に統合することで、情報伝達とゲームの美学・テーマを同時に実現できる

### 4つの共通設計テーマ

| テーマ | 説明 |
|-------|------|
| 明確性 (Clarity) | 視線移動の最小化と情報階層化 |
| 応答性 (Responsiveness) | 視覚・音響フィードバックの統合 |
| 没入性 (Immersion) | UIが「UI」と感じさせないデザイン |
| 目的性 (Purpose) | ゲームプレイと物語への貢献 |
