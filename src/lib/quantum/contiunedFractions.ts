// Continued fractions

import { gcd, modPow } from "./baseMath";

interface ContinuedFractionResult {
  coeffs: number[];
  numerators: number[];
  denominators: number[];
}

interface FactorResult {
  p: number;
  q: number;
  r: number;
  m?: number;
}

function continuedFraction(num: number, den: number): ContinuedFractionResult {
  const coeffs: number[] = [];
  const As: number[] = [],
    Bs: number[] = [];
  let a = Math.floor(num / den),
    r = num % den;
  let Aprev = 0,
    Anow = 1,
    Bprev = 1,
    Bnow = 0;

  while (true) {
    const Atmp = a * Anow + Aprev;
    const Btmp = a * Bnow + Bprev;
    coeffs.push(a);
    As.push(Atmp);
    Bs.push(Btmp);
    Aprev = Anow;
    Anow = Atmp;
    Bprev = Bnow;
    Bnow = Btmp;
    if (r === 0) break;
    a = Math.floor(den / r);
    const tmp = den % r;
    den = r;
    r = tmp;
  }
  return { coeffs, numerators: As, denominators: Bs };
}

function tryFactorize(r: number, a: number, M: number): FactorResult | null {
  if (r % 2 !== 0) return null;
  const k = r / 2;
  const ak = modPow(a, k, M);
  const p = gcd(ak + 1, M);
  const q = gcd(ak - 1 > 0 ? ak - 1 : M - 1, M);
  if (p === 1 || q === 1 || p === M || q === M) return null;
  if (p * q === M) return { p, q, r };
  return null;
}

function bruteFactorize(M: number): { p: number; q: number } {
  for (let p = 2; p <= Math.sqrt(M); p++) {
    if (M % p === 0) return { p, q: M / p };
  }
  return { p: 1, q: M };
}

export default continuedFraction;
export { tryFactorize, bruteFactorize };
export type { ContinuedFractionResult, FactorResult };
