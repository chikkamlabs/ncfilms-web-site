import type { Service } from "@/lib/schemas";

export interface ServiceCardItem {
  _id: string;
  title: string;
  description?: string;
  count?: number;
  tags?: string[];
  images: string[];
  order?: number;
  isActive: boolean;
}

export const FALLBACK_SERVICES: ServiceCardItem[] = [
  {
    _id: "fallback-wedding-cinematography",
    title: "Wedding Cinematography",
    count: 180,
    description:
      "Artistic 4K storytelling films capturing raw emotions, sacred vows, and grand celebrations with cinema-grade color grading and sound design.",
    tags: ["4K Cinema", "Storytelling", "Aerial Drone"],
    images: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
    ],
    order: 1,
    isActive: true,
  },
  {
    _id: "fallback-candid-photography",
    title: "Candid Wedding Photography",
    count: 250,
    description:
      "Unscripted, soulful documentary photography preserving spontaneous laughter, quiet glances, and fleeting heirloom moments.",
    tags: ["Documentary", "Editorial", "Fine Art"],
    images: [
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80",
    ],
    order: 2,
    isActive: true,
  },
  {
    _id: "fallback-prewedding-portraits",
    title: "Pre-Wedding & Editorial Portraits",
    count: 140,
    description:
      "Bespoke destination and studio portrait sessions styled with timeless editorial direction, golden hour lighting, and thoughtful location scouting.",
    tags: ["Destination", "Bridal Couture", "Golden Hour"],
    images: [
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
    ],
    order: 3,
    isActive: true,
  },
];

export function getActiveServices(
  services: ServiceCardItem[]
): ServiceCardItem[] {
  return services
    .filter((service) => service.isActive === true)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

export function getTopServices(
  services: ServiceCardItem[],
  limit = 5
): ServiceCardItem[] {
  return getActiveServices(services)
    .filter((service) => (service.order ?? 999) <= limit)
    .slice(0, limit);
}

export function getValidServiceTags(tags?: string[]): string[] {
  return Array.isArray(tags)
    ? tags.filter((t) => typeof t === "string" && t.trim().length > 0)
    : [];
}

export async function getAllServices(): Promise<ServiceCardItem[]> {
  if (
    typeof window !== "undefined" ||
    !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
    !process.env.NEXT_PUBLIC_SANITY_DATASET ||
    !process.env.SANITY_API_VERSION
  ) {
    return FALLBACK_SERVICES;
  }

  try {
    const { sanityClient, urlFor } = await import("@/lib/sanity");
    const docs = await sanityClient.fetch<Service[]>(
      `*[_type == "service" && isActive == true] | order(order asc) {
        _id,
        title,
        description,
        count,
        tags,
        order,
        isActive,
        images[] {
          ...,
          asset->
        }
      }`
    );

    if (!docs || !Array.isArray(docs) || docs.length === 0) {
      return FALLBACK_SERVICES;
    }

    return docs.map((doc) => ({
      _id: doc._id,
      title: doc.title,
      description: doc.description,
      count: doc.count,
      tags: doc.tags,
      order: doc.order,
      isActive: doc.isActive === true,
      images: Array.isArray(doc.images)
        ? doc.images
            .map((img) => {
              try {
                return urlFor(img).width(1200).quality(85).auto("format").url();
              } catch {
                return "";
              }
            })
            .filter(Boolean)
        : [],
    }));
  } catch {
    return FALLBACK_SERVICES;
  }
}

export async function getServiceById(id?: string): Promise<ServiceCardItem> {
  if (
    typeof window === "undefined" &&
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_DATASET &&
    process.env.SANITY_API_VERSION
  ) {
    try {
      const { sanityClient, urlFor } = await import("@/lib/sanity");
      const query = id
        ? `*[_type == "service" && _id == $id && isActive == true][0] {
            _id,
            title,
            description,
            count,
            tags,
            order,
            isActive,
            images[] {
              ...,
              asset->
            }
          }`
        : `*[_type == "service" && isActive == true] | order(order asc)[0] {
            _id,
            title,
            description,
            count,
            tags,
            order,
            isActive,
            images[] {
              ...,
              asset->
            }
          }`;

      const doc = await sanityClient.fetch<Service | null>(
        query,
        id ? { id } : {}
      );

      if (doc && doc.isActive === true) {
        return {
          _id: doc._id,
          title: doc.title,
          description: doc.description,
          count: doc.count,
          tags: doc.tags,
          order: doc.order,
          isActive: doc.isActive === true,
          images: Array.isArray(doc.images)
            ? doc.images
                .map((img) => {
                  try {
                    return urlFor(img)
                      .width(1400)
                      .quality(85)
                      .auto("format")
                      .url();
                  } catch {
                    return "";
                  }
                })
                .filter(Boolean)
            : [],
        };
      }
    } catch {
      // Fall through to fallback services
    }
  }

  if (id) {
    const matched = FALLBACK_SERVICES.find((item) => item._id === id);
    if (matched) return matched;
  }

  return FALLBACK_SERVICES[0];
}
