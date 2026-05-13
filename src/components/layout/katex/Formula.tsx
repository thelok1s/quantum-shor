import katex from "katex";

export default function Formula({ math }: { math: string }) {
  const html = katex.renderToString(math, {
    displayMode: true,
    throwOnError: false,
    errorColor: "#f87171",
  });
  return (
    <div className="bg-accent-50 dark:bg-[rgba(0,179,161,0.07)] border border-accent-200 dark:border-[rgba(0,179,161,0.2)] rounded-lg px-5 py-3 mb-3 text-center overflow-x-auto text-accent-700 dark:text-[#66e7d8]">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
