import type { Metadata } from "next";
import { shops } from "@/data/shops";

export const metadata: Metadata = {
  title: "Surf Shops",
  description: "Northern California surf shops for board rentals, wetsuit rentals, and lessons.",
};

export default function ShopsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-widest text-cyan-700 dark:text-cyan-400">
        Surf Shops
      </p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
        Where to rent gear or book a lesson
      </h1>
      <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
        Renting is the cheapest way to try surfing before you buy anything. These shops sit near
        the beginner-friendly spots covered in the Wave Breaks section. Hours, pricing, and
        inventory change, so call ahead or check a shop&apos;s website before visiting.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {shops.map((shop) => (
          <div
            key={shop.name}
            className="flex flex-col rounded-2xl border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.03]"
          >
            <h2 className="font-semibold text-slate-900 dark:text-slate-100">{shop.name}</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">{shop.region}</p>
            {shop.address && (
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">{shop.address}</p>
            )}

            <ul className="mt-3 flex flex-wrap gap-1.5">
              {shop.offers.map((offer) => (
                <li
                  key={offer}
                  className="rounded-full bg-cyan-600/10 px-2.5 py-1 text-xs font-medium text-cyan-800 dark:bg-cyan-400/10 dark:text-cyan-300"
                >
                  {offer}
                </li>
              ))}
            </ul>

            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">{shop.notes}</p>

            {shop.website && (
              <a
                href={shop.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 text-sm font-semibold text-cyan-700 hover:underline dark:text-cyan-400"
              >
                Visit website &rarr;
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
