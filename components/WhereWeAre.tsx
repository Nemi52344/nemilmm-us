import { Shot } from "./Media";
import { LogoWall } from "./LogoWall";

const SUITES = [
  {
    name: "Anvil",
    role: "Design & engineering",
    detail: "Prompt → parametric CAD, electronics, simulation, PLM",
    img: "/nemi/img/suite-anvil.jpg"
  },
  {
    name: "Orion",
    role: "Factory operating system",
    detail: "Live digital twin integrated with robotics, cameras, sensors, machines",
    img: "/nemi/img/suite-orion.jpg"
  },
  {
    name: "Atlas",
    role: "Commercial & post-sales loop",
    detail: "Post-sales usage tracking and continuous improvement",
    img: "/nemi/img/suite-atlas.jpg"
  }
];

// Ordered to read machining · tooling · assembly · electronics · battery ·
// motor. That list used to sit above the grid as a sentence; it now labels the
// shots themselves.
const FLOOR = [
  {
    src: "/nemi/img/svc-cnc-spindle.jpg",
    alt: "CNC machining spindle in operation",
    label: "Machining"
  },
  { src: "/nemi/img/real-press-shop.jpg", alt: "Press shop", label: "Tooling" },
  {
    src: "/nemi/img/fort-assembly-orange.jpg",
    alt: "Assembly line at a Nemi factory",
    label: "Assembly"
  },
  {
    src: "/nemi/img/fort-electronics-lab.jpg",
    alt: "Electronics laboratory",
    label: "Electronics"
  },
  {
    src: "/nemi/img/fac-battery-floor.jpg",
    alt: "Battery pack production floor",
    label: "Battery"
  },
  {
    src: "/nemi/img/fort-motors.jpg",
    alt: "Motor manufacturing cell",
    label: "Motor"
  }
];

// SECTION 2 — Where we are against the vision.
// Operational proof only. No financial figures in this section by request.
export function WhereWeAre() {
  return (
    <section id="where-we-are" className="scroll-mt-20 space-y-10">
      <div className="space-y-4">
        <p className="lmm-eyebrow">· Where we are</p>
        <h2 className="lmm-display text-2xl md:text-4xl">
          Competitors simulate. We execute in owned factories.
        </h2>
        <div className="lmm-rule-emerald" />
      </div>

      {/* Where we are heading — footprint, certifications and the process set */}
      <div className="space-y-4">
        <p className="lmm-label">Where we are heading</p>
        <p className="max-w-2xl font-display text-base font-light leading-body text-ground md:text-lg">
          Full-stack factories covering all different types of manufacturing.
        </p>
        <dl className="grid grid-cols-2 gap-px border border-oat/10 bg-oat/10 shadow-card-lift md:grid-cols-4">
          {[
            { v: "300k+", l: "sq ft owned" },
            { v: "AS9100D", l: "2016 certified" },
            { v: "ISO 9001", l: "2015 certified" },
            { v: "6", l: "process capabilities" }
          ].map((s) => (
            <div key={s.l} className="bg-graphite px-5 py-5">
              <dt className="font-display text-xl font-medium text-oat md:text-2xl">
                {s.v}
              </dt>
              <dd className="mt-1 font-mono text-[0.6rem] uppercase tracking-mono text-signal">
                {s.l}
              </dd>
            </div>
          ))}
        </dl>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {FLOOR.map((f) => (
            <Shot
              key={f.src}
              src={f.src}
              alt={f.alt}
              label={f.label}
              ratio="aspect-[4/3]"
            />
          ))}
        </div>
      </div>

      {/* End-to-end automation — the three suites */}
      <div className="space-y-4">
        <p className="lmm-label">End-to-end automation</p>
        <ul className="grid gap-4 md:grid-cols-3">
          {SUITES.map((s) => (
            <li
              key={s.name}
              className="lmm-snip space-y-3 border border-signal/30 bg-deep-emerald p-6 shadow-card-lift"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.img}
                alt={`${s.name} — ${s.role}`}
                loading="lazy"
                decoding="async"
                className="aspect-[16/9] w-full border border-signal/20 object-cover"
              />
              <p className="font-display text-lg font-medium text-oat">
                {s.name}
              </p>
              <p className="font-mono text-[0.6rem] uppercase tracking-mono text-signal">
                {s.role}
              </p>
              <p className="font-display text-sm font-light leading-body text-oat/80">
                {s.detail}
              </p>
            </li>
          ))}
        </ul>
        <p className="font-display text-sm font-light leading-body text-ground">
          One closed loop: sketch → render → CAD → simulation → BOM → tooling →
          production → post-sales. Multiple applications, one data spine, every
          application feeding the next.
        </p>
      </div>

      {/* Customer logos */}
      <div className="space-y-4">
        <p className="lmm-label">Who already builds with us</p>
        <LogoWall />
        <p className="lmm-snip border border-oat/12 bg-graphite p-4 font-mono text-[0.65rem] uppercase leading-body tracking-mono text-oat/70 shadow-card-lift">
          · Logos represent paid engagements across Nemi group entities,
          including programs delivered as a Tier-2 supplier through partners.
        </p>
      </div>
    </section>
  );
}
