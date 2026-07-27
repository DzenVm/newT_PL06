import { Reveal } from "@/components/Reveal";
import {
  IconCar,
  IconCigar,
  IconConcierge,
  IconKey,
  IconShield,
  IconSpa,
} from "@/components/icons";

const items = [
  {
    icon: IconConcierge,
    title: "Concierge 24/7",
    text: "Osobisty opiekun gościa dostępny przez całą dobę — od rezerwacji stolika w mieście po organizację prywatnego transferu.",
  },
  {
    icon: IconKey,
    title: "Prywatna winda apartamentowa",
    text: "Bezpośredni dostęp do kondygnacji apartamentów, bez konieczności przechodzenia przez ogólnodostępne lobby.",
  },
  {
    icon: IconCar,
    title: "Podziemny parking i valet",
    text: "Strzeżony parking podziemny z obsługą parkingową dla gości hotelu oraz salonu gier.",
  },
  {
    icon: IconSpa,
    title: "Spa czynne do późna",
    text: "Basen, sauna fińska, łaźnia parowa i strefa relaksu dostępne do godziny 23:00 każdego dnia.",
  },
  {
    icon: IconCigar,
    title: "Salon cygar i whisky",
    text: "Kameralna palarnia z osobną wentylacją oraz kartą win, whisky i cygar dobieranych przez sommeliera.",
  },
  {
    icon: IconShield,
    title: "Dyskrecja i bezpieczeństwo",
    text: "Całodobowa ochrona obiektu, monitoring i polityka pełnej poufności danych gości.",
  },
];

export function Highlights() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <Reveal>
        <p className="text-[13px] uppercase tracking-[0.3em] text-gold">Standard obiektu</p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl text-ivory sm:text-4xl">
          Szczegóły, które budują poczucie ekskluzywności
        </h2>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <Reveal key={item.title} delay={i * 60}>
            <item.icon className="h-8 w-8 text-gold" />
            <h3 className="mt-5 font-display text-xl text-ivory">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ivory/60">{item.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
