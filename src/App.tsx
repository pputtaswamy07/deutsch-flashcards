import { useMemo, useState } from "react";
import { verbs, type Level } from "./data/verbs";
import Flashcard from "./components/Flashcard";
import "./App.css";

type LevelFilter = Level | "ALL";

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const LEVELS: LevelFilter[] = ["ALL", "A1", "A2", "B1"];

function App() {
  const [levelFilter, setLevelFilter] = useState<LevelFilter>("ALL");
  const [order, setOrder] = useState(() => shuffle(verbs.map((_, i) => i)));
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(0);
  const [review, setReview] = useState(0);

  const deck = useMemo(() => {
    const filteredIndices = order.filter(
      (i) => levelFilter === "ALL" || verbs[i].level === levelFilter
    );
    return filteredIndices;
  }, [order, levelFilter]);

  const currentVerb = deck.length > 0 ? verbs[deck[index % deck.length]] : null;

  function goNext() {
    setFlipped(false);
    setIndex((i) => (i + 1) % deck.length);
  }

  function handleLevelChange(level: LevelFilter) {
    setLevelFilter(level);
    setIndex(0);
    setFlipped(false);
  }

  function handleShuffle() {
    setOrder(shuffle(verbs.map((_, i) => i)));
    setIndex(0);
    setFlipped(false);
    setKnown(0);
    setReview(0);
  }

  function markKnown() {
    setKnown((k) => k + 1);
    goNext();
  }

  function markReview() {
    setReview((r) => r + 1);
    goNext();
  }

  const seen = known + review;

  return (
    <div className="app">
      <header>
        <h1>Deutsch Vokabeltrainer</h1>
        <p className="subtitle">Verbs A1–B1 · Infinitiv · Präteritum · Partizip Perfekt</p>
      </header>

      <div className="controls">
        <div className="level-filter">
          {LEVELS.map((lvl) => (
            <button
              key={lvl}
              className={levelFilter === lvl ? "active" : ""}
              onClick={() => handleLevelChange(lvl)}
            >
              {lvl}
            </button>
          ))}
        </div>
        <button className="shuffle-btn" onClick={handleShuffle}>
          🔀 Shuffle
        </button>
      </div>

      <div className="progress">
        Card {deck.length > 0 ? (index % deck.length) + 1 : 0} / {deck.length}
        <span className="score">
          ✓ {known} · ↻ {review} · seen {seen}
        </span>
      </div>

      {currentVerb ? (
        <>
          <Flashcard
            verb={currentVerb}
            flipped={flipped}
            onFlip={() => setFlipped((f) => !f)}
          />

          <div className="actions">
            <button className="btn-review" onClick={markReview} disabled={!flipped}>
              Review again
            </button>
            <button className="btn-known" onClick={markKnown} disabled={!flipped}>
              I knew it
            </button>
          </div>
          <div className="nav">
            <button onClick={goNext}>Skip →</button>
          </div>
        </>
      ) : (
        <p>No verbs match this filter.</p>
      )}
    </div>
  );
}

export default App;
