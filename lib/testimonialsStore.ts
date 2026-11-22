import type { Testimonial } from "@/lib/schemas";

export interface TestimonialCardItem {
  _id: string;
  clientName: string;
  serviceTitle?: string;
  tag?: string;
  review: string;
  image?: string;
  order?: number;
  isActive: boolean;
}

interface SanityTestimonialResult extends Omit<Testimonial, "service"> {
  service?: { _id: string; title?: string } | null;
}

export const FALLBACK_TESTIMONIALS: TestimonialCardItem[] = [
  {
    _id: "fallback-testimonial-aarav-meera",
    clientName: "Aarav & Meera",
    serviceTitle: "Wedding Cinematography",
    tag: "Udaipur",
    review:
      "NC Films turned three days of emotion, music, and family chaos into a wedding film that still brings tears to our eyes every single time we press play.",
    order: 1,
    isActive: true,
  },
  {
    _id: "fallback-testimonial-rohan-ananya",
    clientName: "Rohan & Ananya",
    serviceTitle: "Candid Wedding Photography",
    tag: "Jaipur",
    review:
      "They blended into our celebration like old friends. Looking through our gallery feels like reliving every unspoken glance and burst of laughter.",
    order: 2,
    isActive: true,
  },
  {
    _id: "fallback-testimonial-vikram-diya",
    clientName: "Vikram & Diya",
    serviceTitle: "Pre-Wedding & Editorial Portraits",
    tag: "Goa",
    review:
      "From scouting golden-hour cliffs to keeping us completely relaxed in front of the lens, the entire team made every frame feel effortless and deeply personal.",
    order: 3,
    isActive: true,
  },
  {
    _id: "fallback-testimonial-kabir-tara",
    clientName: "Kabir & Tara",
    serviceTitle: "Wedding Cinematography",
    tag: "Hyderabad",
    review:
      "The sound design, pacing, and color grading felt like a true theatrical feature. Our families were speechless when we watched the premiere together.",
    order: 4,
    isActive: true,
  },
];

export function getActiveTestimonials(
  testimonials: TestimonialCardItem[]
): TestimonialCardItem[] {
  return testimonials
    .filter((item) => item.isActive === true)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

export function resolveTestimonials(
  testimonials?: TestimonialCardItem[]
): TestimonialCardItem[] {
  const active = testimonials ? getActiveTestimonials(testimonials) : [];
  return active.length > 0 ? active : getActiveTestimonials(FALLBACK_TESTIMONIALS);
}

export function buildTestimonialMarqueeTrack(
  testimonials: TestimonialCardItem[]
): TestimonialCardItem[] {
  if (testimonials.length === 0) return [];

  const minBlockLength = 4;
  const repeatsPerBlock = Math.max(
    1,
    Math.ceil(minBlockLength / testimonials.length)
  );

  const singleBlock: TestimonialCardItem[] = [];
  for (let i = 0; i < repeatsPerBlock; i += 1) {
    singleBlock.push(...testimonials);
  }

  return [...singleBlock, ...singleBlock, ...singleBlock];
}

export async function getAllTestimonials(): Promise<TestimonialCardItem[]> {
  if (
    typeof window !== "undefined" ||
    !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
    !process.env.NEXT_PUBLIC_SANITY_DATASET ||
    !process.env.SANITY_API_VERSION
  ) {
    return FALLBACK_TESTIMONIALS;
  }

  try {
    const { sanityClient, urlFor } = await import("@/lib/sanity");
    const docs = await sanityClient.fetch<SanityTestimonialResult[]>(
      `*[_type == "testimonial" && isActive == true] | order(order asc) {
        _id,
        clientName,
        service-> {
          _id,
          title
        },
        tag,
        review,
        image {
          ...,
          asset->
        },
        order,
        isActive
      }`
    );

    if (!docs || !Array.isArray(docs) || docs.length === 0) {
      return FALLBACK_TESTIMONIALS;
    }

    return docs.map((doc) => {
      let imageUrl: string | undefined;
      try {
        if (doc.image) {
          const built = urlFor(doc.image)
            .width(400)
            .quality(85)
            .auto("format")
            .url();
          if (built) {
            imageUrl = built;
          }
        }
      } catch {
        imageUrl = undefined;
      }

      return {
        _id: doc._id,
        clientName: doc.clientName,
        serviceTitle: doc.service?.title,
        tag: doc.tag,
        review: doc.review,
        image: imageUrl,
        order: doc.order,
        isActive: doc.isActive === true,
      };
    });
  } catch {
    return FALLBACK_TESTIMONIALS;
  }
}
