"use client";

import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

const destinations = [
  {
    name: "Monaco & Monte-Carlo",
    slug: "monaco",
    duration: "30 min de Nice",
    description:
      "Casino de Monte-Carlo, Palais du Prince, Musée Océanographique, Grand Prix Circuit, les Jardins Exotiques. La Principauté en toute exclusivité.",
    image: "/images/monaco.jpg",
    from: "dès 90€",
    highlight: "Incontournable",
  },
  {
    name: "Saint-Tropez",
    slug: "saint-tropez",
    duration: "1h30 de Nice",
    description:
      "La place des Lices, le port de pêche, les plages de Pampelonne, Ramatuelle et ses ruelles médiévales. Le glamour de la Côte authentique.",
    image: "/images/saint-tropez.jpg",
    from: "dès 300€",
    highlight: "Coup de cœur",
  },
  {
    name: "Cannes",
    slug: "cannes",
    duration: "35 min de Nice",
    description:
      "La Croisette, le Palais des Festivals, le marché Forville, l'Île Sainte-Marguerite. Cannes au-delà du cinéma.",
    image:
      "https://images.unsplash.com/photo-1562883676-8c7feb83f09b?auto=format&fit=crop&w=900&q=85",
    from: "dès 80€",
    highlight: null,
  },
  {
    name: "Èze Village",
    slug: "eze",
    duration: "20 min de Nice",
    description:
      "Village médiéval perché à 400m d'altitude surplombant la Méditerranée. Parfumerie Fragonard, Jardin Exotique, vue imprenable sur la Riviera.",
    image: "/images/eze.jpg",
    from: "dès 70€",
    highlight: "Vue panoramique",
  },
  {
    name: "Antibes & Juan-les-Pins",
    slug: "antibes",
    duration: "25 min de Nice",
    description:
      "Le Fort Carré, le marché Provençal, le Cap d'Antibes, le Musée Picasso et les plages dorées de Juan-les-Pins.",
    image:
      "https://images.unsplash.com/photo-1503917988258-f87a78e3c995?auto=format&fit=crop&w=900&q=85",
    from: "dès 80€",
    highlight: null,
  },
  {
    name: "Grasse",
    slug: "grasse",
    duration: "45 min de Nice",
    description:
      "Capitale mondiale du parfum. Visite des maisons Fragonard, Molinard ou Galimard, vieille ville et ses ruelles parfumées.",
    image: "/images/grasse.jpg",
    from: "dès 100€",
    highlight: null,
  },
  {
    name: "Gorges du Verdon",
    slug: "gorges-du-verdon",
    duration: "1h45 de Nice",
    description:
      "Le Grand Canyon européen. Moustiers-Sainte-Marie, le lac de Sainte-Croix, les falaises turquoise. Nature à couper le souffle.",
    image:
      "https://images.unsplash.com/photo-1502126324834-38f8e02d7160?auto=format&fit=crop&w=900&q=85",
    from: "dès 420€",
    highlight: "Journée complète",
  },
  {
    name: "Portofino",
    slug: "portofino",
    duration: "2h00 de Nice",
    description:
      "Le village le plus pittoresque de la Riviera italienne. Port coloré, villas Liberty et eaux cristallines du Golfe du Tigullio.",
    image:
      "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=900&q=85",
    from: "Sur demande",
    highlight: "Riviera Italienne",
  },
  {
    name: "Cinque Terre",
    slug: "cinque-terre",
    duration: "2h45 de Nice",
    description:
      "Cinq villages suspendus entre falaises et Méditerranée. Maisons multicolores, sentiers côtiers et gastronomie ligure incontournable.",
    image: "/images/cinque-terre.jpg",
    from: "Sur demande",
    highlight: null,
  },
  {
    name: "Courchevel",
    slug: "courchevel",
    duration: "4h30 de Nice",
    description:
      "La station de ski la plus prestigieuse des Alpes françaises. Pistes enneigées, chalets de luxe et art de vivre alpin.",
    image: "/images/courchevel.jpg",
    from: "Sur demande",
    highlight: null,
  },
  {
    name: "Genève",
    slug: "geneve",
    duration: "5h00 de Nice",
    description:
      "La cité internationale par excellence. Lac Léman, vieille ville, montres de luxe et gastronomie franco-suisse d'exception.",
    image: "/images/geneve.jpg",
    from: "Sur demande",
    highlight: null,
  },
  {
    name: "Transfert Aéroport Nice",
    slug: null,
    duration: "NCE · Monaco · Cannes",
    description:
      "Prise en charge à l'aéroport de Nice Côte d'Azur (T1 & T2). Accueil en pancarte personnalisée, 1h d'attente gratuite, suivi de vol en temps réel.",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=85",
    from: "dès 50€",
    highlight: "Ponctualité garantie",
  },
];

export default function Destinations() {
  const t = useTranslations("destinations");

  return (
    <section id="destinations" className="bg-white py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#C9A96E] font-semibold text-sm uppercase tracking-widest mb-3">
            {t("badge")}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0B1F3A] mb-5">
            {t("title")}{" "}
            <span className="text-[#C9A96E]">{t("titleAccent")}</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {destinations.map((dest, i) => (
            <div
              key={dest.name}
              className={`relative overflow-hidden group cursor-pointer ${
                i === 0 ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""
              }`}
              style={{ minHeight: i === 0 ? "500px" : "240px" }}
            >
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${dest.image})` }}
                role="img"
                aria-label={dest.name}
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/90 via-[#0B1F3A]/30 to-transparent" />

              {/* Highlight badge */}
              {dest.highlight && (
                <div className="absolute top-4 left-4 bg-[#C9A96E] text-[#0B1F3A] text-xs font-bold px-3 py-1 uppercase tracking-widest">
                  {dest.highlight}
                </div>
              )}

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 text-white/60 text-xs mb-2">
                  <Clock size={12} />
                  {dest.duration}
                </div>
                <h3
                  className={`font-bold text-white mb-2 leading-tight ${
                    i === 0 ? "text-3xl" : "text-xl"
                  }`}
                >
                  {dest.name}
                </h3>

                {/* Description - visible on large card or on hover */}
                <p
                  className={`text-white/75 text-sm leading-relaxed mb-4 ${
                    i === 0
                      ? "block"
                      : "hidden group-hover:block transition-all duration-300"
                  }`}
                >
                  {dest.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-[#C9A96E] font-bold text-sm">{dest.from}</span>
                  <div className="flex items-center gap-3">
                    {dest.slug && (
                      <Link
                        href={`/destinations/${dest.slug}`}
                        className="flex items-center gap-1 text-white/70 text-xs font-semibold uppercase tracking-wide hover:text-[#C9A96E] transition-colors"
                      >
                        {t("discover")}
                      </Link>
                    )}
                    <a
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault();
                        document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="flex items-center gap-1 text-white text-xs font-semibold uppercase tracking-wide hover:text-[#C9A96E] transition-colors"
                    >
                      {t("book")} <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-500 mb-4">
            {t("customCta")}
          </p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 bg-[#0B1F3A] text-white font-bold px-10 py-4 text-sm uppercase tracking-widest hover:bg-[#C9A96E] hover:text-[#0B1F3A] transition-all duration-300"
          >
            {t("customBtn")} <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
