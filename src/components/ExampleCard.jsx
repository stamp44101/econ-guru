import { useState } from "react";
import { ChevronRight } from "lucide-react";

export default function ExampleCard({ q, steps, color, idx }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="p-5 border rounded-sm"
      style={{
        borderColor: "rgba(167,139,250,0.15)",
        background: "rgba(10,6,18,0.5)",
      }}
    >
      <div className="flex items-start gap-3">
        <span
          className="font-mono text-xs tabular-nums mt-1"
          style={{ color }}
        >
          EX·{String(idx + 1).padStart(2, "0")}
        </span>
        <p
          className="flex-1 thai whitespace-pre-wrap text-[15px] leading-relaxed"
          style={{ color: "rgba(245,240,255,0.85)" }}
        >
          {q}
        </p>
      </div>
      <button
        onClick={() => setOpen(!open)}
        className="mt-4 flex items-center gap-2 text-sm thai"
        style={{ color: open ? color : "rgba(167,139,250,0.9)" }}
      >
        <ChevronRight
          size={12}
          style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform .2s" }}
        />
        {open ? "ซ่อนเฉลย" : "ดูเฉลย"}
      </button>
      {open && (
        <ol className="mt-4 ml-2 space-y-2">
          {steps.map((s, i) => (
            <li
              key={i}
              className="flex gap-3 font-mono text-[13px] leading-relaxed"
              style={{ color: "rgba(245,240,255,0.92)" }}
            >
              <span className="tabular-nums" style={{ color: "rgba(167,139,250,0.78)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 whitespace-pre-wrap">{s}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
