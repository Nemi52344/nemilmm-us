type Row = { label: string; value: string; tbd?: boolean };

type Props = {
  rows: Row[];
};

// Spec-sheet table on the Soft Oat card surface. Labels in IBM Plex Mono caps
// (data), values in Space Grotesk (voice). Sharp corners, no radius.
export function OfferingTable({ rows }: Props) {
  return (
    <dl className="divide-y divide-ground/10 border border-ground/10 bg-oat shadow-card">
      {rows.map((row) => (
        <div
          key={row.label}
          className="grid grid-cols-1 gap-1 px-5 py-4 md:grid-cols-[16rem_1fr] md:items-baseline md:gap-8"
        >
          <dt className="lmm-label">{row.label}</dt>
          <dd
            className={`font-display text-sm md:text-base ${
              row.tbd ? "font-mono text-xs uppercase tracking-mono text-mono-grey" : "text-ground"
            }`}
          >
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
