"use client";

import { useEffect, useRef } from "react";
import "../app/scroll-effects.css";

const revealGroups =
  ".project-grid, .pricing-grid, .process-grid, .faq-list, .section-heading, .about-copy, .about-stats, .process-heading, .contact-main, .services-layout, .service-list, .review-heading";
const clamp = (value: number, minimum = 0, maximum = 1) =>
  Math.min(maximum, Math.max(minimum, value));
const numberOr = (value: string | undefined, fallback: number) => {
  const parsed = Number.parseFloat(value || "");
  return Number.isFinite(parsed) ? parsed : fallback;
};

export default function Motion() {
  const indicator = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const page = indicator.current?.parentElement;
    if (!page) return;
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const previousMode = root.getAttribute("data-scroll-motion");
    const pending = new Set<HTMLElement>();
    const registered = new Set<HTMLElement>();
    let sections: HTMLElement[] = [];
    let parallax: HTMLElement[] = [];
    let rotations: HTMLElement[] = [];
    let frame = 0;
    let refreshNeeded = true;
    let disposed = false;
    let disabled = false;

    const setProperty = (
      element: HTMLElement,
      property: string,
      value: string,
    ) => {
      if (element.style.getPropertyValue(property) !== value)
        element.style.setProperty(property, value);
    };

    const reveal = (element: HTMLElement) => {
      element.classList.add("is-visible");
      pending.delete(element);
      intersection?.unobserve(element);
    };

    const intersection =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) reveal(entry.target as HTMLElement);
              });
            },
            { threshold: 0, rootMargin: "0px 0px -6% 0px" },
          );

    const register = (element: HTMLElement, index = 0) => {
      if (element.matches(revealGroups)) {
        element.classList.remove("will-reveal");
        Array.from(element.children).forEach((child, childIndex) => {
          if (
            child instanceof HTMLElement &&
            !child.matches("dialog, .process-progress")
          )
            register(child, childIndex);
        });
        return;
      }
      if (registered.has(element)) return;
      registered.add(element);
      const rect = element.getBoundingClientRect();
      const focused = element.contains(document.activeElement);
      // Only enhance content that has not reached the viewport. The page is visible without JS.
      if (
        disabled ||
        !intersection ||
        focused ||
        rect.top < window.innerHeight ||
        rect.height === 0 ||
        element.closest("dialog")
      ) {
        reveal(element);
        return;
      }
      const delay = clamp(
        numberOr(element.dataset.revealDelay, Math.min(index, 4) * 75),
        0,
        350,
      );
      setProperty(element, "--reveal-delay", `${delay}ms`);
      element.classList.add("will-reveal", "motion-reveal-item");
      pending.add(element);
      intersection.observe(element);
    };

    const refresh = () => {
      sections = Array.from(
        page.querySelectorAll<HTMLElement>("[data-scroll-section]"),
      );
      parallax = Array.from(
        page.querySelectorAll<HTMLElement>("[data-parallax]"),
      );
      rotations = Array.from(
        page.querySelectorAll<HTMLElement>("[data-scroll-rotate]"),
      );
      page
        .querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach((element) => register(element));
      registered.forEach((element) => {
        if (!element.isConnected) {
          intersection?.unobserve(element);
          registered.delete(element);
          pending.delete(element);
        }
      });
      refreshNeeded = false;
    };

    const update = () => {
      frame = 0;
      if (disposed || document.hidden) return;
      if (refreshNeeded) refresh();
      const height = window.innerHeight;
      const total = root.scrollHeight - height;
      const progress = total > 0 ? clamp(window.scrollY / total) : 0;
      const measurements = new Map<HTMLElement, DOMRect>();
      const measure = (element: HTMLElement) => {
        let rect = measurements.get(element);
        if (!rect) {
          rect = element.getBoundingClientRect();
          measurements.set(element, rect);
        }
        return rect;
      };

      // Stable parent anchors avoid feedback from measuring an already translated layer.
      const sectionValues = disabled
        ? []
        : sections.map((element) => {
            const rect = measure(element);
            return {
              element,
              value: clamp(
                (height - rect.top) / Math.max(1, height + rect.height),
              ),
            };
          });
      const parallaxValues = disabled
        ? []
        : parallax.map((element) => {
            const rect = measure(element.parentElement || element);
            const limit = clamp(
              numberOr(
                element.dataset.parallaxMax,
                window.innerWidth <= 600 ? 42 : 72,
              ),
              0,
              160,
            );
            const speed = clamp(
              numberOr(element.dataset.parallax, 0.06),
              -0.3,
              0.3,
            );
            const value = clamp(
              (rect.top + rect.height / 2 - height / 2) * speed,
              -limit,
              limit,
            );
            return { element, value };
          });
      const rotationValues = disabled
        ? []
        : rotations.map((element) => {
            const rect = measure(element.parentElement || element);
            const passage = clamp(
              (height - rect.top) / Math.max(1, height + rect.height),
            );
            const range = clamp(
              numberOr(element.dataset.scrollRotate, 12),
              -90,
              90,
            );
            return { element, value: (passage - 0.5) * range };
          });
      const entering = Array.from(pending).filter(
        (element) => measure(element).top < height * 0.95,
      );

      // Keep geometry reads above this point and perform all style writes together.
      setProperty(root, "--scroll", String(window.scrollY));
      setProperty(root, "--progress", `${(progress * 100).toFixed(3)}%`);
      sectionValues.forEach(({ element, value }) =>
        setProperty(element, "--section-progress", value.toFixed(4)),
      );
      parallaxValues.forEach(({ element, value }) =>
        setProperty(element, "--parallax", `${value.toFixed(2)}px`),
      );
      rotationValues.forEach(({ element, value }) =>
        setProperty(element, "--scroll-rotate", `${value.toFixed(3)}deg`),
      );
      entering.forEach(reveal);
    };

    const schedule = () => {
      if (!frame && !disposed && !document.hidden)
        frame = requestAnimationFrame(update);
    };

    const syncMode = () => {
      disabled =
        reduced.matches ||
        page.classList.contains("motion-paused") ||
        Boolean(page.closest(".motion-paused"));
      root.setAttribute(
        "data-scroll-motion",
        reduced.matches ? "reduced" : disabled ? "paused" : "active",
      );
      if (disabled) Array.from(pending).forEach(reveal);
      // Reduced motion returns layers to their natural layout; pause preserves the current frame.
      if (reduced.matches) {
        parallax.forEach((element) =>
          setProperty(element, "--parallax", "0px"),
        );
        rotations.forEach((element) =>
          setProperty(element, "--scroll-rotate", "0deg"),
        );
        sections.forEach((element) =>
          setProperty(element, "--section-progress", "1"),
        );
      }
      schedule();
    };

    const onFocus = (event: FocusEvent) => {
      if (!(event.target instanceof Node)) return;
      const target = event.target;
      pending.forEach((element) => {
        if (element.contains(target)) reveal(element);
      });
    };
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else schedule();
    };
    const mutations = new MutationObserver(() => {
      refreshNeeded = true;
      schedule();
    });
    const pauseObserver = new MutationObserver(syncMode);
    const resizing =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(schedule);

    syncMode();
    refresh();
    update();
    mutations.observe(page, { childList: true, subtree: true });
    pauseObserver.observe(page, {
      attributes: true,
      attributeFilter: ["class"],
    });
    resizing?.observe(page);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    reduced.addEventListener("change", syncMode);
    page.addEventListener("focusin", onFocus);
    page.addEventListener("load", schedule, true);
    document.addEventListener("visibilitychange", onVisibility);
    document.fonts?.ready.then(() => {
      if (!disposed) schedule();
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      intersection?.disconnect();
      mutations.disconnect();
      pauseObserver.disconnect();
      resizing?.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduced.removeEventListener("change", syncMode);
      page.removeEventListener("focusin", onFocus);
      page.removeEventListener("load", schedule, true);
      document.removeEventListener("visibilitychange", onVisibility);
      registered.forEach((element) => {
        element.classList.remove("will-reveal", "motion-reveal-item");
        element.style.removeProperty("--reveal-delay");
      });
      parallax.forEach((element) => element.style.removeProperty("--parallax"));
      rotations.forEach((element) =>
        element.style.removeProperty("--scroll-rotate"),
      );
      sections.forEach((element) =>
        element.style.removeProperty("--section-progress"),
      );
      root.style.removeProperty("--scroll");
      root.style.removeProperty("--progress");
      if (previousMode === null) root.removeAttribute("data-scroll-motion");
      else root.setAttribute("data-scroll-motion", previousMode);
    };
  }, []);

  return <div ref={indicator} className="scroll-progress" aria-hidden="true" />;
}
