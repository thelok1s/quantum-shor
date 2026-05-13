import AppLogo from "@/components/ui/AppLogo";
import { validateInput } from "@/lib/quantum/main";
import {
  IconAlertTriangle,
  IconAtom,
  IconInfoSquareRounded,
  IconMathXDivideY2,
  IconMatrix,
  IconWaveSine,
} from "@tabler/icons-react";
import { useState } from "react";

export default function StartScreen({
  onFactorize,
}: {
  onFactorize: (M: number) => void;
}) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    const v = value.trim();
    const { valid, error: err } = validateInput(v);
    if (!valid) {
      setError(err ?? "");
      return;
    }
    onFactorize(parseInt(v, 10));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
    setError("");
  }

  function handleExample(n: number) {
    setValue(String(n));
    setError("");
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 gap-8 relative overflow-hidden">
      {/* Glow — dark only */}
      <div
        className="hidden dark:block absolute top-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(0,179,161,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Main card */}
      <div className="bg-white dark:bg-[#111318] border border-gray-200 dark:border-[#2a2d3a] rounded-2xl p-10  max-w-[700px] w-full text-center shadow-sm">
        <AppLogo size={40} className="mb-4 mx-auto" />
        <h1 className="text-[1.75rem] font-semibold text-gray-900 dark:text-[#e8eaf0] mb-3 tracking-tight leading-tight">
          Симулятор квантового
          <br />
          алгоритма Шора
        </h1>
        <p className="text-gray-500 dark:text-[#7a7f94] mb-6 text-[0.9rem] leading-relaxed">
          Пошаговая визуализация квантовой факторизации целых чисел. Введите
          двузначное число — произведение двух различных простых чисел.
        </p>

        {/* Info box */}
        <div className="bg-accent-50 dark:bg-[rgba(0,179,161,0.07)] border border-accent-200 dark:border-[rgba(0,179,161,0.2)] rounded-xl p-4 text-left mb-6 text-[0.875rem] leading-7">
          <div className="flex gap-4 items-start">
            <IconInfoSquareRounded className="text-accent-500 my-auto" />
            <div className="text-gray-700 dark:text-[#c8ccd8]">
              <strong>Инструкция:</strong> введите натуральное двузначное число,
              <br />
              являющееся произведением двух различных простых чисел.
              <br />
              Например:{" "}
              <span className="text-cyan-600 dark:text-cyan-400 font-semibold">
                15 = 3 × 5
              </span>
              ,{" "}
              <span className="text-cyan-600 dark:text-cyan-400 font-semibold">
                21 = 3 × 7
              </span>
              ,{" "}
              <span className="text-cyan-600 dark:text-cyan-400 font-semibold">
                35 = 5 × 7
              </span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          className="flex flex-col text-left mb-5 gap-1"
          onSubmit={handleSubmit}
        >
          <label className="block text-gray-400 dark:text-[#7a7f94] text-[0.8rem] uppercase tracking-wide">
            Хочу узнать разложение числа
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              min="10"
              max="99"
              className="flex-1 text-[1.1rem] px-3.5 py-2.5 bg-gray-100 dark:bg-[#1a1c24] border border-gray-200 dark:border-[#2a2d3a] rounded-lg text-gray-900 dark:text-[#e8eaf0] outline-none focus:border-accent-500 transition-colors min-w-0"
              placeholder="ваше число.."
              value={value}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="bg-accent-500 hover:bg-accent-600 text-white font-semibold px-5 py-2.5 rounded-lg text-[0.9rem] whitespace-nowrap transition-colors"
            >
              Факторизовать!
            </button>
          </div>
          {error && (
            <div className=" text-amber-500 text-[0.85rem] flex flex-row gap-2">
              {" "}
              <IconAlertTriangle size={12} className="my-auto" />
              {error}
            </div>
          )}
        </form>

        <div className="flex items-center gap-3 flex-wrap justify-center">
          <span className="text-gray-400 dark:text-[#7a7f94] text-[0.8rem]">
            Примеры:
          </span>
          <div className="flex flex-wrap gap-1.5 justify-center">
            {EXAMPLES.map((n) => (
              <button
                key={n}
                type="button"
                className="bg-gray-100 dark:bg-[#1a1c24] border border-gray-200 dark:border-[#2a2d3a] text-gray-700 dark:text-[#c8ccd8] rounded-full px-2.5 py-0.5 text-[0.8rem] hover:bg-accent-50 dark:hover:bg-[rgba(0,179,161,0.15)] hover:border-accent-300 dark:hover:border-accent-500 transition-all"
                onClick={() => handleExample(n)}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 max-w-[700px] w-full max-[700px]:grid-cols-2">
        {[
          {
            icon: <IconAtom className="mx-auto" size={32} />,
            title: "Квантовые регистры",
            desc: "Визуализация вероятностных амплитуд |x⟩ и |y⟩",
          },
          {
            icon: <IconMatrix className="mx-auto" size={32} />,
            title: "Преобразование Адамара",
            desc: "Создание равновероятной суперпозиции состояний",
          },
          {
            icon: <IconWaveSine className="mx-auto" size={32} />,
            title: "КПФ",
            desc: "Квантовое преобразование Фурье для поиска периода",
          },
          {
            icon: <IconMathXDivideY2 className="mx-auto" size={32} />,
            title: "Метод дробей",
            desc: "Классическая постобработка непрерывными дробями",
          },
        ].map((f) => (
          <div
            key={f.title}
            className="bg-white dark:bg-[#111318] border border-gray-200 dark:border-[#2a2d3a] rounded-xl p-5 text-center shadow-sm"
          >
            <span className="text-[1.6rem] block mb-2">{f.icon}</span>
            <h3 className="text-[0.85rem] font-semibold text-gray-900 dark:text-[#e8eaf0] mb-1">
              {f.title}
            </h3>
            <p className="text-[0.78rem] text-gray-500 dark:text-[#7a7f94] leading-relaxed">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const EXAMPLES = [15, 21, 35, 33, 55, 65, 77, 85, 91, 95];
