export default function SectionHeader({
  title,
  children,
}: {
  title?: string;
  children?: React.ReactNode;
}) {
  return (
    <h2 className="text-[1.05rem] text-gray-700 dark:text-[#c8ccd8] font-semibold mb-4 pb-2 border-b border-gray-200 dark:border-[#2a2d3a]">
      {children ?? title}
    </h2>
  );
}
