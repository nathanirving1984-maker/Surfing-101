export type Difficulty = "Beginner" | "Beginner-Intermediate" | "Intermediate" | "Advanced";

export type Spot = {
  slug: string;
  name: string;
  region: string;
  country: string;
  continent: string;
  lat: number;
  lng: number;
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
    country: "United States",
    continent: "North America",
    lat: 37.5947,
    lng: -122.5011,
    difficulty: "Beginner",
    breakType: "Sandy beach break",
    bestSwell: "Small-to-moderate W/NW swell",
    bestWind: "Light or offshore (east/southeast)",
    bestTide: "Mid tide",
    waterTemp: "52-58°F (11-14°C) year-round — wetsuit required",
    hazards: ["Crowds, especially near the surf schools", "Occasional rip currents", "Beginner traffic and loose boards"],
    summary: "The Bay Area's classic learn-to-surf beach — soft, forgiving whitewater and a wide sandy bottom.",
    description:
      "Linda Mar is widely considered the best place in the San Francisco Bay Area to learn to surf. It's a wide, sandy beach break with a gentle, forgiving wave that breaks in multiple peaks, so there's usually room to find your own spot in the whitewater. Several surf schools operate here, which means there are often other beginners around — a friendly, low-pressure place to fall off your board a few dozen times. Parking and a bathroom/shower area make it an easy first trip.",
  },
  {
    slug: "cowells-beach",
    name: "Cowell's Beach",
    region: "Santa Cruz, California",
    country: "United States",
    continent: "North America",
    lat: 36.9613,
    lng: -122.0219,
    difficulty: "Beginner",
    breakType: "Sandy beach/point break",
    bestSwell: "Small W/NW swell",
    bestWind: "Light morning wind, offshore or calm",
    bestTide: "Mid tide",
    waterTemp: "55-60°F (13-16°C) year-round — wetsuit required",
    hazards: ["Crowded lineup, lots of longboards and lessons", "Occasional water quality advisories after rain"],
    summary: "A slow-rolling, mellow point that's often called the best beginner wave in California.",
    description:
      "Tucked next to the Santa Cruz Wharf, Cowell's is a soft, slow-breaking wave that peels gently across a sandy bottom — exactly what a new surfer wants. It's a longtime home for Santa Cruz surf schools, so the lineup is used to beginners and generally welcoming. Because it's so popular, expect company in the water, but the wave itself is about as friendly as they come.",
  },
  {
    slug: "stinson-beach",
    name: "Stinson Beach",
    region: "Marin County, California",
    country: "United States",
    continent: "North America",
    lat: 37.9008,
    lng: -122.6433,
    difficulty: "Beginner-Intermediate",
    breakType: "Sandy beach break",
    bestSwell: "Small-to-moderate W/NW swell",
    bestWind: "Light or offshore",
    bestTide: "Mid tide",
    waterTemp: "52-58°F (11-14°C) year-round — wetsuit required",
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
    region: "Bolinas, Marin County, California",
    country: "United States",
    continent: "North America",
    lat: 37.9099,
    lng: -122.6866,
    difficulty: "Intermediate",
    breakType: "Right point break",
    bestSwell: "Small-to-moderate W/NW/SW swell",
    bestWind: "Light or offshore",
    bestTide: "Low-to-mid tide",
    waterTemp: "52-58°F (11-14°C) year-round — wetsuit required",
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
    region: "Marin Headlands, California",
    country: "United States",
    continent: "North America",
    lat: 37.8302,
    lng: -122.5361,
    difficulty: "Advanced",
    breakType: "Steep sandy beach break",
    bestSwell: "Small W/NW swell only",
    bestWind: "Offshore (northeast)",
    bestTide: "Mid-to-high tide",
    waterTemp: "52-56°F (11-13°C) year-round — wetsuit, hood, and booties recommended",
    hazards: [
      "Powerful, fast-breaking shorebreak even when small",
      "Strong rip currents and a steep, rocky beach profile",
      "Cold, exposed water with limited easy exits",
    ],
    summary: "A dramatic, wild beach in the Marin Headlands with a punchy, powerful shorebreak — beautiful to look at, tough to learn on.",
    description:
      "Rodeo Beach sits in a striking cove in the Marin Headlands, ringed by cliffs, and it's a popular hike and photo spot. The surf itself is a different story: the beach shelves steeply, which makes for a fast, hollow, and powerful shorebreak even on days that look small from the parking lot, plus strong currents pulling along the coastline. It's best suited to intermediate-to-advanced surfers who are comfortable with heavy beach breaks and cold, exposed conditions — new surfers are better off starting elsewhere and working up to a spot like this.",
  },
  {
    slug: "waikiki",
    name: "Waikiki Beach",
    region: "Honolulu, Oahu, Hawaii",
    country: "United States",
    continent: "Oceania",
    lat: 21.2761,
    lng: -157.8267,
    difficulty: "Beginner",
    breakType: "Reef-protected beach break",
    bestSwell: "Small S/SW swell",
    bestWind: "Light trade winds (offshore-ish)",
    bestTide: "Mid-to-high tide",
    waterTemp: "75-80°F (24-27°C) year-round — no wetsuit needed",
    hazards: ["Very crowded lineup with mixed skill levels", "Shallow reef in spots", "Outrigger canoes and catamarans sharing the water"],
    summary: "The birthplace of modern recreational surfing — warm water, long gentle rollers, and a lineup built for beginners.",
    description:
      "Waikiki is where surf lessons became a global industry, and it's still one of the most forgiving places on Earth to learn: warm water year-round, slow-breaking waves over a reef shelf, and beach boys and surf schools everywhere ready to teach. The tradeoff is crowds — this is one of the most popular beginner breaks in the world, so patience and awareness of other surfers matter as much as technique.",
  },
  {
    slug: "bondi-beach",
    name: "Bondi Beach",
    region: "Sydney, New South Wales",
    country: "Australia",
    continent: "Oceania",
    lat: -33.8908,
    lng: 151.2743,
    difficulty: "Beginner-Intermediate",
    breakType: "Sandy beach break",
    bestSwell: "Small-to-moderate E/SE swell",
    bestWind: "Light or offshore (west)",
    bestTide: "Mid tide",
    waterTemp: "65-73°F (18-23°C), warmer in summer — spring suit or shortie most of the year",
    hazards: ["Strong rip currents (patrolled by lifeguards — swim/surf between the flags)", "Very crowded, especially near the surf schools", "Can get punchy and fast on bigger swells"],
    summary: "Australia's most famous city beach — a lively, lifeguard-patrolled beach break that's a rite of passage for new surfers.",
    description:
      "Bondi is as much a cultural institution as a surf spot: a wide urban beach a few minutes from central Sydney, patrolled year-round by lifeguards, with surf schools running lessons most mornings. The wave itself is a fairly standard beach break — fun and approachable on smaller days, but rip currents are a real hazard, which is exactly why sticking close to the lifeguard flags and patrolled areas matters here more than most places.",
  },
  {
    slug: "ericeira-foz-do-lizandro",
    name: "Foz do Lizandro",
    region: "Ericeira, Lisbon District",
    country: "Portugal",
    continent: "Europe",
    lat: 38.965,
    lng: -9.3536,
    difficulty: "Beginner",
    breakType: "Sandy river-mouth beach break",
    bestSwell: "Small-to-moderate W/NW swell",
    bestWind: "Light or offshore (east)",
    bestTide: "Mid tide",
    waterTemp: "60-68°F (16-20°C) — 3/2mm to 4/3mm wetsuit most of the year",
    hazards: ["River-mouth current near the estuary", "Can get crowded with schools in summer", "Rocks at the northern end of the beach"],
    summary: "A soft, sandy beach break near Ericeira — Europe's surfing capital — built for learners, even though the region's points are world-class.",
    description:
      "Ericeira is a UNESCO World Surfing Reserve packed with high-quality point breaks, but most of those (like the famous Coxos) are firmly intermediate-to-advanced. Foz do Lizandro, a short drive south, is the region's go-to beginner spot: a sandy river-mouth beach break with a softer, more forgiving wave, home to most of the area's surf schools. It's a great first stop before working up to the points the region is famous for.",
  },
  {
    slug: "jbay-dolphin-beach",
    name: "Dolphin Beach",
    region: "Jeffreys Bay, Eastern Cape",
    country: "South Africa",
    continent: "Africa",
    lat: -34.0398,
    lng: 24.9153,
    difficulty: "Beginner-Intermediate",
    breakType: "Sandy beach break",
    bestSwell: "Small-to-moderate S/SW swell",
    bestWind: "Light or offshore (northwest)",
    bestTide: "Mid tide",
    waterTemp: "60-70°F (16-21°C), colder with upwelling — 3/2mm to 4/3mm wetsuit",
    hazards: ["Occasional strong currents", "Sharks are a genuine regional consideration — follow local shark-safety advisories", "Can be exposed and windy"],
    summary: "A friendly, sandy beach break in the town made famous by Supertubes — a smart place for newer surfers to start.",
    description:
      "Jeffreys Bay is world-renowned for Supertubes, one of the fastest, most powerful right-hand point breaks on Earth — squarely advanced-only. Dolphin Beach, in town, is the more forgiving alternative: a straightforward sandy beach break that's much better suited to learners, with surf schools operating nearby. It's a good reminder that a legendary surf town can still have an easy on-ramp.",
  },
  {
    slug: "taghazout-bay",
    name: "Taghazout Bay (Banana Beach)",
    region: "Taghazout, Souss-Massa",
    country: "Morocco",
    continent: "Africa",
    lat: 30.5435,
    lng: -9.7104,
    difficulty: "Beginner",
    breakType: "Sandy beach break",
    bestSwell: "Small-to-moderate NW/W swell",
    bestWind: "Light morning wind, offshore in the afternoon",
    bestTide: "Mid-to-high tide",
    waterTemp: "64-72°F (18-22°C) year-round — 3/2mm wetsuit",
    hazards: ["Rocks at low tide", "Crowded with surf camps in season", "Strong sun and offshore wind exposure"],
    summary: "A mellow, sandy beginner bay near Morocco's famous point-break coastline.",
    description:
      "Taghazout put Morocco on the surf map with world-class points like Anchor Point and Boilers — waves for experienced surfers, not first-timers. Just south, Taghazout Bay (often called Banana Beach) is a softer, sandy beach break that's become the region's beginner hub, packed with surf camps and schools taking advantage of consistent swell and warm-for-the-Atlantic water.",
  },
  {
    slug: "canggu-old-mans",
    name: "Old Man's (Batu Bolong)",
    region: "Canggu, Bali",
    country: "Indonesia",
    continent: "Asia",
    lat: -8.6558,
    lng: 115.1329,
    difficulty: "Beginner",
    breakType: "Reef beach break",
    bestSwell: "Small-to-moderate S/SW swell",
    bestWind: "Light or offshore",
    bestTide: "Mid-to-high tide (covers the reef)",
    waterTemp: "82-86°F (28-30°C) year-round — no wetsuit needed",
    hazards: ["Shallow reef, especially at low tide — reef booties recommended", "Crowded lineup with lots of surf schools", "Currents near the river mouth"],
    summary: "Bali's classic learner wave — warm water, a soft reef break, and the island's biggest concentration of surf schools.",
    description:
      "Old Man's earned its name as the mellow, longboard-friendly counterpart to Bali's heavier reef breaks. It's a soft, playful wave that works over a reef shelf, best surfed at mid-to-high tide when there's enough water covering the reef. Canggu has grown into a full-blown surf town around this wave, so expect a busy, social lineup and no shortage of nearby lessons and board rentals.",
  },
  {
    slug: "byron-bay-the-pass",
    name: "The Pass",
    region: "Byron Bay, New South Wales",
    country: "Australia",
    continent: "Oceania",
    lat: -28.6389,
    lng: 153.6289,
    difficulty: "Beginner-Intermediate",
    breakType: "Right point break",
    bestSwell: "Small-to-moderate E/SE/NE swell",
    bestWind: "Light or offshore (west/southwest)",
    bestTide: "Mid tide",
    waterTemp: "68-77°F (20-25°C), warmer in summer — often no wetsuit or a spring suit",
    hazards: ["Very crowded, one of Australia's most popular waves", "Rocks near the point", "Longboard traffic"],
    summary: "A long, easy, sunny point break that's one of Australia's most famous learner-to-intermediate waves.",
    description:
      "The Pass wraps around a headland into Byron Bay, producing long, gently peeling rights that are forgiving enough for confident beginners and a genuine joy for improving surfers. Warm water and reliable conditions make it one of the most popular waves in the country, which means it's also often packed — go early, be patient, and expect to share every wave.",
  },
  {
    slug: "tofino-cox-bay",
    name: "Cox Bay",
    region: "Tofino, Vancouver Island, British Columbia",
    country: "Canada",
    continent: "North America",
    lat: 49.1136,
    lng: -125.8886,
    difficulty: "Beginner-Intermediate",
    breakType: "Sandy beach break",
    bestSwell: "Small-to-moderate W/NW/SW swell",
    bestWind: "Light or offshore",
    bestTide: "Mid tide",
    waterTemp: "46-55°F (8-13°C) year-round — 5/4mm wetsuit, hood, boots, and gloves recommended",
    hazards: ["Cold water and remote setting — hypothermia risk if underdressed", "Rip currents", "Rocks at the north end of the bay"],
    summary: "Canada's best-known surf town — a wide, sandy beach break that proves cold water doesn't mean bad surfing.",
    description:
      "Tofino has built a genuine surf culture on the edge of a temperate rainforest, and Cox Bay is its most consistent, learner-friendly beach break. The wave itself is a fairly approachable beach break; the real challenge is the water temperature, which stays cold year-round. With a proper thick wetsuit (see the Gear Guide), it's a beautiful, uncrowded alternative to warmer, busier beginner spots.",
  },
];

export const continents = Array.from(new Set(spots.map((spot) => spot.continent))).sort();

export function getSpotBySlug(slug: string): Spot | undefined {
  return spots.find((spot) => spot.slug === slug);
}
