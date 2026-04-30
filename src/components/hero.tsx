import Link from "next/link";

import { ArrowUpRight, CirclePlay } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="flex min-h-screen items-center justify-center overflow-hidden">
      <div className="mx-auto grid w-full max-w-(--breakpoint-xl) gap-12 px-6 py-12 lg:grid-cols-2 lg:py-0">
        <canvas
          className="absolute inset-0 -z-10 h-full w-full"
          width="1570"
          height="694"
        ></canvas>
        <div className="to-background absolute top-0 right-0 left-0 -z-10 h-[80vh] bg-gradient-to-b from-transparent via-transparent"></div>
        <div className="my-auto">
          <Badge
            asChild
            className="border-border rounded-full py-1"
            variant="secondary"
          >
            <Link href="#">
              Документы <ArrowUpRight className="ml-1 size-4" />
            </Link>
          </Badge>
          <h1 className="mt-6 max-w-[17ch] text-4xl leading-[1.2]! font-medium tracking-[-0.04em] md:text-5xl lg:text-[2.75rem] xl:text-[3.25rem]">
            Запишитесь в приёмную комиссию
            <br /> ДГМУ онлайн
          </h1>
          <p className="text-foreground/60 mt-4 max-w-[60ch] text-lg sm:mt-6 sm:text-xl/normal">
            Никаких очередей. Выберите дату и время визита за 2 минуты.
            Официальная запись абитуриентов Дагестанского государственного
            медицинского университета.
          </p>
          <div className="mt-8 flex items-center gap-4 sm:mt-12">
            <Button className="rounded-full text-base" size="lg">
              Записаться <ArrowUpRight className="h-5! w-5!" />
            </Button>
          </div>
        </div>
        <div className="bg-accent aspect-video w-full rounded-xl lg:aspect-auto lg:h-screen lg:w-[1000px] lg:rounded-none" />
      </div>
    </div>
  );
}
