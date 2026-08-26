// 36 customer logos as a continuous marquee — two rows travelling in opposite
// directions. Each track holds the row twice so the -50% translation lands on
// the duplicate and the loop is seamless.
// Order follows the management presentation.
type Logo = { file: string; name: string };

const LOGOS: Logo[] = [
  { file: "brahmos", name: "BrahMos" },
  { file: "drdo", name: "DRDO" },
  { file: "isro", name: "ISRO" },
  { file: "abb", name: "ABB" },
  { file: "lam-research", name: "Lam Research" },
  { file: "mistral", name: "Mistral" },
  { file: "lamborghini", name: "Lamborghini" },
  { file: "ducati", name: "Ducati" },
  { file: "tata", name: "TATA" },
  { file: "ashok-leyland", name: "Ashok Leyland" },
  { file: "mahindra", name: "Mahindra" },
  { file: "royal-enfield", name: "Royal Enfield" },
  { file: "agnikul", name: "Agnikul" },
  { file: "bharat-dynamics", name: "Bharat Dynamics Limited" },
  { file: "boeing", name: "Boeing" },
  { file: "caterpillar", name: "Caterpillar" },
  { file: "pricol", name: "Pricol" },
  { file: "exide", name: "Exide" },

  { file: "samsung", name: "Samsung" },
  { file: "norton", name: "Norton" },
  { file: "bnc", name: "BNC — Bharat New-Energy Company" },
  { file: "dito", name: "dito" },
  { file: "yango", name: "Yango" },
  { file: "funskool", name: "Funskool" },
  { file: "whirlpool", name: "Whirlpool" },
  { file: "india-post", name: "India Post" },
  { file: "dominos", name: "Domino's" },
  { file: "flipkart", name: "Flipkart" },
  { file: "instamart", name: "Instamart" },
  { file: "rapido", name: "Rapido" },
  { file: "zomato", name: "Zomato" },
  { file: "tvs-mobility", name: "TVS Mobility" },
  { file: "ross-mount", name: "Ross & Mount" },
  { file: "zepto", name: "Zepto" },
  { file: "bolt", name: "Bolt" },
  { file: "blinkit", name: "Blinkit" }
];

const ROW_ONE = LOGOS.slice(0, 18);
const ROW_TWO = LOGOS.slice(18);

function Row({ items, reverse }: { items: Logo[]; reverse?: boolean }) {
  return (
    <div className="lmm-marquee">
      <div
        className={`lmm-marquee-track ${
          reverse ? "lmm-marquee-track-reverse" : ""
        }`}
      >
        {[...items, ...items].map((l, i) => {
          const isDuplicate = i >= items.length;
          return (
            // Fixed-width slot with the spacing carried as margin, never as a
            // flex `gap`. Both matter for the loop: a gap would leave the track
            // half a gap short of the duplicate (translating -50% then jumps),
            // and a fluid slot would let late-loading images resize the track
            // mid-animation. With uniform slots, -50% lands exactly on the
            // duplicate and the geometry is fixed before any image arrives.
            <span
              key={`${l.file}-${i}`}
              className="mr-12 flex h-10 w-[110px] shrink-0 items-center justify-center md:mr-16"
              // The second pass is purely visual — hide it from assistive tech
              // so each company is announced once.
              aria-hidden={isDuplicate || undefined}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/nemi/logos/${l.file}.png`}
                alt={isDuplicate ? "" : l.name}
                loading="lazy"
                decoding="async"
                className="max-h-9 max-w-full object-contain md:max-h-10"
              />
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function LogoWall() {
  return (
    <div
      role="group"
      aria-label="Customer logos"
      className="space-y-8 md:space-y-10"
    >
      <Row items={ROW_ONE} />
      <Row items={ROW_TWO} reverse />
    </div>
  );
}
