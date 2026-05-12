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

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "TouristInformationCenter"],
  name: "Riviora",
  description:
    "Service de chauffeur privé VTC et d'excursions premium sur la Côte d'Azur. Monaco, Saint-Tropez, Cannes, Nice. Disponible 24h/24.",
  url: "https://riviora.fr",
  telephone: "+33787248691",
  email: "contact@riviora.fr",
  logo: "https://riviora.fr/logo.png",
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
        price: "80",
        priceCurrency: "EUR",
      },
      {
        "@type": "Offer",
        name: "Excursion Monaco",
        description: "Journée découverte Monaco et Monte-Carlo en véhicule privé",
        price: "280",
        priceCurrency: "EUR",
      },
      {
        "@type": "Offer",
        name: "Excursion Riviera complète",
        description: "Journée complète sur la Côte d'Azur avec itinéraire personnalisé",
        price: "520",
        priceCurrency: "EUR",
      },
    ],
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "500",
    bestRating: "5",
    worstRating: "1",
  },
  sameAs: [
    "https://www.instagram.com/riviora",
    "https://www.facebook.com/riviora",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
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
                Réservation Express
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Réservez en <span className="text-[#C9A96E]">2 minutes</span>
              </h2>
              <p className="text-white/55 text-base">
                Répondez à quelques questions et recevez votre devis par email et WhatsApp.
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
