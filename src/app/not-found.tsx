import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-5 pt-24 text-center sm:px-8">
      <p className="text-[13px] uppercase tracking-[0.3em] text-gold">Błąd 404</p>
      <h1 className="mt-5 font-display text-3xl text-ivory sm:text-4xl">
        Ta strona opuściła już nasz obiekt
      </h1>
      <p className="mt-5 max-w-md text-sm leading-relaxed text-ivory/60">
        Podany adres nie istnieje lub został przeniesiony. Wróć na stronę
        główną, aby poznać apartamenty, salon gier i pozostałą ofertę
        obiektu.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center border border-gold px-6 py-3 text-[13px] uppercase tracking-[0.16em] text-gold transition-colors hover:bg-gold hover:text-ink"
      >
        Wróć na stronę główną
      </Link>
    </div>
  );
}
