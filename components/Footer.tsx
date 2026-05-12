"use client";

import { Phone, Mail, ArrowRight } from "lucide-react";

const destinations = [
  "Monaco & Monte-Carlo",
  "Saint-Tropez",
  "Cannes & La Croisette",
  "Eze Village",
  "Antibes & Cap d'Antibes",
  "Grasse — Capitale du Parfum",
  "Gorges du Verdon",
];

const services = [
  "Transfert Aéroport Nice",
  "Chauffeur Privé VTC",
  "Excursions Demi-journée",
  "Excursions Journée Complète",
  "Transport Groupe",
  "Séminaires & Événements",
  "Mise à Disposition",
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#060F1E] text-white">
      {/* Top CTA band */}
      <div className="bg-[#C9A96E] py-5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-[#0B1F3A] font-bold text-lg text-center md:text-left">
            Prêt à découvrir la Côte d'Azur ? Réservez dès maintenant.
          </div>
          <div className="flex gap-3">
            <a
              href="tel:+33787248691"
              className="bg-[#0B1F3A] text-white font-bold px-6 py-3 text-sm uppercase tracking-widest hover:bg-white hover:text-[#0B1F3A] transition-all duration-300 flex items-center gap-2"
            >
              <Phone size={14} />
              +33 7 87 24 86 91
            </a>
            <a
              href="mailto:contact@riviora.fr"
              className="border-2 border-[#0B1F3A] text-[#0B1F3A] font-bold px-6 py-3 text-sm uppercase tracking-widest hover:bg-[#0B1F3A] hover:text-white transition-all duration-300"
            >
              Écrire
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="text-2xl font-bold tracking-widest mb-4 uppercase">
            RIVI<span className="text-[#C9A96E]">ORA</span>
          </div>
          <p className="text-white/50 text-sm leading-relaxed mb-6">
            Chauffeur privé & excursions premium sur la Côte d'Azur depuis 2009. Votre partenaire
            de confiance pour découvrir la Riviera française.
          </p>
          <div className="space-y-3">
            <a
              href="tel:+33787248691"
              className="flex items-center gap-2 text-[#C9A96E] hover:text-[#E8C98A] transition-colors text-sm font-medium"
            >
              <Phone size={14} />
              +33 7 87 24 86 91
            </a>
            <a
              href="mailto:contact@riviora.fr"
              className="flex items-center gap-2 text-[#C9A96E] hover:text-[#E8C98A] transition-colors text-sm font-medium"
            >
              <Mail size={14} />
              contact@riviora.fr
            </a>
          </div>
          <div className="flex gap-3 mt-6">
            <a
              href="https://instagram.com/riviora"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Riviora sur Instagram"
              className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors text-sm font-bold"
            >
              IG
            </a>
            <a
              href="https://facebook.com/riviora"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Riviora sur Facebook"
              className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors text-sm font-bold"
            >
              FB
            </a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-bold text-sm uppercase tracking-widest mb-5 text-white">
            Nos Services
          </h4>
          <ul className="space-y-2.5">
            {services.map((s) => (
              <li key={s}>
                <a
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-white/50 hover:text-[#C9A96E] text-sm transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight size={10} className="flex-shrink-0" />
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Destinations */}
        <div>
          <h4 className="font-bold text-sm uppercase tracking-widest mb-5 text-white">
            Destinations
          </h4>
          <ul className="space-y-2.5">
            {destinations.map((d) => (
              <li key={d}>
                <a
                  href="#destinations"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#destinations")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-white/50 hover:text-[#C9A96E] text-sm transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight size={10} className="flex-shrink-0" />
                  {d}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal + Info */}
        <div>
          <h4 className="font-bold text-sm uppercase tracking-widest mb-5 text-white">
            Informations
          </h4>
          <ul className="space-y-2.5">
            {[
              { label: "À propos de Riviora", href: "#services" },
              { label: "Notre Flotte", href: "#flotte" },
              { label: "Tarifs", href: "#tarifs" },
              { label: "Avis clients", href: "#avis" },
              { label: "FAQ", href: "#faq" },
              { label: "Mentions légales", href: "/mentions-legales" },
              { label: "Politique de confidentialité", href: "/confidentialite" },
              { label: "CGV", href: "/cgv" },
            ].map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="text-white/50 hover:text-[#C9A96E] text-sm transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight size={10} className="flex-shrink-0" />
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-6 p-4 border border-white/10">
            <div className="text-white/30 text-xs mb-1 uppercase tracking-widest">Zone de service</div>
            <div className="text-white/60 text-sm leading-relaxed">
              Nice · Monaco · Cannes · Antibes · Menton · Grasse · Saint-Tropez · Côte d'Azur
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-white/30 text-xs">
          <p>
            © {year} Riviora — Tous droits réservés. Chauffeur privé & excursions Côte d'Azur.
          </p>
          <p>
            Licence VTC · Nice, Côte d'Azur, France
          </p>
        </div>
      </div>
    </footer>
  );
}
