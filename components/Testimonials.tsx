import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sophie & Marc D.",
    origin: "Paris, France",
    flag: "🇫🇷",
    service: "Excursion Monaco + Eze",
    rating: 5,
    text: "Une journée exceptionnelle ! Notre chauffeur connaissait chaque recoin de Monaco et d'Eze. Il nous a emmené dans des restaurants et des points de vue que nous n'aurions jamais trouvés seuls. Service impeccable du début à la fin. On reviendra !",
    date: "Mars 2024",
  },
  {
    name: "James & Catherine W.",
    origin: "London, UK",
    flag: "🇬🇧",
    service: "Airport Transfer Nice + 2 day tour",
    rating: 5,
    text: "Absolutely flawless service. The driver was waiting for us at arrivals despite our 45-minute delay, professional, bilingual and knowledgeable. The 2-day Riviera tour was the highlight of our trip to France. Highly recommend Riviora without hesitation.",
    date: "April 2024",
  },
  {
    name: "Francesca M.",
    origin: "Milano, Italia",
    flag: "🇮🇹",
    service: "Escursione Saint-Tropez",
    rating: 5,
    text: "Esperienza meravigliosa! Il nostro autista era puntuale, elegante e ci ha portato nei posti più belli di Saint-Tropez, lontano dalle folle. Il veicolo era impeccabile. Riviora è semplicemente il miglior servizio di trasporto privato della Costa Azzurra.",
    date: "Giugno 2024",
  },
  {
    name: "Hans-Peter & Ingrid K.",
    origin: "München, Deutschland",
    flag: "🇩🇪",
    service: "Gorges du Verdon Tagesausflug",
    rating: 5,
    text: "Der Ausflug in die Gorges du Verdon war atemberaubend. Unser Fahrer wusste genau, wo man anhalten sollte für die besten Fotos. Sehr professionell, pünktlich und das Fahrzeug war makellos sauber. Absolut empfehlenswert!",
    date: "Juli 2024",
  },
  {
    name: "Ahmed & Sara B.",
    origin: "Dubai, UAE",
    flag: "🇦🇪",
    service: "Week-end Riviera sur mesure",
    rating: 5,
    text: "We booked a full weekend tour across the French Riviera for our anniversary. Riviora exceeded every expectation — from the restaurant recommendations to the perfectly timed sunset at Cap d'Antibes. This is the gold standard for private tours.",
    date: "September 2024",
  },
  {
    name: "Isabelle T.",
    origin: "Bruxelles, Belgique",
    flag: "🇧🇪",
    service: "Séminaire groupe 15 personnes",
    rating: 5,
    text: "Nous avons fait appel à Riviora pour notre séminaire d'entreprise. 15 personnes, deux jours de déplacements entre Nice, Cannes et Monaco. Tout était parfaitement orchestré, le Sprinter était superbe et le chauffeur d'une discrétion et d'un professionnalisme remarquables.",
    date: "Octobre 2024",
  },
];

export default function Testimonials() {
  return (
    <section id="avis" className="bg-white py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#C9A96E] font-semibold text-sm uppercase tracking-widest mb-3">
            Témoignages
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0B1F3A] mb-5">
            Ils ont vécu l'expérience{" "}
            <span className="text-[#C9A96E]">Riviora</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="text-[#C9A96E] fill-[#C9A96E]" />
              ))}
            </div>
            <span className="text-[#0B1F3A] font-bold text-lg">4.9 / 5</span>
            <span className="text-gray-400">· +500 avis vérifiés Google</span>
          </div>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-[#F8F6F1] p-7 relative group hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
            >
              <Quote
                size={32}
                className="text-[#C9A96E]/20 absolute top-6 right-6"
                aria-hidden="true"
              />

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={14} className="text-[#C9A96E] fill-[#C9A96E]" />
                ))}
              </div>

              {/* Text */}
              <blockquote className="text-gray-600 text-sm leading-relaxed mb-6 italic">
                &ldquo;{t.text}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="border-t border-gray-200 pt-4 flex items-start justify-between">
                <div>
                  <div className="font-bold text-[#0B1F3A] text-sm">
                    {t.flag} {t.name}
                  </div>
                  <div className="text-gray-400 text-xs mt-0.5">{t.origin}</div>
                  <div className="text-[#C9A96E] text-xs font-medium mt-1">{t.service}</div>
                </div>
                <div className="text-gray-300 text-xs">{t.date}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Google CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm mb-4">
            Toutes nos évaluations sont vérifiées sur Google Business
          </p>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-[#0B1F3A] text-[#0B1F3A] font-bold px-8 py-3.5 text-sm uppercase tracking-widest hover:bg-[#0B1F3A] hover:text-white transition-all duration-300"
          >
            Voir tous les avis Google
          </a>
        </div>
      </div>
    </section>
  );
}
