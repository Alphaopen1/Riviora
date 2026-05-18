"use client";

import { useState } from "react";
import { ChevronRight, ChevronLeft, Check, Phone, MessageCircle, Mail } from "lucide-react";

type Step = {
  id: string;
  question: string;
  type: "choice" | "text" | "tel" | "email" | "date" | "number" | "textarea";
  options?: string[];
  placeholder?: string;
  required?: boolean;
};

const steps: Step[] = [
  {
    id: "service",
    question: "Quel type de prestation cherchez-vous ?",
    type: "choice",
    options: [
      "Transfert aéroport / gare",
      "Excursion demi-journée",
      "Excursion journée complète",
      "Transfert international",
      "Transport de groupe",
      "Mise à disposition journalière",
    ],
    required: true,
  },
  {
    id: "destination",
    question: "Quelle est votre destination ou itinéraire souhaité ?",
    type: "text",
    placeholder: "Monaco, Saint-Tropez, Milan, Courchevel…",
    required: true,
  },
  {
    id: "date",
    question: "Quelle est la date de votre prestation ?",
    type: "date",
    required: true,
  },
  {
    id: "passengers",
    question: "Combien de passagers serez-vous ?",
    type: "choice",
    options: ["1–3 personnes", "4–8 personnes", "9–15 personnes", "16–21 personnes"],
    required: true,
  },
  {
    id: "departure",
    question: "D'où partirez-vous ? (hôtel, adresse, aéroport…)",
    type: "text",
    placeholder: "Nice Aéroport Terminal 1, Hôtel Negresco…",
    required: false,
  },
  {
    id: "name",
    question: "Votre nom complet ?",
    type: "text",
    placeholder: "Jean Dupont",
    required: true,
  },
  {
    id: "phone",
    question: "Votre numéro de téléphone ?",
    type: "tel",
    placeholder: "+33 6 00 00 00 00",
    required: true,
  },
  {
    id: "message",
    question: "Des informations complémentaires ? (vol, heure, demandes spéciales…)",
    type: "textarea",
    placeholder: "N° de vol, heure d'arrivée, siège bébé nécessaire…",
    required: false,
  },
];

type Answers = Record<string, string>;

function buildUrls(answers: Answers): { waUrl: string; mailUrl: string } {
  const s = answers.service     || "—";
  const dest = answers.destination || "—";
  const d = answers.date        || "—";
  const pax = answers.passengers   || "—";
  const dep = answers.departure    || "—";
  const n = answers.name        || "—";
  const tel = answers.phone       || "—";
  const msg = answers.message     || "—";

  // WhatsApp
  const waText = encodeURIComponent(
    `🌊 *Nouvelle réservation RIVIORA*\n\n` +
    `*Service :* ${s}\n` +
    `*Nom :* ${n}\n` +
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

export default function BookingWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [currentValue, setCurrentValue] = useState("");
  const [done, setDone] = useState(false);
  const [urls, setUrls] = useState<{ waUrl: string; mailUrl: string } | null>(null);

  const step = steps[currentStep];
  const progress = (currentStep / steps.length) * 100;
  const isLast = currentStep === steps.length - 1;

  const handleChoice = (val: string) => {
    const newAnswers = { ...answers, [step.id]: val };
    setAnswers(newAnswers);
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setCurrentValue("");
    }
  };

  const handleNext = () => {
    if (step.required && !currentValue.trim()) return;
    const newAnswers = { ...answers, [step.id]: currentValue };
    setAnswers(newAnswers);
    if (isLast) {
      const built = buildUrls(newAnswers);
      setUrls(built);
      setDone(true);
    } else {
      setCurrentStep(currentStep + 1);
      setCurrentValue(answers[steps[currentStep + 1]?.id] ?? "");
    }
  };

  const handleBack = () => {
    if (currentStep === 0) return;
    setCurrentStep(currentStep - 1);
    setCurrentValue(answers[steps[currentStep - 1].id] ?? "");
  };

  if (done && urls) {
    return (
      <div className="flex flex-col items-center text-center py-10 px-4">
        <div className="w-16 h-16 bg-[#C9A96E]/10 flex items-center justify-center mb-6">
          <Check size={32} className="text-[#C9A96E]" />
        </div>
        <h3 className="text-white text-2xl font-bold mb-3">Votre demande est prête !</h3>
        <p className="text-white/60 mb-8 max-w-sm text-sm leading-relaxed">
          Choisissez comment envoyer votre demande à Riviora. Nous vous répondons en moins de 2 heures.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
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
          className="mt-5 flex items-center justify-center gap-2 border border-white/20 text-white/60 font-medium px-6 py-3 text-sm uppercase tracking-widest hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all"
        >
          <Phone size={16} />
          Appeler directement
        </a>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Progress bar */}
      <div className="h-0.5 bg-white/10 mb-8">
        <div
          className="h-0.5 bg-[#C9A96E] transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step counter */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-white/40 text-xs uppercase tracking-widest">
          Étape {currentStep + 1} / {steps.length}
        </span>
        <span className="text-[#C9A96E] text-xs font-semibold uppercase tracking-widest">
          Devis gratuit
        </span>
      </div>

      {/* Question */}
      <h3 className="text-white text-xl md:text-2xl font-bold mb-8 leading-snug">
        {step.question}
      </h3>

      {/* Input */}
      {step.type === "choice" ? (
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {step.options!.map((opt) => (
            <button
              key={opt}
              onClick={() => handleChoice(opt)}
              className={`text-left px-5 py-4 border text-sm font-medium transition-all duration-200 ${
                answers[step.id] === opt
                  ? "border-[#C9A96E] bg-[#C9A96E]/10 text-[#C9A96E]"
                  : "border-white/15 text-white/70 hover:border-[#C9A96E]/50 hover:text-white"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      ) : step.type === "textarea" ? (
        <textarea
          value={currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
          placeholder={step.placeholder}
          rows={4}
          className="w-full bg-white/5 border border-white/15 text-white px-4 py-4 text-sm placeholder:text-white/30 focus:outline-none focus:border-[#C9A96E] transition-colors resize-none mb-6"
          onKeyDown={(e) => e.key === "Enter" && e.ctrlKey && handleNext()}
        />
      ) : (
        <input
          type={step.type}
          value={currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
          placeholder={step.placeholder}
          className="w-full bg-white/5 border border-white/15 text-white px-4 py-4 text-sm placeholder:text-white/30 focus:outline-none focus:border-[#C9A96E] transition-colors mb-6 [color-scheme:dark]"
          onKeyDown={(e) => e.key === "Enter" && handleNext()}
          autoFocus
        />
      )}

      {/* Navigation */}
      {step.type !== "choice" && (
        <div className="flex items-center gap-4">
          {currentStep > 0 && (
            <button
              onClick={handleBack}
              className="flex items-center gap-1 text-white/40 hover:text-white text-sm transition-colors"
            >
              <ChevronLeft size={16} /> Retour
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={step.required && !currentValue.trim()}
            className="flex items-center gap-2 bg-[#C9A96E] text-[#0B1F3A] font-bold px-8 py-4 text-sm uppercase tracking-widest hover:bg-[#E8C98A] transition-all disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
          >
            {isLast ? (
              <><Check size={16} /> Voir mes options</>
            ) : (
              <>Suivant <ChevronRight size={16} /></>
            )}
          </button>
        </div>
      )}

      {/* Back button for choice steps */}
      {step.type === "choice" && currentStep > 0 && (
        <button
          onClick={handleBack}
          className="flex items-center gap-1 text-white/40 hover:text-white text-sm transition-colors"
        >
          <ChevronLeft size={16} /> Retour
        </button>
      )}
    </div>
  );
}
