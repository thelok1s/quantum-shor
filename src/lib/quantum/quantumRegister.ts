// Quantum register
import { Complex, modPow } from "./baseMath";
import { scale, add, sub, abs2, expI, mul } from "./complexNumbers";

interface MeasuredY {
  yVal: number;
  xList: YEntry[];
}

interface YEntry {
  x: number;
  amp: Complex;
}

function zeroRegister(size: number): Complex[] {
  const n = 1 << size;
  const amps: Complex[] = Array.from({ length: n }, () => ({ re: 0, im: 0 }));
  amps[0] = { re: 1, im: 0 };
  return amps;
}

function hadamard(amps: Complex[], qubit: number, size: number): Complex[] {
  const n = 1 << size;
  const step = 1 << qubit;
  const result = amps.map((a) => ({ ...a }));
  const inv = 1 / Math.SQRT2;
  for (let i = 0; i < n; i++) {
    if (i & step) continue;
    const j = i | step;
    const a = amps[i];
    const b = amps[j];
    result[i] = scale(add(a, b), inv);
    result[j] = scale(sub(a, b), inv);
  }
  return result;
}

function applyAllHadamard(size: number): Complex[] {
  let amps = zeroRegister(size);
  for (let q = 0; q < size; q++) {
    amps = hadamard(amps, q, size);
  }
  return amps;
}

function applyUf(
  xAmps: Complex[],
  xSize: number,
  a: number,
  M: number,
): Map<number, YEntry[]> {
  const N = 1 << xSize;
  const yMap = new Map<number, YEntry[]>();
  for (let x = 0; x < N; x++) {
    const amp = xAmps[x];
    if (abs2(amp) < 1e-15) continue;
    const y = modPow(a, x, M);
    if (!yMap.has(y)) yMap.set(y, []);
    yMap.get(y)!.push({ x, amp });
  }
  return yMap;
}

function measureY(yMap: Map<number, YEntry[]>): MeasuredY {
  const entries = [...yMap.entries()];
  const probs = entries.map(([, list]) =>
    list.reduce((s, { amp }) => s + abs2(amp), 0),
  );
  const total = probs.reduce((s, p) => s + p, 0);
  let r = Math.random() * total;
  for (let i = 0; i < entries.length; i++) {
    r -= probs[i];
    if (r <= 0) {
      const [yVal, list] = entries[i];
      const norm = Math.sqrt(probs[i]);
      return {
        yVal,
        xList: list.map(({ x, amp }) => ({ x, amp: scale(amp, 1 / norm) })),
      };
    }
  }
  const last = entries[entries.length - 1];
  const [yVal, list] = last;
  const prob = probs[probs.length - 1];
  const norm = Math.sqrt(prob);
  return {
    yVal,
    xList: list.map(({ x, amp }) => ({ x, amp: scale(amp, 1 / norm) })),
  };
}

function buildXAmpsFromList(xList: YEntry[], xSize: number): Complex[] {
  const N = 1 << xSize;
  const amps: Complex[] = Array.from({ length: N }, () => ({ re: 0, im: 0 }));
  for (const { x, amp } of xList) {
    amps[x] = add(amps[x], amp);
  }
  return amps;
}

function qft(amps: Complex[], size: number): Complex[] {
  const N = 1 << size;
  let a = amps.map((c) => ({ ...c }));
  for (let len = 2; len <= N; len <<= 1) {
    const half = len >> 1;
    const w = expI((2 * Math.PI) / len);
    for (let i = 0; i < N; i += len) {
      let wn: Complex = { re: 1, im: 0 };
      for (let j = 0; j < half; j++) {
        const u = a[i + j];
        const v = mul(a[i + j + half], wn);
        a[i + j] = add(u, v);
        a[i + j + half] = sub(u, v);
        wn = mul(wn, w);
      }
    }
  }
  for (let i = 0; i < N; i++) {
    let rev = 0;
    let x = i;
    for (let j = 0; j < size; j++) {
      rev = (rev << 1) | (x & 1);
      x >>= 1;
    }
    if (rev > i) {
      [a[i], a[rev]] = [a[rev], a[i]];
    }
  }
  const s = 1 / Math.sqrt(N);
  return a.map((c) => scale(c, s));
}

function measureX(amps: Complex[]): number {
  const probs = amps.map(abs2);
  const total = probs.reduce((s, p) => s + p, 0);
  let r = Math.random() * total;
  for (let i = 0; i < probs.length; i++) {
    r -= probs[i];
    if (r <= 0) return i;
  }
  return probs.length - 1;
}

export type { MeasuredY, YEntry };
export {
  zeroRegister,
  qft,
  measureX,
  applyAllHadamard,
  applyUf,
  measureY,
  buildXAmpsFromList,
};
