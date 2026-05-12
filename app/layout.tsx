import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Riviora | Excursions & VTC Privé sur la Côte d'Azur",
    template: "%s | Riviora",
  },
  description:
    "Riviora : chauffeur privé et excursions premium sur la Côte d'Azur. Monaco, Saint-Tropez, Cannes, Nice. Transferts aéroport, journées découverte, itinéraires sur mesure. Réservation 24h/24.",
  keywords: [
    "excursion Côte d'Azur",
    "VTC Nice",
    "chauffeur privé Monaco",
    "transfert aéroport Nice",
    "excursion Saint-Tropez",
    "tour Riviera française",
    "excursion Cannes",
    "VTC Monaco",
    "chauffeur privé Riviera",
    "visite privée Nice",
    "excursion journée Côte d'Azur",
    "transport luxe Nice",
  ],
  authors: [{ name: "Riviora", url: "https://riviora.fr" }],
  creator: "Riviora",
  publisher: "Riviora",
  metadataBase: new URL("https://riviora.fr"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://riviora.fr",
    siteName: "Riviora",
    title: "Riviora | Excursions & VTC Privé sur la Côte d'Azur",
    description:
      "Excursions premium et chauffeur privé sur la Riviera. Monaco, Saint-Tropez, Cannes, Nice. Service 24h/24, véhicules haut de gamme.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Riviora - Excursions Côte d'Azur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Riviora | Excursions & VTC Privé Côte d'Azur",
    description:
      "Excursions premium et chauffeur privé sur la Riviera. Monaco, Saint-Tropez, Cannes, Nice.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
