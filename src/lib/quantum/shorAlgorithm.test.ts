import { describe, expect, it } from "vitest";
import { processShorClassic } from "./shorAlgorithm";

describe("Shor Algorithm Post-Processing", () => {
  describe("Успешная факторизация (четный период)", () => {
    it("должен корректно находить множители для M=33 и a=7", () => {
      const result = processShorClassic({ M: 33n, a: 7n });

      expect(result.success).toBe(true);
      expect(result.r).toBe(10n);
      expect([result.p, result.q]).toContain(11n);
      expect([result.p, result.q]).toContain(3n);
    });

    it("должен корректно находить множители для M=55 и a=8", () => {
      const result = processShorClassic({ M: 55n, a: 8n });

      expect(result.success).toBe(true);
      expect(result.r).toBe(20n);
      expect([result.p, result.q]).toContain(11n);
      expect([result.p, result.q]).toContain(5n);
    });
  });

  describe("Отказ алгоритма (нечетный период)", () => {
    it("должен прерывать работу и указывать истинный нечетный период для M=55 и a=16", () => {
      expect(() => {
        processShorClassic({ M: 55n, a: 16n });
      }).toThrowError(/нечётный период.*5/i);
    });

    it("должен прерывать работу для M=33 и a=4 (период 5)", () => {
      expect(() => {
        processShorClassic({ M: 33n, a: 4n });
      }).toThrowError(/нечётный период.*5/i);
    });
  });

  describe("Отказ алгоритма (тривиальные множители)", () => {
    it("должен прерывать работу, если a^(r/2) = -1 mod M (M=15, a=14)", () => {
      expect(() => {
        processShorClassic({ M: 15n, a: 14n });
      }).toThrowError(/тривиальные множители/i);
    });
  });

  describe("Проверка больших чисел (BigInt)", () => {
    it("должен обрабатывать числа, вызывающие переполнение стандартного Number", () => {
      const result = processShorClassic({ M: 119n, a: 11n });

      expect(result.success).toBe(true);
      expect(result.r).toBe(48n);
      expect([result.p, result.q]).toContain(17n);
      expect([result.p, result.q]).toContain(7n);
    });
  });
});
