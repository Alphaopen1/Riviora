"use client";

import { Users, Star, Wifi, Wind, Shield, Music } from "lucide-react";

const vehicles = [
  {
    name: "Mercedes Classe V",
    category: "Berline de Prestige · 1–8 passagers",
    image:
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=85",
    description:
      "La référence du transport privé sur la Côte d'Azur. Intérieur cuir beige, climatisation individuelle, vitres teintées, tablettes pliantes. Idéale pour les transferts VIP et les excursions en petits groupes.",
    features: [
      { icon: Users, label: "Jusqu'à 8 passagers" },
      { icon: Wifi, label: "Wi-Fi inclus" },
      { icon: Wind, label: "Climatisation 4 zones" },
      { icon: Shield, label: "Cuir premium" },
      { icon: Music, label: "Système audio Burmester" },
      { icon: Star, label: "Minibar disponible" },
    ],
    capacity: "1–8",
    luggage: "8 valises",
    ideal: "Excursions · VIP · Famille",
    primary: true,
  },
  {
    name: "Mercedes Sprinter",
    category: "Minibus Prestige · 9–21 passagers",
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=85",
    description:
      "La solution idéale pour les groupes, séminaires et événements. Configuration intérieure haut de gamme, sièges inclinables, espace bagages généreux, connectivité Wi-Fi pour tous.",
    features: [
      { icon: Users, label: "9 à 21 passagers" },
      { icon: Wifi, label: "Wi-Fi haut débit" },
      { icon: Wind, label: "Climatisation renforcée" },
      { icon: Shield, label: "Sièges inclinables" },
      { icon: Music, label: "Sono embarquée" },
      { icon: Star, label: "Bagagerie XL" },
    ],
    capacity: "9–21",
    luggage: "20+ valises",
    ideal: "Groupes · Séminaires · Événements",
    primary: false,
  },
];

export default function Fleet() {
  return (
    <section id="flotte" className="bg-[#0B1F3A] py-24 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#C9A96E] font-semibold text-sm uppercase tracking-widest mb-3">
            Notre Flotte
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">
            Des véhicules à la{" "}
            <span className="text-[#C9A96E]">hauteur de votre voyage</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
            Chaque véhicule est entretenu au plus haut niveau de propreté et d'équipement.
            Vos confort et sécurité sont notre priorité absolue.
          </p>
        </div>

        {/* Vehicles */}
        <div className="grid lg:grid-cols-2 gap-8">
          {vehicles.map((v) => (
            <div
              key={v.name}
              className={`group relative overflow-hidden ${
                v.primary
                  ? "bg-white/5 ring-1 ring-[#C9A96E]/30"
                  : "bg-white/5"
              } transition-all duration-500 hover:bg-white/10`}
            >
              {/* Vehicle image */}
              <div className="relative h-64 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${v.image})` }}
                  role="img"
                  aria-label={v.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-6">
                  <span className="bg-[#C9A96E] text-[#0B1F3A] text-xs font-bold px-3 py-1 uppercase tracking-widest">
                    {v.capacity} passagers
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <p className="text-[#C9A96E] text-xs font-semibold uppercase tracking-widest mb-2">
                  {v.category}
                </p>
                <h3 className="text-2xl font-bold text-white mb-4">{v.name}</h3>
                <p className="text-white/60 leading-relaxed text-sm mb-6">{v.description}</p>

                {/* Features grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {v.features.map((f) => (
                    <div key={f.label} className="flex items-center gap-2">
                      <f.icon size={14} className="text-[#C9A96E] flex-shrink-0" />
                      <span className="text-white/70 text-sm">{f.label}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom info */}
                <div className="border-t border-white/10 pt-6 flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-white/40 text-xs uppercase tracking-wide">
                      Idéal pour
                    </div>
                    <div className="text-white/80 text-sm font-medium">{v.ideal}</div>
                  </div>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="bg-[#C9A96E] text-[#0B1F3A] font-bold px-6 py-3 text-xs uppercase tracking-widest hover:bg-[#E8C98A] transition-all duration-300"
                  >
                    Réserver
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { label: "Licence VTC", sub: "Officielle & assurée" },
            { label: "Assurance", sub: "Tous risques voyageurs" },
            { label: "Entretien", sub: "Contrôle avant chaque sortie" },
            { label: "Chauffeurs", sub: "Formation sécurité annuelle" },
          ].map((c) => (
            <div key={c.label} className="border border-white/10 p-6">
              <div className="w-2 h-2 rounded-full bg-[#C9A96E] mx-auto mb-3" />
              <div className="text-white font-bold text-sm mb-1">{c.label}</div>
              <div className="text-white/40 text-xs">{c.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
