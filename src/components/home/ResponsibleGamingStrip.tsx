import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { IconShield } from "@/components/icons";
import { HELPLINE } from "@/lib/site";

export function ResponsibleGamingStrip() {
  return (
    <section className="border-t border-gold-deep/20 bg-ink-2">
      <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8">
        <Reveal>
          <IconShield className="mx-auto h-9 w-9 text-gold" />
          <h2 className="mt-5 font-display text-2xl text-ivory sm:text-3xl">Gramy odpowiedzialnie</h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-ivory/60">
            Salon gier jest dostępny wyłącznie dla osób, które ukończyły 18
            lat, i traktujemy tę granicę bezwzględnie — przy wejściu wymagana
            jest weryfikacja dokumentu tożsamości. Gra ma charakter rozrywki i
            może wiązać się z ryzykiem uzależnienia. Jeśli Ty lub ktoś z
            Twoich bliskich potrzebuje wsparcia, bezpłatna, ogólnopolska
            pomoc dostępna jest pod numerem{" "}
            <a href={`tel:${HELPLINE.phone.replace(/\s/g, "")}`} className="text-gold underline underline-offset-4">
              {HELPLINE.phone}
            </a>{" "}
            ({HELPLINE.hours}).
          </p>
          <Link
            href="/odpowiedzialna-gra"
            className="mt-7 inline-flex items-center border border-gold px-6 py-3 text-[13px] uppercase tracking-[0.16em] text-gold transition-colors hover:bg-gold hover:text-ink"
          >
            Pełne zasady odpowiedzialnej gry
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
