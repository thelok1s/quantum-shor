export default function CircuitStep({ stepImg }: { stepImg: string }) {
  const labels: Record<string, string> = {
    init: "Инициализация |0⟩",
    hadamard: "H⊗ⁿ на |x⟩",
    uf: "U_f: a^x mod M",
    measurey: "Измерение |y⟩",
    qft: "КПФ на |x⟩",
    measurex: "Измерение |x⟩",
  };
  const isTwoQubit = stepImg === "uf" || stepImg === "measurey";
  return (
    <div className="shrink-0">
      <svg viewBox="0 0 220 140" width="220" height="140">
        <text
          x="10"
          y="40"
          fill="var(--reg-text)"
          fontSize="11"
          fontFamily="monospace"
        >
          |x⟩
        </text>
        <line
          x1="30"
          y1="37"
          x2="195"
          y2="37"
          stroke="var(--wire-color)"
          strokeWidth="1.5"
        />
        <text
          x="10"
          y="100"
          fill="var(--reg-text)"
          fontSize="11"
          fontFamily="monospace"
        >
          |y⟩
        </text>
        <line
          x1="30"
          y1="97"
          x2="195"
          y2="97"
          stroke="var(--wire-color)"
          strokeWidth="1.5"
        />
        <rect
          x="70"
          y="22"
          width="80"
          height="30"
          rx="6"
          fill="var(--gate-fill)"
          stroke="var(--gate-stroke)"
          strokeWidth="1.5"
        />
        <text
          x="110"
          y="42"
          fill="var(--gate-text)"
          fontSize="10"
          textAnchor="middle"
          fontFamily="monospace"
        >
          {labels[stepImg] ?? stepImg}
        </text>
        {isTwoQubit && (
          <>
            <line
              x1="110"
              y1="52"
              x2="110"
              y2="82"
              stroke="var(--gate-stroke)"
              strokeWidth="1.5"
              strokeDasharray="3,2"
            />
            <rect
              x="70"
              y="82"
              width="80"
              height="30"
              rx="6"
              fill="var(--gate-fill)"
              stroke="var(--gate-stroke)"
              strokeWidth="1.5"
            />
            <text
              x="110"
              y="102"
              fill="var(--gate-text)"
              fontSize="10"
              textAnchor="middle"
              fontFamily="monospace"
            >
              |y⟩
            </text>
          </>
        )}
      </svg>
    </div>
  );
}
