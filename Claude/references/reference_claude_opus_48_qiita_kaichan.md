---
name: 出たてほやほやのClaude Opus 4.8を整理してみた
description: QiitaによるOpus 4.8整理記事。3つの新機能（Effort選択・Dynamic Workflows・Messages API更新）とMythosロードマップを解説
type: reference
---

## 出典

Qiita（@kaichan_dot）: https://qiita.com/kaichan_dot/items/a5234436a61194e24df7

## Claude Opus 4.8概要

**公開日：** 2026年5月29日

## 最大の改善点：正直さ（Honesty）

- 自信のない部分を自ら明示するようになった
- コード欠陥の見逃し率が前世代比で**約75%削減**（1/4に低下）
- SWE-Bench Pro：**69.2%**達成

## 新機能3つ

### ① Effort（努力）選択
利用者がClaudeの思考量を5段階で調整可能

```
低い  ←  Low | Medium | High | Extra | Max  →  高い
                          ↑
                       デフォルト
```

### ② Dynamic Workflows
Claude Codeが大規模タスクを自動分割し、数百のサブエージェントを並列実行後に自己検証

### ③ Messages API更新（開発者向け）
タスク実行中にユーザーターンを挟まず、システム指示を動的更新できる機能

## 価格・性能

| モード | 速度 | 価格（対従来比） |
|--------|------|----------------|
| Fast Mode | **2.5倍** | **3分の1** |

## 今後のロードマップ

- より低コストで同等性能のモデル開発予定（普及版）
- 「**Mythos**」クラスの新モデルを**数週間以内**に提供開始予定

<!-- 日常で得た知見をここに追記 -->
