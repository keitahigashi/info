---
name: Claude Code v2.1.176：モデル制御の抜け穴修正とバグ修正まとめ
description: availableModels強制回避の抜け穴修正・Bedrock認証改善・Hook条件パスマッチ修正
type: reference
---

## 出典

Qiita（picnic）: https://qiita.com/picnic/items/f8974940833ddc6bef5a

## Claude Code v2.1.176 主要変更内容（2026年6月13日）

### 重要な修正内容

#### availableModels強制回避の抜け穴修正（High）
- 環境変数経由でのブロック済みモデルへのリダイレクト経路を遮断
- `/fast`コマンドによる許可リスト外モデルへの切替えを拒否
- セキュリティ・ガバナンス上の重要な修正

#### Bedrock認証情報キャッシュの改善（Medium）
- 固定1時間から各認証情報の有効期限まで延長
- 頻繁な認証エラーが解消

#### Fable 5のautoモード失敗修正（Medium）
- 利用可能な最良のOpusモデルへフォールバック
- Fable 5停止中でもautoモードが正常動作

#### Hook条件パスマッチの修正（Medium）
- `Edit(src/**)` や `Read(.env)` パターンが正しくマッチするよう修正
- セキュリティフィルタリングのHook設定が意図通りに機能するように

#### その他修正
- Remote Control複数不具合修正（Medium）
- バックグラウンド/クラウドセッション複数修正（Medium）
- Windows/Linux/tmux環境固有の修正（Low）

### 影響と対応
- `availableModels` でモデル制限している組織は今回の修正で強制が確実に機能するようになった
- Bedrock利用者は認証エラーの減少を確認できる
- Hook設定のパスパターンを使っている場合は動作再確認を推奨
