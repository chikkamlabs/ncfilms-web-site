"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, CheckSquare } from "lucide-react";
import { ContactModal } from "./contactCard";
import { resolveScrollingMediaRows } from "@/lib/whychooseus";

interface WhyChooseUsProps {
  row1Images?: string[];
  row2Images?: string[];
  services?: string[];
}

const REASONS = [
  {
    title: "Cinema-Grade 4K Production",
    detail:
      "Full-frame cinema cameras, prime lenses, and bespoke color grading for rich, filmic depth.",
  },
  {
    title: "Unscripted Emotional Storytelling",
    detail:
      "We blend unobtrusively into every ritual to capture genuine laughter, tears, and quiet glances.",
  },
  {
    title: "Dedicated Multi-Camera Crew",
    detail:
      "Coordinated photographers, cinematographers, and licensed drone pilots covering every angle.",
  },
  {
    title: "Curated Heirloom Delivery",
    detail:
      "Thoughtfully edited highlight films, full galleries, and archival albums delivered right on schedule.",
  },
  {
    title: "Tailored Pre-Shoot Planning",
    detail:
      "Collaborative timeline, lighting, and location guidance so every celebration unfolds effortlessly.",
  },
  {
    title: "Destination-Ready Craftsmanship",
    detail:
      "Trusted by couples across Hyderabad, Udaipur, Jaipur, Goa, and international destinations.",
  },
];

export default function WhyChooseUs({
  row1Images,
  row2Images,
  services,
}: WhyChooseUsProps) {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [activeReasonIndex, setActiveReasonIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveReasonIndex((prev) => (prev + 1) % REASONS.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const currentReason = REASONS[activeReasonIndex];

  const { duplicatedRow1, duplicatedRow2 } = resolveScrollingMediaRows(
    row1Images,
    row2Images
  );

  return (
    <>
      <section
        id="why-choose-us"
        className="py-16 sm:py-20 lg:py-24 bg-pure-white text-charcoal border-t border-warm-grey overflow-hidden relative"
      >
      {/* Header & Reasons Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mb-12 sm:mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="text-xs font-mono text-champagne-beige tracking-[0.28em] uppercase block mb-3">
            The NC Films Standard
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-serif font-bold text-charcoal tracking-tight leading-tight text-balance">
            Why Choose Us
          </h2>
          <p className="text-sm sm:text-base text-muted-grey mt-4 leading-relaxed">
            Every celebration deserves more than posed photographs—it deserves a
            devoted creative team committed to preserving authentic atmosphere,
            craftsmanship, and timeless emotion.
          </p>
        </motion.div>

        {/* Mobile: One After One with Basic Transition */}
        <div className="mt-10 sm:hidden">
          <div className="min-h-[132px] flex flex-col justify-between p-5 bg-soft-white border border-stone-grey/45 rounded-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentReason.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-start gap-3.5"
              >
                <div className="w-8 h-8 rounded-sm bg-champagne-beige/15 border border-champagne-beige/40 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckSquare className="w-4 h-4 text-champagne-beige" />
                </div>
                <div>
                  <h3 className="text-base font-serif font-semibold text-charcoal leading-snug">
                    {currentReason.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-muted-grey leading-relaxed">
                    {currentReason.detail}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-4 pt-3 border-t border-warm-grey flex items-center justify-between gap-3">
              <span className="text-[11px] font-mono text-muted-grey tabular-nums">
                {String(activeReasonIndex + 1).padStart(2, "0")} /{" "}
                {String(REASONS.length).padStart(2, "0")}
              </span>
              <div className="flex items-center gap-1.5">
                {REASONS.map((reason, idx) => (
                  <button
                    key={reason.title}
                    type="button"
                    aria-label={`Show point ${idx + 1}`}
                    onClick={() => setActiveReasonIndex(idx)}
                    className={`h-1.5 rounded-sm transition-all duration-200 cursor-pointer ${
                      idx === activeReasonIndex
                        ? "w-5 bg-champagne-beige"
                        : "w-2 bg-stone-grey/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tablet & Desktop: Full Grid */}
        <div className="mt-12 hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {REASONS.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.55,
                delay: Math.min(index * 0.07, 0.35),
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex items-start gap-3.5 p-5 bg-soft-white border border-stone-grey/45 rounded-sm hover:border-champagne-beige transition-colors duration-200"
            >
              <div className="w-8 h-8 rounded-sm bg-champagne-beige/15 border border-champagne-beige/40 flex items-center justify-center shrink-0 mt-0.5">
                <CheckSquare className="w-4 h-4 text-champagne-beige" />
              </div>
              <div>
                <h3 className="text-base font-serif font-semibold text-charcoal leading-snug">
                  {reason.title}
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-muted-grey leading-relaxed">
                  {reason.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Infinite Scrolling Gallery Rows Container */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-6 sm:space-y-8 relative z-10 w-full"
      >
        {/* ROW 1: Auto Scrolling Left */}
        <div className="flex w-full overflow-hidden select-none">
          <motion.div
            className="flex gap-4 sm:gap-6 w-max flex-shrink-0"
            animate={{ x: ["0%", "-33.3333%"] }}
            transition={{
              ease: "linear",
              duration: 35,
              repeat: Infinity,
            }}
          >
            {duplicatedRow1.map((imgSrc, idx) => (
              <div
                key={`row1-${idx}`}
                className="w-64 sm:w-72 md:w-96 aspect-[3/2] rounded-sm overflow-hidden border border-stone-grey/45 shadow-md relative group bg-warm-grey flex-shrink-0"
              >
                <img
                  src={imgSrc}
                  alt="NC Films Highlight"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  id={`scrolling-row1-${idx}`}
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* ROW 2: Auto Scrolling Right */}
        <div className="flex w-full overflow-hidden select-none">
          <motion.div
            className="flex gap-4 sm:gap-6 w-max flex-shrink-0"
            animate={{ x: ["-33.3333%", "0%"] }}
            transition={{
              ease: "linear",
              duration: 35,
              repeat: Infinity,
            }}
          >
            {duplicatedRow2.map((imgSrc, idx) => (
              <div
                key={`row2-${idx}`}
                className="w-64 sm:w-72 md:w-96 aspect-[3/2] rounded-sm overflow-hidden border border-stone-grey/45 shadow-md relative group bg-warm-grey flex-shrink-0"
              >
                <img
                  src={imgSrc}
                  alt="NC Films Highlight"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  id={`scrolling-row2-${idx}`}
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Gradient Fade Overlays on Left & Right Sides */}
        <div className="absolute inset-y-0 left-0 w-12 sm:w-20 md:w-32 bg-gradient-to-r from-pure-white to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-12 sm:w-20 md:w-32 bg-gradient-to-l from-pure-white to-transparent z-20 pointer-events-none" />
      </motion.div>

      {/* Post-Gallery Call To Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mt-12 sm:mt-14 text-center relative z-10"
      >
        <p className="text-xl sm:text-2xl lg:text-3xl font-serif font-semibold text-charcoal tracking-tight text-balance">
          For your Forever memories
        </p>
        <div className="mt-5">
          <button
            type="button"
            onClick={() => setQuoteModalOpen(true)}
            className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-charcoal hover:bg-champagne-beige text-pure-white hover:text-charcoal text-xs font-semibold uppercase tracking-widest rounded-sm transition-colors duration-200 whitespace-nowrap group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-beige"
          >
            Choose us
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>
      </motion.div>
    </section>

      <ContactModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        services={services}
      />
    </>
  );
}
