import { AppIcon } from '@/components/app-icon';
import { Gradient } from '@/components/gradient';
import { type DegreeProgramsResponse } from '@/features/appointments';
import AppointmentsSteps from '@/features/appointments/appointments-steps';
import { api } from '@/lib/api';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Приёмная комиссия ДГМУ → Запись в очередь',
  description: 'Приёмная комиссия ДГМУ заботится о вашем времени. Выберите удобную дату — мы всё организуем',
};

export async function getPublicDegreePrograms(): Promise<DegreeProgramsResponse> {
  return await api<DegreeProgramsResponse>('/public/degree-programs')
}

export default async function Page() {
  const initialData = await getPublicDegreePrograms();
  return (
    <main className="relative flex min-h-svh overflow-x-hidden">
      {/* Градиент снова будет виден, так как мы убрали bg-[#fafafa] с тега main */}
      <Gradient />
      
      {/* z-10 гарантирует, что контент будет находиться ПОВЕРХ всех размытых кругов градиента */}
      <div className="relative flex w-full flex-col items-center px-4 py-6 sm:py-8 gap-8 sm:gap-12 z-10">
        
        {/* Верхний блок: Иконка + Заголовок + Описание */}
        <div className="flex flex-col items-center text-center w-full max-w-2xl">
          
          {/* Иконка */}
          <div className="flex size-16 sm:size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-xl shadow-blue-500/10 ring-1 ring-white/10 mb-6 sm:mb-8 transition-transform hover:scale-105 duration-300">
            <AppIcon
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
    
          {/* Заголовок */}
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl md:text-4xl leading-tight">
            Без очередей и ожидания
          </h1>
          
          {/* Описание */}
          <p className="mt-3 text-sm sm:text-base text-zinc-500 max-w-lg mx-auto font-medium leading-relaxed">
            Приёмная комиссия ДГМУ заботится о вашем времени. <br className="hidden sm:inline" />
            Выберите удобную дату — мы всё организуем
          </p>
        </div>
        
        {/* Контейнер с формой/шагами */}
        <div className="w-full max-w-xl transition-all duration-300">
          <AppointmentsSteps initialData={initialData} />
        </div>
      </div>
    </main>
  );
}
