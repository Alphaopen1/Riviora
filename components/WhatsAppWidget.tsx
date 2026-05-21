"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { useTranslations } from "next-intl";

const WA_NUMBER = "33787248691";

export default function WhatsAppWidget() {
  const t = useTranslations("whatsapp");
  const [visible, setVisible] = useState(false);
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 3000);
    const t2 = setTimeout(() => setShowBubble(true), 5000);
    const t3 = setTimeout(() => setShowBubble(false), 12000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  if (!visible) return null;

  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(t("defaultMessage"))}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Speech bubble */}
      {showBubble && (
        <div className="relative bg-white shadow-2xl rounded-lg px-4 py-3 max-w-[220px] animate-fade-in">
          <button
            onClick={() => setShowBubble(false)}
            className="absolute -top-2 -right-2 w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors"
            aria-label="Close"
          >
            <X size={10} />
          </button>
          <p className="text-[#0B1F3A] text-sm font-semibold leading-tight">
            {t("bubbleTitle")}
          </p>
          <p className="text-gray-500 text-xs mt-0.5">
            {t("bubbleSubtitle")}
          </p>
          {/* Triangle */}
          <div className="absolute -bottom-2 right-5 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white" />
        </div>
      )}

      {/* WhatsApp button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Riviora"
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
