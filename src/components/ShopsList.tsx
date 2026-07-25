import type { NearbyShop } from "@/lib/geo";

export default function ShopsList({ shops, error }: { shops: NearbyShop[]; error?: string | null }) {
  return (
    <div>
      <h3 className="font-semibold text-slate-900 dark:text-slate-100">Nearby surf shops</h3>
      {error && <p className="mt-2 text-sm text-rose-700 dark:text-rose-300">{error}</p>}
      {!error && shops.length === 0 && (
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          No surf shops found in OpenStreetMap within 25 km of this location. Coverage depends on volunteer
          mapping and can be sparse in some regions.
        </p>
      )}
      {shops.length > 0 && (
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {shops.slice(0, 10).map((shop, i) => (
            <li key={i} className="rounded-xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.03]">
              <p className="font-semibold text-slate-900 dark:text-slate-100">{shop.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {shop.kind} · {shop.distanceKm.toFixed(1)} km away
              </p>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
        Shop data comes from OpenStreetMap contributors — great in well-mapped areas, incomplete in others.
      </p>
    </div>
  );
}
