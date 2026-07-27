import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { IconCards, IconConcierge, IconUsers } from "@/components/icons";

const formats = [
  {
    icon: IconUsers,
    title: "Bankiety i przyjęcia prywatne",
    text: "Sala bankietowa dla maks. 80 osób, w pełni zaciemniana, z osobnym wejściem i szatnią.",
  },
  {
    icon: IconConcierge,
    title: "Spotkania korporacyjne",
    text: "Sala konferencyjna z nagłośnieniem, projekcją i cateringiem serwowanym przy stole.",
  },
  {
    icon: IconCards,
    title: "Wieczory turniejowe na wynajem",
    text: "Prywatna rezerwacja salonu gier na wydarzenia firmowe i okolicznościowe, wyłącznie dla gości 18+.",
  },
];

export function Events() {
  return (
    <section id="wydarzenia" className="border-t border-gold-deep/20 bg-ink">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-[13px] uppercase tracking-[0.3em] text-gold">Wydarzenia</p>
          <h2 className="mt-4 font-display text-3xl text-ivory sm:text-4xl">
            Przestrzeń na wydarzenia prywatne i firmowe
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-ivory/65">
            Trzy niezależne przestrzenie na parterze i piętrze obiektu można
            łączyć lub wynajmować osobno. Każde wydarzenie prowadzi dedykowany
            koordynator, od pierwszej rozmowy po rozliczenie końcowe.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 sm:grid-cols-3">
          {formats.map((f, i) => (
            <Reveal key={f.title} delay={i * 80} className="border border-gold-deep/25 p-7">
              <f.icon className="h-7 w-7 text-gold" />
              <h3 className="mt-5 font-display text-lg text-ivory">{f.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ivory/60">{f.text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={240} className="mt-12">
          <Link
            href="/rezerwacja"
            className="inline-flex items-center border border-gold px-6 py-3 text-[13px] uppercase tracking-[0.16em] text-gold transition-colors hover:bg-gold hover:text-ink"
          >
            Zapytaj o wydarzenie
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
