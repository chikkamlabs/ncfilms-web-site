"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  ArrowRight,
  Camera,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ContactModal } from "./contactCard";
import {
  type HeroSlide,
  resolveHeroSlides,
  getNextHeroSlideIndex,
  getPrevHeroSlideIndex,
} from "@/lib/herosectionStore";

export type { HeroSlide };

interface HeroSectionProps {
  images?: HeroSlide[];
  services?: string[];
  onGetQuote?: () => void;
}

export default function HeroSection({
  images,
  services,
  onGetQuote,
}: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  const backgroundImages = resolveHeroSlides(images);

  const slideCount = backgroundImages.length;

  useEffect(() => {
    if (slideCount <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => getNextHeroSlideIndex(prev, slideCount));
    }, 6000);
    return () => clearInterval(timer);
  }, [slideCount]);

  const safeIndex = currentSlide % slideCount;
  const activeSlide = backgroundImages[safeIndex];

  const handleNext = () => {
    setCurrentSlide((prev) => getNextHeroSlideIndex(prev, slideCount));
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => getPrevHeroSlideIndex(prev, slideCount));
  };

  return (
    <>
      <section
        id="home"
        className="relative min-h-[540px] sm:min-h-[600px] lg:h-screen lg:min-h-[750px] w-full bg-jet-black overflow-hidden flex flex-col justify-center pt-20 pb-10 sm:pt-24 sm:pb-12 lg:pt-28 lg:pb-12 border-b border-jet-black"
      >
      {/* 1. Background Slideshow Layer with slightly decreased opacity for text legibility */}
      <div
        className="absolute inset-0 z-0 select-none overflow-hidden"
        id="hero-background-slider"
      >
        <AnimatePresence mode="popLayout">
          {backgroundImages.map((slide, index) => {
            if (index !== safeIndex) return null;
            return (
              <motion.div
                key={`${slide.url}-${index}`}
                initial={{ opacity: 0, scale: 1.08, x: 16 }}
                animate={{ opacity: 0.72, scale: 1.02, x: 0 }}
                exit={{ opacity: 0, scale: 1, x: -16 }}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full"
                id={`bg-slide-${index}`}
              >
                <img
                  src={slide.url}
                  alt={slide.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-jet-black/80 via-transparent to-jet-black/35" />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* 2. Light-Touch Black Edge & Bottom Overlays (not heavy, keeps photo vivid) */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-jet-black/65 via-jet-black/20 to-jet-black/35 z-10 pointer-events-none"
        id="edge-gradient-overlay"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40 sm:h-48 lg:h-56 bg-gradient-to-t from-jet-black via-jet-black/40 to-transparent z-10 pointer-events-none"
        id="bottom-gradient-overlay"
      />

      {/* 3. Main Hero Content Area */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full relative z-20 flex items-center my-auto py-3 sm:py-5 lg:py-8"
        id="hero-main-container"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 w-full items-center">
          {/* Left Text Block */}
          <div
            className="lg:col-span-7 flex flex-col items-start text-left"
            id="hero-left-content"
          >
            {/* Slider Tagline */}
            <div className="h-5 sm:h-6 overflow-hidden mb-2 sm:mb-3" id="hero-sliding-tag">
              <AnimatePresence mode="wait">
                <motion.span
                  key={safeIndex}
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -16, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.22em] sm:tracking-[0.3em] text-champagne-beige block uppercase"
                >
                  {activeSlide.tag}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-soft-white font-bold tracking-tight leading-[1.12] mb-3 sm:mb-4 lg:mb-6 [text-shadow:0_2px_16px_rgba(11,11,11,0.55)]"
              id="hero-heading"
            >
              Capturing Moments,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-soft-white via-warm-grey to-champagne-beige">
                Creating Timeless Memories
              </span>
            </motion.h1>

            {/* Subtext description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xs sm:text-sm lg:text-base text-warm-grey font-sans font-light leading-relaxed max-w-lg lg:max-w-2xl mb-5 sm:mb-6 lg:mb-8 [text-shadow:0_1px_10px_rgba(11,11,11,0.55)]"
              id="hero-subheading"
            >
              Professional wedding photography and cinematic videography crafted
              meticulously to preserve every emotion, genuine glance, and
              unforgettable celebration.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-row flex-wrap gap-3 sm:gap-4 w-full sm:w-auto"
              id="hero-buttons-container"
            >
              <button
                type="button"
                onClick={() => {
                  setQuoteModalOpen(true);
                  if (onGetQuote) onGetQuote();
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-7 sm:py-3.5 bg-champagne-beige hover:bg-champagne-beige/90 text-jet-black text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-sm shadow-[0_10px_25px_rgba(11,11,11,0.4)] group cursor-pointer whitespace-nowrap shrink-0"
                id="hero-cta-quote"
              >
                Get Quote
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-jet-black transition-transform duration-300 group-hover:rotate-12" />
              </button>
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-7 sm:py-3.5 bg-jet-black/40 hover:bg-jet-black/65 border border-stone-grey/35 hover:border-champagne-beige text-soft-white hover:text-champagne-beige text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-sm backdrop-blur-[2px] group whitespace-nowrap shrink-0"
                id="hero-cta-services"
              >
                View Services
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </motion.div>
          </div>

          {/* Right Showcase Card */}
          <div
            className="lg:col-span-5 relative w-full h-[210px] sm:h-[260px] md:h-[320px] lg:h-[420px] flex items-center justify-center mt-1 lg:mt-0"
            id="hero-right-composition"
          >
            <div className="relative w-full h-full max-w-md lg:max-w-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={safeIndex}
                  initial={{ opacity: 0, scale: 0.94, rotate: 1.5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.94, rotate: -1.5 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute inset-0 rounded-sm overflow-hidden border border-champagne-beige/30 shadow-[0_20px_50px_rgba(11,11,11,0.55)] bg-jet-black/60 p-[3px]"
                  id="right-showcase-slide"
                >
                  <div className="relative w-full h-full rounded-sm overflow-hidden bg-jet-black border border-jet-black">
                    <img
                      src={activeSlide.url}
                      alt={activeSlide.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-jet-black via-jet-black/45 to-transparent" />

                    {/* Caption Overlays */}
                    <div className="absolute bottom-3.5 sm:bottom-5 left-3.5 sm:left-5 right-3.5 sm:right-5 flex justify-between items-end gap-3">
                      <div className="min-w-0">
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-champagne-beige block">
                          Featured Work
                        </span>
                        <h3 className="text-sm sm:text-lg font-serif font-semibold text-soft-white tracking-wide mt-0.5 truncate">
                          {activeSlide.title}
                        </h3>
                        <p className="text-[10px] sm:text-[11px] text-stone-grey font-mono mt-0.5 truncate">
                          {activeSlide.subtitle}
                        </p>
                      </div>
                      <div className="p-2 bg-champagne-beige rounded-sm shadow-md flex items-center justify-center shrink-0">
                        <Camera className="w-4 h-4 text-jet-black" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Manual navigation controls */}
              {slideCount > 1 && (
                <div
                  className="absolute -bottom-4 right-0 flex items-center gap-2 z-30"
                  id="manual-slider-arrows"
                >
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="p-2 rounded-sm bg-jet-black/80 border border-stone-grey/25 text-soft-white hover:text-champagne-beige hover:border-champagne-beige/60 transition-all duration-200 shadow-sm cursor-pointer"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="p-2 rounded-sm bg-jet-black/80 border border-stone-grey/25 text-soft-white hover:text-champagne-beige hover:border-champagne-beige/60 transition-all duration-200 shadow-sm cursor-pointer"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      </section>

      <ContactModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        services={services}
      />
    </>
  );
}
