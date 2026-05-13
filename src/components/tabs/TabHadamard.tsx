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

export default function TabHadamard({ state }: { state: StageMap }) {
  const d = state.hadamard ?? {};
  return (
    <div>
      <SectionHeader>
        Применение преобразования Адамара к <IK math="|x\rangle" />
      </SectionHeader>
      <TwoCol>
        <div>
          <InfoBox>
            <p>
              К каждому кубиту первого регистра применяется преобразование
              Адамара (H). В результате регистр |x⟩ переводится в равновероятную
              суперпозицию всех N состояний от |0⟩ до |N−1⟩.
            </p>
          </InfoBox>
          <Formula math="H^{\otimes n}|0\rangle = \dfrac{1}{\sqrt{N}} \sum_{x=0}^{N-1} |x\rangle" />
          <InfoBox>
            <p>
              На графике ниже видно, что все N состояний регистра |x⟩ имеют
              одинаковую амплитуду вероятности 1/√N, что соответствует
              равномерному распределению.
            </p>
          </InfoBox>
        </div>
        <CircuitStep stepImg="hadamard" />
      </TwoCol>
      <RegPanels>
        {d.xAmps ? (
          <QuantumStateViz
            amps={d.xAmps as Complex[]}
            label="Регистр |x⟩ после H⊗ⁿ"
          />
        ) : (
          <Skeleton />
        )}
        {d.yAmps ? (
          <QuantumStateViz
            amps={d.yAmps as Complex[]}
            label="Регистр |y⟩ (без изменений)"
          />
        ) : (
          <Skeleton />
        )}
      </RegPanels>
    </div>
  );
}
