"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Spot } from "@/data/spots";
import DifficultyBadge from "@/components/DifficultyBadge";

export default function SpotsBrowser({ spots, continents }: { spots: Spot[]; continents: string[] }) {
  const [continent, setContinent] = useState<string>("All");

  const filtered = useMemo(
    () => (continent === "All" ? spots : spots.filter((s) => s.continent === continent)),
    [spots, continent]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setContinent("All")}
          className={`rounded-full px-3 py-1.5 text-sm font-semibold ${
            continent === "All" ? "bg-cyan-600 text-white" : "bg-black/5 text-slate-700 dark:bg-white/10 dark:text-slate-200"
          }`}
        >
          All continents
        </button>
        {continents.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setContinent(c)}
            className={`rounded-full px-3 py-1.5 text-sm font-semibold ${
              continent === c ? "bg-cyan-600 text-white" : "bg-black/5 text-slate-700 dark:bg-white/10 dark:text-slate-200"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {filtered.map((spot) => (
          <Link
            key={spot.slug}
            href={`/spots/${spot.slug}`}
            className="flex flex-col rounded-2xl border border-black/10 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-white/10 dark:bg-white/[0.03]"
          >
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-semibold text-slate-900 dark:text-slate-100">{spot.name}</h2>
              <DifficultyBadge level={spot.difficulty} />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {spot.region}, {spot.country}
            </p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{spot.summary}</p>
            <p className="mt-3 text-xs font-medium text-slate-500 dark:text-slate-500">{spot.breakType}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
