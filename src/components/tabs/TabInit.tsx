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
          <Formula>
            |ψ₀⟩ = |0⟩<sub>x</sub> ⊗ |0⟩<sub>y</sub> = |0, 0⟩
          </Formula>
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
