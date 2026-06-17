import { POSTER_PATHS, POSTER_BASE } from '../data/canapPosters';

function PosterRow({ posters, rowIdx, posterGap, posterRadius, base }) {
  const isEven = rowIdx % 2 === 0;
  const duration = '480s';
  const animationName = isEven ? 'canap-card-marquee-left' : 'canap-card-marquee-right';

  return (
    <div className="relative h-[22%] overflow-visible">
      <div
        className={`flex h-full w-max items-center ${posterGap} will-change-transform`}
        style={{ animation: `${animationName} ${duration} linear infinite` }}
      >
        {[...posters, ...posters].map((path, i) => (
          <img
            key={`${path}-${i}`}
            src={`${base}${path}`}
            alt=""
            loading="lazy"
            decoding="async"
            className={`h-full w-auto ${posterRadius} object-cover`}
            style={{ aspectRatio: '2 / 3' }}
          />
        ))}
      </div>
    </div>
  );
}

// posterGap / posterRadius / rowGap default to the homepage card's values; the
// nav mini-card passes smaller ones so the poster wall reads right at ~142px.
export function CanapCardBackdrop({ posterGap = 'gap-3', posterRadius = 'rounded-2xl', rowGap = 'gap-2', posterSize } = {}) {
  // Smaller TMDB size for small renders (e.g. the nav mini-card) — the default
  // w342 is far oversized when each poster paints ~35px wide, so it loads slowly.
  const base = posterSize ? POSTER_BASE.replace(/\/w\d+$/, `/${posterSize}`) : POSTER_BASE;
  const rowCount = 4;
  const rowSize = Math.max(1, Math.ceil(POSTER_PATHS.length / rowCount));
  const rows = Array.from({ length: rowCount }, (_, i) =>
    POSTER_PATHS.slice(i * rowSize, (i + 1) * rowSize),
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-black" aria-hidden="true">
      {/* Oversized rotated canvas. The login uses 170vw / 170vh;
          here the canvas is sized relative to the card (170% in
          both axes) so the rotated rectangle's corners still cover
          the entire card. Centred via translate(-50%). */}
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          width: '170%',
          height: '170%',
          transform: 'translate(-50%, -50%) rotate(-15deg)',
        }}
      >
        {/* `gap-2` between rows — exact match for the iOS login.
            Tight spacing reads as "wall of posters", not "discrete
            cards floating". */}
        <div className={`flex h-full flex-col justify-center ${rowGap}`}>
          {rows.map((rowPosters, rowIdx) => (
            <PosterRow key={rowIdx} posters={rowPosters} rowIdx={rowIdx} posterGap={posterGap} posterRadius={posterRadius} base={base} />
          ))}
        </div>
      </div>

      {/* Vignette overlay — light at the top so the posters read
          full-saturation, heavier at the bottom where the chips +
          title panel sits so the type stays legible regardless of
          which posters happen to land under it. Mirrors the
          gradient pattern other cards on this page use. */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/60" />
    </div>
  );
}
