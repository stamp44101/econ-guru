import { useState } from "react";
import { fmt } from "../../lib/tvm";
import { Field, Section, num } from "./shared";

const METHODS = [
  { id: "SL", label: "Straight-Line" },
  { id: "DB150", label: "150% DB" },
  { id: "DDB", label: "200% DDB" },
];

function buildSL(B, S, N) {
  const D = (B - S) / N;
  const rows = [];
  for (let j = 1; j <= N; j++) {
    rows.push({ j, D, B: B - j * D });
  }
  return rows;
}

function buildDB(B, S, N, alpha) {
  const rows = [];
  let bal = B;
  for (let j = 1; j <= N; j++) {
    let D = alpha * bal;
    if (bal - D < S) {
      D = Math.max(0, bal - S);
    }
    if (bal <= S) D = 0;
    bal = bal - D;
    rows.push({ j, D, B: bal });
  }
  return rows;
}

export default function DeprCalc() {
  const [B, setB] = useState("100000");
  const [Sd, setSd] = useState("16000");
  const [Nd, setNd] = useState("6");
  const [m, setM] = useState("DB150");

  const Bv = num(B);
  const Sv = num(Sd);
  const Nv = num(Nd);
  const ok = Bv > 0 && Sv >= 0 && Nv > 0 && Bv >= Sv;

  let rows = [];
  if (ok) {
    if (m === "SL") rows = buildSL(Bv, Sv, Nv);
    else if (m === "DB150") rows = buildDB(Bv, Sv, Nv, 1.5 / Nv);
    else rows = buildDB(Bv, Sv, Nv, 2 / Nv);
  }
  const total = rows.reduce((s, r) => s + r.D, 0);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Section title="Asset & method">
          <div className="grid grid-cols-2 gap-5">
            <Field label="B (cost basis)" value={B} onChange={setB} />
            <Field label="S_d (salvage)" value={Sd} onChange={setSd} />
            <Field label="N_d (life)" value={Nd} onChange={setNd} />
          </div>
          <div className="flex flex-wrap gap-2 mt-6">
            {METHODS.map((x) => (
              <button
                key={x.id}
                onClick={() => setM(x.id)}
                className="px-3 py-2 text-[11px] tracking-[0.2em] uppercase transition rounded"
                style={{
                  background: m === x.id ? "rgba(212,168,90,0.1)" : "transparent",
                  border: `1px solid ${m === x.id ? "#d4a85a" : "rgba(212,168,90,0.2)"}`,
                  color: m === x.id ? "#fce8b0" : "rgba(252,232,176,0.6)",
                }}
              >
                {x.label}
              </button>
            ))}
          </div>
        </Section>

        <Section title="Summary">
          {ok ? (
            <>
              <div className="flex justify-between border-b py-2.5" style={{ borderColor: "rgba(212,168,90,0.08)" }}>
                <span className="text-[12px] thai" style={{ color: "rgba(252,232,176,0.55)" }}>Method</span>
                <span className="font-mono text-[14px]">{m}</span>
              </div>
              {m === "DB150" && (
                <div className="flex justify-between border-b py-2.5" style={{ borderColor: "rgba(212,168,90,0.08)" }}>
                  <span className="text-[12px]">α = 1.5 / N_d</span>
                  <span className="font-mono text-[14px] tabular-nums">{fmt(1.5 / Nv, 4)}</span>
                </div>
              )}
              {m === "DDB" && (
                <div className="flex justify-between border-b py-2.5" style={{ borderColor: "rgba(212,168,90,0.08)" }}>
                  <span className="text-[12px]">α = 2 / N_d</span>
                  <span className="font-mono text-[14px] tabular-nums">{fmt(2 / Nv, 4)}</span>
                </div>
              )}
              <div className="flex justify-between border-b py-2.5" style={{ borderColor: "rgba(212,168,90,0.08)" }}>
                <span className="text-[12px]">Total depreciation</span>
                <span className="font-mono text-[14px] tabular-nums" style={{ color: "#d4a85a" }}>
                  {fmt(total)}
                </span>
              </div>
            </>
          ) : (
            <p className="thai text-sm" style={{ color: "rgba(252,232,176,0.5)" }}>
              กรอกค่าให้ครบและ B ≥ S_d
            </p>
          )}
        </Section>
      </div>

      {ok && (
        <div className="mt-10">
          <div className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: "rgba(212,168,90,0.55)" }}>
            ▸ Year-by-year
          </div>
          <div
            className="overflow-x-auto border-l-2"
            style={{ borderColor: "#9d8189", background: "rgba(15,12,10,0.5)" }}
          >
            <table className="w-full font-mono text-[12px] tabular-nums">
              <thead>
                <tr style={{ color: "rgba(212,168,90,0.7)" }}>
                  <th className="text-left px-3 py-2 font-normal">j</th>
                  <th className="text-right px-3 py-2 font-normal">D_j</th>
                  <th className="text-right px-3 py-2 font-normal">B_j</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.j} style={{ color: "rgba(252,232,176,0.85)" }}>
                    <td className="px-3 py-1.5" style={{ color: "rgba(212,168,90,0.5)" }}>{r.j}</td>
                    <td className="text-right px-3 py-1.5">{fmt(r.D)}</td>
                    <td className="text-right px-3 py-1.5">{fmt(r.B)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
