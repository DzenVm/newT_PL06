import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Luksusowy Hotel i Salon Gier — Warszawa",
    short_name: "Hotel i Salon Gier",
    description:
      "Apartamenty premium, restauracja, spa i prywatny salon gier karcianych w centrum Warszawy. 18+.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0c10",
    theme_color: "#0b0c10",
    lang: "pl-PL",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
