import type { SanityImage } from "@/lib/schemas";

export interface ScrollingMediaRows {
  row1: string[];
  row2: string[];
}

interface SanityScrollingMediaDoc {
  _id: string;
  row1?: SanityImage[];
  row2?: SanityImage[];
}

export const FALLBACK_ROW_1 = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80",
];

export const FALLBACK_ROW_2 = [
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=900&q=80",
];

export function resolveScrollingMediaRows(
  row1Images?: string[],
  row2Images?: string[]
): { duplicatedRow1: string[]; duplicatedRow2: string[] } {
  const activeRow1 =
    row1Images && row1Images.length > 0 ? row1Images : FALLBACK_ROW_1;
  const activeRow2 =
    row2Images && row2Images.length > 0 ? row2Images : FALLBACK_ROW_2;

  return {
    duplicatedRow1: [...activeRow1, ...activeRow1, ...activeRow1],
    duplicatedRow2: [...activeRow2, ...activeRow2, ...activeRow2],
  };
}

export async function getScrollingMediaImages(): Promise<ScrollingMediaRows> {
  if (
    typeof window !== "undefined" ||
    !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
    !process.env.NEXT_PUBLIC_SANITY_DATASET ||
    !process.env.SANITY_API_VERSION
  ) {
    return { row1: [], row2: [] };
  }

  try {
    const { sanityClient, urlFor } = await import("@/lib/sanity");
    const doc = await sanityClient.fetch<SanityScrollingMediaDoc | null>(
      `*[_type in ["scrolling_media", "scrollingMedia"] && (isActive == true || !defined(isActive))] | order(_updatedAt desc)[0] {
        _id,
        "row1": coalesce(row1, row1Images)[] {
          ...,
          asset->
        },
        "row2": coalesce(row2, row2Images)[] {
          ...,
          asset->
        }
      }`
    );

    if (!doc) {
      return { row1: [], row2: [] };
    }

    const mapImages = (imgs?: SanityImage[]): string[] =>
      Array.isArray(imgs)
        ? imgs
            .map((img) => {
              try {
                return urlFor(img).width(900).quality(85).auto("format").url();
              } catch {
                return "";
              }
            })
            .filter(Boolean)
        : [];

    return {
      row1: mapImages(doc.row1),
      row2: mapImages(doc.row2),
    };
  } catch {
    return { row1: [], row2: [] };
  }
}
