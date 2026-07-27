import { Reveal } from "@/components/Reveal";

const faqs = [
  {
    q: "Czy gry karciane są dostępne online, przez stronę?",
    a: "Nie. Strona ma charakter wyłącznie informacyjno-rezerwacyjny. Wszystkie gry odbywają się stacjonarnie, na terenie obiektu w Warszawie, w obecności personelu i pod nadzorem zgodnym z obowiązującymi przepisami. Nie oferujemy zakładów ani gier przez internet.",
  },
  {
    q: "Czy do wejścia do salonu gier potrzebny jest dokument tożsamości?",
    a: "Tak. Przy wejściu każdorazowo weryfikujemy pełnoletność gościa na podstawie dokumentu ze zdjęciem. Osoby niepełnoletnie nie mają wstępu do salonu gier pod żadnym pozorem.",
  },
  {
    q: "Jaka jest polityka anulowania rezerwacji apartamentu?",
    a: "Bezpłatne odwołanie jest możliwe do 48 godzin przed planowanym przyjazdem. Szczegółowe warunki dla wybranego terminu przesyłamy w wiadomości potwierdzającej rezerwację.",
  },
  {
    q: "Czy obiekt zapewnia transfer z lotniska Chopina?",
    a: "Tak, na życzenie organizujemy prywatny transfer. Prosimy o zgłoszenie takiej potrzeby w formularzu rezerwacji lub mailowo, najpóźniej 24 godziny przed przylotem.",
  },
  {
    q: "Czy mogę zarezerwować salon gier na wydarzenie prywatne?",
    a: "Tak. Salon można wynająć w całości na wieczór prywatny lub firmowy — szczegóły opisano w sekcji Wydarzenia. Rezerwacje przyjmujemy z minimum dwutygodniowym wyprzedzeniem.",
  },
  {
    q: "Jakie są godziny pracy recepcji?",
    a: "Recepcja oraz concierge pracują całodobowo, siedem dni w tygodniu, również w dni świąteczne.",
  },
];

export function Faq() {
  return (
    <section className="border-t border-gold-deep/20 bg-ink">
      <div className="mx-auto max-w-4xl px-5 py-24 sm:px-8">
        <Reveal>
          <p className="text-[13px] uppercase tracking-[0.3em] text-gold">Pytania i odpowiedzi</p>
          <h2 className="mt-4 font-display text-3xl text-ivory sm:text-4xl">Najczęściej zadawane pytania</h2>
        </Reveal>

        <div className="mt-12 divide-y divide-white/5 border-y border-white/5">
          {faqs.map((item, i) => (
            <Reveal key={item.q} delay={i * 50}>
              <details className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-ivory marker:content-none sm:text-base">
                  {item.q}
                  <span className="shrink-0 text-xl text-gold transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ivory/60">{item.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
