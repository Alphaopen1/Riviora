"use client";

import { Car, MapPin, Users, Star, Shield, Headphones } from "lucide-react";
import { useTranslations } from "next-intl";

const icons = [Car, MapPin, Users];
const statIcons = [Star, Shield, Users, Headphones];
const statValues = ["4.9/5", "15+", "5 000+", "24h/7j"];

export default function Services() {
  const t = useTranslations("services");

  const statLabels = t.raw("statLabels") as string[];
  const items = t.raw("items") as Array<{
    title: string;
    subtitle: string;
    description: string;
    features: string[];
    from: string;
    popular: boolean;
  }>;

  return (
    <section id="services" className="bg-[#F8F6F1] py-24 px-4 sm:px-6">
      {/* Stats band */}
      <div className="max-w-7xl mx-auto mb-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {statValues.map((value, idx) => {
            const Icon = statIcons[idx];
            return (
              <div
                key={value}
                className="bg-white p-6 text-center shadow-sm border-b-2 border-[#C9A96E]"
              >
                <Icon size={24} className="text-[#C9A96E] mx-auto mb-3" />
                <div className="text-3xl font-bold text-[#0B1F3A] mb-1">{value}</div>
                <div className="text-sm text-gray-500 font-medium">{statLabels[idx]}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section header */}
      <div className="max-w-7xl mx-auto text-center mb-16">
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

      {/* Service cards */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {items.map((s, idx) => {
          const Icon = icons[idx];
          const color = s.popular ? "#C9A96E" : "#0B1F3A";
          return (
            <div
              key={s.title}
              className={`bg-white relative overflow-hidden group transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
                s.popular ? "ring-2 ring-[#C9A96E]" : ""
              }`}
            >
              {s.popular && (
                <div className="absolute top-0 right-0 bg-[#C9A96E] text-[#0B1F3A] text-xs font-bold px-4 py-1.5 uppercase tracking-widest">
                  {t("mostRequested")}
                </div>
              )}
              <div
                className="h-1.5 w-full"
                style={{ background: color }}
              />
              <div className="p-8">
                <div
                  className="w-14 h-14 flex items-center justify-center mb-6"
                  style={{ background: s.popular ? "#FDF6E8" : "#EEF2F7" }}
                >
                  <Icon
                    size={24}
                    style={{ color }}
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
                    {t("quoteBtn")}
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="max-w-7xl mx-auto mt-16 bg-[#0B1F3A] p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-white text-2xl font-bold mb-2">
            {t("ctaTitle")}
          </h3>
          <p className="text-white/60">
            {t("ctaSubtitle")}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
          <a
            href="tel:+33787248691"
            className="bg-[#C9A96E] text-[#0B1F3A] font-bold px-8 py-4 text-sm uppercase tracking-widest hover:bg-[#E8C98A] transition-all duration-300 text-center"
          >
            {t("ctaCall")}
          </a>
          <a
            href="mailto:contact@riviora.fr"
            className="border-2 border-white/30 text-white font-semibold px-8 py-4 text-sm uppercase tracking-widest hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all duration-300 text-center"
          >
            {t("ctaEmail")}
          </a>
        </div>
      </div>
    </section>
  );
}
