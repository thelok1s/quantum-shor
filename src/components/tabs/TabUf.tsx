import { Complex } from "@/lib/quantum/baseMath";
import QuantumStateViz from "../QuantStateVizualizer";
import CircuitStep from "../layout/CircuitStep";
import Formula from "../layout/Formula";
import InfoBox from "../layout/InfoBox";
import RegPanels from "../layout/RegPanels";
import SectionHeader from "../layout/SectionHeader";
import Skeleton from "../ui/Skeleton";
import TwoCol from "../layout/TwoCol";
import { StageMap } from "@/types";

export default function TabUf({ state, M }: { state: StageMap; M: number }) {
  const d = state.uf ?? {};
  const prep = state.prepare ?? {};
  return (
    <div>
      <SectionHeader title="Применение оракула U_f: вычисление a^x mod M" />
      <TwoCol>
        <div>
          <InfoBox>
            <p>
              Квантовый оракул U<sub>f</sub> вычисляет значения функции a
              <sup>x</sup> mod M для всех аргументов x первого регистра
              одновременно. Результаты записываются во второй регистр.
            </p>
          </InfoBox>
          <Formula>
            U<sub>f</sub>|x⟩|0⟩ = |x⟩|a<sup>x</sup> mod M⟩
          </Formula>
          <Formula>
            <sup>1</sup>/<sub>√N</sub> ∑<sub>x=0</sub>
            <sup>N−1</sup> |x⟩|0⟩ → <sup>1</sup>/<sub>√N</sub> ∑<sub>x=0</sub>
            <sup>N−1</sup> |x⟩|a<sup>x</sup> mod M⟩
          </Formula>
          {prep.a && (
            <div className="bg-gray-100 dark:bg-[#1a1c24] border border-gray-200 dark:border-[#2a2d3a] rounded-lg p-3 mt-2">
              <div className="text-[0.78rem] text-gray-400 dark:text-[#7a7f94] mb-2">
                Первые значения f(x) = {prep.a}
                <sup>x</sup> mod {M}:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {Array.from(
                  { length: Math.min(8, (prep.N as number) || 8) },
                  (_, x) => {
                    let r = 1;
                    const base = (prep.a as number) % M;
                    for (let i = 0; i < x; i++) r = (r * base) % M;
                    return (
                      <span
                        key={x}
                        className="bg-cyan-50 dark:bg-[rgba(6,182,212,0.1)] border border-cyan-200 dark:border-[rgba(6,182,212,0.2)] rounded px-2 py-0.5 font-mono text-[0.8rem] text-cyan-700 dark:text-cyan-400"
                      >
                        {x}→{r}
                      </span>
                    );
                  },
                )}
                <span className="bg-cyan-50 dark:bg-[rgba(6,182,212,0.1)] border border-cyan-200 dark:border-[rgba(6,182,212,0.2)] rounded px-2 py-0.5 font-mono text-[0.8rem] text-cyan-700 dark:text-cyan-400">
                  …
                </span>
              </div>
            </div>
          )}
        </div>
        <CircuitStep stepImg="uf" />
      </TwoCol>
      <RegPanels>
        {d.xAmps ? (
          <QuantumStateViz
            amps={d.xAmps as Complex[]}
            label="Регистр |x⟩"
            height={110}
          />
        ) : (
          <Skeleton />
        )}
        {d.yAmps ? (
          <QuantumStateViz
            amps={d.yAmps as Complex[]}
            label="Регистр |y⟩ = a^x mod M"
            height={90}
          />
        ) : (
          <Skeleton />
        )}
      </RegPanels>
    </div>
  );
}
