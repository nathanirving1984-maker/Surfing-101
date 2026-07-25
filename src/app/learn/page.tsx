import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn to Surf",
  description: "Beginner surfing basics: getting started, technique, etiquette, safety, and key terms.",
};

const steps = [
  {
    title: "1. Start on the right board, in the right spot",
    body: "Learn on a longboard or foam soft-top (8'+) at a beginner-friendly beach break with soft, rolling whitewater — not a reef or point break. See the Gear Guide and Wave Breaks sections for specifics.",
  },
  {
    title: "2. Learn to paddle first",
    body: "Lie on the board with your chest slightly forward of center, toes pointed, back arched, and paddle with cupped hands in long, alternating strokes. Most of your early sessions will be paddling, not standing — that's normal.",
  },
  {
    title: "3. Catch whitewater before you catch \"real\" waves",
    body: "Point the nose straight at the beach, paddle hard as broken whitewater reaches you, and let it push the board forward. Mastering whitewater rides builds the balance and timing you'll need before ever paddling for an unbroken wave.",
  },
  {
    title: "4. The pop-up",
    body: "Practice on the sand first: from lying flat, place your hands by your chest, push up in one motion, and plant your feet under you in a low, balanced stance (not your knees first). Look where you want to go, not down at your feet.",
  },
  {
    title: "5. Fall safely",
    body: "Fall flat and away from your board, cover your head with your arms if you're near the surface, and always paddle back out with your board between you and incoming waves so it doesn't hit anyone behind you.",
  },
];

const etiquette = [
  "One surfer per wave: the person closest to the peak (where the wave breaks first) has the right of way. Don't \"drop in\" on someone already riding.",
  "Don't paddle straight up the middle of the lineup. Paddle around the breaking waves, wide of surfers who are riding.",
  "Hold onto your board. A loose board is a hazard to everyone around you — use a leash, always.",
  "Apologize if you make a mistake. Everyone was a beginner once; a quick, genuine \"sorry, my bad\" goes a long way.",
  "Watch before you paddle out. Spend a few minutes on the beach reading how the wave breaks and where locals are sitting before joining the lineup.",
  "Some lineups (Bolinas is a well-known example) have strong local culture. Be extra patient, humble, and low-key in spots like that — see the Wave Breaks section for specifics.",
];

const safety = [
  "Take a lesson for your first time or two. A qualified instructor will keep you safe and fast-track your progress far more than trial and error.",
  "Never surf alone as a beginner, and tell someone on land where you're going and when you expect to be back.",
  "Check the surf report, tide chart, and wind forecast before you go — conditions that look fine from the parking lot can be dangerous in the water.",
  "Learn to spot a rip current: a channel of choppy, discolored, or foam-flecked water moving away from shore. If caught in one, don't fight it directly — swim parallel to shore until you're free, then angle back in.",
  "Northern California water is cold (often 50s°F) year-round. A wetsuit isn't optional — see the Gear Guide for thickness recommendations.",
  "Know your limits. Waves bigger, faster, or more powerful than you're ready for are the leading cause of surfing injuries for beginners — it's always OK to sit one out.",
];

const glossary: Array<[string, string]> = [
  ["Whitewater", "The broken, foamy part of a wave after it breaks — the easiest and safest part to learn on."],
  ["Lineup", "The area where surfers wait and take turns catching waves."],
  ["Peak", "The point where a wave breaks first and is steepest — usually the best (and most contested) place to catch it."],
  ["Set", "A group of larger waves that arrive together, followed by a calmer lull."],
  ["Rip current", "A narrow, fast-moving current flowing away from shore — the biggest hazard for beginners at beach breaks."],
  ["Point break", "A wave that breaks along a rocky or sandy point, often peeling in one direction for a long ride (e.g., Bolinas)."],
  ["Beach break", "A wave that breaks over a sandy bottom, often in multiple shifting peaks (e.g., Linda Mar, Cowell's)."],
  ["Offshore wind", "Wind blowing from land out to sea — it holds waves up and makes them cleaner. Generally the best wind direction."],
  ["Onshore wind", "Wind blowing from the ocean toward land — it tends to make waves choppy and messy."],
];

export default function LearnPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-widest text-cyan-700 dark:text-cyan-400">
        Learn to Surf
      </p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
        The basics, from paddling to pop-up
      </h1>
      <p className="mt-4 text-slate-600 dark:text-slate-400">
        Surfing has a real learning curve, but everyone starts in the same place. Here&apos;s the
        rundown new surfers actually need: technique, unwritten rules, safety, and the vocabulary
        you&apos;ll hear in the lineup.
      </p>

      <h2 className="mt-12 text-2xl font-bold text-slate-900 dark:text-slate-100">Getting started</h2>
      <div className="mt-6 space-y-6">
        {steps.map((step) => (
          <div key={step.title}>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">{step.title}</h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{step.body}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-12 text-2xl font-bold text-slate-900 dark:text-slate-100">Surf etiquette</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        Lineups run on unwritten rules. Learning them keeps you safe and welcome.
      </p>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700 dark:text-slate-300">
        {etiquette.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2 className="mt-12 text-2xl font-bold text-slate-900 dark:text-slate-100">Safety basics</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700 dark:text-slate-300">
        {safety.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2 className="mt-12 text-2xl font-bold text-slate-900 dark:text-slate-100">Quick glossary</h2>
      <dl className="mt-4 divide-y divide-black/10 dark:divide-white/10">
        {glossary.map(([term, def]) => (
          <div key={term} className="grid gap-1 py-3 sm:grid-cols-4 sm:gap-4">
            <dt className="font-semibold text-slate-900 sm:col-span-1 dark:text-slate-100">{term}</dt>
            <dd className="text-sm text-slate-600 sm:col-span-3 dark:text-slate-400">{def}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
