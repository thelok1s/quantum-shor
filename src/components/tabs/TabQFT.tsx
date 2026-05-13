import { Complex } from "@/lib/quantum/baseMath";
import { StageMap } from "@/types";
import QuantumStateViz from "../QuantStateVizualizer";
import CircuitStep from "../layout/CircuitStep";
import Formula from "../layout/Formula";
import InfoBox from "../layout/InfoBox";
import RegPanels from "../layout/RegPanels";
import SectionHeader from "../layout/SectionHeader";
import Skeleton from "../ui/Skeleton";
import TwoCol from "../layout/TwoCol";

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
          <Formula>
            QFT|x⟩ = <sup>1</sup>/<sub>√N</sub> ∑<sub>k=0</sub>
            <sup>N−1</sup> e<sup>2πixk/N</sup>|k⟩
          </Formula>
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
            height={110}
          />
        ) : (
          <Skeleton />
        )}
        {d.yAmps ? (
          <QuantumStateViz
            amps={d.yAmps as Complex[]}
            label="Регистр |y⟩"
            height={90}
          />
        ) : (
          <Skeleton />
        )}
      </RegPanels>
    </div>
  );
}
