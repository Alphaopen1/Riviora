"use client";

import { Clock, ArrowRight } from "lucide-react";

const destinations = [
  {
    name: "Monaco & Monte-Carlo",
    duration: "30 min de Nice",
    description:
      "Casino de Monte-Carlo, Palais du Prince, Musée Océanographique, Grand Prix Circuit, les Jardins Exotiques. La Principauté en toute exclusivité.",
    image:
      "https://images.unsplash.com/photo-1609172782547-b22b01a5e3d1?auto=format&fit=crop&w=900&q=85",
    from: "dès 90€",
    highlight: "Incontournable",
  },
  {
    name: "Saint-Tropez",
    duration: "1h30 de Nice",
    description:
      "La place des Lices, le port de pêche, les plages de Pampelonne, Ramatuelle et ses ruelles médiévales. Le glamour de la Côte authentique.",
    image:
      "https://images.unsplash.com/photo-1504859468489-a2e0e4d03fe2?auto=format&fit=crop&w=900&q=85",
    from: "dès 350€",
    highlight: "Coup de cœur",
  },
  {
    name: "Cannes",
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
    duration: "20 min de Nice",
    description:
      "Village médiéval perché à 400m d'altitude surplombant la Méditerranée. Parfumerie Fragonard, Jardin Exotique, vue imprenable sur la Riviera.",
    image:
      "https://images.unsplash.com/photo-1548133451-4e64f2d67a32?auto=format&fit=crop&w=900&q=85",
    from: "dès 120€",
    highlight: "Vue panoramique",
  },
  {
    name: "Antibes & Juan-les-Pins",
    duration: "25 min de Nice",
    description:
      "Le Fort Carré, le marché Provençal, le Cap d'Antibes, le Musée Picasso et les plages dorées de Juan-les-Pins.",
    image:
      "https://images.unsplash.com/photo-1559333251-ead84a2c7c11?auto=format&fit=crop&w=900&q=85",
    from: "dès 90€",
    highlight: null,
  },
  {
    name: "Grasse",
    duration: "45 min de Nice",
    description:
      "Capitale mondiale du parfum. Visite des maisons Fragonard, Molinard ou Galimard, vieille ville et ses ruelles parfumées.",
    image:
      "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=900&q=85",
    from: "dès 140€",
    highlight: null,
  },
  {
    name: "Gorges du Verdon",
    duration: "1h45 de Nice",
    description:
      "Le Grand Canyon européen. Moustiers-Sainte-Marie, le lac de Sainte-Croix, les falaises turquoise. Nature à couper le souffle.",
    image:
      "https://images.unsplash.com/photo-1502126324834-38f8e02d7160?auto=format&fit=crop&w=900&q=85",
    from: "dès 420€",
    highlight: "Journée complète",
  },
  {
    name: "Transfert Aéroport Nice",
    duration: "NCE · Monaco · Cannes",
    description:
      "Prise en charge à l'aéroport de Nice Côte d'Azur (T1 & T2). Suivi de vol en temps réel, accueil personnalisé, pas de supplément pour les retards.",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=85",
    from: "dès 80€",
    highlight: "Ponctualité garantie",
  },
];

export default function Destinations() {
  return (
    <section id="destinations" className="bg-white py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#C9A96E] font-semibold text-sm uppercase tracking-widest mb-3">
            Destinations
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0B1F3A] mb-5">
            Explorez la{" "}
            <span className="text-[#C9A96E]">Côte d'Azur</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
            De Monaco aux Gorges du Verdon, découvrez les plus belles destinations de la
            Riviera française avec votre chauffeur privé Riviora.
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
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .querySelector("#contact")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="flex items-center gap-1 text-white text-xs font-semibold uppercase tracking-wide hover:text-[#C9A96E] transition-colors"
                  >
                    Réserver <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-500 mb-4">
            Vous avez une destination en tête qui ne figure pas ici ?
          </p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 bg-[#0B1F3A] text-white font-bold px-10 py-4 text-sm uppercase tracking-widest hover:bg-[#C9A96E] hover:text-[#0B1F3A] transition-all duration-300"
          >
            Créer mon itinéraire sur mesure <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
