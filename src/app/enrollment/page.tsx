import { Metadata } from 'next';

import { AppIcon } from '@/components/app-icon';
import { Gradient } from '@/components/gradient';
import EnrollmentForm, { fetchDegreeList } from '@/features/enrollment';

export const metadata: Metadata = {
  title: 'Запись на приём в ДГМУ онлайн',
  description: 'Приёмная комиссия ДГМУ заботится о вашем времени. Выберите удобную дату — мы всё организуем',
};

export default async function Page() {
  const initialData = await fetchDegreeList();
  return (
    <main className="relative flex min-h-svh overflow-x-hidden">
      {/* Градиент снова будет виден, так как мы убрали bg-[#fafafa] с тега main */}
      <Gradient />

      {/* z-10 гарантирует, что контент будет находиться ПОВЕРХ всех размытых кругов градиента */}
      <div className="relative z-10 flex w-full flex-col items-center gap-8 px-4 py-6 sm:gap-12 sm:py-8">

        {/* Верхний блок: Иконка + Заголовок + Описание */}
        <div className="flex w-full max-w-2xl flex-col items-center text-center">

          {/* Иконка */}
          <div className="
            mb-6 flex size-16 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500 to-blue-700 shadow-xl ring-1 shadow-blue-500/10 ring-white/10 transition-transform duration-300
            hover:scale-105 sm:mb-8 sm:size-20
          "
          >
            <AppIcon
              width={40}
              height={40}
              className="object-cover"
            />
          </div>

          {/* Заголовок */}
          <h1 className="text-2xl/tight font-bold tracking-tight text-zinc-900 sm:text-3xl md:text-4xl">
            Без очередей и ожидания
          </h1>

          {/* Описание */}
          <p className="mx-auto mt-3 max-w-lg text-sm/relaxed font-medium text-zinc-500 sm:text-base">
            Приёмная комиссия ДГМУ заботится о вашем времени.
            {' '}
            <br className="hidden sm:inline" />
            Выберите удобную дату — мы всё организуем
          </p>
        </div>

        {/* Контейнер с формой/шагами */}
        <div className="w-full max-w-xl transition-all duration-300">
          <EnrollmentForm initialData={initialData} />
        </div>
      </div>
    </main>
  );
}
