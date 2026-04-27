import { useState } from "react";
import { fmt, pow } from "../../lib/tvm";
import { Field, Out, Section, num } from "./shared";

export default function InflCalc() {
  const [tab, setTab] = useState("dollars");

  // dollars sub-mode
  const [CD, setCD] = useState("1000");
  const [AD, setAD] = useState("");
  const [direction, setDirection] = useState("cd2ad");
  const [f, setF] = useState("4");
  const [n, setN] = useState("10");

  // rate sub-mode
  const [iReal, setIReal] = useState("10");
  const [iMkt, setIMkt] = useState("");
  const [rateDir, setRateDir] = useState("real2mkt");
  const [f2, setF2] = useState("4");

  const fv = num(f) / 100;
  const nv = num(n);

  let cd = num(CD), ad = num(AD);
  if (direction === "cd2ad" && Number.isFinite(cd) && Number.isFinite(fv) && Number.isFinite(nv)) {
    ad = cd * pow(1 + fv, nv);
  } else if (direction === "ad2cd" && Number.isFinite(ad) && Number.isFinite(fv) && Number.isFinite(nv)) {
    cd = ad / pow(1 + fv, nv);
  }

  const fv2 = num(f2) / 100;
  let realR = num(iReal) / 100;
  let mktR = num(iMkt) / 100;
  if (rateDir === "real2mkt" && Number.isFinite(realR) && Number.isFinite(fv2)) {
    mktR = realR + fv2 + realR * fv2;
  } else if (rateDir === "mkt2real" && Number.isFinite(mktR) && Number.isFinite(fv2)) {
    realR = (mktR - fv2) / (1 + fv2);
  }

  return (
    <div>
      <div className="flex gap-2 mb-8 text-[11px] tracking-[0.2em] uppercase">
        {[
          ["dollars", "AD ↔ CD"],
          ["rate", "Fisher (i ↔ i_f)"],
        ].map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className="px-3 py-2 transition rounded"
            style={{
              background: tab === id ? "rgba(212,168,90,0.1)" : "transparent",
              border: `1px solid ${tab === id ? "#d4a85a" : "rgba(212,168,90,0.2)"}`,
              color: tab === id ? "#fce8b0" : "rgba(252,232,176,0.6)",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "dollars" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <Section title="Dollars conversion">
            <div className="flex gap-2 mb-5 text-[10px] tracking-[0.2em] uppercase">
              {[
                ["cd2ad", "CD → AD"],
                ["ad2cd", "AD → CD"],
              ].map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => setDirection(id)}
                  className="px-2.5 py-1.5 transition rounded"
                  style={{
                    background: direction === id ? "rgba(125,140,196,0.15)" : "transparent",
                    border: `1px solid ${direction === id ? "#7d8cc4" : "rgba(212,168,90,0.2)"}`,
                    color: direction === id ? "#fce8b0" : "rgba(252,232,176,0.6)",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-5">
              {direction === "cd2ad" ? (
                <Field label="CD (today's $)" value={CD} onChange={setCD} />
              ) : (
                <Field label="AD (actual $)" value={AD} onChange={setAD} />
              )}
              <Field label="f (inflation)" value={f} onChange={setF} suffix="%" />
              <Field label="n (years)" value={n} onChange={setN} />
            </div>
          </Section>

          <Section title="Result">
            <Out label="CD" value={Number.isFinite(cd) ? fmt(cd, 2) : "—"} accent={direction === "ad2cd" ? "#7d8cc4" : undefined} />
            <Out label="AD" value={Number.isFinite(ad) ? fmt(ad, 2) : "—"} accent={direction === "cd2ad" ? "#7d8cc4" : undefined} />
            <p className="thai text-xs mt-4" style={{ color: "rgba(252,232,176,0.45)" }}>
              กฎทอง: Actual$ → discount ด้วย i_f. Constant$ → discount ด้วย i.
            </p>
          </Section>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <Section title="Fisher equation">
            <div className="flex gap-2 mb-5 text-[10px] tracking-[0.2em] uppercase">
              {[
                ["real2mkt", "i → i_f"],
                ["mkt2real", "i_f → i"],
              ].map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => setRateDir(id)}
                  className="px-2.5 py-1.5 transition rounded"
                  style={{
                    background: rateDir === id ? "rgba(125,140,196,0.15)" : "transparent",
                    border: `1px solid ${rateDir === id ? "#7d8cc4" : "rgba(212,168,90,0.2)"}`,
                    color: rateDir === id ? "#fce8b0" : "rgba(252,232,176,0.6)",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-5">
              {rateDir === "real2mkt" ? (
                <Field label="i (real)" value={iReal} onChange={setIReal} suffix="%" />
              ) : (
                <Field label="i_f (market)" value={iMkt} onChange={setIMkt} suffix="%" />
              )}
              <Field label="f (inflation)" value={f2} onChange={setF2} suffix="%" />
            </div>
          </Section>

          <Section title="Result">
            <Out label="i (real)" value={Number.isFinite(realR) ? fmt(realR * 100, 4) + " %" : "—"} accent={rateDir === "mkt2real" ? "#7d8cc4" : undefined} />
            <Out label="i_f (market)" value={Number.isFinite(mktR) ? fmt(mktR * 100, 4) + " %" : "—"} accent={rateDir === "real2mkt" ? "#7d8cc4" : undefined} />
            <p className="font-mono text-xs mt-4" style={{ color: "rgba(252,232,176,0.55)" }}>
              i_f = i + f + (i·f)
            </p>
          </Section>
        </div>
      )}
    </div>
  );
}
