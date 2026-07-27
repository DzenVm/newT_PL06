import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";

const rooms = [
  {
    name: "Pokój Superior",
    size: "32 m²",
    desc: "Kameralny, elegancki pokój z łóżkiem king-size, marmurową łazienką i widokiem na wewnętrzny dziedziniec.",
    features: ["Łóżko king-size", "Marmurowa łazienka", "Ekspres do kawy"],
  },
  {
    name: "Apartament Deluxe",
    size: "54 m²",
    desc: "Osobna strefa dzienna, garderoba oraz balkon z widokiem na panoramę Śródmieścia.",
    features: ["Osobny salon", "Balkon widokowy", "Wanna wolnostojąca"],
  },
  {
    name: "Apartament Prezydencki",
    size: "96 m²",
    desc: "Reprezentacyjny apartament z gabinetem, jadalnią na sześć osób i prywatnym tarasem.",
    features: ["Prywatny taras", "Jadalnia dla 6 osób", "Kuchnia aneksowa"],
  },
  {
    name: "Penthouse",
    size: "140 m²",
    desc: "Najwyższa kondygnacja obiektu — panoramiczne przeszklenia, prywatny salon gier stołowych i obsługa butlerska.",
    features: ["Obsługa butlerska", "Prywatny salon gier", "Taras 360°"],
  },
];

export function Rooms() {
  return (
    <section id="apartamenty" className="border-t border-gold-deep/20 bg-ink">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src="/images/suite-interior.webp"
                alt="Wnętrze apartamentu hotelowego w stylu Art Deco z widokiem na panoramę miasta"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="text-[13px] uppercase tracking-[0.3em] text-gold">Apartamenty</p>
              <h2 className="mt-4 font-display text-3xl text-ivory sm:text-4xl">
                Cztery kategorie pobytu, jeden standard detalu
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-ivory/65">
                Każdy pokój zaprojektowano w stylistyce art déco — geometryczne
                boazerie, mosiężne wykończenia i stonowana, ciepła paleta barw.
                Pościel z egipskiej bawełny, blackout i pełna izolacja
                akustyczna to standard we wszystkich kategoriach.
              </p>
            </Reveal>

            <div className="mt-10 divide-y divide-white/5 border-y border-white/5">
              {rooms.map((room, i) => (
                <Reveal key={room.name} delay={i * 70} className="py-6">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="font-display text-lg text-ivory">{room.name}</h3>
                    <span className="text-xs uppercase tracking-[0.14em] text-gold">{room.size}</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ivory/60">{room.desc}</p>
                  <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-ivory/45">
                    {room.features.map((f) => (
                      <li key={f}>· {f}</li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-8">
              <Link
                href="/rezerwacja"
                className="inline-flex items-center border border-gold px-6 py-3 text-[13px] uppercase tracking-[0.16em] text-gold transition-colors hover:bg-gold hover:text-ink"
              >
                Zapytaj o dostępność
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
