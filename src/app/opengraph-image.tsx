import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Luksusowy hotel z prywatnym salonem gier w Warszawie";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0b0c10 0%, #14151b 55%, #0e3c2f 100%)",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            color: "#cda861",
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          Warszawa · Śródmieście
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 58,
            lineHeight: 1.15,
            color: "#f4ecdc",
            maxWidth: 960,
          }}
        >
          Luksusowy hotel z prywatnym salonem gier w stylu Las Vegas
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 24,
            color: "rgba(244,236,220,0.65)",
            fontFamily: "sans-serif",
          }}
        >
          Apartamenty premium · SPA · Restauracja · 18+
        </div>
      </div>
    ),
    { ...size }
  );
}
