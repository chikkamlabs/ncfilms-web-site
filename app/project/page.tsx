import Link from "next/link";
import { ArrowLeft, Calendar, Camera, MapPin } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import {
  formatProjectDate,
  getProjectById,
  getProjectGalleryImages,
} from "@/lib/projectsStore";

export const dynamic = "force-dynamic";

interface ProjectPageProps {
  searchParams: Promise<{ id?: string }>;
}

export default async function ProjectDetailPage({
  searchParams,
}: ProjectPageProps) {
  const { id } = await searchParams;
  const project = await getProjectById(id);
  const formattedDate = formatProjectDate(project.projectDate, "long");
  const galleryImages = getProjectGalleryImages(project);

  return (
    <div className="min-h-screen flex flex-col bg-pure-white text-charcoal">
      <Header />

      <main className="flex-1">
        {/* Dark Editorial Banner */}
        <section className="bg-charcoal text-pure-white pt-28 pb-12 sm:pt-32 sm:pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <Link
              href="/ourwork"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-champagne-beige hover:text-pure-white transition-colors duration-200 mb-6"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              All Projects
            </Link>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-3xl">
                {project.serviceTitle && (
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-champagne-beige block mb-3">
                    {project.serviceTitle}
                  </span>
                )}

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight leading-tight text-balance">
                  {project.title}
                </h1>

                <div className="mt-4 flex flex-wrap items-center gap-4 text-xs sm:text-sm font-mono text-warm-grey/85">
                  {formattedDate && (
                    <span className="inline-flex items-center gap-1.5 tabular-nums">
                      <Calendar className="w-4 h-4 text-champagne-beige" />
                      {formattedDate}
                    </span>
                  )}
                  {project.city && (
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-champagne-beige" />
                      {project.city}
                    </span>
                  )}
                </div>
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

        {/* Project Story & Lazy-Loaded Gallery */}
        <section className="bg-pure-white py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12 sm:space-y-16">
            {project.description && (
              <div className="max-w-3xl pb-8 border-b border-warm-grey">
                <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-champagne-beige mb-3">
                  Project Story
                </h2>
                <p className="text-base sm:text-lg text-charcoal/90 leading-relaxed">
                  {project.description}
                </p>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-serif font-semibold text-charcoal">
                  Captured Frames
                </h2>
                <span className="text-xs font-mono text-muted-grey tabular-nums">
                  {galleryImages.length}{" "}
                  {galleryImages.length === 1 ? "Photograph" : "Photographs"}
                </span>
              </div>

              {galleryImages.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {galleryImages.map((imageUrl, index) => (
                    <div
                      key={`${imageUrl}-${index}`}
                      className={`group relative overflow-hidden rounded-sm border border-stone-grey/40 bg-warm-grey ${
                        index === 0 ? "md:col-span-2 aspect-[16/10]" : "aspect-[4/3]"
                      }`}
                    >
                      <img
                        src={imageUrl}
                        alt={`${project.title} photograph ${index + 1}`}
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
                    Gallery photographs for this project are coming soon.
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
