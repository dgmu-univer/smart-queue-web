import { Loader2 } from 'lucide-react';

export default function TabLoadingFallback({ title = 'Загрузка данных...' }: { title?: string }) {
  return (
    <div className="flex h-112.5 w-full flex-col items-center justify-center gap-2 bg-white p-6">
      <Loader2 className="size-8 animate-spin text-slate-700" />
      <p className="animate-pulse text-sm font-medium text-slate-500">
        {title}
      </p>
    </div>
  );
}
