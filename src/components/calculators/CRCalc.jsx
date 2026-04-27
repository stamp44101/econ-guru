import { useState } from "react";
import { AP, AF, fmt } from "../../lib/tvm";
import { Field, Out, Section, num } from "./shared";

export default function CRCalc() {
  const [P, setP] = useState("100000");
  const [S, setS] = useState("20000");
  const [iPct, setI] = useState("10");
  const [N, setN] = useState("8");

  const p = num(P);
  const s = num(S);
  const i = num(iPct) / 100;
  const n = num(N);
  const ok = n > 0 && Number.isFinite(i);

  const ap = ok ? AP(i, n) : NaN;
  const af = ok ? AF(i, n) : NaN;
  const cr = ok ? p * ap - s * af : NaN;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <Section title="Asset">
        <div className="grid grid-cols-2 gap-5">
          <Field label="P (initial cost)" value={P} onChange={setP} />
          <Field label="S (salvage)" value={S} onChange={setS} />
          <Field label="i" value={iPct} onChange={setI} suffix="%" />
          <Field label="N (life)" value={N} onChange={setN} />
        </div>
      </Section>

      <Section title="Capital recovery">
        {ok ? (
          <>
            <Out label="(A/P, i, N)" value={fmt(ap, 5)} />
            <Out label="(A/F, i, N)" value={fmt(af, 5)} />
            <Out label="P · (A/P)" value={fmt(p * ap)} />
            <Out label="S · (A/F)" value={fmt(s * af)} />
            <Out label="CR = P(A/P) − S(A/F)" value={fmt(cr)} accent="#7fb069" />
          </>
        ) : (
          <p className="thai text-sm" style={{ color: "rgba(252,232,176,0.5)" }}>
            กรอกค่าให้ครบ
          </p>
        )}
      </Section>
    </div>
  );
}
