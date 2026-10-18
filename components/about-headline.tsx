"use client";

import { useEffect, useRef, useState } from "react";

const firstLine = "Small studio.";
const secondPrefix = "Big on ";
const phrases = ["possibility.", "bold ideas.", "real impact."];
type Stage = "first" | "prefix" | "phrase" | "hold" | "delete";
type TypedText = { first: string; prefix: string; phrase: string; stage: Stage };

export default function AboutHeadline() {
  const heading = useRef<HTMLHeadingElement>(null);
  const [text, setText] = useState<TypedText>({ first: "", prefix: "", phrase: "", stage: "first" });

  useEffect(() => {
    const element = heading.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const page = element.closest("main")?.parentElement || document.body;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let dueAt = 0;
    let remaining = 180;
    let inView = false;
    let started = false;
    let stopped = false;
    let stage: Stage = "first";
    let firstCount = 0;
    let prefixCount = 0;
    let phraseCount = 0;
    let phraseIndex = 0;

    const canRun = () => inView && !document.hidden && !reduced.matches && !element.closest(".motion-paused") && !stopped;
    const halt = () => {
      if (timer !== undefined) {
        remaining = Math.max(0, dueAt - performance.now());
        clearTimeout(timer);
        timer = undefined;
      }
    };
    const schedule = () => {
      if (timer !== undefined || !canRun()) return;
      dueAt = performance.now() + remaining;
      timer = setTimeout(tick, remaining);
    };
    const tick = () => {
      timer = undefined;
      if (!canRun()) return;
      remaining = 75;
      if (stage === "first") {
        firstCount++;
        if (firstCount === firstLine.length) { stage = "prefix"; remaining = 240; }
      } else if (stage === "prefix") {
        prefixCount++;
        if (prefixCount === secondPrefix.length) stage = "phrase";
      } else if (stage === "phrase") {
        phraseCount++;
        if (phraseCount === phrases[phraseIndex].length) { stage = "hold"; remaining = 2000; }
      } else if (stage === "hold") {
        stage = "delete";
        phraseCount--;
        remaining = 40;
      } else {
        phraseCount--;
        remaining = 40;
        if (phraseCount <= 0) {
          phraseCount = 0;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          stage = "phrase";
          remaining = 220;
        }
      }
      setText({
        first: firstLine.slice(0, firstCount),
        prefix: secondPrefix.slice(0, prefixCount),
        phrase: phrases[phraseIndex].slice(0, phraseCount),
        stage,
      });
      schedule();
    };
    const sync = () => {
      if (reduced.matches) {
        halt();
        element.removeAttribute("data-typing");
        return;
      }
      if (inView && canRun()) started = true;
      if (!started) return;
      if (!canRun() && firstCount === 0) {
        halt();
        element.removeAttribute("data-typing");
        return;
      }
      element.setAttribute("data-typing", canRun() ? "active" : "paused");
      if (canRun()) schedule();
      else halt();
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    }, { threshold: 0.1 });
    const pauseObserver = new MutationObserver(sync);
    observer.observe(element);
    pauseObserver.observe(page, { attributes: true, attributeFilter: ["class"] });
    reduced.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);

    return () => {
      stopped = true;
      halt();
      observer.disconnect();
      pauseObserver.disconnect();
      reduced.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      element.removeAttribute("data-typing");
    };
  }, []);

  return (
    <h2 ref={heading} className="about-type-heading">
      <span className="about-type-fallback">
        <span className="about-type-line">Small studio.</span>{" "}
        <span className="about-type-line">Big on <span className="serif">possibility.</span></span>
      </span>
      <span className="about-type-sizer" aria-hidden="true">
        {phrases.map((phrase) => <span key={phrase}><span className="about-type-line">Small studio.</span><span className="about-type-line">Big on <span className="serif">{phrase}</span><span className="about-type-caret about-type-caret-sizer" /></span></span>)}
      </span>
      <span className="about-type-animated" aria-hidden="true">
        <span className="about-type-line">{text.first}{text.stage === "first" && <span className="about-type-caret" />}</span>
        <span className="about-type-line">{text.prefix}<span className="serif">{text.phrase}</span>{text.stage !== "first" && <span className="about-type-caret" />}</span>
      </span>
    </h2>
  );
}
