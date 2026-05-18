import { MetadataRoute } from "next";
import { destinations } from "@/lib/destinations";

const locales = ["fr", "en", "de", "es"] as const;
const baseUrl = "https://riviora.fr";

function localePath(locale: string, path: string) {
  return locale === "fr" ? `${baseUrl}${path}` : `${baseUrl}/${locale}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const homePages: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: localePath(locale, "/"),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: locale === "fr" ? 1 : 0.9,
  }));

  const destListPages: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: localePath(locale, "/destinations"),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const destPages: MetadataRoute.Sitemap = destinations.flatMap((d) =>
    locales.map((locale) => ({
      url: localePath(locale, `/destinations/${d.slug}`),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    }))
  );

  return [...homePages, ...destListPages, ...destPages];
}
