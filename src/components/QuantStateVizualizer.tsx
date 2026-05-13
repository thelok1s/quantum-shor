import { useRef, useEffect } from "react";
import { useIsDark } from "@/lib/ThemeContext";
import { Complex } from "@/lib/quantum/baseMath";

interface QuantStateVizualizerProps {
  amps: Complex[];
  label?: string;
  height?: number;
}

export default function QuantStateVizualizer({
  amps,
  label,
  height = 120,
}: QuantStateVizualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDark = useIsDark();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !amps || amps.length === 0) return;
    const ctx = canvas.getContext("2d")!;
    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = isDark ? "#111318" : "#f8fafc";
    ctx.fillRect(0, 0, W, H);

    const N = amps.length;
    const maxProb = Math.max(
      ...amps.map((a) => a.re * a.re + a.im * a.im),
      1e-10,
    );
    const cols = Math.min(N, 64);
    const rows = Math.ceil(N / cols);
    const cellW = (W - 2) / cols;
    const cellH = (H - 2) / rows;

    for (let i = 0; i < N; i++) {
      const prob =
        (amps[i].re * amps[i].re + amps[i].im * amps[i].im) / maxProb;
      const row = Math.floor(i / cols);
      const col = i % cols;
      const x = 1 + col * cellW;
      const y = 1 + row * cellH;

      if (prob < 1e-10) {
        ctx.fillStyle = isDark ? "#1a1c24" : "#e2e8f0";
      } else {
        const phase = Math.atan2(amps[i].im, amps[i].re) / (2 * Math.PI);
        const hue = Math.round((((phase % 1) + 1) % 1) * 360);
        const lightness = isDark ? 60 : 45;
        const alpha = 0.25 + prob * 0.75;
        ctx.fillStyle = `hsla(${hue},80%,${lightness}%,${alpha})`;
      }
      ctx.fillRect(
        x,
        y,
        Math.max(cellW - 0.5, 0.5),
        Math.max(cellH - 0.5, 0.5),
      );
    }
  }, [amps, isDark]);

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <div className="text-[0.78rem] text-gray-400 dark:text-[#7a7f94] font-mono pl-0.5">
          {label}{" "}
          <span className="text-gray-300 dark:text-[#4b4f60]">
            ({amps?.length ?? 0} состояний)
          </span>
        </div>
      )}
      <canvas
        ref={canvasRef}
        width={790}
        height={height}
        style={{ height }}
        className="w-full rounded-md border border-gray-200 dark:border-[#2a2d3a] block"
      />
    </div>
  );
}
