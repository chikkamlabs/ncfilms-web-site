"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { User, ArrowUpRight, X } from "lucide-react";
import {
  type TeamMemberCardItem,
  formatTeamDisplayOrder,
} from "@/lib/teamMemberStore";

export type { TeamMemberCardItem };

interface TeamMemberCardProps {
  member: TeamMemberCardItem;
  index?: number;
}

export default function TeamMemberCard({
  member,
  index = 0,
}: TeamMemberCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imgError, setImgError] = useState(false);

  if (member.isActive !== true) {
    return null;
  }

  const displayOrder = formatTeamDisplayOrder(member.order, index);

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        delay: Math.min(index * 0.1, 0.35),
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className="group relative flex flex-col bg-jet-black rounded-sm overflow-hidden border border-stone-grey/35 hover:border-champagne-beige/80 transition-colors duration-300 shadow-sm hover:shadow-xl"
    >
      {/* Creative Editorial Portrait Frame */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-charcoal">
        {member.image && !imgError ? (
          <motion.img
            src={member.image}
            alt={member.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            animate={{
              scale: isExpanded ? 1.07 : 1,
            }}
            transition={{
              duration: 0.65,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="w-full h-full object-cover object-top will-change-transform"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-charcoal text-stone-grey px-6 text-center">
            <User className="w-10 h-10 text-champagne-beige/80" />
            <span className="text-sm font-serif text-pure-white">
              {member.name}
            </span>
          </div>
        )}

        {/* Top Scrim for Editorial Index & Action Cue */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-jet-black/70 via-jet-black/25 to-transparent" />

        {/* Display Order (Unboxed Editorial Numerals) */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2.5 text-pure-white">
          <span className="text-xs font-mono tabular-nums tracking-[0.22em] text-champagne-beige font-semibold">
            {displayOrder}
          </span>
          <span
            aria-hidden="true"
            className="h-[1px] w-6 bg-champagne-beige/60 transition-transform duration-300 origin-left group-hover:scale-x-150"
          />
        </div>

        {/* Interactive Story Toggle Button (Accessible on Touch & Keyboard) */}
        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          aria-expanded={isExpanded}
          aria-label={
            isExpanded
              ? `Hide bio for ${member.name}`
              : `Read bio for ${member.name}`
          }
          className="absolute top-3 right-3 z-30 w-10 h-10 rounded-sm bg-jet-black/55 hover:bg-champagne-beige text-pure-white hover:text-jet-black border border-pure-white/20 hover:border-champagne-beige backdrop-blur-sm flex items-center justify-center transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-beige"
        >
          {isExpanded ? (
            <X className="w-4 h-4" />
          ) : (
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          )}
        </button>

        {/* Animated Architectural Corner Frame Accent */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-3 border border-champagne-beige/0 group-hover:border-champagne-beige/35 transition-colors duration-500 z-10"
        />

        {/* Resting Identity Overlay */}
        <motion.div
          animate={{
            opacity: isExpanded ? 0 : 1,
            y: isExpanded ? 12 : 0,
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 pt-24 pb-5 px-5 sm:px-6 bg-gradient-to-t from-jet-black/95 via-jet-black/65 to-transparent"
        >
          {member.role && (
            <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-champagne-beige mb-1.5">
              {member.role}
            </p>
          )}
          <h3 className="text-xl sm:text-2xl font-serif font-semibold text-pure-white tracking-tight leading-snug">
            {member.name}
          </h3>
        </motion.div>

        {/* Sliding Velvet Glass Curtain for Full Bio on Hover / Toggle */}
        <motion.div
          initial={false}
          animate={{
            opacity: isExpanded ? 1 : 0,
            y: isExpanded ? "0%" : "100%",
          }}
          transition={{
            duration: 0.42,
            ease: [0.16, 1, 0.3, 1],
          }}
          aria-hidden={!isExpanded}
          className={`absolute inset-x-0 bottom-0 z-20 p-5 sm:p-6 bg-jet-black/88 backdrop-blur-md border-t border-champagne-beige/35 flex flex-col justify-end max-h-[82%] ${
            isExpanded ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-champagne-beige">
            <span className="tabular-nums">{displayOrder}</span>
            {member.role && (
              <>
                <span aria-hidden="true">·</span>
                <span>{member.role}</span>
              </>
            )}
          </div>

          <h3 className="mt-1.5 text-xl sm:text-2xl font-serif font-semibold text-pure-white tracking-tight leading-snug">
            {member.name}
          </h3>

          <div
            aria-hidden="true"
            className="mt-3 mb-3 h-[1px] w-12 bg-champagne-beige/70"
          />

          {member.description && (
            <p className="text-xs sm:text-sm text-soft-white/90 leading-relaxed overflow-y-auto">
              {member.description}
            </p>
          )}
        </motion.div>
      </div>

      {/* Bottom Champagne Aperture Progress Bar */}
      <div className="h-[2px] w-full bg-charcoal relative overflow-hidden">
        <motion.div
          animate={{
            scaleX: isExpanded ? 1 : 0.18,
          }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="h-full w-full bg-champagne-beige origin-left will-change-transform"
        />
      </div>
    </motion.article>
  );
}
