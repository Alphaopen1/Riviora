"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { useTranslations } from "next-intl";

export default function FAQ() {
  const t = useTranslations("faq");
  const [open, setOpen] = useState<number | null>(null);

  const faqs = t.raw("items") as Array<{ question: string; answer: string }>;

  const toggle = (i: number) => setOpen(open === i ? null : i);

  return (
    <section id="faq" className="bg-[#F8F6F1] py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#C9A96E] font-semibold text-sm uppercase tracking-widest mb-3">
            {t("badge")}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0B1F3A] mb-5">
            {t("title")} <span className="text-[#C9A96E]">{t("titleAccent")}</span>
          </h2>
          <p className="text-gray-500 text-lg">
            {t("subtitle")}
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white overflow-hidden"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between p-6 text-left group hover:bg-[#0B1F3A] transition-colors duration-300"
                aria-expanded={open === i}
              >
                <span
                  className={`font-semibold text-sm md:text-base pr-4 transition-colors duration-300 ${
                    open === i
                      ? "text-[#C9A96E]"
                      : "text-[#0B1F3A] group-hover:text-white"
                  }`}
                >
                  {faq.question}
                </span>
                <span className="flex-shrink-0">
                  {open === i ? (
                    <Minus
                      size={20}
                      className="text-[#C9A96E]"
                    />
                  ) : (
                    <Plus
                      size={20}
                      className="text-[#C9A96E] group-hover:text-[#C9A96E]"
                    />
                  )}
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-6 text-gray-600 text-sm leading-relaxed border-t border-gray-100">
                  <p className="pt-4">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-500 mb-6">
            {t("notFound")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+33787248691"
              className="bg-[#0B1F3A] text-white font-bold px-8 py-4 text-sm uppercase tracking-widest hover:bg-[#C9A96E] hover:text-[#0B1F3A] transition-all duration-300 text-center"
            >
              {t("callBtn")}
            </a>
            <a
              href="mailto:contact@riviora.fr"
              className="border-2 border-[#0B1F3A] text-[#0B1F3A] font-bold px-8 py-4 text-sm uppercase tracking-widest hover:bg-[#0B1F3A] hover:text-white transition-all duration-300 text-center"
            >
              {t("emailBtn")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
