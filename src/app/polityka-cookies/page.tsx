import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Polityka cookies",
  description: "Informacje o plikach cookies używanych na stronie i sposobach zarządzania zgodami.",
  alternates: { canonical: "/polityka-cookies" },
};

const h2 = "font-display text-2xl text-ivory mt-14 mb-4";
const p = "text-sm leading-relaxed text-ivory/65 mb-3";

export default function CookiesPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 pb-24 pt-36 sm:px-8 sm:pt-44">
      <p className="text-[13px] uppercase tracking-[0.3em] text-gold">Dokument prawny</p>
      <h1 className="mt-4 font-display text-3xl text-ivory sm:text-4xl">Polityka cookies</h1>
      <p className="mt-4 text-xs text-ivory/40">Ostatnia aktualizacja: 27 lipca 2026 r.</p>

      <h2 className={h2}>1. Czym są pliki cookies</h2>
      <p className={p}>
        Pliki cookies to niewielkie pliki tekstowe zapisywane w przeglądarce
        podczas odwiedzania strony internetowej. Pozwalają one zapamiętać
        preferencje użytkownika oraz zbierać zanonimizowane statystyki
        odwiedzin.
      </p>

      <h2 className={h2}>2. Rodzaje wykorzystywanych cookies</h2>
      <div className="overflow-x-auto">
        <table className="mt-4 w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gold-deep/40 text-[11px] uppercase tracking-[0.14em] text-gold">
              <th className="py-3 pr-4 font-normal">Kategoria</th>
              <th className="py-3 pr-4 font-normal">Cel</th>
              <th className="py-3 font-normal">Wymagana zgoda</th>
            </tr>
          </thead>
          <tbody className="text-ivory/65">
            <tr className="border-b border-white/5">
              <td className="py-3 pr-4">Niezbędne</td>
              <td className="py-3 pr-4">Podstawowe działanie strony i formularzy — zawsze aktywne.</td>
              <td className="py-3">Nie</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-3 pr-4">Funkcjonalne</td>
              <td className="py-3 pr-4">Zapamiętywanie ustawień, np. potwierdzenia wieku.</td>
              <td className="py-3">Tak</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-3 pr-4">Analityczne</td>
              <td className="py-3 pr-4">Zanonimizowana statystyka ruchu na stronie.</td>
              <td className="py-3">Tak</td>
            </tr>
            <tr>
              <td className="py-3 pr-4">Reklamowe</td>
              <td className="py-3 pr-4">Pomiar skuteczności kampanii reklamowych (np. Google Ads).</td>
              <td className="py-3">Tak</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className={h2}>3. Zarządzanie zgodami</h2>
      <p className={p}>
        Zgodę na cookies niezbędne wyłącznie do celów statystycznych i
        reklamowych można w każdej chwili wycofać lub zmienić w ustawieniach
        swojej przeglądarki internetowej, usuwając zapisane pliki cookies
        lub blokując ich zapis dla tej domeny. Instrukcje znajdują się w
        ustawieniach prywatności każdej popularnej przeglądarki.
      </p>

      <h2 className={h2}>4. Kontakt</h2>
      <p className={p}>
        Pytania dotyczące niniejszej polityki prosimy kierować na adres{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-gold underline underline-offset-4">
          {CONTACT_EMAIL}
        </a>
        .
      </p>
    </article>
  );
}
