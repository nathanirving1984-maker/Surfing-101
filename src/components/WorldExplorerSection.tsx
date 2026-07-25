"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import type { Spot } from "@/data/spots";
import type { OsmBeach } from "@/lib/osmBeaches";
import { getConditions, getNearbyShops, type Conditions, type NearbyShop, type Unit } from "@/lib/geo";
import DifficultyBadge from "@/components/DifficultyBadge";
import ConditionsCard from "@/components/ConditionsCard";
import ShopsList from "@/components/ShopsList";

const WorldExplorerMap = dynamic(() => import("@/components/WorldExplorerMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[60vh] min-h-[420px] items-center justify-center rounded-2xl border border-black/10 bg-black/[0.02] text-sm text-slate-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-400">
      Loading world map…
    </div>
  ),
});

type Selected = { kind: "curated"; spot: Spot } | { kind: "osm"; beach: OsmBeach };

type BeachState = {
  status: "loading" | "ready" | "error";
  conditions: Conditions | null;
  shops: NearbyShop[];
  shopsError: string | null;
};

export default function WorldExplorerSection({ curatedSpots }: { curatedSpots: Spot[] }) {
  const [selected, setSelected] = useState<Selected | null>(null);
  const [beachState, setBeachState] = useState<BeachState | null>(null);
  const [unit, setUnit] = useState<Unit>("metric");

  async function handleSelect(sel: Selected) {
    setSelected(sel);
    if (sel.kind === "curated") {
      setBeachState(null);
      return;
    }

    setBeachState({ status: "loading", conditions: null, shops: [], shopsError: null });
    const [conditionsResult, shopsResult] = await Promise.allSettled([
      getConditions(sel.beach.lat, sel.beach.lng),
      getNearbyShops(sel.beach.lat, sel.beach.lng),
    ]);

    setBeachState({
      status: "ready",
      conditions: conditionsResult.status === "fulfilled" ? conditionsResult.value : null,
      shops: shopsResult.status === "fulfilled" ? shopsResult.value : [],
      shopsError: shopsResult.status === "rejected" ? "Couldn't load nearby surf shops right now." : null,
    });
  }

  return (
    <div>
      <WorldExplorerMap curatedSpots={curatedSpots} onSelect={handleSelect} />

      <div className="mt-6">
        {!selected && (
          <div className="rounded-2xl border border-dashed border-black/15 p-6 text-center text-sm text-slate-500 dark:border-white/20 dark:text-slate-400">
            Pan and zoom the map, then click any pin — ⭐ editor&apos;s picks have full write-ups, and every other
            mapped beach shows live forecast conditions and nearby shops.
          </div>
        )}

        {selected?.kind === "curated" && (
          <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{selected.spot.name}</h3>
                  <DifficultyBadge level={selected.spot.difficulty} />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {selected.spot.region}, {selected.spot.country}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-full px-2 py-1 text-slate-400 hover:bg-black/5 dark:hover:bg-white/10"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">{selected.spot.summary}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href={`/spots/${selected.spot.slug}`}
                className="rounded-full bg-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-700"
              >
                Full spot guide
              </Link>
              <Link
                href={`/explore?lat=${selected.spot.lat}&lng=${selected.spot.lng}&name=${encodeURIComponent(selected.spot.name)}`}
                className="rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-black/5 dark:border-white/20 dark:text-slate-200 dark:hover:bg-white/5"
              >
                Live conditions
              </Link>
            </div>
          </div>
        )}

        {selected?.kind === "osm" && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{selected.beach.name}</h3>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">
                    Community-mapped beach (OpenStreetMap) — no editor write-up yet, so here&apos;s live forecast
                    data instead. Check local knowledge before surfing anywhere new.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelected(null);
                    setBeachState(null);
                  }}
                  className="rounded-full px-2 py-1 text-slate-400 hover:bg-black/5 dark:hover:bg-white/10"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span>Units:</span>
                <button
                  type="button"
                  onClick={() => setUnit("metric")}
                  className={`rounded-full px-3 py-1 font-semibold ${unit === "metric" ? "bg-cyan-600 text-white" : "bg-black/5 dark:bg-white/10"}`}
                >
                  Metric
                </button>
                <button
                  type="button"
                  onClick={() => setUnit("imperial")}
                  className={`rounded-full px-3 py-1 font-semibold ${unit === "imperial" ? "bg-cyan-600 text-white" : "bg-black/5 dark:bg-white/10"}`}
                >
                  Imperial
                </button>
              </div>
            </div>

            {beachState?.status === "loading" && (
              <div className="animate-pulse rounded-2xl border border-black/10 bg-black/[0.02] p-8 text-center text-sm text-slate-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-400">
                Loading conditions and nearby shops…
              </div>
            )}

            {beachState?.status === "ready" && (
              <>
                {beachState.conditions ? (
                  <ConditionsCard conditions={beachState.conditions} unit={unit} />
                ) : (
                  <p className="text-sm text-rose-700 dark:text-rose-300">
                    Couldn&apos;t load forecast conditions for this beach right now.
                  </p>
                )}
                <ShopsList shops={beachState.shops} error={beachState.shopsError} />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
