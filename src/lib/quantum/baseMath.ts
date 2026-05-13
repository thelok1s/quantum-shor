interface Complex {
  re: number;
  im: number;
}

function gcd(a: number, b: number): number {
  if (b === 0) return Math.abs(a);
  return gcd(b, a % b);
}

function getNumQb(M: number): number {
  let n = 1;
  while (Math.pow(2, n) < M * M) n++;
  return n;
}

function findA(M: number): number {
  let a: number;
  do {
    a = 2 + Math.floor(Math.random() * (M - 3));
  } while (gcd(a, M) !== 1);
  return a;
}

function isPrime(n: number): boolean {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

function isPrimePower(n: number): boolean {
  const maxExp = Math.log2(n);
  for (let k = 2; k <= maxExp; k++) {
    const w = Math.round(Math.pow(n, 1 / k));
    if (Math.pow(w, k) === n) return true;
  }
  return false;
}

function modPow(base: number, exp: number, mod: number): number {
  let result = 1;
  base = base % mod;
  while (exp > 0) {
    if (exp & 1) result = (result * base) % mod;
    exp >>= 1;
    base = (base * base) % mod;
  }
  return result;
}

export { gcd, getNumQb, findA, isPrime, isPrimePower, modPow };
export type { Complex };
