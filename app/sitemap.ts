import { MetadataRoute } from "next";
import { destinations } from "@/lib/destinations";

const locales = ["fr", "en", "de", "es"] as const;
const baseUrl = "https://riviora.fr";

function localePath(locale: string, path: string) {
  // FR is the default locale (no prefix). For others, prefix with /{locale}.
  // Special-case the root path "/" for non-FR locales: emit /{locale} WITHOUT
  // a trailing slash — Next.js 308-redirects /en/ → /en, which Google Search
  // Console then flags as "Page with redirect" and refuses to index.
  if (locale === "fr") return `${baseUrl}${path}`;
  if (path === "/") return `${baseUrl}/${locale}`;
  return `${baseUrl}/${locale}${path}`;
}

function buildAlternates(path: string) {
  return {
    languages: {
      ...Object.fromEntries(
        locales.map((locale) => [locale, localePath(locale, path)])
      ),
      "x-default": localePath("fr", path),
    } as Record<string, string>,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const homePages: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: localePath(locale, "/"),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: locale === "fr" ? 1 : 0.9,
    alternates: buildAlternates("/"),
  }));

  const destListPages: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: localePath(locale, "/destinations"),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
    alternates: buildAlternates("/destinations"),
  }));

  const destPages: MetadataRoute.Sitemap = destinations.flatMap((d) =>
    locales.map((locale) => ({
      url: localePath(locale, `/destinations/${d.slug}`),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.85,
      alternates: buildAlternates(`/destinations/${d.slug}`),
    }))
  );

  return [...homePages, ...destListPages, ...destPages];
}
