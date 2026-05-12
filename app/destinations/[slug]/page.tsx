import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, MapPin, Phone, ArrowLeft, Check, Star } from "lucide-react";
import { destinations, getDestinationBySlug } from "@/lib/destinations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dest = getDestinationBySlug(slug);
  if (!dest) return {};
  return {
    title: dest.metaTitle,
    description: dest.metaDescription,
    keywords: dest.keywords,
    alternates: { canonical: `https://riviora.fr/destinations/${dest.slug}` },
    openGraph: {
      title: dest.metaTitle,
      description: dest.metaDescription,
      url: `https://riviora.fr/destinations/${dest.slug}`,
      images: [{ url: dest.heroImage, width: 1200, height: 630, alt: dest.name }],
    },
  };
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;
  const dest = getDestinationBySlug(slug);
  if (!dest) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: dest.name,
    description: dest.description,
    url: `https://riviora.fr/destinations/${dest.slug}`,
    image: dest.heroImage,
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
    name: `Excursion privée ${dest.name} depuis Nice`,
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
      { "@type": "ListItem", position: 1, name: "Riviora", item: "https://riviora.fr" },
      { "@type": "ListItem", position: 2, name: "Destinations", item: "https://riviora.fr/destinations" },
      { "@type": "ListItem", position: 3, name: dest.name, item: `https://riviora.fr/destinations/${dest.slug}` },
    ],
  };

  const relatedDests = destinations.filter((d) => d.slug !== dest.slug).slice(0, 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />

      <main>
        {/* Hero */}
        <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${dest.heroImage})` }}
            role="img"
            aria-label={dest.name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/90 via-[#0B1F3A]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A]/60 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 pb-12">
            <Link
              href="/#destinations"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors"
            >
              <ArrowLeft size={14} /> Toutes les destinations
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
              <Link href="/#destinations" className="hover:text-white transition-colors">Destinations</Link>
              <span>/</span>
              <span className="text-[#C9A96E]">{dest.name}</span>
            </nav>
            <div className="flex items-center gap-6">
              <span className="text-[#C9A96E] font-bold">{dest.priceLabel}</span>
              <a
                href="tel:+33787248691"
                className="flex items-center gap-2 bg-[#C9A96E] text-[#0B1F3A] font-bold px-5 py-2.5 text-xs uppercase tracking-widest hover:bg-[#E8C98A] transition-all"
              >
                <Phone size={14} /> Réserver
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
                {dest.name} avec chauffeur privé depuis Nice
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
                Les incontournables
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
                Conseils Riviora
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
                <div className="text-white/50 text-xs uppercase tracking-widest mb-1">Meilleure période</div>
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
                  <span className="text-white/50 text-xs ml-1">4.9/5 · +500 avis</span>
                </div>
                <h3 className="text-white text-xl font-bold mb-1">Réservez votre excursion</h3>
                <p className="text-[#C9A96E] font-bold text-lg mb-4">{dest.priceLabel}</p>
                <p className="text-white/55 text-sm mb-6 leading-relaxed">
                  Devis gratuit en moins de 2 heures. Sans engagement.
                </p>

                <div className="space-y-3">
                  <a
                    href={`https://wa.me/33787248691?text=${encodeURIComponent(`Bonjour, je souhaite réserver une excursion ${dest.name} depuis Nice avec Riviora. Pouvez-vous me faire un devis ?`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-4 text-sm uppercase tracking-widest hover:bg-[#1ebe5d] transition-all w-full"
                  >
                    WhatsApp
                  </a>
                  <a
                    href="tel:+33787248691"
                    className="flex items-center justify-center gap-2 bg-[#C9A96E] text-[#0B1F3A] font-bold py-4 text-sm uppercase tracking-widest hover:bg-[#E8C98A] transition-all w-full"
                  >
                    <Phone size={16} />
                    +33 7 87 24 86 91
                  </a>
                  <a
                    href="/#contact"
                    className="flex items-center justify-center gap-2 border border-white/20 text-white font-semibold py-4 text-sm uppercase tracking-widest hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all w-full"
                  >
                    Formulaire en ligne
                  </a>
                </div>

                <div className="mt-6 pt-5 border-t border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-white/50 text-xs">
                    <Clock size={12} className="text-[#C9A96E]" />
                    Réponse garantie en moins de 2h
                  </div>
                  <div className="flex items-center gap-2 text-white/50 text-xs">
                    <Check size={12} className="text-[#C9A96E]" />
                    Annulation gratuite sous 48h
                  </div>
                  <div className="flex items-center gap-2 text-white/50 text-xs">
                    <MapPin size={12} className="text-[#C9A96E]" />
                    Prise en charge partout sur la Côte d'Azur
                  </div>
                </div>
              </div>

              {/* Info card */}
              <div className="mt-4 bg-[#F8F6F1] p-6 space-y-3">
                <div>
                  <div className="text-[#0B1F3A]/50 text-xs uppercase tracking-widest">Durée depuis Nice</div>
                  <div className="text-[#0B1F3A] font-bold">{dest.duration}</div>
                </div>
                <div>
                  <div className="text-[#0B1F3A]/50 text-xs uppercase tracking-widest">Région</div>
                  <div className="text-[#0B1F3A] font-bold">{dest.region}</div>
                </div>
                <div>
                  <div className="text-[#0B1F3A]/50 text-xs uppercase tracking-widest">Véhicule recommandé</div>
                  <div className="text-[#0B1F3A] font-bold">Mercedes Classe V · 1–8 pax</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related destinations */}
        <div className="bg-[#F8F6F1] py-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-2xl font-bold text-[#0B1F3A] mb-8">Autres destinations</h3>
            <div className="grid sm:grid-cols-3 gap-5">
              {relatedDests.map((r) => (
                <Link
                  key={r.slug}
                  href={`/destinations/${r.slug}`}
                  className="group relative overflow-hidden block"
                  style={{ height: "220px" }}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${r.heroImage})` }}
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
    </>
  );
}
