import Image from "next/image";
import { Reveal } from "@/components/Reveal";

const items = [
  { src: "/images/hero-warsaw.webp", alt: "Panorama Warszawy o zmroku widziana z hotelu", caption: "Panorama miasta" },
  { src: "/images/poker-lounge.webp", alt: "Stół pokerowy w prywatnym salonie gier", caption: "Salon gier" },
  { src: "/images/suite-interior.webp", alt: "Wnętrze apartamentu hotelowego", caption: "Apartament Deluxe" },
  { src: "/images/spa.webp", alt: "Strefa spa z basenem", caption: "Strefa SPA" },
  { src: "/images/restaurant-bar.webp", alt: "Bar hotelowy nocą", caption: "Bar nocny" },
];

export function Gallery() {
  return (
    <section className="border-t border-gold-deep/20 bg-ink-2">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-[13px] uppercase tracking-[0.3em] text-gold">Galeria</p>
          <h2 className="mt-4 font-display text-3xl text-ivory sm:text-4xl">Klimat obiektu w pięciu kadrach</h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-6 sm:gap-4">
          {items.map((item, i) => (
            <Reveal
              key={item.src}
              delay={i * 60}
              className={`relative overflow-hidden ${
                i === 0 ? "col-span-2 aspect-[16/10] sm:col-span-4 sm:aspect-[16/9]" : "aspect-[3/4] sm:col-span-2"
              }`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-3">
                <p className="text-xs uppercase tracking-[0.12em] text-ivory/85">{item.caption}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
