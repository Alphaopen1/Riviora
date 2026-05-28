import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

const locales = ["fr", "en", "de", "es"] as const;
type Locale = (typeof locales)[number];

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const metaByLocale: Record<Locale, { title: string; description: string; ogLocale: string }> = {
  fr: {
    title: "Riviora | Excursions & VTC Privé sur la Côte d'Azur",
    description: "Chauffeur privé & excursions premium sur la Côte d'Azur. Monaco, Saint-Tropez, Nice, Cannes. Transferts aéroport, journées sur mesure. Disponible 24h/24.",
    ogLocale: "fr_FR",
  },
  en: {
    title: "Riviora | Private Driver & Excursions on the French Riviera",
    description: "Private chauffeur & premium excursions on the French Riviera. Monaco, Saint-Tropez, Nice, Cannes. Airport transfers, custom day tours. Available 24/7.",
    ogLocale: "en_GB",
  },
  de: {
    title: "Riviora | Privatfahrer & Ausflüge an der Côte d'Azur",
    description: "Privatfahrer & Premium-Ausflüge an der Côte d'Azur. Monaco, Saint-Tropez, Nizza, Cannes. Flughafentransfers, individuelle Tagestouren. Buchung 24/7.",
    ogLocale: "de_DE",
  },
  es: {
    title: "Riviora | Conductor Privado & Excursiones en la Costa Azul",
    description: "Chófer privado & excursiones premium en la Costa Azul. Mónaco, Saint-Tropez, Niza, Cannes. Traslados aeropuerto, itinerarios a medida. Disponible 24h.",
    ogLocale: "es_ES",
  },
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B1F3A",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const l = (locales.includes(locale as Locale) ? locale : "fr") as Locale;
  const meta = metaByLocale[l];
  // Trailing slash ONLY on the FR root (Next.js redirects /en/ → /en otherwise,
  // which makes GSC flag the URL as "Page with redirect" and refuse to index).
  const canonicalPath = l === "fr" ? "/" : `/${l}`;

  return {
    title: { default: meta.title, template: "%s | Riviora" },
    description: meta.description,
    keywords: ["excursion Côte d'Azur", "VTC Nice", "chauffeur privé Monaco", "transfert aéroport Nice", "excursion Saint-Tropez", "tour Riviera française"],
    authors: [{ name: "Riviora", url: "https://riviora.fr" }],
    creator: "Riviora",
    publisher: "Riviora",
    alternates: {
      canonical: `https://riviora.fr${canonicalPath}`,
      languages: {
        fr: "https://riviora.fr/",
        en: "https://riviora.fr/en",
        de: "https://riviora.fr/de",
        es: "https://riviora.fr/es",
        "x-default": "https://riviora.fr/",
      },
    },
    openGraph: {
      type: "website",
      locale: meta.ogLocale,
      url: `https://riviora.fr${canonicalPath}`,
      // ↑ same canonical as alternates — no trailing slash on /en, /de, /es
      siteName: "Riviora",
      title: meta.title,
      description: meta.description,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Riviora - Excursions Côte d'Azur" }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/og-image.jpg"],
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        {/* Preconnect — réduit la latence des ressources tierces (PageSpeed Mobile) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        {/* DNS prefetch fallback pour navigateurs qui ne supportent pas preconnect */}
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        {/* Geo tags — Local SEO: Nice, Côte d'Azur */}
        <meta name="geo.region" content="FR-06" />
        <meta name="geo.placename" content="Nice, Côte d'Azur" />
        <meta name="geo.position" content="43.7102;7.2620" />
        <meta name="ICBM" content="43.7102, 7.2620" />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
