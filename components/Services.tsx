"use client";

import { Car, MapPin, Clock, Users, Plane, Star, Shield, Headphones } from "lucide-react";

const services = [
  {
    icon: Car,
    title: "Transferts Privés",
    subtitle: "Aéroport · Gare · Hôtel",
    description:
      "Transferts depuis/vers l'aéroport de Nice (NCE), Monaco, Cannes. Accueil avec panneau nominatif, aide aux bagages, ponctualité garantie.",
    features: ["Suivi de vol en temps réel", "Panneau nominatif", "Aucun supplément bagage"],
    from: "À partir de 80€",
    popular: false,
    color: "#0B1F3A",
  },
  {
    icon: MapPin,
    title: "Excursions Privées",
    subtitle: "Journée · Demi-journée · Sur mesure",
    description:
      "Monaco, Saint-Tropez, Eze, les Gorges du Verdon, Moustiers-Sainte-Marie… Itinéraires entièrement personnalisés selon vos envies.",
    features: ["Itinéraire sur mesure", "Guide chauffeur bilingue", "Arrêts photos inclus"],
    from: "À partir de 350€/jour",
    popular: true,
    color: "#C9A96E",
  },
  {
    icon: Users,
    title: "Groupes & Événements",
    subtitle: "9 à 21 personnes · Sprinter",
    description:
      "Séminaires d'entreprise, anniversaires, enterrements de vie, mariages. Notre Sprinter 21 places couvre tous vos événements collectifs.",
    features: ["Jusqu'à 21 passagers", "Devis personnalisé", "Coordination événementielle"],
    from: "Sur devis",
    popular: false,
    color: "#0B1F3A",
  },
];

const stats = [
  { icon: Star, value: "4.9/5", label: "+500 avis Google" },
  { icon: Shield, value: "15+", label: "Années d'expérience" },
  { icon: Users, value: "5 000+", label: "Clients satisfaits" },
  { icon: Headphones, value: "24h/7j", label: "Disponibilité" },
];

export default function Services() {
  return (
    <section id="services" className="bg-[#F8F6F1] py-24 px-4 sm:px-6">
      {/* Stats band */}
      <div className="max-w-7xl mx-auto mb-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div
              key={s.value}
              className="bg-white p-6 text-center shadow-sm border-b-2 border-[#C9A96E]"
            >
              <s.icon size={24} className="text-[#C9A96E] mx-auto mb-3" />
              <div className="text-3xl font-bold text-[#0B1F3A] mb-1">{s.value}</div>
              <div className="text-sm text-gray-500 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Section header */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <p className="text-[#C9A96E] font-semibold text-sm uppercase tracking-widest mb-3">
          Nos Prestations
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-[#0B1F3A] mb-5">
          Service d'exception sur{" "}
          <span className="text-[#C9A96E]">la Riviera</span>
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
          Depuis 2009, Riviora accompagne voyageurs, familles et professionnels sur toute la
          Côte d'Azur avec des véhicules premium et des chauffeurs certifiés.
        </p>
      </div>

      {/* Service cards */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {services.map((s) => (
          <div
            key={s.title}
            className={`bg-white relative overflow-hidden group transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
              s.popular ? "ring-2 ring-[#C9A96E]" : ""
            }`}
          >
            {s.popular && (
              <div className="absolute top-0 right-0 bg-[#C9A96E] text-[#0B1F3A] text-xs font-bold px-4 py-1.5 uppercase tracking-widest">
                Le plus demandé
              </div>
            )}
            <div
              className="h-1.5 w-full"
              style={{ background: s.color === "#C9A96E" ? "#C9A96E" : "#0B1F3A" }}
            />
            <div className="p-8">
              <div
                className="w-14 h-14 flex items-center justify-center mb-6"
                style={{ background: s.color === "#C9A96E" ? "#FDF6E8" : "#EEF2F7" }}
              >
                <s.icon
                  size={24}
                  style={{ color: s.color === "#C9A96E" ? "#C9A96E" : "#0B1F3A" }}
                />
              </div>
              <h3 className="text-xl font-bold text-[#0B1F3A] mb-1">{s.title}</h3>
              <p className="text-[#C9A96E] text-sm font-semibold mb-4 uppercase tracking-wide">
                {s.subtitle}
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed text-sm">{s.description}</p>
              <ul className="space-y-2 mb-8">
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between border-t border-gray-100 pt-6">
                <span className="text-[#0B1F3A] font-bold text-sm">{s.from}</span>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="bg-[#0B1F3A] text-white font-semibold px-5 py-2.5 text-xs uppercase tracking-widest hover:bg-[#C9A96E] hover:text-[#0B1F3A] transition-all duration-300"
                >
                  Demander un devis
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="max-w-7xl mx-auto mt-16 bg-[#0B1F3A] p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-white text-2xl font-bold mb-2">
            Besoin d'un service sur mesure ?
          </h3>
          <p className="text-white/60">
            Réponse garantie en moins de 2 heures · Devis gratuit et sans engagement
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
          <a
            href="tel:+33787248691"
            className="bg-[#C9A96E] text-[#0B1F3A] font-bold px-8 py-4 text-sm uppercase tracking-widest hover:bg-[#E8C98A] transition-all duration-300 text-center"
          >
            Appeler maintenant
          </a>
          <a
            href="mailto:contact@riviora.fr"
            className="border-2 border-white/30 text-white font-semibold px-8 py-4 text-sm uppercase tracking-widest hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all duration-300 text-center"
          >
            Écrire par email
          </a>
        </div>
      </div>
    </section>
  );
}
