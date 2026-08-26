type Props = {
  /** What collateral goes here, e.g. "Vision explainer graphic" */
  label: string;
  /** Spec guidance for whoever supplies it */
  spec?: string;
  /** Aspect ratio utility, e.g. "aspect-video" | "aspect-[3/1]" */
  ratio?: string;
  tone?: "light" | "dark";
};

// Marks a slot awaiting a real asset. Deliberately obvious — dashed rule,
// mono label — so nothing ships to investors mistaken for finished art.
export function Placeholder({
  label,
  spec,
  ratio = "aspect-video",
  tone = "light"
}: Props) {
  const dark = tone === "dark";
  return (
    <div
      role="img"
      aria-label={`Placeholder: ${label}`}
      className={`lmm-snip flex ${ratio} w-full flex-col items-center justify-center gap-2 border border-dashed p-6 text-center ${
        dark
          ? "border-signal/40 bg-graphite"
          : "border-ground/25 bg-oat-pale"
      }`}
    >
      <span className="font-mono text-[0.6rem] uppercase tracking-mono-wide text-signal">
        · Asset placeholder
      </span>
      <span
        className={`font-display text-sm font-medium md:text-base ${
          dark ? "text-oat" : "text-ground"
        }`}
      >
        {label}
      </span>
      {spec && (
        <span
          className={`max-w-md font-mono text-[0.6rem] uppercase leading-body tracking-mono ${
            dark ? "text-oat/50" : "text-mono-grey"
          }`}
        >
          {spec}
        </span>
      )}
    </div>
  );
}
