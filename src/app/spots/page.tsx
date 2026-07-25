import type { Metadata } from "next";
import { spots, continents } from "@/data/spots";
import WorldExplorerSection from "@/components/WorldExplorerSection";
import SpotsBrowser from "@/components/SpotsBrowser";

export const metadata: Metadata = {
  title: "Wave Breaks",
  description: "Every mapped beach on Earth, plus editor-picked beginner-friendly breaks across six continents.",
};

export default function SpotsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-widest text-cyan-700 dark:text-cyan-400">
        Wave Breaks
      </p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
        Every wave break on Earth
      </h1>
      <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
        Pan and zoom the map to browse beaches anywhere in the world, pulled live from OpenStreetMap.
        The ⭐ pins are our editor-picked, beginner-friendly write-ups with real difficulty ratings and
        hazard notes — every other pin shows live forecast conditions instead, since we can&apos;t
        personally vouch for a spot we haven&apos;t reviewed.
      </p>

      <div className="mt-8">
        <WorldExplorerSection curatedSpots={spots} />
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Editor&apos;s picks
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
          A curated starting list of beginner-friendly breaks with full write-ups, ordered by
          continent. Always double-check current conditions, tides, and local advisories before
          heading out.
        </p>
        <div className="mt-6">
          <SpotsBrowser spots={spots} continents={continents} />
        </div>
      </div>
    </div>
  );
}
