// Main runner
import { Complex, findA, getNumQb, isPrime, isPrimePower } from "./baseMath";
import { add } from "./complexNumbers";
import continuedFraction, {
  tryFactorize,
  bruteFactorize,
  FactorResult,
} from "./contiunedFractions";
import {
  applyAllHadamard,
  applyUf,
  buildXAmpsFromList,
  MeasuredY,
  measureX,
  measureY,
  qft,
  zeroRegister,
} from "./quantumRegister";

interface ValidationResult {
  valid: boolean;
  error?: string;
}

interface ShorProgress {
  stage: string;
  numQb?: number;
  N?: number;
  a?: number;
  xAmps?: Complex[];
  yAmps?: Complex[];
  yVal?: number;
  m?: number;
  coeffs?: number[];
  numerators?: number[];
  denominators?: number[];
  result?: FactorResult | null;
  M?: number;
}

function runShor(M: number, onProgress: (p: ShorProgress) => void): void {
  const numQb = getNumQb(M);
  const N = 1 << numQb;
  const a = findA(M);

  onProgress({ stage: "prepare", numQb, N, a });

  const xInit = zeroRegister(numQb);
  const yInit = zeroRegister(numQb);
  onProgress({ stage: "initialize", xAmps: xInit, yAmps: yInit });

  const xHad = applyAllHadamard(numQb);
  onProgress({ stage: "hadamard", xAmps: xHad, yAmps: yInit });

  const yMap = applyUf(xHad, numQb, a, M);
  const yDist: Complex[] = Array.from({ length: M }, () => ({ re: 0, im: 0 }));
  for (const [y, list] of yMap) {
    for (const { amp } of list) {
      if (y < yDist.length) yDist[y] = add(yDist[y], amp);
    }
  }
  onProgress({ stage: "uf", xAmps: xHad, yAmps: yDist });

  let measured: MeasuredY;
  let attempts = 0;
  do {
    measured = measureY(yMap);
    attempts++;
    if (attempts > 100) break;
  } while (measured.xList.length === 0);

  const xAfterMY = buildXAmpsFromList(measured.xList, numQb);
  const yAfterMY: Complex[] = Array.from({ length: M }, () => ({
    re: 0,
    im: 0,
  }));
  if (measured.yVal < yAfterMY.length)
    yAfterMY[measured.yVal] = { re: 1, im: 0 };
  onProgress({
    stage: "measureY",
    xAmps: xAfterMY,
    yAmps: yAfterMY,
    yVal: measured.yVal,
  });

  const xQFT = qft(xAfterMY, numQb);
  onProgress({ stage: "qft", xAmps: xQFT, yAmps: yAfterMY });

  let m = 0;
  let factorResult: FactorResult | null = null;
  const maxTries = 20;

  for (let t = 0; t < maxTries && !factorResult; t++) {
    m = measureX(xQFT);
    if (m === 0) continue;
    const { denominators } = continuedFraction(m, N);
    for (const r of denominators) {
      if (r > 0 && r < M) {
        const res = tryFactorize(r, a, M);
        if (res) {
          factorResult = { ...res, m };
          break;
        }
        if (r % 2 !== 0) {
          const res2 = tryFactorize(2 * r, a, M);
          if (res2) {
            factorResult = { ...res2, m };
            break;
          }
        }
      }
    }
  }

  const xMX = xQFT.map((amp, i) =>
    i === m ? { re: 1, im: 0 } : { re: 0, im: 0 },
  );
  onProgress({ stage: "measureX", xAmps: xMX, yAmps: yAfterMY, m });

  if (!factorResult) {
    const { p, q } = bruteFactorize(M);
    factorResult = { p, q, r: -1, m };
  }

  const { coeffs, numerators, denominators } = continuedFraction(m, N);
  onProgress({
    stage: "postprocess",
    m,
    N,
    a,
    M,
    coeffs,
    numerators,
    denominators,
    result: factorResult,
    xAmps: xMX,
    yAmps: yAfterMY,
  });
}

export function validateInput(val: string): ValidationResult {
  const n = parseInt(val, 10);
  if (isNaN(n) || n <= 0)
    return { valid: false, error: "Введите натуральное число." };
  if (String(n).length !== 2)
    return { valid: false, error: "Введите двузначное число." };
  if (n % 2 === 0) {
    const p = n / 2;
    return {
      valid: false,
      error: `${n} = ${p} × 2 (чётное, делится на 2 тривиально).`,
    };
  }
  if (isPrime(n))
    return { valid: false, error: "Число простое — нечего факторизовать." };
  if (isPrimePower(n))
    return { valid: false, error: "Число является степенью простого числа." };
  return { valid: true };
}

export default runShor;
export type { ValidationResult, ShorProgress };
