import katex from "katex";

const TOP_MATH: Record<string, string> = {
  init: "|0\\rangle",
  hadamard: "H^{\\otimes n}",
  uf: "U_f",
  measurey: "\\mathcal{M}",
  qft: "\\text{QFT}",
  measurex: "\\mathcal{M}",
};

const BOTTOM_MATH: Record<string, string> = {
  uf: "|a^x \\bmod M\\rangle",
  measurey: "|y_0\\rangle",
};

const WIRE_X = "|x\\rangle";
const WIRE_Y = "|y\\rangle";

function KBox({
  x,
  y,
  w,
  h,
  math,
  fs = 11,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  math: string;
  fs?: number;
}) {
  const html = katex.renderToString(math, {
    throwOnError: false,
    output: "html",
  });
  return (
    <foreignObject x={x} y={y} width={w} height={h} overflow="visible">
      <div
        // @ts-expect-error
        xmlns="http://www.w3.org/1999/xhtml"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          fontSize: fs,
          color: "var(--gate-text)",
          lineHeight: 1,
          overflow: "hidden",
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </foreignObject>
  );
}

function WireLabel({ x, y, math }: { x: number; y: number; math: string }) {
  const html = katex.renderToString(math, {
    throwOnError: false,
    output: "html",
  });
  return (
    <foreignObject x={x} y={y - 9} width={26} height={18} overflow="visible">
      <div
        // @ts-expect-error
        xmlns="http://www.w3.org/1999/xhtml"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
          height: "100%",
          fontSize: 11,
          color: "var(--reg-text)",
          lineHeight: 1,
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </foreignObject>
  );
}

export default function CircuitStep({ stepImg }: { stepImg: string }) {
  const isTwoQubit = stepImg === "uf" || stepImg === "measurey";
  const topMath = TOP_MATH[stepImg] ?? stepImg;
  const bottomMath = BOTTOM_MATH[stepImg];

  return (
    <div className="shrink-0">
      <svg viewBox="0 0 220 140" width="220" height="140">
        {/* |x⟩ wire */}
        <WireLabel x={2} y={37} math={WIRE_X} />
        <line
          x1="30"
          y1="37"
          x2="70"
          y2="37"
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
        <KBox x={70} y={22} w={80} h={30} math={topMath} fs={11} />
        <line
          x1="150"
          y1="37"
          x2="195"
          y2="37"
          stroke="var(--wire-color)"
          strokeWidth="1.5"
        />

        {isTwoQubit ? (
          <>
            {/* |y⟩ wire */}
            <WireLabel x={2} y={97} math={WIRE_Y} />
            <line
              x1="30"
              y1="97"
              x2="70"
              y2="97"
              stroke="var(--wire-color)"
              strokeWidth="1.5"
            />
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
            <KBox
              x={70}
              y={82}
              w={80}
              h={30}
              math={bottomMath ?? WIRE_Y}
              fs={bottomMath ? 9 : 11}
            />
            <line
              x1="150"
              y1="97"
              x2="195"
              y2="97"
              stroke="var(--wire-color)"
              strokeWidth="1.5"
            />
          </>
        ) : (
          /* single-qubit: draw |y⟩ wire unchanged */
          <>
            <WireLabel x={2} y={97} math={WIRE_Y} />
            <line
              x1="30"
              y1="97"
              x2="195"
              y2="97"
              stroke="var(--wire-color)"
              strokeWidth="1.5"
            />
          </>
        )}
      </svg>
    </div>
  );
}
