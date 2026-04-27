import {
  Clock,
  TrendingUp,
  Zap,
  FileText,
  Receipt,
  Repeat,
  Wind,
  Wrench,
} from "lucide-react";

export const CHAPTERS = [
  {
    id: "ch2",
    num: "02",
    title: "Time Value of Money",
    titleTh: "มูลค่าเงินตามเวลา",
    icon: Clock,
    color: "#d4a85a",
    overview:
      'เงิน 100 บาทวันนี้มีค่ามากกว่า 100 บาทปีหน้า เพราะเอาไปลงทุนได้ดอก. บทนี้คือกล่องเครื่องมือสำหรับ "แปลงเวลา" ของกระแสเงินสด — single payment, uniform series, arithmetic & geometric gradient — ทุกปัญหาในบทถัด ๆ ไปต่อยอดจากตรงนี้.',
    concepts: [
      {
        title: "Compound vs Simple interest",
        body: "Compound = ทบต้น (ดอกเก่าโดนคิดดอกใหม่ด้วย) → F = P(1+i)^N. Simple = ดอกอย่างเดียวไม่ทบต้น → F = P(1+iN). โลกจริงและข้อสอบใช้ compound เกือบหมด.",
      },
      {
        title: "Single payment factors",
        body: "(F/P, i, N) = (1+i)^N → Compound amount factor.\n(P/F, i, N) = (1+i)^-N → Present worth factor.\nใช้กับเงินก้อนเดียวข้ามเวลา.",
      },
      {
        title: "Uniform series (annuity)",
        body: "A คือเงินงวดเท่ากันทุกงวด end-of-period.\nP = A(P/A,i,N) ; F = A(F/A,i,N) ; A = P(A/P,i,N) ; A = F(A/F,i,N).\nใช้กับเงินผ่อนรถ ผ่อนบ้าน เงินฝากประจำ.",
      },
      {
        title: "Arithmetic gradient (G)",
        body: "กระแสเงินสดเพิ่มขึ้นทีละ G ทุกปี (ปี 1 = 0, ปี 2 = G, ปี 3 = 2G, ...).\nP = G(P/G,i,N) ; A = G(A/G,i,N).\nถ้าโจทย์มี base + gradient: P_total = A(P/A) + G(P/G).",
      },
      {
        title: "Geometric gradient (g)",
        body: "อัตราเพิ่มคงที่ g% ทุกปี: A_(j+1) = A_j(1+g).\nถ้า g ≠ i: P = A₁·[1 − (1+g)^N(1+i)^-N] / (i − g)\nถ้า g = i: P = A₁·N / (1+i)\nระวังเครื่องหมาย g ติดลบ (deflation) ก็ใส่ลบได้.",
      },
      {
        title: "Effective vs Nominal rate",
        body: "Nominal r (APR) = อัตราที่ธนาคารโฆษณา.\nEffective i (APY) = อัตราที่จ่ายจริง.\nM = sub-periods/year:\n• r = M·i_m\n• i_m = (1+i)^(1/M) − 1\n• i = (1 + r/M)^M − 1\nGotcha: i ≥ r เสมอ (เท่ากันเมื่อ M=1).",
      },
      {
        title: "Loan repayment schedule",
        body: "งวดเท่ากันทุกงวด A = P₀(A/P,i,N).\n• ดอกเบี้ยที่จ่ายงวด j: I_j = i·P_(j-1)\n• เงินต้นที่จ่ายงวด j: ΔP_j = A − I_j\n• เงินต้นคงเหลือ: P_j = P_(j-1) − ΔP_j = A(P/A,i,N−j)\n• ดอกรวมตลอดสัญญา: NA − P₀",
      },
    ],
    formulas: [
      "F = P(1+i)^N    P = F(1+i)^−N",
      "P/A = [(1+i)^N − 1] / [i(1+i)^N]",
      "A/P = i(1+i)^N / [(1+i)^N − 1]",
      "F/A = [(1+i)^N − 1] / i      A/F = i / [(1+i)^N − 1]",
      "P/G = [(1+i)^N − iN − 1] / [i²(1+i)^N]",
      "A/G = 1/i − N/[(1+i)^N − 1]",
      "Geometric P = A₁·[1 − (1+g)^N(1+i)^−N] / (i−g),  g≠i",
      "Effective i = (1 + r/M)^M − 1     i_m = (1+i)^(1/M) − 1",
      "Loan: I_j = i·P_(j−1)   ΔP_j = A − I_j   P_j = A(P/A,i,N−j)",
    ],
    traps: [
      "ลืมเปลี่ยน i ให้ตรงกับงวด (ปี vs เดือน) — ถ้า cash flow รายเดือน ต้องใช้ i_m ไม่ใช่ i ปี.",
      "Annuity beginning-of-period: P = A·[1 + (P/A,i,N−1)] — เลื่อนงวด 1 ปีต้องใช้สูตรนี้.",
      "Geometric gradient: A₁ คือกระแสปีแรกหลังเริ่มเติบโต ไม่ใช่ปี 0.",
      "APR ไม่เท่ากับ APY ยกเว้น M = 1.",
    ],
    examples: [
      {
        q: "ฝาก 10,000 บาทในกองทุนได้ดอก 1% ต่อเดือน. หลัง 24 เดือน จะมีเงินเท่าไหร่?",
        steps: [
          "i_m = 1% per month, N = 24",
          "F = P(1+i)^N = 10000·(1.01)^24",
          "F = 10000 × 1.2697 = 12,697 บาท",
        ],
      },
      {
        q: "ผ่อน iPhone ราคา 30,000 บาท เดือนละ 1,200 บาท นาน 36 เดือน. อัตราดอกเบี้ยต่อเดือน?",
        steps: [
          "P = A(P/A, i_m, 36)",
          "30000 = 1200·[(1+i_m)^36 − 1] / [i_m(1+i_m)^36]",
          "แก้สมการ → i_m ≈ 2.12% ต่อเดือน",
          "Effective ปี = (1.0212)^12 − 1 ≈ 28.6%",
        ],
      },
    ],
  },

  {
    id: "ch3",
    num: "03",
    title: "Comparison Methods I",
    titleTh: "วิธีเปรียบเทียบทางเลือก ภาค 1",
    icon: TrendingUp,
    color: "#7fb069",
    overview:
      'ก่อนเลือกทางเลือกใด ๆ ต้องแปลงทุก cash flow มาอยู่บน basis เดียวกันที่เวลาเดียวกัน — PW (NPV), AW, หรือ FW ทำได้ทั้งสามวิธีแล้วได้คำตอบเหมือนกัน. ความท้าทายอยู่ที่ "ทางเลือกอายุไม่เท่ากัน".',
    concepts: [
      {
        title: "PW / AW / FW",
        body: "PW (Present Worth / NPV): Σ A_j(1+i)^−j → max selected.\nAW (Annual Worth): PW × (A/P,i,N) → ใช้ดี เมื่ออายุไม่เท่ากัน.\nFW (Future Worth): Σ A_j(1+i)^(N−j).\nทั้ง 3 วิธี rank ทางเลือกเหมือนกัน ถ้าเลือก basis ถูกต้อง.",
      },
      {
        title: "Do-nothing alternative",
        body: 'φ = "ไม่ทำอะไร" คือทางเลือกที่ PW = 0 เสมอ. ถ้า PW ของทุกทางเลือก < 0 → เลือก do-nothing.',
      },
      {
        title: "Capitalized cost (perpetual)",
        body: 'เมื่อ N → ∞ (เช่น โครงการสาธารณูปโภค): CC = A/i = PW.\nก็คือ "เงินก้อนที่ฝากแล้วได้ดอกพอจ่าย A ทุกปีตลอดกาล".',
      },
      {
        title: "Capital Recovery (CR)",
        body: "ค่า annualised ของการเป็นเจ้าของ asset:\nCR = P(A/P,i,N) − S(A/F,i,N)\nคือเงินก้อน P ลงทุน + ดอกที่เสียไป − salvage S ที่ได้คืนปลายอายุ. ใช้บ่อยใน Ch 7 (replacement).",
      },
      {
        title: "Repeatability vs Study period",
        body: "ทางเลือกอายุไม่เท่ากัน เปรียบโดยตรงไม่ได้:\n① Repeatability: สมมติแต่ละ alt ทำซ้ำได้ → ใช้ LCM ของอายุเป็น horizon. AW shortcut: AW ของรอบเดียว = AW ของ LCM.\n② Study period: กำหนด horizon คงที่ — ต้องประเมิน salvage ของแต่ละ alt ที่ปลาย period.",
      },
      {
        title: "MARR",
        body: "Minimum Acceptable Rate of Return = อัตราดอกขั้นต่ำที่ยอมรับได้. มาจาก cost of capital + risk premium ของบริษัท.",
      },
    ],
    formulas: [
      "PW = Σ A_j(1+i)^−j         decision: max PW",
      "AW = PW · (A/P,i,N)",
      "FW = Σ A_j(1+i)^(N−j)",
      "Capitalized cost: CC = A/i  (N → ∞)",
      "Capital recovery: CR = P(A/P,i,N) − S(A/F,i,N)",
      "Repeatability horizon = LCM of lives",
    ],
    traps: [
      "ใช้ raw PW เปรียบเทียบ alt อายุไม่เท่ากัน = ผิด เสมอ. ต้องใช้ repeatability หรือ study period.",
      "AW shortcut ใช้ได้เฉพาะ repeatability เท่านั้น ห้ามใช้กับ study period.",
      "CR คือ cost (จำนวนบวก) — ตอนเขียน A series ต้องใส่เครื่องหมายลบ.",
      "Capitalized cost ใช้ได้แต่กับ perpetual; ปกติ N = 50 ปีก็เกือบ ∞ แล้ว.",
    ],
    examples: [
      {
        q: "Alt A: cost 3,500, revenue 1,900/yr, OP cost 645/yr, life 4 yr.\nAlt B: cost 5,000, revenue 2,500/yr, OP cost 1,383/yr, life 8 yr.\nMARR = 10%. เลือก alt ไหน (repeatability)?",
        steps: [
          "LCM(4,8) = 8 → ทำ A ซ้ำ 2 รอบ",
          "PW(A) = −3500 − 3500(P/F,10,4) + 1255(P/A,10,8) = 804.93",
          "PW(B) = −5000 + 1117(P/A,10,8) = 959.16",
          "PW(B) > PW(A) → เลือก B",
        ],
      },
    ],
  },

  {
    id: "ch4",
    num: "04",
    title: "Comparison Methods II",
    titleTh: "วิธีเปรียบเทียบทางเลือก ภาค 2",
    icon: Zap,
    color: "#e07a5f",
    overview:
      'IRR คืออัตราที่ทำให้ PW = 0. กับดักคือ "IRR อาจไม่ unique" และ "การเปรียบเทียบ multi-projects ต้องทำ incremental". เข้าใจ 3 uniqueness tests ได้ คะแนนคุณปลอดภัย.',
    concepts: [
      {
        title: "Internal Rate of Return (IRR)",
        body: 'i* ที่ทำให้ Σ A_j(1+i*)^−j = 0.\nDecision (project เดียว): ถ้า i* > MARR → ทำ.',
      },
      {
        title: "Test 1 — Descartes' rule of signs",
        body: "จำนวน i* ที่เป็นจริง ≤ จำนวนการเปลี่ยนเครื่องหมายของ A_j.\n• 1 sign change → unique ✓\n• ≥ 2 sign changes → อาจไม่ unique → ไปข้อ 2",
      },
      {
        title: "Test 2 — Norstrom's criterion",
        body: 'ดู cumulative ΣA_j. ถ้ามีการเปลี่ยนเครื่องหมาย "แค่ครั้งเดียว" → unique. มากกว่า 1 → ไปข้อ 3.',
      },
      {
        title: "Test 3 — Project Balance",
        body: "PB(i*)_j = (1+i*)·PB(i*)_(j−1) + A_j โดย PB_0 = A_0 และ PB_N = 0.\nถ้า PB(i*)_j ≤ 0 ทุกปี → unique. มี > 0 บางปี → ใช้ ERR.",
      },
      {
        title: "External Rate of Return (ERR)",
        body: "เมื่อ IRR ไม่ unique:\nFW = Σ A(−)_j(1+i')^(N−j) + Σ A(+)_j(1+MARR)^(N−j) = 0 → solve i'.\nเปรียบ ERR กับ MARR เหมือน IRR.",
      },
      {
        title: "Incremental analysis",
        body: "1. เรียง alt ตาม initial investment น้อย → มาก.\n2. เช็ค IRR แต่ละ alt > MARR ไหม. ถ้าไม่ผ่าน ตัดทิ้ง.\n3. เปรียบคู่: คำนวณ IRR ของ Δ = (B − A).\n   • IRR(Δ) > MARR → เลือก B\n   • IRR(Δ) < MARR → เก็บ A\n4. นำผู้ชนะไปสู้คู่ถัดไป.",
      },
      {
        title: "Discounted payback period",
        body: "Smallest N ที่ Σ A_j(1+i)^−j ≥ 0.\nวัด liquidity ไม่ใช่ profitability — ใช้คู่กับ PW/IRR เท่านั้น.",
      },
    ],
    formulas: [
      "IRR: PW(i*) = Σ A_j(1+i*)^−j = 0",
      "Decision: IRR > MARR → accept",
      "Test 1: # sign changes in A_j",
      "Test 2: # sign changes in cumulative ΣA_j",
      "Test 3: PB(i*)_j ≤ 0 ∀j",
      "ERR: Σ A−(1+i')^(N−j) + Σ A+(1+MARR)^(N−j) = 0",
    ],
    traps: [
      "Multiple sign changes ≠ ไม่ unique — ต้องเช็ค Norstrom และ PB ก่อน.",
      "IRR ของ project A อาจสูงกว่า B แต่ B อาจดีกว่าหลังทำ incremental — อย่าใช้ IRR raw rank.",
      "ERR ใช้ MARR เป็น reinvestment rate — ไม่ใช่ IRR.",
      "Discounted payback อาจเลือก project ผิด ถ้าใช้ตัดสินใจคนเดียว.",
    ],
    examples: [
      {
        q: "Project: A_0 = −1000, A_1..3 = +500 ทุกปี. MARR = 10%. IRR และตัดสินใจ?",
        steps: [
          "PW(i*) = −1000 + 500(P/A,i*,3) = 0",
          "(P/A,i*,3) = 2.0 → i* ≈ 23.4%",
          "Sign changes: 1 (Descartes) → unique",
          "IRR = 23.4% > MARR = 10% → ทำ project",
        ],
      },
    ],
  },

  {
    id: "ch5",
    num: "05",
    title: "Depreciation",
    titleTh: "ค่าเสื่อมราคา",
    icon: FileText,
    color: "#9d8189",
    overview:
      'ค่าเสื่อมราคา = วิธีกระจายต้นทุน asset เป็นค่าใช้จ่ายทางบัญชีในแต่ละปี. "ลดได้เร็ว" = "ลดภาษีต้นปีได้มาก" = "PW after-tax สูงกว่า".',
    concepts: [
      {
        title: "Symbols & rules",
        body: "B = cost basis (ราคาซื้อ)\nS_d = salvage value\nN_d = depreciable life\nD_j = depreciation expense ปี j\nB_j = book value ปลายปี j\nกฎเหล็ก: B_j ≥ S_d เสมอ — book value ห้ามต่ำกว่าซาก.",
      },
      {
        title: "Straight Line (S/L)",
        body: "D = (B − S_d) / N_d  (constant)\nB_j = B − jD\nง่ายสุด แต่ลดช้า — tax shield สม่ำเสมอ.",
      },
      {
        title: "Declining Balance (DB)",
        body: "D_j = α·B_(j−1)  ;  B_j = B(1−α)^j\nค่าเสื่อมลดทุกปี.\n• 150% DB: α = 1.5 / N_d\n• 200% DB (DDB): α = 2 / N_d",
      },
      {
        title: "DB rule when B_j < S_d",
        body: 'ถ้าใช้ α ปกติแล้ว B_j จะลงต่ำกว่า S_d → "Do nothing": ตั้ง B_j = S_d, D_j = 0.\nหรือเลือก α* = 1 − (S_d/B)^(1/N_d) เพื่อให้ B พอดี = S_d ที่ปี N_d.',
      },
      {
        title: "Switching DB → S/L",
        body: "เมื่อ S/L ของ remaining book value > D ของ DB ปีนั้น → switch.\nD = (B_(j−1) − S_d) / (N_d − j + 1).",
      },
    ],
    formulas: [
      "S/L:  D = (B − S_d) / N_d            B_j = B − jD",
      "DB:  D_j = α·B_(j−1)                  B_j = B(1−α)^j",
      "150%DB: α = 1.5/N_d        DDB: α = 2/N_d",
      "α* = 1 − (S_d/B)^(1/N_d) → B_(N_d) = S_d exactly",
    ],
    traps: [
      "B_j ลงต่ำกว่า S_d ห้ามเด็ดขาด — ต้อง cap ที่ S_d.",
      "DDB ไม่ใช้ S_d ในการคำนวณ D_j ตรง ๆ — แค่เป็น floor.",
      "Switch DB → S/L: ต้องเลือกเวลาที่ D(SL) > D(DB) — ไม่ใช่เปลี่ยนสุ่ม.",
      "Faster depreciation มีประโยชน์ทางภาษีเมื่อ tax rate > 0 เท่านั้น.",
    ],
    examples: [
      {
        q: "Equipment B = 100,000, S_d = 16,000, N_d = 6 ปี. Compute SL and 150%DB.",
        steps: [
          "SL: D = (100000 − 16000)/6 = 14,000/yr",
          "150%DB: α = 1.5/6 = 0.25",
          "D_1 = 0.25(100000) = 25,000 → B_1 = 75,000",
          "D_2 = 0.25(75000) = 18,750 → B_2 = 56,250",
          "D_3 = 0.25(56250) = 14,062.5 → B_3 = 42,187.5",
          "ปีท้าย ๆ check ว่า B_j ≥ S_d (16000)",
        ],
      },
    ],
  },

  {
    id: "ch6",
    num: "06",
    title: "Taxes",
    titleTh: "ภาษี",
    icon: Receipt,
    color: "#5b8e7d",
    overview:
      'After-tax analysis = แปลงทุกอย่างเป็น CFAT แล้วใช้ CFAT แทน CFBT ใน NPV/IRR. กับดักหลัก: depreciation ลด taxable income แต่ "ไม่ใช่" cash flow — ต้องบวกกลับ.',
    concepts: [
      {
        title: "Income statement basics",
        body: "Gross Income GI = revenue ทั้งหมด\nExpenses E = ค่าใช้จ่ายดำเนินงาน (ไม่รวม depreciation, interest)\nGain/Loss on sale: G/L = S_a − B_n",
      },
      {
        title: "Taxable Income & Tax",
        body: 'TI = GI − E − D + (G/L)\nIT = TI × T\n* D ลดภาษีโดยลด TI — "tax shield".\n* G/L บวกเพิ่ม TI ถ้าขายแพงกว่าราคาตามบัญชี.',
      },
      {
        title: "CFBT vs CFAT",
        body: "CFBT = GI − E\nCFAT = GI − E + P + S_a + OtherCF − IT\n* P เป็นค่าลบ ตอนลงทุน\n* S_a เป็นค่าบวก ตอนขาย\n* IT ไปหักออก",
      },
      {
        title: "After-tax IRR & MARR",
        body: "After-tax IRR: PW(i*) ใช้ CFAT = 0.\nบริษัทมีสอง MARR: pretax (สูงกว่า) และ after-tax.\nTypical: after-tax MARR ≈ pretax MARR × (1 − T).",
      },
      {
        title: "Working capital (WC)",
        body: "เงินทุนหมุนเวียน = ลงทุนตอนเริ่ม recovery ตอนปิด project.\n• ไม่ depreciate\n• ไม่ลด TI\n• เป็น cash flow ปกติ",
      },
    ],
    formulas: [
      "TI = GI − E − D + (G/L)",
      "IT = TI × T",
      "G/L = S_a − B_n",
      "CFBT = GI − E",
      "CFAT = GI − E + P + S_a + OtherCF − IT",
      "After-tax IRR: PW(i*) of CFAT = 0",
    ],
    traps: [
      "ลืมบวก G/L กลับใน TI ตอนขาย asset.",
      "ใช้ CFBT ใน NPV หลังคิดภาษีแล้ว — ผิด ต้อง CFAT.",
      "Depreciate WC — ผิดเด็ดขาด WC ไม่ depreciate.",
      "150%DB หรือ DDB ลด tax ปีต้น ๆ มากกว่า SL — เลือกได้ก็เลือก.",
    ],
    examples: [
      {
        q: "P = 80,000, GI = 25,000/yr, E = 0, S_a = 25,000 ที่ปี 6, T = 0.10. ใช้ DDB N_d = 4, S_d = 8,000. หา PW after-tax ที่ MARR = 15%?",
        steps: [
          "D_1 = 0.5×80000 = 40000 → B_1 = 40000",
          "D_2 = 0.5×40000 = 20000 → B_2 = 20000",
          "D_3 = 0.5×20000 = 10000 → B_3 = 10000",
          "D_4 cap: D = 10000 − 8000 = 2000",
          "ทุกปี TI = 25000 − D ; IT = TI × 0.10 ; CFAT = 25000 − IT",
          "ปีขาย: G/L = 25000 − 8000 = 17000 → IT_extra = 1700",
          "PW = Σ CFAT(P/F, 15%, j) − P",
        ],
      },
    ],
  },

  {
    id: "ch7",
    num: "07",
    title: "Retirement & Replacement",
    titleTh: "การเลิกใช้และทดแทนเครื่องจักร",
    icon: Repeat,
    color: "#c1666b",
    overview:
      'Defender (เครื่องเก่า) vs Challenger (เครื่องใหม่) — ตัดสินใจปีต่อปี. หัวใจคือ Economic life N* = ปีที่ Annual Cost ต่ำสุด ของ challenger.',
    concepts: [
      {
        title: "Sunk cost ของ defender",
        body: 'ราคาที่ซื้อมาเดิม = sunk cost ลืมไปได้เลย. "P" ของ defender = current market value ตอนนี้.',
      },
      {
        title: "Annual Cost AC(N)",
        body: "AC(N) = CR(N) + Eq.Uniform Annual OP cost over N\nCR(N) = (P − S_n)(A/P,i,N) + i·S_n\nคิด AC สำหรับทุก N → หา N ที่ AC ต่ำสุด = N*.",
      },
      {
        title: "Retain / Replace decision",
        body: "1. หา N* และ AC(N*) ของ challenger.\n2. หาอายุปัจจุบัน N₀ ของ defender.\n3. คำนวณ AC(D→Δ) สำหรับ Δ = 1, 2, 3, ...\n4. ถ้า AC(D→Δ) < AC(N*) → เก็บ defender อย่างน้อย Δ ปี.\n5. ถ้า AC(D→Δ) > AC(N*) ทุก Δ → replace ทันที.",
      },
      {
        title: "Identical vs Unlike replacement",
        body: "Identical: challenger เหมือน defender — service life รวม = N₀ + N_max.\nUnlike: challenger ต่าง — เปรียบ AC ตามขั้นตอนข้างบน.",
      },
    ],
    formulas: [
      "AC(N) = CR(N) + Eq.Uniform Annual OP cost",
      "CR(N) = (P − S_n)(A/P,i,N) + i·S_n",
      "N* = year minimising AC(N) of challenger",
      "Decision: ถ้า AC(D→Δ) < AC(N*) → keep defender Δ more years",
    ],
    traps: [
      "ใช้ราคาซื้อเดิมเป็น P ของ defender — ผิด, ใช้ market value.",
      "Challenger คำนวณ AC ผิด N (ไม่ใช่ economic life).",
      "ลืม OP cost growth ของ defender ตามอายุ.",
      "เปรียบ AC(defender) ตลอดชีวิต vs AC(challenger N*) — ผิด, เปรียบทีละ Δ.",
    ],
    examples: [
      {
        q: "Defender อายุ 5 ปี, market value 6,000, OP cost ปีถัด ๆ: 2000, 4000.\nChallenger: AC(N*=4) = 5,887. MARR=15%. เก็บหรือเปลี่ยน?",
        steps: [
          "AC(D→1) = (6000−4000)(A/P,15,1) + 0.15(4000) + 2000 = 2000(1.15) + 600 + 2000 = 5,300",
          "AC(D→1) = 5,300 < 5,887 → keep at least 1 more year",
          "ทำซ้ำสำหรับ Δ = 2, 3, ... จนกว่า AC(D→Δ) > AC(N*)",
        ],
      },
    ],
  },

  {
    id: "ch8",
    num: "08",
    title: "Inflation",
    titleTh: "เงินเฟ้อ",
    icon: Wind,
    color: "#7d8cc4",
    overview:
      'เงินเฟ้อ f = ราคาเพิ่มเฉลี่ยต่อปี. กฎทอง: ใช้ rate ที่ match กับ dollar units — actual$ → market rate, constant$ → real rate.',
    concepts: [
      {
        title: "Three dollars",
        body: "Actual / Future / Current dollars (AD): เงินจริงที่จะจ่าย/รับ — รวม inflation.\nConstant / Today's dollars (CD): เทียบเท่ากับเงินวันนี้ — ปลด inflation ออก.",
      },
      {
        title: "Two interest rates",
        body: "Real rate i: ดอกเทียบกำลังซื้อเท่ากัน — ดอกแท้.\nMarket rate i_f: ดอกที่ธนาคารโฆษณา — ดอกที่เห็น.\n\nFisher: i_f = i + f + (i·f)\nหรือ i = (i_f − f) / (1 + f)",
      },
      {
        title: "Conversions",
        body: "AD_n = CD_n · (1+f)^n\nCD_n = AD_n / (1+f)^n",
      },
      {
        title: "Two analysis methods",
        body: "① Constant-$: แปลง AD → CD แล้ว discount ด้วย real rate i\n  PW = Σ CD_j(1+i)^−j\n\n② Actual-$: ใช้ AD ตรง ๆ discount ด้วย market rate i_f\n  PW = Σ AD_j(1+i_f)^−j\n\nสองวิธีให้ PW เท่ากันถ้าทำถูก.",
      },
      {
        title: "MARR & IRR conversions",
        body: "MARR_AD = MARR_CD + f + (MARR_CD · f)\nMARR_CD = (1 + MARR_AD)/(1+f) − 1\n\nIRR ก็แปลงด้วย Fisher equation เหมือนกัน.",
      },
    ],
    formulas: [
      "AD = CD(1+f)^n",
      "CD = AD/(1+f)^n",
      "i_f = i + f + (i·f)            (Fisher)",
      "i = (i_f − f) / (1 + f)",
      "Actual-$:   PW = Σ AD_j(1+i_f)^−j",
      "Constant-$: PW = Σ CD_j(1+i)^−j",
    ],
    traps: [
      "ใช้ market rate กับ constant dollars หรือ real rate กับ actual dollars — ผิดทั้งคู่.",
      "ลืม cross-term i·f ใน Fisher equation — สำคัญเมื่อ f สูง.",
      "Mixed cash flows: ต้องเลือก basis เดียว แล้วแปลงทุก CF ให้อยู่ใน basis เดียวกัน.",
      'Annuity ที่ "คงที่ในเงินวันนี้" คือ growing annuity ใน actual dollars.',
    ],
    examples: [
      {
        q: "Annuity 3,000/yr (CD) นาน 10 ปี. f = 4%, i_f = 15%. หา PW?",
        steps: [
          "Real rate i = (0.15 − 0.04)/1.04 = 10.58%",
          "PW = 3000(P/A, 10.58%, 10) = 3000 × 6.019 = 18,057",
          "วิธี actual-$ ก็ได้คำตอบเดียวกัน",
        ],
      },
    ],
  },

  {
    id: "ch9",
    num: "09",
    title: "Cost Estimation",
    titleTh: "การประเมินต้นทุน",
    icon: Wrench,
    color: "#b4846c",
    overview:
      'ก่อนสร้างโรงงานต้องประเมิน "ต้นทุนรวม". มีหลายระดับความแม่น ตั้งแต่ ±5% (detailed) ถึง ±50% (turnover ratio).',
    concepts: [
      {
        title: "Total Capital Investment",
        body: "TCI = FCI + WC\n• FCI: ลงทุนถาวร\n• WC: เงินหมุนเวียน 10–20% ของ TCI",
      },
      {
        title: "FCI breakdown",
        body: "Manufacturing/Direct (~70%):\n  Equipment, installation, instrumentation, piping, electrical, buildings, yard, services, land.\n\nNon-manufacturing/Indirect (~30%):\n  Engineering, legal, construction, contractor's fee, contingencies.",
      },
      {
        title: "Cost indexes",
        body: "Cost_now = Cost_then × (Index_now / Index_then)\nIndexes: Marshall & Swift, ENR, Nelson-Farrar, CEPCI.",
      },
      {
        title: "Scaling factor (six-tenths rule)",
        body: "Cost_A = Cost_B × (Capacity_A / Capacity_B)^k\nk จาก Table 6-4. ถ้าไม่มี k = 0.6.\nเมื่อปีต่างกันคูณ cost-index ratio ด้วย.",
      },
      {
        title: "7 FCI methods",
        body: "A. Detailed-item (±5%) — bid-quality\nB. Unit cost (±10–20%)\nC. % of delivered-equipment (±20–30%) — FCI = Σ(1+f₁+f₂+…)·E\nD. Lang factors — FCI = f_L · E\nE. Power factor — FCI_new = FCI_old · f_e · R^x\n   Closer: FCI = f·(D·R^x + I), f = f_E·f_L/f_P\nF. Investment per unit capacity\nG. Turnover ratio — FCI = annual sales / TR (chem ≈ 0.5)",
      },
      {
        title: "Total Product Cost",
        body: "Manufacturing cost:\n• Variable: raw materials, op labor, supervision, utilities, maintenance, supplies, lab, royalties, catalysts\n• Fixed: depreciation, financing, taxes, insurance, rent\n• Plant overhead\n\nGeneral expenses:\n• Administrative\n• Distribution & marketing\n• R&D",
      },
      {
        title: "Operating labor",
        body: "อ่านจาก Fig 6-9. Rule of thumb:\n• Fluids: 0.33–2 emp-hr / 1000 kg\n• Solid-fluids: 2–4\n• Solids: ~4.8",
      },
      {
        title: "Breakeven",
        body: "Total annual product cost = Total annual sales\nVariable cost + Fixed cost = SP × Q_breakeven\nDesign plant: ปี 1 มัก ~50% capacity.",
      },
    ],
    formulas: [
      "TCI = FCI + WC      (WC ≈ 10–20% of TCI)",
      "Cost_now = Cost_then × (I_now / I_then)",
      "Cost_A = Cost_B × (X_A/X_B)^k    (k=0.6 default)",
      "Power-factor: FCI_new = FCI_old · f_e · R^x",
      "Lang: FCI = f_L · E",
      "Turnover: FCI = annual sales / turnover ratio",
      "Breakeven: Var + Fixed = SP × Q",
    ],
    traps: [
      "ลืมคูณ cost-index ratio เมื่อ scaling ข้ามปี.",
      "Power factor x ขึ้นกับ equipment type — ใช้ตาราง 6-4 ห้ามเดา.",
      "WC ส่วนหนึ่งของ TCI ไม่ใช่ FCI — ระวังตอนคำนวณ depreciation.",
      "Turnover ratio chem ≈ 0.5 (ไม่ใช่ 1).",
    ],
    examples: [
      {
        q: "Reactor 0.2 m³ ราคา $10,000 ปี 1991. หา cost ของ 1.2 m³ ปี 1996 (CEPCI 91=361.3, 96=381.7, k=0.54).",
        steps: [
          "Cost_new = 10000 × (1.2/0.2)^0.54 × (381.7/361.3)",
          "= 10000 × 6^0.54 × 1.0565",
          "= 10000 × 2.736 × 1.0565",
          "≈ 28,900 — สรุปในเอกสารใช้ ≈ $27,800",
        ],
      },
    ],
  },
];
