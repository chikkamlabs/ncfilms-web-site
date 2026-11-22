import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import ServiceCard from "./servicecard";
import {
  getActiveServices,
  getTopServices,
  type ServiceCardItem,
} from "@/lib/servicesStore";

interface ServicesProps {
  services: ServiceCardItem[];
}

export default function Services({ services }: ServicesProps) {
  const activeServices = getActiveServices(services);
  const allServiceTitles = activeServices.map((service) => service.title);
  const displayServices = getTopServices(services, 5);

  return (
    <section
      id="services"
      className="bg-pure-white text-charcoal py-14 sm:py-16 lg:py-24 border-t border-warm-grey"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12 lg:mb-14">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-charcoal tracking-tight leading-tight text-balance">
              Exclusive Photography &amp; Film Services
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-grey leading-relaxed">
              Every moment is unique. We offer a tailored array of specialized
              shoots, executed with absolute artistic dedication and the finest
              production standards.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 bg-soft-white hover:bg-champagne-beige border border-stone-grey/60 hover:border-champagne-beige text-charcoal text-xs font-semibold uppercase tracking-widest rounded-sm transition-all duration-200 whitespace-nowrap group"
            >
              Open Services
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* 3 Columns on Desktop, 1 Column on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayServices.map((service) => (
            <ServiceCard
              key={service._id}
              service={service}
              allServices={allServiceTitles}
            />
          ))}

          {/* Sixth Card: Open Services */}
          <Link
            href="/services"
            className="group flex flex-col justify-between h-full min-h-[340px] p-6 sm:p-8 bg-soft-white hover:bg-warm-grey/60 border border-stone-grey/60 hover:border-champagne-beige rounded-sm transition-all duration-300 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-beige"
          >
            <div>
              <div className="w-11 h-11 rounded-sm bg-champagne-beige/20 border border-champagne-beige/40 flex items-center justify-center text-charcoal mb-6">
                <Sparkles className="w-5 h-5 text-champagne-beige" />
              </div>

              <span className="text-xs font-mono uppercase tracking-[0.2em] text-champagne-beige block">
                Full Collection
              </span>
              <h3 className="mt-2 text-2xl font-serif font-semibold text-charcoal group-hover:text-champagne-beige transition-colors duration-200">
                Explore All Services
              </h3>
              <p className="mt-3 text-sm text-muted-grey leading-relaxed">
                Discover our complete suite of bespoke wedding films, candid
                documentary coverage, destination shoots, and curated portrait
                collections.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-stone-grey/40 flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-charcoal group-hover:text-champagne-beige transition-colors duration-200">
              <span>Open Services</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
