export type Shop = {
  name: string;
  region: string;
  address?: string;
  offers: string[];
  notes: string;
  website?: string;
};

export const shops: Shop[] = [
  {
    name: "Sonlight Surf Shop",
    region: "Pacifica (near Linda Mar Beach)",
    offers: ["Board rentals", "Wetsuit rentals", "Bodyboards & booties", "Gear for all levels"],
    notes:
      "Sits right off Linda Mar Beach and is well set up for total beginners — staff will help you pick a board sized for your height, weight, and experience.",
  },
  {
    name: "Cowell's Beach Surf Shop",
    region: "Santa Cruz",
    offers: ["Board rentals", "Wetsuit rentals", "Beginner-friendly gear"],
    notes: "Family-owned and local for decades, right next to the Cowell's Beach lineup.",
    website: "https://surfcowells.com/",
  },
  {
    name: "Cowell's Beach N Bikini Surf Shop",
    region: "Santa Cruz",
    address: "30 Front St, Santa Cruz, CA 95060",
    offers: ["Surf lessons", "Board rentals", "Wetsuit rentals"],
    notes: "A short walk from Cowell's Beach, offering rentals and lessons in one stop.",
  },
  {
    name: "Stinson Beach Surf + Kayak",
    region: "Stinson Beach, Marin County",
    address: "3605 Hwy 1, Stinson Beach, CA 94970",
    offers: ["Surfboard rentals", "Wetsuit rentals", "SUP, kayak & boogie board rentals"],
    notes: "Outfitting Stinson and Bolinas since 1998. Weekend hours are consistent; weekdays are often by appointment, so call ahead.",
    website: "https://www.stinsonbeachsurfandkayak.com/",
  },
  {
    name: "2 Mile Surf Shop",
    region: "Bolinas, Marin County",
    offers: ["Large rental fleet (70+ boards)", "Longboard & beginner specialists", "Wetsuits"],
    notes: "One of the most beginner-friendly shops in the area, with a big rental selection for longboarding and learning.",
    website: "https://www.2milesurf.com/",
  },
  {
    name: "Bolinas Surf Shop",
    region: "Bolinas, Marin County",
    address: "52 Wharf Rd, Bolinas, CA 94924",
    offers: ["Surf gear & apparel", "Wetsuits"],
    notes: "A Bolinas institution open since 1962.",
    website: "https://bolinassurfshop.com/",
  },
];
