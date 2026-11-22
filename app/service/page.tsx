import Link from "next/link";
import { ArrowLeft, Camera } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { getServiceById, getValidServiceTags } from "@/lib/servicesStore";

export const dynamic = "force-dynamic";

interface ServicePageProps {
  searchParams: Promise<{ id?: string }>;
}

export default async function ServiceDetailPage({
  searchParams,
}: ServicePageProps) {
  const { id } = await searchParams;
  const service = await getServiceById(id);

  const tags = getValidServiceTags(service.tags);

  return (
    <div className="min-h-screen flex flex-col bg-pure-white text-charcoal">
      <Header />

      <main className="flex-1">
        {/* Compact Dark Header Banner for Transparent Header Contrast */}
        <section className="bg-charcoal text-pure-white pt-28 pb-12 sm:pt-32 sm:pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-champagne-beige hover:text-pure-white transition-colors duration-200 mb-6"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              All Services
            </Link>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-3xl">
                {tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider text-champagne-beige mb-3">
                    {tags.map((tag, idx) => (
                      <span key={tag} className="inline-flex items-center gap-2">
                        {idx > 0 && (
                          <span aria-hidden="true" className="text-stone-grey/60">
                            ·
                          </span>
                        )}
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                )}

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight leading-tight text-balance">
                  {service.title}
                </h1>

                {typeof service.count === "number" && (
                  <p className="mt-3 text-base sm:text-lg font-mono font-semibold text-champagne-beige tabular-nums">
                    {service.count}+ Completed Celebrations
                  </p>
                )}
              </div>

              <div className="shrink-0">
                <button
                  type="button"
                  className="px-7 py-3 bg-champagne-beige hover:bg-champagne-beige/90 text-charcoal text-xs font-bold uppercase tracking-widest rounded-sm transition-colors duration-200 cursor-pointer whitespace-nowrap"
                >
                  Enquiry
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Service Details & Lazy-Loaded Gallery on White Main Background */}
        <section className="bg-pure-white py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12 sm:space-y-16">
            {/* Description Block */}
            {service.description && (
              <div className="max-w-3xl pb-8 border-b border-warm-grey">
                <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-champagne-beige mb-3">
                  Service Overview
                </h2>
                <p className="text-base sm:text-lg text-charcoal/90 leading-relaxed">
                  {service.description}
                </p>
              </div>
            )}

            {/* All Images Gallery with Lazy Loading */}
            <div>
              <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-serif font-semibold text-charcoal">
                  Curated Gallery
                </h2>
                <span className="text-xs font-mono text-muted-grey tabular-nums">
                  {service.images.length}{" "}
                  {service.images.length === 1 ? "Photograph" : "Photographs"}
                </span>
              </div>

              {service.images.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {service.images.map((imageUrl, index) => (
                    <div
                      key={`${imageUrl}-${index}`}
                      className={`group relative overflow-hidden rounded-sm border border-stone-grey/40 bg-warm-grey ${
                        index === 0 ? "md:col-span-2 aspect-[16/10]" : "aspect-[4/3]"
                      }`}
                    >
                      <img
                        src={imageUrl}
                        alt={`${service.title} photograph ${index + 1}`}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-16 px-6 bg-soft-white border border-stone-grey/50 rounded-sm flex flex-col items-center justify-center text-center gap-3">
                  <Camera className="w-8 h-8 text-champagne-beige" />
                  <p className="text-sm text-muted-grey">
                    Gallery photographs are currently being updated for this
                    service.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
