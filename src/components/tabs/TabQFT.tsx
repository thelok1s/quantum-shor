import QuantumStateViz from "@/components/QuantStateVizualizer";
import InfoBox from "@/components/layout/InfoBox";
import RegPanels from "@/components/layout/RegPanels";
import SectionHeader from "@/components/layout/SectionHeader";
import TwoCol from "@/components/layout/TwoCol";
import CircuitStep from "@/components/layout/katex/CircuitStep";
import Formula from "@/components/layout/katex/Formula";
import Skeleton from "@/components/ui/Skeleton";
import { Complex } from "@/lib/quantum/baseMath";
import { StageMap } from "@/types";

export default function TabQFT({ state }: { state: StageMap }) {
  const d = state.qft ?? {};
  return (
    <div>
      <SectionHeader title="Квантовое преобразование Фурье (КПФ)" />
      <TwoCol>
        <div>
          <InfoBox>
            <p>
              Квантовое преобразование Фурье применяется к периодическому
              состоянию регистра |x⟩. Оно усиливает пиковые амплитуды
              вероятности при целых числах, кратных N/r.
            </p>
          </InfoBox>
          <Formula math="\operatorname{QFT}|x\rangle = \dfrac{1}{\sqrt{N}} \sum_{k=0}^{N-1} e^{2\pi i x k/N}|k\rangle" />
          <InfoBox>
            <p>
              После применения КПФ на графике регистра |x⟩ можно заметить пики
              амплитуды, расположенные с шагом N/r. Цвет каждой ячейки кодирует
              фазу амплитуды.
            </p>
          </InfoBox>
        </div>
        <CircuitStep stepImg="qft" />
      </TwoCol>
      <RegPanels>
        {d.xAmps ? (
          <QuantumStateViz
            amps={d.xAmps as Complex[]}
            label="Регистр |x⟩ после КПФ (пики при k·N/r)"
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
