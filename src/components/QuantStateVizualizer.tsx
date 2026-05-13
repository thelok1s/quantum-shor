import { useRef, useEffect } from "react";
import { useIsDark } from "@/lib/ThemeContext";
import { Complex } from "@/lib/quantum/baseMath";

interface QuantStateVizualizerProps {
  amps: Complex[];
  label?: string;
}

const INTERNAL_W = 790;
const COLS = 64;
const GAP = 1;

export default function QuantStateVizualizer({
  amps,
  label,
}: QuantStateVizualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDark = useIsDark();

  const N = amps?.length ?? 0;
  const cols = Math.min(N, COLS);
  const rows = cols > 0 ? Math.ceil(N / cols) : 1;
  const cellW = cols > 0 ? (INTERNAL_W - GAP) / cols : INTERNAL_W;
  const cellH = cellW; // square cells
  const canvasH = Math.ceil(rows * cellH) + GAP;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !amps || amps.length === 0) return;
    const ctx = canvas.getContext("2d")!;
    const W = canvas.width;

    ctx.clearRect(0, 0, W, canvasH);
    ctx.fillStyle = isDark ? "#111318" : "#f1f5fb";
    ctx.fillRect(0, 0, W, canvasH);

    const maxProb = Math.max(
      ...amps.map((a) => a.re * a.re + a.im * a.im),
      1e-10,
    );

    for (let i = 0; i < N; i++) {
      const prob =
        (amps[i].re * amps[i].re + amps[i].im * amps[i].im) / maxProb;
      const row = Math.floor(i / cols);
      const col = i % cols;
      const x = GAP + col * cellW;
      const y = GAP + row * cellH;

      if (prob < 1e-10) {
        ctx.fillStyle = isDark ? "#1e2130" : "#dde4f0";
      } else {
        const phase = Math.atan2(amps[i].im, amps[i].re) / (2 * Math.PI);
        const hue = Math.round((((phase % 1) + 1) % 1) * 360);
        const lightness = isDark ? 62 : 42;
        const alpha = 0.3 + prob * 0.7;
        ctx.fillStyle = `hsla(${hue},88%,${lightness}%,${alpha})`;
      }
      ctx.fillRect(
        x,
        y,
        Math.max(cellW - GAP, 0.5),
        Math.max(cellH - GAP, 0.5),
      );
    }
  }, [amps, isDark, N, cols, cellW, cellH, canvasH]);

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <div className="text-[0.78rem] text-gray-400 dark:text-[#7a7f94] font-mono pl-0.5">
          {label}{" "}
          <span className="text-gray-300 dark:text-[#4b4f60]">
            ({N} состояний)
          </span>
        </div>
      )}
      <div
        className="overflow-y-auto rounded-md border border-gray-200 dark:border-[#2a2d3a]"
        style={{ maxHeight: 220 }}
      >
        <canvas
          ref={canvasRef}
          width={INTERNAL_W}
          height={canvasH}
          style={{ width: "100%", height: canvasH, display: "block" }}
        />
      </div>
    </div>
  );
}
