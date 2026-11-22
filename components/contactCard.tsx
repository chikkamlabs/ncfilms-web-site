"use client";

import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Send, X } from "lucide-react";

const DEFAULT_SERVICES = [
  "Wedding Cinematography",
  "Candid Wedding Photography",
  "Pre-Wedding & Editorial Portraits",
];

const BUDGET_RANGES = [
  "₹50,000 – ₹1,00,000",
  "₹1,00,000 – ₹2,00,000",
  "₹2,00,000 – ₹3,50,000",
  "₹3,50,000 – ₹5,00,000",
  "₹5,00,000+",
];

const WHATSAPP_NUMBER = "918886427192";

interface ContactCardProps {
  services?: string[];
  defaultService?: string;
  onClose?: () => void;
}

export default function ContactCard({
  services,
  defaultService,
  onClose,
}: ContactCardProps) {
  const baseServices =
    services && services.length > 0 ? services : DEFAULT_SERVICES;

  const cleanedDefault = defaultService?.trim();

  const serviceOptions = Array.from(
    new Set([
      ...(cleanedDefault ? [cleanedDefault] : []),
      ...baseServices.map((s) => s.trim()).filter(Boolean),
      "Others",
    ])
  );

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [selectedService, setSelectedService] = useState(
    cleanedDefault || serviceOptions[0] || "Others"
  );
  const [budget, setBudget] = useState(BUDGET_RANGES[0]);
  const [notes, setNotes] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedUrl, setSubmittedUrl] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedName = name.trim();
    const trimmedMobile = mobile.trim();
    const trimmedCity = city.trim();
    const trimmedNotes = notes.trim();

    if (!trimmedName || !trimmedMobile || !trimmedCity) {
      setErrorMessage("Please fill in your name, mobile number, and city.");
      return;
    }

    const formattedMessage = [
      "Hello NC Films,",
      "",
      "I would like to enquire about your photography & cinema services:",
      "",
      `• Name: ${trimmedName}`,
      `• Mobile: ${trimmedMobile}`,
      `• City: ${trimmedCity}`,
      `• Service: ${selectedService}`,
      `• Budget Range: ${budget}`,
      `• Notes: ${trimmedNotes || "No additional notes provided"}`,
      "",
      "Looking forward to hearing from you.",
    ].join("\n");

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      formattedMessage
    )}`;

    setSubmittedUrl(whatsappUrl);

    const link = document.createElement("a");
    link.href = whatsappUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="relative bg-pure-white text-charcoal border border-stone-grey/55 rounded-sm shadow-lg p-6 sm:p-8"
    >
      {/* Card Header */}
      <div className="flex items-start justify-between gap-4 pb-5 mb-6 border-b border-warm-grey">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.22em] text-champagne-beige block mb-1.5">
            Direct Enquiry
          </span>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-charcoal tracking-tight">
            Request a Custom Quote
          </h3>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close quote form"
            className="w-10 h-10 rounded-sm border border-stone-grey/50 bg-soft-white hover:bg-charcoal hover:text-pure-white hover:border-charcoal text-charcoal flex items-center justify-center transition-colors duration-200 shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-beige"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Name & Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="enquiry-name"
              className="block text-xs font-mono uppercase tracking-[0.16em] text-charcoal mb-2"
            >
              Name <span className="text-champagne-beige">*</span>
            </label>
            <input
              id="enquiry-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className="w-full px-3.5 py-2.5 bg-soft-white border border-stone-grey/60 rounded-sm text-sm text-charcoal placeholder:text-muted-grey/70 focus:outline-none focus:border-champagne-beige focus:bg-pure-white transition-colors duration-200"
            />
          </div>

          <div>
            <label
              htmlFor="enquiry-mobile"
              className="block text-xs font-mono uppercase tracking-[0.16em] text-charcoal mb-2"
            >
              Mobile <span className="text-champagne-beige">*</span>
            </label>
            <input
              id="enquiry-mobile"
              type="tel"
              required
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="10-digit mobile number"
              className="w-full px-3.5 py-2.5 bg-soft-white border border-stone-grey/60 rounded-sm text-sm text-charcoal placeholder:text-muted-grey/70 tabular-nums focus:outline-none focus:border-champagne-beige focus:bg-pure-white transition-colors duration-200"
            />
          </div>
        </div>

        {/* City & Service */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="enquiry-city"
              className="block text-xs font-mono uppercase tracking-[0.16em] text-charcoal mb-2"
            >
              City <span className="text-champagne-beige">*</span>
            </label>
            <input
              id="enquiry-city"
              type="text"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Event city or destination"
              className="w-full px-3.5 py-2.5 bg-soft-white border border-stone-grey/60 rounded-sm text-sm text-charcoal placeholder:text-muted-grey/70 focus:outline-none focus:border-champagne-beige focus:bg-pure-white transition-colors duration-200"
            />
          </div>

          <div>
            <label
              htmlFor="enquiry-service"
              className="block text-xs font-mono uppercase tracking-[0.16em] text-charcoal mb-2"
            >
              Service <span className="text-champagne-beige">*</span>
            </label>
            <select
              id="enquiry-service"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-soft-white border border-stone-grey/60 rounded-sm text-sm text-charcoal focus:outline-none focus:border-champagne-beige focus:bg-pure-white transition-colors duration-200 cursor-pointer"
            >
              {serviceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Budget Dropdown (5 Ranges) */}
        <div>
          <label
            htmlFor="enquiry-budget"
            className="block text-xs font-mono uppercase tracking-[0.16em] text-charcoal mb-2"
          >
            Budget <span className="text-champagne-beige">*</span>
          </label>
          <select
            id="enquiry-budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-soft-white border border-stone-grey/60 rounded-sm text-sm text-charcoal tabular-nums focus:outline-none focus:border-champagne-beige focus:bg-pure-white transition-colors duration-200 cursor-pointer"
          >
            {BUDGET_RANGES.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>

        {/* Notes */}
        <div>
          <label
            htmlFor="enquiry-notes"
            className="block text-xs font-mono uppercase tracking-[0.16em] text-charcoal mb-2"
          >
            Notes
          </label>
          <textarea
            id="enquiry-notes"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Share your celebration dates, venue, or vision..."
            className="w-full px-3.5 py-2.5 bg-soft-white border border-stone-grey/60 rounded-sm text-sm text-charcoal placeholder:text-muted-grey/70 resize-none focus:outline-none focus:border-champagne-beige focus:bg-pure-white transition-colors duration-200"
          />
        </div>

        {errorMessage && (
          <p
            role="alert"
            className="text-xs font-medium text-red-700 bg-red-50 border border-red-200 px-3.5 py-2.5 rounded-sm"
          >
            {errorMessage}
          </p>
        )}

        {/* Submit Button */}
        <div className="pt-1 space-y-2.5">
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 bg-charcoal hover:bg-champagne-beige text-pure-white hover:text-charcoal text-xs font-semibold uppercase tracking-widest rounded-sm transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-beige"
          >
            <Send className="w-4 h-4" />
            Send Enquiry
          </button>

          {submittedUrl && (
            <p className="text-xs text-muted-grey text-center">
              Opening WhatsApp —{" "}
              <a
                href={submittedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-charcoal underline underline-offset-4 hover:text-champagne-beige transition-colors duration-200"
              >
                tap here if it didn&apos;t redirect
              </a>
              .
            </p>
          )}
        </div>
      </form>
    </motion.div>
  );
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  services?: string[];
  defaultService?: string;
}

export function ContactModal({
  isOpen,
  onClose,
  services,
  defaultService,
}: ContactModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Request a Custom Quote"
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-jet-black/75 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl my-auto"
          >
            <ContactCard
              services={services}
              defaultService={defaultService}
              onClose={onClose}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
