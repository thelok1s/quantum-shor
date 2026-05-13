import katex from "katex";

export default function IK({ math }: { math: string }) {
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: katex.renderToString(math, {
          displayMode: false,
          throwOnError: false,
          output: "html",
        }),
      }}
    />
  );
}
