import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { spots, getSpotBySlug } from "@/data/spots";
import DifficultyBadge from "@/components/DifficultyBadge";
import SpotMap from "@/components/SpotMap";

export function generateStaticParams() {
  return spots.map((spot) => ({ slug: spot.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const spot = getSpotBySlug(slug);
  if (!spot) return {};
  return {
    title: spot.name,
    description: spot.summary,
  };
}

const facts: Array<[string, keyof (typeof spots)[number]]> = [
  ["Break type", "breakType"],
  ["Best swell", "bestSwell"],
  ["Best wind", "bestWind"],
  ["Best tide", "bestTide"],
  ["Water temp", "waterTemp"],
];

export default async function SpotPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const spot = getSpotBySlug(slug);
  if (!spot) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Link href="/spots" className="text-sm font-semibold text-cyan-700 hover:underline dark:text-cyan-400">
        &larr; All wave breaks
      </Link>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
          {spot.name}
        </h1>
        <DifficultyBadge level={spot.difficulty} />
      </div>
      <p className="mt-1 text-slate-500 dark:text-slate-400">
        {spot.region}, {spot.country}
      </p>

      <p className="mt-6 text-lg text-slate-700 dark:text-slate-300">{spot.summary}</p>
      <p className="mt-4 text-slate-600 dark:text-slate-400">{spot.description}</p>

      <div className="mt-6">
        <SpotMap lat={spot.lat} lng={spot.lng} label={spot.name} />
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 rounded-2xl border border-black/10 bg-black/[0.02] p-5 sm:grid-cols-3 dark:border-white/10 dark:bg-white/[0.03]">
        {facts.map(([label, key]) => (
          <div key={label}>
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-500">
              {label}
            </dt>
            <dd className="mt-1 text-sm text-slate-800 dark:text-slate-200">{spot[key] as string}</dd>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-xl font-bold text-slate-900 dark:text-slate-100">Hazards to know</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700 dark:text-slate-300">
        {spot.hazards.map((hazard) => (
          <li key={hazard}>{hazard}</li>
        ))}
      </ul>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href={`/explore?lat=${spot.lat}&lng=${spot.lng}&name=${encodeURIComponent(spot.name)}`}
          className="rounded-full bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-cyan-700"
        >
          Check live conditions &amp; nearby shops
        </Link>
        <Link
          href="/gear"
          className="rounded-full border border-black/10 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-black/5 dark:border-white/20 dark:text-slate-200 dark:hover:bg-white/5"
        >
          What board should I bring?
        </Link>
      </div>
    </div>
  );
}
