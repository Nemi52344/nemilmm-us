// Product proof section: the LMM running, not described. Two of the three
// application suites, recorded inside the Company's own operations.
// Never autoplays — the offering spec requires no auto-play media, and
// preload="metadata" keeps the payload off the wire until an investor presses
// play. Deliberately caption-only: the footage carries the section.
type Demo = {
  slug: string;
  name: string;
  role: string;
  alt: string;
};

const DEMOS: Demo[] = [
  {
    slug: "anvil-lmm",
    name: "Anvil",
    role: "Design & engineering",
    alt: "Screen recording of the Anvil design and engineering suite generating parametric CAD from a prompt"
  },
  {
    slug: "orion-lmm",
    name: "Orion",
    role: "Factory operating system",
    alt: "Screen recording of the Orion factory operating system showing a live digital twin of the production floor"
  }
];

export function LmmInAction() {
  return (
    <section id="lmm-in-action" className="scroll-mt-20 space-y-6">
      <h2 className="lmm-display text-2xl md:text-4xl">
        A glance at the NEMI LMM in action
      </h2>
      <div className="lmm-rule-emerald" />

      <div className="grid gap-8 md:grid-cols-2 md:gap-6">
        {DEMOS.map((d) => (
          <figure key={d.slug} className="space-y-3">
            <div className="lmm-snip overflow-hidden border border-signal/25 bg-ground shadow-card-lift">
              <video
                src={`/nemi/video/${d.slug}.mp4`}
                poster={`/nemi/video/${d.slug}-poster.jpg`}
                controls
                preload="metadata"
                playsInline
                aria-label={d.alt}
                className="aspect-video w-full object-cover"
              />
            </div>
            <figcaption className="space-y-1.5">
              <p className="font-display text-lg font-medium text-ground">
                {d.name}
              </p>
              <p className="font-mono text-[0.6rem] uppercase tracking-mono text-signal">
                {d.role}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>

      <p className="lmm-source pt-1">
        · Screen recordings of production software as of July 2026. User
        Interface designs and features are subject to change or enhance in the
        future, and the recordings illustrate current capabilities rather than
        future roadmap.
      </p>
    </section>
  );
}
