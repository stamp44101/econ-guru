import { useState } from "react";
import { CHAPTERS } from "./data/chapters";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ReviewMode from "./components/ReviewMode";
import CalcMode from "./components/CalcMode";
import QuizMode from "./components/QuizMode";

const styles = {
  root: {
    background:
      "radial-gradient(ellipse at top left, #2a1f17 0%, #1a1410 40%, #0f0c0a 100%)",
    color: "#fce8b0",
    fontFamily: "'Cormorant Garamond', 'Sarabun', ui-serif, Georgia, serif",
    minHeight: "100vh",
  },
  paper: {
    backgroundImage: `
      radial-gradient(circle at 20% 30%, rgba(212,168,90,0.04) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(127,176,105,0.03) 0%, transparent 50%)
    `,
  },
};

export default function App() {
  const [mode, setMode] = useState("review");
  const [chapterId, setChapterId] = useState(null);

  const chapter = CHAPTERS.find((c) => c.id === chapterId) || null;

  return (
    <div style={styles.root}>
      <div style={styles.paper} className="min-h-screen">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0">
          <aside className="lg:col-span-3 lg:min-h-screen border-b lg:border-b-0 lg:border-r border-amber/10" style={{ borderColor: "rgba(212,168,90,0.1)" }}>
            <Sidebar
              mode={mode}
              setMode={setMode}
              chapterId={chapterId}
              setChapterId={setChapterId}
            />
          </aside>
          <main className="lg:col-span-9 px-6 sm:px-10 py-8">
            <Header chapter={chapter} mode={mode} />
            <div className="mt-8">
              {mode === "review" && <ReviewMode chapter={chapter} setChapterId={setChapterId} />}
              {mode === "calc" && <CalcMode chapter={chapter} />}
              {mode === "quiz" && <QuizMode chapter={chapter} />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
