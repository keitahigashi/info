// AI初心者向けチュートリアル（心構え編）スライドビルダー
const pptxgen = require("pptxgenjs");

// === カラーパレット ===
const C = {
  bgWhite:     "FFFFFF",
  bgLight:     "F5F7FA",
  bgNavy:      "0B1F3F",
  textBlack:   "1A1A1A",
  textDark:    "333333",
  textMuted:   "888888",
  textWhite:   "FFFFFF",
  royalBlue:   "1B3A6B",
  blue2:       "3D6098",
  blue3:       "7A9CC6",
  blue4:       "B8CCE4",
  blue5:       "D9E5F2",
  accentRed:   "C8102E",
  accentGreen: "2E7D32",
  gridLine:    "D0D0D0",
  divider:     "1B3A6B",
};

// === レイアウト定数 ===
const L = {
  mx: 0.5, my: 0.5,
  contentX: 0.5, contentY: 1.2, contentW: 9.0, contentH: 3.6,
  titleX: 0.5, titleY: 0.42, titleW: 9.0, titleH: 0.55,
  dividerY: 1.02,
  sourceX: 0.5, sourceY: 5.15,
  pageNumX: 9.0, pageNumY: 5.15,
  col2W: 4.3, col2Gap: 0.4, col2RightX: 5.2,
  col3W: 2.73, col3Gap: 0.4, col3MidX: 3.63, col3RightX: 6.76,
};

// === フォントファクトリ ===
const font = {
  actionTitle: () => ({ fontFace: "Yu Mincho", fontSize: 18, bold: true, color: C.bgNavy, margin: 0 }),
  sectionHeader: () => ({ fontFace: "Yu Mincho", fontSize: 14, bold: true, color: C.bgNavy, margin: 0 }),
  body: () => ({ fontFace: "Yu Gothic", fontSize: 12, color: C.textDark, margin: 0 }),
  bodySmall: () => ({ fontFace: "Yu Gothic", fontSize: 10, color: C.textDark, margin: 0 }),
  source: () => ({ fontFace: "Yu Gothic", fontSize: 8, color: C.textMuted, margin: 0 }),
  pageNum: () => ({ fontFace: "Calibri", fontSize: 8, color: C.textMuted, margin: 0 }),
  calloutNum: () => ({ fontFace: "Georgia", fontSize: 42, bold: true, color: C.royalBlue, margin: 0 }),
  calloutLabel: () => ({ fontFace: "Yu Gothic", fontSize: 10, color: C.textDark, margin: 0 }),
};

// === 共通: タイトルスライド ===
function addTitleSlide(pres, { title, subtitle, date }) {
  const slide = pres.addSlide();
  slide.background = { color: C.bgNavy };

  slide.addText(title, {
    x: 0.8, y: 1.4, w: 8.4, h: 1.3,
    fontFace: "Yu Mincho", fontSize: 30, bold: true,
    color: C.textWhite, align: "left", valign: "middle", margin: 0
  });

  slide.addShape(pres.shapes.LINE, {
    x: 0.8, y: 2.85, w: 2.0, h: 0,
    line: { color: C.textWhite, width: 1.0 }
  });

  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.8, y: 3.1, w: 8.4, h: 0.7,
      fontFace: "Yu Gothic", fontSize: 14, color: C.blue3,
      align: "left", valign: "top", margin: 0
    });
  }
  if (date) {
    slide.addText(date, {
      x: 0.8, y: 4.6, w: 8.4, h: 0.3,
      fontFace: "Calibri", fontSize: 10, color: C.blue4,
      align: "left", margin: 0
    });
  }
  return slide;
}

// === 共通: 標準コンテンツスライド ===
function addContentSlide(pres, { actionTitle, pageNum, sourceText }) {
  const slide = pres.addSlide();
  slide.background = { color: C.bgWhite };

  slide.addText(actionTitle, {
    x: L.titleX, y: L.titleY, w: L.titleW, h: L.titleH,
    ...font.actionTitle(), align: "left", valign: "top"
  });
  slide.addShape(pres.shapes.LINE, {
    x: L.mx, y: L.dividerY, w: L.contentW, h: 0,
    line: { color: C.divider, width: 0.5 }
  });
  if (sourceText) {
    slide.addText(sourceText, {
      x: L.sourceX, y: L.sourceY, w: 6, h: 0.3,
      ...font.source(), align: "left"
    });
  }
  if (pageNum) {
    slide.addText(String(pageNum), {
      x: L.pageNumX, y: L.pageNumY, w: 0.5, h: 0.3,
      ...font.pageNum(), align: "right"
    });
  }
  return slide;
}

// === 共通: セクション区切りスライド ===
function addSectionSlide(pres, { chapter, title, pageNum }) {
  const slide = pres.addSlide();
  slide.background = { color: C.bgNavy };

  slide.addText(chapter, {
    x: 0.8, y: 2.0, w: 8.4, h: 0.5,
    fontFace: "Calibri", fontSize: 14, color: C.blue3,
    align: "left", charSpacing: 4, margin: 0
  });
  slide.addShape(pres.shapes.LINE, {
    x: 0.8, y: 2.55, w: 1.2, h: 0,
    line: { color: C.textWhite, width: 1.0 }
  });
  slide.addText(title, {
    x: 0.8, y: 2.75, w: 8.4, h: 1.0,
    fontFace: "Yu Mincho", fontSize: 26, bold: true,
    color: C.textWhite, align: "left", valign: "top", margin: 0
  });
  if (pageNum) {
    slide.addText(String(pageNum), {
      x: 9.0, y: 5.15, w: 0.5, h: 0.3,
      fontFace: "Calibri", fontSize: 8, color: C.blue4, align: "right", margin: 0
    });
  }
  return slide;
}

// === 番号付き原則ボックス ===
function addPrincipleBox(slide, pres, { num, title, body, x, y, w, h, color }) {
  const c = color || C.royalBlue;
  // 番号サークル
  slide.addShape(pres.shapes.OVAL, {
    x: x, y: y, w: 0.6, h: 0.6, fill: { color: c }, line: { color: c, width: 0 }
  });
  slide.addText(String(num), {
    x: x, y: y, w: 0.6, h: 0.6,
    fontFace: "Georgia", fontSize: 20, bold: true, color: C.textWhite,
    align: "center", valign: "middle", margin: 0
  });
  // タイトル
  slide.addText(title, {
    x: x + 0.75, y: y + 0.02, w: w - 0.75, h: 0.35,
    fontFace: "Yu Mincho", fontSize: 14, bold: true, color: C.bgNavy,
    align: "left", valign: "top", margin: 0
  });
  // 本文
  slide.addText(body, {
    x: x + 0.75, y: y + 0.42, w: w - 0.75, h: h - 0.42,
    fontFace: "Yu Gothic", fontSize: 10.5, color: C.textDark,
    align: "left", valign: "top", margin: 0
  });
}

// === カードボックス（ラベル + 本文） ===
function addCard(slide, pres, { label, body, x, y, w, h, accentColor }) {
  const c = accentColor || C.royalBlue;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: x, y: y, w: w, h: h,
    fill: { color: C.bgLight }, line: { color: C.gridLine, width: 0.5 }
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: x, y: y, w: 0.08, h: h,
    fill: { color: c }, line: { color: c, width: 0 }
  });
  slide.addText(label, {
    x: x + 0.2, y: y + 0.12, w: w - 0.3, h: 0.35,
    fontFace: "Yu Mincho", fontSize: 12, bold: true, color: C.bgNavy,
    align: "left", valign: "top", margin: 0
  });
  slide.addText(body, {
    x: x + 0.2, y: y + 0.52, w: w - 0.3, h: h - 0.6,
    fontFace: "Yu Gothic", fontSize: 10, color: C.textDark,
    align: "left", valign: "top", margin: 0
  });
}

// === ビルド開始 ===
async function buildDeck() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "AIリテラシー講座";
  pres.title = "AIとの付き合い方";

  // =====================================================
  // スライド1: タイトル
  // =====================================================
  addTitleSlide(pres, {
    title: "AIとの付き合い方",
    subtitle: "使いこなす前に知っておきたい、心構えと基本原則",
    date: "AI初心者向けチュートリアル"
  });

  // =====================================================
  // スライド2: 本日のゴール
  // =====================================================
  {
    const s = addContentSlide(pres, {
      actionTitle: "本日のゴールは、AIを「正しく怖がり、正しく使う」姿勢を身につけること",
      pageNum: 2
    });

    const goals = [
      { num: "01", label: "AIの正体を知る", body: "仕組みと限界を理解し、過度な期待も恐怖も手放す" },
      { num: "02", label: "3つの原則を身につける", body: "鵜呑みにしない／丸投げしない／育てる意識を持つ" },
      { num: "03", label: "明日から試せる武器を持ち帰る", body: "対話の型・小さな一歩・継続する姿勢" },
    ];

    goals.forEach((g, i) => {
      const x = L.contentX + i * 3.05;
      const y = 1.6;
      slide2Card(s, pres, { ...g, x, y, w: 2.85, h: 2.6 });
    });

    s.addText("「使い方」より「向き合い方」を学ぶ講座です", {
      x: L.contentX, y: 4.5, w: L.contentW, h: 0.4,
      fontFace: "Yu Mincho", fontSize: 13, italic: true, color: C.royalBlue,
      align: "center", valign: "middle", margin: 0
    });
  }

  // =====================================================
  // スライド3: 第1章 セクション
  // =====================================================
  addSectionSlide(pres, {
    chapter: "C H A P T E R   1",
    title: "AIとは何か ― まず正体を知る",
    pageNum: 3
  });

  // =====================================================
  // スライド4: AIは確率的な予測機
  // =====================================================
  {
    const s = addContentSlide(pres, {
      actionTitle: "AIは「魔法」ではなく、次にくる言葉を確率で選ぶ予測機である",
      pageNum: 4
    });

    // 左: 大きなコールアウト
    s.addShape(pres.shapes.RECTANGLE, {
      x: L.contentX, y: L.contentY, w: 4.0, h: 3.4,
      fill: { color: C.bgNavy }, line: { color: C.bgNavy, width: 0 }
    });
    s.addText("確率的予測機", {
      x: L.contentX + 0.2, y: L.contentY + 0.3, w: 3.6, h: 0.5,
      fontFace: "Yu Mincho", fontSize: 16, bold: true, color: C.blue4,
      align: "left", valign: "top", margin: 0
    });
    s.addText("Probabilistic\nPredictor", {
      x: L.contentX + 0.2, y: L.contentY + 0.9, w: 3.6, h: 1.1,
      fontFace: "Georgia", fontSize: 30, bold: true, italic: true, color: C.textWhite,
      align: "left", valign: "top", margin: 0
    });
    s.addShape(pres.shapes.LINE, {
      x: L.contentX + 0.2, y: L.contentY + 2.2, w: 1.0, h: 0,
      line: { color: C.textWhite, width: 1 }
    });
    s.addText("膨大なテキストから「それっぽい続き」を生成する装置", {
      x: L.contentX + 0.2, y: L.contentY + 2.4, w: 3.6, h: 0.9,
      fontFace: "Yu Gothic", fontSize: 11, color: C.blue4,
      align: "left", valign: "top", margin: 0
    });

    // 右: 説明
    const rightX = L.contentX + 4.3;
    s.addText("ここがポイント", {
      x: rightX, y: L.contentY, w: 4.7, h: 0.35,
      fontFace: "Yu Mincho", fontSize: 13, bold: true, color: C.royalBlue,
      margin: 0
    });

    const points = [
      { h: "「理解」していない", b: "文の意味を把握しているのではなく、統計的にありそうな単語を並べているだけ" },
      { h: "「意図」もない", b: "あなたを助けたい・だましたいといった動機は持たない。ただ確率計算を回している" },
      { h: "だから嘘もつく", b: "「知らない」と答えるのが苦手で、知らないことでも堂々と答える（= ハルシネーション）" },
    ];
    points.forEach((p, i) => {
      const y = L.contentY + 0.5 + i * 0.95;
      s.addShape(pres.shapes.RECTANGLE, {
        x: rightX, y: y, w: 0.08, h: 0.8,
        fill: { color: C.royalBlue }, line: { color: C.royalBlue, width: 0 }
      });
      s.addText(p.h, {
        x: rightX + 0.2, y: y, w: 4.5, h: 0.3,
        fontFace: "Yu Mincho", fontSize: 12, bold: true, color: C.bgNavy, margin: 0
      });
      s.addText(p.b, {
        x: rightX + 0.2, y: y + 0.32, w: 4.5, h: 0.5,
        fontFace: "Yu Gothic", fontSize: 10, color: C.textDark, margin: 0
      });
    });
  }

  // =====================================================
  // スライド5: 得意・苦手
  // =====================================================
  {
    const s = addContentSlide(pres, {
      actionTitle: "AIには明確な得意分野と苦手分野がある ― 適材適所で使う",
      pageNum: 5
    });

    const headerH = 0.45;
    const rowH = 0.5;
    const startY = L.contentY + 0.1;

    // 左ヘッダー（得意: 青）
    s.addShape(pres.shapes.RECTANGLE, {
      x: L.contentX, y: startY, w: L.col2W, h: headerH,
      fill: { color: C.royalBlue }, line: { color: C.royalBlue, width: 0 }
    });
    s.addText("◎ 得意なこと", {
      x: L.contentX + 0.2, y: startY, w: L.col2W - 0.4, h: headerH,
      fontFace: "Yu Mincho", fontSize: 14, bold: true, color: C.textWhite,
      align: "left", valign: "middle", margin: 0
    });

    // 右ヘッダー（苦手: グレー）
    s.addShape(pres.shapes.RECTANGLE, {
      x: L.col2RightX, y: startY, w: L.col2W, h: headerH,
      fill: { color: C.textMuted }, line: { color: C.textMuted, width: 0 }
    });
    s.addText("✕ 苦手なこと", {
      x: L.col2RightX + 0.2, y: startY, w: L.col2W - 0.4, h: headerH,
      fontFace: "Yu Mincho", fontSize: 14, bold: true, color: C.textWhite,
      align: "left", valign: "middle", margin: 0
    });

    const goodItems = [
      "文章生成・要約・翻訳",
      "アイデア出し・たたき台作成",
      "形式変換（表 ↔ 文章 ↔ コード）",
      "壁打ち相手・文章添削",
      "大量テキストの読解補助",
    ];
    const badItems = [
      "厳密な計算・正確な数値",
      "最新情報（学習時点以降）",
      "事実・出典の保証",
      "あなたの組織・個人の事情",
      "価値判断・最終意思決定",
    ];

    goodItems.forEach((item, i) => {
      const y = startY + headerH + i * rowH;
      s.addShape(pres.shapes.RECTANGLE, {
        x: L.contentX, y: y, w: L.col2W, h: rowH,
        fill: { color: i % 2 === 0 ? C.bgWhite : C.bgLight },
        line: { color: C.gridLine, width: 0.5 }
      });
      s.addText(item, {
        x: L.contentX + 0.25, y: y, w: L.col2W - 0.4, h: rowH,
        fontFace: "Yu Gothic", fontSize: 11, color: C.textDark,
        align: "left", valign: "middle", margin: 0
      });
    });

    badItems.forEach((item, i) => {
      const y = startY + headerH + i * rowH;
      s.addShape(pres.shapes.RECTANGLE, {
        x: L.col2RightX, y: y, w: L.col2W, h: rowH,
        fill: { color: i % 2 === 0 ? C.bgWhite : C.bgLight },
        line: { color: C.gridLine, width: 0.5 }
      });
      s.addText(item, {
        x: L.col2RightX + 0.25, y: y, w: L.col2W - 0.4, h: rowH,
        fontFace: "Yu Gothic", fontSize: 11, color: C.textDark,
        align: "left", valign: "middle", margin: 0
      });
    });

    // 下部メッセージ
    s.addText("「何でも聞ける魔法」ではなく、「得意分野が明確な専門家」として扱う", {
      x: L.contentX, y: 4.55, w: L.contentW, h: 0.35,
      fontFace: "Yu Mincho", fontSize: 12, italic: true, color: C.royalBlue,
      align: "center", valign: "middle", margin: 0
    });
  }

  // =====================================================
  // スライド6: "詳しい新人"メンタルモデル
  // =====================================================
  {
    const s = addContentSlide(pres, {
      actionTitle: "AIは「知識豊富だが、あなたの事情を知らない新人」と考える",
      pageNum: 6
    });

    // 中央の大きな引用風ブロック
    s.addShape(pres.shapes.RECTANGLE, {
      x: L.contentX, y: L.contentY, w: L.contentW, h: 1.3,
      fill: { color: C.bgLight }, line: { color: C.gridLine, width: 0.5 }
    });
    s.addText("「", {
      x: L.contentX + 0.1, y: L.contentY - 0.1, w: 0.6, h: 0.8,
      fontFace: "Georgia", fontSize: 48, color: C.royalBlue, margin: 0
    });
    s.addText("優秀な新入社員に仕事を頼むとき、\n何も説明せずに丸投げしますか？", {
      x: L.contentX + 0.7, y: L.contentY + 0.15, w: L.contentW - 1.4, h: 1.0,
      fontFace: "Yu Mincho", fontSize: 16, bold: true, color: C.bgNavy,
      align: "center", valign: "middle", margin: 0
    });

    // 下段3カード
    const mapping = [
      { label: "知識は豊富", body: "幅広い分野の情報を持つが、網羅的・最新ではない" },
      { label: "あなたを知らない", body: "あなたの組織・顧客・目的・好みを知らない" },
      { label: "指示で応えてくれる", body: "背景・目的・制約を伝えれば的確に返してくれる" },
    ];
    mapping.forEach((m, i) => {
      const x = L.contentX + i * 3.05;
      const y = 3.0;
      addCard(s, pres, { ...m, x, y, w: 2.85, h: 1.7, accentColor: C.royalBlue });
    });
  }

  // =====================================================
  // スライド7: 第2章 セクション
  // =====================================================
  addSectionSlide(pres, {
    chapter: "C H A P T E R   2",
    title: "AIと向き合う3つの原則",
    pageNum: 7
  });

  // =====================================================
  // スライド8: 原則① 鵜呑みにしない
  // =====================================================
  {
    const s = addContentSlide(pres, {
      actionTitle: "原則① 鵜呑みにしない ― AIは平気で「もっともらしい嘘」をつく",
      pageNum: 8
    });

    // 左: ハルシネーション例
    s.addShape(pres.shapes.RECTANGLE, {
      x: L.contentX, y: L.contentY, w: 4.3, h: 3.4,
      fill: { color: C.bgLight }, line: { color: C.gridLine, width: 0.5 }
    });
    s.addText("よくある「嘘」の例", {
      x: L.contentX + 0.2, y: L.contentY + 0.15, w: 4.0, h: 0.35,
      fontFace: "Yu Mincho", fontSize: 13, bold: true, color: C.accentRed, margin: 0
    });

    const lies = [
      "存在しない論文・書籍を堂々と引用",
      "実在しない判例・法律条文を提示",
      "古い統計を「最新」と称して出す",
      "実在しないURL・API・関数名を生成",
    ];
    lies.forEach((lie, i) => {
      const y = L.contentY + 0.65 + i * 0.55;
      s.addText("✕", {
        x: L.contentX + 0.25, y: y, w: 0.3, h: 0.4,
        fontFace: "Calibri", fontSize: 14, bold: true, color: C.accentRed,
        align: "center", valign: "middle", margin: 0
      });
      s.addText(lie, {
        x: L.contentX + 0.6, y: y, w: 3.5, h: 0.4,
        fontFace: "Yu Gothic", fontSize: 11, color: C.textDark,
        align: "left", valign: "middle", margin: 0
      });
    });

    // 右: 検証ルール
    const rightX = L.contentX + 4.5;
    s.addText("検証の習慣", {
      x: rightX, y: L.contentY, w: 4.5, h: 0.35,
      fontFace: "Yu Mincho", fontSize: 13, bold: true, color: C.royalBlue, margin: 0
    });

    const rules = [
      { k: "一次ソース確認", v: "重要な情報は必ず公式・原典で裏を取る" },
      { k: "数字・固有名詞に注意", v: "統計値・人名・日付・製品名は特に誤りやすい" },
      { k: "聞き返す癖", v: "「それは本当に正しい？」「出典は？」を繰り返す" },
      { k: "専門領域では過信しない", v: "医療・法律・税務は必ず専門家に確認" },
    ];
    rules.forEach((r, i) => {
      const y = L.contentY + 0.5 + i * 0.7;
      s.addShape(pres.shapes.RECTANGLE, {
        x: rightX, y: y, w: 0.08, h: 0.6,
        fill: { color: C.royalBlue }, line: { color: C.royalBlue, width: 0 }
      });
      s.addText(r.k, {
        x: rightX + 0.2, y: y, w: 4.3, h: 0.28,
        fontFace: "Yu Mincho", fontSize: 11, bold: true, color: C.bgNavy, margin: 0
      });
      s.addText(r.v, {
        x: rightX + 0.2, y: y + 0.3, w: 4.3, h: 0.32,
        fontFace: "Yu Gothic", fontSize: 9.5, color: C.textDark, margin: 0
      });
    });
  }

  // =====================================================
  // スライド9: 原則② 丸投げしない
  // =====================================================
  {
    const s = addContentSlide(pres, {
      actionTitle: "原則② 丸投げしない ― AIは判断者ではなく、あくまで補助者",
      pageNum: 9
    });

    // 中央大コールアウト
    s.addText("AIに聞いたから", {
      x: L.contentX, y: L.contentY + 0.1, w: L.contentW, h: 0.5,
      fontFace: "Yu Mincho", fontSize: 16, color: C.textMuted, italic: true,
      align: "center", valign: "middle", margin: 0
    });
    s.addText("ではなく", {
      x: L.contentX, y: L.contentY + 0.6, w: L.contentW, h: 0.35,
      fontFace: "Yu Gothic", fontSize: 11, color: C.textMuted,
      align: "center", valign: "middle", margin: 0
    });
    s.addText("「自分がAIを使って、こう判断した」が正解", {
      x: L.contentX, y: L.contentY + 0.95, w: L.contentW, h: 0.55,
      fontFace: "Yu Mincho", fontSize: 20, bold: true, color: C.royalBlue,
      align: "center", valign: "middle", margin: 0
    });

    // 下段: やりがちなNG 3つ
    const ngs = [
      { label: "丸写し", body: "出力をそのまま上司や顧客に提出する" },
      { label: "流される", body: "AIの提案が最適と思い込み、自分で考えない" },
      { label: "責任転嫁", body: "「AIがそう言った」で失敗を片付ける" },
    ];
    ngs.forEach((n, i) => {
      const x = L.contentX + i * 3.05;
      const y = 3.2;
      s.addShape(pres.shapes.RECTANGLE, {
        x: x, y: y, w: 2.85, h: 1.55,
        fill: { color: C.bgLight }, line: { color: C.gridLine, width: 0.5 }
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: x, y: y, w: 2.85, h: 0.35,
        fill: { color: C.accentRed }, line: { color: C.accentRed, width: 0 }
      });
      s.addText("やりがちなNG: " + n.label, {
        x: x + 0.15, y: y, w: 2.7, h: 0.35,
        fontFace: "Yu Gothic", fontSize: 10, bold: true, color: C.textWhite,
        align: "left", valign: "middle", margin: 0
      });
      s.addText(n.body, {
        x: x + 0.15, y: y + 0.5, w: 2.65, h: 0.95,
        fontFace: "Yu Gothic", fontSize: 10.5, color: C.textDark,
        align: "left", valign: "top", margin: 0
      });
    });
  }

  // =====================================================
  // スライド10: 原則③ 育てる意識
  // =====================================================
  {
    const s = addContentSlide(pres, {
      actionTitle: "原則③ 育てる意識を持つ ― 対話を重ねるほど精度は上がる",
      pageNum: 10
    });

    // 左: マインドセット比較
    const leftX = L.contentX;
    s.addShape(pres.shapes.RECTANGLE, {
      x: leftX, y: L.contentY, w: 4.3, h: 3.4,
      fill: { color: C.bgLight }, line: { color: C.gridLine, width: 0.5 }
    });
    s.addText("マインドセットの転換", {
      x: leftX + 0.2, y: L.contentY + 0.15, w: 4.0, h: 0.35,
      fontFace: "Yu Mincho", fontSize: 13, bold: true, color: C.royalBlue, margin: 0
    });

    s.addText("検索エンジンの発想", {
      x: leftX + 0.2, y: L.contentY + 0.7, w: 4.0, h: 0.3,
      fontFace: "Yu Gothic", fontSize: 10, color: C.textMuted, margin: 0
    });
    s.addText("一発で正解を引く", {
      x: leftX + 0.2, y: L.contentY + 1.0, w: 4.0, h: 0.4,
      fontFace: "Yu Mincho", fontSize: 15, color: C.textDark,
      align: "left", valign: "middle", margin: 0
    });

    s.addText("↓", {
      x: leftX + 0.2, y: L.contentY + 1.55, w: 4.0, h: 0.4,
      fontFace: "Calibri", fontSize: 20, bold: true, color: C.royalBlue,
      align: "center", margin: 0
    });

    s.addText("AIとの付き合い方", {
      x: leftX + 0.2, y: L.contentY + 2.05, w: 4.0, h: 0.3,
      fontFace: "Yu Gothic", fontSize: 10, color: C.royalBlue, margin: 0
    });
    s.addText("対話で精度を上げる", {
      x: leftX + 0.2, y: L.contentY + 2.35, w: 4.0, h: 0.5,
      fontFace: "Yu Mincho", fontSize: 17, bold: true, color: C.royalBlue,
      align: "left", valign: "middle", margin: 0
    });

    // 右: プロセス
    const rightX = L.contentX + 4.5;
    s.addText("精度が上がるプロセス", {
      x: rightX, y: L.contentY, w: 4.5, h: 0.35,
      fontFace: "Yu Mincho", fontSize: 13, bold: true, color: C.royalBlue, margin: 0
    });

    const steps = [
      { num: "1", label: "最初の出力", body: "60点のたたき台として受け取る" },
      { num: "2", label: "修正指示", body: "「もっと〜に」「〜は削って」と伝える" },
      { num: "3", label: "再出力", body: "80点まで上がる。必要なら繰り返す" },
      { num: "4", label: "完成", body: "自分の意図と合致した成果物" },
    ];
    steps.forEach((st, i) => {
      const y = L.contentY + 0.55 + i * 0.7;
      s.addShape(pres.shapes.OVAL, {
        x: rightX, y: y, w: 0.4, h: 0.4,
        fill: { color: C.royalBlue }, line: { color: C.royalBlue, width: 0 }
      });
      s.addText(st.num, {
        x: rightX, y: y, w: 0.4, h: 0.4,
        fontFace: "Georgia", fontSize: 12, bold: true, color: C.textWhite,
        align: "center", valign: "middle", margin: 0
      });
      s.addText(st.label, {
        x: rightX + 0.55, y: y, w: 3.95, h: 0.25,
        fontFace: "Yu Mincho", fontSize: 11, bold: true, color: C.bgNavy, margin: 0
      });
      s.addText(st.body, {
        x: rightX + 0.55, y: y + 0.25, w: 3.95, h: 0.35,
        fontFace: "Yu Gothic", fontSize: 9.5, color: C.textDark, margin: 0
      });
    });
  }

  // =====================================================
  // スライド11: よくある失敗パターン3選
  // =====================================================
  {
    const s = addContentSlide(pres, {
      actionTitle: "失敗のほとんどは、AIの性能ではなく使う側の姿勢が原因",
      pageNum: 11
    });

    const fails = [
      {
        num: "01",
        title: "コピペ事故",
        symptom: "出力を確認せず、そのまま使って誤情報を拡散",
        lesson: "必ず検証してから使う",
      },
      {
        num: "02",
        title: "曖昧指示",
        symptom: "「いい感じに」だけで期待外れ → AIのせいにする",
        lesson: "目的・制約・形式を明示する",
      },
      {
        num: "03",
        title: "エラー放置",
        symptom: "うまくいかないとすぐ諦める・AIを見限る",
        lesson: "言い方を変えれば解決することが多い",
      },
    ];

    fails.forEach((f, i) => {
      const x = L.contentX + i * 3.05;
      const y = L.contentY;
      // カード
      s.addShape(pres.shapes.RECTANGLE, {
        x: x, y: y, w: 2.85, h: 3.4,
        fill: { color: C.bgWhite }, line: { color: C.gridLine, width: 0.5 }
      });
      // 番号帯
      s.addShape(pres.shapes.RECTANGLE, {
        x: x, y: y, w: 2.85, h: 0.6,
        fill: { color: C.bgNavy }, line: { color: C.bgNavy, width: 0 }
      });
      s.addText(f.num, {
        x: x + 0.2, y: y, w: 0.8, h: 0.6,
        fontFace: "Georgia", fontSize: 20, bold: true, color: C.blue4,
        align: "left", valign: "middle", margin: 0
      });
      s.addText(f.title, {
        x: x + 1.0, y: y, w: 1.75, h: 0.6,
        fontFace: "Yu Mincho", fontSize: 14, bold: true, color: C.textWhite,
        align: "left", valign: "middle", margin: 0
      });
      // 症状
      s.addText("症状", {
        x: x + 0.2, y: y + 0.8, w: 2.5, h: 0.25,
        fontFace: "Yu Gothic", fontSize: 9, bold: true, color: C.accentRed, margin: 0
      });
      s.addText(f.symptom, {
        x: x + 0.2, y: y + 1.05, w: 2.5, h: 0.9,
        fontFace: "Yu Gothic", fontSize: 10.5, color: C.textDark,
        align: "left", valign: "top", margin: 0
      });
      // 区切り
      s.addShape(pres.shapes.LINE, {
        x: x + 0.2, y: y + 2.1, w: 2.5, h: 0,
        line: { color: C.gridLine, width: 0.5 }
      });
      // 教訓
      s.addText("教訓", {
        x: x + 0.2, y: y + 2.2, w: 2.5, h: 0.25,
        fontFace: "Yu Gothic", fontSize: 9, bold: true, color: C.royalBlue, margin: 0
      });
      s.addText(f.lesson, {
        x: x + 0.2, y: y + 2.45, w: 2.5, h: 0.85,
        fontFace: "Yu Mincho", fontSize: 11, bold: true, color: C.bgNavy,
        align: "left", valign: "top", margin: 0
      });
    });

    s.addText("ツールではなく、自分の使い方を疑う習慣が成長の近道です", {
      x: L.contentX, y: 4.7, w: L.contentW, h: 0.3,
      fontFace: "Yu Mincho", fontSize: 11, italic: true, color: C.royalBlue,
      align: "center", margin: 0
    });
  }

  // =====================================================
  // スライド12: 使ってはいけない場面
  // =====================================================
  {
    const s = addContentSlide(pres, {
      actionTitle: "「便利」で境界を越えると信用を失う ― 使わない勇気も心構え",
      pageNum: 12
    });

    const zones = [
      { icon: "🔒", title: "機密・個人情報", body: "会社の機密データ、顧客個人情報は原則として入力しない。社内ルールを確認する" },
      { icon: "⚖", title: "専門判断の最終化", body: "医療・法律・税務・投資の最終決定。必ず資格を持つ専門家に確認する" },
      { icon: "👥", title: "人を評価する文章", body: "人事評価・採用合否・叱責など、人間関係の重要判断を丸投げしない" },
      { icon: "📝", title: "ルール違反になる場面", body: "試験・論文・著作物の規約違反になる使い方は、信用と将来を失う" },
    ];

    zones.forEach((z, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = L.contentX + col * (L.col2W + L.col2Gap);
      const y = L.contentY + row * 1.7;

      s.addShape(pres.shapes.RECTANGLE, {
        x: x, y: y, w: L.col2W, h: 1.5,
        fill: { color: C.bgLight }, line: { color: C.accentRed, width: 1.0 }
      });
      s.addText(z.title, {
        x: x + 0.25, y: y + 0.15, w: L.col2W - 0.5, h: 0.4,
        fontFace: "Yu Mincho", fontSize: 14, bold: true, color: C.accentRed,
        align: "left", valign: "top", margin: 0
      });
      s.addText(z.body, {
        x: x + 0.25, y: y + 0.6, w: L.col2W - 0.5, h: 0.85,
        fontFace: "Yu Gothic", fontSize: 10.5, color: C.textDark,
        align: "left", valign: "top", margin: 0
      });
    });

    s.addText("使っていい場面と、使ってはいけない場面の線引きは、使う側の責任", {
      x: L.contentX, y: 4.7, w: L.contentW, h: 0.3,
      fontFace: "Yu Mincho", fontSize: 11, italic: true, color: C.bgNavy,
      align: "center", margin: 0
    });
  }

  // =====================================================
  // スライド13: 倫理と責任
  // =====================================================
  {
    const s = addContentSlide(pres, {
      actionTitle: "「便利」と「正しい」は別問題 ― 技術は先に、ルールは後から",
      pageNum: 13
    });

    // 左: 論点
    const leftItems = [
      { k: "入力データの扱い", v: "入力した内容が学習に使われる可能性がある。機密はサービス規約を確認してから" },
      { k: "著作権とAI生成物", v: "生成物の著作権はまだグレー。商用利用時は特に注意が必要" },
      { k: "AI利用の明示", v: "AIが書いたことを隠すべきでない場面がある（学術・報道・契約など）" },
      { k: "バイアスと差別", v: "学習データに含まれる偏見がそのまま出力される。最終チェックは人間の責任" },
    ];

    leftItems.forEach((item, i) => {
      const y = L.contentY + i * 0.78;
      s.addShape(pres.shapes.RECTANGLE, {
        x: L.contentX, y: y, w: 0.08, h: 0.65,
        fill: { color: C.royalBlue }, line: { color: C.royalBlue, width: 0 }
      });
      s.addText(item.k, {
        x: L.contentX + 0.2, y: y, w: 5.5, h: 0.3,
        fontFace: "Yu Mincho", fontSize: 12, bold: true, color: C.bgNavy, margin: 0
      });
      s.addText(item.v, {
        x: L.contentX + 0.2, y: y + 0.32, w: 5.5, h: 0.4,
        fontFace: "Yu Gothic", fontSize: 10, color: C.textDark, margin: 0
      });
    });

    // 右: 大コールアウト
    s.addShape(pres.shapes.RECTANGLE, {
      x: 6.1, y: L.contentY, w: 3.4, h: 3.3,
      fill: { color: C.bgNavy }, line: { color: C.bgNavy, width: 0 }
    });
    s.addText("SELF-CHECK", {
      x: 6.3, y: L.contentY + 0.2, w: 3.0, h: 0.3,
      fontFace: "Calibri", fontSize: 10, bold: true, color: C.blue3,
      charSpacing: 4, margin: 0
    });
    s.addText("これは、\n人に見せられる\n使い方か？", {
      x: 6.3, y: L.contentY + 0.6, w: 3.0, h: 1.6,
      fontFace: "Yu Mincho", fontSize: 18, bold: true, color: C.textWhite,
      align: "left", valign: "top", margin: 0
    });
    s.addShape(pres.shapes.LINE, {
      x: 6.3, y: L.contentY + 2.3, w: 0.8, h: 0,
      line: { color: C.blue4, width: 1.0 }
    });
    s.addText("判断に迷ったら、この問いを自分に投げかける", {
      x: 6.3, y: L.contentY + 2.5, w: 3.0, h: 0.7,
      fontFace: "Yu Gothic", fontSize: 10, color: C.blue4,
      align: "left", valign: "top", margin: 0
    });
  }

  // =====================================================
  // スライド14: 第3章 セクション
  // =====================================================
  addSectionSlide(pres, {
    chapter: "C H A P T E R   3",
    title: "基本的な対話の考え方",
    pageNum: 14
  });

  // =====================================================
  // スライド15: 良い指示の4要素
  // =====================================================
  {
    const s = addContentSlide(pres, {
      actionTitle: "「役割・目的・制約・出力形式」の4要素で回答の質が2〜3倍に上がる",
      pageNum: 15
    });

    const elems = [
      { num: "役", label: "役割", body: "「あなたはプロの編集者です」\n「小学校の先生として答えて」", color: C.royalBlue },
      { num: "的", label: "目的", body: "「初心者向けの記事にしたい」\n「意思決定の材料が欲しい」", color: C.blue2 },
      { num: "制", label: "制約", body: "「500字以内」\n「専門用語は避ける」", color: C.blue3 },
      { num: "形", label: "出力形式", body: "「見出し3つ+本文」\n「表形式で」「箇条書きで」", color: C.blue2 },
    ];

    elems.forEach((e, i) => {
      const x = L.contentX + i * 2.3;
      const y = L.contentY + 0.2;

      // 番号サークル
      s.addShape(pres.shapes.OVAL, {
        x: x + 0.65, y: y, w: 1.0, h: 1.0,
        fill: { color: e.color }, line: { color: e.color, width: 0 }
      });
      s.addText(e.num, {
        x: x + 0.65, y: y, w: 1.0, h: 1.0,
        fontFace: "Yu Mincho", fontSize: 28, bold: true, color: C.textWhite,
        align: "center", valign: "middle", margin: 0
      });

      // ラベル
      s.addText(e.label, {
        x: x, y: y + 1.1, w: 2.3, h: 0.4,
        fontFace: "Yu Mincho", fontSize: 15, bold: true, color: C.bgNavy,
        align: "center", valign: "middle", margin: 0
      });

      // 本文
      s.addText(e.body, {
        x: x + 0.15, y: y + 1.55, w: 2.0, h: 1.4,
        fontFace: "Yu Gothic", fontSize: 10, color: C.textDark,
        align: "center", valign: "top", margin: 0
      });
    });

    s.addText("4つ全部を入れるのが面倒なら、まず「目的」と「出力形式」の2つから始めてください", {
      x: L.contentX, y: 4.65, w: L.contentW, h: 0.35,
      fontFace: "Yu Mincho", fontSize: 11, italic: true, color: C.royalBlue,
      align: "center", margin: 0
    });
  }

  // =====================================================
  // スライド16: 具体 vs 抽象
  // =====================================================
  {
    const s = addContentSlide(pres, {
      actionTitle: "AIは空気を読めない ― あなたの頭の中を具体的に言語化する",
      pageNum: 16
    });

    // ヘッダー
    const headerY = L.contentY + 0.1;
    s.addShape(pres.shapes.RECTANGLE, {
      x: L.contentX, y: headerY, w: L.col2W, h: 0.45,
      fill: { color: C.textMuted }, line: { color: C.textMuted, width: 0 }
    });
    s.addText("✕ 曖昧な指示", {
      x: L.contentX + 0.2, y: headerY, w: L.col2W, h: 0.45,
      fontFace: "Yu Mincho", fontSize: 13, bold: true, color: C.textWhite,
      align: "left", valign: "middle", margin: 0
    });

    s.addShape(pres.shapes.RECTANGLE, {
      x: L.col2RightX, y: headerY, w: L.col2W, h: 0.45,
      fill: { color: C.royalBlue }, line: { color: C.royalBlue, width: 0 }
    });
    s.addText("◎ 具体的な指示", {
      x: L.col2RightX + 0.2, y: headerY, w: L.col2W, h: 0.45,
      fontFace: "Yu Mincho", fontSize: 13, bold: true, color: C.textWhite,
      align: "left", valign: "middle", margin: 0
    });

    // 比較ペア
    const pairs = [
      { bad: "いい感じにして", good: "30代女性向けに、親しみやすい口調で" },
      { bad: "短くして", good: "200字以内に要約して" },
      { bad: "直して", good: "敬語を統一し、重複表現を削って" },
      { bad: "考えて", good: "3案出して、メリット・デメリットを並べて" },
    ];

    pairs.forEach((p, i) => {
      const y = headerY + 0.45 + i * 0.65;
      // 左
      s.addShape(pres.shapes.RECTANGLE, {
        x: L.contentX, y: y, w: L.col2W, h: 0.6,
        fill: { color: i % 2 === 0 ? C.bgWhite : C.bgLight },
        line: { color: C.gridLine, width: 0.5 }
      });
      s.addText(`「${p.bad}」`, {
        x: L.contentX + 0.25, y: y, w: L.col2W - 0.4, h: 0.6,
        fontFace: "Yu Mincho", fontSize: 12, color: C.textMuted,
        align: "left", valign: "middle", margin: 0
      });

      // 矢印
      s.addText("→", {
        x: L.contentX + L.col2W, y: y, w: L.col2Gap, h: 0.6,
        fontFace: "Calibri", fontSize: 18, bold: true, color: C.royalBlue,
        align: "center", valign: "middle", margin: 0
      });

      // 右
      s.addShape(pres.shapes.RECTANGLE, {
        x: L.col2RightX, y: y, w: L.col2W, h: 0.6,
        fill: { color: i % 2 === 0 ? C.bgWhite : C.bgLight },
        line: { color: C.gridLine, width: 0.5 }
      });
      s.addText(`「${p.good}」`, {
        x: L.col2RightX + 0.25, y: y, w: L.col2W - 0.4, h: 0.6,
        fontFace: "Yu Mincho", fontSize: 12, bold: true, color: C.bgNavy,
        align: "left", valign: "middle", margin: 0
      });
    });
  }

  // =====================================================
  // スライド17: コンテキストを渡す / 繰り返しで精度をあげる (統合)
  // =====================================================
  {
    const s = addContentSlide(pres, {
      actionTitle: "コンテキスト量 × 反復回数 ＝ AI活用力",
      pageNum: 17
    });

    // 左: コンテキストを渡す
    s.addShape(pres.shapes.RECTANGLE, {
      x: L.contentX, y: L.contentY, w: 4.3, h: 3.4,
      fill: { color: C.bgLight }, line: { color: C.gridLine, width: 0.5 }
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: L.contentX, y: L.contentY, w: 4.3, h: 0.5,
      fill: { color: C.royalBlue }, line: { color: C.royalBlue, width: 0 }
    });
    s.addText("① コンテキストを渡す", {
      x: L.contentX + 0.2, y: L.contentY, w: 4.0, h: 0.5,
      fontFace: "Yu Mincho", fontSize: 14, bold: true, color: C.textWhite,
      align: "left", valign: "middle", margin: 0
    });

    const ctxItems = [
      { k: "背景", v: "なぜこれをやるのか、何に使うのか" },
      { k: "前提", v: "読み手は誰か、どの程度の知識レベルか" },
      { k: "制約", v: "使ってはいけない表現、参考にするトーン" },
      { k: "例示", v: "「こういう感じで」というサンプルを添える" },
    ];
    ctxItems.forEach((it, i) => {
      const y = L.contentY + 0.7 + i * 0.62;
      s.addText(it.k, {
        x: L.contentX + 0.2, y: y, w: 0.9, h: 0.3,
        fontFace: "Yu Mincho", fontSize: 11, bold: true, color: C.royalBlue, margin: 0
      });
      s.addText(it.v, {
        x: L.contentX + 1.05, y: y, w: 3.1, h: 0.55,
        fontFace: "Yu Gothic", fontSize: 10, color: C.textDark, margin: 0
      });
    });

    // 右: 繰り返しで精度をあげる
    s.addShape(pres.shapes.RECTANGLE, {
      x: L.col2RightX, y: L.contentY, w: 4.3, h: 3.4,
      fill: { color: C.bgLight }, line: { color: C.gridLine, width: 0.5 }
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: L.col2RightX, y: L.contentY, w: 4.3, h: 0.5,
      fill: { color: C.royalBlue }, line: { color: C.royalBlue, width: 0 }
    });
    s.addText("② 繰り返しで精度をあげる", {
      x: L.col2RightX + 0.2, y: L.contentY, w: 4.0, h: 0.5,
      fontFace: "Yu Mincho", fontSize: 14, bold: true, color: C.textWhite,
      align: "left", valign: "middle", margin: 0
    });

    s.addText("一発勝負ではなく反復が前提", {
      x: L.col2RightX + 0.2, y: L.contentY + 0.65, w: 4.0, h: 0.3,
      fontFace: "Yu Mincho", fontSize: 11, bold: true, color: C.bgNavy, margin: 0
    });

    const phrases = [
      "「もっとカジュアルに」",
      "「〇〇の観点を追加して」",
      "「この部分だけ残して書き直して」",
      "「半分の長さにして」",
    ];
    phrases.forEach((ph, i) => {
      const y = L.contentY + 1.1 + i * 0.42;
      s.addText("▸", {
        x: L.col2RightX + 0.25, y: y, w: 0.25, h: 0.35,
        fontFace: "Calibri", fontSize: 12, bold: true, color: C.royalBlue,
        align: "center", valign: "middle", margin: 0
      });
      s.addText(ph, {
        x: L.col2RightX + 0.5, y: y, w: 3.7, h: 0.35,
        fontFace: "Yu Mincho", fontSize: 11, color: C.textDark,
        align: "left", valign: "middle", margin: 0
      });
    });

    s.addShape(pres.shapes.LINE, {
      x: L.col2RightX + 0.2, y: L.contentY + 2.85, w: 4.0, h: 0,
      line: { color: C.gridLine, width: 0.5 }
    });
    s.addText("プロの料理人も、一発で味を決めず何度も味見する", {
      x: L.col2RightX + 0.2, y: L.contentY + 2.95, w: 4.0, h: 0.4,
      fontFace: "Yu Gothic", fontSize: 9.5, italic: true, color: C.royalBlue,
      align: "left", valign: "top", margin: 0
    });
  }

  // =====================================================
  // スライド18: プロンプトのテンプレート
  // =====================================================
  {
    const s = addContentSlide(pres, {
      actionTitle: "明日から使えるプロンプトテンプレート ― コピーして、穴を埋めるだけ",
      pageNum: 18
    });

    // 左: テンプレート（モノスペース風）
    s.addShape(pres.shapes.RECTANGLE, {
      x: L.contentX, y: L.contentY, w: 5.5, h: 3.4,
      fill: { color: C.bgNavy }, line: { color: C.bgNavy, width: 0 }
    });
    s.addText("PROMPT TEMPLATE", {
      x: L.contentX + 0.25, y: L.contentY + 0.2, w: 5.0, h: 0.3,
      fontFace: "Calibri", fontSize: 10, bold: true, color: C.blue3,
      charSpacing: 4, margin: 0
    });

    const templateLines = [
      { k: "【役割】", v: "あなたは〇〇の専門家です" },
      { k: "【目的】", v: "△△を作りたい / 知りたい" },
      { k: "【前提】", v: "読み手は□□、〜という背景" },
      { k: "【制約】", v: "・〜すること  ・〜は避けること" },
      { k: "【出力形式】", v: "見出し+箇条書き、◇◇字以内" },
    ];
    templateLines.forEach((t, i) => {
      const y = L.contentY + 0.65 + i * 0.48;
      s.addText(t.k, {
        x: L.contentX + 0.25, y: y, w: 1.4, h: 0.4,
        fontFace: "Yu Mincho", fontSize: 12, bold: true, color: C.blue4,
        align: "left", valign: "middle", margin: 0
      });
      s.addText(t.v, {
        x: L.contentX + 1.65, y: y, w: 3.7, h: 0.4,
        fontFace: "Yu Gothic", fontSize: 11, color: C.textWhite,
        align: "left", valign: "middle", margin: 0
      });
    });

    // 右: 使い方・ヒント
    const rightX = 6.2;
    s.addText("使い方のヒント", {
      x: rightX, y: L.contentY, w: 3.3, h: 0.35,
      fontFace: "Yu Mincho", fontSize: 13, bold: true, color: C.royalBlue, margin: 0
    });

    const tips = [
      { k: "STEP 1", v: "メモ帳に貼って保存" },
      { k: "STEP 2", v: "タスクごとに穴を埋める" },
      { k: "STEP 3", v: "慣れたら省略OK" },
      { k: "STEP 4", v: "自分なりの型に進化させる" },
    ];
    tips.forEach((t, i) => {
      const y = L.contentY + 0.55 + i * 0.7;
      s.addText(t.k, {
        x: rightX, y: y, w: 3.3, h: 0.25,
        fontFace: "Calibri", fontSize: 9, bold: true, color: C.textMuted,
        charSpacing: 2, margin: 0
      });
      s.addText(t.v, {
        x: rightX, y: y + 0.25, w: 3.3, h: 0.4,
        fontFace: "Yu Mincho", fontSize: 13, bold: true, color: C.bgNavy,
        align: "left", valign: "top", margin: 0
      });
    });
  }

  // =====================================================
  // スライド19: 第4章 セクション
  // =====================================================
  addSectionSlide(pres, {
    chapter: "C H A P T E R   4",
    title: "これからの学び方",
    pageNum: 19
  });

  // =====================================================
  // スライド20: AIを"使う人"と"使われる人" + 小さく試す + 人間の価値 (統合ダッシュボード風)
  // =====================================================
  {
    const s = addContentSlide(pres, {
      actionTitle: "AIが広がるほど、人間の「主体性」と「継続する姿勢」が価値を生む",
      pageNum: 20
    });

    // 上段: 使う人 vs 使われる人 (左右比較)
    const topY = L.contentY;
    s.addShape(pres.shapes.RECTANGLE, {
      x: L.contentX, y: topY, w: 4.3, h: 0.38,
      fill: { color: C.royalBlue }, line: { color: C.royalBlue, width: 0 }
    });
    s.addText("AIを使う人", {
      x: L.contentX + 0.15, y: topY, w: 4.0, h: 0.38,
      fontFace: "Yu Mincho", fontSize: 12, bold: true, color: C.textWhite,
      align: "left", valign: "middle", margin: 0
    });

    s.addShape(pres.shapes.RECTANGLE, {
      x: L.col2RightX, y: topY, w: 4.3, h: 0.38,
      fill: { color: C.textMuted }, line: { color: C.textMuted, width: 0 }
    });
    s.addText("AIに使われる人", {
      x: L.col2RightX + 0.15, y: topY, w: 4.0, h: 0.38,
      fontFace: "Yu Mincho", fontSize: 12, bold: true, color: C.textWhite,
      align: "left", valign: "middle", margin: 0
    });

    const goodTraits = ["目的を自分で決める", "出力を検証する", "責任を引き受ける"];
    const badTraits = ["AIの提案に流される", "そのまま信じる", "AIのせいにする"];

    goodTraits.forEach((g, i) => {
      const y = topY + 0.48 + i * 0.32;
      s.addText(`● ${g}`, {
        x: L.contentX + 0.15, y: y, w: 4.0, h: 0.3,
        fontFace: "Yu Gothic", fontSize: 10.5, color: C.bgNavy,
        align: "left", valign: "middle", margin: 0
      });
    });
    badTraits.forEach((b, i) => {
      const y = topY + 0.48 + i * 0.32;
      s.addText(`● ${b}`, {
        x: L.col2RightX + 0.15, y: y, w: 4.0, h: 0.3,
        fontFace: "Yu Gothic", fontSize: 10.5, color: C.textMuted,
        align: "left", valign: "middle", margin: 0
      });
    });

    // 下段: 3つの行動指針
    const bottomY = 2.7;
    const guides = [
      { t: "小さく試す", b: "1日1タスクから。全自動化を目指さない" },
      { t: "学び続ける", b: "半年で常識が変わる。完璧を目指さない" },
      { t: "人間らしさを磨く", b: "問いを立てる力・責任・信頼関係が残る" },
    ];
    guides.forEach((g, i) => {
      const x = L.contentX + i * 3.05;
      s.addShape(pres.shapes.RECTANGLE, {
        x: x, y: bottomY, w: 2.85, h: 1.8,
        fill: { color: C.bgLight }, line: { color: C.gridLine, width: 0.5 }
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: x, y: bottomY, w: 2.85, h: 0.1,
        fill: { color: C.royalBlue }, line: { color: C.royalBlue, width: 0 }
      });
      s.addText(g.t, {
        x: x + 0.2, y: bottomY + 0.25, w: 2.5, h: 0.45,
        fontFace: "Yu Mincho", fontSize: 15, bold: true, color: C.bgNavy,
        align: "left", valign: "middle", margin: 0
      });
      s.addText(g.b, {
        x: x + 0.2, y: bottomY + 0.8, w: 2.5, h: 0.9,
        fontFace: "Yu Gothic", fontSize: 10.5, color: C.textDark,
        align: "left", valign: "top", margin: 0
      });
    });
  }

  // =====================================================
  // スライド21(最終): 今日から変えること3つ
  // =====================================================
  {
    const s = pres.addSlide();
    s.background = { color: C.bgNavy };

    s.addText("T A K E A W A Y", {
      x: 0.8, y: 0.8, w: 8.4, h: 0.4,
      fontFace: "Calibri", fontSize: 12, bold: true, color: C.blue3,
      charSpacing: 6, margin: 0
    });
    s.addShape(pres.shapes.LINE, {
      x: 0.8, y: 1.3, w: 1.2, h: 0,
      line: { color: C.textWhite, width: 1.0 }
    });
    s.addText("今日から変えること、3つ", {
      x: 0.8, y: 1.5, w: 8.4, h: 0.7,
      fontFace: "Yu Mincho", fontSize: 24, bold: true, color: C.textWhite,
      align: "left", valign: "middle", margin: 0
    });

    const takeaways = [
      { num: "01", title: "鵜呑みにしない", body: "重要な情報は必ず検証する" },
      { num: "02", title: "コンテキストを渡す", body: "役割・目的・制約・形式を伝える" },
      { num: "03", title: "小さく試す", body: "1日1タスクから始める" },
    ];

    takeaways.forEach((t, i) => {
      const y = 2.6 + i * 0.75;
      s.addText(t.num, {
        x: 0.8, y: y, w: 0.8, h: 0.6,
        fontFace: "Georgia", fontSize: 28, bold: true, color: C.blue3,
        align: "left", valign: "middle", margin: 0
      });
      s.addText(t.title, {
        x: 1.7, y: y, w: 3.3, h: 0.35,
        fontFace: "Yu Mincho", fontSize: 16, bold: true, color: C.textWhite,
        align: "left", valign: "middle", margin: 0
      });
      s.addText(t.body, {
        x: 1.7, y: y + 0.33, w: 7.5, h: 0.35,
        fontFace: "Yu Gothic", fontSize: 11, color: C.blue4,
        align: "left", valign: "top", margin: 0
      });
    });

    s.addText("AIは道具です。使いこなすのも、振り回されるのも、自分次第。", {
      x: 0.8, y: 5.0, w: 8.4, h: 0.3,
      fontFace: "Yu Mincho", fontSize: 12, italic: true, color: C.blue3,
      align: "left", margin: 0
    });
  }

  // 保存
  const outputPath = "D:/020_Work/05_environment/01_active/Info/Claude/output/AI_tutorial_mindset.pptx";
  await pres.writeFile({ fileName: outputPath });
  console.log("保存完了: " + outputPath);
}

// ヘルパー: スライド2のカード
function slide2Card(slide, pres, { num, label, body, x, y, w, h }) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: x, y: y, w: w, h: h,
    fill: { color: C.bgWhite }, line: { color: C.gridLine, width: 0.5 }
  });
  slide.addText(num, {
    x: x + 0.2, y: y + 0.2, w: 1.0, h: 0.5,
    fontFace: "Georgia", fontSize: 22, bold: true, color: C.royalBlue,
    align: "left", valign: "top", margin: 0
  });
  slide.addShape(pres.shapes.LINE, {
    x: x + 0.2, y: y + 0.85, w: 0.6, h: 0,
    line: { color: C.royalBlue, width: 1.0 }
  });
  slide.addText(label, {
    x: x + 0.2, y: y + 1.0, w: w - 0.4, h: 0.5,
    fontFace: "Yu Mincho", fontSize: 14, bold: true, color: C.bgNavy,
    align: "left", valign: "top", margin: 0
  });
  slide.addText(body, {
    x: x + 0.2, y: y + 1.55, w: w - 0.4, h: h - 1.65,
    fontFace: "Yu Gothic", fontSize: 10.5, color: C.textDark,
    align: "left", valign: "top", margin: 0
  });
}

buildDeck().catch(err => { console.error(err); process.exit(1); });
