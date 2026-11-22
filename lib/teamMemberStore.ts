import type { TeamMember } from "@/lib/schemas";

export interface TeamMemberCardItem {
  _id: string;
  name: string;
  role?: string;
  description?: string;
  image: string;
  order?: number;
  isActive: boolean;
}

interface SanityTeamMemberResult extends TeamMember {
  role?: string;
}

export const FALLBACK_TEAM_MEMBERS: TeamMemberCardItem[] = [
  {
    _id: "fallback-team-arjun-nair",
    name: "Arjun Nair",
    role: "Founder & Lead Cinematographer",
    description:
      "Driven by cinema-grade storytelling and unscripted human emotion, Arjun has directed over 180 destination wedding films across heritage palaces and coastal horizons.",
    image: "/team/team_founder_director_1795338196724.jpg",
    order: 1,
    isActive: true,
  },
  {
    _id: "fallback-team-kavya-menon",
    name: "Kavya Menon",
    role: "Lead Candid Photographer",
    description:
      "With a documentary eye trained on quiet gestures and natural golden-hour light, Kavya captures timeless heirloom portraits that feel effortless and deeply personal.",
    image: "/team/team_lead_photographer_1795338196828.jpg",
    order: 2,
    isActive: true,
  },
  {
    _id: "fallback-team-rohan-verma",
    name: "Rohan Verma",
    role: "Senior Film Editor & Colorist",
    description:
      "Crafting narrative rhythm, bespoke soundscapes, and filmic color palettes in post-production so every celebration breathes like an intimate feature film.",
    image: "/team/team_colorist_editor_1795338196091.jpg",
    order: 3,
    isActive: true,
  },
  {
    _id: "fallback-team-meera-iyer",
    name: "Meera Iyer",
    role: "Creative Producer & Visual Storyteller",
    description:
      "From pre-wedding moodboards to multi-day destination logistics, Meera coordinates every creative detail so couples stay completely present in every moment.",
    image: "/team/team_aerial_producer_1795338195536.jpg",
    order: 4,
    isActive: true,
  },
];

export function formatTeamDisplayOrder(order?: number, index = 0): string {
  return typeof order === "number"
    ? String(order).padStart(2, "0")
    : String(index + 1).padStart(2, "0");
}

export function getActiveTeamMembers(
  members: TeamMemberCardItem[]
): TeamMemberCardItem[] {
  return members
    .filter((member) => member.isActive === true)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

export function getTopTeamMembers(
  members: TeamMemberCardItem[],
  limit = 3
): TeamMemberCardItem[] {
  return getActiveTeamMembers(members).slice(0, limit);
}

export async function getAllTeamMembers(): Promise<TeamMemberCardItem[]> {
  if (
    typeof window !== "undefined" ||
    !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
    !process.env.NEXT_PUBLIC_SANITY_DATASET ||
    !process.env.SANITY_API_VERSION
  ) {
    return FALLBACK_TEAM_MEMBERS;
  }

  try {
    const { sanityClient, urlFor } = await import("@/lib/sanity");
    const docs = await sanityClient.fetch<SanityTeamMemberResult[]>(
      `*[_type == "teamMember" && isActive == true] | order(order asc) {
        _id,
        name,
        "role": coalesce(role, tag),
        tag,
        description,
        image {
          ...,
          asset->
        },
        order,
        isActive
      }`
    );

    if (!docs || !Array.isArray(docs) || docs.length === 0) {
      return FALLBACK_TEAM_MEMBERS;
    }

    return docs.map((doc) => {
      let imageUrl = "";
      try {
        if (doc.image) {
          imageUrl = urlFor(doc.image)
            .width(1000)
            .quality(85)
            .auto("format")
            .url();
        }
      } catch {
        imageUrl = "";
      }

      return {
        _id: doc._id,
        name: doc.name,
        role: doc.role || doc.tag,
        description: doc.description,
        image: imageUrl,
        order: doc.order,
        isActive: doc.isActive === true,
      };
    });
  } catch {
    return FALLBACK_TEAM_MEMBERS;
  }
}
