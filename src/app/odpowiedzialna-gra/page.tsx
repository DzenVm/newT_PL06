import type { Metadata } from "next";
import { IconShield } from "@/components/icons";
import { CONTACT_EMAIL, HELPLINE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Odpowiedzialna gra (18+)",
  description:
    "Zasady odpowiedzialnej gry w salonie gier karcianych: granica wieku, samowykluczenie, sygnały ostrzegawcze i bezpłatna pomoc dla osób z problemem hazardowym.",
  alternates: { canonical: "/odpowiedzialna-gra" },
};

const h2 = "font-display text-2xl text-ivory mt-14 mb-4";
const p = "text-sm leading-relaxed text-ivory/65 mb-3";
const li = "text-sm leading-relaxed text-ivory/65";

export default function ResponsibleGamingPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 pb-24 pt-36 sm:px-8 sm:pt-44">
      <div className="flex items-center gap-3">
        <IconShield className="h-7 w-7 text-gold" />
        <p className="text-[13px] uppercase tracking-[0.3em] text-gold">18+ · Odpowiedzialna gra</p>
      </div>
      <h1 className="mt-4 font-display text-3xl text-ivory sm:text-4xl">Zasady odpowiedzialnej gry</h1>
      <p className="mt-4 text-xs text-ivory/40">Ostatnia aktualizacja: 27 lipca 2026 r.</p>

      <p className={`${p} mt-8`}>
        Salon gier karcianych to element rozrywkowej oferty obiektu,
        prowadzony wyłącznie stacjonarnie i zgodnie z przepisami ustawy o
        grach hazardowych. Traktujemy dobro naszych gości priorytetowo —
        poniżej opisujemy zasady, które temu służą.
      </p>

      <h2 className={h2}>1. Twarda granica wieku</h2>
      <p className={p}>
        Do salonu gier wpuszczane są wyłącznie osoby, które ukończyły 18 lat.
        Wiek jest weryfikowany przy każdym wejściu na podstawie dokumentu
        tożsamości ze zdjęciem. Nie robimy w tej kwestii wyjątków.
      </p>

      <h2 className={h2}>2. Samowykluczenie</h2>
      <p className={p}>
        Każdy gość może w dowolnym momencie zgłosić w recepcji chęć
        czasowego lub stałego wykluczenia z możliwości korzystania z salonu
        gier — dla siebie lub, po odpowiednim zgłoszeniu formalnym, dla
        osoby bliskiej. Zgłoszenie jest poufne i honorowane bezterminowo, do
        czasu jego odwołania przez osobę zainteresowaną.
      </p>

      <h2 className={h2}>3. Sygnały ostrzegawcze</h2>
      <p className={p}>Warto zwrócić na siebie szczególną uwagę, jeśli:</p>
      <ul className="list-disc space-y-2 pl-5">
        <li className={li}>gra pochłania więcej czasu lub środków, niż wcześniej zakładano,</li>
        <li className={li}>pojawia się potrzeba „odegrania się” po stracie,</li>
        <li className={li}>gra zaczyna wpływać na relacje rodzinne, zawodowe lub finansowe,</li>
        <li className={li}>towarzyszy jej ukrywanie skali gry przed bliskimi.</li>
      </ul>

      <h2 className={h2}>4. Zasady, które stosujemy</h2>
      <ul className="list-disc space-y-2 pl-5">
        <li className={li}>Nie udzielamy pożyczek ani kredytów przeznaczonych na grę.</li>
        <li className={li}>Nie kierujemy komunikacji marketingowej dotyczącej salonu gier do osób, które zgłosiły samowykluczenie.</li>
        <li className={li}>Personel sali przeszedł szkolenie z rozpoznawania sygnałów ryzykownej gry.</li>
        <li className={li}>Serwis internetowy obiektu nie oferuje gry ani zakładów online — wyłącznie informacje i rezerwację wizyty stacjonarnej.</li>
      </ul>

      <h2 className={h2}>5. Bezpłatna pomoc</h2>
      <p className={p}>
        Jeśli Ty lub ktoś z Twoich bliskich zmaga się z problemem
        hazardowym, skorzystaj z bezpłatnej, ogólnopolskiej pomocy:
      </p>
      <div className="mt-4 border border-gold-deep/30 bg-ink-2 p-6">
        <p className="font-display text-xl text-gold">{HELPLINE.phone}</p>
        <p className="mt-1 text-sm text-ivory/65">{HELPLINE.hours}</p>
        <p className="mt-2 text-xs text-ivory/45">
          Telefon zaufania dla osób z uzależnieniami behawioralnymi, prowadzony przez{" "}
          {HELPLINE.operator}, współfinansowany ze środków Funduszu Rozwiązywania Problemów
          Hazardowych.
        </p>
      </div>

      <p className={`${p} mt-8`}>
        Pytania dotyczące niniejszych zasad prosimy kierować na adres{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-gold underline underline-offset-4">
          {CONTACT_EMAIL}
        </a>
        .
      </p>
    </article>
  );
}
