import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ServiceCard from "@/components/servicecard";
import { getActiveServices, getAllServices } from "@/lib/servicesStore";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const services = getActiveServices(await getAllServices());

  return (
    <div className="min-h-screen flex flex-col bg-pure-white text-charcoal">
      <Header />

      <main className="flex-1">
        {/* Compact Editorial Banner for Transparent Header Contrast */}
        <section className="bg-charcoal text-pure-white pt-28 pb-12 sm:pt-32 sm:pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <Link
              href="/landing"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-champagne-beige hover:text-pure-white transition-colors duration-200 mb-5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Home
            </Link>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight leading-tight text-balance">
              Exclusive Photography &amp; Film Services
            </h1>
            <p className="mt-4 text-sm sm:text-base text-warm-grey/85 max-w-2xl leading-relaxed">
              Every moment is unique. We offer a tailored array of specialized
              shoots, executed with absolute artistic dedication and the finest
              production standards.
            </p>
          </div>
        </section>

        {/* Responsive Services Grid on White Background */}
        <section className="bg-pure-white py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-warm-grey">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-grey tabular-nums">
                Showing {services.length} Curated Services
              </p>
              <span className="text-xs text-muted-grey">
                Tap any service card to explore full details &amp; gallery
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {services.map((service) => (
                <ServiceCard
                  key={service._id}
                  service={service}
                  allServices={services.map((s) => s.title)}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
