export default function Formula({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-indigo-50 dark:bg-[rgba(99,102,241,0.07)] border border-indigo-200 dark:border-[rgba(99,102,241,0.2)] rounded-lg px-5 py-3 font-serif text-[0.95rem] text-indigo-700 dark:text-[#c8d0ff] mb-3 text-center">
      {children}
    </div>
  );
}
