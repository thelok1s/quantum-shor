import { gcd } from "@/lib/quantum/baseMath";
import { FactorResult } from "@/lib/quantum/contiunedFractions";
import { StageMap } from "@/types";
import InfoBox from "../layout/InfoBox";
import SectionHeader from "../layout/SectionHeader";

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
              <div className="text-[1.4rem] font-bold text-indigo-500 tracking-tight">
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
          {(["|x⟩", "|y⟩"] as const).map((reg, ri) => (
            <div key={reg} className="flex items-center gap-0">
              <span className="font-mono text-[0.85rem] text-gray-400 dark:text-[#7a7f94] w-7 shrink-0">
                {reg}
              </span>
              <div className="flex items-center flex-1">
                <span className="bg-white dark:bg-[#111318] border border-gray-200 dark:border-[#2a2d3a] rounded px-2 py-0.5 text-[0.75rem] text-gray-600 dark:text-[#c8ccd8] font-mono whitespace-nowrap shrink-0">
                  |0…0⟩
                </span>
                <div className="flex-1 h-px bg-gray-200 dark:bg-[#2a2d3a] min-w-4" />
                {ri === 0 && (
                  <>
                    <span className="bg-white dark:bg-[#111318] border border-indigo-300 dark:border-indigo-500 text-indigo-600 dark:text-indigo-400 rounded px-2 py-0.5 text-[0.75rem] font-mono whitespace-nowrap shrink-0 bg-indigo-50 dark:bg-[rgba(99,102,241,0.08)]">
                      H⊗ⁿ
                    </span>
                    <div className="flex-1 h-px bg-gray-200 dark:bg-[#2a2d3a] min-w-4" />
                    <span className="bg-white dark:bg-[#111318] border border-gray-200 dark:border-[#2a2d3a] text-gray-600 dark:text-[#c8ccd8] rounded px-2 py-0.5 text-[0.75rem] font-mono whitespace-nowrap shrink-0">
                      U_f
                    </span>
                    <div className="flex-1 h-px bg-gray-200 dark:bg-[#2a2d3a] min-w-4" />
                    <span className="bg-white dark:bg-[#111318] border border-indigo-300 dark:border-indigo-500 text-indigo-600 dark:text-indigo-400 rounded px-2 py-0.5 text-[0.75rem] font-mono whitespace-nowrap shrink-0 bg-indigo-50 dark:bg-[rgba(99,102,241,0.08)]">
                      QFT
                    </span>
                    <div className="flex-1 h-px bg-gray-200 dark:bg-[#2a2d3a] min-w-4" />
                    <span className="bg-white dark:bg-[#111318] border border-amber-300 dark:border-amber-500 text-amber-600 dark:text-amber-400 rounded px-2 py-0.5 text-[0.75rem] font-mono whitespace-nowrap shrink-0 bg-amber-50 dark:bg-[rgba(245,158,11,0.08)]">
                      M
                    </span>
                  </>
                )}
                {ri === 1 && (
                  <>
                    <div className="flex-2 h-px bg-gray-200 dark:bg-[#2a2d3a] flex-[2] min-w-8" />
                    <span className="bg-white dark:bg-[#111318] border border-gray-200 dark:border-[#2a2d3a] text-gray-600 dark:text-[#c8ccd8] rounded px-2 py-0.5 text-[0.75rem] font-mono whitespace-nowrap shrink-0">
                      U_f
                    </span>
                    <div className="flex-1 h-px bg-gray-200 dark:bg-[#2a2d3a] min-w-4" />
                    <span className="bg-white dark:bg-[#111318] border border-amber-300 dark:border-amber-500 text-amber-600 dark:text-amber-400 rounded px-2 py-0.5 text-[0.75rem] font-mono whitespace-nowrap shrink-0 bg-amber-50 dark:bg-[rgba(245,158,11,0.08)]">
                      M
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
            <span>f(x)=aˣmodM</span>
            <span>КПФ</span>
            <span>Измерение</span>
          </div>
        </div>
      </div>

      {result && (
        <div className="text-center">
          <div className="bg-emerald-50 dark:bg-[rgba(16,185,129,0.1)] border border-emerald-200 dark:border-[rgba(16,185,129,0.3)] rounded-xl px-6 py-3.5 text-[1.1rem] text-emerald-700 dark:text-emerald-400 mb-1.5 inline-block">
            Факторизация завершена:{" "}
            <strong>
              {M} = {result.p} × {result.q}
            </strong>
          </div>
          <p className="text-[0.85rem] text-gray-400 dark:text-[#7a7f94]">
            НОД(a<sup>{result.r / 2}</sup>+1, {M}) = {result.p}
            &nbsp;|&nbsp;НОД(a<sup>{result.r / 2}</sup>−1, {M}) = {result.q}
          </p>
        </div>
      )}
    </div>
  );
}
