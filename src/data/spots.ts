export type Difficulty = "Beginner" | "Beginner-Intermediate" | "Intermediate" | "Advanced";

export type Spot = {
  slug: string;
  name: string;
  region: string;
  difficulty: Difficulty;
  breakType: string;
  bestSwell: string;
  bestWind: string;
  bestTide: string;
  waterTemp: string;
  hazards: string[];
  summary: string;
  description: string;
};

export const spots: Spot[] = [
  {
    slug: "linda-mar-pacifica",
    name: "Linda Mar (Pacifica State Beach)",
    region: "Pacifica, San Mateo County",
    difficulty: "Beginner",
    breakType: "Sandy beach break",
    bestSwell: "Small-to-moderate W/NW swell",
    bestWind: "Light or offshore (east/southeast)",
    bestTide: "Mid tide",
    waterTemp: "52-58°F year-round — wetsuit required",
    hazards: ["Crowds, especially near the surf schools", "Occasional rip currents", "Beginner traffic and loose boards"],
    summary: "The Bay Area's classic learn-to-surf beach — soft, forgiving whitewater and a wide sandy bottom.",
    description:
      "Linda Mar is widely considered the best place in the San Francisco Bay Area to learn to surf. It's a wide, sandy beach break with a gentle, forgiving wave that breaks in multiple peaks, so there's usually room to find your own spot in the whitewater. Several surf schools operate here, which means there are often other beginners around — a friendly, low-pressure place to fall off your board a few dozen times. Parking and a bathroom/shower area make it an easy first trip.",
  },
  {
    slug: "cowells-beach",
    name: "Cowell's Beach",
    region: "Santa Cruz",
    difficulty: "Beginner",
    breakType: "Sandy beach/point break",
    bestSwell: "Small W/NW swell",
    bestWind: "Light morning wind, offshore or calm",
    bestTide: "Mid tide",
    waterTemp: "55-60°F year-round — wetsuit required",
    hazards: ["Crowded lineup, lots of longboards and lessons", "Occasional water quality advisories after rain"],
    summary: "A slow-rolling, mellow point that's often called the best beginner wave in California.",
    description:
      "Tucked next to the Santa Cruz Wharf, Cowell's is a soft, slow-breaking wave that peels gently across a sandy bottom — exactly what a new surfer wants. It's a longtime home for Santa Cruz surf schools, so the lineup is used to beginners and generally welcoming. Because it's so popular, expect company in the water, but the wave itself is about as friendly as they come.",
  },
  {
    slug: "stinson-beach",
    name: "Stinson Beach",
    region: "Marin County",
    difficulty: "Beginner-Intermediate",
    breakType: "Sandy beach break",
    bestSwell: "Small-to-moderate W/NW swell",
    bestWind: "Light or offshore",
    bestTide: "Mid tide",
    waterTemp: "52-58°F year-round — wetsuit required",
    hazards: [
      "Rip currents, especially near the creek mouth and rock outcrops",
      "Can close out or get punchy on bigger swells",
      "Great white shark sightings are occasionally reported (part of the \"Red Triangle\") — check local advisories",
    ],
    summary: "A long, scenic beach break north of San Francisco with fun, approachable waves on the right day.",
    description:
      "Stinson is a popular family beach with a wide stretch of sand and a beach break that can be great for improving beginners on smaller days. Conditions vary a lot with swell size and sandbar shape, so it's worth checking a surf report before heading out. Because it sits within Marin's stretch of coastline sometimes called the Red Triangle, it's worth being shark-aware, though incidents are rare — most locals surf here regularly without issue.",
  },
  {
    slug: "bolinas",
    name: "Bolinas (The Patch)",
    region: "Bolinas, Marin County",
    difficulty: "Intermediate",
    breakType: "Right point break",
    bestSwell: "Small-to-moderate W/NW/SW swell",
    bestWind: "Light or offshore",
    bestTide: "Low-to-mid tide",
    waterTemp: "52-58°F year-round — wetsuit required",
    hazards: [
      "Strong localism — this is one of Northern California's most tight-knit lineups",
      "Rocks and a rivermouth channel near the takeoff",
      "Limited, informal parking; the community values a low profile",
    ],
    summary: "A long, mellow point break beloved by longboarders — but a lineup where local etiquette matters more than almost anywhere.",
    description:
      "Bolinas is a soft-breaking right point at the mouth of the Bolinas Lagoon that can produce long, easy rides on the right swell — the kind of wave that made it a longboarding institution. It has a well-earned reputation for strong localism, so this is not the spot to paddle out at without patience, humility, and a genuine effort to learn the lineup's unwritten rules. If you go, watch from the beach first, wait your turn, and don't crowd the locals. Many newer surfers are better served getting comfortable at a beach break first and visiting Bolinas later, ideally with a local friend.",
  },
  {
    slug: "rodeo-beach",
    name: "Rodeo Beach",
    region: "Marin Headlands",
    difficulty: "Advanced",
    breakType: "Steep sandy beach break",
    bestSwell: "Small W/NW swell only",
    bestWind: "Offshore (northeast)",
    bestTide: "Mid-to-high tide",
    waterTemp: "52-56°F year-round — wetsuit, hood, and booties recommended",
    hazards: [
      "Powerful, fast-breaking shorebreak even when small",
      "Strong rip currents and a steep, rocky beach profile",
      "Cold, exposed water with limited easy exits",
    ],
    summary: "A dramatic, wild beach in the Marin Headlands with a punchy, powerful shorebreak — beautiful to look at, tough to learn on.",
    description:
      "Rodeo Beach sits in a striking cove in the Marin Headlands, ringed by cliffs, and it's a popular hike and photo spot. The surf itself is a different story: the beach shelves steeply, which makes for a fast, hollow, and powerful shorebreak even on days that look small from the parking lot, plus strong currents pulling along the coastline. It's best suited to intermediate-to-advanced surfers who are comfortable with heavy beach breaks and cold, exposed conditions — new surfers are better off starting elsewhere and working up to a spot like this.",
  },
];

export function getSpotBySlug(slug: string): Spot | undefined {
  return spots.find((spot) => spot.slug === slug);
}
