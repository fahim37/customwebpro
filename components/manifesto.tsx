import type { CSSProperties } from "react";
import "./manifesto.css";

const lines = [
  ["Good", "design"],
  ["gets", "noticed."],
  ["Great", "experiences"],
  ["get", "remembered."],
];

export default function Manifesto() {
  return (
    <section
      className="manifesto-section"
      data-scroll-section
      aria-labelledby="manifesto-title"
    >
      <div className="manifesto-sticky">
        <div className="page-container manifesto-container">
          <div className="manifesto-topline" aria-hidden="true">
            <span>THOUGHTFUL BY DESIGN.</span>
            <span>BUILT TO STAY WITH YOU.</span>
          </div>

          <div className="manifesto-stage">
            <p className="manifesto-label">
              <span /> A SIMPLE BELIEF
            </p>
            <h2
              className="manifesto-title"
              id="manifesto-title"
              aria-label="Good design gets noticed. Great experiences get remembered."
            >
              {lines.map((line, lineIndex) => (
                <span className="manifesto-line" key={lineIndex}>
                  {line.map((word, wordIndex) => (
                    <span
                      className={`manifesto-word ${lineIndex > 1 ? "manifesto-word-blue" : ""}`}
                      style={
                        {
                          "--word-index": lineIndex * 2 + wordIndex,
                        } as CSSProperties
                      }
                      key={word}
                    >
                      {word}
                      {wordIndex === 0 ? " " : ""}
                    </span>
                  ))}
                  {lineIndex < lines.length - 1 ? " " : ""}
                </span>
              ))}
            </h2>
            <div className="manifesto-mark" aria-hidden="true">
              <svg viewBox="0 0 100 100" fill="none">
                <path d="M50 6v88M12 28l76 44M12 72l76-44" />
              </svg>
              <span>MAKE IT MATTER.</span>
            </div>
          </div>

          <div className="manifesto-bottom">
            <div className="manifesto-progress" aria-hidden="true">
              <span className="manifesto-progress-caption">
                THE DETAILS MAKE THE DIFFERENCE.
              </span>
              <div className="manifesto-progress-rail">
                <span />
              </div>
              <div className="manifesto-progress-ends">
                <span>IDEA</span>
                <span>IMPACT</span>
              </div>
            </div>
            <p>
              A little more thought. A lot more care.
              <br />
              Every detail, working toward something that matters.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
