import type { Project } from "@/lib/schemas";

export interface ProjectCardItem {
  _id: string;
  title: string;
  slug?: string;
  description?: string;
  serviceTitle?: string;
  coverImage: string;
  images: string[];
  projectDate?: string;
  city?: string;
  order?: number;
  isActive: boolean;
}

interface SanityProjectResult extends Omit<Project, "service"> {
  service?: { _id: string; title?: string } | null;
}

export const FALLBACK_PROJECTS: ProjectCardItem[] = [
  {
    _id: "fallback-project-royal-palace",
    title: "Royal Palace Wedding — Aarav & Meera",
    slug: "royal-palace-wedding-aarav-meera",
    serviceTitle: "Wedding Cinematography",
    description:
      "A three-day celebration along the serene lakes of Udaipur, blending regal heritage architecture, lantern-lit courtyards, and deeply emotional family vows into a timeless cinema film.",
    coverImage:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80",
    images: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1400&q=80",
    ],
    projectDate: "2025-12-14",
    city: "Udaipur",
    order: 1,
    isActive: true,
  },
  {
    _id: "fallback-project-golden-hour",
    title: "Golden Hour Vows — Rohan & Ananya",
    slug: "golden-hour-vows-rohan-ananya",
    serviceTitle: "Candid Wedding Photography",
    description:
      "Captured in natural amber twilight amidst sandstone arches in Jaipur, every unscripted glance, tear of joy, and spontaneous burst of laughter was preserved with documentary honesty.",
    coverImage:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1400&q=80",
    images: [
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1400&q=80",
    ],
    projectDate: "2025-11-22",
    city: "Jaipur",
    order: 2,
    isActive: true,
  },
  {
    _id: "fallback-project-coastal-sunset",
    title: "Coastal Sunset Symphony — Vikram & Diya",
    slug: "coastal-sunset-symphony-vikram-diya",
    serviceTitle: "Pre-Wedding & Editorial Portraits",
    description:
      "An intimate seaside editorial story set against wind-swept cliffs and warm ocean light in South Goa, crafted with fluid camera movement and fine-art portrait framing.",
    coverImage:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1400&q=80",
    images: [
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1400&q=80",
    ],
    projectDate: "2025-10-08",
    city: "Goa",
    order: 3,
    isActive: true,
  },
  {
    _id: "fallback-project-heritage-courtyard",
    title: "Heritage Courtyard Union — Kabir & Tara",
    slug: "heritage-courtyard-union-kabir-tara",
    serviceTitle: "Wedding Cinematography",
    description:
      "Traditional ceremonies beneath century-old banyan trees in Hyderabad, featuring orchestral live music, floral mandap rituals, and deeply personal family interviews.",
    coverImage:
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1400&q=80",
    images: [
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1400&q=80",
    ],
    projectDate: "2025-09-18",
    city: "Hyderabad",
    order: 4,
    isActive: true,
  },
  {
    _id: "fallback-project-garden-soiree",
    title: "Intimate Garden Soirée — Dev & Rhea",
    slug: "intimate-garden-soiree-dev-rhea",
    serviceTitle: "Candid Wedding Photography",
    description:
      "A refined botanical estate celebration filled with candlelit dinner toasts, heirloom bridal portraiture, and effortless candid storytelling from dawn until midnight.",
    coverImage:
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1400&q=80",
    images: [
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=80",
    ],
    projectDate: "2025-08-05",
    city: "Bengaluru",
    order: 5,
    isActive: true,
  },
];

export function formatProjectDate(
  dateStr?: string,
  style: "short" | "long" = "short"
): string | null {
  if (!dateStr) return null;
  const parsed = new Date(dateStr);
  if (Number.isNaN(parsed.getTime())) {
    return dateStr;
  }

  if (style === "long") {
    return parsed.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export function truncateProjectDescription(
  text: string,
  maxLength: number
): {
  excerpt: string;
  isTruncated: boolean;
} {
  const cleaned = text.trim();
  if (cleaned.length <= maxLength) {
    return { excerpt: cleaned, isTruncated: false };
  }
  const sliced = cleaned.slice(0, maxLength);
  const lastSpace = sliced.lastIndexOf(" ");
  const cut =
    lastSpace > maxLength * 0.6 ? sliced.slice(0, lastSpace) : sliced;
  return { excerpt: cut.trim(), isTruncated: true };
}

export function getActiveProjects(
  projects: ProjectCardItem[]
): ProjectCardItem[] {
  return projects
    .filter((project) => project.isActive === true)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

export function getTopProjects(
  projects: ProjectCardItem[],
  limit = 5
): ProjectCardItem[] {
  return getActiveProjects(projects)
    .filter((project) => (project.order ?? 999) <= limit)
    .slice(0, limit);
}

export function getProjectGalleryImages(project: ProjectCardItem): string[] {
  return Array.from(
    new Set([project.coverImage, ...(project.images || [])].filter(Boolean))
  );
}

export async function getAllProjects(): Promise<ProjectCardItem[]> {
  if (
    typeof window !== "undefined" ||
    !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
    !process.env.NEXT_PUBLIC_SANITY_DATASET ||
    !process.env.SANITY_API_VERSION
  ) {
    return FALLBACK_PROJECTS;
  }

  try {
    const { sanityClient, urlFor } = await import("@/lib/sanity");
    const docs = await sanityClient.fetch<SanityProjectResult[]>(
      `*[_type == "project" && isActive == true] | order(order asc) {
        _id,
        title,
        slug,
        description,
        service-> {
          _id,
          title
        },
        coverImage {
          ...,
          asset->
        },
        images[] {
          ...,
          asset->
        },
        projectDate,
        city,
        order,
        isActive
      }`
    );

    if (!docs || !Array.isArray(docs) || docs.length === 0) {
      return FALLBACK_PROJECTS;
    }

    return docs.map((doc) => {
      let coverUrl = "";
      try {
        if (doc.coverImage) {
          coverUrl = urlFor(doc.coverImage)
            .width(1200)
            .quality(85)
            .auto("format")
            .url();
        }
      } catch {
        coverUrl = "";
      }

      const galleryUrls = Array.isArray(doc.images)
        ? doc.images
            .map((img) => {
              try {
                return urlFor(img).width(1400).quality(85).auto("format").url();
              } catch {
                return "";
              }
            })
            .filter(Boolean)
        : [];

      const allImages = Array.from(
        new Set([coverUrl, ...galleryUrls].filter(Boolean))
      );

      return {
        _id: doc._id,
        title: doc.title,
        slug: doc.slug?.current,
        description: doc.description,
        serviceTitle: doc.service?.title,
        coverImage: coverUrl || galleryUrls[0] || "",
        images: allImages,
        projectDate: doc.projectDate,
        city: doc.city,
        order: doc.order,
        isActive: doc.isActive === true,
      };
    });
  } catch {
    return FALLBACK_PROJECTS;
  }
}

export async function getProjectById(id?: string): Promise<ProjectCardItem> {
  if (
    typeof window === "undefined" &&
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_DATASET &&
    process.env.SANITY_API_VERSION
  ) {
    try {
      const { sanityClient, urlFor } = await import("@/lib/sanity");
      const query = id
        ? `*[_type == "project" && _id == $id && isActive == true][0] {
            _id,
            title,
            slug,
            description,
            service-> {
              _id,
              title
            },
            coverImage {
              ...,
              asset->
            },
            images[] {
              ...,
              asset->
            },
            projectDate,
            city,
            order,
            isActive
          }`
        : `*[_type == "project" && isActive == true] | order(order asc)[0] {
            _id,
            title,
            slug,
            description,
            service-> {
              _id,
              title
            },
            coverImage {
              ...,
              asset->
            },
            images[] {
              ...,
              asset->
            },
            projectDate,
            city,
            order,
            isActive
          }`;

      const doc = await sanityClient.fetch<SanityProjectResult | null>(
        query,
        id ? { id } : {}
      );

      if (doc && doc.isActive === true) {
        let coverUrl = "";
        try {
          if (doc.coverImage) {
            coverUrl = urlFor(doc.coverImage)
              .width(1400)
              .quality(85)
              .auto("format")
              .url();
          }
        } catch {
          coverUrl = "";
        }

        const galleryUrls = Array.isArray(doc.images)
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
          : [];

        const allImages = Array.from(
          new Set([coverUrl, ...galleryUrls].filter(Boolean))
        );

        return {
          _id: doc._id,
          title: doc.title,
          slug: doc.slug?.current,
          description: doc.description,
          serviceTitle: doc.service?.title,
          coverImage: coverUrl || galleryUrls[0] || "",
          images: allImages,
          projectDate: doc.projectDate,
          city: doc.city,
          order: doc.order,
          isActive: doc.isActive === true,
        };
      }
    } catch {
      // Fall through to fallback projects
    }
  }

  if (id) {
    const matched = FALLBACK_PROJECTS.find(
      (item) => item._id === id || item.slug === id
    );
    if (matched) return matched;
  }

  return FALLBACK_PROJECTS[0];
}
