import type { Metadata } from "next";
import { IconMail, IconMapPin } from "@/components/icons";
import { CONTACT_EMAIL } from "@/lib/site";
import { ReservationForm } from "./ReservationForm";

export const metadata: Metadata = {
  title: "Rezerwacja",
  description:
    "Zarezerwuj apartament, miejsce w kasynie hotelowym (18+) lub wydarzenie w luksusowym kasyno hotelu w centrum Warszawy.",
  alternates: { canonical: "/rezerwacja" },
};

export default function RezerwacjaPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-36 sm:px-8 sm:pt-44">
      <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-[13px] uppercase tracking-[0.3em] text-gold">Rezerwacja</p>
          <h1 className="mt-4 font-display text-3xl text-ivory sm:text-4xl">
            Opowiedz nam o swoim pobycie
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-ivory/65">
            Wypełnij formularz, a nasz zespół concierge skontaktuje się z Tobą
            w ciągu 24 godzin, aby potwierdzić termin i dopasować ofertę —
            apartament, miejsce przy stole w salonie gier lub organizację
            wydarzenia prywatnego.
          </p>

          <div className="mt-10 space-y-4 border-t border-white/10 pt-8">
            <div className="flex items-center gap-3 text-sm text-ivory/70">
              <IconMail className="h-4 w-4 shrink-0 text-gold" />
              <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-gold">
                {CONTACT_EMAIL}
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm text-ivory/70">
              <IconMapPin className="h-4 w-4 shrink-0 text-gold" />
              Śródmieście, Warszawa
            </div>
          </div>

          <p className="mt-10 border border-gold-deep/30 bg-ink-2 p-5 text-xs leading-relaxed text-ivory/50">
            Salon gier karcianych jest dostępny wyłącznie dla gości, którzy
            ukończyli 18 lat. Wysyłając formularz z zaznaczoną opcją „Miejsce
            w salonie gier”, potwierdzasz pełnoletność.
          </p>
        </div>

        <ReservationForm />
      </div>
    </div>
  );
}
