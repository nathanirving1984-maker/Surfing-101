import type { Metadata } from "next";
import { spots, continents } from "@/data/spots";
import SpotsBrowser from "@/components/SpotsBrowser";

export const metadata: Metadata = {
  title: "Wave Breaks",
  description: "Beginner-friendly wave breaks across six continents, from Pacifica to Bali.",
};

export default function SpotsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-widest text-cyan-700 dark:text-cyan-400">
        Wave Breaks
      </p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
        Surf spots around the world
      </h1>
      <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
        A curated starting list of beginner-friendly breaks on every surfable continent. Don&apos;t
        see your coastline? Use{" "}
        <a href="/explore" className="font-semibold text-cyan-700 hover:underline dark:text-cyan-400">
          Explore
        </a>{" "}
        to check forecast conditions and nearby shops anywhere on Earth. Always double-check current
        conditions, tides, and local advisories before heading out.
      </p>

      <div className="mt-8">
        <SpotsBrowser spots={spots} continents={continents} />
      </div>
    </div>
  );
}
