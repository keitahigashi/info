---
name: Claude Code 公式 Changelog v2.1.179〜v2.1.183（2026年6月16〜19日）
description: 自動モード安全性強化・/config key=value構文・部分レスポンス保持など直近の公式変更点まとめ
type: reference
---

## 出典

Anthropic 公式: https://code.claude.com/docs/en/changelog

## Claude Code v2.1.179〜v2.1.183 変更点まとめ

### v2.1.183（2026年6月19日）— 最新

#### 自動モードの安全性強化

破壊的なgitコマンドを明示的な指示なしにブロック：

```bash
# ブロック対象（明示指示がない場合）
git reset --hard
git checkout -- .
git clean -fd
git stash drop

# エージェントが作成していない過去コミットへの変更もブロック
git commit --amend

# インフラ破壊コマンドもブロック
terraform destroy
pulumi destroy
cdk destroy
```

#### 非推奨モデルの警告

- 要求されたモデルが非推奨または自動更新される場合、`stderr`に警告を表示
- 廃止予定のモデルIDを使用しているユーザーへの事前通知

#### バグ修正

- WebSearch検索結果が空になる問題
- tmuxペアの起動失敗
- 思考ブロックのみで完了するターンの問題

---

### v2.1.181（2026年6月17日）

#### /config key=value 構文（プロンプトから設定変更）

```
/config model=claude-opus-4-8
/config thinking=true
```

- セッション中にプロンプトから設定を直接変更可能
- 設定ファイルを編集せずにパラメータ調整できる

#### sandbox.allowAppleEvents 設定

```json
{
  "sandbox": {
    "allowAppleEvents": true
  }
}
```

- macOS上でApple Eventsを許可する新設定
- Automator・AppleScript連携が可能に

#### その他

- **Bunランタイムを1.4にアップグレード**（パフォーマンス改善）
- プロンプトキャッシング関連の修正

---

### v2.1.179（2026年6月16日）

#### 中断されたストリーム接続の部分レスポンス保持

- ネットワーク切断時に受信済みの部分レスポンスを保持・表示
- 長時間タスクのレジリエンス向上

#### WSL2でのマウスホイールスクロール修正

- WSL2環境でのTUI操作がより快適に

---

### まとめ：直近のテーマ

| バージョン | テーマ |
|-----------|--------|
| v2.1.183 | 安全性（破壊的操作のブロック） |
| v2.1.181 | 操作性（プロンプトから設定変更） |
| v2.1.179 | 安定性（ネットワーク耐障害性） |
