import type { HomeScreen, SanityImage } from "@/lib/schemas";

export interface HeroSlide {
  url: string;
  title?: string;
  subtitle?: string;
  tag?: string;
}

export const FALLBACK_SLIDES: Required<HeroSlide>[] = [
  {
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=80",
    title: "Royal Union",
    subtitle: "Cinematic Wedding Films",
    tag: "VIBRANT & SOULFUL",
  },
  {
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1920&q=80",
    title: "Golden Hour Glow",
    subtitle: "Luxury Bridal Portraits",
    tag: "ELEGANT & REFINED",
  },
  {
    url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1920&q=80",
    title: "The Grand Mandap",
    subtitle: "Traditional Indian Festivities",
    tag: "MAJESTIC & TIMELESS",
  },
];

export function resolveHeroSlides(images?: HeroSlide[]): Required<HeroSlide>[] {
  if (!images || images.length === 0) {
    return FALLBACK_SLIDES;
  }

  return images.map((img, index) => {
    const fallbackMeta = FALLBACK_SLIDES[index % FALLBACK_SLIDES.length];
    return {
      url: img.url,
      title: img.title?.trim() || fallbackMeta.title,
      subtitle: img.subtitle?.trim() || fallbackMeta.subtitle,
      tag: img.tag?.trim() || fallbackMeta.tag,
    };
  });
}

export function getNextHeroSlideIndex(current: number, total: number): number {
  if (total <= 1) return 0;
  return (current + 1) % total;
}

export function getPrevHeroSlideIndex(current: number, total: number): number {
  if (total <= 1) return 0;
  return (current - 1 + total) % total;
}

export async function getHomeScreenImages(): Promise<HeroSlide[]> {
  if (
    typeof window !== "undefined" ||
    !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
    !process.env.NEXT_PUBLIC_SANITY_DATASET ||
    !process.env.SANITY_API_VERSION
  ) {
    return [];
  }

  try {
    const { sanityClient, urlFor } = await import("@/lib/sanity");
    const doc = await sanityClient.fetch<HomeScreen | null>(
      `*[_type == "homescreen" && (isActive == true || !defined(isActive))] | order(_updatedAt desc)[0] {
        _id,
        images[] {
          ...,
          asset->
        }
      }`
    );

    if (!doc?.images || !Array.isArray(doc.images) || doc.images.length === 0) {
      return [];
    }

    return doc.images
      .map((img: SanityImage): HeroSlide | null => {
        try {
          const url = urlFor(img).width(1920).quality(85).auto("format").url();
          if (!url) return null;
          return {
            url,
            title: img.alt || undefined,
          };
        } catch {
          return null;
        }
      })
      .filter((slide): slide is HeroSlide => slide !== null);
  } catch {
    return [];
  }
}
