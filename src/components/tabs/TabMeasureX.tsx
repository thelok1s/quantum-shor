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

export default function TabMeasureX({ state }: { state: StageMap }) {
  const d = state.measureX ?? {};
  return (
    <div>
      <SectionHeader>
        Измерение состояния регистра <IK math="|x\rangle" />
      </SectionHeader>
      <TwoCol>
        <div>
          <InfoBox>
            <p>
              Измерение регистра |x⟩ после КПФ даёт целое число m, кратное N/r.
              С хорошей вероятностью это число пригодно для нахождения периода r
              методом непрерывной дроби.
            </p>
          </InfoBox>
          <Formula math="m \approx k \cdot \dfrac{N}{r}, \quad k \in \mathbb{Z}" />
          <Formula math="A(m) = \dfrac{1}{N} \cdot \dfrac{\sin\!\left(\dfrac{\pi m r K}{N}\right)}{\sin\!\left(\dfrac{\pi m r}{N}\right)}" />
          {d.m !== undefined && (
            <div className="bg-amber-50 dark:bg-[rgba(245,158,11,0.08)] border border-amber-200 dark:border-[rgba(245,158,11,0.2)] rounded-lg px-4 py-2.5 text-[0.9rem] text-amber-700 dark:text-amber-400 mt-2">
              Измерено m = <strong>{d.m as number}</strong>
            </div>
          )}
        </div>
        <CircuitStep stepImg="measurex" />
      </TwoCol>
      <RegPanels>
        {d.xAmps ? (
          <QuantumStateViz
            amps={d.xAmps as Complex[]}
            label="Регистр |x⟩ после измерения"
          />
        ) : (
          <Skeleton />
        )}
        {d.yAmps ? (
          <QuantumStateViz amps={d.yAmps as Complex[]} label="Регистр |y⟩" />
        ) : (
          <Skeleton />
        )}
      </RegPanels>
    </div>
  );
}
