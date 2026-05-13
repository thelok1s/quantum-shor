// Continued fractions

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
  failed?: boolean;
  oddR?: number;
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

function modPowBig(base: bigint, exp: bigint, mod: bigint): bigint {
  let result = 1n;
  base = base % mod;
  while (exp > 0n) {
    if (exp % 2n === 1n) result = (result * base) % mod;
    exp = exp >> 1n;
    base = (base * base) % mod;
  }
  return result;
}

function gcdBig(a: bigint, b: bigint): bigint {
  while (b !== 0n) {
    [a, b] = [b, a % b];
  }
  return a;
}

function tryFactorize(r: number, a: number, M: number): FactorResult | null {
  if (r % 2 !== 0) return null;
  const k = BigInt(r / 2);
  const aBig = BigInt(a);
  const MBig = BigInt(M);
  const ak = modPowBig(aBig, k, MBig);
  const pBig = gcdBig(ak + 1n, MBig);
  const qBig = gcdBig(ak > 0n ? ak - 1n : MBig - 1n, MBig);
  const p = Number(pBig);
  const q = Number(qBig);
  if (p === 1 || q === 1 || p === M || q === M) return null;
  if (p * q === M) return { p, q, r };
  return null;
}

export default continuedFraction;
export { tryFactorize };
export type { ContinuedFractionResult, FactorResult };
