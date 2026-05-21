import { Metadata } from "next";
import Link from "next/link";
import { Clock, Phone, ArrowRight } from "lucide-react";
import { destinations } from "@/lib/destinations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getTranslations } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

const destMeta: Record<string, { title: string; description: string; ogTitle: string; ogDescription: string }> = {
  fr: {
    title: "Toutes les destinations | Excursions Côte d'Azur & Europe | Riviora",
    description: "Explorez toutes nos destinations : Monaco, Saint-Tropez, Cannes, Eze, Gorges du Verdon, Milan, Genève, Courchevel… Excursions et transferts privés depuis Nice.",
    ogTitle: "Destinations | Riviora — Excursions & VTC Côte d'Azur",
    ogDescription: "13 destinations sur la Côte d'Azur et en Europe avec chauffeur privé. Monaco, Saint-Tropez, Milan, Genève, Courchevel…",
  },
  en: {
    title: "All Destinations | French Riviera Excursions & Europe | Riviora",
    description: "Explore all our destinations: Monaco, Saint-Tropez, Cannes, Eze, Gorges du Verdon, Milan, Geneva, Courchevel… Private excursions & transfers from Nice.",
    ogTitle: "Destinations | Riviora — Private Excursions French Riviera",
    ogDescription: "13 destinations on the French Riviera and in Europe with private chauffeur. Monaco, Saint-Tropez, Milan, Geneva, Courchevel…",
  },
  de: {
    title: "Alle Reiseziele | Ausflüge Côte d'Azur & Europa | Riviora",
    description: "Entdecken Sie alle unsere Reiseziele: Monaco, Saint-Tropez, Cannes, Eze, Gorges du Verdon, Mailand, Genf, Courchevel… Private Ausflüge & Transfers ab Nizza.",
    ogTitle: "Reiseziele | Riviora — Private Ausflüge Côte d'Azur",
    ogDescription: "13 Reiseziele an der Côte d'Azur und in Europa mit Privatfahrer. Monaco, Saint-Tropez, Mailand, Genf, Courchevel…",
  },
  es: {
    title: "Todos los destinos | Excursiones Costa Azul & Europa | Riviora",
    description: "Explora todos nuestros destinos: Mónaco, Saint-Tropez, Cannes, Eze, Gorges du Verdon, Milán, Ginebra, Courchevel… Excursiones privadas & traslados desde Niza.",
    ogTitle: "Destinos | Riviora — Excursiones Privadas Costa Azul",
    ogDescription: "13 destinos en la Costa Azul y Europa con conductor privado. Mónaco, Saint-Tropez, Milán, Ginebra, Courchevel…",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const l = (["fr", "en", "de", "es"].includes(locale) ? locale : "fr") as keyof typeof destMeta;
  const meta = destMeta[l];
  const canonicalPath = l === "fr" ? "/destinations" : `/${l}/destinations`;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `https://riviora.fr${canonicalPath}`,
      languages: {
        fr: "https://riviora.fr/destinations",
        en: "https://riviora.fr/en/destinations",
        de: "https://riviora.fr/de/destinations",
        es: "https://riviora.fr/es/destinations",
        "x-default": "https://riviora.fr/destinations",
      },
    },
    openGraph: {
      title: meta.ogTitle,
      description: meta.ogDescription,
    },
  };
}

const local = destinations.filter((d) =>
  ["monaco", "saint-tropez", "cannes", "eze", "antibes", "grasse", "gorges-du-verdon"].includes(d.slug)
);
const intl = destinations.filter((d) =>
  ["milan", "portofino", "cinque-terre", "geneve", "courchevel", "megeve"].includes(d.slug)
);

function DestCard({ dest, discover }: { dest: (typeof destinations)[0]; discover: string }) {
  return (
    <Link
      href={`/destinations/${dest.slug}`}
      className="group relative overflow-hidden block bg-[#0B1F3A]"
      style={{ minHeight: "280px" }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${dest.heroImage})` }}
        role="img"
        aria-label={dest.name}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/90 via-[#0B1F3A]/20 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="flex items-center gap-2 text-white/50 text-xs mb-2">
          <Clock size={11} />
          {dest.duration}
        </div>
        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#C9A96E] transition-colors">
          {dest.name}
        </h3>
        <p className="text-white/60 text-xs leading-relaxed mb-3 line-clamp-2">
          {dest.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-[#C9A96E] font-bold text-sm">{dest.priceLabel}</span>
          <span className="flex items-center gap-1 text-white/60 text-xs font-semibold uppercase tracking-wide group-hover:text-[#C9A96E] transition-colors">
            {discover} <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default async function DestinationsPage() {
  const t = await getTranslations();

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <div className="bg-[#0B1F3A] pt-28 pb-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <p className="text-[#C9A96E] font-semibold text-sm uppercase tracking-widest mb-3">
              Riviora
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-5 leading-tight">
              {t("destinations.allTitle")}{" "}
              <span className="text-[#C9A96E]">{t("nav.destinations")}</span>
            </h1>
            <p className="text-white/60 text-xl max-w-2xl leading-relaxed mb-8">
              {t("destinations.heroSubtitle")}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="tel:+33787248691"
                className="flex items-center gap-2 bg-[#C9A96E] text-[#0B1F3A] font-bold px-8 py-4 text-sm uppercase tracking-widest hover:bg-[#E8C98A] transition-all"
              >
                <Phone size={16} />
                +33 7 87 24 86 91
              </a>
              <a
                href="https://wa.me/33787248691"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#25D366] text-white font-bold px-8 py-4 text-sm uppercase tracking-widest hover:bg-[#1ebe5d] transition-all"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Local destinations */}
        <div className="bg-[#F8F6F1] py-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-[#0B1F3A] mb-2">
              {t("destinations.localTitle")}
            </h2>
            <p className="text-gray-500 mb-8">
              {t("destinations.localSubtitle")}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {local.map((d) => (
                <DestCard key={d.slug} dest={d} discover={t("destinations.discover")} />
              ))}
            </div>
          </div>
        </div>

        {/* International */}
        <div className="bg-white py-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-[#0B1F3A] mb-2">
              {t("destinations.intlTitle")}
            </h2>
            <p className="text-gray-500 mb-8">
              {t("destinations.intlSubtitle")}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {intl.map((d) => (
                <DestCard key={d.slug} dest={d} discover={t("destinations.discover")} />
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#0B1F3A] py-16 px-4 sm:px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">
              {t("destinations.customCta")}
            </h2>
            <p className="text-white/60 mb-8">
              {t("destinations.ctaSubtitle")}
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 bg-[#C9A96E] text-[#0B1F3A] font-bold px-10 py-5 text-sm uppercase tracking-widest hover:bg-[#E8C98A] transition-all"
            >
              {t("destinations.customBtn")} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
