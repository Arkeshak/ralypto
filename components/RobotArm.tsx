/* A blueprint robot arm whose joints move on a loop (pure CSS animation). */
export default function RobotArm() {
  return (
    <svg
      className="arm"
      viewBox="0 0 400 300"
      role="img"
      aria-label="Moving robot arm drawing"
    >
      <g className="arm__draw">
        <line x1="110" y1="270" x2="290" y2="270" />
        <rect x="140" y="240" width="120" height="30" />
        <g className="arm__shoulder">
          <circle cx="200" cy="230" r="14" />
          <line x1="196" y1="217" x2="160" y2="140" />
          <line x1="208" y1="221" x2="174" y2="134" />
          <g className="arm__elbow">
            <circle cx="165" cy="132" r="12" />
            <line x1="175" y1="125" x2="275" y2="90" />
            <line x1="172" y1="138" x2="278" y2="104" />
            <g className="arm__wrist">
              <circle cx="284" cy="96" r="9" />
              <path
                className="arm__jaw arm__jaw--top"
                d="M292 90 l26 -10 l6 8 l-18 8"
              />
              <path
                className="arm__jaw arm__jaw--bottom"
                d="M292 102 l26 10 l6 -8 l-18 -8"
              />
            </g>
          </g>
        </g>
      </g>
      <g className="arm__dims">
        <line x1="140" y1="285" x2="260" y2="285" />
        <line x1="140" y1="280" x2="140" y2="290" />
        <line x1="260" y1="280" x2="260" y2="290" />
        <text x="200" y="298" textAnchor="middle">
          120
        </text>
        <line x1="70" y1="132" x2="70" y2="230" />
        <line x1="65" y1="132" x2="75" y2="132" />
        <line x1="65" y1="230" x2="75" y2="230" />
        <text x="58" y="185" textAnchor="middle" transform="rotate(-90 58 185)">
          98
        </text>
      </g>
    </svg>
  );
}
