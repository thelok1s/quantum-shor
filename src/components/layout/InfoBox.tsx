export default function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-100 dark:bg-[#1a1c24] border border-gray-200 dark:border-[#2a2d3a] rounded-lg p-3.5 text-[0.85rem] text-gray-700 dark:text-[#c8ccd8] mb-3 leading-7">
      {children}
    </div>
  );
}
