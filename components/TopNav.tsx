"use client";

import { useEffect, useState } from "react";
import { NemiMark } from "./NemiMark";

const LINKS = [
  { id: "vision", label: "Vision" },
  { id: "where-we-are", label: "Where we are" },
  { id: "whats-next", label: "What's next" },
  { id: "terms", label: "Terms" }
];

// Docked flush to the top while the landing banner is on screen; detaches into
// a floating bar once the hero is scrolled past.
export function TopNav() {
  const [active, setActive] = useState<string>("vision");
  const [floating, setFloating] = useState(false);

  // Docked → floating, keyed to the hero leaving the viewport.
  useEffect(() => {
    const hero = document.getElementById("vision");
    if (!hero) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      // Switch once the hero's bottom edge passes the top of the viewport.
      setFloating(hero.getBoundingClientRect().bottom <= 8);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Current-section highlight
  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-60px 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`fixed z-50 bg-ground/55 backdrop-blur-xl backdrop-saturate-150 transition-all duration-300 ${
        floating
          ? "inset-x-4 top-4 shadow-float md:inset-x-6 md:top-5"
          : "inset-x-0 top-0"
      }`}
    >
      {/* Fixed 46px bar, 18px horizontal padding, no max-width — the row spans
          the full bar in both docked and floating states. */}
      <div className="flex h-[46px] w-full max-w-none items-center justify-between gap-6 px-[18px]">
        <NemiMark href={undefined} imgClassName="h-[21px] w-auto" />

        <div className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => {
            const isActive = active === l.id;
            return (
              <a
                key={l.id}
                href={`#${l.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`border-b-2 pb-0.5 font-mono text-[0.65rem] uppercase tracking-mono transition ${
                  isActive
                    ? "border-signal text-signal"
                    : "border-transparent text-oat/60 hover:text-signal"
                }`}
              >
                {l.label}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <a
            href="mailto:invest@nemilmm.com"
            className="hidden font-mono text-[0.65rem] uppercase tracking-mono text-oat/60 transition hover:text-signal md:inline"
          >
            invest@nemilmm.com
          </a>
          <a
            href="#invest"
            className="whitespace-nowrap bg-signal px-4 py-1 font-display text-sm font-medium text-ground transition hover:bg-signal/90"
          >
            Invest
          </a>
        </div>
      </div>
    </nav>
  );
}
