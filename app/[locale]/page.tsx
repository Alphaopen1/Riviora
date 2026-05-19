import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Destinations from "@/components/Destinations";
import Fleet from "@/components/Fleet";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import BookingWizard from "@/components/BookingWizard";
import { getTranslations } from "next-intl/server";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Comment réserver un chauffeur privé ou une excursion avec Riviora ?",
      acceptedAnswer: { "@type": "Answer", text: "La réservation se fait en 3 étapes : remplissez notre formulaire en ligne, par téléphone au +33 7 87 24 86 91, ou par email à contact@riviora.fr. Nous vous répondons en moins de 2 heures avec une confirmation et un devis définitif." },
    },
    {
      "@type": "Question",
      name: "Quels sont les modes de paiement acceptés ?",
      acceptedAnswer: { "@type": "Answer", text: "Nous acceptons les virements bancaires, les cartes bancaires (Visa, Mastercard, Amex), et les espèces. Pour les entreprises, nous proposons la facturation différée." },
    },
    {
      "@type": "Question",
      name: "Y a-t-il des frais supplémentaires en cas de retard de vol ?",
      acceptedAnswer: { "@type": "Answer", text: "Non. Nous suivons tous les vols en temps réel. En cas de retard, votre chauffeur adapte son heure d'arrivée sans aucun supplément. L'attente à l'aéroport est incluse jusqu'à 60 minutes après l'atterrissage." },
    },
    {
      "@type": "Question",
      name: "Quelle est votre politique d'annulation ?",
      acceptedAnswer: { "@type": "Answer", text: "Annulation gratuite jusqu'à 48h avant la prestation. Entre 24h et 48h : 50% du montant retenu. Moins de 24h : 100% retenu." },
    },
  ],
};
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "TouristInformationCenter"],
  name: "Riviora",
  description:
    "Service de chauffeur privé VTC et d'excursions premium sur la Côte d'Azur. Monaco, Saint-Tropez, Cannes, Nice. Disponible 24h/24.",
  url: "https://riviora.fr",
  telephone: "+33787248691",
  email: "contact@riviora.fr",
  logo: "https://riviora.fr/og-image.jpg",
  image: "https://riviora.fr/og-image.jpg",
  priceRange: "€€€",
  currenciesAccepted: "EUR",
  paymentAccepted: "Cash, Credit Card, Bank Transfer",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday", "Tuesday", "Wednesday", "Thursday",
        "Friday", "Saturday", "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Nice",
    addressLocality: "Nice",
    addressRegion: "Provence-Alpes-Côte d'Azur",
    postalCode: "06000",
    addressCountry: "FR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 43.7102,
    longitude: 7.262,
  },
  areaServed: [
    { "@type": "City", name: "Nice" },
    { "@type": "City", name: "Monaco" },
    { "@type": "City", name: "Cannes" },
    { "@type": "City", name: "Antibes" },
    { "@type": "City", name: "Menton" },
    { "@type": "City", name: "Saint-Tropez" },
    { "@type": "AdministrativeArea", name: "Côte d'Azur" },
    { "@type": "AdministrativeArea", name: "Alpes-Maritimes" },
    { "@type": "AdministrativeArea", name: "Var" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Excursions & Transferts Côte d'Azur",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Transfert Aéroport Nice",
        description: "Transfert privé depuis/vers l'aéroport de Nice Côte d'Azur",
        price: "50",
        priceCurrency: "EUR",
      },
      {
        "@type": "Offer",
        name: "Excursion Monaco, Monte-Carlo & Eze",
        description: "Demi-journée Monaco, Monte-Carlo et Eze Village en véhicule privé",
        price: "500",
        priceCurrency: "EUR",
      },
      {
        "@type": "Offer",
        name: "Excursion Riviera complète",
        description: "Journée complète sur la Côte d'Azur avec itinéraire personnalisé",
        price: "900",
        priceCurrency: "EUR",
      },
      {
        "@type": "Offer",
        name: "Excursion Gorges du Verdon",
        description: "Journée complète aux Gorges du Verdon, lac de Sainte-Croix et Moustiers",
        price: "900",
        priceCurrency: "EUR",
      },
    ],
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "87",
    bestRating: "5",
    worstRating: "1",
  },
  sameAs: [
    "https://www.instagram.com/riviora",
    "https://www.facebook.com/riviora",
  ],
};

export default async function Home() {
  const t = await getTranslations("booking");

  return (
    <>
      {/* Preload LCP: first Hero slide poster (above-the-fold image) */}
      <link
        rel="preload"
        as="image"
        href="https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?auto=format&fit=crop&w=1920&q=80"
        fetchPriority="high"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Destinations />
        <Fleet />
        <Pricing />
        <Testimonials />
        <FAQ />

        {/* Booking Wizard section */}
        <section id="booking" className="bg-[#0B1F3A] py-20 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-[#C9A96E] font-semibold text-sm uppercase tracking-widest mb-3">
                {t("badge")}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t("title")} <span className="text-[#C9A96E]">{t("titleAccent")}</span>
              </h2>
              <p className="text-white/55 text-base">
                {t("subtitle")}
              </p>
            </div>
            <BookingWizard />
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
      <WhatsAppWidget />
    </>
  );
}
