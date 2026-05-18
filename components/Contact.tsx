"use client";

import { useState } from "react";
import { Phone, Mail, Clock, MapPin, MessageCircle, CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";

const serviceOptions = [
  "Transfert aéroport",
  "Transfert gare / hôtel",
  "Excursion demi-journée",
  "Excursion journée complète",
  "Mise à disposition journalière",
  "Transport groupe / événement",
  "Autre",
];

type ContactUrls = { waUrl: string; mailUrl: string };

function buildContactUrls(form: Record<string, string>): ContactUrls {
  const s   = form.service      || "—";
  const n   = form.name         || "—";
  const em  = form.email        || "—";
  const tel = form.phone        || "—";
  const d   = form.date         || "—";
  const pax = form.passengers   || "—";
  const dep = form.departure    || "—";
  const dest = form.destination || "—";
  const msg = form.message      || "—";

  // WhatsApp
  const waText = encodeURIComponent(
    `🌊 *Nouvelle réservation RIVIORA*\n\n` +
    `*Service :* ${s}\n` +
    `*Nom :* ${n}\n` +
    `*Email :* ${em}\n` +
    `*Tél :* ${tel}\n` +
    `*Date :* ${d}\n` +
    `*Passagers :* ${pax}\n` +
    `*Départ :* ${dep}\n` +
    `*Destination :* ${dest}\n` +
    `*Message :* ${msg}`
  );
  const waUrl = `https://wa.me/33787248691?text=${waText}`;

  // Mailto
  const subject = encodeURIComponent(`[RIVIORA] ${s} — ${n}`);
  const body = encodeURIComponent(
    `Bonjour,\n\nVoici ma demande de réservation :\n\n` +
    `Service : ${s}\n` +
    `Nom : ${n}\n` +
    `Email : ${em}\n` +
    `Téléphone : ${tel}\n` +
    `Date : ${d}\n` +
    `Passagers : ${pax}\n` +
    `Lieu de départ : ${dep}\n` +
    `Destination : ${dest}\n` +
    `Informations complémentaires : ${msg}\n\n` +
    `Merci de me confirmer la disponibilité et le tarif.\n\nCordialement,\n${n}`
  );
  const mailUrl = `mailto:contact@riviora.fr?subject=${subject}&body=${body}`;

  return { waUrl, mailUrl };
}

export default function Contact() {
  const t = useTranslations("contact");

  const [form, setForm] = useState({
    service: "", name: "", email: "", phone: "",
    date: "", passengers: "", departure: "", destination: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [urls, setUrls] = useState<ContactUrls | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const built = buildContactUrls(form);
    setUrls(built);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="bg-[#0B1F3A] py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#C9A96E] font-semibold text-sm uppercase tracking-widest mb-3">
            {t("badge")}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">
            {t("title")}{" "}
            <span className="text-[#C9A96E]">{t("titleAccent")}</span>
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-lg">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-white font-bold text-xl mb-6">{t("directTitle")}</h3>
              <div className="space-y-6">
                <a href="tel:+33787248691" className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-[#C9A96E]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#C9A96E] transition-colors duration-300">
                    <Phone size={20} className="text-[#C9A96E] group-hover:text-[#0B1F3A]" />
                  </div>
                  <div>
                    <div className="text-white/40 text-xs uppercase tracking-widest mb-1">{t("phoneLabel")}</div>
                    <div className="text-white font-semibold text-lg group-hover:text-[#C9A96E] transition-colors">+33 7 87 24 86 91</div>
                  </div>
                </a>

                <a href="mailto:contact@riviora.fr" className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-[#C9A96E]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#C9A96E] transition-colors duration-300">
                    <Mail size={20} className="text-[#C9A96E] group-hover:text-[#0B1F3A]" />
                  </div>
                  <div>
                    <div className="text-white/40 text-xs uppercase tracking-widest mb-1">{t("emailLabel")}</div>
                    <div className="text-white font-semibold group-hover:text-[#C9A96E] transition-colors">contact@riviora.fr</div>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#C9A96E]/10 flex items-center justify-center flex-shrink-0">
                    <Clock size={20} className="text-[#C9A96E]" />
                  </div>
                  <div>
                    <div className="text-white/40 text-xs uppercase tracking-widest mb-1">{t("availabilityLabel")}</div>
                    <div className="text-white font-semibold">{t("availabilityValue")}</div>
                    <div className="text-white/50 text-sm">{t("availabilitySub")}</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#C9A96E]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-[#C9A96E]" />
                  </div>
                  <div>
                    <div className="text-white/40 text-xs uppercase tracking-widest mb-1">{t("zoneLabel")}</div>
                    <div className="text-white font-semibold">{t("zoneValue")}</div>
                    <div className="text-white/50 text-sm">{t("zoneSub")}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="border border-white/10 p-6 space-y-3">
              <h4 className="text-white font-semibold text-sm uppercase tracking-wide mb-4">{t("trustTitle")}</h4>
              {(t.raw("trustItems") as string[]).map((item) => (
                <div key={item} className="flex items-center gap-2 text-white/70 text-sm">
                  <CheckCircle size={14} className="text-[#C9A96E] flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Form / Success */}
          <div className="lg:col-span-3">
            {submitted && urls ? (
              <div className="bg-white/5 border border-[#C9A96E]/30 p-10 text-center h-full flex flex-col items-center justify-center gap-6">
                <div className="w-16 h-16 bg-[#C9A96E]/10 flex items-center justify-center">
                  <CheckCircle size={36} className="text-[#C9A96E]" />
                </div>
                <div>
                  <h3 className="text-white text-2xl font-bold mb-2">{t("successTitle")}</h3>
                  <p className="text-white/60">{t("successMsg")}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs">
                  <a
                    href={urls.waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold px-6 py-4 text-sm uppercase tracking-widest hover:bg-[#1ebe5d] transition-all flex-1"
                  >
                    <MessageCircle size={18} />
                    WhatsApp
                  </a>
                  <a
                    href={urls.mailUrl}
                    className="flex items-center justify-center gap-2 bg-[#C9A96E] text-[#0B1F3A] font-bold px-6 py-4 text-sm uppercase tracking-widest hover:bg-[#E8C98A] transition-all flex-1"
                  >
                    <Mail size={18} />
                    Email
                  </a>
                </div>

                <a
                  href="tel:+33787248691"
                  className="flex items-center gap-2 text-white/40 hover:text-[#C9A96E] text-sm transition-colors"
                >
                  <Phone size={14} />
                  {t("successPhone")}
                </a>

                <button
                  onClick={() => { setSubmitted(false); setUrls(null); }}
                  className="text-white/30 hover:text-white/60 text-xs underline transition-colors"
                >
                  Modifier ma demande
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Service */}
                <div>
                  <label className="block text-white/60 text-xs uppercase tracking-widest mb-2">
                    {t("formService")} *
                  </label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 text-white px-4 py-3.5 text-sm focus:outline-none focus:border-[#C9A96E] transition-colors appearance-none"
                  >
                    <option value="" className="bg-[#0B1F3A]">{t("formServicePlaceholder")}</option>
                    {serviceOptions.map((s) => (
                      <option key={s} value={s} className="bg-[#0B1F3A]">{s}</option>
                    ))}
                  </select>
                </div>

                {/* Name + Email */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/60 text-xs uppercase tracking-widest mb-2">
                      {t("formName")} *
                    </label>
                    <input
                      type="text" name="name" value={form.name} onChange={handleChange}
                      required placeholder={t("formNamePlaceholder")}
                      className="w-full bg-white/5 border border-white/10 text-white px-4 py-3.5 text-sm placeholder:text-white/30 focus:outline-none focus:border-[#C9A96E] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-xs uppercase tracking-widest mb-2">
                      {t("formEmail")}
                    </label>
                    <input
                      type="email" name="email" value={form.email} onChange={handleChange}
                      placeholder={t("formEmailPlaceholder")}
                      className="w-full bg-white/5 border border-white/10 text-white px-4 py-3.5 text-sm placeholder:text-white/30 focus:outline-none focus:border-[#C9A96E] transition-colors"
                    />
                  </div>
                </div>

                {/* Phone + Passengers */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/60 text-xs uppercase tracking-widest mb-2">
                      {t("formPhone")}
                    </label>
                    <input
                      type="tel" name="phone" value={form.phone} onChange={handleChange}
                      placeholder={t("formPhonePlaceholder")}
                      className="w-full bg-white/5 border border-white/10 text-white px-4 py-3.5 text-sm placeholder:text-white/30 focus:outline-none focus:border-[#C9A96E] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-xs uppercase tracking-widest mb-2">
                      {t("formPassengers")}
                    </label>
                    <input
                      type="number" name="passengers" value={form.passengers} onChange={handleChange}
                      min="1" max="21" placeholder="2"
                      className="w-full bg-white/5 border border-white/10 text-white px-4 py-3.5 text-sm placeholder:text-white/30 focus:outline-none focus:border-[#C9A96E] transition-colors"
                    />
                  </div>
                </div>

                {/* Date + Departure */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/60 text-xs uppercase tracking-widest mb-2">
                      {t("formDate")} *
                    </label>
                    <input
                      type="date" name="date" value={form.date} onChange={handleChange}
                      required
                      className="w-full bg-white/5 border border-white/10 text-white px-4 py-3.5 text-sm focus:outline-none focus:border-[#C9A96E] transition-colors [color-scheme:dark]"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-xs uppercase tracking-widest mb-2">
                      {t("formDeparture")}
                    </label>
                    <input
                      type="text" name="departure" value={form.departure} onChange={handleChange}
                      placeholder={t("formDeparturePlaceholder")}
                      className="w-full bg-white/5 border border-white/10 text-white px-4 py-3.5 text-sm placeholder:text-white/30 focus:outline-none focus:border-[#C9A96E] transition-colors"
                    />
                  </div>
                </div>

                {/* Destination */}
                <div>
                  <label className="block text-white/60 text-xs uppercase tracking-widest mb-2">
                    {t("formDestination")}
                  </label>
                  <input
                    type="text" name="destination" value={form.destination} onChange={handleChange}
                    placeholder={t("formDestinationPlaceholder")}
                    className="w-full bg-white/5 border border-white/10 text-white px-4 py-3.5 text-sm placeholder:text-white/30 focus:outline-none focus:border-[#C9A96E] transition-colors"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-white/60 text-xs uppercase tracking-widest mb-2">
                    {t("formMessage")}
                  </label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange}
                    rows={4} placeholder={t("formMessagePlaceholder")}
                    className="w-full bg-white/5 border border-white/10 text-white px-4 py-3.5 text-sm placeholder:text-white/30 focus:outline-none focus:border-[#C9A96E] transition-colors resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-[#C9A96E] text-[#0B1F3A] font-bold py-5 text-sm uppercase tracking-widest hover:bg-[#E8C98A] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {t("formSubmit")}
                </button>

                <p className="text-white/30 text-xs text-center">{t("formPrivacy")}</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
