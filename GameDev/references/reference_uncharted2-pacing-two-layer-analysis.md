---
name: "Charting Through Pacing of Uncharted 2. Part 1 — Pacing Principles"
description: Uncharted 2の全チャプターを「高レベル／低レベル」2層ペーシングモデルで解析し、緊張と弛緩の波形設計を実例付きで体系化した論文的記事。
type: reference
---

## 出典

Game Developer: https://www.gamedeveloper.com/design/charting-through-pacing-of-uncharted-2-part-1---pacing-principles

## 2層ペーシング（pacing）フレームワーク

**テーマ**: ゲーム全体の体験強度を管理する2層ペーシングモデルとUncharted 2での実証分析

### 高レベルペーシング（High-Level Pacing）

- ゲーム全体の強度曲線を管理する「心拍グラフ（heartbeat graph）」
- 3回の大きなピーク（peak）を経て収束する三幕構造と対応
- 全体弧（narrative arc）の設計として、どの時点で最大強度を置くかの判断が重要

### 低レベルペーシング（Low-Level Pacing）

- 場面ごとの多様性（variety）管理
- 戦闘→パズル→探索の交互配置でモノトニー（monotony）を排除
- 各シーン単体の強度コントロール

### Uncharted 2の構造的選択

- **序盤**: 即座にアクションで視聴者フックを確立
- **戦略的「谷」（valley）**: 長時間高強度シーン直後に最低強度を挿入し疲労を回復
- **クライマックス回避**: 終盤は意図的に最大強度を抑え、ナラティブ着地点に感情的余白（breathing room）を確保

### 低レベル実例（第6章詳細）

- 強度ピーク中にパズル（puzzle）を配置しない（認知的矛盾の回避）
- ヘリコプター追跡で既存アクションを新たな文脈で再演出
- 同一アセット（asset）の異配置・異目的再利用で多様感を維持しつつ開発コストを抑制

### 普遍的教訓

- 同一のゲームシステムでも「文脈（context）」と「順序（sequence）」を変えることで体験の幅が劇的に広がる
- 開発者はペーシングを「技術的実装」ではなく「体験設計（experience design）」の問題として捉える必要がある
- 高/低2層の分析視点は自作ゲームのレビューにも直接応用可能
