"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import TeamMemberCard from "./teammeberCard";
import {
  getTopTeamMembers,
  type TeamMemberCardItem,
} from "@/lib/teamMemberStore";

interface OurTeamProps {
  members: TeamMemberCardItem[];
}

export default function OurTeam({ members }: OurTeamProps) {
  const topMembers = getTopTeamMembers(members, 3);

  return (
    <section
      id="our-team"
      className="bg-soft-white text-charcoal py-16 sm:py-20 lg:py-28 border-t border-warm-grey overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Scroll-Animated Section Intro */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-14 lg:mb-16"
        >
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 mb-3"
            >
              <span className="text-xs font-mono text-champagne-beige tracking-[0.28em] uppercase">
                Dedicated &amp; Passionate Craftspeople
              </span>
              <motion.span
                aria-hidden="true"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="h-[1px] w-12 bg-champagne-beige/70 origin-left"
              />
            </motion.div>

            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-serif font-bold text-charcoal tracking-tight leading-tight text-balance">
              Our Team
            </h2>

            <p className="mt-4 text-sm sm:text-base text-muted-grey leading-relaxed">
              Behind every timeless frame is a dedicated and passionate team of
              visual storytellers, cinematographers, and editors who pour heart,
              patience, and quiet artistry into preserving the fleeting emotions
              of your celebration.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="shrink-0"
          >
            <Link
              href="/teammebers"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-charcoal hover:bg-champagne-beige text-pure-white hover:text-charcoal text-xs font-semibold uppercase tracking-widest rounded-sm transition-colors duration-200 whitespace-nowrap group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-beige"
            >
              See Our Full Team
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Top 3 Active Team Members Ordered by Display Order */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {topMembers.map((member, index) => (
            <TeamMemberCard
              key={member._id}
              member={member}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
