"use client";

import Image from "next/image";
import { Users, Wifi, Wind, Shield, Zap, Leaf } from "lucide-react";

const vehicles = [
  {
    name: "Tesla Model 3",
    category: "Éco · Électrique · 1–3 passagers",
    image: "/images/tesla-model3.png",
    isLocal: true,
    description:
      "Notre option écoresponsable. 100% électrique, silencieuse et confortable pour les courts trajets et transferts en solo ou en couple. Zéro émission, technologie Autopilot, intérieur minimaliste premium.",
    features: [
      { icon: Users, label: "1–3 passagers" },
      { icon: Zap, label: "100% électrique" },
      { icon: Leaf, label: "Zéro émission CO₂" },
      { icon: Shield, label: "Autopilot actif" },
      { icon: Wifi, label: "Wi-Fi & recharge USB" },
      { icon: Wind, label: "Climatisation auto" },
    ],
    capacity: "1–3",
    luggage: "2 valises cabine",
    ideal: "Transferts courts · Éco-responsable",
    tag: "ÉCO",
    tagColor: "#16a34a",
    accent: "#16a34a",
  },
  {
    name: "Mercedes Classe V",
    category: "Prestige · 4–8 passagers",
    image: "/images/classe-v.png",
    isLocal: true,
    description:
      "La référence du transport privé sur la Côte d'Azur. Intérieur cuir noir, climatisation individuelle, vitres teintées, tablettes pliantes et connexion Wi-Fi. Idéale pour les familles et groupes VIP.",
    features: [
      { icon: Users, label: "4–8 passagers" },
      { icon: Wifi, label: "Wi-Fi inclus" },
      { icon: Wind, label: "Climatisation 4 zones" },
      { icon: Shield, label: "Cuir premium" },
      { icon: Zap, label: "Prise USB & 220V" },
      { icon: Leaf, label: "Vitres teintées" },
    ],
    capacity: "4–8",
    luggage: "8 valises",
    ideal: "Familles · Excursions · VIP",
    tag: "PREMIUM",
    tagColor: "#C9A96E",
    accent: "#C9A96E",
  },
  {
    name: "Mercedes Sprinter",
    category: "Grand Groupe · 9–21 passagers",
    image: "/images/sprinter.png",
    isLocal: true,
    description:
      "La solution idéale pour les groupes, séminaires et événements. Configuration haut de gamme, sièges inclinables, espace bagages généreux et Wi-Fi haut débit pour tous les passagers.",
    features: [
      { icon: Users, label: "9–21 passagers" },
      { icon: Wifi, label: "Wi-Fi haut débit" },
      { icon: Wind, label: "Climatisation renforcée" },
      { icon: Shield, label: "Sièges inclinables" },
      { icon: Zap, label: "Sono embarquée" },
      { icon: Leaf, label: "Bagagerie XL" },
    ],
    capacity: "9–21",
    luggage: "20+ valises",
    ideal: "Groupes · Séminaires · Événements",
    tag: "GROUPE",
    tagColor: "#0B1F3A",
    accent: "#94a3b8",
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
            Trois gammes pour tous vos besoins, de l'éco-responsable au grand groupe.
            Chaque véhicule est maintenu au plus haut niveau de propreté et d'équipement.
          </p>
        </div>

        {/* Vehicles grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {vehicles.map((v) => (
            <div
              key={v.name}
              className="group bg-white/5 hover:bg-white/10 transition-all duration-500 flex flex-col"
            >
              {/* Image area */}
              <div className="relative h-52 overflow-hidden flex items-center justify-center">
                <Image
                  src={v.image}
                  alt={v.name}
                  width={480}
                  height={280}
                  className="object-contain w-full h-full p-4 transition-transform duration-700 group-hover:scale-105 drop-shadow-2xl"
                  quality={90}
                />
                <div
                  className="absolute top-4 left-4 text-white text-xs font-bold px-3 py-1 uppercase tracking-widest"
                  style={{ background: v.tagColor }}
                >
                  {v.tag}
                </div>
              </div>

              {/* Content */}
              <div className="p-7 flex flex-col flex-1">
                <p className="text-xs font-semibold uppercase tracking-widest mb-2"
                   style={{ color: v.accent }}>
                  {v.category}
                </p>
                <h3 className="text-2xl font-bold text-white mb-3">{v.name}</h3>
                <p className="text-white/55 text-sm leading-relaxed mb-5">{v.description}</p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-2.5 mb-6">
                  {v.features.map((f) => (
                    <div key={f.label} className="flex items-center gap-2">
                      <f.icon size={13} className="flex-shrink-0" style={{ color: v.accent }} />
                      <span className="text-white/65 text-xs">{f.label}</span>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="border-t border-white/10 pt-5 mt-auto flex items-center justify-between">
                  <div>
                    <div className="text-white/35 text-xs uppercase tracking-wide">Idéal pour</div>
                    <div className="text-white/80 text-sm font-medium mt-0.5">{v.ideal}</div>
                  </div>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="font-bold px-5 py-3 text-xs uppercase tracking-widest transition-all duration-300 hover:opacity-80"
                    style={{ background: v.accent, color: v.accent === "#C9A96E" || v.accent === "#16a34a" ? "#fff" : "#C9A96E" }}
                  >
                    Réserver
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Licence VTC", sub: "Officielle & assurée" },
            { label: "Assurance", sub: "Tous risques voyageurs" },
            { label: "Entretien", sub: "Contrôle avant chaque sortie" },
            { label: "Chauffeurs", sub: "Formation sécurité annuelle" },
          ].map((c) => (
            <div key={c.label} className="border border-white/10 p-5 text-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] mx-auto mb-3" />
              <div className="text-white font-bold text-sm mb-1">{c.label}</div>
              <div className="text-white/40 text-xs">{c.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
