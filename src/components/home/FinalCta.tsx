import Link from "next/link";
import { Reveal } from "@/components/Reveal";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-gold-deep/20 bg-ink-2">
      <div className="pointer-events-none absolute inset-0 opacity-20 [background:radial-gradient(60%_60%_at_50%_0%,var(--color-gold)_0%,transparent_70%)]" />
      <div className="relative mx-auto max-w-3xl px-5 py-24 text-center sm:px-8">
        <Reveal>
          <h2 className="font-display text-3xl text-ivory sm:text-4xl">
            Zarezerwuj pobyt i miejsce przy stole
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-ivory/65">
            Liczba apartamentów i miejsc w salonie gier jest ograniczona.
            Wypełnij krótki formularz — nasz concierge odpowie w ciągu 24
            godzin z potwierdzeniem terminu.
          </p>
          <Link
            href="/rezerwacja"
            className="mt-8 inline-flex items-center bg-gold px-8 py-4 text-[13px] uppercase tracking-[0.16em] text-ink transition-colors hover:bg-gold-light"
          >
            Przejdź do rezerwacji
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
