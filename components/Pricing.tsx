"use client";

import { Check, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

const transfers = [
  { route: "Nice Aéroport → Nice Centre", duration: "20 min", price: "50€" },
  { route: "Nice Aéroport → Monaco", duration: "30 min", price: "90€" },
  { route: "Nice Aéroport → Cannes", duration: "30 min", price: "100€" },
  { route: "Nice Aéroport → Saint-Tropez", duration: "1h30", price: "300€" },
];

const international = [
  { route: "Nice → Milano (Milan)", duration: "3h30" },
  { route: "Nice → Portofino", duration: "2h00" },
  { route: "Nice → Cinque Terre", duration: "2h45" },
  { route: "Nice → Genève", duration: "5h00" },
  { route: "Nice → Courchevel", duration: "4h30" },
  { route: "Nice → Mégève", duration: "4h00" },
];

const excursions = [
  {
    name: "Monaco, Monte-Carlo & Eze",
    duration: "Demi-journée (4–5h)",
    price: "500€",
    includes: ["Casino, Palais du Prince", "Musée Océanographique", "Port Hercule", "Village perché d'Eze"],
    popular: false,
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
    popular: false,
  },
  {
    name: "Gorges du Verdon",
    duration: "Journée (9h)",
    price: "900€",
    includes: ["Moustiers-Sainte-Marie", "Lac de Sainte-Croix", "Balcon du Verdon", "Point Sublime"],
    popular: false,
  },
];

export default function Pricing() {
  const t = useTranslations("pricing");

  return (
    <section id="tarifs" className="bg-[#F8F6F1] py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#C9A96E] font-semibold text-sm uppercase tracking-widest mb-3">
            {t("badge")}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0B1F3A] mb-5">
            {t("title")} <span className="text-[#C9A96E]">{t("titleAccent")}</span>{t("titleEnd")}
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Transfers */}
          <div>
            <h3 className="text-xl font-bold text-[#0B1F3A] mb-6 flex items-center gap-3">
              <span className="w-8 h-0.5 bg-[#C9A96E]" />
              {t("transfers")}
            </h3>
            <div className="bg-white divide-y divide-gray-100 shadow-sm">
              {transfers.map((transfer) => (
                <div
                  key={transfer.route}
                  className="flex items-center justify-between p-4 hover:bg-[#F8F6F1] transition-colors"
                >
                  <div>
                    <div className="font-semibold text-[#0B1F3A] text-sm">{transfer.route}</div>
                    <div className="text-gray-400 text-xs mt-0.5">{transfer.duration} {t("approx")}</div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <div className="text-[#C9A96E] font-bold text-lg">{transfer.price}</div>
                    <div className="text-gray-400 text-xs">{t("vat")}</div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-gray-400 text-xs mt-3">
              {t("note")}
            </p>
          </div>

          {/* Excursions */}
          <div>
            <h3 className="text-xl font-bold text-[#0B1F3A] mb-6 flex items-center gap-3">
              <span className="w-8 h-0.5 bg-[#C9A96E]" />
              {t("excursions")}
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
                      {t("mostPopular")}
                    </div>
                  )}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-[#0B1F3A] text-base">{e.name}</h4>
                      <p className="text-gray-400 text-xs mt-0.5">{e.duration}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-[#C9A96E] font-bold text-2xl">{e.price}</div>
                      <div className="text-gray-400 text-xs">{t("perVehicle")}</div>
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
            {t("international")}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {international.map((intl) => (
              <div
                key={intl.route}
                className="bg-white border border-gray-100 p-5 flex items-center justify-between hover:border-[#C9A96E] transition-colors group"
              >
                <div>
                  <div className="font-semibold text-[#0B1F3A] text-sm">{intl.route}</div>
                  <div className="text-gray-400 text-xs mt-0.5">{intl.duration} {t("approx")}</div>
                </div>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-[#C9A96E] font-bold text-xs uppercase tracking-wide hover:underline flex-shrink-0 ml-3"
                >
                  {t("quote")}
                </a>
              </div>
            ))}
          </div>
          <p className="text-gray-400 text-xs mt-3">
            {t("intlNote")}
          </p>
        </div>

        {/* Bottom note */}
        <div className="mt-16 bg-[#0B1F3A] p-8 md:p-10 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-white text-xl font-bold mb-3">
              {t("ctaTitle")}
            </h3>
            <p className="text-white/60 text-sm leading-relaxed">
              {t("ctaText")}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="tel:+33787248691"
              className="flex items-center justify-center gap-2 bg-[#C9A96E] text-[#0B1F3A] font-bold px-6 py-4 text-sm uppercase tracking-widest hover:bg-[#E8C98A] transition-all duration-300"
            >
              <Phone size={16} />
              {t("ctaCall")}
            </a>
            <a
              href="mailto:contact@riviora.fr"
              className="flex items-center justify-center gap-2 border-2 border-white/20 text-white font-semibold px-6 py-4 text-sm uppercase tracking-widest hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all duration-300"
            >
              {t("ctaEmail")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
