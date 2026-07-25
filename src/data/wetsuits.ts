export type WetsuitGuide = {
  waterTemp: string;
  thickness: string;
  extras: string;
  season: string;
};

export const wetsuitGuides: WetsuitGuide[] = [
  {
    waterTemp: "65°F and up",
    thickness: "2/2mm or 3/2mm",
    extras: "Usually no boots or hood needed",
    season: "Warm-water trips (rarely applies to Northern California)",
  },
  {
    waterTemp: "58-64°F",
    thickness: "3/2mm or 4/3mm",
    extras: "Boots optional",
    season: "Warmest NorCal stretches (late summer/early fall in a good year)",
  },
  {
    waterTemp: "52-57°F",
    thickness: "4/3mm or 5/4/3mm",
    extras: "Boots recommended, hood optional",
    season: "Most of the year at spots like Linda Mar, Cowell's, Stinson, and Bolinas",
  },
  {
    waterTemp: "48-52°F",
    thickness: "5/4mm or 6/5/4mm",
    extras: "Boots, gloves, and a hood recommended",
    season: "Winter and upwelling season, and consistently cold/exposed spots like Rodeo Beach",
  },
];

export const wetsuitTips = [
  "Northern California water almost never gets warm — most spots covered on this site sit in the low-to-mid 50s°F year-round, so a wetsuit isn't optional, it's essential gear.",
  "A snug fit matters more than the number on the label: a loose wetsuit lets cold water flush in and out, while a properly fitted one traps a thin layer that your body warms up.",
  "Rentals are a great way to start. Most of the shops listed in the Shops section rent wetsuits alongside boards, so you can try before you commit to buying.",
  "Booties make a bigger comfort difference than most beginners expect, especially on rocky entries like Bolinas or cold, steep beaches like Rodeo Beach.",
];
