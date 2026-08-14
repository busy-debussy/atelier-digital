// LogoLoader — minimal loading indicator: a single thin arc, continuously
// rotating. Only ever shown over the dimmed hero image on the case-study
// password gate, so it's monochrome white rather than brand-coloured.

export default function LogoLoader({ size = 40, label = 'Loading…', className = '' }) {
  return (
    <div role="status" aria-live="polite" className={`inline-flex flex-col items-center ${className}`}>
      <style>{`
        @keyframes dt-loader-spin { to { transform: rotate(360deg); } }
        .dt-loader-arc {
          transform-box: view-box;
          transform-origin: center;
          animation: dt-loader-spin 0.85s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .dt-loader-arc { animation: none; }
        }
      `}</style>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke="white" strokeOpacity="0.25" strokeWidth="1.5" />
        <path
          className="dt-loader-arc"
          d="M22 12a10 10 0 0 0-10-10"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <span className="sr-only">{label}</span>
    </div>
  );
}
