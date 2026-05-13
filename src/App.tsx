import AlgorithmScreen from "@/components/screen/AlgorithmScreen";
import StartScreen from "@/components/screen/StartScreen";
import AboutModal from "@/components/ui/AboutModal";
import AppLogo from "@/components/ui/AppLogo";
import { ThemeContext } from "@/lib/ThemeContext";
import {
  IconBrandGithub,
  IconMoonFilled,
  IconSunHigh,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

const getInitialTheme = () => {
  const stored = localStorage.getItem("theme");
  if (stored) return stored === "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

export default function App() {
  const [screen, setScreen] = useState<"start" | "algorithm">("start");
  const [moduleM, setModuleM] = useState<number | null>(null);
  const [showAbout, setShowAbout] = useState(false);
  const [isDark, setIsDark] = useState(() => getInitialTheme());

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  function handleFactorize(M: number) {
    setModuleM(M);
    setScreen("algorithm");
  }

  function handleReset() {
    setModuleM(null);
    setScreen("start");
  }

  return (
    <ThemeContext.Provider value={isDark}>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-[#0a0b0f] text-gray-700 dark:text-[#c8ccd8]">
        <header className="flex items-center justify-between px-6 h-14 bg-white dark:bg-[#111318] border-b border-gray-200 dark:border-[#2a2d3a] shrink-0">
          <div className="flex items-center gap-3">
            <AppLogo size={32} />
            <span className="text-[1rem] font-semibold text-gray-900 dark:text-[#e8eaf0] tracking-tight">
              Алгоритм Шора
            </span>
          </div>
          <nav className="flex gap-2 items-center">
            {screen === "algorithm" && (
              <button
                className="bg-gray-100 h-8 dark:bg-[#1a1c24] text-gray-700 dark:text-[#c8ccd8] border border-gray-200 dark:border-[#2a2d3a] rounded-md px-3  text-[0.82rem] hover:bg-gray-200 dark:hover:bg-[#2a2d3a] transition-colors"
                onClick={handleReset}
              >
                ← Новое число
              </button>
            )}
            <button
              className=" bg-gray-100 h-8 dark:bg-[#1a1c24] text-gray-700 dark:text-[#c8ccd8] border border-gray-200 dark:border-[#2a2d3a] rounded-md px-3  text-[0.82rem] hover:bg-gray-200 dark:hover:bg-[#2a2d3a] transition-colors"
              onClick={() => setShowAbout(true)}
            >
              Об алгоритме
            </button>
            <a
              title="source code"
              href="https://github.com/thelok1s/quantum-shor"
              className=" bg-gray-100 dark:bg-[#1a1c24] text-gray-700 dark:text-[#c8ccd8] border border-gray-200 dark:border-[#2a2d3a] rounded-md w-8 h-8 flex items-center justify-center text-base hover:bg-gray-200 dark:hover:bg-[#2a2d3a] transition-colors"
            >
              <IconBrandGithub size={20} />
            </a>
            <button
              title={isDark ? "Светлая тема" : "Тёмная тема"}
              onClick={() => setIsDark((d) => !d)}
              className=" bg-gray-100 dark:bg-[#1a1c24] text-gray-700 dark:text-[#c8ccd8] border border-gray-200 dark:border-[#2a2d3a] rounded-md w-8 h-8 flex items-center justify-center text-base hover:bg-gray-200 dark:hover:bg-[#2a2d3a] transition-colors"
            >
              {isDark ? (
                <IconSunHigh size={20} />
              ) : (
                <IconMoonFilled size={20} />
              )}
            </button>
          </nav>
        </header>

        <main className="flex-1 flex flex-col">
          {screen === "start" ? (
            <StartScreen onFactorize={handleFactorize} />
          ) : (
            <AlgorithmScreen M={moduleM!} onReset={handleReset} />
          )}
        </main>

        {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
      </div>
    </ThemeContext.Provider>
  );
}
