"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { useTranslations } from "next-intl";

const WA_NUMBER = "33787248691";

/** Sticky bottom bar visible on mobile only — appears after 300 px of scroll. */
export default function MobileCTABar() {
  const t = useTranslations("whatsapp");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(t("defaultMessage"))}`;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex border-t border-white/10 shadow-2xl">
      <a
        href="tel:+33787248691"
        className="flex-1 flex items-center justify-center gap-2 bg-[#0B1F3A] text-white font-bold py-4 text-sm uppercase tracking-widest hover:bg-[#152d52] transition-colors"
        aria-label={t("callBtn")}
      >
        <Phone size={16} />
        {t("callBtn")}
      </a>
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-4 text-sm uppercase tracking-widest hover:bg-[#1ebe5d] transition-colors"
        aria-label="WhatsApp Riviora"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.523 5.845L.057 23.429a.5.5 0 0 0 .513.572l5.701-1.494A11.953 11.953 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.803 9.803 0 0 1-5.031-1.387l-.36-.214-3.733.979 1.002-3.628-.234-.374A9.803 9.803 0 0 1 2.182 12C2.182 6.567 6.567 2.182 12 2.182S21.818 6.567 21.818 12 17.433 21.818 12 21.818z" />
        </svg>
        WhatsApp
      </a>
    </div>
  );
}
