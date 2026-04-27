import { useState, useEffect } from "react";
import TVMCalc from "./calculators/TVMCalc";
import RateCalc from "./calculators/RateCalc";
import LoanCalc from "./calculators/LoanCalc";
import DeprCalc from "./calculators/DeprCalc";
import InflCalc from "./calculators/InflCalc";
import CRCalc from "./calculators/CRCalc";
import ScaleCalc from "./calculators/ScaleCalc";
import IRRCheckCalc from "./calculators/IRRCheckCalc";

const CALCS = [
  { id: "tvm", label: "Time Value (P/F/A)", chapters: ["ch2", "ch3"], el: <TVMCalc /> },
  { id: "rate", label: "Effective ↔ Nominal", chapters: ["ch2"], el: <RateCalc /> },
  { id: "loan", label: "Loan Amortisation", chapters: ["ch2"], el: <LoanCalc /> },
  { id: "depr", label: "Depreciation Table", chapters: ["ch5", "ch6"], el: <DeprCalc /> },
  { id: "infl", label: "Inflation Converter", chapters: ["ch8"], el: <InflCalc /> },
  { id: "cr", label: "Capital Recovery", chapters: ["ch3", "ch7"], el: <CRCalc /> },
  { id: "scale", label: "Cost Scaling", chapters: ["ch9"], el: <ScaleCalc /> },
  { id: "irr", label: "IRR Uniqueness", chapters: ["ch4"], el: <IRRCheckCalc /> },
];

export default function CalcMode({ chapter }) {
  const visible = chapter
    ? CALCS.filter((c) => c.chapters.includes(chapter.id))
    : CALCS;

  const [activeId, setActiveId] = useState(visible[0]?.id || CALCS[0].id);

  useEffect(() => {
    if (!visible.find((c) => c.id === activeId)) {
      setActiveId(visible[0]?.id || CALCS[0].id);
    }
  }, [chapter, activeId, visible]);

  if (visible.length === 0) {
    return (
      <p className="thai mt-6" style={{ color: "rgba(252,232,176,0.6)" }}>
        บทนี้ไม่มีเครื่องคิดที่เกี่ยวข้อง — ลองล้างการเลือกบทดูได้
      </p>
    );
  }

  const active = visible.find((c) => c.id === activeId) || visible[0];

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-10 -mx-1 pb-2 overflow-x-auto">
        {visible.map((c) => {
          const on = c.id === activeId;
          return (
            <button
              key={c.id}
              onClick={() => setActiveId(c.id)}
              className="px-3 py-2 text-[11px] tracking-[0.2em] uppercase whitespace-nowrap transition rounded"
              style={{
                background: on ? "rgba(212,168,90,0.1)" : "transparent",
                border: `1px solid ${on ? "#d4a85a" : "rgba(212,168,90,0.15)"}`,
                color: on ? "#fce8b0" : "rgba(252,232,176,0.55)",
              }}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      <div>{active.el}</div>
    </div>
  );
}
