import { CHAPTERS } from "../data/chapters";
import { BookOpen, Calculator, GraduationCap } from "lucide-react";

const MODES = [
  { id: "review", label: "Review", icon: BookOpen },
  { id: "calc", label: "Calc", icon: Calculator },
  { id: "quiz", label: "Quiz", icon: GraduationCap },
];

export default function Sidebar({ mode, setMode, chapterId, setChapterId }) {
  return (
    <div
      className="px-6 py-8 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto"
      style={{
        background:
          "linear-gradient(180deg, rgba(10,6,18,0.95) 0%, rgba(21,16,30,0.95) 100%)",
      }}
    >
      <div className="mb-10">
        <div
          className="text-[11px] tracking-[0.3em] uppercase mb-2"
          style={{ color: "rgba(167,139,250,0.85)" }}
        >
          ▸ Econ · Guru
        </div>
        <h1
          className="text-3xl leading-tight"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 500,
            letterSpacing: "-0.04em",
            color: "#f5f0ff",
          }}
        >
          เศรษฐศาสตร์
          <br />
          <span style={{ color: "#fb923c" }}>วิศวกรรม</span>
        </h1>
        <p className="mt-2 text-sm thai" style={{ color: "rgba(245,240,255,0.78)" }}>
          ติวสอบ · 8 บท · offline
        </p>
      </div>

      <div className="mb-10">
        <div
          className="text-[10px] tracking-[0.3em] uppercase mb-3"
          style={{ color: "rgba(245,240,255,0.65)" }}
        >
          MODE
        </div>
        <div className="flex flex-col gap-1">
          {MODES.map(({ id, label, icon: Icon }) => {
            const active = mode === id;
            return (
              <button
                key={id}
                onClick={() => setMode(id)}
                className="flex items-center gap-3 px-3 py-2 text-left transition rounded"
                style={{
                  background: active ? "rgba(167,139,250,0.1)" : "transparent",
                  borderLeft: `2px solid ${active ? "#a78bfa" : "transparent"}`,
                  color: active ? "#f5f0ff" : "rgba(245,240,255,0.82)",
                }}
              >
                <Icon size={16} />
                <span className="text-base" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div
          className="text-[10px] tracking-[0.3em] uppercase mb-3 flex items-center justify-between"
          style={{ color: "rgba(245,240,255,0.65)" }}
        >
          <span>CHAPTERS</span>
          {chapterId && (
            <button
              onClick={() => setChapterId(null)}
              className="text-[9px] underline"
              style={{ color: "rgba(167,139,250,0.85)" }}
            >
              clear
            </button>
          )}
        </div>
        <div className="flex flex-col gap-1">
          {CHAPTERS.map((c) => {
            const Icon = c.icon;
            const active = chapterId === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setChapterId(c.id)}
                className="flex items-start gap-3 px-3 py-2 text-left transition rounded group"
                style={{
                  background: active ? "rgba(167,139,250,0.06)" : "transparent",
                  borderLeft: `2px solid ${active ? c.color : "transparent"}`,
                }}
              >
                <span
                  className="font-mono text-xs tabular-nums mt-1"
                  style={{ color: active ? c.color : "rgba(245,240,255,0.6)" }}
                >
                  {c.num}
                </span>
                <div className="flex-1 min-w-0">
                  <div
                    className="text-[15px] leading-tight"
                    style={{
                      color: active ? "#f5f0ff" : "rgba(245,240,255,0.9)",
                      fontFamily: "'Cormorant Garamond', serif",
                    }}
                  >
                    {c.title}
                  </div>
                  <div
                    className="text-xs mt-0.5 thai truncate"
                    style={{ color: active ? "rgba(245,240,255,0.82)" : "rgba(245,240,255,0.6)" }}
                  >
                    {c.titleTh}
                  </div>
                </div>
                <Icon size={14} style={{ color: active ? c.color : "rgba(245,240,255,0.5)" }} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
