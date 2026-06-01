export default function FieldHint({ children, hint }: { children: React.ReactNode, hint?: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-24">
        {children}
      </div>
      -
      <span>{hint}</span>
    </div>
  );
}
