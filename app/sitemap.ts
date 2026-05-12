import { MetadataRoute } from "next";
import { destinations } from "@/lib/destinations";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://riviora.fr";

  const destPages: MetadataRoute.Sitemap = destinations.map((d) => ({
    url: `${baseUrl}/destinations/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/#services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/#destinations`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/#tarifs`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/#contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    ...destPages,
  ];
}
