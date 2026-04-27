import { useState } from "react";
import { AP, fmt } from "../../lib/tvm";
import { Field, Out, Section, num } from "./shared";

export default function LoanCalc() {
  const [P, setP] = useState("100000");
  const [iPct, setI] = useState("1");
  const [N, setN] = useState("36");

  const p = num(P);
  const i = num(iPct) / 100;
  const n = num(N);

  const ok = p > 0 && n > 0 && Number.isFinite(i);
  const A = ok ? p * AP(i, n) : NaN;

  const rows = [];
  if (ok && Number.isFinite(A)) {
    let bal = p;
    for (let j = 1; j <= n; j++) {
      const I = bal * i;
      const dP = A - I;
      bal -= dP;
      rows.push({ j, A, I, dP, bal: Math.max(bal, 0) });
    }
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Section title="Loan parameters">
          <div className="grid grid-cols-2 gap-5">
            <Field label="P (principal)" value={P} onChange={setP} />
            <Field label="i / period" value={iPct} onChange={setI} suffix="%" />
            <Field label="N (periods)" value={N} onChange={setN} />
          </div>
        </Section>

        <Section title="Summary">
          {ok ? (
            <>
              <Out label="A (per-period payment)" value={fmt(A)} accent="#d4a85a" />
              <Out label="Total paid (NA)" value={fmt(A * n)} />
              <Out label="Total interest" value={fmt(A * n - p)} />
            </>
          ) : (
            <p className="thai text-sm" style={{ color: "rgba(252,232,176,0.78)" }}>
              กรอก P, i, N
            </p>
          )}
        </Section>
      </div>

      {ok && rows.length > 0 && (
        <div className="mt-10">
          <div className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: "rgba(212,168,90,0.82)" }}>
            ▸ Amortisation table
          </div>
          {rows.length > 60 ? (
            <p className="thai text-sm" style={{ color: "rgba(252,232,176,0.78)" }}>
              ลด N เพื่อดูตาราง (ปัจจุบัน {rows.length} งวด — เกิน 60)
            </p>
          ) : (
            <div
              className="overflow-x-auto border-l-2"
              style={{ borderColor: "rgba(212,168,90,0.55)", background: "rgba(15,12,10,0.5)" }}
            >
              <table className="w-full font-mono text-[12px] tabular-nums">
                <thead>
                  <tr style={{ color: "rgba(212,168,90,0.9)" }}>
                    <th className="text-left px-3 py-2 font-normal">j</th>
                    <th className="text-right px-3 py-2 font-normal">A</th>
                    <th className="text-right px-3 py-2 font-normal">I_j</th>
                    <th className="text-right px-3 py-2 font-normal">ΔP_j</th>
                    <th className="text-right px-3 py-2 font-normal">P_j</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.j} style={{ color: "rgba(252,232,176,0.85)" }}>
                      <td className="px-3 py-1.5" style={{ color: "rgba(212,168,90,0.78)" }}>{r.j}</td>
                      <td className="text-right px-3 py-1.5">{fmt(r.A)}</td>
                      <td className="text-right px-3 py-1.5">{fmt(r.I)}</td>
                      <td className="text-right px-3 py-1.5">{fmt(r.dP)}</td>
                      <td className="text-right px-3 py-1.5">{fmt(r.bal)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
