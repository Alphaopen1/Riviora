"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";

const WA_NUMBER = "33787248691";
const WA_MESSAGE = encodeURIComponent(
  "Bonjour Riviora ! Je souhaite obtenir des informations sur vos services d'excursions et transferts sur la Côte d'Azur."
);
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

export default function WhatsAppWidget() {
  const [visible, setVisible] = useState(false);
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    // Show after 3 seconds
    const t1 = setTimeout(() => setVisible(true), 3000);
    // Show speech bubble after 5 seconds
    const t2 = setTimeout(() => setShowBubble(true), 5000);
    // Hide bubble after 12 seconds
    const t3 = setTimeout(() => setShowBubble(false), 12000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Speech bubble */}
      {showBubble && (
        <div className="relative bg-white shadow-2xl rounded-lg px-4 py-3 max-w-[220px] animate-fade-in">
          <button
            onClick={() => setShowBubble(false)}
            className="absolute -top-2 -right-2 w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors"
            aria-label="Fermer"
          >
            <X size={10} />
          </button>
          <p className="text-[#0B1F3A] text-sm font-semibold leading-tight">
            Besoin d'un devis rapide ?
          </p>
          <p className="text-gray-500 text-xs mt-0.5">
            Réponse en moins de 2 minutes !
          </p>
          {/* Triangle */}
          <div className="absolute -bottom-2 right-5 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white" />
        </div>
      )}

      {/* WhatsApp button */}
      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contacter Riviora sur WhatsApp"
        className="group flex items-center gap-3 bg-[#25D366] text-white shadow-2xl hover:bg-[#1ebe5d] transition-all duration-300 hover:scale-105"
        style={{ borderRadius: "50px" }}
      >
        <div className="w-14 h-14 flex items-center justify-center flex-shrink-0">
          <MessageCircle size={26} fill="white" stroke="none" />
        </div>
        <span className="hidden sm:block pr-5 font-semibold text-sm whitespace-nowrap">
          WhatsApp
        </span>
      </a>
    </div>
  );
}
