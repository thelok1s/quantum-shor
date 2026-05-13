import {
  TabHadamard,
  TabInit,
  TabMain,
  TabMeasureX,
  TabMeasureY,
  TabPost,
  TabQFT,
  TabUf,
} from "@/components/tabs";
import { EASTER_EGG_ENABLED, useEasterEgg } from "@/hooks/useEasterEgg";
import { FactorResult } from "@/lib/quantum/contiunedFractions";
import runShor from "@/lib/quantum/main";
import { StageMap } from "@/types";
import { useEffect, useRef, useState } from "react";

interface AlgorithmWindowProps {
  M: number;
  onReset: () => void;
}

export default function AlgorithmWindow({ M, onReset }: AlgorithmWindowProps) {
  const [activeTab, setActiveTab] = useState("main");
  const [state, setState] = useState<StageMap>({});
  const [running, setRunning] = useState(true);
  const [steps, setSteps] = useState<string[]>([]);
  const stepsRef = useRef<string[]>([]);

  const easterEgg = useEasterEgg();

  function run() {
    setRunning(true);
    stepsRef.current = [];
    setSteps([]);
    setState({});
    setActiveTab("main");

    setTimeout(() => {
      try {
        const collected: StageMap = {};
        runShor(M, (progress) => {
          collected[progress.stage] = progress;
          stepsRef.current = [...stepsRef.current, progress.stage];
          setSteps([...stepsRef.current]);
          setState((s) => ({ ...s, ...collected }));
        });
        setState((s) => ({ ...s, ...collected, done: { stage: "done" } }));

        const failed = !!(collected.postprocess?.result as FactorResult | null)
          ?.failed;
        easterEgg.handleFailure(failed);
      } catch (e: unknown) {
        setState((s) => ({
          ...s,
          error: {
            stage: "error",
            message: e instanceof Error ? e.message : String(e),
          },
        }));
      }
      setRunning(false);
    }, 80);
  }

  useEffect(() => {
    run();
  }, [M]);

  const prep = state.prepare ?? {};
  const result = state.postprocess?.result as FactorResult | null | undefined;

  return (
    <div className="flex flex-1 min-h-0 h-[calc(100vh-56px)]">
      {/* Sidebar */}
      <aside className="w-[220px] shrink-0 bg-white dark:bg-[#111318] border-r border-gray-200 dark:border-[#2a2d3a] flex flex-col p-4 gap-4 overflow-y-auto">
        <div className="flex flex-col gap-0.5">
          <div className="text-[0.7rem] text-gray-400 dark:text-[#7a7f94] uppercase tracking-wide mt-2">
            Модуль
          </div>
          <div className="text-[1.8rem] text-accent-500 dark:text-accent-400 font-bold tracking-tighter leading-tight">
            {M}
          </div>

          {prep.a !== undefined && (
            <>
              <div className="text-[0.7rem] text-gray-400 dark:text-[#7a7f94] uppercase tracking-wide mt-2">
                Случайное a
              </div>
              <div className="text-[0.9rem] text-gray-900 dark:text-[#e8eaf0] font-semibold">
                {prep.a}
              </div>
            </>
          )}
          {prep.numQb !== undefined && (
            <>
              <div className="text-[0.7rem] text-gray-400 dark:text-[#7a7f94] uppercase tracking-wide mt-2">
                Кубитов (n)
              </div>
              <div className="text-[0.9rem] text-gray-900 dark:text-[#e8eaf0] font-semibold">
                {prep.numQb}
              </div>
            </>
          )}
          {prep.N !== undefined && (
            <>
              <div className="text-[0.7rem] text-gray-400 dark:text-[#7a7f94] uppercase tracking-wide mt-2">
                Состояний (N)
              </div>
              <div className="text-[0.9rem] text-gray-900 dark:text-[#e8eaf0] font-semibold">
                {prep.N}
              </div>
            </>
          )}
          {(state.postprocess?.m as number) > 0 && (
            <>
              <div className="text-[0.7rem] text-gray-400 dark:text-[#7a7f94] uppercase tracking-wide mt-2">
                Измерено m
              </div>
              <div className="text-[0.9rem] text-gray-900 dark:text-[#e8eaf0] font-semibold">
                {state.postprocess!.m}
              </div>
            </>
          )}
          {result && result.r > 0 && (
            <>
              <div className="text-[0.7rem] text-gray-400 dark:text-[#7a7f94] uppercase tracking-wide mt-2">
                Период r
              </div>
              <div className="text-[0.9rem] text-gray-900 dark:text-[#e8eaf0] font-semibold">
                {result.r}
              </div>
            </>
          )}
        </div>

        {result && !result.failed && result.r > 0 && (
          <div className="bg-emerald-50 dark:bg-[rgba(16,185,129,0.08)] border border-emerald-200 dark:border-[rgba(16,185,129,0.25)] rounded-xl p-3 text-center">
            <div className="text-[1.1rem] font-bold text-gray-900 dark:text-[#e8eaf0] tracking-tight">
              {M} ={" "}
              <span className="text-emerald-600 dark:text-emerald-400">
                {result.p}
              </span>{" "}
              ×{" "}
              <span className="text-cyan-600 dark:text-cyan-400">
                {result.q}
              </span>
            </div>
            <div className="text-[0.75rem] text-emerald-600 dark:text-emerald-400 mt-1">
              Факторизация найдена!
            </div>
          </div>
        )}
        {result && result.failed && (
          <div className="bg-amber-50 dark:bg-[rgba(245,158,11,0.08)] border border-amber-200 dark:border-[rgba(245,158,11,0.25)] rounded-xl p-3 text-center">
            <div className="text-[0.9rem] font-bold text-amber-700 dark:text-amber-400">
              ✗ Нечётный период
            </div>
            {result.oddR !== undefined && (
              <div className="text-[0.82rem] text-amber-600 dark:text-amber-500 mt-0.5 font-mono">
                r = {result.oddR}
              </div>
            )}
            <div className="text-[0.72rem] text-amber-500 dark:text-amber-600 mt-1">
              Запустите снова
            </div>
          </div>
        )}

        <div className="flex flex-col gap-1">
          <div className="text-[0.7rem] text-gray-400 dark:text-[#7a7f94] uppercase tracking-wide mb-1">
            Этапы выполнения
          </div>
          {Object.entries(STAGE_LABELS).map(([s, label], index) => {
            const done = steps.includes(s);
            return (
              <div
                key={s}
                className={`flex items-start gap-1.5 text-[0.75rem] leading-snug py-0.5 ${done ? "text-emerald-600 dark:text-emerald-400" : "text-gray-400 dark:text-[#7a7f94]"}`}
                style={{
                  animation: done
                    ? `fadeInProgressItem 250ms ease-out forwards`
                    : undefined,
                  animationDelay: done ? `${index * 50}ms` : undefined,
                }}
              >
                <span className="shrink-0 text-[0.7rem] mt-0.5">
                  {done ? "✓" : "○"}
                </span>
                <span>{label}</span>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-1.5 mt-auto">
          {/* Easter egg: floating fail-streak label above the button */}
          <div className="relative">
            {EASTER_EGG_ENABLED && easterEgg.burstKey > 0 && (
              <span
                key={easterEgg.burstKey}
                className="absolute bottom-full left-0 right-0 text-center font-semibold text-red-400 dark:text-red-400 pointer-events-none select-none pb-0.5"
                style={{
                  animation: "floatFail 1.6s ease-out forwards",
                  fontSize: `${16 + Math.log(easterEgg.burstStreakValue + 1) * 10}px`,
                }}
              >
                x{easterEgg.burstStreakValue} неудача!
              </span>
            )}
            <button
              className="w-full bg-accent-500 hover:bg-accent-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-[0.78rem] px-3 py-2 rounded-lg transition-colors overflow-hidden text-ellipsis whitespace-nowrap"
              onClick={() => run()}
              disabled={running}
            >
              {running ? "Выполняется..." : "Запустить снова (новое a)"}
            </button>
          </div>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Tabs */}
        <div className="flex overflow-x-auto scrollbar-none bg-white dark:bg-[#111318] border-b border-gray-200 dark:border-[#2a2d3a] shrink-0">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`shrink-0 rounded-none px-4 py-2.5 text-[0.8rem] font-medium border-b-2 whitespace-nowrap transition-colors ${
                activeTab === t.id
                  ? "text-accent-500 border-b-accent-500 bg-transparent dark:text-accent-400 dark:border-b-accent-400"
                  : "text-gray-400 dark:text-[#7a7f94] border-b-transparent hover:text-gray-700 dark:hover:text-[#c8ccd8] hover:bg-black/[0.02]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "main" && (
            <TabMain state={state} M={M} steps={steps} running={running} />
          )}
          {activeTab === "init" && <TabInit state={state} />}
          {activeTab === "hadamard" && <TabHadamard state={state} />}
          {activeTab === "uf" && <TabUf state={state} M={M} />}
          {activeTab === "measureY" && <TabMeasureY state={state} />}
          {activeTab === "qft" && <TabQFT state={state} />}
          {activeTab === "measureX" && <TabMeasureX state={state} />}
          {activeTab === "post" && <TabPost state={state} M={M} />}
        </div>
      </div>
    </div>
  );
}

const TABS = [
  { id: "main", label: "Обзор" },
  { id: "init", label: "0. Инициализация" },
  { id: "hadamard", label: "1. Адамар" },
  { id: "uf", label: "2. Возведение в степень" },
  { id: "measureY", label: "3. Измерение |y⟩" },
  { id: "qft", label: "4. КПФ" },
  { id: "measureX", label: "5. Измерение |x⟩" },
  { id: "post", label: "6. Постобработка" },
];

const STAGE_LABELS: Record<string, string> = {
  prepare: "Подготовка параметров",
  initialize: "Инициализация регистров",
  hadamard: "Преобразование Адамара",
  uf: "Функция Uf (a^x mod M)",
  measureY: "Измерение регистра |y⟩",
  qft: "Квантовое преобразование Фурье",
  measureX: "Измерение регистра |x⟩",
  postprocess: "Постобработка (метод дробей)",
};
