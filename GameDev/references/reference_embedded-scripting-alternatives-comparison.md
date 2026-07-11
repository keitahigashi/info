---
name: Lua の代替スクリプト言語まとめ
description: ゲームエンジン組み込みに使えるスクリプト言語をLuaトランスパイラ系・独立VM系に分けて比較し、用途別の選定指針を示す。
type: reference
---

## 出典

Zenn（sashi0034）: https://zenn.dev/sashi0034/articles/94ef379f8dbd71

## 組み込みスクリプト言語の選択ガイド（Lua代替比較）

### 背景

Lua の課題として「動的型付けによるIDEサポートの弱さ」「全数値が double（メモリ非効率）」「1-based indexing」が挙げられる。これらを解決する代替手段を2カテゴリに分けて整理する。

### カテゴリA：Lua VM上のトランスパイラ言語

既存Luaの資産を流用しつつ文法を改善するアプローチ。

| 言語 | 特徴 | 活発度 |
|------|------|--------|
| MoonScript | Python系の構文、Luaにコンパイル | 2016年で開発休止気味 |
| Fennel | LISP系関数型、マクロ機能豊富 | 継続中 |
| Teal | TypeScript的な静的型付け（enum/record/interface） | 継続中 |
| YueScript | MoonScriptの方言、パイプ演算子・メタテーブル拡張 | 2025年時点で活発 |
| TypeScriptToLua | TypeScript→Luaトランスパイル | 野心的プロジェクト |

### カテゴリB：独立VMの組み込み言語（embedded scripting）

LuaVM非依存で、C++プロジェクトに直接組み込む言語群。

| 言語 | 実装 | 適性 |
|------|------|------|
| **AngelScript** | C++、静的型付け、20年継続 | ゲーム開発に最適（It Takes Two 採用実績） |
| Rhai | Rust実装、軽量 | Rustプロジェクト向け（ゲームロジック全体には非推奨） |
| pocketpy (Python) | C実装のPython VM | Pythonライクな構文 |
| Duktape / QuickJS | JavaScript VM | ブラウザ系との親和性高い |

### パフォーマンス比較（ベンチマーク）

AngelScript > Blueprint > Lua（AngelScriptはC++と遜色なし）

### 用途別推奨

- **Luaプロジェクトの改善**: Teal（型安全性の追加）
- **C++ゲーム開発**: AngelScript（型安全 + C++連携の容易さ）
- **Rustプロジェクト**: Rhai
