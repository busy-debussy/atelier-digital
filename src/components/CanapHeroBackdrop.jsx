import { POSTER_PATHS, POSTER_BASE } from '../data/canapPosters';

// The hero posters render ~167px wide in a moving, rotated wall, so the default
// w342 is oversized — w185 halves the bytes with no visible loss here.
const HERO_POSTER_BASE = POSTER_BASE.replace(/\/w\d+$/, '/w185');

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildRows() {
  const shuffleA = shuffle(POSTER_PATHS);
  const shuffleB = shuffle(POSTER_PATHS);
  return [
    shuffleA.slice(0, 10),   // Row 0
    shuffleA.slice(10, 20),  // Row 1
    shuffleB.slice(0, 10),   // Row 2
    shuffleB.slice(10, 20),  // Row 3
  ];
}

const ROWS = buildRows();

function PosterRow({ posters, rowIdx }) {
  const isEven = rowIdx % 2 === 0;
  const duration = '480s';
  const animationName = isEven ? 'canap-card-marquee-left' : 'canap-card-marquee-right';

  return (
    <div className="relative h-[32vh] overflow-visible">
      <div
        className="flex h-full w-max items-center gap-3 will-change-transform"
        style={{ animation: `${animationName} ${duration} linear infinite` }}
      >
        {[...posters, ...posters].map((path, i) => (
          <img
            key={`${path}-${i}`}
            src={`${HERO_POSTER_BASE}${path}`}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-auto rounded-3xl object-cover"
            style={{ aspectRatio: '2 / 3' }}
          />
        ))}
      </div>
    </div>
  );
}

export function CanapHeroBackdrop() {
  const rows = ROWS;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          width: '170vw',
          height: '170vh',
          transform: 'translate(-50%, -50%) rotate(-15deg)',
        }}
      >
        <div className="flex h-full flex-col justify-center gap-2">
          {rows.map((rowPosters, rowIdx) => (
            <PosterRow key={rowIdx} posters={rowPosters} rowIdx={rowIdx} />
          ))}
        </div>
      </div>
    </div>
  );
}
