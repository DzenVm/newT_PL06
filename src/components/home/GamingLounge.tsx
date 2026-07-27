import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { IconCards, IconShield, IconUsers } from "@/components/icons";

const schedule = [
  { day: "Wtorek", session: "Turniej kwalifikacyjny Texas Hold'em", start: "20:00" },
  { day: "Czwartek", session: "Turniej kwalifikacyjny Texas Hold'em", start: "20:00" },
  { day: "Sobota", session: "Turniej kwalifikacyjny Texas Hold'em", start: "20:00" },
  { day: "Pozostałe dni", session: "Gry cash przy stołach prywatnych", start: "19:00" },
];

export function GamingLounge() {
  return (
    <section id="salon-gier" className="border-t border-gold-deep/20 bg-ink-2">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <Reveal>
              <p className="text-[13px] uppercase tracking-[0.3em] text-gold">Kasyno Hotel · 18+</p>
              <h2 className="mt-4 font-display text-3xl text-ivory sm:text-4xl">
                Kasyno hotelowe i prywatny salon gier karcianych w klimacie dawnego Las Vegas
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-ivory/65">
                Kameralna sala z klasycznymi stołami do pokera, aksamitnymi
                zasłonami, mosiężnymi żyrandolami i muzyką na żywo w weekendy.
                Nasze kasyno hotelowe działa jako prywatny, licencjonowany
                obszar hotelu, dostępny wyłącznie dla gości pełnoletnich,
                zgodnie z polskim prawem regulującym urządzanie gier
                hazardowych. Szczegóły licencji obiektu dostępne są na
                miejscu, w recepcji.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <Reveal delay={60}>
                <IconCards className="h-7 w-7 text-gold" />
                <h3 className="mt-4 font-display text-lg text-ivory">Profesjonalna obsługa stołów</h3>
                <p className="mt-2 text-sm leading-relaxed text-ivory/60">
                  Licencjonowani krupierzy, oficjalny regulamin gry oraz stały
                  nadzór nad prawidłowym przebiegiem rozgrywki.
                </p>
              </Reveal>
              <Reveal delay={120}>
                <IconUsers className="h-7 w-7 text-gold" />
                <h3 className="mt-4 font-display text-lg text-ivory">Dress code i rezerwacja miejsc</h3>
                <p className="mt-2 text-sm leading-relaxed text-ivory/60">
                  Obowiązuje elegancki strój wieczorowy. Liczba miejsc przy
                  stołach jest ograniczona — rekomendujemy wcześniejsze
                  zgłoszenie przez formularz rezerwacji.
                </p>
              </Reveal>
            </div>

            <Reveal delay={160} className="mt-10 overflow-hidden border border-gold-deep/30">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-ink text-[11px] uppercase tracking-[0.14em] text-gold">
                    <th className="px-4 py-3 font-normal">Dzień</th>
                    <th className="px-4 py-3 font-normal">Sesja</th>
                    <th className="px-4 py-3 font-normal">Start</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((row) => (
                    <tr key={row.day} className="border-t border-white/5 text-ivory/70">
                      <td className="px-4 py-3">{row.day}</td>
                      <td className="px-4 py-3">{row.session}</td>
                      <td className="px-4 py-3 text-gold">{row.start}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Reveal>

            <Reveal delay={200} className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/rezerwacja"
                className="inline-flex items-center bg-gold px-6 py-3 text-[13px] uppercase tracking-[0.16em] text-ink transition-colors hover:bg-gold-light"
              >
                Zgłoś udział
              </Link>
              <Link
                href="/odpowiedzialna-gra"
                className="inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.14em] text-ivory/60 transition-colors hover:text-gold"
              >
                <IconShield className="h-4 w-4" />
                Zasady odpowiedzialnej gry
              </Link>
            </Reveal>
          </div>

          <Reveal className="relative aspect-[4/5] w-full overflow-hidden lg:aspect-auto lg:h-[640px]">
            <Image
              src="/images/poker-lounge.webp"
              alt="Stół pokerowy w prywatnym salonie gier, w stylistyce art déco"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
