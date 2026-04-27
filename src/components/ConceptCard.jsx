import { useState } from "react";
import { ChevronRight } from "lucide-react";

export default function ConceptCard({ title, body, color }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border-l-2 pl-5 py-3 transition"
      style={{ borderColor: open ? color : "rgba(212,168,90,0.2)" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 text-left"
      >
        <ChevronRight
          size={14}
          className="transition shrink-0"
          style={{
            transform: open ? "rotate(90deg)" : "rotate(0deg)",
            color: open ? color : "rgba(252,232,176,0.5)",
          }}
        />
        <span
          className="text-lg flex-1"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: open ? "#fce8b0" : "rgba(252,232,176,0.85)",
          }}
        >
          {title}
        </span>
      </button>
      {open && (
        <div
          className="mt-3 ml-7 pr-4 thai whitespace-pre-wrap text-[15px] leading-relaxed"
          style={{ color: "rgba(252,232,176,0.75)" }}
        >
          {body}
        </div>
      )}
    </div>
  );
}
