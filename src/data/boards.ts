export type BoardType = {
  name: string;
  bestFor: string;
  lengthRange: string;
  description: string;
};

export const boardTypes: BoardType[] = [
  {
    name: "Foam Longboard (Soft-Top)",
    bestFor: "Absolute beginners",
    lengthRange: "8'0\" – 9'6\"",
    description:
      "The standard first board for a reason: a soft foam deck, lots of volume, and a wide, stable outline make it much easier to paddle, catch waves early, and survive the inevitable falls (and board bonks) without hurting yourself or anyone nearby. Almost every surf school teaches on one of these.",
  },
  {
    name: "Funboard / Mini-Mal",
    bestFor: "Beginners who are catching whitewater waves consistently and starting to turn",
    lengthRange: "7'0\" – 8'0\"",
    description:
      "A shorter, slightly less stable step down from a longboard, with a rounded nose and more rocker (curve) for turning. Good for surfers who've got pop-ups and straight rides down, and are ready to start angling across the wave face.",
  },
  {
    name: "Performance Longboard",
    bestFor: "Intermediate surfers who love long, flowing rides",
    lengthRange: "9'0\" – 9'6\"",
    description:
      "Thinner and less forgiving than a beginner longboard, built for noseriding, cross-stepping, and stylish turns rather than pure stability. A natural next step for surfers who want to stick with longboarding rather than moving toward shortboards.",
  },
  {
    name: "Fish / Hybrid",
    bestFor: "Intermediate surfers transitioning toward shortboards",
    lengthRange: "5'6\" – 6'8\"",
    description:
      "Wider and thicker than a true shortboard, so it still paddles reasonably well, but shorter and more maneuverable. A popular bridge board for surfers moving down in length as their skills improve.",
  },
  {
    name: "Shortboard",
    bestFor: "Advanced surfers",
    lengthRange: "5'6\" and under",
    description:
      "Low volume and highly maneuverable, built for steeper, faster waves and tighter turns. Requires strong paddling, timing, and pop-up skills — most surfers aren't ready for one until well after their first season.",
  },
];

export const boardSizingTips = [
  "As a rough starting point, a first board's volume (liters) should be roughly your body weight (lbs) divided by 3.5–4, adjusted up for less-consistent paddle fitness or smaller waves.",
  "Longer and wider boards paddle into waves earlier and balance more easily — when in doubt, size up as a beginner rather than down.",
  "Rent or borrow before you buy. Shops in the Spots and Shops sections here rent boards by the day, which is the cheapest way to figure out what actually works for you.",
  "A local surf shop can size a board to your height, weight, and experience far more precisely than any online rule of thumb.",
];
