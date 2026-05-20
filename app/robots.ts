import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Règle globale
      { userAgent: "*", allow: "/", disallow: ["/api/"] },

      // ── Bots de CITATION IA — explicitement autorisés ──────────────────────
      // OpenAI (ChatGPT Search)
      { userAgent: "GPTBot",         allow: "/" },
      { userAgent: "ChatGPT-User",   allow: "/" },
      { userAgent: "OAI-SearchBot",  allow: "/" },
      // Perplexity
      { userAgent: "PerplexityBot",  allow: "/" },
      // Anthropic (Claude)
      { userAgent: "ClaudeBot",      allow: "/" },
      { userAgent: "anthropic-ai",   allow: "/" },
      // Google (AI Overviews + Gemini)
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Googlebot",      allow: "/" },
      // Microsoft (Copilot via Bing)
      { userAgent: "Bingbot",        allow: "/" },
      // Meta AI
      { userAgent: "meta-externalagent", allow: "/" },

      // ── Scrapers d'ENTRAÎNEMENT pur (aucune citation, juste la donnée) ──────
      // Common Crawl — utilisé pour entraîner des modèles sans contrepartie SEO
      { userAgent: "CCBot", disallow: "/" },
    ],
    sitemap: "https://riviora.fr/sitemap.xml",
    host: "https://riviora.fr",
  };
}
