"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Comment réserver un chauffeur privé ou une excursion avec Riviora ?",
    answer:
      "La réservation se fait en 3 étapes : remplissez notre formulaire en ligne, par téléphone au +33 7 87 24 86 91, ou par email à contact@riviora.fr. Nous vous répondons en moins de 2 heures avec une confirmation et un devis définitif. Pour les réservations urgentes, appelez-nous directement — nous sommes disponibles 24h/24.",
  },
  {
    question: "Quels sont les modes de paiement acceptés ?",
    answer:
      "Nous acceptons les virements bancaires, les cartes bancaires (Visa, Mastercard, Amex), et les espèces. Pour les entreprises, nous proposons la facturation différée. Aucun acompte n'est requis pour les transferts standards ; un acompte de 30% est demandé pour les excursions d'une journée ou plus.",
  },
  {
    question: "Y a-t-il des frais supplémentaires en cas de retard de vol ?",
    answer:
      "Non. Nous suivons tous les vols en temps réel grâce au numéro de vol que vous nous fournissez. En cas de retard, votre chauffeur adapte son heure d'arrivée sans aucun supplément. L'attente à l'aéroport est incluse jusqu'à 60 minutes après l'atterrissage.",
  },
  {
    question: "Puis-je personnaliser l'itinéraire de mon excursion ?",
    answer:
      "Absolument. Chaque excursion Riviora est entièrement personnalisable. Dites-nous vos envies (gastronomie, culture, plages, shopping, photographie…), vos contraintes horaires et votre niveau d'activité. Votre chauffeur-guide adaptera le programme en temps réel selon vos souhaits.",
  },
  {
    question: "Combien de passagers peuvent prendre place dans vos véhicules ?",
    answer:
      "Notre Mercedes Classe V accueille confortablement jusqu'à 8 passagers avec leurs bagages. Pour les groupes de 9 à 21 personnes, nous disposons d'un Mercedes Sprinter aménagé. Pour les groupes plus importants, nous pouvons coordonner plusieurs véhicules — contactez-nous pour un devis groupes.",
  },
  {
    question: "Vos chauffeurs parlent-ils anglais ?",
    answer:
      "Oui. Tous nos chauffeurs sont bilingues français-anglais, et certains parlent également l'italien, l'espagnol ou l'arabe. Pour les groupes nécessitant une langue spécifique, merci de le préciser lors de votre réservation.",
  },
  {
    question: "Proposez-vous des excursions depuis Cannes, Monaco ou d'autres villes ?",
    answer:
      "Oui, Riviora opère depuis toutes les grandes villes de la Côte d'Azur : Nice, Cannes, Monaco, Antibes, Menton, Saint-Raphaël. Indiquez-nous votre point de départ lors de la réservation et nous ajustons le tarif en conséquence.",
  },
  {
    question: "Quelle est votre politique d'annulation ?",
    answer:
      "Annulation gratuite jusqu'à 48h avant la prestation. Entre 24h et 48h : 50% du montant retenu. Moins de 24h : 100% retenu. Les no-shows (aucune annulation) sont facturés intégralement. Pour les cas de force majeure (météo extrême, maladie avec justificatif), nous trouvons toujours une solution.",
  },
  {
    question: "Riviora est-il disponible le soir, les week-ends et les jours fériés ?",
    answer:
      "Oui, nous sommes disponibles 24h/24, 7j/7, 365 jours par an, y compris les jours fériés et pendant les événements (Grand Prix de Monaco, Festival de Cannes, etc.). Une majoration de nuit (+20%) s'applique de 22h à 6h du matin.",
  },
  {
    question: "Est-il possible de louer un véhicule avec chauffeur pour une journée complète ?",
    answer:
      "Oui, c'est l'une de nos formules les plus demandées. La mise à disposition journalière (8h) avec chauffeur permet de visiter plusieurs destinations à votre rythme, sans contrainte d'horaire. Idéal pour découvrir la Riviera de façon approfondie. Tarif à partir de 480€/jour.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  const toggle = (i: number) => setOpen(open === i ? null : i);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <section id="faq" className="bg-[#F8F6F1] py-24 px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#C9A96E] font-semibold text-sm uppercase tracking-widest mb-3">
            FAQ
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0B1F3A] mb-5">
            Questions <span className="text-[#C9A96E]">fréquentes</span>
          </h2>
          <p className="text-gray-500 text-lg">
            Tout ce que vous devez savoir avant de réserver votre excursion ou votre transfert.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white overflow-hidden"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between p-6 text-left group hover:bg-[#0B1F3A] transition-colors duration-300"
                aria-expanded={open === i}
              >
                <span
                  className={`font-semibold text-sm md:text-base pr-4 transition-colors duration-300 ${
                    open === i
                      ? "text-[#C9A96E]"
                      : "text-[#0B1F3A] group-hover:text-white"
                  }`}
                >
                  {faq.question}
                </span>
                <span className="flex-shrink-0">
                  {open === i ? (
                    <Minus
                      size={20}
                      className="text-[#C9A96E]"
                    />
                  ) : (
                    <Plus
                      size={20}
                      className="text-[#C9A96E] group-hover:text-[#C9A96E]"
                    />
                  )}
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-6 text-gray-600 text-sm leading-relaxed border-t border-gray-100">
                  <p className="pt-4">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-500 mb-6">
            Vous n'avez pas trouvé la réponse à votre question ?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+33787248691"
              className="bg-[#0B1F3A] text-white font-bold px-8 py-4 text-sm uppercase tracking-widest hover:bg-[#C9A96E] hover:text-[#0B1F3A] transition-all duration-300 text-center"
            >
              Appeler : +33 7 87 24 86 91
            </a>
            <a
              href="mailto:contact@riviora.fr"
              className="border-2 border-[#0B1F3A] text-[#0B1F3A] font-bold px-8 py-4 text-sm uppercase tracking-widest hover:bg-[#0B1F3A] hover:text-white transition-all duration-300 text-center"
            >
              contact@riviora.fr
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
