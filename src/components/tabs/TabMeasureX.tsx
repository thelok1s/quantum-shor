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

export default function TabMeasureX({ state }: { state: StageMap }) {
  const d = state.measureX ?? {};
  return (
    <div>
      <SectionHeader title="Измерение состояния регистра |x⟩" />
      <TwoCol>
        <div>
          <InfoBox>
            <p>
              Измерение регистра |x⟩ после КПФ даёт целое число m, кратное N/r.
              С хорошей вероятностью это число пригодно для нахождения периода r
              методом непрерывной дроби.
            </p>
          </InfoBox>
          <Formula>m ≈ k · (N/r), &nbsp; k ∈ ℤ</Formula>
          <Formula>
            A(m) = <sup>1</sup>/<sub>N</sub> · <sup>sin(πmr/N · K)</sup>/
            <sub>sin(πmr/N)</sub>
          </Formula>
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
