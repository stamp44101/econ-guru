import { useState } from "react";
import { fmt, pow } from "../../lib/tvm";
import { Field, Out, Section, num } from "./shared";

export default function ScaleCalc() {
  const [oldCost, setOldCost] = useState("10000");
  const [oldCap, setOldCap] = useState("0.2");
  const [newCap, setNewCap] = useState("1.2");
  const [x, setX] = useState("0.54");
  const [oldI, setOldI] = useState("361.3");
  const [newI, setNewI] = useState("381.7");

  const oc = num(oldCost);
  const oCap = num(oldCap);
  const nCap = num(newCap);
  const xv = num(x, 0.6);
  const oi = num(oldI);
  const ni = num(newI);

  const R = oCap > 0 ? nCap / oCap : NaN;
  const Rx = Number.isFinite(R) && R > 0 ? pow(R, xv) : NaN;
  const fe = oi > 0 ? ni / oi : NaN;
  const newCost = oc * Rx * fe;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <Section title="Inputs">
        <div className="grid grid-cols-2 gap-5">
          <Field label="Old cost" value={oldCost} onChange={setOldCost} />
          <Field label="Old capacity" value={oldCap} onChange={setOldCap} />
          <Field label="New capacity" value={newCap} onChange={setNewCap} />
          <Field label="x (exponent)" value={x} onChange={setX} />
          <Field label="Old index" value={oldI} onChange={setOldI} />
          <Field label="New index" value={newI} onChange={setNewI} />
        </div>
      </Section>

      <Section title="Power-factor scaling">
        <Out label="R = newCap / oldCap" value={fmt(R, 4)} />
        <Out label="R^x" value={fmt(Rx, 4)} />
        <Out label="f_e = newIdx / oldIdx" value={fmt(fe, 4)} />
        <Out label="newCost = oldCost · R^x · f_e" value={fmt(newCost)} accent="#b4846c" />
      </Section>
    </div>
  );
}
