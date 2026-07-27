import { Hero } from "@/components/home/Hero";
import { AvailabilityStrip } from "@/components/home/AvailabilityStrip";
import { Highlights } from "@/components/home/Highlights";
import { Rooms } from "@/components/home/Rooms";
import { GamingLounge } from "@/components/home/GamingLounge";
import { Dining } from "@/components/home/Dining";
import { Wellness } from "@/components/home/Wellness";
import { Events } from "@/components/home/Events";
import { Gallery } from "@/components/home/Gallery";
import { LocationSection } from "@/components/home/LocationSection";
import { ResponsibleGamingStrip } from "@/components/home/ResponsibleGamingStrip";
import { Faq } from "@/components/home/Faq";
import { FinalCta } from "@/components/home/FinalCta";

// The availability strip is computed fresh on the server for every
// request (Europe/Warsaw time + daily schedule) — force-dynamic keeps
// Next.js from freezing the homepage into a static export at build time.
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Hero />
      <AvailabilityStrip />
      <Highlights />
      <Rooms />
      <GamingLounge />
      <Dining />
      <Wellness />
      <Events />
      <Gallery />
      <LocationSection />
      <ResponsibleGamingStrip />
      <Faq />
      <FinalCta />
    </>
  );
}
