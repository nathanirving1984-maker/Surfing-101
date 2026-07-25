import type { Metadata } from "next";
import { Suspense } from "react";
import ExploreClient from "@/components/ExploreClient";

export const metadata: Metadata = {
  title: "Explore Any Location",
  description: "Search any beach or coastline on Earth for forecast surf conditions and nearby surf shops.",
};

export default function ExplorePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-widest text-cyan-700 dark:text-cyan-400">
        Explore
      </p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
        Check conditions anywhere in the world
      </h1>
      <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
        Not surfing Northern California? Search any beach, city, or coastline on Earth to see forecast
        wave and wind conditions, plus nearby surf shops pulled from OpenStreetMap. This works for
        literally anywhere — the curated Wave Breaks guide is just our recommended starting list.
      </p>
      <div className="mt-8">
        <Suspense fallback={<p className="text-sm text-slate-500 dark:text-slate-400">Loading…</p>}>
          <ExploreClient />
        </Suspense>
      </div>
    </div>
  );
}
