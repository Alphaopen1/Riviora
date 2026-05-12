"use client";

import { Check, Phone } from "lucide-react";

const transfers = [
  { route: "Nice Aéroport → Nice Centre", duration: "20 min", price: "50€" },
  { route: "Nice Aéroport → Monaco", duration: "30 min", price: "90€" },
  { route: "Nice Aéroport → Cannes", duration: "30 min", price: "100€" },
  { route: "Nice Aéroport → Saint-Tropez", duration: "1h30", price: "300€" },
];

const international = [
  { route: "Nice → Milano (Milan)", duration: "3h30", price: "Sur demande" },
  { route: "Nice → Portofino", duration: "2h00", price: "Sur demande" },
  { route: "Nice → Cinque Terre", duration: "2h45", price: "Sur demande" },
  { route: "Nice → Genève", duration: "5h00", price: "Sur demande" },
  { route: "Nice → Courchevel", duration: "4h30", price: "Sur demande" },
  { route: "Nice → Mégève", duration: "4h00", price: "Sur demande" },
];

const excursions = [
  {
    name: "Monaco, Monte-Carlo & Eze",
    duration: "Demi-journée (4–5h)",
    price: "500€",
    includes: ["Casino, Palais du Prince", "Musée Océanographique", "Port Hercule", "Village perché d'Eze"],
  },
  {
    name: "Excursion Complète Riviera",
    duration: "Journée (8h)",
    price: "900€",
    includes: ["Monaco + Eze + Nice", "Antibes + Cap d'Antibes", "Déjeuner inclus (option)", "Itinéraire personnalisé"],
    popular: true,
  },
  {
    name: "Saint-Tropez & Var",
    duration: "Journée (8h)",
    price: "670€",
    includes: ["Port de Saint-Tropez", "Plages de Pampelonne", "Ramatuelle", "Village de Grimaud"],
  },
  {
    name: "Gorges du Verdon",
    duration: "Journée (9h)",
    price: "900€",
    includes: ["Moustiers-Sainte-Marie", "Lac de Sainte-Croix", "Balcon du Verdon", "Point Sublime"],
  },
];

export default function Pricing() {
  return (
    <section id="tarifs" className="bg-[#F8F6F1] py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#C9A96E] font-semibold text-sm uppercase tracking-widest mb-3">
            Tarifs
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0B1F3A] mb-5">
            Tarifs <span className="text-[#C9A96E]">transparents</span>, sans surprise
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Prix tout compris, TVA incluse. Aucun supplément caché, aucun frais de retard de vol.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Transfers */}
          <div>
            <h3 className="text-xl font-bold text-[#0B1F3A] mb-6 flex items-center gap-3">
              <span className="w-8 h-0.5 bg-[#C9A96E]" />
              Transferts & Aéroport
            </h3>
            <div className="bg-white divide-y divide-gray-100 shadow-sm">
              {transfers.map((t) => (
                <div
                  key={t.route}
                  className="flex items-center justify-between p-4 hover:bg-[#F8F6F1] transition-colors"
                >
                  <div>
                    <div className="font-semibold text-[#0B1F3A] text-sm">{t.route}</div>
                    <div className="text-gray-400 text-xs mt-0.5">{t.duration} environ</div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <div className="text-[#C9A96E] font-bold text-lg">{t.price}</div>
                    <div className="text-gray-400 text-xs">TTC</div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-gray-400 text-xs mt-3">
              * Tarifs Mercedes Classe V jusqu'à 8 pax. Majoration +30% pour le Sprinter 21 places.
            </p>
          </div>

          {/* Excursions */}
          <div>
            <h3 className="text-xl font-bold text-[#0B1F3A] mb-6 flex items-center gap-3">
              <span className="w-8 h-0.5 bg-[#C9A96E]" />
              Excursions & Journées
            </h3>
            <div className="space-y-4">
              {excursions.map((e) => (
                <div
                  key={e.name}
                  className={`bg-white p-6 shadow-sm relative ${
                    e.popular ? "ring-2 ring-[#C9A96E]" : ""
                  }`}
                >
                  {e.popular && (
                    <div className="absolute -top-3 left-6 bg-[#C9A96E] text-[#0B1F3A] text-xs font-bold px-3 py-1 uppercase tracking-widest">
                      Le plus populaire
                    </div>
                  )}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-[#0B1F3A] text-base">{e.name}</h4>
                      <p className="text-gray-400 text-xs mt-0.5">{e.duration}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-[#C9A96E] font-bold text-2xl">{e.price}</div>
                      <div className="text-gray-400 text-xs">par véhicule</div>
                    </div>
                  </div>
                  <ul className="space-y-1.5">
                    {e.includes.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                        <Check size={14} className="text-[#C9A96E] flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* International transfers */}
        <div className="mt-12">
          <h3 className="text-xl font-bold text-[#0B1F3A] mb-6 flex items-center gap-3">
            <span className="w-8 h-0.5 bg-[#C9A96E]" />
            Transferts Internationaux
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {international.map((t) => (
              <div
                key={t.route}
                className="bg-white border border-gray-100 p-5 flex items-center justify-between hover:border-[#C9A96E] transition-colors group"
              >
                <div>
                  <div className="font-semibold text-[#0B1F3A] text-sm">{t.route}</div>
                  <div className="text-gray-400 text-xs mt-0.5">{t.duration} environ</div>
                </div>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-[#C9A96E] font-bold text-xs uppercase tracking-wide hover:underline flex-shrink-0 ml-3"
                >
                  Devis
                </a>
              </div>
            ))}
          </div>
          <p className="text-gray-400 text-xs mt-3">
            * Tarifs variables selon la saison et le type de véhicule. Devis gratuit en moins de 2 heures.
          </p>
        </div>

        {/* Bottom note */}
        <div className="mt-16 bg-[#0B1F3A] p-8 md:p-10 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-white text-xl font-bold mb-3">
              Prix non trouvé pour votre trajet ?
            </h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Nous proposons des devis sur mesure pour tous types de trajets : journées complètes,
              week-ends, circuits multi-jours, événements d'entreprise. Contactez-nous et recevez
              votre devis en moins de 2 heures.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="tel:+33787248691"
              className="flex items-center justify-center gap-2 bg-[#C9A96E] text-[#0B1F3A] font-bold px-6 py-4 text-sm uppercase tracking-widest hover:bg-[#E8C98A] transition-all duration-300"
            >
              <Phone size={16} />
              Appeler pour un devis
            </a>
            <a
              href="mailto:contact@riviora.fr"
              className="flex items-center justify-center gap-2 border-2 border-white/20 text-white font-semibold px-6 py-4 text-sm uppercase tracking-widest hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all duration-300"
            >
              Devis par email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
