"use client";

import { motion } from "motion/react";
import TestimonialCard from "./testimonialCard";
import {
  FALLBACK_TESTIMONIALS,
  buildTestimonialMarqueeTrack,
  getActiveTestimonials,
  resolveTestimonials,
  type TestimonialCardItem,
} from "@/lib/testimonialsStore";

interface TestimonialsProps {
  testimonials?: TestimonialCardItem[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const activeTestimonials = resolveTestimonials(
    testimonials && testimonials.length > 0
      ? testimonials
      : getActiveTestimonials(FALLBACK_TESTIMONIALS)
  );
  const marqueeTrack = buildTestimonialMarqueeTrack(activeTestimonials);
  const durationSeconds = Math.max(28, (marqueeTrack.length / 3) * 8);

  return (
    <section
      id="testimonials"
      className="py-16 sm:py-20 lg:py-24 bg-soft-white text-charcoal border-t border-warm-grey overflow-hidden relative"
    >
      {/* Scroll-Animated Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mb-12 sm:mb-14 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="text-xs font-mono text-champagne-beige tracking-[0.28em] uppercase block mb-3">
            The Proof
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-serif font-bold text-charcoal tracking-tight leading-tight text-balance">
            Our Testimonials
          </h2>
          <p className="text-sm sm:text-base text-muted-grey mt-4 leading-relaxed">
            Heartfelt words from couples and families whose milestones we had
            the privilege to preserve.
          </p>
        </motion.div>
      </div>

      {/* Horizontal Moving Testimonial Cards */}
      {marqueeTrack.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full"
        >
          <div className="flex w-full overflow-hidden select-none py-2">
            <motion.div
              className="flex gap-5 sm:gap-7 w-max flex-shrink-0 items-stretch"
              animate={{ x: ["0%", "-33.3333%"] }}
              transition={{
                ease: "linear",
                duration: durationSeconds,
                repeat: Infinity,
              }}
            >
              {marqueeTrack.map((testimonial, idx) => (
                <TestimonialCard
                  key={`${testimonial._id}-${idx}`}
                  testimonial={testimonial}
                />
              ))}
            </motion.div>
          </div>

          {/* Gradient Fade Overlays on Left & Right Sides */}
          <div className="absolute inset-y-0 left-0 w-12 sm:w-20 md:w-32 bg-gradient-to-r from-soft-white to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 sm:w-20 md:w-32 bg-gradient-to-l from-soft-white to-transparent z-20 pointer-events-none" />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl mx-auto px-4 text-center"
        >
          <p className="py-10 px-6 bg-pure-white border border-stone-grey/50 rounded-sm text-sm text-muted-grey">
            Client stories and testimonials will appear here once published.
          </p>
        </motion.div>
      )}
    </section>
  );
}
