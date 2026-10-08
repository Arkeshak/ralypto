/* A robot-arm technical drawing that draws itself (CSS stroke animation). */
export default function BlueprintDraw({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <svg
      className={`bp-draw ${compact ? "bp-draw--compact" : ""}`}
      viewBox="0 0 400 300"
      role="img"
      aria-label="Technical drawing of a robot arm"
    >
      <g className="bp-draw__lines">
        {/* base */}
        <rect x="140" y="240" width="120" height="30" />
        <line x1="120" y1="270" x2="280" y2="270" />
        {/* lower arm */}
        <circle cx="200" cy="230" r="14" />
        <line x1="196" y1="217" x2="160" y2="140" />
        <line x1="208" y1="221" x2="174" y2="134" />
        {/* elbow */}
        <circle cx="165" cy="132" r="12" />
        {/* upper arm */}
        <line x1="175" y1="125" x2="275" y2="90" />
        <line x1="172" y1="138" x2="278" y2="104" />
        {/* wrist + gripper */}
        <circle cx="284" cy="96" r="9" />
        <path d="M292 90 l26 -10 l6 8 l-18 8" />
        <path d="M292 102 l26 10 l6 -8 l-18 -8" />
      </g>
      <g className="bp-draw__dims">
        <line x1="140" y1="285" x2="260" y2="285" />
        <line x1="140" y1="280" x2="140" y2="290" />
        <line x1="260" y1="280" x2="260" y2="290" />
        <text x="200" y="298" textAnchor="middle">
          120
        </text>
        <line x1="60" y1="132" x2="60" y2="230" />
        <line x1="55" y1="132" x2="65" y2="132" />
        <line x1="55" y1="230" x2="65" y2="230" />
        <text x="48" y="185" textAnchor="middle" transform="rotate(-90 48 185)">
          98
        </text>
        {!compact && (
          <circle cx="165" cy="132" r="26" className="bp-draw__callout" />
        )}
        {!compact && (
          <text x="120" y="96" className="bp-draw__note">
            joint A, 180° servo
          </text>
        )}
      </g>
    </svg>
  );
}
