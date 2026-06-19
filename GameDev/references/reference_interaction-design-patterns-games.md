---
name: Designing Usable and Accessible Games with Interaction Design Patterns
description: インタラクションデザインパターンを活用してゲームのユーザビリティとアクセシビリティを改善する手法
type: reference
---

## 出典

Game Developer (Eelke Folmer): https://www.gamedeveloper.com/design/designing-usable-and-accessible-games-with-interaction-design-patterns

## Designing Usable and Accessible Games with Interaction Design Patterns

著者: Eelke Folmer / 公開: 2007年5月17日

### ユーザビリティとアクセシビリティの定義

| 概念 | 定義 |
|------|------|
| ユーザビリティ (usability) | プレイヤーがゲームプレイを理解し、効率的に操作できるか |
| アクセシビリティ (accessibility) | 障害を持つプレイヤーを含む多様な利用者がゲームにアクセスできるか |

### 識別された5つの問題カテゴリ

1. **待機時間**: ロード画面・カットシーンなどプレイヤーが受動的になる時間
2. **プレイヤーエラー**: 操作ミスや誤った情報理解による失敗
3. **個別対応の欠如**: 多様なスキルレベルや障害への対応がない
4. **ヘルプ不足**: 必要な情報が提供されないか、タイミングが悪い
5. **フィードバック不足**: アクションに対する視覚・聴覚・触覚フィードバックの欠如

### インタラクションデザインパターンのアプローチ

既存ゲームの実証済み解決策を「パターン」として記述し、設計知識を再利用可能にする。

**パターン記述の構成要素:**
- 問題 (Problem): どのユーザビリティ/アクセシビリティ課題を解決するか
- コンテキスト (Context): どのゲーム状況で適用するか
- 解決策 (Solution): 具体的な設計手法
- 実例 (Examples): 実際のゲームでの適用事例

### 具体的なパターン例

| パターン | 内容 | 実例 |
|---------|------|------|
| 適応難易度 (Adaptive Difficulty) | プレイヤーのパフォーマンスに応じて難易度を自動調整 | 各種DDA実装 |
| シームレスワールド (Seamless World) | ロード時間を排除する継続的な世界設計 | GTA・TES シリーズ |
| スロー機能 (Slow Feature) | 時間を減速させ、複雑な操作に対応する | Max Payne のバレットタイム |
| エラー回復 (Error Recovery) | 誤操作からの容易な回復を提供 | 多段アンドゥ機能 |

### 設計への示唆

- パターンは処方箋ではなく**インスピレーションのカタログ**として活用する
- *God of War*・*Dungeon Siege*・*Max Payne* など実績あるゲームからパターンを抽出している
- パターンライブラリ化により、チーム内での設計知識の共有と引き継ぎが容易になる
