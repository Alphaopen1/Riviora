"use client";

import Image from "next/image";
import { Users, Wifi, Wind, Shield, Zap, Leaf } from "lucide-react";
import { useTranslations } from "next-intl";

const vehicleNames = ["Tesla Model 3", "Mercedes Classe V", "Mercedes Sprinter"];
const vehicleTags = ["ÉCO", "PREMIUM", "GROUPE"];
const vehicleTagColors = ["#16a34a", "#C9A96E", "#0B1F3A"];
const vehicleAccents = ["#16a34a", "#C9A96E", "#94a3b8"];
const vehicleImages = ["/images/tesla-model3.png", "/images/classe-v.png", "/images/sprinter.png"];

const featureIcons = [
  [Users, Zap, Leaf, Shield, Wifi, Wind],
  [Users, Wifi, Wind, Shield, Zap, Leaf],
  [Users, Wifi, Wind, Shield, Zap, Leaf],
];

export default function Fleet() {
  const t = useTranslations("fleet");

  const vehicles = t.raw("vehicles") as Array<{
    category: string;
    description: string;
    features: string[];
    ideal: string;
  }>;

  const certifications = t.raw("certifications") as Array<{
    label: string;
    sub: string;
  }>;

  return (
    <section id="flotte" className="bg-[#0B1F3A] py-24 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#C9A96E] font-semibold text-sm uppercase tracking-widest mb-3">
            {t("badge")}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">
            {t("title")}{" "}
            <span className="text-[#C9A96E]">{t("titleAccent")}</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Vehicles grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {vehicles.map((v, idx) => {
            const accent = vehicleAccents[idx];
            const icons = featureIcons[idx];
            return (
              <div
                key={vehicleNames[idx]}
                className="group bg-white/5 hover:bg-white/10 transition-all duration-500 flex flex-col"
              >
                {/* Image area */}
                <div className="relative h-52 overflow-hidden flex items-center justify-center">
                  <Image
                    src={vehicleImages[idx]}
                    alt={vehicleNames[idx]}
                    width={480}
                    height={280}
                    className="object-contain w-full h-full p-4 transition-transform duration-700 group-hover:scale-105 drop-shadow-2xl"
                    quality={90}
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 480px"
                  />
                  <div
                    className="absolute top-4 left-4 text-white text-xs font-bold px-3 py-1 uppercase tracking-widest"
                    style={{ background: vehicleTagColors[idx] }}
                  >
                    {vehicleTags[idx]}
                  </div>
                </div>

                {/* Content */}
                <div className="p-7 flex flex-col flex-1">
                  <p className="text-xs font-semibold uppercase tracking-widest mb-2"
                     style={{ color: accent }}>
                    {v.category}
                  </p>
                  <h3 className="text-2xl font-bold text-white mb-3">{vehicleNames[idx]}</h3>
                  <p className="text-white/55 text-sm leading-relaxed mb-5">{v.description}</p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-2.5 mb-6">
                    {v.features.map((feature, fIdx) => {
                      const Icon = icons[fIdx] ?? Wifi;
                      return (
                        <div key={feature} className="flex items-center gap-2">
                          <Icon size={13} className="flex-shrink-0" style={{ color: accent }} />
                          <span className="text-white/65 text-xs">{feature}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Footer */}
                  <div className="border-t border-white/10 pt-5 mt-auto flex items-center justify-between">
                    <div>
                      <div className="text-white/35 text-xs uppercase tracking-wide">{t("idealFor")}</div>
                      <div className="text-white/80 text-sm font-medium mt-0.5">{v.ideal}</div>
                    </div>
                    <a
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault();
                        document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="font-bold px-5 py-3 text-xs uppercase tracking-widest transition-all duration-300 hover:opacity-80"
                      style={{ background: accent, color: accent === "#C9A96E" || accent === "#16a34a" ? "#fff" : "#C9A96E" }}
                    >
                      {t("book")}
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Certifications */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
          {certifications.map((c) => (
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
