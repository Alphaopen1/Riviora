"use client";

import { useState } from "react";
import { Phone, Mail, Clock, MapPin, Send, CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Contact() {
  const t = useTranslations("contact");

  const serviceOptions = t.raw("serviceOptions") as string[];
  const trustItems = t.raw("trustItems") as string[];

  const [form, setForm] = useState({
    service: "",
    name: "",
    email: "",
    phone: "",
    date: "",
    passengers: "",
    departure: "",
    destination: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setSubmitted(true);
      if (data.waUrl) {
        setTimeout(() => window.open(data.waUrl, "_blank"), 500);
      }
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
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
              <h3 className="text-white font-bold text-xl mb-6">
                {t("directContact")}
              </h3>
              <div className="space-y-6">
                <a
                  href="tel:+33787248691"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 bg-[#C9A96E]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#C9A96E] transition-colors duration-300">
                    <Phone size={20} className="text-[#C9A96E] group-hover:text-[#0B1F3A]" />
                  </div>
                  <div>
                    <div className="text-white/40 text-xs uppercase tracking-widest mb-1">
                      {t("phoneLabel")}
                    </div>
                    <div className="text-white font-semibold text-lg group-hover:text-[#C9A96E] transition-colors">
                      +33 7 87 24 86 91
                    </div>
                  </div>
                </a>

                <a
                  href="mailto:contact@riviora.fr"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 bg-[#C9A96E]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#C9A96E] transition-colors duration-300">
                    <Mail size={20} className="text-[#C9A96E] group-hover:text-[#0B1F3A]" />
                  </div>
                  <div>
                    <div className="text-white/40 text-xs uppercase tracking-widest mb-1">
                      {t("emailLabel")}
                    </div>
                    <div className="text-white font-semibold group-hover:text-[#C9A96E] transition-colors">
                      contact@riviora.fr
                    </div>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#C9A96E]/10 flex items-center justify-center flex-shrink-0">
                    <Clock size={20} className="text-[#C9A96E]" />
                  </div>
                  <div>
                    <div className="text-white/40 text-xs uppercase tracking-widest mb-1">
                      {t("availabilityLabel")}
                    </div>
                    <div className="text-white font-semibold">{t("availability")}</div>
                    <div className="text-white/50 text-sm">{t("availabilitySub")}</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#C9A96E]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-[#C9A96E]" />
                  </div>
                  <div>
                    <div className="text-white/40 text-xs uppercase tracking-widest mb-1">
                      {t("zoneLabel")}
                    </div>
                    <div className="text-white font-semibold">{t("zone")}</div>
                    <div className="text-white/50 text-sm">{t("zoneSub")}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="border border-white/10 p-6 space-y-3">
              <h4 className="text-white font-semibold text-sm uppercase tracking-wide mb-4">
                {t("trustTitle")}
              </h4>
              {trustItems.map((item) => (
                <div key={item} className="flex items-center gap-2 text-white/70 text-sm">
                  <CheckCircle size={14} className="text-[#C9A96E] flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="bg-white/5 border border-[#C9A96E]/30 p-12 text-center h-full flex flex-col items-center justify-center">
                <CheckCircle size={56} className="text-[#C9A96E] mb-6" />
                <h3 className="text-white text-2xl font-bold mb-3">
                  {t("successTitle")}
                </h3>
                <p className="text-white/60 text-lg mb-6">
                  {t("successText")}
                </p>
                <p className="text-white/40 text-sm">
                  {t("successImmediate")}{" "}
                  <a href="tel:+33787248691" className="text-[#C9A96E] hover:underline">
                    +33 7 87 24 86 91
                  </a>
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Service */}
                <div>
                  <label className="block text-white/60 text-xs uppercase tracking-widest mb-2">
                    {t("serviceLabel")}
                  </label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 text-white px-4 py-3.5 text-sm focus:outline-none focus:border-[#C9A96E] transition-colors appearance-none"
                  >
                    <option value="" className="bg-[#0B1F3A]">
                      {t("servicePlaceholder")}
                    </option>
                    {serviceOptions.map((s) => (
                      <option key={s} value={s} className="bg-[#0B1F3A]">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Name + Email */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/60 text-xs uppercase tracking-widest mb-2">
                      {t("nameLabel")}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder={t("namePlaceholder")}
                      className="w-full bg-white/5 border border-white/10 text-white px-4 py-3.5 text-sm placeholder:text-white/30 focus:outline-none focus:border-[#C9A96E] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-xs uppercase tracking-widest mb-2">
                      {t("emailFormLabel")}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder={t("emailPlaceholder")}
                      className="w-full bg-white/5 border border-white/10 text-white px-4 py-3.5 text-sm placeholder:text-white/30 focus:outline-none focus:border-[#C9A96E] transition-colors"
                    />
                  </div>
                </div>

                {/* Phone + Passengers */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/60 text-xs uppercase tracking-widest mb-2">
                      {t("phoneFormLabel")}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder={t("phonePlaceholder")}
                      className="w-full bg-white/5 border border-white/10 text-white px-4 py-3.5 text-sm placeholder:text-white/30 focus:outline-none focus:border-[#C9A96E] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-xs uppercase tracking-widest mb-2">
                      {t("passengersLabel")}
                    </label>
                    <input
                      type="number"
                      name="passengers"
                      value={form.passengers}
                      onChange={handleChange}
                      min="1"
                      max="21"
                      placeholder={t("passengersPlaceholder")}
                      className="w-full bg-white/5 border border-white/10 text-white px-4 py-3.5 text-sm placeholder:text-white/30 focus:outline-none focus:border-[#C9A96E] transition-colors"
                    />
                  </div>
                </div>

                {/* Date + Departure */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/60 text-xs uppercase tracking-widest mb-2">
                      {t("dateLabel")}
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/5 border border-white/10 text-white px-4 py-3.5 text-sm focus:outline-none focus:border-[#C9A96E] transition-colors [color-scheme:dark]"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-xs uppercase tracking-widest mb-2">
                      {t("departureLabel")}
                    </label>
                    <input
                      type="text"
                      name="departure"
                      value={form.departure}
                      onChange={handleChange}
                      placeholder={t("departurePlaceholder")}
                      className="w-full bg-white/5 border border-white/10 text-white px-4 py-3.5 text-sm placeholder:text-white/30 focus:outline-none focus:border-[#C9A96E] transition-colors"
                    />
                  </div>
                </div>

                {/* Destination */}
                <div>
                  <label className="block text-white/60 text-xs uppercase tracking-widest mb-2">
                    {t("destinationLabel")}
                  </label>
                  <input
                    type="text"
                    name="destination"
                    value={form.destination}
                    onChange={handleChange}
                    placeholder={t("destinationPlaceholder")}
                    className="w-full bg-white/5 border border-white/10 text-white px-4 py-3.5 text-sm placeholder:text-white/30 focus:outline-none focus:border-[#C9A96E] transition-colors"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-white/60 text-xs uppercase tracking-widest mb-2">
                    {t("messageLabel")}
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder={t("messagePlaceholder")}
                    className="w-full bg-white/5 border border-white/10 text-white px-4 py-3.5 text-sm placeholder:text-white/30 focus:outline-none focus:border-[#C9A96E] transition-colors resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#C9A96E] text-[#0B1F3A] font-bold py-5 text-sm uppercase tracking-widest hover:bg-[#E8C98A] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {loading ? (
                    t("loading")
                  ) : (
                    <>
                      <Send size={16} />
                      {t("submitBtn")}
                    </>
                  )}
                </button>

                <p className="text-white/30 text-xs text-center">
                  {t("privacyNote")}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
