// Company narrative drawn from the August 2026 management presentation.
// Verifiable, present-tense facts only — no projections. All forward-looking
// information lives in the dataroom / offering documents.
export function CompanyOverview() {
  return (
    <section className="space-y-8">
      <header className="space-y-3">
        <p className="lmm-eyebrow">· Company overview</p>
        <h2 className="lmm-display text-2xl md:text-3xl">
          It&rsquo;s not AI for manufacturing — it&rsquo;s AI that runs
          manufacturing.
        </h2>
        <div className="lmm-rule-emerald" />
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3">
          <p className="lmm-label">What we do</p>
          <p className="lmm-body text-sm md:text-base">
            Nemi Corp is a Texas holding company providing
            Manufacturing-as-a-Service, powered by a Physical AI platform
            branded LMM (Large Manufacturing Model) that automates the design
            and manufacture of complex parts and assemblies.
          </p>
        </div>
        <div className="space-y-3">
          <p className="lmm-label">The problem</p>
          <p className="lmm-body text-sm md:text-base">
            Hardware has no large public datasets to scrape. To train a model
            that runs manufacturing, you have to be the manufacturer — so the
            LMM is trained where the data lives, on Nemi&rsquo;s own factory
            floors.
          </p>
        </div>
        <div className="space-y-3">
          <p className="lmm-label">The platform</p>
          <p className="lmm-body text-sm md:text-base">
            Three in-house application suites run one closed loop:{" "}
            <span className="font-medium text-ground">Anvil</span> (design and
            engineering), <span className="font-medium text-ground">Orion</span>{" "}
            (factory operating system), and{" "}
            <span className="font-medium text-ground">Atlas</span> (commercial
            and post-sales). Sketch through post-sales, every cycle trains the
            next.
          </p>
        </div>
        <div className="space-y-3">
          <p className="lmm-label">Markets served</p>
          <p className="lmm-body text-sm md:text-base">
            Enterprise customers in defence, high-end automotive, industrial
            manufacturing and aerospace, together with a testbed EV business
            with 5,000+ EVs deployed. Operations are certified to AS9100D:2016
            and ISO 9001:2015.
          </p>
        </div>
        <div className="space-y-3">
          <p className="lmm-label">Structure</p>
          <p className="lmm-body text-sm md:text-base">
            Substantially all operating activity is currently conducted through
            the Company&rsquo;s Indian operating subsidiaries. Nemi is
            completing a redomicile from India to the United States and plans to
            establish operations in the US, Middle East and Europe through
            strategic acquisitions.
          </p>
        </div>
        <div className="space-y-3">
          <p className="lmm-label">Leadership</p>
          <p className="lmm-body text-sm md:text-base">
            Anirudh Ravi Narayanan (CEO, ex-McKinsey Digital &amp; Industrial),
            Gokul Madhavan (CFO, Harvard PhD · Yale MBA), Shreerith Seshadri
            (CTO, ex-Meta Quest / Vision), and Vinoth Thiruvenkatasamy (COO,
            20+ years at Nissan and Ford). Full bios at{" "}
            <a
              href="https://nemilmm.com"
              className="text-signal underline decoration-signal/40 underline-offset-4 hover:decoration-signal"
            >
              nemilmm.com
            </a>
            .
          </p>
        </div>
      </div>

      {/* Present-state metrics only. Labelled unaudited per the presentation. */}
      {/* Surface: Warm Graphite */}
      <dl className="grid grid-cols-2 gap-px border border-oat/10 bg-oat/10 shadow-card-lift md:grid-cols-4">
        {[
          { v: "$15M", l: "ARR (unaudited)" },
          { v: "300k+", l: "sq ft owned factories" },
          { v: "40+", l: "enterprise customers" },
          { v: "90%+", l: "revenue retention" }
        ].map((s) => (
          <div key={s.l} className="bg-graphite px-5 py-5">
            <dt className="font-display text-2xl font-medium text-oat md:text-3xl">
              {s.v}
            </dt>
            <dd className="mt-1 font-mono text-[0.6rem] uppercase tracking-mono text-signal">
              {s.l}
            </dd>
          </div>
        ))}
      </dl>

      <p className="lmm-snip border border-ground/10 bg-oat-pale p-4 font-mono text-[0.65rem] uppercase leading-body tracking-mono text-mono-grey shadow-card">
        · Operating metrics are unaudited management figures as at August 2026,
        prepared on an Indian GAAP basis and subject to completion of a
        PCAOB-standard audit. Forward-looking information, including any revenue
        or margin forecast, is not provided on this page and is contained only
        in the offering documents and dataroom made available to verified
        investors.
      </p>
    </section>
  );
}
