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

export default function TabMeasureY({ state }: { state: StageMap }) {
  const d = state.measureY ?? {};
  return (
    <div>
      <SectionHeader title="Измерение состояния регистра |y⟩" />
      <TwoCol>
        <div>
          <InfoBox>
            <p>
              При измерении регистра |y⟩ фиксируется одно конкретное значение y₀
              = a<sup>x₀</sup> mod M. После этого регистр |x⟩ коллапсирует в
              суперпозицию только тех состояний |x⟩, для которых a<sup>x</sup>{" "}
              mod M = y₀.
            </p>
          </InfoBox>
          <Formula>
            |ψ⟩ = <sup>1</sup>/<sub>√K</sub> ∑<sub>j=0</sub>
            <sup>K−1</sup> |x₀ + jr⟩
          </Formula>
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
            height={110}
          />
        ) : (
          <Skeleton />
        )}
        {d.yAmps ? (
          <QuantumStateViz
            amps={d.yAmps as Complex[]}
            label="Регистр |y⟩ (коллапсировал)"
            height={90}
          />
        ) : (
          <Skeleton />
        )}
      </RegPanels>
    </div>
  );
}
