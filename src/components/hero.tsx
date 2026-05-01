// import { ArrowUpRight } from 'lucide-react'

export default function Hero() {
  return (
    <div className="flex min-h-screen items-center justify-center overflow-hidden">
      <div className="mx-auto grid w-full max-w-(--breakpoint-xl) gap-12 px-6 py-12 lg:grid-cols-2 lg:py-0">
        <canvas
          className="absolute inset-0 -z-10 size-full"
          width="1570"
          height="694"
        >
        </canvas>
        <div className="my-auto">
          {/* <Badge
            asChild
            className="border-border rounded-full py-1"
            variant="secondary"
          >
            <Link href="#">
              Документы
              {' '}
              <ArrowUpRight className="ml-1 size-4" />
            </Link>
          </Badge> */}
          <h1 className="mt-6 max-w-[17ch] text-4xl leading-[1.2]! font-medium tracking-[-0.04em] md:text-5xl lg:text-[2.75rem] xl:text-[3.25rem]">
            Запишитесь в приёмную комиссию
            <br />
            {' '}
            ДГМУ онлайн
          </h1>
          <p className="mt-4 max-w-[60ch] bg-sky-500 text-lg sm:mt-6 sm:text-xl/normal">
            Никаких очередей. Выберите дату и время визита за 2 минуты.
            Официальная запись абитуриентов Дагестанского государственного
            медицинского университета.
          </p>
          <div className="mt-8 flex items-center gap-4 sm:mt-12">
            { /* <Button className="rounded-full text-base" size="lg">
              Записаться
              {' '}
              <ArrowUpRight className="size-5!" />
            </Button> */ }
          </div>
        </div>
        <div className="bg-accent aspect-video w-full rounded-xl lg:aspect-auto lg:h-screen lg:w-250 lg:rounded-none" />
      </div>
    </div>
  );
}
