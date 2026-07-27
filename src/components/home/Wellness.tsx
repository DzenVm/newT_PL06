import Image from "next/image";
import { Reveal } from "@/components/Reveal";

const treatments = [
  { name: "Basen z podgrzewaną wodą", desc: "18-metrowy basen czynny codziennie do 23:00" },
  { name: "Sauna fińska i łaźnia parowa", desc: "Dwie niezależne strefy termiczne z prysznicami doznań" },
  { name: "Masaże i zabiegi na twarz", desc: "Rytuały dobierane indywidualnie przez terapeutę spa" },
  { name: "Siłownia całodobowa", desc: "Sprzęt cardio i wolne ciężary, dostępne 24 godziny" },
];

export function Wellness() {
  return (
    <section id="spa" className="border-t border-gold-deep/20 bg-ink-2">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src="/images/spa.webp"
              alt="Strefa spa z basenem i świecami w wystroju art déco"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </Reveal>

          <div>
            <Reveal>
              <p className="text-[13px] uppercase tracking-[0.3em] text-gold">SPA i Wellness</p>
              <h2 className="mt-4 font-display text-3xl text-ivory sm:text-4xl">
                Strefa regeneracji zaprojektowana z myślą o ciszy
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-ivory/65">
                Kondygnacja spa oddzielona jest od części gościnnej osobną
                klatką i dostępna wyłącznie dla gości hotelowych. Kamienna
                okładzina, przygaszone oświetlenie i stała temperatura wody
                tworzą przestrzeń do pełnego wyciszenia po dniu pełnym wrażeń.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {treatments.map((t, i) => (
                <Reveal key={t.name} delay={i * 60} className="border-l border-gold-deep/40 pl-5">
                  <h3 className="font-display text-base text-ivory">{t.name}</h3>
                  <p className="mt-1.5 text-sm text-ivory/55">{t.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
