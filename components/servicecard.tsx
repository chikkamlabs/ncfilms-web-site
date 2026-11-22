"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Camera } from "lucide-react";
import { ContactModal } from "./contactCard";
import {
  type ServiceCardItem,
  getValidServiceTags,
} from "@/lib/servicesStore";

export type { ServiceCardItem };

interface ServiceCardProps {
  service: ServiceCardItem;
  allServices?: string[];
}

export default function ServiceCard({ service, allServices }: ServiceCardProps) {
  const [tagIndex, setTagIndex] = useState(0);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);

  const tags = getValidServiceTags(service.tags);

  useEffect(() => {
    if (tags.length <= 1) return;
    const timer = setInterval(() => {
      setTagIndex((prev) => (prev + 1) % tags.length);
    }, 2600);
    return () => clearInterval(timer);
  }, [tags.length]);

  if (service.isActive !== true) {
    return null;
  }

  const firstImage = service.images?.[0];
  const currentTag = tags.length > 0 ? tags[tagIndex % tags.length] : null;

  return (
    <>
      <Link
        href={`/service?id=${encodeURIComponent(service._id)}`}
        className="group flex flex-col h-full bg-pure-white border border-stone-grey/50 hover:border-champagne-beige rounded-sm overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-beige"
      >
      {/* Image Container (First Image) */}
      <div className="relative aspect-[4/3] w-full bg-warm-grey overflow-hidden">
        {firstImage ? (
          <img
            src={firstImage}
            alt={service.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-warm-grey text-muted-grey">
            <Camera className="w-7 h-7 text-champagne-beige" />
            <span className="text-xs font-mono uppercase tracking-wider">
              {service.title}
            </span>
          </div>
        )}

        {/* Top-Right Rotating Tag (One After Another) */}
        {currentTag && (
          <div className="absolute top-3 right-3 z-10 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={`${service._id}-${currentTag}`}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block px-2.5 py-1 bg-pure-white/95 backdrop-blur-sm border border-stone-grey/40 text-charcoal text-[11px] font-mono uppercase tracking-wider rounded-sm shadow-sm whitespace-nowrap"
              >
                {currentTag}
              </motion.span>
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <h3 className="text-xl font-serif font-semibold text-charcoal group-hover:text-champagne-beige transition-colors duration-200 leading-snug">
          {service.title}
        </h3>

        {typeof service.count === "number" && (
          <p className="mt-1.5 text-sm font-mono font-semibold text-champagne-beige tabular-nums">
            {service.count}+
          </p>
        )}

        {service.description && (
          <p className="mt-2.5 text-sm text-muted-grey leading-relaxed line-clamp-3 flex-1">
            {service.description}
          </p>
        )}

        {/* Enquiry Button */}
        <div className="mt-5 pt-4 border-t border-warm-grey">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setEnquiryModalOpen(true);
            }}
            className="w-full py-2.5 px-4 bg-charcoal hover:bg-champagne-beige text-pure-white hover:text-charcoal text-xs font-semibold uppercase tracking-widest rounded-sm transition-colors duration-200 cursor-pointer"
          >
            Enquiry
          </button>
        </div>
      </div>
      </Link>

      <ContactModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        services={allServices}
        defaultService={service.title}
      />
    </>
  );
}
