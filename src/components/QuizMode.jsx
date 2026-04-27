import { useMemo, useState } from "react";
import { CHAPTERS } from "../data/chapters";
import { QUIZ } from "../data/quiz";
import { Check, X, RotateCw } from "lucide-react";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function QuizMode({ chapter }) {
  const pool = useMemo(
    () => (chapter ? QUIZ.filter((q) => q.ch === chapter.id) : QUIZ),
    [chapter]
  );

  const [seed, setSeed] = useState(0);
  const order = useMemo(() => shuffle(pool), [pool, seed]);

  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const reset = () => {
    setSeed((s) => s + 1);
    setIdx(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  };

  if (pool.length === 0) {
    return (
      <p className="thai mt-6" style={{ color: "rgba(252,232,176,0.6)" }}>
        บทนี้ยังไม่มีคำถามในธนาคารคำถาม
      </p>
    );
  }

  if (done) {
    const pctScore = (score / order.length) * 100;
    const grade =
      pctScore >= 90 ? { l: "A", c: "#7fb069", t: "เก่งมาก!" }
      : pctScore >= 75 ? { l: "B", c: "#d4a85a", t: "ดี — ทบทวน traps อีกนิด." }
      : pctScore >= 60 ? { l: "C", c: "#e07a5f", t: "ผ่าน แต่อ่านเพิ่มก่อนสอบ." }
      : { l: "F", c: "#c1666b", t: "ต้องอ่านเพิ่ม — กลับไป Review mode." };

    return (
      <div className="mt-10 max-w-md">
        <div className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: "rgba(212,168,90,0.5)" }}>
          ▸ ผลคะแนน
        </div>
        <div
          className="text-7xl tabular-nums leading-none mb-4"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: grade.c, fontWeight: 500 }}
        >
          {grade.l}
        </div>
        <div className="text-xl mb-1" style={{ color: "#fce8b0" }}>
          {score} / {order.length}
        </div>
        <div className="text-sm mb-6" style={{ color: "rgba(252,232,176,0.55)" }}>
          {pctScore.toFixed(1)}%
        </div>
        <p className="thai mb-8" style={{ color: "rgba(252,232,176,0.75)" }}>
          {grade.t}
        </p>
        <button
          onClick={reset}
          className="flex items-center gap-2 px-5 py-3 transition rounded"
          style={{
            background: "rgba(212,168,90,0.1)",
            border: "1px solid #d4a85a",
            color: "#fce8b0",
          }}
        >
          <RotateCw size={14} />
          <span className="thai">ทำใหม่</span>
        </button>
      </div>
    );
  }

  const q = order[idx];
  const ch = CHAPTERS.find((c) => c.id === q.ch);
  const correct = q.a;
  const showFeedback = picked !== null;
  const isRight = picked === correct;

  const next = () => {
    if (idx + 1 >= order.length) {
      setDone(true);
    } else {
      setIdx(idx + 1);
      setPicked(null);
    }
  };

  const choose = (i) => {
    if (showFeedback) return;
    setPicked(i);
    if (i === correct) setScore((s) => s + 1);
  };

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: "rgba(212,168,90,0.55)" }}>
        <span>
          ▸ Question {idx + 1} / {order.length}
        </span>
        <span>Score · {score}</span>
      </div>
      <div className="h-px mb-6" style={{ background: "rgba(212,168,90,0.15)" }}>
        <div
          className="h-full transition-all"
          style={{
            width: `${((idx + (showFeedback ? 1 : 0)) / order.length) * 100}%`,
            background: "#d4a85a",
          }}
        />
      </div>

      <div
        className="text-[11px] tracking-[0.2em] uppercase mb-4"
        style={{ color: ch?.color || "rgba(212,168,90,0.6)" }}
      >
        {ch?.num} · {ch?.title}
      </div>

      <p
        className="text-2xl mb-8 thai leading-snug"
        style={{ fontFamily: "'Cormorant Garamond', 'Sarabun', serif", color: "#fce8b0" }}
      >
        {q.q}
      </p>

      <div className="space-y-2.5">
        {q.opts.map((o, i) => {
          let bg = "transparent";
          let bd = "rgba(212,168,90,0.2)";
          let col = "rgba(252,232,176,0.85)";
          let icon = null;
          if (showFeedback) {
            if (i === correct) {
              bg = "rgba(127,176,105,0.1)";
              bd = "#7fb069";
              col = "#fce8b0";
              icon = <Check size={14} style={{ color: "#7fb069" }} />;
            } else if (i === picked && picked !== correct) {
              bg = "rgba(193,102,107,0.1)";
              bd = "#c1666b";
              col = "rgba(252,232,176,0.7)";
              icon = <X size={14} style={{ color: "#c1666b" }} />;
            }
          }
          return (
            <button
              key={i}
              onClick={() => choose(i)}
              disabled={showFeedback}
              className="w-full flex items-center gap-4 px-4 py-3 text-left transition rounded"
              style={{
                background: bg,
                border: `1px solid ${bd}`,
                color: col,
                cursor: showFeedback ? "default" : "pointer",
              }}
            >
              <span
                className="font-mono text-xs tabular-nums"
                style={{ color: showFeedback && i === correct ? "#7fb069" : "rgba(212,168,90,0.55)" }}
              >
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1 thai">{o}</span>
              {icon}
            </button>
          );
        })}
      </div>

      {showFeedback && (
        <div
          className="mt-6 p-4 border-l-2 thai text-[15px] leading-relaxed"
          style={{
            borderColor: isRight ? "#7fb069" : "#c1666b",
            background: isRight ? "rgba(127,176,105,0.06)" : "rgba(193,102,107,0.06)",
            color: "rgba(252,232,176,0.85)",
          }}
        >
          <div
            className="text-[10px] tracking-[0.3em] uppercase mb-2"
            style={{ color: isRight ? "#7fb069" : "#c1666b" }}
          >
            ▸ {isRight ? "ถูกต้อง" : "เฉลย"}
          </div>
          {q.why}
        </div>
      )}

      {showFeedback && (
        <button
          onClick={next}
          className="mt-6 px-5 py-2.5 text-[11px] tracking-[0.2em] uppercase transition rounded"
          style={{
            background: "rgba(212,168,90,0.1)",
            border: "1px solid #d4a85a",
            color: "#fce8b0",
          }}
        >
          {idx + 1 >= order.length ? "ดูผลคะแนน" : "ข้อต่อไป →"}
        </button>
      )}

      <div className="h-20" />
    </div>
  );
}
