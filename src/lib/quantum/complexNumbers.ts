// Complex numbers operations
import { Complex } from "./baseMath";

function add(a: Complex, b: Complex): Complex {
  return { re: a.re + b.re, im: a.im + b.im };
}
function sub(a: Complex, b: Complex): Complex {
  return { re: a.re - b.re, im: a.im - b.im };
}
function mul(a: Complex, b: Complex): Complex {
  return { re: a.re * b.re - a.im * b.im, im: a.re * b.im + a.im * b.re };
}
function scale(c: Complex, s: number): Complex {
  return { re: c.re * s, im: c.im * s };
}
function expI(theta: number): Complex {
  return { re: Math.cos(theta), im: Math.sin(theta) };
}
function abs2(c: Complex): number {
  return c.re * c.re + c.im * c.im;
}

export { add, sub, mul, scale, expI, abs2 };
