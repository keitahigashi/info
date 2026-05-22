---
name: Using the Agential Structure Model to classify fun
description: 行為とフィードバックを軸に楽しさを8タイプ・19サブタイプに分類するAgential Structure Model（ASM）の提案
type: reference
---

## 出典

Game Developer (Satoshi Ido, 2017): https://www.gamedeveloper.com/design/using-the-agential-structure-model-to-classify-fun

## Agential Structure Model（ASM）の概要

著者が提案する楽しさの分類フレームワーク。「行為 (agency) と外部からのフィードバック」の組み合わせを軸として、ゲームの楽しさを **8カテゴリ・19サブタイプ**に体系化する。

MDA フレームワークや Caillois の4分類（Agon・Alea・Mimicry・Ilinx）を補完・拡張する位置づけ。

## 楽しさの8タイプ

| タイプ | 定義 | 代表例 |
|--------|------|--------|
| **Rewardal Fun（報酬的楽しさ）** | 目標達成から得られる喜び | レベルアップ・クエスト完了 |
| **Operational Fun（操作的楽しさ）** | ゲーム状態への直接的な操作感 | 物理演算・アクション操作 |
| **Social Fun（社会的楽しさ）** | 他プレイヤーとの相互作用 | PvP・協力プレイ |
| **Considerational Fun（思考的楽しさ）** | 戦略や表現を通じた影響 | ストラテジー・パズル |
| **Fictional Fun（虚構的楽しさ）** | ゲーム世界への没入感 | ロールプレイ・ナラティブ |
| **Passival Fun（受動的楽しさ）** | スリル感・フロー状態 | リズムゲーム・レーシング |
| **Objectual Fun（客体的楽しさ）** | 視覚・音響美の鑑賞 | アート・サウンドデザイン |
| **External Fun（外部的楽しさ）** | ゲーム外の社会的文脈 | 実況・コミュニティ参加 |

## 既存フレームワークとの対応

```
Caillois → ASM 対応:
  Agon（競争）   → Social Fun + Rewardal Fun
  Alea（偶然）   → Rewardal Fun（予測不能報酬）
  Mimicry（模倣）→ Fictional Fun
  Ilinx（めまい）→ Passival Fun
```

## 「目標の構造」図解

ゼルダ時のオカリナ・ポケモン・Guitar Hero を事例に、各ゲームの目標がどの楽しさタイプと接続されているかを図示。

- **垂直統合**: 短期目標→長期目標の階層
- **水平統合**: 並列する複数目標（コレクション・探索・戦闘）
- **段階的統合**: チュートリアルから高度プレイへの移行
- **創発的統合**: プレイヤー生成のメタ目標

## 設計への応用

### ゲームデザインでの活用
- 設計するゲームが意図的に刺激する楽しさタイプを明示することで、機能追加の優先度を判断できる
- 複数タイプをカバーするゲームは広いプレイヤー層に対応できるが、フォーカスが散漫になるリスクがある
- ゲームのジャンル定義に使用できる（「このゲームは Rewardal + Considerational に特化する」）

### ゲーミフィケーションへの応用
報酬メカニズム（Rewardal Fun）だけに頼らず、Social / Operational / Fictional Fun を組み込むことでエンゲージメントの質を高める。
