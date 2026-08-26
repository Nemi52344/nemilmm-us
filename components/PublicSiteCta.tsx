// Bridge out to the public NEMI site, placed immediately above the use-of-funds
// section so the product story is available before the capital ask.
export function PublicSiteCta() {
  return (
    <a
      href="https://www.nemilmm.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="lmm-snip group flex flex-col gap-5 border border-signal/30 bg-deep-emerald p-6 shadow-card-lift transition hover:border-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal md:flex-row md:items-center md:justify-between md:gap-8 md:p-7"
    >
      <span className="block font-display text-lg font-medium leading-snug text-oat md:text-xl">
        Click here to see what NEMI is truly capable of
        <span className="sr-only"> (opens the public site in a new tab)</span>
      </span>

      <span className="shrink-0 whitespace-nowrap font-mono text-[0.7rem] uppercase tracking-mono text-oat transition group-hover:text-signal">
        www.nemilmm.com&nbsp;&nbsp;&rarr;
      </span>
    </a>
  );
}
