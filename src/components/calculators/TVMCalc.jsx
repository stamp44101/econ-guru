import { useState } from "react";
import { FP, PF, FA, AF, PA, AP, PG, AG, fmt } from "../../lib/tvm";
import { Field, Out, Section, num } from "./shared";

export default function TVMCalc() {
  const [P, setP] = useState("1000");
  const [A, setA] = useState("100");
  const [iPct, setI] = useState("8");
  const [N, setN] = useState("10");
  const [G, setG] = useState("0");

  const i = num(iPct) / 100;
  const n = num(N);
  const p = num(P);
  const a = num(A);
  const g = num(G, 0);

  const valid = Number.isFinite(i) && Number.isFinite(n) && n > 0;

  const factors = valid
    ? {
        FP: FP(i, n),
        PF: PF(i, n),
        FA: FA(i, n),
        AF: AF(i, n),
        PA: PA(i, n),
        AP: AP(i, n),
        PG: PG(i, n),
        AG: AG(i, n),
      }
    : null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <Section title="Inputs">
        <div className="grid grid-cols-2 gap-5">
          <Field label="P" value={P} onChange={setP} />
          <Field label="A" value={A} onChange={setA} />
          <Field label="i" value={iPct} onChange={setI} suffix="%" />
          <Field label="N" value={N} onChange={setN} />
          <Field label="G (gradient)" value={G} onChange={setG} />
        </div>
      </Section>

      <Section title="Factors">
        {factors ? (
          <div>
            <Out label="(F/P, i, N)" value={fmt(factors.FP, 5)} />
            <Out label="(P/F, i, N)" value={fmt(factors.PF, 5)} />
            <Out label="(F/A, i, N)" value={fmt(factors.FA, 5)} />
            <Out label="(A/F, i, N)" value={fmt(factors.AF, 5)} />
            <Out label="(P/A, i, N)" value={fmt(factors.PA, 5)} />
            <Out label="(A/P, i, N)" value={fmt(factors.AP, 5)} />
            <Out label="(P/G, i, N)" value={fmt(factors.PG, 5)} />
            <Out label="(A/G, i, N)" value={fmt(factors.AG, 5)} />
          </div>
        ) : (
          <p className="thai text-sm" style={{ color: "rgba(252,232,176,0.78)" }}>
            กรอก i และ N ที่ถูกต้อง
          </p>
        )}
      </Section>

      {factors && (
        <Section title="From P">
          <Out label="F = P · (F/P)" value={fmt(p * factors.FP)} accent="#d4a85a" />
          <Out label="A = P · (A/P)" value={fmt(p * factors.AP)} accent="#d4a85a" />
        </Section>
      )}

      {factors && (
        <Section title="From A">
          <Out label="P = A · (P/A)" value={fmt(a * factors.PA)} accent="#d4a85a" />
          <Out label="F = A · (F/A)" value={fmt(a * factors.FA)} accent="#d4a85a" />
        </Section>
      )}

      {factors && g !== 0 && (
        <Section title="Gradient">
          <Out label="P_grad = G · (P/G)" value={fmt(g * factors.PG)} />
          <Out label="A_grad = G · (A/G)" value={fmt(g * factors.AG)} />
          <Out
            label="P_total = A·(P/A) + G·(P/G)"
            value={fmt(a * factors.PA + g * factors.PG)}
            accent="#d4a85a"
          />
        </Section>
      )}
    </div>
  );
}
