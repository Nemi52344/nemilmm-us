import Image from "next/image";
import Link from "next/link";

type Props = {
  /** Tailwind height utilities for the mark itself, e.g. "h-7 md:h-8" */
  imgClassName?: string;
  href?: string;
  className?: string;
};

// Official NEMI infinity logo (white on transparent) — sits on the Black Ground
// header. No glow: the LMM system is restrained, emerald is a scalpel.
export function NemiMark({
  href = "/",
  className = "",
  imgClassName = "h-6 w-auto"
}: Props) {
  const content = (
    // `flex` + `leading-none` so the mark centres on the bar's cross-axis
    // instead of sitting on the surrounding text baseline.
    <span
      className={`flex items-center leading-none ${className}`}
      aria-label="NEMI"
    >
      <Image
        src="/nemi-logo-mark.png"
        alt=""
        width={905}
        height={192}
        priority
        className={imgClassName}
      />
      <span className="sr-only">NEMI</span>
    </span>
  );

  if (!href) return content;

  return (
    <Link href={href} aria-label="NEMI — home">
      {content}
    </Link>
  );
}
