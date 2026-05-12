"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Menu, X, ChevronDown } from "lucide-react";

const navLinks = [
  { href: "#services", label: "Nos Services" },
  { href: "#destinations", label: "Destinations" },
  { href: "#flotte", label: "Notre Flotte" },
  { href: "#tarifs", label: "Tarifs" },
  { href: "#avis", label: "Avis" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0B1F3A] shadow-2xl py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="Riviora - Accueil"
          >
            <span className="text-2xl font-bold tracking-widest text-white uppercase">
              RIVI<span className="text-[#C9A96E]">ORA</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-8">
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

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+33787248691"
              className="flex items-center gap-2 text-[#C9A96E] font-semibold text-sm hover:text-[#E8C98A] transition-colors"
            >
              <Phone size={16} />
              +33 7 87 24 86 91
            </a>
            <button
              onClick={() => handleNavClick("#contact")}
              className="bg-[#C9A96E] text-[#0B1F3A] font-bold px-6 py-2.5 text-sm uppercase tracking-widest hover:bg-[#E8C98A] transition-all duration-300"
            >
              Réserver
            </button>
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
        <div className="fixed inset-0 z-40 bg-[#0B1F3A] flex flex-col pt-24 pb-8 px-6">
          <ul className="flex flex-col gap-6 mt-4">
            {navLinks.map((l) => (
              <li key={l.href}>
                <button
                  onClick={() => handleNavClick(l.href)}
                  className="text-white text-2xl font-light tracking-wide uppercase hover:text-[#C9A96E] transition-colors w-full text-left"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-col gap-4">
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
              Réserver maintenant
            </button>
          </div>
        </div>
      )}
    </>
  );
}
