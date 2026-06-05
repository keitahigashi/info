---
name: Claude Code 最大の要望 AGENTS.md 対応——5,200 を超える reactions の痛みと今すぐできる回避策
description: Claude CodeがAGENTS.mdに未対応のため年100時間以上の工数が発生している問題と、6つの現実的な回避策を解説
type: reference
---

## 出典

Qiita (@yurukusa): https://qiita.com/yurukusa/items/e7e5eb7083c81781aa8e

## 概要

GitHub issue #6235 は「5,200 を超える reactions」を獲得し、「AGENTS.md への対応」を求めている。2025年8月以来 9ヶ月以上対応されていない Claude Code 最大の未解決要望。

## 問題の本質

複数の AI コーディングツール（Claude Code、Cursor、Codex など）を併用する際、各ツールが異なる指示書ファイルを読み込む。

| ツール | 指示書ファイル |
|--------|--------------|
| Claude Code | CLAUDE.md |
| Cursor / Codex / 他 | AGENTS.md |
| GitHub Copilot | .github/copilot-instructions.md |

CLAUDE.md と AGENTS.md を別々に維持する必要があり、**同期作業が年 100 時間以上**かかる場合がある。

## 6つの回避策

### 1. CLAUDE.md に AGENTS.md を取り込む（公式推奨）

```markdown
# CLAUDE.md
@AGENTS.md
```

Claude Code が `@ファイル名` 形式でのファイル参照をサポートしており、AGENTS.md の内容を自動的に読み込む。

### 2. シンボリックリンク活用

```bash
ln -s AGENTS.md CLAUDE.md
```

片方を更新すれば自動的にもう一方に反映される。ただし Git ワークフローに注意。

### 3. pre-commit hook で自動同期

```bash
# .git/hooks/pre-commit
#!/bin/bash
cp AGENTS.md CLAUDE.md
git add CLAUDE.md
```

コミット前に自動的に AGENTS.md の内容を CLAUDE.md にコピー。

### 4. SessionStart で整合性確認

```bash
# CLAUDE.md または AGENTS.md を SessionStart フックで読み込み確認
```

### 5. direnv で環境変数管理

```bash
# .envrc
export CLAUDE_CONFIG_PATH="./AGENTS.md"
```

### 6. CI で差異検出

```yaml
# .github/workflows/check-sync.yml
- name: Check CLAUDE.md sync
  run: diff AGENTS.md CLAUDE.md || exit 1
```

## 現状と展望

- GitHub issue #6235 には 5,200+ reactions が集まっており、Anthropic も認識している
- 公式回答では「将来的に対応予定」とされているが具体的な時期は未定
- 回避策 1（`@AGENTS.md` 参照）が最も低コストで推奨
