import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Clock, MapPin, Phone, ArrowLeft, Check, Star } from "lucide-react";
import { destinations, getDestinationBySlug } from "@/lib/destinations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileCTABar from "@/components/MobileCTABar";
import { getTranslations } from "next-intl/server";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const locales = ["fr", "en", "de", "es"];
  return destinations.flatMap((d) =>
    locales.map((locale) => ({ locale, slug: d.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const dest = getDestinationBySlug(slug);
  if (!dest) return {};

  const basePath = locale === "fr" ? "" : `/${locale}`;

  return {
    title: dest.metaTitle,
    description: dest.metaDescription,
    keywords: dest.keywords,
    alternates: {
      canonical: `https://riviora.fr${basePath}/destinations/${dest.slug}`,
      languages: {
        fr: `https://riviora.fr/destinations/${dest.slug}`,
        en: `https://riviora.fr/en/destinations/${dest.slug}`,
        de: `https://riviora.fr/de/destinations/${dest.slug}`,
        es: `https://riviora.fr/es/destinations/${dest.slug}`,
        "x-default": `https://riviora.fr/destinations/${dest.slug}`,
      },
    },
    openGraph: {
      type: "website",
      siteName: "Riviora",
      title: dest.metaTitle,
      description: dest.metaDescription,
      url: `https://riviora.fr${basePath}/destinations/${dest.slug}`,
      images: [{ url: dest.heroImage, width: 1200, height: 630, alt: dest.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: dest.metaTitle,
      description: dest.metaDescription,
      images: [dest.heroImage],
    },
  };
}

/** Return 3 related destinations: same region if possible, otherwise nearest */
function getRelatedDests(current: (typeof destinations)[0]) {
  // Same region first
  const sameRegion = destinations.filter(
    (d) => d.slug !== current.slug && d.region === current.region
  );
  if (sameRegion.length >= 3) return sameRegion.slice(0, 3);

  // Same country
  const sameCountry = destinations.filter(
    (d) => d.slug !== current.slug && d.country === current.country && !sameRegion.includes(d)
  );
  const combined = [...sameRegion, ...sameCountry];
  if (combined.length >= 3) return combined.slice(0, 3);

  // Fill with remaining
  const rest = destinations.filter(
    (d) => d.slug !== current.slug && !combined.includes(d)
  );
  return [...combined, ...rest].slice(0, 3);
}

export default async function DestinationPage({ params }: Props) {
  const { locale, slug } = await params;
  const dest = getDestinationBySlug(slug);
  if (!dest) notFound();

  const t = await getTranslations("destPage");
  const basePath = locale === "fr" ? "" : `/${locale}`;
  const pageUrl = `https://riviora.fr${basePath}/destinations/${dest.slug}`;
  const destListUrl = `https://riviora.fr${basePath}/destinations`;
  const inLanguage = locale === "fr" ? "fr-FR" : locale === "en" ? "en-GB" : locale === "de" ? "de-DE" : "es-ES";

  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: dest.name,
    description: dest.description,
    url: pageUrl,
    image: dest.heroImage,
    inLanguage,
    geo: { "@type": "GeoCoordinates", latitude: dest.lat, longitude: dest.lng },
    touristType: ["Luxury traveler", "Family", "Group"],
    includesAttraction: dest.highlights.map((h) => ({
      "@type": "TouristAttraction",
      name: h,
    })),
  };

  const offerSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t("schemaName", { dest: dest.name }),
    inLanguage,
    provider: {
      "@type": "LocalBusiness",
      name: "Riviora",
      telephone: "+33787248691",
      url: "https://riviora.fr",
    },
    areaServed: dest.name,
    offers: {
      "@type": "Offer",
      price: dest.price || "0",
      priceCurrency: "EUR",
      description: dest.priceLabel,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Riviora", item: `https://riviora.fr${basePath}/` },
      { "@type": "ListItem", position: 2, name: t("breadcrumb"), item: destListUrl },
      { "@type": "ListItem", position: 3, name: dest.name, item: pageUrl },
    ],
  };

  const relatedDests = getRelatedDests(dest);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />

      <main>
        {/* Hero */}
        <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
          <Image
            src={dest.heroImage}
            alt={dest.name}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/90 via-[#0B1F3A]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A]/60 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 pb-12">
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors"
            >
              <ArrowLeft size={14} /> {t("backToDestinations")}
            </Link>
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-[#C9A96E] text-[#0B1F3A] text-xs font-bold px-3 py-1 uppercase tracking-widest">
                {dest.country}
              </span>
              <span className="flex items-center gap-1 text-white/60 text-sm">
                <Clock size={14} /> {dest.duration}
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-3 leading-tight">
              {dest.name}
            </h1>
            <p className="text-white/75 text-xl max-w-2xl leading-relaxed">
              {dest.description}
            </p>
          </div>
        </div>

        {/* Breadcrumb + quick info */}
        <div className="bg-[#0B1F3A] py-4 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <nav aria-label="Breadcrumb" className="text-white/40 text-sm flex items-center gap-2">
              <Link href="/" className="hover:text-white transition-colors">Riviora</Link>
              <span>/</span>
              <Link href="/destinations" className="hover:text-white transition-colors">{t("breadcrumb")}</Link>
              <span>/</span>
              <span className="text-[#C9A96E]">{dest.name}</span>
            </nav>
            <div className="flex items-center gap-6">
              <span className="text-[#C9A96E] font-bold">{dest.priceLabel}</span>
              <a
                href="tel:+33787248691"
                className="flex items-center gap-2 bg-[#C9A96E] text-[#0B1F3A] font-bold px-5 py-2.5 text-xs uppercase tracking-widest hover:bg-[#E8C98A] transition-all"
              >
                <Phone size={14} /> {t("bookThis")}
              </a>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid lg:grid-cols-3 gap-12">
          {/* Left — main content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Description */}
            <div>
              <h2 className="text-3xl font-bold text-[#0B1F3A] mb-6">
                {dest.name} {t("withPrivateChauffeur")} {t("fromNice")}
              </h2>
              {dest.longDescription.split("\n\n").map((para, i) => (
                <p key={i} className="text-gray-600 leading-relaxed mb-4 text-base">
                  {para}
                </p>
              ))}
            </div>

            {/* Highlights */}
            <div>
              <h3 className="text-xl font-bold text-[#0B1F3A] mb-5 flex items-center gap-3">
                <span className="w-8 h-0.5 bg-[#C9A96E]" />
                {t("highlights")}
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {dest.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-3 bg-[#F8F6F1] p-4">
                    <Check size={16} className="text-[#C9A96E] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm font-medium">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div>
              <h3 className="text-xl font-bold text-[#0B1F3A] mb-5 flex items-center gap-3">
                <span className="w-8 h-0.5 bg-[#C9A96E]" />
                {t("tips")}
              </h3>
              <div className="space-y-3">
                {dest.tips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-3 border-l-2 border-[#C9A96E] pl-4 py-1">
                    <span className="text-gray-600 text-sm leading-relaxed">{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Best time */}
            <div className="bg-[#0B1F3A] p-6 flex items-center gap-4">
              <Star size={24} className="text-[#C9A96E] flex-shrink-0" />
              <div>
                <div className="text-white/50 text-xs uppercase tracking-widest mb-1">{t("bestTime")}</div>
                <div className="text-white font-semibold">{dest.bestTime}</div>
              </div>
            </div>
          </div>

          {/* Right — booking card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-[#0B1F3A] p-7">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="text-[#C9A96E] fill-[#C9A96E]" />
                  ))}
                  <span className="text-white/50 text-xs ml-1">{t("reviewsBadge")}</span>
                </div>
                <h3 className="text-white text-xl font-bold mb-1">{t("bookThis")}</h3>
                <p className="text-[#C9A96E] font-bold text-lg mb-4">{dest.priceLabel}</p>
                <p className="text-white/55 text-sm mb-6 leading-relaxed">
                  {t("quoteSubtitle")}
                </p>

                <div className="space-y-3">
                  <a
                    href={`https://wa.me/33787248691?text=${encodeURIComponent(t("whatsappPrefill", { dest: dest.name }))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-4 text-sm uppercase tracking-widest hover:bg-[#1ebe5d] transition-all w-full"
                  >
                    {t("whatsappBtn")}
                  </a>
                  <a
                    href="tel:+33787248691"
                    className="flex items-center justify-center gap-2 bg-[#C9A96E] text-[#0B1F3A] font-bold py-4 text-sm uppercase tracking-widest hover:bg-[#E8C98A] transition-all w-full"
                  >
                    <Phone size={16} />
                    +33 7 87 24 86 91
                  </a>
                  <a
                    href="tel:+33787248691"
                    className="flex items-center justify-center gap-2 border border-white/20 text-white font-semibold py-4 text-sm uppercase tracking-widest hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all w-full"
                  >
                    {t("callBtn")}
                  </a>
                </div>

                <div className="mt-6 pt-5 border-t border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-white/50 text-xs">
                    <Clock size={12} className="text-[#C9A96E]" />
                    {t("trustResponse")}
                  </div>
                  <div className="flex items-center gap-2 text-white/50 text-xs">
                    <Check size={12} className="text-[#C9A96E]" />
                    {t("trustCancellation")}
                  </div>
                  <div className="flex items-center gap-2 text-white/50 text-xs">
                    <MapPin size={12} className="text-[#C9A96E]" />
                    {t("trustPickup")}
                  </div>
                </div>
              </div>

              {/* Info card */}
              <div className="mt-4 bg-[#F8F6F1] p-6 space-y-3">
                <div>
                  <div className="text-[#0B1F3A]/50 text-xs uppercase tracking-widest">{t("fromNice")}</div>
                  <div className="text-[#0B1F3A] font-bold">{dest.duration}</div>
                </div>
                <div>
                  <div className="text-[#0B1F3A]/50 text-xs uppercase tracking-widest">{t("regionLabel")}</div>
                  <div className="text-[#0B1F3A] font-bold">{dest.region}</div>
                </div>
                <div>
                  <div className="text-[#0B1F3A]/50 text-xs uppercase tracking-widest">{t("vehicleLabel")}</div>
                  <div className="text-[#0B1F3A] font-bold">{t("vehicleValue")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related destinations */}
        <div className="bg-[#F8F6F1] py-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-2xl font-bold text-[#0B1F3A] mb-8">{t("relatedTitle")}</h3>
            <div className="grid sm:grid-cols-3 gap-5">
              {relatedDests.map((r) => (
                <Link
                  key={r.slug}
                  href={`/destinations/${r.slug}`}
                  className="group relative overflow-hidden block"
                  style={{ height: "220px" }}
                >
                  <Image
                    src={r.heroImage}
                    alt={r.name}
                    fill
                    loading="lazy"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="text-[#C9A96E] text-xs font-semibold uppercase tracking-widest mb-1">
                      {r.duration}
                    </div>
                    <div className="text-white font-bold text-lg">{r.name}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <MobileCTABar />
    </>
  );
}
