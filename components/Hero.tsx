"use client";

import { useEffect, useRef, useState } from "react";
import { Phone, ArrowDown, Star } from "lucide-react";

const slides = [
  {
    title: "Votre Riviera\nPrivée",
    subtitle: "Chauffeur privé & excursions premium sur la Côte d'Azur",
    bg: "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?auto=format&fit=crop&w=1920&q=85",
    alt: "Vue panoramique de la Côte d'Azur",
  },
  {
    title: "Monaco &\nMonte-Carlo",
    subtitle: "Découvrez la Principauté en toute exclusivité — 30 min de Nice",
    bg: "https://images.unsplash.com/photo-1512232328416-4d4d78d2db63?auto=format&fit=crop&w=1920&q=85",
    alt: "Monaco vue du ciel",
  },
  {
    title: "Saint-Tropez\n& La Côte",
    subtitle: "Plages de légende, villages perchés, calanques secrètes",
    bg: "https://images.unsplash.com/photo-1504859468489-a2e0e4d03fe2?auto=format&fit=crop&w=1920&q=85",
    alt: "Saint-Tropez",
  },
  {
    title: "Cannes &\nAntibes",
    subtitle: "La Croisette, les îles de Lérins, le charme de l'authenticité",
    bg: "https://images.unsplash.com/photo-1562883676-8c7feb83f09b?auto=format&fit=crop&w=1920&q=85",
    alt: "Cannes Côte d'Azur",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToServices = () => {
    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-2000"
          style={{
            opacity: i === current ? 1 : 0,
            transitionDuration: "1500ms",
          }}
        >
          {/* Try to load video for first slide, fallback to image */}
          {i === 0 && (
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              poster={slide.bg}
              className="absolute inset-0 w-full h-full object-cover"
              aria-hidden="true"
            >
              {/* Place your hero.mp4 in /public/videos/ to enable video background */}
              <source src="/videos/hero.mp4" type="video/mp4" />
            </video>
          )}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.bg})` }}
            role="img"
            aria-label={slide.alt}
          />
        </div>
      ))}

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A]/80 via-[#0B1F3A]/50 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/60 via-transparent to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col justify-center min-h-screen max-w-7xl mx-auto px-4 sm:px-6 pt-24">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="text-[#C9A96E] fill-[#C9A96E]" />
              ))}
            </div>
            <span className="text-white/80 text-sm font-medium tracking-widest uppercase">
              4.9/5 · +500 avis Google · Depuis 2009
            </span>
          </div>

          {/* Title */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-none mb-6 tracking-tight">
            {slides[current].title.split("\n").map((line, i) => (
              <span key={i} className="block">
                {i === 1 ? (
                  <span className="text-[#C9A96E]">{line}</span>
                ) : (
                  line
                )}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/80 mb-10 font-light leading-relaxed max-w-xl">
            {slides[current].subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <button
              onClick={scrollToContact}
              className="bg-[#C9A96E] text-[#0B1F3A] font-bold px-10 py-5 text-sm uppercase tracking-widest hover:bg-[#E8C98A] transition-all duration-300 flex items-center justify-center gap-2"
            >
              Réserver une excursion
            </button>
            <a
              href="tel:+33787248691"
              className="border-2 border-white text-white font-semibold px-10 py-5 text-sm uppercase tracking-widest hover:bg-white hover:text-[#0B1F3A] transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Phone size={16} />
              +33 7 87 24 86 91
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-8 text-white/60 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
              Licence VTC officielle
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
              Chauffeurs bilingues FR/EN
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
              Disponible 24h/24
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
              Réponse en 2h
            </div>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            className={`transition-all duration-500 ${
              i === current
                ? "w-8 h-1 bg-[#C9A96E]"
                : "w-2 h-1 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToServices}
        aria-label="Voir les services"
        className="absolute bottom-12 right-8 z-20 flex flex-col items-center gap-2 text-white/40 hover:text-white/80 transition-colors"
      >
        <span className="text-xs uppercase tracking-widest writing-mode-vertical rotate-90">
          Découvrir
        </span>
        <ArrowDown size={18} className="animate-bounce" />
      </button>
    </section>
  );
}
