# Luksusowy hotel z salonem gier — Warszawa

SSR strona (Next.js App Router) dla ekskluzywnej rezydencji hotelowej w
Warszawie z prywatnym salonem gier karcianych. Zbudowana pod domenę
**morbitel.site**, geo Polska, język polski.

## Stos technologiczny

- **Next.js 16** (App Router, React 19), strona główna renderowana per
  żądanie (`dynamic = "force-dynamic"`) — pasek dostępności stołów/apartamentów
  jest liczony na serwerze na podstawie czasu w strefie `Europe/Warsaw` i
  stałego harmonogramu tygodniowego (`src/lib/availability.ts`), a nie
  statycznie zamrożony przy buildzie.
- **Tailwind CSS 4** z autorską paletą art déco (`src/app/globals.css`).
- **Server Actions + Zod** do walidacji formularza rezerwacji
  (`src/app/rezerwacja/actions.ts`).
- **`next/og`** do dynamicznego generowania obrazu Open Graph
  (`src/app/opengraph-image.tsx`).
- **`proxy.ts`** (następca `middleware.ts` w Next 16) ustawia nagłówki
  bezpieczeństwa (CSP, X-Frame-Options, itd.).
- Zero bibliotek ikon/animacji stron trzecich — cały zestaw ikon
  (`src/components/icons.tsx`) i animacje pojawiania się przy scrollu
  (`src/components/Reveal.tsx`, przez `IntersectionObserver`) są autorskie.
- **Zero zdjęć stockowych.** Wszystkie 5 ilustracji w `public/images/` oraz
  favicon (`public/favicon-mark.svg`) to oryginalna, proceduralnie
  wygenerowana grafika wektorowa w stylu art déco — zobacz
  `scripts/gen-art.mjs`. Aby wygenerować je ponownie: `node scripts/gen-art.mjs`
  (wymaga `sharp`, już w `devDependencies`).

## Zgodność z polityką Google Ads

Salon gier opisany jest wyłącznie jako stacjonarna, licencjonowana
atrakcja hotelowa (bez zakładów/gier online, bez bonusów, bez języka
"wygraj pieniądze"). Na każdej stronie widnieje oznaczenie 18+, a
`/odpowiedzialna-gra` zawiera pełne zasady odpowiedzialnej gry wraz z
prawdziwym, ogólnopolskim numerem telefonu zaufania (801 889 880,
Instytut Psychologii Zdrowia PTP). **Przed uruchomieniem kampanii Google
Ads dotyczących salonu gier należy przejść proces certyfikacji Google w
kategorii "Gambling and games" dla rynku PL** — regulamin i licencja
obiektu powinny być gotowe do wglądu.

## Miejsca do podłączenia przed startem produkcyjnym

Świadomie nie zaszyto tu żadnych kluczy/danych firmy — uzupełnij przed
publikacją:

- **Wysyłka formularza rezerwacji** — `src/app/rezerwacja/actions.ts`
  aktualnie tylko waliduje dane i loguje je do konsoli serwera. Podłącz
  dostawcę poczty/CRM (np. Resend, Postmark, HubSpot) przez zmienne
  środowiskowe.
- **Dane prawne** — regulamin i polityka prywatności celowo opisują
  operatora opisowo ("Zarządca Obiektu"), bez wymyślonej nazwy — uzupełnij
  o realne dane rejestrowe firmy przed uruchomieniem.
- **Nazwa/logo** — zgodnie z wymaganiem, w interfejsie nie ma żadnej nazwy
  marki ani logo (miejsce w nagłówku jest celowo puste).

## Rozwój lokalny

```bash
npm install
npm run dev
```

Strona wystartuje na [http://localhost:3000](http://localhost:3000).

## Build produkcyjny

```bash
npm run build
npm run start
```

## Deploy na Vercel

Projekt nie wymaga żadnej niestandardowej konfiguracji Vercel — to
standardowa aplikacja Next.js App Router.

1. Zaimportuj repozytorium na [vercel.com/new](https://vercel.com/new).
2. Framework Preset: **Next.js** (wykrywany automatycznie).
3. Build Command / Output — pozostaw domyślne (`next build`).
4. Po pierwszym deployu podłącz domenę `morbitel.site` w zakładce
   **Settings → Domains** projektu na Vercel i ustaw rekordy DNS zgodnie
   ze wskazówkami Vercel.
5. Jeśli podłączasz mailer/CRM do formularza rezerwacji, dodaj wymagane
   klucze w **Settings → Environment Variables** przed deployem.

`src/lib/site.ts` zawiera `SITE_URL = "https://morbitel.site"` używany w
metadanych, `sitemap.ts` i `robots.ts` — zaktualizuj tę stałą, jeśli domena
się zmieni.
