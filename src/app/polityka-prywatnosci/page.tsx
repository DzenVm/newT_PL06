import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description: "Zasady przetwarzania danych osobowych gości obiektu, zgodnie z RODO.",
  alternates: { canonical: "/polityka-prywatnosci" },
};

const h2 = "font-display text-2xl text-ivory mt-14 mb-4";
const p = "text-sm leading-relaxed text-ivory/65 mb-3";
const li = "text-sm leading-relaxed text-ivory/65";

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 pb-24 pt-36 sm:px-8 sm:pt-44">
      <p className="text-[13px] uppercase tracking-[0.3em] text-gold">Dokument prawny</p>
      <h1 className="mt-4 font-display text-3xl text-ivory sm:text-4xl">Polityka prywatności</h1>
      <p className="mt-4 text-xs text-ivory/40">Ostatnia aktualizacja: 27 lipca 2026 r.</p>

      <h2 className={h2}>1. Administrator danych</h2>
      <p className={p}>
        Administratorem danych osobowych jest podmiot zarządzający obiektem
        hotelowym działającym pod domeną morbitel.site, z siedzibą
        operacyjną w Warszawie. Kontakt we wszystkich sprawach związanych z
        przetwarzaniem danych osobowych:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-gold underline underline-offset-4">
          {CONTACT_EMAIL}
        </a>
        .
      </p>

      <h2 className={h2}>2. Zakres i cele przetwarzania danych</h2>
      <ul className="list-disc space-y-2 pl-5">
        <li className={li}>
          <span className="text-ivory">Obsługa zapytań i rezerwacji</span> — imię i nazwisko, adres
          e-mail, numer telefonu, treść wiadomości (podstawa: art. 6 ust. 1 lit. b RODO — działania
          przed zawarciem umowy).
        </li>
        <li className={li}>
          <span className="text-ivory">Weryfikacja pełnoletności gości salonu gier</span> — dane z
          dokumentu tożsamości okazywanego przy wejściu, nieprzechowywane po zakończeniu wizyty
          (podstawa: art. 6 ust. 1 lit. c RODO — obowiązek prawny wynikający z ustawy o grach
          hazardowych).
        </li>
        <li className={li}>
          <span className="text-ivory">Analiza ruchu na stronie i kampanie reklamowe</span> — dane
          zbierane za pośrednictwem plików cookies, wyłącznie po wyrażeniu zgody (podstawa: art. 6
          ust. 1 lit. a RODO). Szczegóły w{" "}
          <a href="/polityka-cookies" className="text-gold underline underline-offset-4">
            Polityce cookies
          </a>
          .
        </li>
      </ul>

      <h2 className={h2}>3. Odbiorcy danych</h2>
      <p className={p}>
        Dane mogą być powierzane podmiotom wspierającym działalność obiektu
        — dostawcom usług hostingowych, poczty elektronicznej oraz analityki
        internetowej — wyłącznie w zakresie niezbędnym do realizacji celu
        przetwarzania i na podstawie stosownych umów powierzenia.
      </p>

      <h2 className={h2}>4. Okres przechowywania</h2>
      <p className={p}>
        Dane z formularza kontaktowego przechowywane są przez okres
        niezbędny do obsługi zapytania oraz przez czas przedawnienia
        ewentualnych roszczeń. Dane weryfikacyjne z dokumentu tożsamości
        nie są zapisywane ani przechowywane po opuszczeniu salonu gier przez
        gościa.
      </p>

      <h2 className={h2}>5. Prawa osób, których dane dotyczą</h2>
      <p className={p}>Każdej osobie przysługuje prawo do:</p>
      <ul className="list-disc space-y-2 pl-5">
        <li className={li}>dostępu do swoich danych oraz otrzymania ich kopii,</li>
        <li className={li}>sprostowania (poprawiania) danych,</li>
        <li className={li}>usunięcia danych lub ograniczenia ich przetwarzania,</li>
        <li className={li}>przenoszenia danych,</li>
        <li className={li}>wniesienia sprzeciwu wobec przetwarzania,</li>
        <li className={li}>cofnięcia zgody w dowolnym momencie, bez wpływu na zgodność z prawem przetwarzania dokonanego przed jej cofnięciem,</li>
        <li className={li}>wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych.</li>
      </ul>

      <h2 className={h2}>6. Bezpieczeństwo danych</h2>
      <p className={p}>
        Stosujemy techniczne i organizacyjne środki bezpieczeństwa
        odpowiednie do charakteru przetwarzanych danych, w tym szyfrowane
        połączenie HTTPS oraz ograniczony dostęp do danych wyłącznie dla
        upoważnionego personelu.
      </p>
    </article>
  );
}
