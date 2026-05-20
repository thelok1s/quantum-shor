interface ProcessShorClassicInput {
  M: bigint;
  a: bigint;
}

interface ProcessShorClassicResult {
  success: true;
  r: bigint;
  p: bigint;
  q: bigint;
}

function absBig(n: bigint): bigint {
  return n < 0n ? -n : n;
}

function gcdBig(a: bigint, b: bigint): bigint {
  a = absBig(a);
  b = absBig(b);

  while (b !== 0n) {
    [a, b] = [b, a % b];
  }

  return a;
}

function normalizeMod(value: bigint, mod: bigint): bigint {
  const res = value % mod;
  return res >= 0n ? res : res + mod;
}

function multiplicativeOrder(a: bigint, M: bigint): bigint {
  const normalizedA = normalizeMod(a, M);
  let current = 1n;

  for (let r = 1n; r <= M; r++) {
    current = (current * normalizedA) % M;
    if (current === 1n) return r;
  }

  throw new Error("Не удалось найти период r для заданных M и a.");
}

function modPowBig(base: bigint, exp: bigint, mod: bigint): bigint {
  let result = 1n;
  let curBase = normalizeMod(base, mod);
  let curExp = exp;

  while (curExp > 0n) {
    if ((curExp & 1n) === 1n) {
      result = (result * curBase) % mod;
    }
    curExp >>= 1n;
    curBase = (curBase * curBase) % mod;
  }

  return result;
}

export function processShorClassic({
  M,
  a,
}: ProcessShorClassicInput): ProcessShorClassicResult {
  if (M <= 2n) {
    throw new Error("M должно быть нечётным составным числом больше 2.");
  }

  if (a <= 1n || a >= M) {
    throw new Error("a должно лежать в диапазоне 2 ≤ a < M.");
  }

  if (gcdBig(a, M) !== 1n) {
    throw new Error("a и M должны быть взаимно просты.");
  }

  const r = multiplicativeOrder(a, M);

  if ((r & 1n) === 1n) {
    throw new Error(`Нечётный период r=${r}. Алгоритм требует чётный период.`);
  }

  const halfR = r / 2n;
  const x = modPowBig(a, halfR, M);

  if (x === 1n || x === M - 1n) {
    throw new Error(
      `Получены тривиальные множители: a^(r/2) mod M = ${x}. Попробуйте другое a.`,
    );
  }

  const p = gcdBig(x + 1n, M);
  const q = gcdBig(x - 1n, M);

  if (p <= 1n || q <= 1n || p >= M || q >= M) {
    throw new Error("Получены тривиальные множители. Попробуйте другое a.");
  }

  return {
    success: true,
    r,
    p,
    q,
  };
}

export type { ProcessShorClassicInput, ProcessShorClassicResult };
