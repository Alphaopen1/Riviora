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
import MobileCTABar from "@/components/MobileCTABar";
import BookingWizard from "@/components/BookingWizard";
import { getTranslations } from "next-intl/server";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Comment réserver un chauffeur privé ou une excursion avec Riviora ?",
      acceptedAnswer: { "@type": "Answer", text: "La réservation se fait via le formulaire en ligne sur riviora.fr, par téléphone au +33 7 87 24 86 91, ou par email à contact@riviora.fr. Riviora confirme la disponibilité et envoie un devis définitif en moins de 2 heures. Pour les urgences, l'appel direct est disponible 24h/24." },
    },
    {
      "@type": "Question",
      name: "Quels sont les modes de paiement acceptés ?",
      acceptedAnswer: { "@type": "Answer", text: "Riviora accepte les virements bancaires, les cartes bancaires (Visa, Mastercard, Amex) et les espèces. Pour les entreprises et groupes, la facturation différée est disponible. Aucun acompte n'est requis pour les transferts standards ; 30 % pour les excursions d'une journée ou plus." },
    },
    {
      "@type": "Question",
      name: "Y a-t-il des frais supplémentaires en cas de retard de vol ?",
      acceptedAnswer: { "@type": "Answer", text: "Non. Riviora suit tous les vols en temps réel grâce au numéro de vol fourni lors de la réservation. L'attente à l'aéroport de Nice est incluse jusqu'à 60 minutes après l'atterrissage, sans supplément. Au-delà, un tarif d'attente s'applique." },
    },
    {
      "@type": "Question",
      name: "Quelle est votre politique d'annulation ?",
      acceptedAnswer: { "@type": "Answer", text: "Annulation gratuite jusqu'à 48 heures avant la prestation. Entre 24h et 48h : 50 % du montant retenu. Moins de 24h avant ou no-show : 100 % retenu. Les cas de force majeure (météo extrême, maladie avec justificatif) sont étudiés individuellement." },
    },
    {
      "@type": "Question",
      name: "Puis-je personnaliser l'itinéraire de mon excursion ?",
      acceptedAnswer: { "@type": "Answer", text: "Oui, chaque excursion Riviora est entièrement personnalisable. Les clients indiquent leurs envies (gastronomie, culture, plages, shopping, photographie), contraintes horaires et niveau d'activité. Le chauffeur-guide adapte le programme en temps réel selon les souhaits, sans coût supplémentaire." },
    },
    {
      "@type": "Question",
      name: "Combien de passagers peuvent prendre place dans vos véhicules ?",
      acceptedAnswer: { "@type": "Answer", text: "La Mercedes Classe V accueille confortablement jusqu'à 8 passagers avec leurs bagages. Pour les groupes de 9 à 21 personnes, Riviora dispose d'un Mercedes Sprinter aménagé. Pour les groupes plus importants, la coordination de plusieurs véhicules est possible sur devis." },
    },
    {
      "@type": "Question",
      name: "Vos chauffeurs parlent-ils anglais ?",
      acceptedAnswer: { "@type": "Answer", text: "Oui, tous les chauffeurs Riviora sont bilingues français-anglais. Certains parlent également l'italien, l'espagnol ou l'arabe. La langue préférée du chauffeur peut être précisée lors de la réservation pour les groupes internationaux." },
    },
    {
      "@type": "Question",
      name: "Proposez-vous des excursions depuis Cannes, Monaco ou d'autres villes ?",
      acceptedAnswer: { "@type": "Answer", text: "Oui, Riviora opère depuis toutes les grandes villes de la Côte d'Azur : Nice, Cannes, Monaco, Antibes, Menton, Saint-Raphaël. Le point de départ est indiqué lors de la réservation et le tarif est ajusté en conséquence." },
    },
    {
      "@type": "Question",
      name: "Riviora est-il disponible le soir, les week-ends et les jours fériés ?",
      acceptedAnswer: { "@type": "Answer", text: "Oui, Riviora est disponible 24h/24, 7j/7, 365 jours par an, y compris les jours fériés et pendant les événements (Grand Prix de Monaco, Festival de Cannes). Une majoration de nuit de 20 % s'applique de 22h à 6h du matin." },
    },
    {
      "@type": "Question",
      name: "Est-il possible de louer un véhicule avec chauffeur pour une journée complète ?",
      acceptedAnswer: { "@type": "Answer", text: "Oui, la mise à disposition journalière (8h) avec chauffeur est l'une des formules les plus demandées de Riviora. Elle permet de visiter plusieurs destinations à son rythme, sans contrainte d'horaire. Tarif à partir de 480€/jour pour la Mercedes Classe V." },
    },
  ],
};
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "TravelAgency", "TouristInformationCenter"],
  "@id": "https://riviora.fr/#business",
  name: "Riviora",
  alternateName: "Riviora VTC",
  description: "Service de chauffeur privé VTC et d'excursions premium sur la Côte d'Azur depuis 2009. Monaco, Saint-Tropez, Cannes, Nice, Gorges du Verdon. Disponible 24h/24, 7j/7.",
  foundingDate: "2009",
  url: "https://riviora.fr",
  telephone: "+33787248691",
  email: "contact@riviora.fr",
  logo: "https://riviora.fr/og-image.jpg",
  image: "https://riviora.fr/og-image.jpg",
  priceRange: "€€€",
  currenciesAccepted: "EUR",
  paymentAccepted: "Cash, Credit Card, Bank Transfer, Wire Transfer",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
  ],
  address: {
    "@type": "PostalAddress",
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
    { "@type": "City", name: "Grasse" },
    { "@type": "City", name: "Villefranche-sur-Mer" },
    { "@type": "AdministrativeArea", name: "Côte d'Azur" },
    { "@type": "AdministrativeArea", name: "Alpes-Maritimes" },
    { "@type": "AdministrativeArea", name: "Var" },
    { "@type": "AdministrativeArea", name: "Riviera italienne" },
  ],
  knowsAbout: [
    "Chauffeur privé VTC Côte d'Azur",
    "Excursions privées depuis Nice",
    "Transferts aéroport Nice",
    "Tourisme de luxe Riviera française",
    "Transport groupe Monaco Cannes",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Excursions & Transferts Côte d'Azur",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Transfert Aéroport Nice (NCE)",
        description: "Transfert privé depuis/vers l'aéroport de Nice Côte d'Azur. Accueil nominatif, 60 min d'attente incluses, suivi de vol en temps réel.",
        price: "50",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        seller: { "@type": "Organization", name: "Riviora" },
      },
      {
        "@type": "Offer",
        name: "Excursion Monaco, Monte-Carlo & Eze",
        description: "Demi-journée 4–5h : Casino de Monte-Carlo, Palais du Prince, village d'Eze perché à 427m. Départ depuis Nice ou Cannes.",
        price: "500",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        seller: { "@type": "Organization", name: "Riviora" },
      },
      {
        "@type": "Offer",
        name: "Excursion Riviera complète — Monaco, Eze, Antibes, Cannes",
        description: "Journée complète 8h sur la Côte d'Azur : Monaco, Eze, Nice, Antibes et Cannes. Itinéraire personnalisable.",
        price: "900",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        seller: { "@type": "Organization", name: "Riviora" },
      },
      {
        "@type": "Offer",
        name: "Excursion Saint-Tropez & Var",
        description: "Journée 8h : village de pêcheurs, plages de Pampelonne, Ramatuelle. Départ depuis Nice ou Cannes.",
        price: "670",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        seller: { "@type": "Organization", name: "Riviora" },
      },
      {
        "@type": "Offer",
        name: "Excursion Gorges du Verdon",
        description: "Journée 9h : Grand Canyon européen, lac de Sainte-Croix, Moustiers-Sainte-Marie. Depuis Nice.",
        price: "900",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        seller: { "@type": "Organization", name: "Riviora" },
      },
      {
        "@type": "Offer",
        name: "Mise à disposition journalière avec chauffeur",
        description: "Chauffeur disponible 8h avec itinéraire libre. Idéal pour explorer la Riviera sans contrainte d'horaire.",
        price: "480",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        seller: { "@type": "Organization", name: "Riviora" },
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
    "https://www.reddit.com/user/Riviora_excursion/",
  ],
};

// Organization schema — entity recognition pour les LLM et Google Knowledge Graph
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://riviora.fr/#organization",
  name: "Riviora",
  legalName: "Riviora",
  foundingDate: "2009",
  description: "Riviora est une entreprise de chauffeur privé VTC et d'excursions premium basée à Nice, Côte d'Azur (France). Fondée en 2009, elle propose des transferts aéroport, des excursions privées et de la mise à disposition journalière sur l'ensemble de la Riviera française.",
  url: "https://riviora.fr",
  logo: {
    "@type": "ImageObject",
    url: "https://riviora.fr/og-image.jpg",
    width: 1200,
    height: 630,
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+33787248691",
    email: "contact@riviora.fr",
    contactType: "customer service",
    availableLanguage: ["French", "English"],
    hoursAvailable: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nice",
    addressRegion: "Provence-Alpes-Côte d'Azur",
    postalCode: "06000",
    addressCountry: "FR",
  },
  sameAs: [
    "https://www.instagram.com/riviora",
    "https://www.facebook.com/riviora",
    "https://www.reddit.com/user/Riviora_excursion/",
  ],
  knowsAbout: [
    "Chauffeur privé VTC",
    "Excursions Côte d'Azur",
    "Transferts aéroport Nice",
    "Tourisme de luxe Riviera",
    "Monaco excursion privée",
    "Saint-Tropez transport",
    "Gorges du Verdon journée",
  ],
};

export default async function Home() {
  const t = await getTranslations("booking");

  return (
    <>
      {/* Preload LCP: first Hero slide poster — mobile (828px) + desktop (1920px) */}
      <link
        rel="preload"
        as="image"
        href="https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?auto=format&fit=crop&w=828&q=75"
        imageSrcSet="https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?auto=format&fit=crop&w=828&q=75 828w, https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?auto=format&fit=crop&w=1920&q=80 1920w"
        imageSizes="100vw"
        fetchPriority="high"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
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
      <MobileCTABar />
    </>
  );
}
