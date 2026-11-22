"use client";

import { useState } from "react";
import { Quote, User } from "lucide-react";
import type { TestimonialCardItem } from "@/lib/testimonialsStore";

interface TestimonialCardProps {
  testimonial: TestimonialCardItem;
}

export default function TestimonialCard({
  testimonial,
}: TestimonialCardProps) {
  const [imgError, setImgError] = useState(false);

  if (testimonial.isActive !== true) {
    return null;
  }

  return (
    <article className="w-[310px] sm:w-[370px] lg:w-[420px] shrink-0 flex flex-col justify-between p-6 sm:p-7 bg-pure-white border border-stone-grey/50 hover:border-champagne-beige rounded-sm shadow-sm transition-colors duration-300">
      <div>
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="w-9 h-9 rounded-sm bg-champagne-beige/15 border border-champagne-beige/40 flex items-center justify-center shrink-0">
            <Quote className="w-4 h-4 text-champagne-beige" />
          </div>

          {(testimonial.serviceTitle || testimonial.tag) && (
            <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.16em] text-muted-grey truncate">
              {testimonial.serviceTitle && (
                <span className="truncate">{testimonial.serviceTitle}</span>
              )}
              {testimonial.serviceTitle && testimonial.tag && (
                <span aria-hidden="true">·</span>
              )}
              {testimonial.tag && (
                <span className="text-champagne-beige shrink-0">
                  {testimonial.tag}
                </span>
              )}
            </div>
          )}
        </div>

        <p className="text-sm sm:text-base text-charcoal/90 leading-relaxed line-clamp-5">
          &ldquo;{testimonial.review}&rdquo;
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-warm-grey flex items-center gap-3.5">
        <div className="w-11 h-11 rounded-full overflow-hidden border border-stone-grey/50 bg-soft-white flex items-center justify-center shrink-0">
          {testimonial.image && !imgError ? (
            <img
              src={testimonial.image}
              alt={testimonial.clientName}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-5 h-5 text-champagne-beige" />
          )}
        </div>

        <div className="min-w-0">
          <h3 className="text-base font-serif font-semibold text-charcoal truncate">
            {testimonial.clientName}
          </h3>
          {testimonial.serviceTitle && (
            <p className="text-xs text-muted-grey truncate">
              {testimonial.serviceTitle}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
