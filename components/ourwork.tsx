"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Film } from "lucide-react";
import ProjectCard from "./projectCard";
import { getTopProjects, type ProjectCardItem } from "@/lib/projectsStore";

interface OurWorkProps {
  projects: ProjectCardItem[];
}

export default function OurWork({ projects }: OurWorkProps) {
  const displayProjects = getTopProjects(projects, 5);

  return (
    <section
      id="our-work"
      className="bg-soft-white text-charcoal py-14 sm:py-16 lg:py-24 border-t border-warm-grey overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Scroll-Animated Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12 lg:mb-14"
        >
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-charcoal tracking-tight leading-tight text-balance">
              We didn&apos;t just film We Store Memories.
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-grey leading-relaxed">
              Every moment is unique. Each completed celebration in our archive
              captures unscripted emotion, heirloom artistry, and the timeless
              chapters crafted alongside couples across remarkable destinations.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/ourwork"
              className="inline-flex items-center gap-2 px-6 py-3 bg-pure-white hover:bg-champagne-beige border border-stone-grey/60 hover:border-champagne-beige text-charcoal text-xs font-semibold uppercase tracking-widest rounded-sm transition-all duration-200 whitespace-nowrap group"
            >
              Open Everything We did
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>

        {/* 3 Columns on Desktop, 1 Column on Mobile (3 cards + more card on mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayProjects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.6,
                delay: Math.min(index * 0.08, 0.32),
                ease: [0.16, 1, 0.3, 1],
              }}
              className={index >= 3 ? "hidden lg:block h-full" : "h-full"}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}

          {/* Sixth Card: Open Projects */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.6,
              delay: Math.min(displayProjects.length * 0.08, 0.4),
              ease: [0.16, 1, 0.3, 1],
            }}
            className="h-full"
          >
            <Link
              href="/ourwork"
              className="group flex flex-col justify-between h-full min-h-[360px] p-6 sm:p-8 bg-pure-white hover:bg-warm-grey/50 border border-stone-grey/60 hover:border-champagne-beige rounded-sm transition-all duration-300 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-beige"
            >
              <div>
                <div className="w-11 h-11 rounded-sm bg-champagne-beige/20 border border-champagne-beige/40 flex items-center justify-center text-charcoal mb-6">
                  <Film className="w-5 h-5 text-champagne-beige" />
                </div>

                <span className="text-xs font-mono uppercase tracking-[0.2em] text-champagne-beige block">
                  Complete Archive
                </span>
                <h3 className="mt-2 text-2xl font-serif font-semibold text-charcoal group-hover:text-champagne-beige transition-colors duration-200">
                  Open Everything We did
                </h3>
                <p className="mt-3 text-sm text-muted-grey leading-relaxed">
                  Step into our full gallery of completed weddings, intimate
                  elopements, and cinematic destination stories preserved in
                  timeless detail.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-stone-grey/40 flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-charcoal group-hover:text-champagne-beige transition-colors duration-200">
                <span>Open Projects</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
