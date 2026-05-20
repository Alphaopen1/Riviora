"use client";

import Link from "next/link";
import { Phone, Mail, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

// Indexed to match destinationsList order in every locale's messages file
const DEST_SLUGS = [
  "monaco",
  "saint-tropez",
  "cannes",
  "eze",
  "antibes",
  "grasse",
  "gorges-du-verdon",
];

const SOCIAL_LINKS = [
  {
    href: "https://instagram.com/riviora",
    label: "Riviora sur Instagram",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    href: "https://facebook.com/riviora",
    label: "Riviora sur Facebook",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    href: "https://www.reddit.com/user/Riviora_excursion/",
    label: "Riviora sur Reddit",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  const servicesList = t.raw("servicesList") as string[];
  const destinationsList = t.raw("destinationsList") as string[];
  const infoLinks = t.raw("infoLinks") as Array<{ label: string; href: string }>;

  return (
    <footer className="bg-[#060F1E] text-white">
      {/* CTA band */}
      <div className="bg-[#C9A96E] py-5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#0B1F3A] font-bold text-lg text-center md:text-left">
            {t("ctaBand")}
          </p>
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

      {/* Main grid */}
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

          {/* Social links */}
          <div className="flex gap-3 mt-6">
            {SOCIAL_LINKS.map(({ href, label, icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors"
              >
                {icon}
              </a>
            ))}
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
            {destinationsList.map((d, i) => (
              <li key={d}>
                <Link
                  href={`/destinations/${DEST_SLUGS[i]}`}
                  className="text-white/50 hover:text-[#C9A96E] text-sm transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight size={10} className="flex-shrink-0" />
                  {d}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Info + Legal */}
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
            <div className="text-white/30 text-xs mb-1 uppercase tracking-widest">
              {t("serviceZoneLabel")}
            </div>
            <div className="text-white/60 text-sm leading-relaxed">
              {t("serviceZone")}
            </div>
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-white/30 text-xs">
          <p>© {year} {t("copyright")}</p>
          <p>{t("licenseInfo")}</p>
        </div>
      </div>
    </footer>
  );
}
