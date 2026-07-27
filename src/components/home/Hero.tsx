import Image from "next/image";
import Link from "next/link";
import { IconChevronDown } from "@/components/icons";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink">
      <Image
        src="/images/hero-warsaw.webp"
        alt="Panorama nocnej Warszawy widziana z tarasu apartamentu hotelowego"
        fill
        priority
        sizes="100vw"
        className="object-cover object-bottom"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-ink/40" />

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-24 pt-40 sm:px-8 sm:pb-32">
        <p className="text-[13px] uppercase tracking-[0.3em] text-gold">
          Warszawa · Śródmieście
        </p>
        <h1 className="mt-6 max-w-3xl font-display text-4xl leading-[1.1] text-ivory sm:text-6xl">
          Prywatna rezydencja hotelowa z&nbsp;salonem gier w&nbsp;duchu dawnego
          Las Vegas
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory/75 sm:text-lg">
          Apartamenty premium, autorska kuchnia, spa z widokiem na miasto oraz
          ekskluzywny, prywatny salon gier karcianych — wszystko w jednym
          adresie w sercu Warszawy. Wyłącznie dla gości pełnoletnich.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/rezerwacja"
            className="inline-flex items-center bg-gold px-7 py-3.5 text-[13px] uppercase tracking-[0.16em] text-ink transition-colors hover:bg-gold-light"
          >
            Zarezerwuj pobyt
          </Link>
          <Link
            href="/#salon-gier"
            className="inline-flex items-center border border-ivory/30 px-7 py-3.5 text-[13px] uppercase tracking-[0.16em] text-ivory transition-colors hover:border-gold hover:text-gold"
          >
            Poznaj salon gier
          </Link>
        </div>

        <div className="mt-8 inline-flex items-center gap-2 border border-ivory/15 px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-ivory/60">
          Treści przeznaczone wyłącznie dla osób pełnoletnich (18+)
        </div>
      </div>

      <a
        href="#status"
        aria-label="Przewiń do statusu dostępności"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 animate-bounce text-gold/80 sm:block"
      >
        <IconChevronDown className="h-6 w-6" />
      </a>
    </section>
  );
}
