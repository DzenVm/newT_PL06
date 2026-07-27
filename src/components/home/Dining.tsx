import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { IconGlass } from "@/components/icons";

const menuHighlights = [
  { name: "Śniadanie à la carte", hours: "7:00–11:00", note: "Serwowane w apartamencie lub w sali śniadaniowej" },
  { name: "Lunch degustacyjny", hours: "12:30–15:00", note: "Sezonowe menu 4-daniowe" },
  { name: "Kolacja autorska", hours: "18:00–23:00", note: "Menu degustacyjne z parowaniem win" },
  { name: "Bar nocny", hours: "20:00–2:00", note: "Klasyczne koktajle i selekcja whisky" },
];

export function Dining() {
  return (
    <section id="restauracja" className="border-t border-gold-deep/20 bg-ink">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal className="relative aspect-[4/3] w-full overflow-hidden order-2 lg:order-1">
            <Image
              src="/images/restaurant-bar.webp"
              alt="Bar hotelowy z podświetlaną kolekcją alkoholi w stylu art déco"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <p className="text-[13px] uppercase tracking-[0.3em] text-gold">Restauracja i Bar</p>
              <h2 className="mt-4 font-display text-3xl text-ivory sm:text-4xl">
                Autorska kuchnia i program barowy do późnej nocy
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-ivory/65">
                Szef kuchni komponuje menu sezonowe oparte na produktach od
                lokalnych dostawców. Karta win liczy ponad 200 pozycji, a bar
                nocny specjalizuje się w klasycznych koktajlach serwowanych do
                wczesnych godzin porannych — idealne zakończenie wieczoru przy
                stołach w salonie gier.
              </p>
            </Reveal>

            <div className="mt-10 divide-y divide-white/5 border-y border-white/5">
              {menuHighlights.map((item, i) => (
                <Reveal key={item.name} delay={i * 60} className="flex items-center gap-4 py-4">
                  <IconGlass className="h-5 w-5 shrink-0 text-gold" />
                  <div className="flex-1">
                    <p className="text-sm text-ivory">{item.name}</p>
                    <p className="text-xs text-ivory/45">{item.note}</p>
                  </div>
                  <span className="text-xs uppercase tracking-[0.12em] text-gold">{item.hours}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
