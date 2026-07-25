"use client";

import dynamic from "next/dynamic";

const WorldMap = dynamic(() => import("@/components/WorldMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-64 items-center justify-center rounded-2xl border border-black/10 bg-black/[0.02] text-sm text-slate-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-400">
      Loading map…
    </div>
  ),
});

export default function SpotMap({ lat, lng, label }: { lat: number; lng: number; label: string }) {
  return (
    <WorldMap
      markers={[{ lat, lng, label, kind: "spot" }]}
      center={{ lat, lng }}
      zoom={11}
    />
  );
}
