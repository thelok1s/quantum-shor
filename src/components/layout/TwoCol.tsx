export default function TwoCol({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[1fr_auto] gap-5 mb-4 items-start">
      {children}
    </div>
  );
}
