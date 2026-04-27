import { useState } from "react";
import { fmt, pow } from "../../lib/tvm";
import { Field, Out, Section, num } from "./shared";

export default function RateCalc() {
  const [dir, setDir] = useState("nom2eff");
  const [r, setR] = useState("12");
  const [eff, setEff] = useState("12.68");
  const [M, setM] = useState("12");

  const m = num(M);

  let im, i, R;
  if (dir === "nom2eff") {
    R = num(r) / 100;
    im = R / m;
    i = pow(1 + R / m, m) - 1;
  } else {
    i = num(eff) / 100;
    im = pow(1 + i, 1 / m) - 1;
    R = m * im;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <Section title="Mode">
        <div className="flex gap-2 mb-6 text-[11px] tracking-[0.2em] uppercase">
          {[
            ["nom2eff", "Nominal → Effective"],
            ["eff2nom", "Effective → Nominal"],
          ].map(([id, label]) => (
            <button
              key={id}
              onClick={() => setDir(id)}
              className="px-3 py-2 transition rounded"
              style={{
                background: dir === id ? "rgba(167,139,250,0.1)" : "transparent",
                border: `1px solid ${dir === id ? "#a78bfa" : "rgba(167,139,250,0.2)"}`,
                color: dir === id ? "#f5f0ff" : "rgba(245,240,255,0.85)",
              }}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="space-y-5">
          {dir === "nom2eff" ? (
            <Field label="Nominal r" value={r} onChange={setR} suffix="% / yr" />
          ) : (
            <Field label="Effective i" value={eff} onChange={setEff} suffix="% / yr" />
          )}
          <Field label="M (sub-periods/year)" value={M} onChange={setM} />
        </div>
      </Section>

      <Section title="Results">
        <Out label="i_m (rate per sub-period)" value={fmt(im * 100, 6) + " %"} />
        <Out label="r (nominal annual)" value={fmt(R * 100, 6) + " %"} accent={dir === "eff2nom" ? "#a78bfa" : undefined} />
        <Out label="i (effective annual)" value={fmt(i * 100, 6) + " %"} accent={dir === "nom2eff" ? "#a78bfa" : undefined} />
        <p className="thai text-xs mt-4" style={{ color: "rgba(245,240,255,0.72)" }}>
          กฎ: i ≥ r เสมอ; เท่ากันเมื่อ M = 1.
        </p>
      </Section>
    </div>
  );
}
