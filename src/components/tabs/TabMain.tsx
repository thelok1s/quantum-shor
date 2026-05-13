import InfoBox from "@/components/layout/InfoBox";
import IK from "@/components/layout/katex/IK";
import SectionHeader from "@/components/layout/SectionHeader";
import { gcd } from "@/lib/quantum/baseMath";
import { FactorResult } from "@/lib/quantum/contiunedFractions";
import { StageMap } from "@/types";

export default function TabMain({
  state,
  M,
  steps,
  running,
}: {
  state: StageMap;
  M: number;
  steps: string[];
  running: boolean;
}) {
  const prep = state.prepare ?? {};
  const result = state.postprocess?.result as FactorResult | null | undefined;
  return (
    <div className="flex flex-col gap-4">
      <SectionHeader title="Обзор выполнения алгоритма Шора" />
      <InfoBox>
        <p>
          В процессе выполнения данной программы будет смоделирована реализация
          квантового алгоритма Шора. Поскольку алгоритм Шора является
          вероятностным, правильная факторизация может быть не получена с
          первого раза. Используйте кнопки «Запустить снова» для повторного
          запуска.
        </p>
      </InfoBox>

      {prep.numQb !== undefined && (
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: "Модуль M", value: M, note: null },
            {
              label: "Размер регистра n",
              value: `${prep.numQb} кубит`,
              note: "n: 2ⁿ ≥ M²",
            },
            { label: "Состояний N = 2ⁿ", value: prep.N, note: null },
            {
              label: "Случайное a",
              value: prep.a ?? "…",
              note: `НОД(a, M) = ${prep.a ? gcd(prep.a as number, M) : "…"}`,
            },
          ].map((c) => (
            <div
              key={c.label}
              className="bg-gray-100 dark:bg-[#1a1c24] border border-gray-200 dark:border-[#2a2d3a] rounded-xl p-3.5"
            >
              <div className="text-[0.72rem] text-gray-400 dark:text-[#7a7f94] uppercase tracking-wide mb-1">
                {c.label}
              </div>
              <div className="text-[1.4rem] font-bold text-accent-500 dark:text-accent-400 tracking-tight">
                {c.value}
              </div>
              {c.note && (
                <div className="text-[0.72rem] text-gray-400 dark:text-[#7a7f94] mt-0.5">
                  {c.note}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Circuit diagram */}
      <div className="bg-gray-100 dark:bg-[#1a1c24] border border-gray-200 dark:border-[#2a2d3a] rounded-xl p-4 px-6">
        <div className="text-[0.78rem] text-gray-400 dark:text-[#7a7f94] uppercase tracking-wide mb-3">
          Схема алгоритма Шора
        </div>
        <div className="flex flex-col gap-2">
          {([0, 1] as const).map((ri) => (
            <div key={ri} className="flex items-center gap-0">
              <span className="text-[0.82rem] text-gray-400 dark:text-[#7a7f94] w-8 shrink-0">
                <IK math={ri === 0 ? "|x\\rangle" : "|y\\rangle"} />
              </span>
              <div className="flex items-center flex-1">
                <span className="bg-white dark:bg-[#111318] border border-gray-200 dark:border-[#2a2d3a] rounded px-2 py-0.5 text-[0.75rem] text-gray-600 dark:text-[#c8ccd8] whitespace-nowrap shrink-0">
                  <IK math="|0\!\cdots\!0\rangle" />
                </span>
                <div className="flex-1 h-px bg-gray-200 dark:bg-[#2a2d3a] min-w-4" />
                {ri === 0 && (
                  <>
                    <span className="bg-white dark:bg-[#111318] border border-accent-300 dark:border-accent-500 text-accent-600 dark:text-accent-400 rounded px-2 py-0.5 text-[0.75rem] whitespace-nowrap shrink-0 bg-accent-50 dark:bg-[rgba(0,179,161,0.08)]">
                      <IK math="H^{\otimes n}" />
                    </span>
                    <div className="flex-1 h-px bg-gray-200 dark:bg-[#2a2d3a] min-w-4" />
                    <span className="bg-white dark:bg-[#111318] border border-gray-200 dark:border-[#2a2d3a] text-gray-600 dark:text-[#c8ccd8] rounded px-2 py-0.5 text-[0.75rem] whitespace-nowrap shrink-0">
                      <IK math="U_f" />
                    </span>
                    <div className="flex-1 h-px bg-gray-200 dark:bg-[#2a2d3a] min-w-4" />
                    <span className="bg-white dark:bg-[#111318] border border-accent-300 dark:border-accent-500 text-accent-600 dark:text-accent-400 rounded px-2 py-0.5 text-[0.75rem] whitespace-nowrap shrink-0 bg-accent-50 dark:bg-[rgba(0,179,161,0.08)]">
                      <IK math="\text{QFT}" />
                    </span>
                    <div className="flex-1 h-px bg-gray-200 dark:bg-[#2a2d3a] min-w-4" />
                    <span className="bg-white dark:bg-[#111318] border border-amber-300 dark:border-amber-500 text-amber-600 dark:text-amber-400 rounded px-2 py-0.5 text-[0.75rem] whitespace-nowrap shrink-0 bg-amber-50 dark:bg-[rgba(245,158,11,0.08)]">
                      <IK math="\mathcal{M}" />
                    </span>
                  </>
                )}
                {ri === 1 && (
                  <>
                    <div className="flex-[2] h-px bg-gray-200 dark:bg-[#2a2d3a] min-w-8" />
                    <span className="bg-white dark:bg-[#111318] border border-gray-200 dark:border-[#2a2d3a] text-gray-600 dark:text-[#c8ccd8] rounded px-2 py-0.5 text-[0.75rem] whitespace-nowrap shrink-0">
                      <IK math="U_f" />
                    </span>
                    <div className="flex-1 h-px bg-gray-200 dark:bg-[#2a2d3a] min-w-4" />
                    <span className="bg-white dark:bg-[#111318] border border-amber-300 dark:border-amber-500 text-amber-600 dark:text-amber-400 rounded px-2 py-0.5 text-[0.75rem] whitespace-nowrap shrink-0 bg-amber-50 dark:bg-[rgba(245,158,11,0.08)]">
                      <IK math="\mathcal{M}" />
                    </span>
                    <div className="flex-[2] h-px bg-gray-200 dark:bg-[#2a2d3a] min-w-8" />
                  </>
                )}
              </div>
            </div>
          ))}
          <div className="flex justify-around pl-8 text-[0.68rem] text-gray-400 dark:text-[#7a7f94] mt-1">
            <span>Инит.</span>
            <span>Адамар</span>
            <span>
              <IK math="f(x)=a^x\!\bmod\!M" />
            </span>
            <span>КПФ</span>
            <span>Измерение</span>
          </div>
        </div>
      </div>

      {result && !result.failed && result.r > 0 && (
        <div className="text-center">
          <div className="bg-emerald-50 dark:bg-[rgba(16,185,129,0.1)] border border-emerald-200 dark:border-[rgba(16,185,129,0.3)] rounded-xl px-6 py-3.5 text-[1.1rem] text-emerald-700 dark:text-emerald-400 mb-1.5 inline-block">
            Факторизация завершена:{" "}
            <strong>
              {M} = {result.p} × {result.q}
            </strong>
          </div>
          <p className="text-[0.85rem] text-gray-400 dark:text-[#7a7f94]">
            <IK math={`\\gcd(a^{${result.r / 2}}+1,\\,${M}) = ${result.p}`} />
            {"  |  "}
            <IK math={`\\gcd(a^{${result.r / 2}}-1,\\,${M}) = ${result.q}`} />
          </p>
        </div>
      )}
      {result && result.failed && (
        <div className="text-center">
          <div className="bg-amber-50 dark:bg-[rgba(245,158,11,0.1)] border border-amber-200 dark:border-[rgba(245,158,11,0.3)] rounded-xl px-6 py-3.5 text-[1.05rem] text-amber-700 dark:text-amber-400 mb-1.5 inline-block">
            ✗ Факторизация не удалась
            {result.oddR !== undefined && (
              <span className="text-[0.9rem] font-normal">
                {" "}
                — нечётный период r = {result.oddR}
              </span>
            )}
          </div>
          <p className="text-[0.85rem] text-gray-400 dark:text-[#7a7f94]">
            Нажмите «Запустить снова» для выбора другого основания a
          </p>
        </div>
      )}
    </div>
  );
}
