import Link from "next/link";
import { IconMail, IconMapPin, IconShield } from "@/components/icons";
import { CONTACT_EMAIL, HELPLINE, LEGAL_LINKS, NAV_LINKS } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-gold-deep/30 bg-ink-2">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="font-display text-xl leading-relaxed text-ivory/90">
              Prywatna rezydencja hotelowa w sercu Warszawy — apartamenty, autorska
              kuchnia, spa i ekskluzywny salon gier karcianych w klimacie dawnego
              Las Vegas.
            </p>
            <div className="mt-6 flex items-center gap-3 text-sm text-ivory/60">
              <IconMapPin className="h-4 w-4 shrink-0 text-gold" />
              <span>Śródmieście, Warszawa, Polska — dokładny adres po potwierdzeniu rezerwacji</span>
            </div>
            <div className="mt-3 flex items-center gap-3 text-sm text-ivory/60">
              <IconMail className="h-4 w-4 shrink-0 text-gold" />
              <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-gold">
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>

          <div>
            <p className="text-[13px] uppercase tracking-[0.16em] text-gold">Nawigacja</p>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-ivory/70 hover:text-gold">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/rezerwacja" className="text-sm text-ivory/70 hover:text-gold">
                  Rezerwacja
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[13px] uppercase tracking-[0.16em] text-gold">Informacje prawne</p>
            <ul className="mt-5 space-y-3">
              {LEGAL_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-ivory/70 hover:text-gold">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/5 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3 text-xs leading-relaxed text-ivory/50">
            <IconShield className="h-4 w-4 shrink-0 text-gold-deep" />
            <p>
              Salon gier karcianych dostępny wyłącznie dla osób pełnoletnich (18+).
              Gra może uzależniać. Bezpłatna, ogólnopolska pomoc dla osób z problemem
              hazardowym: telefon zaufania {HELPLINE.phone} ({HELPLINE.hours}).
            </p>
          </div>
          <p className="shrink-0 text-xs text-ivory/40">© 2026 Wszystkie prawa zastrzeżone.</p>
        </div>
      </div>
    </footer>
  );
}
