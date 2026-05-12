"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Phone, ArrowDown, Star } from "lucide-react";

const slides = [
  {
    title: "Votre Riviera\nPrivée",
    subtitle: "Chauffeur privé & excursions premium sur la Côte d'Azur",
    video: "/videos/hero1.mp4",
    poster: "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?auto=format&fit=crop&w=1920&q=80",
  },
  {
    title: "Saint-Tropez\n& La Côte",
    subtitle: "Plages de légende, villages perchés, calanques secrètes",
    video: "/videos/hero2.mp4",
    poster: "https://images.unsplash.com/photo-1504859468489-a2e0e4d03fe2?auto=format&fit=crop&w=1920&q=80",
  },
  {
    title: "Monaco &\nMonte-Carlo",
    subtitle: "Découvrez la Principauté en toute exclusivité — 30 min de Nice",
    video: "/videos/hero3.mp4",
    poster: "https://images.unsplash.com/photo-1512232328416-4d4d78d2db63?auto=format&fit=crop&w=1920&q=80",
  },
  {
    title: "Mercedes\nClasse V",
    subtitle: "Véhicules premium, chauffeurs certifiés, confort absolu",
    video: "/videos/hero_vclass.mp4",
    poster: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1920&q=80",
  },
];

const SLIDE_DURATION = 11000; // ms between slide changes

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((index: number) => {
    setTransitioning(true);
    setTimeout(() => {
      setCurrent(index);
      setTransitioning(false);
    }, 600);
  }, []);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo]);

  // Auto-advance
  useEffect(() => {
    timerRef.current = setTimeout(next, SLIDE_DURATION);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [next]);

  // Play/pause videos
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === current) {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [current]);

  const scrollToContact = () =>
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });

  const scrollToServices = () =>
    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#0B1F3A]">
      {/* Video slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current && !transitioning ? 1 : 0 }}
          aria-hidden={i !== current}
        >
          <video
            ref={(el) => { videoRefs.current[i] = el; }}
            src={slide.video}
            poster={slide.poster}
            muted
            loop
            playsInline
            preload={i === 0 ? "auto" : "none"}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A]/85 via-[#0B1F3A]/50 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/70 via-transparent to-[#0B1F3A]/20 z-10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 flex flex-col justify-center min-h-screen max-w-7xl mx-auto px-4 sm:px-6 pt-24">
        <div className="max-w-3xl">
          {/* Stars + badge */}
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="text-[#C9A96E] fill-[#C9A96E]" />
              ))}
            </div>
            <span className="text-white/75 text-sm font-medium tracking-widest uppercase">
              4.9/5 · +500 avis Google · Depuis 2009
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-none mb-6 tracking-tight transition-opacity duration-500"
            style={{ opacity: transitioning ? 0 : 1 }}
          >
            {slides[current].title.split("\n").map((line, i) => (
              <span key={i} className="block">
                {i === 1 ? <span className="text-[#C9A96E]">{line}</span> : line}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <p
            className="text-xl md:text-2xl text-white/80 mb-10 font-light leading-relaxed max-w-xl transition-opacity duration-500"
            style={{ opacity: transitioning ? 0 : 1 }}
          >
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
          <div className="flex flex-wrap gap-8 text-white/55 text-sm">
            {["Licence VTC officielle", "Chauffeurs bilingues FR/EN", "Disponible 24h/24", "Réponse en 2h"].map((t) => (
              <div key={t} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] flex-shrink-0" />
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            className={`transition-all duration-500 ${
              i === current ? "w-8 h-1 bg-[#C9A96E]" : "w-2 h-1 bg-white/35 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToServices}
        aria-label="Découvrir les services"
        className="absolute bottom-12 right-8 z-20 flex flex-col items-center gap-2 text-white/40 hover:text-white/80 transition-colors group"
      >
        <ArrowDown size={20} className="animate-bounce" />
      </button>
    </section>
  );
}
