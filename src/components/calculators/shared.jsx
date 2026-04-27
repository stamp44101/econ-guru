export function Field({ label, value, onChange, suffix, step = "any", placeholder }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] tracking-[0.2em] uppercase" style={{ color: "rgba(167,139,250,0.85)" }}>
        {label}
      </span>
      <div className="flex items-center border-b" style={{ borderColor: "rgba(167,139,250,0.2)" }}>
        <input
          type="number"
          step={step}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="bg-transparent outline-none py-2 w-full font-mono text-[15px]"
          style={{ color: "#f5f0ff" }}
        />
        {suffix && (
          <span className="font-mono text-xs ml-2" style={{ color: "rgba(167,139,250,0.78)" }}>
            {suffix}
          </span>
        )}
      </div>
    </label>
  );
}

export function Out({ label, value, mono = true, accent }) {
  return (
    <div className="flex justify-between items-baseline border-b py-2.5" style={{ borderColor: "rgba(167,139,250,0.08)" }}>
      <span className="text-[12px] thai" style={{ color: "rgba(245,240,255,0.82)" }}>
        {label}
      </span>
      <span
        className={`${mono ? "font-mono" : ""} text-[14px] tabular-nums`}
        style={{ color: accent || "#f5f0ff" }}
      >
        {value}
      </span>
    </div>
  );
}

export function Section({ title, color, children }) {
  return (
    <div>
      <div
        className="text-[10px] tracking-[0.3em] uppercase mb-3"
        style={{ color: color || "rgba(167,139,250,0.82)" }}
      >
        ▸ {title}
      </div>
      {children}
    </div>
  );
}

export function num(v, fb = NaN) {
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : fb;
}
