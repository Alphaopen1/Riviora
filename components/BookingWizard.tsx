"use client";

import { useState } from "react";
import { ChevronRight, ChevronLeft, Check, Phone, MessageCircle, Loader2 } from "lucide-react";

type Step = {
  id: string;
  question: string;
  type: "choice" | "text" | "tel" | "email" | "date" | "number" | "textarea";
  options?: string[];
  placeholder?: string;
  required?: boolean;
  skip?: string; // field name to skip if condition
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
    question: "Votre numéro de téléphone (pour WhatsApp) ?",
    type: "tel",
    placeholder: "+33 6 00 00 00 00",
    required: true,
  },
  {
    id: "email",
    question: "Votre adresse email pour la confirmation ?",
    type: "email",
    placeholder: "jean@exemple.fr",
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

export default function BookingWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [currentValue, setCurrentValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [waUrl, setWaUrl] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const step = steps[currentStep];
  const progress = ((currentStep) / steps.length) * 100;
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
      submit(newAnswers);
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

  const submit = async (finalAnswers: Answers) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: finalAnswers.service,
          name: finalAnswers.name,
          email: finalAnswers.email,
          phone: finalAnswers.phone,
          date: finalAnswers.date,
          passengers: finalAnswers.passengers,
          departure: finalAnswers.departure,
          destination: finalAnswers.destination,
          message: finalAnswers.message,
        }),
      });
      const data = await res.json();
      // Accept both success:true and HTTP 200 (email may have failed but waUrl is always returned)
      if (!res.ok && !data.waUrl) throw new Error(data.error || "Erreur inattendue.");
      const url = data.waUrl ?? "";
      setWaUrl(url);
      setEmailSent(data.emailSent ?? false);
      setDone(true);
      // Auto-open WhatsApp immediately on success
      if (url) {
        setTimeout(() => window.open(url, "_blank"), 800);
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erreur inattendue. Appelez-nous directement.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="flex flex-col items-center text-center py-10 px-4">
        <div className="w-16 h-16 bg-[#C9A96E]/10 flex items-center justify-center mb-6">
          <Check size={32} className="text-[#C9A96E]" />
        </div>
        <h3 className="text-white text-2xl font-bold mb-3">Demande envoyée !</h3>
        <p className="text-white/60 mb-2 max-w-sm">
          WhatsApp s'est ouvert automatiquement avec votre demande.
          {emailSent
            ? " Un email de confirmation vous a également été envoyé."
            : " Nous vous répondons dans les 2 heures."}
        </p>
        <p className="text-white/40 text-xs mb-8 max-w-sm">
          Si WhatsApp ne s'est pas ouvert, cliquez sur le bouton ci-dessous.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          {waUrl && (
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold px-8 py-4 text-sm uppercase tracking-widest hover:bg-[#1ebe5d] transition-all"
            >
              <MessageCircle size={18} />
              Confirmer par WhatsApp
            </a>
          )}
          <a
            href="tel:+33787248691"
            className="flex items-center justify-center gap-2 border-2 border-white/20 text-white font-semibold px-8 py-4 text-sm uppercase tracking-widest hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all"
          >
            <Phone size={18} />
            Appeler directement
          </a>
        </div>
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

      {error && (
        <p className="text-red-400 text-sm mb-4">{error}</p>
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
            disabled={loading || (step.required && !currentValue.trim())}
            className="flex items-center gap-2 bg-[#C9A96E] text-[#0B1F3A] font-bold px-8 py-4 text-sm uppercase tracking-widest hover:bg-[#E8C98A] transition-all disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
          >
            {loading ? (
              <><Loader2 size={16} className="animate-spin" /> Envoi…</>
            ) : isLast ? (
              <><Check size={16} /> Envoyer ma demande</>
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
