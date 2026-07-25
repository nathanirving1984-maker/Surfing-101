import type { Metadata } from "next";
import Link from "next/link";
import { spots } from "@/data/spots";
import DifficultyBadge from "@/components/DifficultyBadge";

export const metadata: Metadata = {
  title: "Wave Breaks",
  description: "Northern California wave breaks for surfers of every level, from Linda Mar to Rodeo Beach.",
};

export default function SpotsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-widest text-cyan-700 dark:text-cyan-400">
        Wave Breaks
      </p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
        Northern California surf spots
      </h1>
      <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
        A starting list of Northern California breaks, ordered roughly from easiest to most
        demanding. Always double-check current conditions, tides, and local advisories before
        heading out — this is a starting point, not a live report.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {spots.map((spot) => (
          <Link
            key={spot.slug}
            href={`/spots/${spot.slug}`}
            className="flex flex-col rounded-2xl border border-black/10 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-white/10 dark:bg-white/[0.03]"
          >
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-semibold text-slate-900 dark:text-slate-100">{spot.name}</h2>
              <DifficultyBadge level={spot.difficulty} />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">{spot.region}</p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{spot.summary}</p>
            <p className="mt-3 text-xs font-medium text-slate-500 dark:text-slate-500">{spot.breakType}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
