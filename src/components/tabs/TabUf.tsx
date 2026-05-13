import QuantumStateViz from "@/components/QuantStateVizualizer";
import InfoBox from "@/components/layout/InfoBox";
import RegPanels from "@/components/layout/RegPanels";
import SectionHeader from "@/components/layout/SectionHeader";
import TwoCol from "@/components/layout/TwoCol";
import CircuitStep from "@/components/layout/katex/CircuitStep";
import Formula from "@/components/layout/katex/Formula";
import IK from "@/components/layout/katex/IK";
import Skeleton from "@/components/ui/Skeleton";
import { Complex } from "@/lib/quantum/baseMath";
import { StageMap } from "@/types";

export default function TabUf({ state, M }: { state: StageMap; M: number }) {
  const d = state.uf ?? {};
  const prep = state.prepare ?? {};
  return (
    <div>
      <SectionHeader>
        Применение оракула <IK math="U_f" />: вычисление{" "}
        <IK math="a^x \bmod M" />
      </SectionHeader>
      <TwoCol>
        <div>
          <InfoBox>
            <p>
              Квантовый оракул <IK math="U_f" /> вычисляет значения функции{" "}
              <IK math="a^x \bmod M" /> для всех аргументов x первого регистра
              одновременно. Результаты записываются во второй регистр.
            </p>
          </InfoBox>
          <Formula math="U_f|x\rangle|0\rangle = |x\rangle|a^x \bmod M\rangle" />
          <Formula math="\dfrac{1}{\sqrt{N}} \sum_{x=0}^{N-1} |x\rangle|0\rangle \;\rightarrow\; \dfrac{1}{\sqrt{N}} \sum_{x=0}^{N-1} |x\rangle|a^x \bmod M\rangle" />
          {prep.a && (
            <div className="bg-gray-100 dark:bg-[#1a1c24] border border-gray-200 dark:border-[#2a2d3a] rounded-lg p-3 mt-2">
              <div className="text-[0.78rem] text-gray-400 dark:text-[#7a7f94] mb-2">
                Первые значения <IK math={`f(x) = ${prep.a}^x \\bmod ${M}`} />:
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
          <QuantumStateViz amps={d.xAmps as Complex[]} label="Регистр |x⟩" />
        ) : (
          <Skeleton />
        )}
        {d.yAmps ? (
          <QuantumStateViz
            amps={d.yAmps as Complex[]}
            label="Регистр |y⟩ = a^x mod M"
          />
        ) : (
          <Skeleton />
        )}
      </RegPanels>
    </div>
  );
}
