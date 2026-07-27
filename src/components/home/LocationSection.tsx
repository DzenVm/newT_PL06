import { Reveal } from "@/components/Reveal";
import { IconCar, IconMapPin } from "@/components/icons";

const landmarks = [
  { name: "Stare Miasto", distance: "4 min" },
  { name: "Pałac Kultury i Nauki", distance: "6 min" },
  { name: "Łazienki Królewskie", distance: "10 min" },
  { name: "Lotnisko Chopina", distance: "22 min" },
];

export function LocationSection() {
  return (
    <section className="border-t border-gold-deep/20 bg-ink">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="text-[13px] uppercase tracking-[0.3em] text-gold">Lokalizacja</p>
            <h2 className="mt-4 font-display text-3xl text-ivory sm:text-4xl">
              W samym sercu Śródmieścia
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-ivory/65">
              Obiekt znajduje się na cichej, reprezentatywnej ulicy w
              Śródmieściu Warszawy, w otoczeniu ambasad i butikowych galerii.
              Dokładny adres oraz instrukcje dojazdu przekazujemy po
              potwierdzeniu rezerwacji, co jest standardową praktyką w
              obiektach o podwyższonym standardzie prywatności.
            </p>
            <div className="mt-8 flex items-center gap-3 text-sm text-ivory/70">
              <IconCar className="h-5 w-5 text-gold" />
              Prywatny transfer z lotniska dostępny na życzenie
            </div>
          </Reveal>

          <Reveal delay={80}>
            <ul className="divide-y divide-white/5 border-y border-white/5">
              {landmarks.map((l) => (
                <li key={l.name} className="flex items-center justify-between py-4">
                  <span className="flex items-center gap-3 text-sm text-ivory/80">
                    <IconMapPin className="h-4 w-4 text-gold" />
                    {l.name}
                  </span>
                  <span className="text-xs uppercase tracking-[0.14em] text-ivory/45">{l.distance} samochodem</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
