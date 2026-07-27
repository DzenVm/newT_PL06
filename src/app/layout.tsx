import type { Metadata, Viewport } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Luksusowy Hotel z Salonem Gier w Warszawie | Pobyt 5-gwiazdkowy",
    template: "%s | Luksusowy Hotel i Salon Gier, Warszawa",
  },
  description:
    "Prywatna rezydencja hotelowa w centrum Warszawy: apartamenty premium, autorska restauracja, spa oraz ekskluzywny salon gier karcianych w stylu dawnego Las Vegas. Wyłącznie dla gości 18+.",
  keywords: [
    "luksusowy hotel Warszawa",
    "apartamenty premium Warszawa",
    "salon gier karcianych Warszawa",
    "hotel z pokerem Warszawa",
    "ekskluzywny hotel centrum Warszawy",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: SITE_URL,
    siteName: "Luksusowy Hotel i Salon Gier — Warszawa",
    title: "Luksusowy Hotel z Salonem Gier w Warszawie",
    description:
      "Apartamenty premium, autorska kuchnia, spa i prywatny salon gier karcianych w sercu Warszawy. 18+.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luksusowy Hotel z Salonem Gier w Warszawie",
    description:
      "Apartamenty premium, autorska kuchnia, spa i prywatny salon gier karcianych w sercu Warszawy. 18+.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b0c10",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    url: SITE_URL,
    description:
      "Prywatna rezydencja hotelowa w Warszawie z apartamentami premium, restauracją, spa oraz salonem gier karcianych dostępnym dla gości pełnoletnich.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Warszawa",
      addressCountry: "PL",
    },
    areaServed: "PL",
    priceRange: "$$$$",
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Salon gier karcianych (18+)", value: true },
      { "@type": "LocationFeatureSpecification", name: "Spa i basen", value: true },
      { "@type": "LocationFeatureSpecification", name: "Restauracja autorska", value: true },
      { "@type": "LocationFeatureSpecification", name: "Concierge 24/7", value: true },
      { "@type": "LocationFeatureSpecification", name: "Parking podziemny", value: true },
    ],
  };

  return (
    <html
      lang="pl"
      className={`${playfair.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-ink text-ivory">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
