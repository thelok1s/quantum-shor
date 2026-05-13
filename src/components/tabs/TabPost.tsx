import InfoBox from "@/components/layout/InfoBox";
import Formula from "@/components/layout/katex/Formula";
import IK from "@/components/layout/katex/IK";
import SectionHeader from "@/components/layout/SectionHeader";
import { FactorResult } from "@/lib/quantum/contiunedFractions";
import { StageMap } from "@/types";

export default function TabPost({ state, M }: { state: StageMap; M: number }) {
  const d = state.postprocess;
  if (!d?.m)
    return (
      <div className="text-gray-400 dark:text-[#7a7f94] text-[0.9rem] p-8 text-center">
        Ожидание результатов измерения…
      </div>
    );

  const {
    m,
    N,
    a,
    coeffs = [],
    numerators = [],
    denominators = [],
    result,
  } = d as {
    m: number;
    N: number;
    a: number;
    coeffs: number[];
    numerators: number[];
    denominators: number[];
    result: FactorResult | null;
  };

  return (
    <div>
      <SectionHeader title="Постобработка — метод непрерывной дроби" />
      <div className="grid grid-cols-2 gap-3 mb-3">
        <InfoBox>
          <p>
            Измерение квантового регистра |x⟩ дало целое число m ={" "}
            <strong>{m}</strong>. Классический компьютер разлагает дробь m/N ={" "}
            {m}/{N} в непрерывную дробь, чтобы найти знаменатели — кандидатов на
            роль периода r.
          </p>
        </InfoBox>
        <InfoBox>
          <p>
            Метод непрерывной дроби позволяет находить хорошие рациональные
            приближения p/q вещественного числа. Вычисляем разложение m/N ≈ k/r:
          </p>
        </InfoBox>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <Formula
          math={`\\dfrac{${m}}{${N}} = [a_0;\\, a_1,\\, a_2,\\, \\ldots]`}
        />
        <Formula math="[a_0;\, a_1, \ldots, a_n] = a_0 + \cfrac{1}{a_1 + \cfrac{1}{a_2 + \cdots}}" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-100 dark:bg-[#1a1c24] border border-gray-200 dark:border-[#2a2d3a] rounded-xl p-4 overflow-y-auto max-h-80">
          <div className="text-[0.78rem] text-gray-400 dark:text-[#7a7f94] uppercase tracking-wide mb-3 pb-2 border-b border-gray-200 dark:border-[#2a2d3a]">
            Разложение m/N = {m}/{N} в непрерывную дробь
          </div>
          {coeffs.map((c, i) => (
            <div
              key={i}
              className="grid grid-cols-[100px_100px_1fr] gap-2 items-center py-1.5 border-b border-black/[0.04] dark:border-white/[0.04] text-[0.82rem]"
            >
              <span className="text-gray-400 dark:text-[#7a7f94] font-mono">
                a({i}) = {c}
              </span>
              <span className="text-cyan-600 dark:text-cyan-400 font-mono font-semibold">
                {numerators[i]}/{denominators[i]}
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 text-[0.75rem]">
                {denominators[i] < M && denominators[i] > 0
                  ? `r = ${denominators[i]} — кандидат`
                  : ""}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-gray-100 dark:bg-[#1a1c24] border border-gray-200 dark:border-[#2a2d3a] rounded-xl p-4 overflow-y-auto max-h-80">
          <div className="text-[0.78rem] text-gray-400 dark:text-[#7a7f94] uppercase tracking-wide mb-3 pb-2 border-b border-gray-200 dark:border-[#2a2d3a]">
            Поиск множителей
          </div>

          {result && result.failed ? (
            <div className="flex flex-col gap-3 mt-1">
              <div className="bg-amber-50 dark:bg-[rgba(245,158,11,0.1)] border border-amber-200 dark:border-[rgba(245,158,11,0.3)] rounded-lg p-3 text-amber-700 dark:text-amber-400 text-center">
                <div className="font-bold text-[1rem] mb-1">
                  ✗ Факторизация не удалась
                </div>
                {result.oddR && (
                  <div className="text-[0.82rem] mb-1">
                    Найденный период <IK math={`r = ${result.oddR}`} /> —
                    нечётный
                  </div>
                )}
              </div>
              <p className="text-[0.82rem] text-gray-600 dark:text-[#c8ccd8] leading-relaxed">
                Алгоритм Шора требует <strong>чётного</strong> периода r. При
                нечётном r формула <IK math="\gcd(a^{r/2}\pm1,\, M)" />{" "}
                неприменима — <IK math="a^{r/2}" /> даёт нецелое значение.
              </p>
              <p className="text-[0.82rem] text-amber-600 dark:text-amber-500">
                Нажмите «Запустить снова» — будет выбрано другое случайное
                основание a.
              </p>
            </div>
          ) : result && result.r > 0 ? (
            <>
              {[
                <>
                  <IK math={`r = ${result.r}`} />
                </>,
                <>
                  <IK math={`k = r/2 = ${result.r / 2}`} />
                </>,
                <>
                  <IK math={`a = ${a}`} />
                </>,
                <>
                  <IK
                    math={`p = \\gcd(${a}^{${result.r / 2}}+1,\\,${M}) = ${result.p}`}
                  />
                </>,
                <>
                  <IK
                    math={`q = \\gcd(${a}^{${result.r / 2}}-1,\\,${M}) = ${result.q}`}
                  />
                </>,
              ].map((content, i) => (
                <div
                  key={i}
                  className="text-[0.85rem] text-gray-700 dark:text-[#c8ccd8] py-1.5 border-b border-black/[0.04] dark:border-white/[0.04]"
                >
                  {content}
                </div>
              ))}
              <div className="mt-4 bg-emerald-50 dark:bg-[rgba(16,185,129,0.1)] border border-emerald-200 dark:border-[rgba(16,185,129,0.3)] rounded-lg p-3 text-emerald-700 dark:text-emerald-400 font-bold text-[1.05rem] text-center">
                ✓ &nbsp; <IK math={`${M} = ${result.p} \\times ${result.q}`} />
              </div>
            </>
          ) : (
            <div className="text-gray-400 dark:text-[#7a7f94] text-[0.85rem] mt-2">
              Подходящий период не найден.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
