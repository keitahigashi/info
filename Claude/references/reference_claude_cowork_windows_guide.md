---
name: Claude Cowork実践ガイド（Windows 11）
description: ローカルファイルアクセス・サンドボックス実行・画像リサイズ実例・スケジュール実行（@IT）
type: reference
---

## 出典
- URL: https://atmarkit.itmedia.co.jp/ait/articles/2603/27/news017.html
- 著者: 島尻勝（デジタルアドバンテージ）
- 公開日: 2026-03-27

## 概要
Claude Cowork（Anthropic提供AIエージェント）のWindows 11での導入から実践活用まで。従来チャットボットと異なりファイルシステムに直接アクセスして自律的に業務実行。

## 詳細

### 特徴
- PC内ファイルを直接読み書きするエージェント型AI
- サンドボックス環境（仮想マシン）で安全に実行
- グローバル指示設定（全セッション共通プロンプト）
- スケジュール実行（Googleカレンダー連携）

### システム要件
- Windows 11必須
- Intel VT-x or AMD-V対応CPU
- 5GB以上のストレージ
- ARM64(Snapdragon)未サポート

### 実践例
画像ファイルの800px幅リサイズ＋結果フォルダ保存を自律実行。

### 料金
無料版では利用不可。Pro/Max/Team/Enterprise等の有料プランが必要。

### トラブルシューティング
ログ: `%LOCALAPPDATA%\Packages\Claude_pzs8sxrjxfjjc\LocalCache\Roaming\Claude\logs`
