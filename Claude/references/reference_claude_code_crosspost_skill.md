---
name: Zennに投稿した記事をQiitaとnoteにも自動転載するClaude Codeスキルを作った
description: Zennを正本に4スキル構成でQiita/noteへ自動転載。API/Playwright/GitHub連携の使い分けと認証情報管理
type: reference
---

## 出典

Zenn (@taroh_7): https://zenn.dev/taroh_7/articles/2026-04-30-zenn-qiita-note-auto-crosspost
公開日: 2026-04-30

## 概要

技術記事を複数プラットフォームへ転載する手間を4スキルで自動化。Zennを正本として、Qiita・noteに派生させる設計。

## 4スキル構成

| スキル | 機能 |
|--------|------|
| `/zenn-post` | GitHub連携でZennに投稿（正本作成） |
| `/zenn-to-qiita` | Zenn記事をQiita形式に変換してAPI投稿 |
| `/zenn-to-note` | Zenn記事をnote形式に変換してPlaywright経由で投稿 |
| `/note-post` | noteへの直接投稿（Playwright操作） |

## 投稿手段の使い分け

| プラットフォーム | 手段 | 理由 |
|--------------|------|------|
| Zenn | GitHub連携（push） | 標準的な投稿フロー |
| Qiita | REST API（v2） | 公式APIが充実 |
| note | Playwright（ブラウザ操作） | 公開APIなし |

## 実装コード例

### Qiita API v2投稿（PowerShell）

```powershell
$body = @{
    title   = $title
    body    = $content
    private = $true          # 「限定共有」で下書き代替
    tags    = @(@{name = "Claude"; versions = @()})
} | ConvertTo-Json -Depth 5

Invoke-RestMethod -Uri "https://qiita.com/api/v2/items" `
  -Method Post `
  -Headers @{ Authorization = "Bearer $env:QIITA_TOKEN" } `
  -ContentType "application/json" `
  -Body $body
```

### note ProseMirrorエディタへのペースト（JavaScript）

```javascript
const editor = document.querySelector(".ProseMirror");
editor.focus();
const dt = new DataTransfer();
dt.setData("text/plain", text);
editor.dispatchEvent(new ClipboardEvent("paste", { clipboardData: dt }));
```

## 設計上の判断ポイント

- **Qiitaの「限定共有」を下書き代替に使用**: 公開前確認フローを維持
- **認証情報は `~/.config/` に集約**: プロジェクトに秘密情報を置かない
- **外部書き込み操作は人間確認を挟む**: 誤投稿防止のため `/zenn-to-qiita` 実行前に確認ダイアログ

## 応用パターン

同様のアプローチで、Zenn → Dev.to（英語圏）への自動転載も実現可能。マークダウン変換部分のみ差し替えれば流用できる。
