# 厳守ルール — Git 運用

- 作業ブランチは **main 固定**。新規ブランチは絶対に作成しない。
- 作業開始時は必ず `git branch --show-current` を実行し、
  main でなければ `git switch main` で戻ってから着手する。
- 以下は実行禁止（settings.json でもブロック済み）:
  - `git checkout -b` / `git switch -c` / `git branch <new>`
  - `git worktree add`
  - `gh pr create` などの PR 作成
- 変更は main に直接 `git add` → `git commit` する。