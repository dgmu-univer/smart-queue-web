import Image from 'next/image';
import { Star, StarHalf } from 'lucide-react';

export function SocialProof() {
  return (
    <section className="mx-auto w-full max-w-3xl px-5 pb-16 sm:pb-24">
      {/* Divider */}
      <div className="bg-border/70 mx-auto h-px w-full max-w-md" />

      <div className="mt-8 flex flex-col items-center gap-5 text-center">
        <p className="text-foreground text-sm sm:text-[15px]">
          <span className="font-semibold">90 лет опыта </span>
          {' '}
          <span className="text-muted-foreground">в подготовке медицинских кадров высшей квалификации</span>
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
          {/* Avatar stack */}
          <div className="flex -space-x-2">
            {/* {avatars.map(a => (
              <Image
                key={a.src}
                src={a.src || '/placeholder.svg'}
                alt={a.alt}
                width={36}
                height={36}
                className="ring-background size-9 rounded-full object-cover ring-2"
              />
            ))} */}
            <Image
              src="/avatars/Minzdrav.jpg"
              alt=""
              width={240}
              height={80}
              className="ring-background object-cover ring-2"
            />
          </div>

          {/* Rating */}
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <div className="flex items-center gap-1.5">
              <div className="flex" aria-label="Rated 5.0 out of 5">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                ))}
                <StarHalf className="size-4 fill-amber-400 text-amber-400" aria-hidden="true" />
              </div>
              <span className="text-foreground text-sm font-semibold">4.9 из 5.0</span>
            </div>
            <p className="text-muted-foreground text-xs">Лицензия и аккредитация Минздрава РФ</p>
          </div>
        </div>
      </div>
    </section>
  );
}
