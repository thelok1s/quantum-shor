export default function AboutModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-black/60 dark:bg-black/70 flex items-center justify-center z-[1000] p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-[#111318] border border-gray-200 dark:border-[#2a2d3a] rounded-2xl w-full max-w-[700px] max-h-[85vh] flex flex-col overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-[#2a2d3a] shrink-0">
          <h2 className="text-[1.05rem] font-semibold text-gray-900 dark:text-[#e8eaf0] m-0">
            Алгоритм Шора для факторизации чисел
          </h2>
          <button
            className="bg-gray-100 dark:bg-[#1a1c24] text-gray-400 dark:text-[#7a7f94] border border-gray-200 dark:border-[#2a2d3a] rounded-md w-7 h-7 flex items-center justify-center text-[0.8rem] shrink-0 hover:text-gray-700 dark:hover:text-[#e8eaf0] transition-colors"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-5 flex flex-col gap-3.5 text-[0.875rem] leading-7 text-gray-700 dark:text-[#c8ccd8]">
          <p>
            Суть алгоритма факторизации Шора заключается в сведении задачи
            факторизации к задаче поиска периода функции. Если период известен,
            то факторизацию можно осуществить с помощью алгоритма Евклида за
            полиномиальное время на классическом компьютере.
          </p>

          <p>
            Пусть имеется некоторое известное{" "}
            <em className="text-cyan-600 dark:text-cyan-400 not-italic">
              M = p × q
            </em>
            , где{" "}
            <em className="text-cyan-600 dark:text-cyan-400 not-italic">p</em> и{" "}
            <em className="text-cyan-600 dark:text-cyan-400 not-italic">q</em> –
            простые числа. Выберем число{" "}
            <em className="text-cyan-600 dark:text-cyan-400 not-italic">
              a {"<"} M
            </em>{" "}
            и определим функцию{" "}
            <em className="text-cyan-600 dark:text-cyan-400 not-italic">
              f<sub>a</sub>(x) = a<sup>x</sup> mod M
            </em>
            . При этом{" "}
            <em className="text-cyan-600 dark:text-cyan-400 not-italic">a</em> и{" "}
            <em className="text-cyan-600 dark:text-cyan-400 not-italic">M</em>{" "}
            должны быть взаимно простыми, НОД(a, M) = 1, иначе можно сразу
            получить множитель через алгоритм Евклида.
          </p>

          <p>
            Функция{" "}
            <em className="text-cyan-600 dark:text-cyan-400 not-italic">
              f<sub>a</sub>(x) = a<sup>x</sup> mod M
            </em>{" "}
            является периодической. Мы определяем её период{" "}
            <em className="text-cyan-600 dark:text-cyan-400 not-italic">r</em>{" "}
            как порядок числа{" "}
            <em className="text-cyan-600 dark:text-cyan-400 not-italic">a</em> в
            кольце Z<sub>M</sub>: a<sup>r</sup> = 1 (mod M).
          </p>

          <h3 className="text-[0.95rem] font-semibold text-indigo-500 mt-2">
            Пример факторизации M = 21
          </h3>
          <p>
            Рассмотрим пример со случайным{" "}
            <em className="text-cyan-600 dark:text-cyan-400 not-italic">
              a = 2
            </em>
            , НОД(2, 21) = 1. Найдём период функции{" "}
            <em className="text-cyan-600 dark:text-cyan-400 not-italic">
              f<sub>2</sub>(x) = 2<sup>x</sup> mod 21
            </em>
            :
          </p>

          <div className="overflow-x-auto">
            <table className="border-collapse text-[0.8rem] font-mono w-full">
              <thead>
                <tr>
                  {[0, 1, 2, 3, 4, 5, 6].map((x) => (
                    <th
                      key={x}
                      className="border border-gray-200 dark:border-[#2a2d3a] px-3 py-1.5 text-center bg-gray-100 dark:bg-[#1a1c24] text-gray-500 dark:text-[#7a7f94]"
                    >
                      x = {x}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {[0, 1, 2, 3, 4, 5, 6].map((x) => {
                    let v = 1;
                    for (let i = 0; i < x; i++) v = (v * 2) % 21;
                    return (
                      <td
                        key={x}
                        className="border border-gray-200 dark:border-[#2a2d3a] px-3 py-1.5 text-center text-cyan-600 dark:text-cyan-400"
                      >
                        {v}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            Из таблицы видно, что период повторения функции{" "}
            <em className="text-cyan-600 dark:text-cyan-400 not-italic">
              r = 6
            </em>
            . Поскольку{" "}
            <em className="text-cyan-600 dark:text-cyan-400 not-italic">r</em>{" "}
            чётное, можно представить{" "}
            <em className="text-cyan-600 dark:text-cyan-400 not-italic">
              r = 2k
            </em>
            . Тогда:
          </p>
          <ul className="pl-6 flex flex-col gap-1">
            <li>
              p = НОД(a<sup>k</sup>+1, M) = НОД(2<sup>3</sup>+1, 21) = НОД(9,
              21) = <strong>3</strong>
            </li>
            <li>
              q = НОД(a<sup>k</sup>−1, M) = НОД(2<sup>3</sup>−1, 21) = НОД(7,
              21) = <strong>7</strong>
            </li>
          </ul>
          <p>Проверяем: 3 × 7 = 21 = M ✓</p>

          <h3 className="text-[0.95rem] font-semibold text-indigo-500 mt-2">
            Квантовое ускорение
          </h3>
          <p>
            Квантовые вычисления позволяют выполнить поиск периода за один шаг
            за счёт суперпозиции и квантового преобразования Фурье. Классический
            алгоритм потребовал бы O(M) операций, тогда как квантовый алгоритм
            Шора работает за O(log²M × log log M).
          </p>

          <div className="text-[0.75rem] text-gray-400 dark:text-[#7a7f94] border-t border-gray-200 dark:border-[#2a2d3a] pt-3 mt-2">
            Симулятор создан в учебных целях. Квантовая часть основана на
            jQuantum (de Vries).
          </div>
        </div>
      </div>
    </div>
  );
}
