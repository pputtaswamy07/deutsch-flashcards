import type { Verb } from "../data/verbs";
import "./Flashcard.css";

interface FlashcardProps {
  verb: Verb;
  flipped: boolean;
  onFlip: () => void;
}

export default function Flashcard({ verb, flipped, onFlip }: FlashcardProps) {
  return (
    <div className="card-scene" onClick={onFlip}>
      <div className={`card ${flipped ? "flipped" : ""}`}>
        <div className="card-face card-front">
          <span className={`level-badge level-${verb.level}`}>{verb.level}</span>
          <div className="infinitive">{verb.infinitive}</div>
          <div className="hint">tap to reveal</div>
        </div>
        <div className="card-face card-back">
          <span className={`level-badge level-${verb.level}`}>{verb.level}</span>
          <div className="row">
            <span className="label">Infinitiv</span>
            <span className="value">{verb.infinitive}</span>
          </div>
          <div className="row">
            <span className="label">Präteritum</span>
            <span className="value">{verb.praeteritum}</span>
          </div>
          <div className="row">
            <span className="label">Partizip II</span>
            <span className="value">
              {verb.auxiliary} {verb.partizipPerfekt}
            </span>
          </div>
          <div className="row english">
            <span className="label">English</span>
            <span className="value">{verb.english}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
