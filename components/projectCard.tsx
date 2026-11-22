"use client";

import Link from "next/link";
import { Link2, MapPin, Camera } from "lucide-react";
import {
  type ProjectCardItem,
  formatProjectDate,
  truncateProjectDescription,
} from "@/lib/projectsStore";

export type { ProjectCardItem };

interface ProjectCardProps {
  project: ProjectCardItem;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  if (project.isActive !== true) {
    return null;
  }

  const projectUrl = `/project?id=${encodeURIComponent(project._id)}`;
  const formattedDate = formatProjectDate(project.projectDate, "short");
  const { excerpt, isTruncated } = project.description
    ? truncateProjectDescription(project.description, 115)
    : { excerpt: "", isTruncated: false };

  return (
    <Link
      href={projectUrl}
      className="group flex flex-col h-full bg-pure-white border border-stone-grey/50 hover:border-champagne-beige rounded-sm overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-beige"
    >
      {/* Cover Image Container */}
      <div className="relative aspect-[4/3] w-full bg-warm-grey overflow-hidden">
        {project.coverImage ? (
          <img
            src={project.coverImage}
            alt={project.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-warm-grey text-muted-grey">
            <Camera className="w-7 h-7 text-champagne-beige" />
            <span className="text-xs font-mono uppercase tracking-wider">
              {project.title}
            </span>
          </div>
        )}

        {/* Top-Right Date */}
        {formattedDate && (
          <div className="absolute top-3 right-3 z-10">
            <span className="inline-block px-2.5 py-1 bg-pure-white/95 backdrop-blur-sm border border-stone-grey/40 text-charcoal text-[11px] font-mono tabular-nums tracking-wider rounded-sm shadow-sm whitespace-nowrap">
              {formattedDate}
            </span>
          </div>
        )}

        {/* Bottom Overlay inside Cover Image: Project Title + Link Icon */}
        <div className="absolute inset-x-0 bottom-0 pt-12 pb-3.5 px-4 bg-gradient-to-t from-jet-black/85 via-jet-black/45 to-transparent flex items-end justify-between gap-3">
          <h3 className="text-base sm:text-lg font-serif font-semibold text-soft-white group-hover:text-champagne-beige transition-colors duration-200 leading-snug line-clamp-1">
            {project.title}
          </h3>
          <span
            aria-label={`Open ${project.title}`}
            className="w-8 h-8 rounded-sm bg-champagne-beige/90 group-hover:bg-champagne-beige text-jet-black flex items-center justify-center shrink-0 shadow-sm transition-transform duration-200 group-hover:scale-105"
          >
            <Link2 className="w-4 h-4" />
          </span>
        </div>
      </div>

      {/* Card Details Body */}
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        {/* Service */}
        {project.serviceTitle && (
          <span className="text-xs font-mono uppercase tracking-[0.18em] text-champagne-beige font-semibold block">
            {project.serviceTitle}
          </span>
        )}

        {/* Fixed-Length Description + more */}
        {excerpt && (
          <p className="mt-2.5 text-sm text-muted-grey leading-relaxed flex-1">
            {excerpt}
            {isTruncated && (
              <span className="text-charcoal font-medium group-hover:text-champagne-beige transition-colors duration-200">
                {" "}
                ...more
              </span>
            )}
          </p>
        )}

        {/* City */}
        {project.city && (
          <div className="mt-4 flex items-center gap-1.5 text-xs font-mono text-muted-grey">
            <MapPin className="w-3.5 h-3.5 text-champagne-beige shrink-0" />
            <span>{project.city}</span>
          </div>
        )}

        {/* Enquiry Button (No action for now) */}
        <div className="mt-4 pt-4 border-t border-warm-grey">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="w-full py-2.5 px-4 bg-charcoal hover:bg-champagne-beige text-pure-white hover:text-charcoal text-xs font-semibold uppercase tracking-widest rounded-sm transition-colors duration-200 cursor-pointer"
          >
            Enquiry
          </button>
        </div>
      </div>
    </Link>
  );
}
