import { AlertTriangle } from "lucide-react";
import { CHAPTERS } from "../data/chapters";
import ConceptCard from "./ConceptCard";
import ExampleCard from "./ExampleCard";

function SectionLabel({ children, color }) {
  return (
    <div
      className="text-[11px] tracking-[0.3em] uppercase mb-4 mt-10"
      style={{ color: color || "rgba(212,168,90,0.82)" }}
    >
      ▸ {children}
    </div>
  );
}

function Welcome({ setChapterId }) {
  return (
    <div>
      <h1
        className="text-3xl sm:text-4xl mt-6 mb-3 thai"
        style={{
          fontFamily: "'Cormorant Garamond', 'Sarabun', serif",
          fontWeight: 500,
          color: "#fce8b0",
          letterSpacing: "-0.02em",
        }}
      >
        สวัสดีครับ พร้อมติวสอบแล้วหรือยัง?
      </h1>
      <p
        className="text-lg thai max-w-2xl"
        style={{ color: "rgba(252,232,176,0.9)" }}
      >
        เลือกบทจากด้านซ้ายเพื่อเริ่มทบทวน หรือลองเปิดโหมด <span style={{ color: "#d4a85a" }}>Calc</span> เพื่อใช้เครื่องคิด หรือ <span style={{ color: "#d4a85a" }}>Quiz</span> เพื่อทดสอบความเข้าใจ
      </p>

      <SectionLabel>8 chapters</SectionLabel>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ background: "rgba(212,168,90,0.1)" }}>
        {CHAPTERS.map((c) => {
          const Icon = c.icon;
          return (
            <button
              key={c.id}
              onClick={() => setChapterId(c.id)}
              className="text-left p-5 transition hover:bg-black/30"
              style={{ background: "rgba(15,12,10,0.7)" }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="font-mono text-2xl tabular-nums shrink-0"
                  style={{ color: c.color, fontWeight: 300 }}
                >
                  {c.num}
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    className="text-xl leading-tight"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      color: "#fce8b0",
                    }}
                  >
                    {c.title}
                  </div>
                  <div className="text-sm mt-1 thai" style={{ color: "rgba(252,232,176,0.82)" }}>
                    {c.titleTh}
                  </div>
                </div>
                <Icon size={16} style={{ color: c.color, opacity: 0.7 }} />
              </div>
            </button>
          );
        })}
      </div>

      <div
        className="mt-10 p-5 border-l-2 thai"
        style={{ borderColor: "#d4a85a", background: "rgba(212,168,90,0.05)", color: "rgba(252,232,176,0.8)" }}
      >
        <div className="text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: "rgba(212,168,90,0.9)" }}>
          ▸ เคล็ดลับการใช้
        </div>
        <ul className="text-[15px] space-y-1.5 leading-relaxed">
          <li>• อ่านในโหมด <span style={{ color: "#d4a85a" }}>Review</span> ก่อนเสมอ — concept, formula, traps, examples.</li>
          <li>• ใช้โหมด <span style={{ color: "#d4a85a" }}>Calc</span> ฝึกทำโจทย์ตัวเลขจริง.</li>
          <li>• สอบปลายภาคก่อนวันสอบ ใช้ <span style={{ color: "#d4a85a" }}>Quiz</span> สลับสุ่ม 30 ข้อทุกบท.</li>
        </ul>
      </div>
    </div>
  );
}

export default function ReviewMode({ chapter, setChapterId }) {
  if (!chapter) return <Welcome setChapterId={setChapterId} />;

  const c = chapter;
  return (
    <div>
      <p
        className="text-[18px] leading-relaxed thai mt-4"
        style={{ color: "rgba(252,232,176,0.85)" }}
      >
        {c.overview}
      </p>

      <SectionLabel>Concepts</SectionLabel>
      <div className="space-y-2">
        {c.concepts.map((x, i) => (
          <ConceptCard key={i} {...x} color={c.color} />
        ))}
      </div>

      <SectionLabel>Formula reference</SectionLabel>
      <div
        className="p-5 border-l-2 font-mono text-[13px] leading-loose space-y-1.5 overflow-x-auto"
        style={{
          borderColor: c.color,
          background: "rgba(15,12,10,0.5)",
          color: "rgba(252,232,176,0.85)",
        }}
      >
        {c.formulas.map((f, i) => (
          <div key={i} className="whitespace-pre">{f}</div>
        ))}
      </div>

      <SectionLabel color="rgba(225,90,90,0.6)">ข้อสอบชอบหลอกตรงนี้</SectionLabel>
      <div className="space-y-2">
        {c.traps.map((t, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-4 border-l-2"
            style={{
              borderColor: "rgba(225,90,90,0.6)",
              background: "rgba(225,90,90,0.05)",
            }}
          >
            <AlertTriangle size={14} className="mt-1 shrink-0" style={{ color: "#e07a5f" }} />
            <p className="thai text-[15px] leading-relaxed" style={{ color: "rgba(252,232,176,0.85)" }}>
              {t}
            </p>
          </div>
        ))}
      </div>

      <SectionLabel>Worked examples</SectionLabel>
      <div className="space-y-3">
        {c.examples.map((e, i) => (
          <ExampleCard key={i} {...e} color={c.color} idx={i} />
        ))}
      </div>

      <div className="h-20" />
    </div>
  );
}
