import { Complex } from "@/lib/quantum/baseMath";
import { StageMap } from "@/types";

import QuantumStateViz from "@/components/QuantStateVizualizer";
import InfoBox from "@/components/layout/InfoBox";
import RegPanels from "@/components/layout/RegPanels";
import SectionHeader from "@/components/layout/SectionHeader";
import TwoCol from "@/components/layout/TwoCol";
import CircuitStep from "@/components/layout/katex/CircuitStep";
import Formula from "@/components/layout/katex/Formula";
import Skeleton from "@/components/ui/Skeleton";

export default function TabInit({ state }: { state: StageMap }) {
  const d = state.initialize ?? {};
  return (
    <div>
      <SectionHeader title="Подготовительный этап — Инициализация" />
      <TwoCol>
        <div>
          <InfoBox>
            <p>
              Перед поиском периода квантовым алгоритмом Шора требуется
              инициализировать квантовые регистры. Все кубиты устанавливаются в
              нулевое состояние. Состояние обоих регистров описывается как:
            </p>
          </InfoBox>
          <Formula math="|\psi_0\rangle = |0\rangle_x \otimes |0\rangle_y = |0,\,0\rangle" />
          <InfoBox>
            <p>
              Каждая ячейка таблицы ниже соответствует одному из N квантовых
              состояний. Закрашенная ячейка — ненулевая амплитуда вероятности.
              Сразу после инициализации заполнена только клетка |0⟩.
            </p>
          </InfoBox>
        </div>
        <CircuitStep stepImg="init" />
      </TwoCol>
      <RegPanels>
        {d.xAmps ? (
          <QuantumStateViz amps={d.xAmps as Complex[]} label="Регистр |x⟩" />
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
