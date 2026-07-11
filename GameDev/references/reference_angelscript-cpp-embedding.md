---
name: AngelScript を C++ プロジェクトに組み込む
description: 静的型付き組み込みスクリプト言語 AngelScript を C++ プロジェクトへ実装する完全ガイド——バインディング・型システム・IDE連携まで実例コードつきで解説。
type: reference
---

## 出典

Zenn（sashi0034）: https://zenn.dev/sashi0034/articles/bf06646e0d88ac

## AngelScript の C++ 組み込み実装ガイド

### AngelScript とは

- 20年以上開発継続中の静的型付き組み込みスクリプト言語（embedded scripting language）
- 採用事例：『It Takes Two』（2021年GOTY）等
- C/C++ 関数をほぼそのまま呼び出し可能、型はC++と同等の粒度（int8〜uint64）

### Lua との比較

| 観点 | Lua | AngelScript |
|------|-----|-------------|
| 型付け | 動的 | 静的 |
| 数値型 | double のみ | int8〜double |
| インデックス | 1-based | 0-based（C++互換） |
| IDE補完 | 弱い | 強力 |
| パフォーマンス | 中 | C++ 並み |

### Visual Studio 導入手順

1. `angelscript/sdk/angelscript` をソリューション直下に配置
2. `angelscript/projects/msvc2022/angelscript.vcxproj` を参照追加
3. インクルードパス `../angelscript/include` を設定
4. `_CRT_SECURE_NO_WARNINGS` をプリプロセッサに定義

### 基本セットアップ

```cpp
asIScriptEngine* engine = asCreateScriptEngine();
engine->SetMessageCallback(asFUNCTION(MessageCallback), 0, asCALL_CDECL);
RegisterStdString(engine);
engine->RegisterGlobalFunction(
    "void print(const string &in)",
    asFUNCTION(print), asCALL_CDECL);
```

### asbind20 によるバインディング（binding）

C++20 ヘッダオンリーライブラリ `asbind20` で型バインドを簡潔に記述できる。

```cpp
// 値型（構造体など）のバインド
asbind20::value_class<Vector3>(engine, "Vector3", asOBJ_APP_CLASS_ALLFLOATS)
    .behaviours_by_traits()
    .property("float x", &Vector3::x);

// 参照型（ハンドル付き）のバインド
asbind20::ref_class<GameObject>(engine, "GameObject")
    .default_factory()
    .addref(&GameObject::addRef)
    .release(&GameObject::release);
```

- **value_class**: 値型。POD / 全メンバが値型の場合
- **ref_class**: 参照型。`Type@` ハンドルで保持可能。参照カウント管理が必要

### スクリプト実行

```cpp
asIScriptFunction* func = module->GetFunctionByDecl("void main()");
asIScriptContext* ctx = engine->CreateContext();
ctx->Prepare(func);
ctx->Execute();
ctx->Release();

// asbind20 版（戻り値の型安全な取得）
const auto result = asbind20::script_invoke<float>(ctx, func, arg1, arg2);
```

### IDE統合（VSCode）

`as.predefined` ファイルにC++の型定義を記述することでIDE補完が有効化される。

```angelscript
class Vector3 { float x, y, z; }
void println(const string& in msg);
```

### 重要な注意点

- value_class の `asOBJ_*` フラグは手動設定が必要
- ref_class は COM形式の参照カウント（addRef/release）を実装
- ホットリロード対応：コンパイル工程が不要なため開発イテレーションが高速
