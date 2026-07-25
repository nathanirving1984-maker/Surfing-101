import Link from "next/link";
import { spots } from "@/data/spots";
import DifficultyBadge from "@/components/DifficultyBadge";

const featuredSlugs = ["linda-mar-pacifica", "waikiki", "bondi-beach", "canggu-old-mans"];
const featuredSpots = featuredSlugs
  .map((slug) => spots.find((spot) => spot.slug === slug))
  .filter((spot): spot is (typeof spots)[number] => Boolean(spot));

const pillars = [
  {
    href: "/learn",
    icon: "🏄",
    title: "Learn to Surf",
    description: "The basics: paddling, popping up, wave etiquette, and how to stay safe.",
  },
  {
    href: "/spots",
    icon: "🗺️",
    title: "Wave Breaks",
    description: "Beginner-friendly breaks across six continents, mapped and rated by difficulty.",
  },
  {
    href: "/explore",
    icon: "🌐",
    title: "Explore Anywhere",
    description: "Search any coastline on Earth for forecast conditions and nearby surf shops.",
  },
  {
    href: "/shops",
    icon: "🏪",
    title: "Surf Shops",
    description: "Rent gear, buy your first board, or book a lesson nearby.",
  },
  {
    href: "/gear",
    icon: "🩱",
    title: "Gear Guide",
    description: "What board and wetsuit thickness actually make sense for you.",
  },
];

export default function Home() {
  return (
    <div>
      <section className="bg-gradient-to-b from-cyan-600 to-cyan-700 text-white">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-100">
            Free, worldwide, and open to everyone
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl">
            Everything a new surfer needs to paddle out with confidence — anywhere on Earth.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-cyan-50">
            Surfing 101 is a free guide to learning to surf: how the sport works, beginner-friendly
            wave breaks on six continents, live forecast conditions and surf shops for any location
            you search, and what board and wetsuit make sense for where you&apos;re starting from.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/learn"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-cyan-800 shadow hover:bg-cyan-50"
            >
              Start learning
            </Link>
            <Link
              href="/explore"
              className="rounded-full border border-white/70 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
            >
              Search your coastline
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {pillars.map((pillar) => (
            <Link
              key={pillar.href}
              href={pillar.href}
              className="group rounded-2xl border border-black/10 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-white/10 dark:bg-white/[0.03]"
            >
              <span className="text-2xl" aria-hidden>
                {pillar.icon}
              </span>
              <h2 className="mt-3 font-semibold text-slate-900 group-hover:text-cyan-700 dark:text-slate-100 dark:group-hover:text-cyan-400">
                {pillar.title}
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{pillar.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-black/[0.02] py-14 dark:bg-white/[0.02]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                Good spots to start, worldwide
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Four beginner-friendly breaks, four continents.
              </p>
            </div>
            <Link href="/spots" className="text-sm font-semibold text-cyan-700 hover:underline dark:text-cyan-400">
              See all wave breaks &rarr;
            </Link>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredSpots.map((spot) => (
              <Link
                key={spot.slug}
                href={`/spots/${spot.slug}`}
                className="flex flex-col rounded-2xl border border-black/10 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-white/10 dark:bg-white/[0.03]"
              >
                <DifficultyBadge level={spot.difficulty} />
                <h3 className="mt-3 font-semibold text-slate-900 dark:text-slate-100">{spot.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {spot.region}, {spot.country}
                </p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{spot.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <div className="rounded-2xl border border-cyan-300/60 bg-cyan-50 p-6 dark:border-cyan-500/30 dark:bg-cyan-500/10">
          <h2 className="font-semibold text-cyan-900 dark:text-cyan-200">
            Don&apos;t see your coastline in the guide?
          </h2>
          <p className="mt-2 text-sm text-cyan-900/90 dark:text-cyan-100/90">
            The curated Wave Breaks list is just a starting point.{" "}
            <Link href="/explore" className="font-semibold underline">
              Explore
            </Link>{" "}
            works anywhere on the planet — search a beach, city, or coastline to see forecast wave
            and wind conditions plus nearby surf shops, wherever you are.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-14 sm:px-6">
        <div className="rounded-2xl border border-amber-300/60 bg-amber-50 p-6 dark:border-amber-500/30 dark:bg-amber-500/10">
          <h2 className="font-semibold text-amber-900 dark:text-amber-200">Before you paddle out</h2>
          <p className="mt-2 text-sm text-amber-900/90 dark:text-amber-100/90">
            Surf conditions change fast, and water temperature varies enormously by region. Take a
            lesson if it&apos;s your first time, never surf alone as a beginner, check a local surf
            report and any posted advisories, and read our{" "}
            <Link href="/learn" className="font-semibold underline">
              safety basics
            </Link>{" "}
            before you go.
          </p>
        </div>
      </section>
    </div>
  );
}
