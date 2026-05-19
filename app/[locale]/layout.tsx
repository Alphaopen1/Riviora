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
    description: "Riviora : chauffeur privé et excursions premium sur la Côte d'Azur. Monaco, Saint-Tropez, Cannes, Nice. Transferts aéroport, journées découverte, itinéraires sur mesure. Réservation 24h/24.",
    ogLocale: "fr_FR",
  },
  en: {
    title: "Riviora | Private Driver & Excursions on the French Riviera",
    description: "Riviora: private chauffeur and premium excursions on the French Riviera. Monaco, Saint-Tropez, Cannes, Nice. Airport transfers, day tours, custom itineraries. 24/7 bookings.",
    ogLocale: "en_GB",
  },
  de: {
    title: "Riviora | Privatfahrer & Ausflüge an der Côte d'Azur",
    description: "Riviora: Privatfahrer und Premium-Ausflüge an der Côte d'Azur. Monaco, Saint-Tropez, Cannes, Nizza. Flughafentransfers, Tagestouren, individuelle Routen. Buchung 24/7.",
    ogLocale: "de_DE",
  },
  es: {
    title: "Riviora | Conductor Privado & Excursiones en la Costa Azul",
    description: "Riviora: chófer privado y excursiones premium en la Costa Azul. Mónaco, Saint-Tropez, Cannes, Niza. Traslados al aeropuerto, visitas guiadas, itinerarios a medida. Reservas 24h.",
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
  const canonicalPath = l === "fr" ? "/" : `/${l}/`;

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
        en: "https://riviora.fr/en/",
        de: "https://riviora.fr/de/",
        es: "https://riviora.fr/es/",
        "x-default": "https://riviora.fr/",
      },
    },
    openGraph: {
      type: "website",
      locale: meta.ogLocale,
      url: `https://riviora.fr${canonicalPath}`,
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
      <body className="min-h-full flex flex-col antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
