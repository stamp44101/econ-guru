import { useState } from "react";
import { irrBisect, signChanges, cumulative, pct, fmt } from "../../lib/tvm";
import { Out, Section } from "./shared";

function parseCFs(s) {
  return s
    .split(/[\s,;]+/)
    .map((x) => x.trim())
    .filter((x) => x.length > 0)
    .map((x) => parseFloat(x))
    .filter((x) => Number.isFinite(x));
}

export default function IRRCheckCalc() {
  const [text, setText] = useState("-1000, 500, 500, 500");

  const cfs = parseCFs(text);
  const sig = signChanges(cfs);
  const cum = cumulative(cfs);
  const cumSig = signChanges(cum);
  const irr = cfs.length >= 2 ? irrBisect(cfs) : null;

  let verdict, vColor, vNote;
  if (cfs.length < 2) {
    verdict = "—";
    vColor = "rgba(245,240,255,0.65)";
    vNote = "ใส่ cash flow อย่างน้อย 2 ค่า";
  } else if (sig === 1) {
    verdict = "UNIQUE";
    vColor = "#86efac";
    vNote = "Descartes พิสูจน์ — sign changes = 1.";
  } else if (cumSig === 1) {
    verdict = "UNIQUE";
    vColor = "#86efac";
    vNote = "Norstrom พิสูจน์ — cumulative sign changes = 1.";
  } else {
    verdict = "อาจไม่ unique";
    vColor = "#fb7185";
    vNote = "ลอง Project Balance test หรือใช้ ERR แทน.";
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <Section title="Cash flows (year 0, 1, 2, …)">
        <textarea
          rows={5}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full bg-transparent border outline-none p-3 font-mono text-[14px] resize-y"
          style={{ borderColor: "rgba(167,139,250,0.2)", color: "#f5f0ff" }}
          placeholder="-1000, 500, 500, 500"
        />
        <p className="text-xs mt-3 thai" style={{ color: "rgba(245,240,255,0.72)" }}>
          คั่นด้วย comma หรือ space. ติดลบสำหรับ outflow.
        </p>
      </Section>

      <Section title="Tests">
        <Out label="N" value={cfs.length} mono={false} />
        <Out label="Descartes sign changes" value={sig} />
        <Out label="Norstrom cumulative sign changes" value={cumSig} />
        <Out label="IRR (bisection)" value={irr === null ? "—" : pct(irr, 4)} accent="#fb7185" />

        <div
          className="mt-6 p-4 border-l-2"
          style={{ borderColor: vColor, background: "rgba(10,6,18,0.5)" }}
        >
          <div className="text-[10px] tracking-[0.3em] uppercase mb-1" style={{ color: vColor }}>
            ▸ verdict
          </div>
          <div className="text-2xl" style={{ fontFamily: "'Cormorant Garamond', serif", color: vColor }}>
            {verdict}
          </div>
          <div className="thai text-sm mt-2" style={{ color: "rgba(245,240,255,0.9)" }}>
            {vNote}
          </div>
        </div>
      </Section>
    </div>
  );
}
