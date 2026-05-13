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

export default function TabMeasureY({ state }: { state: StageMap }) {
  const d = state.measureY ?? {};
  return (
    <div>
      <SectionHeader>
        Измерение состояния регистра <IK math="|y\rangle" />
      </SectionHeader>
      <TwoCol>
        <div>
          <InfoBox>
            <p>
              При измерении регистра <IK math="|y\rangle" /> фиксируется одно
              конкретное значение <IK math="y_0 = a^{x_0} \bmod M" />. После
              этого регистр <IK math="|x\rangle" /> коллапсирует в суперпозицию
              только тех состояний <IK math="|x\rangle" />, для которых{" "}
              <IK math="a^x \bmod M = y_0" />.
            </p>
          </InfoBox>
          <Formula math="|\psi\rangle = \dfrac{1}{\sqrt{K}} \sum_{j=0}^{K-1} |x_0 + jr\rangle" />
          <InfoBox>
            <p>
              Второй регистр служит для приготовления периодического состояния в
              первом регистре. Период r будет определён на следующих этапах.
            </p>
          </InfoBox>
          {d.yVal !== undefined && (
            <div className="bg-amber-50 dark:bg-[rgba(245,158,11,0.08)] border border-amber-200 dark:border-[rgba(245,158,11,0.2)] rounded-lg px-4 py-2.5 text-[0.9rem] text-amber-700 dark:text-amber-400 mt-2">
              Измерено y₀ = <strong>{d.yVal as number}</strong>
            </div>
          )}
        </div>
        <CircuitStep stepImg="measurey" />
      </TwoCol>
      <RegPanels>
        {d.xAmps ? (
          <QuantumStateViz
            amps={d.xAmps as Complex[]}
            label="Регистр |x⟩ (периодическое состояние)"
          />
        ) : (
          <Skeleton />
        )}
        {d.yAmps ? (
          <QuantumStateViz
            amps={d.yAmps as Complex[]}
            label="Регистр |y⟩ (коллапсировал)"
          />
        ) : (
          <Skeleton />
        )}
      </RegPanels>
    </div>
  );
}
