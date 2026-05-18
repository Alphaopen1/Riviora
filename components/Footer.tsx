"use client";

import { Phone, Mail, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  const servicesList = t.raw("servicesList") as string[];
  const destinationsList = t.raw("destinationsList") as string[];
  const infoLinks = t.raw("infoLinks") as Array<{ label: string; href: string }>;

  return (
    <footer className="bg-[#060F1E] text-white">
      {/* Top CTA band */}
      <div className="bg-[#C9A96E] py-5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-[#0B1F3A] font-bold text-lg text-center md:text-left">
            {t("ctaBand")}
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
              {t("ctaWrite")}
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
            {t("tagline")}
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
            {t("servicesTitle")}
          </h4>
          <ul className="space-y-2.5">
            {servicesList.map((s) => (
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
            {t("destinationsTitle")}
          </h4>
          <ul className="space-y-2.5">
            {destinationsList.map((d) => (
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
            {t("infoTitle")}
          </h4>
          <ul className="space-y-2.5">
            {infoLinks.map((l) => (
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
            <div className="text-white/30 text-xs mb-1 uppercase tracking-widest">{t("serviceZoneLabel")}</div>
            <div className="text-white/60 text-sm leading-relaxed">
              {t("serviceZone")}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-white/30 text-xs">
          <p>
            © {year} {t("copyright")}
          </p>
          <p>
            {t("licenseInfo")}
          </p>
        </div>
      </div>
    </footer>
  );
}
