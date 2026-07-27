import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", priority: 1, changeFrequency: "daily" as const },
    { path: "/rezerwacja", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/odpowiedzialna-gra", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/regulamin", priority: 0.3, changeFrequency: "monthly" as const },
    { path: "/polityka-prywatnosci", priority: 0.3, changeFrequency: "monthly" as const },
    { path: "/polityka-cookies", priority: 0.3, changeFrequency: "monthly" as const },
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
