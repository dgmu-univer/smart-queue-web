export default function PageSpinner() {
  return (
    <div className="bg-background mt-10 flex min-h-screen items-start justify-center">
      <div className="relative flex flex-col items-center">
        {/* Концентрические круги */}
        <div className="relative size-16">
          <div className="absolute inset-0 rounded-full border-2 border-blue-600/20" />
          <div className="absolute inset-0 animate-spin rounded-full border-t-2 border-blue-600" />
          <div className="animate-spin-slow absolute inset-2 rounded-full border-r-2 border-blue-600/60" />
          <div className="animate-spin-slower absolute inset-4 rounded-full border-b-2 border-blue-600/30" />
        </div>

        {/* Текст */}
        <p className="text-muted-foreground mt-6 animate-pulse text-sm">
          Загрузка контента...
        </p>

        {/* Прогресс-бар */}
        <div className="bg-secondary mt-4 h-1 w-32 overflow-hidden rounded-full">
          <div className="animate-shimmer h-full w-1/2 rounded-full bg-blue-600" />
        </div>
      </div>
    </div>
  );
}
