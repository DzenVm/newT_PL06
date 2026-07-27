import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Regulamin",
  description: "Regulamin świadczenia usług hotelowych oraz korzystania z salonu gier karcianych (18+).",
  alternates: { canonical: "/regulamin" },
  robots: { index: true, follow: true },
};

const h2 = "font-display text-2xl text-ivory mt-14 mb-4";
const h3 = "font-display text-lg text-ivory mt-8 mb-2";
const p = "text-sm leading-relaxed text-ivory/65 mb-3";
const li = "text-sm leading-relaxed text-ivory/65";

export default function RegulaminPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 pb-24 pt-36 sm:px-8 sm:pt-44">
      <p className="text-[13px] uppercase tracking-[0.3em] text-gold">Dokument prawny</p>
      <h1 className="mt-4 font-display text-3xl text-ivory sm:text-4xl">Regulamin obiektu</h1>
      <p className="mt-4 text-xs text-ivory/40">Ostatnia aktualizacja: 27 lipca 2026 r.</p>

      <h2 className={h2}>1. Postanowienia ogólne</h2>
      <p className={p}>
        Niniejszy regulamin określa zasady świadczenia usług hotelowych,
        gastronomicznych oraz zasady korzystania z prywatnego salonu gier
        karcianych w obiekcie zlokalizowanym w Śródmieściu Warszawy,
        zarządzanym przez podmiot prowadzący działalność hotelarską i
        rozrywkową na podstawie obowiązujących przepisów prawa polskiego
        (dalej: „Zarządca Obiektu”).
      </p>
      <p className={p}>
        Dokonanie rezerwacji, wejście na teren obiektu lub skorzystanie z
        jakiejkolwiek usługi jest równoznaczne z akceptacją niniejszego
        regulaminu.
      </p>

      <h2 className={h2}>2. Rezerwacje i płatności</h2>
      <p className={p}>
        Rezerwacji dokonuje się poprzez formularz na stronie internetowej lub
        korespondencję e-mail. Rezerwacja staje się wiążąca po otrzymaniu
        pisemnego potwierdzenia od Zarządcy Obiektu. Zasady anulowania oraz
        ewentualnej przedpłaty są każdorazowo wskazywane w wiadomości
        potwierdzającej.
      </p>

      <h2 className={h2}>3. Zasady pobytu</h2>
      <ul className="list-disc space-y-2 pl-5">
        <li className={li}>Doba hotelowa trwa od godziny 15:00 do godziny 12:00 dnia następnego.</li>
        <li className={li}>Na terenie obiektu obowiązuje całkowity zakaz palenia poza wyznaczonym salonem cygar.</li>
        <li className={li}>Zarządca Obiektu zastrzega sobie prawo odmowy zakwaterowania osobom w stanie wskazującym na spożycie alkoholu lub środków odurzających.</li>
        <li className={li}>Cisza nocna obowiązuje w godzinach 23:00–7:00 w części apartamentowej.</li>
      </ul>

      <h2 className={h2}>4. Salon gier karcianych (18+)</h2>
      <p className={p}>
        Salon gier działa jako wydzielona, prywatna część obiektu i
        funkcjonuje zgodnie z ustawą z dnia 19 listopada 2009 r. o grach
        hazardowych oraz innymi właściwymi przepisami prawa. Aktualne
        zezwolenia i informacje o podmiocie urządzającym gry dostępne są do
        wglądu w recepcji obiektu.
      </p>
      <h3 className={h3}>4.1. Warunek wieku</h3>
      <p className={p}>
        Wstęp do salonu gier mają wyłącznie osoby, które ukończyły 18 lat.
        Personel jest uprawniony do weryfikacji wieku na podstawie dokumentu
        tożsamości ze zdjęciem i do odmowy wstępu w przypadku braku takiego
        dokumentu lub uzasadnionych wątpliwości co do wieku gościa.
      </p>
      <h3 className={h3}>4.2. Zasady gry</h3>
      <ul className="list-disc space-y-2 pl-5">
        <li className={li}>Gry prowadzone są wyłącznie przez uprawniony personel (krupierów) zgodnie z regulaminem gry obowiązującym przy danym stole.</li>
        <li className={li}>Zabrania się wnoszenia własnych kart, kości oraz urządzeń elektronicznych mogących służyć do oszustwa.</li>
        <li className={li}>Zarządca Obiektu nie udziela pożyczek ani kredytów na cele związane z grą.</li>
        <li className={li}>Obowiązuje elegancki strój wieczorowy oraz zasady kultury osobistej wobec innych gości i personelu.</li>
      </ul>
      <p className={p}>
        Pełne zasady dotyczące odpowiedzialnej gry, w tym możliwość
        samowykluczenia, opisano w{" "}
        <a href="/odpowiedzialna-gra" className="text-gold underline underline-offset-4">
          Zasadach odpowiedzialnej gry
        </a>
        .
      </p>

      <h2 className={h2}>5. Odpowiedzialność</h2>
      <p className={p}>
        Zarządca Obiektu odpowiada za rzeczy wniesione przez gości na
        zasadach określonych w kodeksie cywilnym. Zaleca się deponowanie
        przedmiotów wartościowych w sejfie apartamentowym lub depozycie
        recepcyjnym.
      </p>

      <h2 className={h2}>6. Reklamacje</h2>
      <p className={p}>
        Reklamacje dotyczące świadczonych usług można zgłaszać w recepcji
        obiektu lub drogą elektroniczną na adres{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-gold underline underline-offset-4">
          {CONTACT_EMAIL}
        </a>
        . Reklamacje rozpatrywane są w terminie do 14 dni roboczych.
      </p>

      <h2 className={h2}>7. Postanowienia końcowe</h2>
      <p className={p}>
        W sprawach nieuregulowanych niniejszym regulaminem zastosowanie mają
        przepisy prawa polskiego, w tym kodeksu cywilnego oraz ustawy o
        grach hazardowych. Zarządca Obiektu zastrzega sobie prawo do zmiany
        regulaminu; zmiany nie wpływają na warunki rezerwacji już
        potwierdzonych.
      </p>
    </article>
  );
}
