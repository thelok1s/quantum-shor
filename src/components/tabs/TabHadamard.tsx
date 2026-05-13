import { Complex } from "@/lib/quantum/baseMath";
import { StageMap } from "@/types";
import QuantumStateViz from "@/components/QuantStateVizualizer";
import CircuitStep from "@/components/layout/CircuitStep";
import Formula from "@/components/layout/Formula";
import InfoBox from "@/components/layout/InfoBox";
import RegPanels from "@/components/layout/RegPanels";
import SectionHeader from "@/components/layout/SectionHeader";
import Skeleton from "@/components/ui/Skeleton";
import TwoCol from "@/components/layout/TwoCol";

export default function TabHadamard({ state }: { state: StageMap }) {
  const d = state.hadamard ?? {};
  return (
    <div>
      <SectionHeader title="Применение преобразования Адамара к |x⟩" />
      <TwoCol>
        <div>
          <InfoBox>
            <p>
              К каждому кубиту первого регистра применяется преобразование
              Адамара (H). В результате регистр |x⟩ переводится в равновероятную
              суперпозицию всех N состояний от |0⟩ до |N−1⟩.
            </p>
          </InfoBox>
          <Formula>
            H⊗ⁿ|0⟩ = <sup>1</sup>/<sub>√N</sub> ∑<sub>x=0</sub>
            <sup>N−1</sup> |x⟩
          </Formula>
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
            height={110}
          />
        ) : (
          <Skeleton />
        )}
        {d.yAmps ? (
          <QuantumStateViz
            amps={d.yAmps as Complex[]}
            label="Регистр |y⟩ (без изменений)"
            height={90}
          />
        ) : (
          <Skeleton />
        )}
      </RegPanels>
    </div>
  );
}
