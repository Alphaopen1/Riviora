"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const localDestinations = [
  { slug: "monaco", name: "Monaco & Monte-Carlo", duration: "30 min" },
  { slug: "saint-tropez", name: "Saint-Tropez", duration: "1h30" },
  { slug: "cannes", name: "Cannes & La Croisette", duration: "35 min" },
  { slug: "eze", name: "Èze Village", duration: "20 min" },
  { slug: "antibes", name: "Antibes & Juan-les-Pins", duration: "25 min" },
  { slug: "grasse", name: "Grasse — Capitale du Parfum", duration: "45 min" },
  { slug: "gorges-du-verdon", name: "Gorges du Verdon", duration: "1h45" },
];

const international = [
  { slug: "milan", name: "Milan (Italie)", duration: "3h30" },
  { slug: "portofino", name: "Portofino (Italie)", duration: "2h00" },
  { slug: "cinque-terre", name: "Cinque Terre (Italie)", duration: "2h45" },
  { slug: "geneve", name: "Genève (Suisse)", duration: "5h00" },
  { slug: "courchevel", name: "Courchevel (Alpes)", duration: "4h30" },
  { slug: "megeve", name: "Mégève (Alpes)", duration: "4h00" },
];

const localeOptions = [
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
  { code: "de", label: "DE" },
  { code: "es", label: "ES" },
];

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [destOpen, setDestOpen] = useState(false);
  const [mobileDestOpen, setMobileDestOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDestOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const pathname = usePathname();

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    // Check if we're on the home page (root or /{locale})
    const isHome = pathname === "/" || /^\/[a-z]{2}$/.test(pathname) || /^\/[a-z]{2}\/$/.test(pathname);
    if (isHome) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/${locale === "fr" ? "" : locale + "/"}${href}`;
    }
  };

  const navLinks = [
    { href: "#services", label: t("services") },
    { href: "#flotte", label: t("fleet") },
    { href: "#tarifs", label: t("pricing") },
    { href: "#avis", label: t("reviews") },
    { href: "#contact", label: t("contact") },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-[#0B1F3A] shadow-2xl py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" aria-label="Riviora - Accueil">
            <span className="text-2xl font-bold tracking-widest text-white uppercase">
              RIVI<span className="text-[#C9A96E]">ORA</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-7">
            {/* Destinations dropdown */}
            <li ref={dropdownRef} className="relative">
              <button
                onClick={() => setDestOpen(!destOpen)}
                className="flex items-center gap-1 text-white/80 hover:text-[#C9A96E] text-sm font-medium tracking-wide transition-colors duration-200 uppercase"
              >
                {t("destinations")}
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${destOpen ? "rotate-180" : ""}`}
                />
              </button>

              {destOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[560px] bg-[#0B1F3A] border border-white/10 shadow-2xl z-50">
                  <div className="grid grid-cols-2 gap-0">
                    {/* Côte d'Azur */}
                    <div className="p-5 border-r border-white/10">
                      <div className="text-[#C9A96E] text-xs font-bold uppercase tracking-widest mb-3">
                        Côte d'Azur & Provence
                      </div>
                      {localDestinations.map((d) => (
                        <Link
                          key={d.slug}
                          href={`/destinations/${d.slug}`}
                          onClick={() => setDestOpen(false)}
                          className="flex items-center justify-between py-2 px-2 hover:bg-white/5 group transition-colors"
                        >
                          <span className="text-white/80 text-sm group-hover:text-[#C9A96E] transition-colors">
                            {d.name}
                          </span>
                          <span className="text-white/35 text-xs">{d.duration}</span>
                        </Link>
                      ))}
                    </div>
                    {/* International */}
                    <div className="p-5">
                      <div className="text-[#C9A96E] text-xs font-bold uppercase tracking-widest mb-3">
                        International
                      </div>
                      {international.map((d) => (
                        <Link
                          key={d.slug}
                          href={`/destinations/${d.slug}`}
                          onClick={() => setDestOpen(false)}
                          className="flex items-center justify-between py-2 px-2 hover:bg-white/5 group transition-colors"
                        >
                          <span className="text-white/80 text-sm group-hover:text-[#C9A96E] transition-colors">
                            {d.name}
                          </span>
                          <span className="text-white/35 text-xs">{d.duration}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-white/10 px-5 py-3">
                    <Link
                      href="/destinations"
                      onClick={() => setDestOpen(false)}
                      className="text-[#C9A96E] text-xs font-semibold uppercase tracking-widest hover:text-[#E8C98A] transition-colors"
                    >
                      {t("allDestinations")}
                    </Link>
                  </div>
                </div>
              )}
            </li>

            {navLinks.map((l) => (
              <li key={l.href}>
                <button
                  onClick={() => handleNavClick(l.href)}
                  className="text-white/80 hover:text-[#C9A96E] text-sm font-medium tracking-wide transition-colors duration-200 uppercase"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          {/* CTA + Language switcher */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+33787248691"
              className="flex items-center gap-2 text-[#C9A96E] font-semibold text-sm hover:text-[#E8C98A] transition-colors"
            >
              <Phone size={15} />
              +33 7 87 24 86 91
            </a>
            <button
              onClick={() => handleNavClick("#contact")}
              className="bg-[#C9A96E] text-[#0B1F3A] font-bold px-6 py-2.5 text-xs uppercase tracking-widest hover:bg-[#E8C98A] transition-all duration-300"
            >
              {t("book")}
            </button>

            {/* Language switcher */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 text-white/60 hover:text-white text-xs font-bold uppercase tracking-widest border border-white/20 px-2.5 py-1.5 hover:border-[#C9A96E] transition-colors"
              >
                {locale.toUpperCase()}
                <ChevronDown size={11} className={`transition-transform ${langOpen ? "rotate-180" : ""}`} />
              </button>
              {langOpen && (
                <div className="absolute top-full right-0 mt-2 bg-[#0B1F3A] border border-white/10 shadow-xl z-50 min-w-[80px]">
                  {localeOptions.filter((l) => l.code !== locale).map((l) => (
                    <Link
                      key={l.code}
                      href="/"
                      locale={l.code}
                      onClick={() => setLangOpen(false)}
                      className="block px-4 py-2.5 text-xs font-bold uppercase text-white/60 hover:text-[#C9A96E] hover:bg-white/5 tracking-widest transition-colors"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white p-2"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#0B1F3A] flex flex-col pt-24 pb-8 px-6 overflow-y-auto">
          <ul className="flex flex-col gap-1 mt-4">
            {/* Destinations accordion */}
            <li>
              <button
                onClick={() => setMobileDestOpen(!mobileDestOpen)}
                className="flex items-center justify-between w-full text-white text-2xl font-light tracking-wide uppercase hover:text-[#C9A96E] transition-colors py-3"
              >
                {t("destinations")}
                <ChevronDown
                  size={20}
                  className={`transition-transform duration-200 ${mobileDestOpen ? "rotate-180" : ""}`}
                />
              </button>
              {mobileDestOpen && (
                <div className="pl-4 pb-2 space-y-1">
                  <div className="text-[#C9A96E] text-xs uppercase tracking-widest mb-2 mt-1">Côte d'Azur</div>
                  {localDestinations.map((d) => (
                    <Link
                      key={d.slug}
                      href={`/destinations/${d.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="block text-white/70 text-base py-1.5 hover:text-[#C9A96E] transition-colors"
                    >
                      {d.name}
                    </Link>
                  ))}
                  <div className="text-[#C9A96E] text-xs uppercase tracking-widest mb-2 mt-3">International</div>
                  {international.map((d) => (
                    <Link
                      key={d.slug}
                      href={`/destinations/${d.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="block text-white/70 text-base py-1.5 hover:text-[#C9A96E] transition-colors"
                    >
                      {d.name}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            {navLinks.map((l) => (
              <li key={l.href}>
                <button
                  onClick={() => handleNavClick(l.href)}
                  className="text-white text-2xl font-light tracking-wide uppercase hover:text-[#C9A96E] transition-colors w-full text-left py-3"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Language switcher mobile */}
          <div className="flex gap-2 pt-6 pb-2">
            {localeOptions.map((l) => (
              <Link
                key={l.code}
                href="/"
                locale={l.code}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-widest border transition-colors ${
                  l.code === locale
                    ? "border-[#C9A96E] text-[#C9A96E]"
                    : "border-white/20 text-white/50 hover:border-[#C9A96E] hover:text-[#C9A96E]"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="mt-auto flex flex-col gap-4 pt-8">
            <a
              href="tel:+33787248691"
              className="flex items-center gap-3 text-[#C9A96E] font-semibold text-lg"
            >
              <Phone size={20} />
              +33 7 87 24 86 91
            </a>
            <button
              onClick={() => handleNavClick("#contact")}
              className="bg-[#C9A96E] text-[#0B1F3A] font-bold py-4 text-center uppercase tracking-widest"
            >
              {t("book")}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
