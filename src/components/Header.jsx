export default function Header({ chapter, mode }) {
  const modeLabel =
    mode === "review" ? "Review" : mode === "calc" ? "Calculator" : "Quiz";

  return (
    <div className="border-b pb-6" style={{ borderColor: "rgba(212,168,90,0.15)" }}>
      <div
        className="text-[11px] tracking-[0.3em] uppercase mb-3"
        style={{ color: "rgba(212,168,90,0.55)" }}
      >
        {chapter ? (
          <>
            ▸ Chapter ·{" "}
            <span className="font-mono tabular-nums" style={{ color: chapter.color }}>
              {chapter.num}
            </span>{" "}
            · {modeLabel}
          </>
        ) : (
          <>▸ All chapters · {modeLabel}</>
        )}
      </div>
      <h2
        className="text-4xl sm:text-5xl leading-none"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 500,
          letterSpacing: "-0.02em",
          color: "#fce8b0",
        }}
      >
        {chapter ? chapter.title : "Econ Guru"}
      </h2>
      {chapter && (
        <p
          className="mt-2 text-lg thai"
          style={{ color: "rgba(252,232,176,0.55)" }}
        >
          {chapter.titleTh}
        </p>
      )}
    </div>
  );
}
